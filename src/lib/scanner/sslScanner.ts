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
  score: number;
  error?: string;
}

export interface FullAuditResult {
  url: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  scannedAt: string;
  isHyperscale: boolean; // <-- Debe estar declarada aquí
  headers: HeaderScanOutput['headers'];
  ssl: SslScanResult;
}

export async function scanSsl(targetUrl: string): Promise<SslScanResult> {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
      const hostname = parsedUrl.hostname;

      const socket = tls.connect(
        {
          host: hostname,
          port: 443,
          servername: hostname,
          rejectUnauthorized: false,
          timeout: 4000,
        },
        () => {
          const cert = socket.getPeerCertificate();
          const protocol = socket.getProtocol() || 'TLS';

          if (!cert || Object.keys(cert).length === 0) {
            socket.destroy();
            resolve({
              valid: false,
              issuer: 'Desconocido',
              validFrom: '',
              validTo: '',
              daysRemaining: 0,
              protocol,
              score: 0,
              error: 'No se obtuvo certificado del servidor.',
            });
            return;
          }

          const validToDate = new Date(cert.valid_to);
          const now = new Date();
          const diffTime = validToDate.getTime() - now.getTime();
          const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
          const isValid = socket.authorized && daysRemaining > 0;

          const normalizeField = (field: string | string[] | undefined): string => {
            if (Array.isArray(field)) return field.join(' ');
            return typeof field === 'string' ? field : '';
          };

          const rawIssuer = cert.issuer;
          let issuerName = 'Autoridad Certificadora';

          if (typeof rawIssuer === 'object' && rawIssuer !== null) {
            issuerName = normalizeField(rawIssuer.O) || normalizeField(rawIssuer.CN) || 'Autoridad Certificadora';
          } else if (typeof rawIssuer === 'string') {
            issuerName = rawIssuer;
          }

          let sslScore = 0;
          if (isValid) sslScore += 60;
          if (protocol === 'TLSv1.3') sslScore += 30;
          else if (protocol === 'TLSv1.2') sslScore += 20;
          if (daysRemaining > 30) sslScore += 10;

          socket.destroy();

          resolve({
            valid: isValid,
            issuer: issuerName,
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
            daysRemaining,
            protocol,
            score: sslScore,
          });
        }
      );

      socket.on('error', (err) => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: 'Inaccesible',
          validFrom: '',
          validTo: '',
          daysRemaining: 0,
          protocol: 'None',
          score: 0,
          error: err.message,
        });
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: 'Timeout',
          validFrom: '',
          validTo: '',
          daysRemaining: 0,
          protocol: 'None',
          score: 0,
          error: 'Conexión SSL agotada por tiempo de espera.',
        });
      });
    } catch (e: unknown) {
      resolve({
        valid: false,
        issuer: 'Error de análisis',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        protocol: 'None',
        score: 0,
        error: e instanceof Error ? e.message : 'Error inesperado al evaluar SSL.',
      });
    }
  });
}

export async function scanFull(targetUrl: string): Promise<FullAuditResult> {
  const [headerOutput, sslOutput] = await Promise.all([
    scanHeaders(targetUrl),
    scanSsl(targetUrl),
  ]);

  return {
    url: targetUrl,
    score: headerOutput.score,
    grade: headerOutput.grade,
    scannedAt: new Date().toISOString(),
    isHyperscale: headerOutput.isHyperscale, // <-- Debe asignarse aquí
    headers: headerOutput.headers,
    ssl: sslOutput,
  };

}