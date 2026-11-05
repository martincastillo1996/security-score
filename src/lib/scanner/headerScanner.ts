import { validateRedirectTarget } from '@/lib/security/ssrfValidator';
import { auditCookies, CookieScanResult } from '@/lib/scanner/cookieScanner';

export interface HeaderCheckItem {
  header: string;
  name: string;
  status: 'pass' | 'fail' | 'missing';
  present: boolean;
  value: string | null;
  severity: 'ALTA' | 'MEDIA' | 'BAJA';
  description: string;
}

export type HeaderResult = HeaderCheckItem;

export interface HeaderScanResult {
  headers: HeaderCheckItem[];
  missingHeaders: HeaderCheckItem[];
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  cookies?: CookieScanResult;
  redirectAudit?: {
    followed: boolean;
    initialUrl: string;
    finalUrl: string;
    blockedSsrfAttempt?: boolean;
    reason?: string;
  };
}

const REQUIRED_HEADERS = [
  {
    name: 'Strict-Transport-Security',
    severity: 'ALTA' as const,
    passDesc: 'Fuerza conexiones cifradas vía HTTPS e impide ataques de degradación SSL/TLS.',
    failDesc: 'Ausente. No previene ataques de degradación SSL/TLS.',
  },
  {
    name: 'Content-Security-Policy',
    severity: 'ALTA' as const,
    passDesc: 'Mitiga ataques de Cross-Site Scripting (XSS) e inyección de datos.',
    failDesc: 'Ausente. Eleva la exposición a inyecciones de código malicioso.',
  },
  {
    name: 'X-Frame-Options',
    severity: 'MEDIA' as const,
    passDesc: 'Previene ataques de Clickjacking impidiendo el renderizado en iframes.',
    failDesc: 'Ausente. Permite potencialmente el renderizado en iframes externos.',
  },
  {
    name: 'X-Content-Type-Options',
    severity: 'MEDIA' as const,
    passDesc: 'Impide que los navegadores interpreten archivos con tipos MIME permisivos (MIME Sniffing).',
    failDesc: 'Ausente. Permite interpretación MIME permisiva.',
  },
  {
    name: 'Referrer-Policy',
    severity: 'MEDIA' as const,
    passDesc: 'Protege la privacidad del usuario limitando la información enviada en peticiones de terceros.',
    failDesc: 'Ausente o predeterminada.',
  },
  {
    name: 'Permissions-Policy',
    severity: 'BAJA' as const,
    passDesc: 'Restringe el acceso no autorizado a APIs sensibles del navegador como cámara, micrófono o geolocalización.',
    failDesc: 'Ausente. No restringe el acceso a APIs de sensores en el cliente.',
  },
];

export async function scanHeaders(targetUrl: string): Promise<HeaderScanResult> {
  let currentUrl = targetUrl;
  let maxRedirectHops = 2;
  let responseHeaders: Headers | null = null;
  let rawSetCookie: string | null = null;
  let blockedSsrf = false;
  let blockReason: string | undefined;

  const defaultHeaders = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
  };

  while (maxRedirectHops >= 0) {
    try {
      const response = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        signal: AbortSignal.timeout(4000),
        headers: defaultHeaders,
      });

      responseHeaders = response.headers;
      rawSetCookie = response.headers.get('set-cookie');

      const isRedirect = [301, 302, 303, 307, 308].includes(response.status);
      const location = response.headers.get('location');

      if (isRedirect && location) {
        const validation = await validateRedirectTarget(currentUrl, location);

        if (!validation.allowed) {
          blockedSsrf = true;
          blockReason = validation.reason;
          break;
        }

        if (validation.sanitizedUrl && validation.sanitizedUrl !== currentUrl) {
          currentUrl = validation.sanitizedUrl;
          maxRedirectHops--;
          continue;
        }
      }

      break;
    } catch {
      responseHeaders = null;
      break;
    }
  }

  const results: HeaderCheckItem[] = [];
  const missing: HeaderCheckItem[] = [];

  for (const item of REQUIRED_HEADERS) {
    const rawVal = responseHeaders ? responseHeaders.get(item.name) : null;
    const isPresent = Boolean(rawVal && rawVal.trim().length > 0);

    const check: HeaderCheckItem = {
      header: item.name,
      name: item.name,
      status: isPresent ? 'pass' : 'fail',
      present: isPresent,
      value: rawVal,
      severity: item.severity,
      description: isPresent ? item.passDesc : item.failDesc,
    };

    results.push(check);
    if (!isPresent) {
      missing.push(check);
    }
  }

  // Auditar cookies Set-Cookie
  const cookieAudit = auditCookies(rawSetCookie);

  return {
    headers: results,
    missingHeaders: missing,
    score: 0,
    grade: 'F',
    cookies: cookieAudit,
    redirectAudit: {
      followed: currentUrl !== targetUrl,
      initialUrl: targetUrl,
      finalUrl: currentUrl,
      blockedSsrfAttempt: blockedSsrf,
      reason: blockReason,
    },
  };
}
