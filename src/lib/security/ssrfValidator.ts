import dns from 'dns/promises';

/**
 * Validador perimetral anti-SSRF (Server-Side Request Forgery)
 * Cumple con especificaciones OWASP y estándares RFC 1918 / RFC 3986.
 */

// Rangos de IP y dominios reservados privados / loopback / cloud metadata
const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /\.local$/i,
  /\.internal$/i,
  /\.lan$/i,
  /\.home$/i,
  /\.corp$/i,
];

/**
 * Determina si un hostname o IP pertenece a un rango privado, local o de metadatos de nube.
 */
export function isPrivateOrLocalHost(hostname: string, ip?: string): boolean {
  const host = hostname.toLowerCase().trim();

  // 1. Dominios reservados
  for (const pattern of PRIVATE_HOST_PATTERNS) {
    if (pattern.test(host)) return true;
  }

  const targetIp = (ip || host).trim();

  // 2. Loopback IPv4 e IPv6 (127.0.0.0/8, ::1)
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(targetIp) || targetIp === '::1' || targetIp === '0.0.0.0') {
    return true;
  }

  // 3. Cloud Provider Metadata / Link-Local (169.254.0.0/16, fe80::/10)
  if (/^169\.254\.\d{1,3}\.\d{1,3}$/.test(targetIp) || /^fe80:/i.test(targetIp)) {
    return true;
  }

  // 4. RFC 1918 - Redes privadas Clase A (10.0.0.0/8)
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // 5. RFC 1918 - Redes privadas Clase B (172.16.0.0/12)
  if (/^172\.(1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // 6. RFC 1918 - Redes privadas Clase C (192.168.0.0/16)
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  // 7. CGNAT (100.64.0.0/10)
  if (/^100\.(6[4-9]|[7-9]\d|1[0-1]\d|12[0-7])\.\d{1,3}\.\d{1,3}$/.test(targetIp)) {
    return true;
  }

  return false;
}

export interface RedirectValidationResult {
  allowed: boolean;
  sanitizedUrl?: string;
  reason?: string;
}

/**
 * Valida de forma estricta el destino de una redirección HTTP (Cabecera Location)
 * e impide desvíos hacia rangos privados o protocolos peligrosos (file://, gopher://, etc.).
 */
export async function validateRedirectTarget(
  baseUrl: string,
  locationHeader: string
): Promise<RedirectValidationResult> {
  if (!locationHeader || typeof locationHeader !== 'string') {
    return { allowed: false, reason: 'Cabecera Location ausente o vacía.' };
  }

  let resolvedUrl: URL;
  try {
    // Soporta tanto URLs relativas (/login) como absolutas (https://ejemplo.com)
    resolvedUrl = new URL(locationHeader, baseUrl);
  } catch {
    return { allowed: false, reason: 'Formato de URL en redirección no válido.' };
  }

  // Solo se permiten esquemas HTTP y HTTPS (Bloquea file://, ftp://, gopher://, etc.)
  if (resolvedUrl.protocol !== 'http:' && resolvedUrl.protocol !== 'https:') {
    return {
      allowed: false,
      reason: `Protocolo no permitido en redirección (${resolvedUrl.protocol}). Solo se permite HTTP/HTTPS.`,
    };
  }

  const redirectHostname = resolvedUrl.hostname.toLowerCase();

  // 1. Comprobación directa de nombre de host
  if (isPrivateOrLocalHost(redirectHostname)) {
    return {
      allowed: false,
      reason: `Intento de redirección SSRF bloqueado hacia host privado o reservado: ${redirectHostname}`,
    };
  }

  // 2. Resolución DNS para verificar que el hostname no resuelva a una IP privada (DNS Rebinding / Slipping)
  try {
    const addresses = await dns.resolve4(redirectHostname);
    if (addresses && addresses.length > 0) {
      for (const ip of addresses) {
        if (isPrivateOrLocalHost(redirectHostname, ip)) {
          return {
            allowed: false,
            reason: `Intento de redirección SSRF bloqueado: ${redirectHostname} resuelve a IP privada interna (${ip}).`,
          };
        }
      }
    }
  } catch {
    // Si no resuelve DNS, permitimos que el fetch maneje el error normal de red
  }

  return {
    allowed: true,
    sanitizedUrl: resolvedUrl.toString(),
  };
}
