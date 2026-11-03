import { validateRedirectTarget } from '@/lib/security/ssrfValidator';

export interface HeaderCheckItem {
  header: string;
  name: string;
  status: 'pass' | 'fail' | 'missing';
  present: boolean;
  value: string | null;
  severity: 'ALTA' | 'MEDIA' | 'BAJA';
  description: string;
}

// Tipo individual de cabecera esperado por HeaderResults.tsx y remediation.ts
export type HeaderResult = HeaderCheckItem;

export interface HeaderScanResult {
  headers: HeaderCheckItem[];
  missingHeaders: HeaderCheckItem[];
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
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
    passDesc: 'Previene el sniffing de tipos MIME en navegadores cliente.',
    failDesc: 'Ausente. Permite interpretación MIME permisiva.',
  },
  {
    name: 'Referrer-Policy',
    severity: 'MEDIA' as const,
    passDesc: 'Controla y restringe la información de referencia transmitida en las peticiones.',
    failDesc: 'Ausente o predeterminada.',
  },
];

export async function scanHeaders(targetUrl: string): Promise<HeaderScanResult> {
  let responseHeaders: Headers | null = null;
  let currentUrl = targetUrl;
  let maxRedirectHops = 2; // Máximo 2 saltos seguros para evitar DoS por bucles
  let blockedSsrf = false;
  let blockReason: string | undefined;

  const defaultHeaders = {
    'User-Agent': 'DefensaTI-SecurityScanner/1.2 (+https://defensati.com)',
    Accept: '*/*',
  };

  while (maxRedirectHops >= 0) {
    try {
      const response = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual', // Control manual para auditar la cabecera Location en cada salto
        signal: AbortSignal.timeout(4000),
        headers: defaultHeaders,
      });

      responseHeaders = response.headers;

      // Comprobar si el servidor intenta redirigir
      const isRedirect = [301, 302, 303, 307, 308].includes(response.status);
      const location = response.headers.get('location');

      if (isRedirect && location) {
        // Validación estricta anti-SSRF de la redirección
        const validation = await validateRedirectTarget(currentUrl, location);

        if (!validation.allowed) {
          blockedSsrf = true;
          blockReason = validation.reason;
          console.warn(`[SSRF DEFENSE] Redirección bloqueada desde ${currentUrl}: ${validation.reason}`);
          break; // Detener de inmediato: no saltar al destino malicioso
        }

        if (validation.sanitizedUrl && validation.sanitizedUrl !== currentUrl) {
          currentUrl = validation.sanitizedUrl;
          maxRedirectHops--;
          continue; // Saltar de forma segura a la URL sanitizada y aprobada
        }
      }

      break; // Respuesta final obtenida
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

  return {
    headers: results,
    missingHeaders: missing,
    score: 0,
    grade: 'F',
    redirectAudit: {
      followed: currentUrl !== targetUrl,
      initialUrl: targetUrl,
      finalUrl: currentUrl,
      blockedSsrfAttempt: blockedSsrf,
      reason: blockReason,
    },
  };
}
