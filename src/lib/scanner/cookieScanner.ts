export interface CookieAuditItem {
  name: string;
  hasSecure: boolean;
  hasHttpOnly: boolean;
  sameSite: 'Strict' | 'Lax' | 'None' | 'Ausente';
  isCompliant: boolean;
  issues: string[];
}

export interface CookieScanResult {
  totalCookies: number;
  secureCookies: number;
  compliantCount: number;
  items: CookieAuditItem[];
}

export function auditCookies(setCookieHeaderValue: string | string[] | null): CookieScanResult {
  if (!setCookieHeaderValue) {
    return {
      totalCookies: 0,
      secureCookies: 0,
      compliantCount: 0,
      items: [],
    };
  }

  const rawCookies = Array.isArray(setCookieHeaderValue)
    ? setCookieHeaderValue
    : [setCookieHeaderValue];

  const items: CookieAuditItem[] = [];

  for (const raw of rawCookies) {
    // Si vienen múltiples cookies separadas por saltos de línea o comas
    const parts = raw.split(/,(?=[a-zA-Z0-9_\-]+=[^;]+)/g);
    for (const cookieStr of parts) {
      const segments = cookieStr.split(';').map((s) => s.trim());
      if (segments.length === 0 || !segments[0].includes('=')) continue;

      const cookieName = segments[0].split('=')[0].trim();
      const lower = cookieStr.toLowerCase();

      const hasSecure = lower.includes('; secure') || lower.endsWith('; secure') || lower.includes(';secure');
      const hasHttpOnly = lower.includes('; httponly') || lower.endsWith('; httponly') || lower.includes(';httponly');

      let sameSite: 'Strict' | 'Lax' | 'None' | 'Ausente' = 'Ausente';
      if (lower.includes('samesite=strict')) sameSite = 'Strict';
      else if (lower.includes('samesite=lax')) sameSite = 'Lax';
      else if (lower.includes('samesite=none')) sameSite = 'None';

      const issues: string[] = [];
      if (!hasSecure) {
        issues.push('Falta directiva Secure (se transmite en texto plano)');
      }
      if (!hasHttpOnly) {
        issues.push('Falta directiva HttpOnly (accesible vía JavaScript/XSS)');
      }
      if (sameSite === 'Ausente' || sameSite === 'None') {
        issues.push('SameSite permisivo o ausente (vulnerable a CSRF)');
      }

      const isCompliant = hasSecure && hasHttpOnly && (sameSite === 'Strict' || sameSite === 'Lax');

      items.push({
        name: cookieName,
        hasSecure,
        hasHttpOnly,
        sameSite,
        isCompliant,
        issues,
      });
    }
  }

  const secureCookies = items.filter((c) => c.hasSecure).length;
  const compliantCount = items.filter((c) => c.isCompliant).length;

  return {
    totalCookies: items.length,
    secureCookies,
    compliantCount,
    items,
  };
}
