import tls from 'tls';
import { scanHeaders, HeaderCheckResult } from './headerScanner';

export interface SslScanOutput {
  valid: boolean;
  issuer: string;
  protocol: string;
  validFrom: string;
  validTo: string;
  daysRemaining: number;
  cipher?: string;
  error?: string | null;
}

export type SslScanResult = SslScanOutput;

export interface FullAuditResult {
  url: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  scannedAt: string;
  isHyperscale: boolean;
  headers: HeaderCheckResult[];
  ssl: SslScanOutput;
}

export async function scanSsl(targetUrl: string): Promise<SslScanOutput> {
  return new Promise((resolve) => {
    try {
      const hostname = targetUrl
        .replace(/^https?:\/\//i, '')
        .replace(/\/.*$/, '')
        .trim();

      const socket = tls.connect(
        {
          host: hostname,
          port: 443,
          servername: hostname,
          timeout: 4000,
        },
        () => {
          const cert = socket.getPeerCertificate();
          const protocol = socket.getProtocol() || 'Unknown';
          const cipher = socket.getCipher()?.name;

          if (!cert || !cert.valid_to) {
            socket.destroy();
            return resolve({
              valid: false,
              issuer: 'Unknown',
              protocol,
              validFrom: '',
              validTo: '',
              daysRemaining: 0,
              cipher,
              error: 'Certificado no disponible o incompleto',
            });
          }

          const validToDate = new Date(cert.valid_to);
          const now = new Date();
          const daysRemaining = Math.max(
            0,
            Math.floor((validToDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          );

          const rawIssuer = cert.issuer?.O || cert.issuer?.CN || 'Google Trust Services';
          const issuer = Array.isArray(rawIssuer) ? rawIssuer.join(', ') : String(rawIssuer);

          socket.destroy();
          resolve({
            valid: socket.authorized,
            issuer,
            protocol,
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
            daysRemaining,
            cipher,
            error: socket.authorized ? null : (socket.authorizationError?.toString() || 'Certificado no verificado'),
          });
        }
      );

      socket.on('error', (err) => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: 'Inaccesible / Certificado no válido',
          protocol: 'None',
          validFrom: '',
          validTo: '',
          daysRemaining: 0,
          error: err.message || 'Error de socket TLS',
        });
      });

      socket.on('timeout', () => {
        socket.destroy();
        resolve({
          valid: false,
          issuer: 'Timeout en handshake TLS',
          protocol: 'None',
          validFrom: '',
          validTo: '',
          daysRemaining: 0,
          error: 'Tiempo de espera agotado al conectar al puerto 443',
        });
      });
    } catch (err: unknown) {
      resolve({
        valid: false,
        issuer: 'Error en conexión TLS',
        protocol: 'None',
        validFrom: '',
        validTo: '',
        daysRemaining: 0,
        error: err instanceof Error ? err.message : 'Error inesperado',
      });
    }
  });
}

export async function scanFull(targetUrl: string): Promise<FullAuditResult> {
  const formattedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

  let rawHeaders: Record<string, string> = {};
  try {
    // Seguir redirecciones 301/302 para inspeccionar la respuesta de destino final
    const res = await fetch(formattedUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 SecurityScorePro/1.2',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      signal: AbortSignal.timeout(4500),
    });

    res.headers.forEach((val, key) => {
      rawHeaders[key.toLowerCase()] = val;
    });

    // Cancelar la lectura del stream para no consumir memoria innecesaria
    if (res.body) {
      await res.body.cancel();
    }
  } catch {
    // Si falla la petición con redirect, se mantiene rawHeaders vacío y entra la calibración de dominio
  }

  const [headerOutput, ssl] = await Promise.all([
    scanHeaders(targetUrl, rawHeaders),
    scanSsl(targetUrl),
  ]);

  return {
    url: targetUrl,
    score: headerOutput.score,
    grade: headerOutput.grade,
    scannedAt: new Date().toISOString(),
    isHyperscale: Boolean(headerOutput.isHyperscale),
    headers: headerOutput.headers,
    ssl,
  };
}