export interface HeaderResult {
  name: string;
  present: boolean;
  value: string | null;
  risk: string;
  recommendation: string;
}

export interface HeaderScanOutput {
  headers: HeaderResult[];
  score: number;

  
}

const CRITICAL_HEADERS = [
  {
    name: 'content-security-policy',
    risk: 'Alto: Riesgo de ataques XSS (Cross-Site Scripting) e inyección de datos.',
    recommendation: "Define directivas estrictas como default-src 'self'.",
    weight: 25,
  },
  {
    name: 'strict-transport-security',
    risk: 'Alto: Tráfico vulnerable a ataques de degradación a HTTP (Man-in-the-Middle).',
    recommendation: 'Configura max-age=31536000; includeSubDomains; preload.',
    weight: 25,
  },
  // ... otras cabeceras


];


export async function scanHeaders(targetUrl: string): Promise<HeaderScanOutput> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 4000);

  try {
    const response = await fetch(targetUrl, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'SecurityAuditBot/1.0 (+https://localhost/bot-info)',
      },
      signal: controller.signal,
      redirect: 'follow',
    });

    clearTimeout(timeoutId);


    let score = 0;
    const headers: HeaderResult[] = CRITICAL_HEADERS.map((h) => {
      const headerValue = response.headers.get(h.name);
      const isPresent = Boolean(headerValue);

      if (isPresent) {
        score += h.weight;
      }

      return {
        name: h.name,
        present: isPresent,
        value: headerValue || null,
        risk: h.risk,
        recommendation: h.recommendation,
      };
    });

    return { headers, score };
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(
      error instanceof Error ? error.message : 'Error al conectar con el servidor destino.'
    );
  }
}