import { NextResponse } from 'next/server';
import { scanSsl } from '@/lib/scanner/sslScanner';
import { scanHeaders, HeaderCheckItem } from '@/lib/scanner/headerScanner';
import { calculateSecurityScore } from '@/lib/scanner/scoreEngine';
import { generateRemediation, RemediationItem } from '@/lib/ai/remediation';
import { saveReport, AuditReportRecord } from '@/lib/storage/reportStore';
import { scanPerimetralPorts } from '@/lib/scanner/portScanner';
import { lookupServerLocation } from '@/lib/scanner/geoScanner';
import { v4 as uuidv4 } from 'uuid';
import { isPrivateOrLocalHost, verifyDnsResolution } from '@/lib/security/ssrfValidator';

// Caché en Memoria de Escaneos por Dominio (TTL de 2 horas para soportar picos masivos)
const DOMAIN_SCAN_CACHE_TTL_MS = 2 * 60 * 60 * 1000; // 2 horas
const MAX_CACHED_SCANS = 500;

interface CachedScanEntry {
  report: AuditReportRecord;
  cachedAt: number;
  expiresAt: number;
}

const globalForScanCache = globalThis as unknown as {
  __domainScanCache?: Map<string, CachedScanEntry>;
};

if (!globalForScanCache.__domainScanCache) {
  globalForScanCache.__domainScanCache = new Map<string, CachedScanEntry>();
}

const domainScanCache = globalForScanCache.__domainScanCache;

export async function POST(req: Request) {
  const startTime = Date.now();
  try {
    const { url, force } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'Parámetro de URL requerido para auditoría perimetral.' },
        { status: 400 }
      );
    }

    // 1. Normalizar URL
    const rawInput = url.trim().toLowerCase();
    let parsedUrl = url.trim();
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

    // 1.1 Restricción de puertos (solo puertos web públicos permitidos)
    if (target.port && !['80', '443', '8080', '8443'].includes(target.port)) {
      return NextResponse.json(
        { error: 'Acceso denegado: Solo se permiten puertos web estándar (80, 443, 8080, 8443).' },
        { status: 400 }
      );
    }

    const hostname = target.hostname;

    // 2. Blindaje Anti-SSRF: Comprobación preliminar de hostnames e IPs
    if (isPrivateOrLocalHost(hostname)) {
      return NextResponse.json(
        { error: 'Acceso denegado: Auditoría bloqueada hacia host privado, loopback o metadatos cloud.' },
        { status: 400 }
      );
    }

    // 2.0 Caché Inteligente por Dominio (Zero-Downtime y $0 Costo en Picos de Tráfico)
    const cacheKey = target.origin.toLowerCase();
    if (!force && domainScanCache.has(cacheKey)) {
      const cached = domainScanCache.get(cacheKey)!;
      if (Date.now() < cached.expiresAt) {
        const freshAuditId = uuidv4();
        const cachedReport: AuditReportRecord = {
          ...cached.report,
          id: freshAuditId,
          telemetry: {
            durationMs: Date.now() - startTime,
            aiModel: cached.report.telemetry?.aiModel || 'gemini-1.5-flash-cache',
            targetResolvedIp: cached.report.telemetry?.targetResolvedIp,
            engineVersion: '1.2.0-cloud-cache',
          },
        };

        // Guardar para que la ruta /report/[id] resuelva con éxito inmediato
        try {
          saveReport(freshAuditId, cachedReport);
        } catch {
          // Ignorar fallback
        }

        return NextResponse.json({
          id: freshAuditId,
          report: cachedReport,
          cached: true,
        });
      } else {
        domainScanCache.delete(cacheKey);
      }
    }

    // 2.1. Resolución DNS dual (IPv4 + IPv6) para neutralizar DNS Rebinding
    let targetResolvedIp: string | undefined;
    const dnsCheck = await verifyDnsResolution(hostname);
    if (!dnsCheck.safe) {
      return NextResponse.json(
        { error: `Acceso denegado por seguridad perimetral: ${dnsCheck.reason || 'Host no seguro.'}` },
        { status: 400 }
      );
    }
    if (dnsCheck.resolvedIps.length > 0) {
      targetResolvedIp = dnsCheck.resolvedIps[0];
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
      cookies: !Array.isArray(headerResult) && headerResult && 'cookies' in headerResult ? headerResult.cookies : undefined,
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

    // Almacenar en caché de dominio para amortiguar picos de tráfico (TTL 2 horas)
    try {
      if (domainScanCache.size >= MAX_CACHED_SCANS) {
        const oldestKey = domainScanCache.keys().next().value;
        if (oldestKey) domainScanCache.delete(oldestKey);
      }
      domainScanCache.set(cacheKey, {
        report: fullReport,
        cachedAt: Date.now(),
        expiresAt: Date.now() + DOMAIN_SCAN_CACHE_TTL_MS,
      });
    } catch {
      // Fallback silencioso
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
