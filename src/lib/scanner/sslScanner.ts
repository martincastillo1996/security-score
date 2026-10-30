import * as tls from 'tls';
import { URL } from 'url';
import { HeaderScanOutput } from './headerScanner';

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
              error: 'No se obtuvo certificado del servidor.',
            });
            return;
          }

          const validToDate = new Date(cert.valid_to);
          const now = new Date();
          const diffTime = validToDate.getTime() - now.getTime();
          const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
          const isValid = socket.authorized && daysRemaining > 0;

          // Función auxiliar para normalizar string o string[] a string plano
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

          socket.destroy();

          resolve({
            valid: isValid,
            issuer: issuerName,
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
            daysRemaining,
            protocol,
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
        error: e instanceof Error ? e.message : 'Error inesperado al evaluar SSL.',
      });
    }
  });
}