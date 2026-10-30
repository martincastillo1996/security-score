import * as tls from 'tls';
import { URL } from 'url';
import { scanHeaders, HeaderScanOutput } from './headerScanner';

export interface SslScanResult {
  valid: boolean;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  protocol: string;
  error?: string;
}

export interface FullAuditResult {
  url: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  scannedAt: string;
  headers: HeaderScanOutput['headers'];
  ssl: SslScanResult;
}

export function scanSsl(targetUrl: string): Promise<SslScanResult> {
  return new Promise((resolve) => {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(targetUrl);
    } catch {
      return resolve({
        valid: false,
        issuer: 'Desconocido',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        protocol: 'none',
        error: 'URL malformada.',
      });
    }

    if (parsedUrl.protocol !== 'https:') {
      return resolve({
        valid: false,
        issuer: 'Sin certificado',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        protocol: 'HTTP',
        error: 'El sitio no utiliza conexión segura HTTPS.',
      });
    }

    const port = parsedUrl.port ? parseInt(parsedUrl.port, 10) : 443;
    const hostname = parsedUrl.hostname;

    const socket = tls.connect(
      {
        host: hostname,
        port: port,
        servername: hostname,
        rejectUnauthorized: false,
        timeout: 4000,
      },
      () => {
        const cert = socket.getPeerCertificate();
        const protocol = socket.getProtocol() || 'TLS';

        if (!cert || Object.keys(cert).length === 0) {
          socket.destroy();
          return resolve({
            valid: false,
            issuer: 'No disponible',
            validFrom: '',
            validTo: '',
            daysRemaining: 0,
            protocol,
            error: 'No se pudo obtener el certificado TLS del host.',
          });
        }

        const validTo = new Date(cert.valid_to);
        const validFrom = new Date(cert.valid_from);
        const now = new Date();
        const daysRemaining = Math.max(
          0,
          Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        );

        const isAuthorized = socket.authorized;
        socket.destroy();

        resolve({
          valid: isAuthorized && daysRemaining > 0,
            issuer: (cert.issuer as any)?.O || (cert.issuer as any)?.CN || 'Desconocido',
          validFrom: validFrom.toISOString(),
          validTo: validTo.toISOString(),
          daysRemaining,
          protocol,
        });
      }
    );

    socket.on('timeout', () => {
      socket.destroy();
      resolve({
        valid: false,
        issuer: 'Timeout',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        protocol: 'none',
        error: 'Conexión TLS agotada (Timeout 4s).',
      });
    });

    socket.on('error', (err) => {
      socket.destroy();
      resolve({
        valid: false,
        issuer: 'Error de conexión',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        protocol: 'none',
        error: err.message,
      });
    });
  });
}

function calculateGrade(score: number, sslValid: boolean): 'A+' | 'A' | 'B' | 'C' | 'F' {
  if (!sslValid) return 'F';
  if (score >= 90) return 'A+';
  if (score >= 75) return 'A';
  if (score >= 50) return 'B';
  if (score >= 25) return 'C';
  return 'F';
}

export async function scanFull(rawUrl: string): Promise<FullAuditResult> {
  const normalizedUrl = rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
    ? rawUrl
    : `https://${rawUrl}`;

  const [headerResult, sslResult] = await Promise.all([
    scanHeaders(normalizedUrl),
    scanSsl(normalizedUrl),
  ]);

  let finalScore = headerResult.score;
  if (!sslResult.valid) {
    finalScore = Math.max(0, finalScore - 30);
  }

  return {
    url: normalizedUrl,
    score: finalScore,
    grade: calculateGrade(finalScore, sslResult.valid),
    scannedAt: new Date().toISOString(),
    headers: headerResult.headers,
    ssl: sslResult,
  };
}