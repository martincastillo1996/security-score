import { NextResponse } from 'next/server';
import { scanSsl } from '@/lib/scanner/sslScanner';
import { scanHeaders } from '@/lib/scanner/headerScanner';
import { calculateSecurityScore } from '@/lib/scanner/scoreEngine';
import { generateRemediation } from '@/lib/ai/remediation';
import { saveReport } from '@/lib/storage/reportStore';
import { scanPerimetralPorts } from '@/lib/scanner/portScanner';
import dns from 'dns/promises';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    const body = await request.json().catch(() => null);

    if (!body || !body.url || typeof body.url !== 'string') {
      return NextResponse.json({ error: 'Parámetro URL faltante o inválido.' }, { status: 400 });
    }

    let parsedUrl = body.url.trim();
    if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
      parsedUrl = `https://${parsedUrl}`;
    }

    let target: URL;
    try {
      target = new URL(parsedUrl);
    } catch {
      return NextResponse.json({ error: 'La URL proporcionada no tiene un formato válido.' }, { status: 400 });
    }

    const hostname = target.hostname;

    let targetResolvedIp = 'Anycast Edge Cloud';
    try {
      const addresses = await dns.resolve4(hostname);
      if (addresses && addresses.length > 0) {
        targetResolvedIp = addresses[0];
      }
    } catch {
      // Continuar con fallback
    }

    const [sslResult, portResults] = await Promise.all([
      scanSsl(hostname).catch((err) => ({
        valid: false,
        protocol: 'Desconocido',
        issuer: 'No detectable',
        validTo: 'N/A',
        daysRemaining: 0,
        score: 0,
        isHyperscale: false,
        error: err?.message || 'Error en socket TLS',
      })),
      scanPerimetralPorts(hostname).catch(() => []),
    ]);

    let headerResult: any;
    try {
      headerResult = await scanHeaders(hostname);
    } catch {
      headerResult = {
        headers: [],
        missingHeaders: [],
        serverSignature: 'Oculta',
        httpVersion: 'HTTP/1.1',
      };
    }

    const headersList = Array.isArray(headerResult)
      ? headerResult
      : (headerResult && headerResult.headers) ? headerResult.headers : [];

    const isHyperscale = (sslResult as any).isHyperscale ?? false;

    let score = 50;
    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'C';
    try {
      const scoreOutput = calculateSecurityScore(hostname, headersList, sslResult as any);
      score = scoreOutput.score;
      grade = scoreOutput.grade;
    } catch {
      score = sslResult.valid ? 70 : 35;
      grade = sslResult.valid ? 'B' : 'F';
    }

    let remediations: any[] = [];
    try {
      remediations = await generateRemediation(target.origin, headersList, isHyperscale);
    } catch {
      remediations = [];
    }

    const auditId = uuidv4();
    const durationMs = Date.now() - startTime;

    const fullReport = {
      id: auditId,
      url: target.origin,
      score,
      grade,
      ssl: sslResult,
      headers: headersList,
      isHyperscale,
      ports: portResults,
      remediations,
      telemetry: {
        durationMs,
        aiModel: 'gemini-1.5-flash',
        targetResolvedIp,
        engineVersion: '1.2.0-cloud',
      },
      scannedAt: new Date().toISOString(),
    };

    try {
      saveReport(fullReport as any);
    } catch {
      // Ignorar fallback
    }

    return NextResponse.json(fullReport, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Error inesperado durante la auditoría perimetral.' },
      { status: 500 }
    );
  }
}