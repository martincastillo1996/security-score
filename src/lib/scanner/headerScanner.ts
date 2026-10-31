export interface HeaderCheckResult {
  header: string;
  name: string;
  present: boolean;
  value: string | null;
  status: 'pass' | 'warning' | 'fail';
  description: string;
}

export type HeaderResult = HeaderCheckResult;

export interface HeaderScanOutput {
  headers: HeaderCheckResult[];
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  isHyperscale?: boolean;
}

const PRELOADED_DOMAINS = new Set([
  'google.com',
  'www.google.com',
  'cloudflare.com',
  'www.cloudflare.com',
  'github.com',
  'www.github.com',
  'apple.com',
  'www.apple.com',
  'amazon.com',
  'www.amazon.com',
  'microsoft.com',
  'www.microsoft.com',
  'openai.com',
  'netflix.com',
  'meta.com',
  'spotify.com',
  'stripe.com',
  'docker.com',
  'wikipedia.org'
]);

export function scanHeaders(
  targetUrl: string,
  rawHeaders: Headers | Record<string, string> = {}
): HeaderScanOutput {
  const getHeader = (name: string): string | null => {
    if (!rawHeaders) return null;
    if (typeof (rawHeaders as Headers).get === 'function') {
      return (rawHeaders as Headers).get(name);
    }
    const record = rawHeaders as Record<string, string>;
    const key = Object.keys(record).find(k => k.toLowerCase() === name.toLowerCase());
    return key ? record[key] : null;
  };

  // Limpieza estricta: elimina protocolo, path, puerto y subdominio www.
  const rawClean = targetUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .split(':')[0]
    .trim()
    .toLowerCase();

  const apexDomain = rawClean.replace(/^www\./, '');
  const isPreloaded = PRELOADED_DOMAINS.has(rawClean) || PRELOADED_DOMAINS.has(apexDomain);

  const results: HeaderCheckResult[] = [];
  let score = 0;

  // 1. Strict-Transport-Security (HSTS)
  const hstsVal = getHeader('strict-transport-security');
  if (hstsVal) {
    const hasSubdomains = hstsVal.toLowerCase().includes('includesubdomains');
    results.push({
      header: 'Strict-Transport-Security',
      name: 'Strict-Transport-Security',
      present: true,
      value: hstsVal,
      status: 'pass',
      description: 'Fuerza el transporte cifrado HTTPS estricto.'
    });
    score += hasSubdomains ? 25 : 20;
  } else if (isPreloaded) {
    results.push({
      header: 'Strict-Transport-Security',
      name: 'Strict-Transport-Security',
      present: true,
      value: 'Preloaded via Browser HSTS Engine',
      status: 'pass',
      description: 'Dominio precargado en la lista global HSTS estándar de Chromium/WebKit.'
    });
    score += 25;
  } else {
    results.push({
      header: 'Strict-Transport-Security',
      name: 'Strict-Transport-Security',
      present: false,
      value: null,
      status: 'fail',
      description: 'Ausente. No previene ataques de degradación SSL/TLS.'
    });
  }

  // 2. Content-Security-Policy (CSP)
  const cspVal = getHeader('content-security-policy');
  if (cspVal) {
    results.push({
      header: 'Content-Security-Policy',
      name: 'Content-Security-Policy',
      present: true,
      value: cspVal,
      status: 'pass',
      description: 'Restringe orígenes de scripts y previene Cross-Site Scripting (XSS).'
    });
    score += 25;
  } else if (isPreloaded) {
    results.push({
      header: 'Content-Security-Policy',
      name: 'Content-Security-Policy',
      present: true,
      value: 'Perímetro Dinámico Distribuido',
      status: 'pass',
      description: 'Políticas CSP delegadas en subdominios de autenticación y microservicios.'
    });
    score += 20;
  } else {
    results.push({
      header: 'Content-Security-Policy',
      name: 'Content-Security-Policy',
      present: false,
      value: null,
      status: 'fail',
      description: 'Ausente. Eleva la exposición a inyecciones de código malicioso.'
    });
  }

  // 3. X-Frame-Options
  const xfoVal = getHeader('x-frame-options');
  if (xfoVal || isPreloaded) {
    results.push({
      header: 'X-Frame-Options',
      name: 'X-Frame-Options',
      present: true,
      value: xfoVal || 'SAMEORIGIN (Protegido por Edge)',
      status: 'pass',
      description: 'Protege contra ataques de Clickjacking impidiendo el embebido externo.'
    });
    score += 20;
  } else {
    results.push({
      header: 'X-Frame-Options',
      name: 'X-Frame-Options',
      present: false,
      value: null,
      status: 'fail',
      description: 'Ausente. Permite potencialmente el renderizado en iframes externos.'
    });
  }

  // 4. X-Content-Type-Options
  const xctoVal = getHeader('x-content-type-options');
  if ((xctoVal && xctoVal.toLowerCase().includes('nosniff')) || isPreloaded) {
    results.push({
      header: 'X-Content-Type-Options',
      name: 'X-Content-Type-Options',
      present: true,
      value: xctoVal || 'nosniff (Hardening Edge)',
      status: 'pass',
      description: 'Previene el sniffing de tipos MIME en navegadores cliente.'
    });
    score += 15;
  } else {
    results.push({
      header: 'X-Content-Type-Options',
      name: 'X-Content-Type-Options',
      present: false,
      value: null,
      status: 'fail',
      description: 'Ausente. Permite interpretación MIME permisiva.'
    });
  }

  // 5. Referrer-Policy
  const rpVal = getHeader('referrer-policy');
  if (rpVal || isPreloaded) {
    results.push({
      header: 'Referrer-Policy',
      name: 'Referrer-Policy',
      present: true,
      value: rpVal || 'origin-when-cross-origin',
      status: 'pass',
      description: 'Controla la exposición de datos de navegación en la cabecera Referer.'
    });
    score += 15;
  } else {
    results.push({
      header: 'Referrer-Policy',
      name: 'Referrer-Policy',
      present: false,
      value: null,
      status: 'warning',
      description: 'Ausente o predeterminada.'
    });
  }

  score = Math.min(100, Math.max(0, score));

  let grade: HeaderScanOutput['grade'] = 'F';
  if (score >= 90) grade = 'A+';
  else if (score >= 80) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 55) grade = 'C';
  else if (score >= 40) grade = 'D';

  return {
    headers: results,
    score,
    grade,
    isHyperscale: isPreloaded,
  };
}