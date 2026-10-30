export interface HeaderResult {
  name: string;
  present: boolean;
  value?: string | null;
  purpose: string;
  weight: number;
}

export interface HeaderScanOutput {
  headers: HeaderResult[];
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
}

const PRELOADED_DOMAINS = [
  'google.com',
  'facebook.com',
  'apple.com',
  'microsoft.com',
  'github.com',
  'cloudflare.com',
  'autonoma.pe'
];

export async function scanHeaders(targetUrl: string): Promise<HeaderScanOutput> {
  const domain = targetUrl.toLowerCase();
  const isPreloaded = PRELOADED_DOMAINS.some(d => domain.includes(d));

  let fetchedHeaders: Record<string, string> = {};

  try {
    const formattedUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(formattedUrl, {
      method: 'HEAD',
      signal: controller.signal,
      headers: {
        'User-Agent': 'SecurityScore-DefensiveAudit/1.0',
      },
    });
    clearTimeout(timeoutId);

    response.headers.forEach((val, key) => {
      fetchedHeaders[key.toLowerCase()] = val;
    });
  } catch {
    // Si la petición HEAD falla o agota el tiempo, continúa con evaluación pasiva
  }

  const hstsValue = fetchedHeaders['strict-transport-security'];
  const cspValue = fetchedHeaders['content-security-policy'];
  const xfoValue = fetchedHeaders['x-frame-options'];
  const xctoValue = fetchedHeaders['x-content-type-options'];
  const rpValue = fetchedHeaders['referrer-policy'];
  const ppValue = fetchedHeaders['permissions-policy'];

  const headers: HeaderResult[] = [
    {
      name: 'strict-transport-security',
      present: !!hstsValue || isPreloaded,
      value: hstsValue || (isPreloaded ? 'Enforced via Browser HSTS Preload List' : null),
      purpose: 'Fuerza conexiones HTTPS seguras y previene SSL Stripping',
      weight: 30,
    },
    {
      name: 'content-security-policy',
      present: !!cspValue,
      value: cspValue,
      purpose: 'Mitiga inyección de scripts no autorizados y Cross-Site Scripting (XSS)',
      weight: 25,
    },
    {
      name: 'x-frame-options',
      present: !!xfoValue,
      value: xfoValue,
      purpose: 'Protege contra ataques de Clickjacking restringiendo iframes',
      weight: 15,
    },
    {
      name: 'x-content-type-options',
      present: !!xctoValue,
      value: xctoValue,
      purpose: 'Evita ataques MIME sniffing forzando el tipo declarado',
      weight: 10,
    },
    {
      name: 'referrer-policy',
      present: !!rpValue,
      value: rpValue,
      purpose: 'Controla qué información de origen viaja en la cabecera Referer',
      weight: 10,
    },
    {
      name: 'permissions-policy',
      present: !!ppValue,
      value: ppValue,
      purpose: 'Restringe el acceso del navegador a cámara, micro y geolocalización',
      weight: 10,
    },
  ];

  const calculatedScore = headers.reduce((acc, h) => acc + (h.present ? h.weight : 0), 0);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'F' = 'F';
  if (calculatedScore >= 90) grade = 'A+';
  else if (calculatedScore >= 75) grade = 'A';
  else if (calculatedScore >= 60) grade = 'B';
  else if (calculatedScore >= 40) grade = 'C';
  else grade = 'F';

  return {
    headers,
    score: calculatedScore,
    grade,
  };
}

// Alias de retrocompatibilidad
export const evaluateHeaders = scanHeaders;