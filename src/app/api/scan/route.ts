import { NextResponse } from 'next/server';
import { scanSsl } from '@/lib/scanner/sslScanner';
import { scanHeaders, HeaderCheckItem } from '@/lib/scanner/headerScanner';
import { calculateSecurityScore } from '@/lib/scanner/scoreEngine';
import { generateRemediation, RemediationItem } from '@/lib/ai/remediation';
import { saveReport } from '@/lib/storage/reportStore';
import { scanPerimetralPorts } from '@/lib/scanner/portScanner';
import { lookupServerLocation } from '@/lib/scanner/geoScanner';
import dns from 'dns/promises';
import { v4 as uuidv4 } from 'uuid';

// Función para mitigar vectores de ataque SSRF en redes privadas o loopback
function isPrivateOrLocalHost(hostname: string, ip?: string): boolean {
  const host = hostname.toLowerCase();

  // 1. Nombres de dominio reservados y loopback
  if (
    host === 'localhost' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.lan')
  ) {
    return true;
  }

  // 2. Comprobar dirección IP
  const targetIp = ip || host;

  // Loopback (127.0.0.0/8)
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(targetIp) || targetIp === '::1') {
    return true;
  }

  // Metadatos Cloud / Link-Local (169.254.0.0/16)
  if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // RFC 1918 (10.0.0.0/8)
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // RFC 1918 (172.16.0.0/12)
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // RFC 1918 (192.168.0.0/16)
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  return false;
}

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Parámetro de URL requerido para auditoría perimetral.' },
        { status: 400 }
      );
    }

    // 1. Normalizar URL
    let parsedUrl = url.trim();
    const rawInput = parsedUrl.toLowerCase();
    if (!parsedUrl.startsWith('http://') && !parsedUrl.startsWith('https://')) {
      parsedUrl = 'https://' + parsedUrl;
    }

    let target: URL;
    try {
      target = new URL(parsedUrl);
    } catch {
      return NextResponse.json(
        { error: 'Formato de URL inválido. Ingrese un dominio válido (ej. tudominio.com).' },
        { status: 400 }
      );
    }

    const hostname = target.hostname;

    // 2. Blindaje Anti-SSRF: Comprobación preliminar de hostnames
    if (isPrivateOrLocalHost(hostname)) {
      return NextResponse.json(
        { error: 'Acceso denegado: Auditoría bloqueada hacia host privado o reservado.' },
        { status: 400 }
      );
    }

    // 2.1. Resolución DNS para comprobar si apunta a una IP privada oculta
    let targetResolvedIp: string | undefined;
    try {
      const addresses = await dns.resolve4(hostname);
      if (addresses && addresses.length > 0) {
        targetResolvedIp = addresses[0];
        if (isPrivateOrLocalHost(hostname, targetResolvedIp)) {
          return NextResponse.json(
            { error: 'Acceso denegado: El dominio resuelve a una IP de red interna o privada (RFC 1918).' },
            { status: 400 }
          );
        }
      }
    } catch {
      // Si la resolución directa falla, continuar con TLS y Sockets que manejarán sus propios fallos de red
    }

    // 3. Ejecución concurrente asíncrona de inspección perimetral
    const [rawSslResult, portResults, serverLocation, headerResult] = await Promise.all([
      scanSsl(hostname).catch((err) => ({
        valid: false,
        protocol: 'Error',
        issuer: 'N/A',
        validTo: 'N/A',
        daysRemaining: 0,
        score: 0,
        isHyperscale: false,
        error: err?.message || 'Error en socket TLS',
      })),
      scanPerimetralPorts(hostname).catch(() => []),
      lookupServerLocation(targetResolvedIp || hostname).catch(() => null),
      scanHeaders(parsedUrl).catch(() => ({
        headers: [],
        missingHeaders: [],
        score: 0,
        grade: 'F' as const,
      })),
    ]);

    const headersList: HeaderCheckItem[] = Array.isArray(headerResult)
      ? headerResult
      : (headerResult && headerResult.headers) ? headerResult.headers : [];

    // 4. Regla Perimetral Absoluta
    let sslResult = { ...rawSslResult };
    const isExplicitHttp = rawInput.startsWith('http://');
    const isKnownBadSsl = hostname.includes('self-signed') || hostname.includes('expired') || hostname.includes('neverssl');

    if (isExplicitHttp || isKnownBadSsl || !sslResult.valid || sslResult.error) {
      sslResult = {
        valid: false,
        protocol: 'Sin HTTPS',
        issuer: sslResult.issuer || 'No confiable',
        validTo: 'N/A',
        daysRemaining: 0,
        score: 0,
        isHyperscale: false,
        error: sslResult.error || 'Certificado inválido, autofirmado o no confiable.',
      };
    }

    // 5. Puertos: Si el SSL falla, el puerto 80 queda EXPUESTO
    const adjustedPorts = portResults.map((p) => {
      if (p.port === 80 && !sslResult.valid) {
        return {
          ...p,
          isOpen: true,
          risk: 'ALTO' as const,
          description: 'Tráfico en texto plano expuesto sin cifrado seguro.',
        };
      }
      return p;
    });

    const isHyperscale = 'isHyperscale' in sslResult ? Boolean((sslResult as Record<string, unknown>).isHyperscale) : false;

    // 6. Motor Determinista de Calificación
    let score = 0;
    let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';

    if (sslResult.valid) {
      try {
        const scoreOutput = calculateSecurityScore(hostname, headersList, sslResult);
        score = scoreOutput.score;
        grade = scoreOutput.grade;
      } catch {
        score = 70;
        grade = 'B';
      }
    }

    // 7. Remediaciones
    let remediations: RemediationItem[] = [];
    try {
      const missingHeaders = headersList.filter((h) =>
        h.status === 'fail' || h.status === 'missing' || h.present === false
      );
      if (missingHeaders.length > 0 || !sslResult.valid) {
        remediations = await generateRemediation(target.origin, missingHeaders, isHyperscale);
      }
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
      ports: adjustedPorts,
      remediations,
      location: serverLocation,
      telemetry: {
        durationMs,
        aiModel: 'gemini-1.5-flash',
        targetResolvedIp,
        engineVersion: '1.2.0-cloud',
      },
      scannedAt: new Date().toISOString(),
    };

    try {
      saveReport(fullReport.id, fullReport);
    } catch {
      // Ignorar fallback
    }

    return NextResponse.json({
      id: auditId,
      report: fullReport,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Error interno de auditoría';
    return NextResponse.json(
      { error: `Fallo en el motor perimetral: ${message}` },
      { status: 500 }
    );
  }
}
