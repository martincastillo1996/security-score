export interface HeaderCheckItem {
  header: string;
  name?: string;
  status: 'pass' | 'fail' | 'missing';
  present: boolean;
  value: string | null;
  severity: 'ALTA' | 'MEDIA' | 'BAJA';
  description: string;
}

export interface HeaderScanResult {
  headers: HeaderCheckItem[];
  missingHeaders: HeaderCheckItem[];
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
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

  try {
    // 1. Defensas: Timeout de 4s contra Slowloris y redirect 'manual' contra SSRF por rebote
    const response = await fetch(targetUrl, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(4000),
      headers: {
        'User-Agent': 'DefensaTI-SecurityScanner/1.2 (+https://defensati.com)',
        Accept: '*/*',
      },
    });

    responseHeaders = response.headers;
  } catch {
    responseHeaders = null;
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
  };
}