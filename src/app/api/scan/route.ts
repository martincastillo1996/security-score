import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import * as dns from 'dns/promises';
import { v4 as uuidv4 } from 'uuid';
import { scanFull } from '@/lib/scanner/sslScanner';
import { generateRemediation } from '@/lib/ai/remediation';
import { saveReport, AuditReportRecord } from '@/lib/storage/reportStore';

const scanSchema = z.object({
  url: z
    .string()
    .trim()
    .min(3, 'La URL es requerida.')
    .max(255, 'La URL es demasiado larga.')
    .regex(
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/,
      'Formato de dominio o URL inválido.'
    ),
});

const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(ip);

  if (!clientData || clientData.expiresAt < now) {
    rateLimitMap.set(ip, { count: 1, expiresAt: now + 10 * 60 * 1000 });
    return true;
  }

  if (clientData.count >= 10) return false;

  clientData.count += 1;
  return true;
}

async function validateTargetAddress(hostname: string): Promise<{ isSafe: boolean; ip?: string }> {
  try {
    const lookup = await dns.lookup(hostname);
    const ip = lookup.address;

    if (ip.startsWith('127.') || ip === '::1' || ip === '0.0.0.0') return { isSafe: false, ip };
    if (
      ip.startsWith('10.') ||
      ip.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(ip)
    ) return { isSafe: false, ip };
    if (ip.startsWith('169.254.')) return { isSafe: false, ip };

    return { isSafe: true, ip };
  } catch {
    return { isSafe: false };
  }
}

export async function POST(req: NextRequest) {
  const startTime = performance.now();

  try {
    const forwarded = req.headers.get('x-forwarded-for');
    const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Límite alcanzado. Espera 10 minutos antes de escanear nuevamente.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const validation = scanSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0]?.message || 'Entrada inválida.' },
        { status: 400 }
      );
    }
    

    const targetUrl = validation.data.url;
    const urlObj = new URL(
      targetUrl.startsWith('http://') || targetUrl.startsWith('https://')
        ? targetUrl
        : `https://${targetUrl}`
    );

    const validationResult = await validateTargetAddress(urlObj.hostname);
    if (!validationResult.isSafe) {
      return NextResponse.json(
        { error: 'No se permite auditar hosts locales o redes internas.' },
        { status: 403 }
      );
    }

    // Ejecución de auditoría pasiva
    const auditResult = await scanFull(urlObj.toString());

    // Remediación de seguridad con IA
    const missingHeaders = auditResult.headers.filter((h) => !h.present);
    const remediations = await generateRemediation(missingHeaders, auditResult.ssl);

    const endTime = performance.now();
    const durationMs = Math.round(endTime - startTime);

    const reportId = uuidv4();
    const fullReport: AuditReportRecord = {
      ...auditResult,
      id: reportId,
      remediations,
      telemetry: {
        durationMs,
        aiModel: process.env.GEMINI_API_KEY ? 'gemini-2.5-flash' : 'static-heuristics-engine',
        targetResolvedIp: validationResult.ip,
        engineVersion: 'v1.2.0-cloud',
      },
    };

    saveReport(fullReport);

    return NextResponse.json(fullReport, {
      status: 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Error inesperado al auditar.',
      },
      { status: 500 }
    );
  }
}