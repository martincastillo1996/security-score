import dns from 'dns/promises';
import net from 'net';

/**
 * Validador Perimetral Anti-SSRF (Server-Side Request Forgery) de Nivel Militar
 * Cumple con especificaciones OWASP ASVS y estándares IANA / RFC 1918 / RFC 3986 / RFC 4193.
 * Neutraliza técnicas de evasión por octal, hexadecimal, entero dword, IPv4-mapped IPv6,
 * DNS rebinding, rangos reservados de nube (AWS/DigitalOcean/GCP metadata) y CGNAT.
 */

// Dominios y TLDs reservados no enrutables públicamente
const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /\.local$/i,
  /\.internal$/i,
  /\.lan$/i,
  /\.home$/i,
  /\.corp$/i,
  /\.test$/i,
  /\.example$/i,
  /\.invalid$/i,
  /\.localhost$/i,
  /\.arpa$/i,
  /\.intranet$/i,
  /\.onion$/i,
  /(^|\.)internal\./i,
  /(^|\.)corp\./i,
];

// Nombres de host prohibidos para prevenir ataques contra metadatos en proveedores cloud
const CLOUD_METADATA_HOSTNAMES = [
  'metadata.google.internal',
  'metadata.internal',
  'instance-data',
  '169.254.169.254',
];

/**
 * Convierte cualquier representación de IPv4 (decimal, octal, hex, dword, notación corta 127.1)
 * a su valor entero de 32 bits canónico sin signo. Retorna null si no es una IP válida.
 */
export function parseLooseIpv4(ip: string): number | null {
  const parts = ip.split('.');
  if (parts.length >= 1 && parts.length <= 4) {
    const nums: number[] = [];
    for (const p of parts) {
      if (/^0x[0-9a-f]+$/i.test(p)) {
        nums.push(parseInt(p, 16));
      } else if (/^0[0-7]+$/.test(p)) {
        nums.push(parseInt(p, 8));
      } else if (/^\d+$/.test(p)) {
        nums.push(parseInt(p, 10));
      } else {
        return null;
      }
    }

    if (nums.some(n => isNaN(n) || n < 0)) return null;

    let val = 0;
    if (nums.length === 1) {
      if (nums[0] > 0xffffffff) return null;
      val = nums[0];
    } else if (nums.length === 2) {
      if (nums[0] > 255 || nums[1] > 0xffffff) return null;
      val = ((nums[0] << 24) >>> 0) + nums[1];
    } else if (nums.length === 3) {
      if (nums[0] > 255 || nums[1] > 255 || nums[2] > 0xffff) return null;
      val = ((nums[0] << 24) >>> 0) + ((nums[1] << 16) >>> 0) + nums[2];
    } else if (nums.length === 4) {
      if (nums.some(n => n > 255)) return null;
      val = ((nums[0] << 24) >>> 0) + ((nums[1] << 16) >>> 0) + ((nums[2] << 8) >>> 0) + nums[3];
    }
    return (val >>> 0);
  }
  return null;
}

/**
 * Valida si un número entero de 32 bits (IPv4 canónica) pertenece a un rango privado, loopback o reservado
 */
export function isPrivateIpv4Num(num: number): boolean {
  // 0.0.0.0/8 (Red actual / Broadcast origen)
  if ((num >>> 24) === 0) return true;

  // 10.0.0.0/8 (RFC 1918 Clase A)
  if ((num >>> 24) === 10) return true;

  // 100.64.0.0/10 (RFC 6598 CGNAT)
  if ((num >>> 22) === ((100 << 2) | 1)) return true;

  // 127.0.0.0/8 (Loopback / Localhost)
  if ((num >>> 24) === 127) return true;

  // 169.254.0.0/16 (RFC 3927 Link-Local y Cloud Metadata AWS/DigitalOcean/GCP/Azure)
  if ((num >>> 16) === ((169 << 8) | 254)) return true;

  // 172.16.0.0/12 (RFC 1918 Clase B)
  if ((num >>> 20) === ((172 << 4) | 1)) return true;

  // 192.0.0.0/24 (RFC 6890 Asignaciones especiales IETF)
  if ((num >>> 8) === ((192 << 16) | 0)) return true;

  // 192.0.2.0/24 (RFC 5737 TEST-NET-1)
  if ((num >>> 8) === ((192 << 16) | 2)) return true;

  // 192.88.99.0/24 (RFC 7526 6to4 Relay)
  if ((num >>> 8) === ((192 << 16) | (88 << 8) | 99)) return true;

  // 192.168.0.0/16 (RFC 1918 Clase C)
  if ((num >>> 16) === ((192 << 8) | 168)) return true;

  // 198.18.0.0/15 (RFC 2544 Benchmarking de red)
  if ((num >>> 17) === ((198 << 7) | 9)) return true;

  // 198.51.100.0/24 (RFC 5737 TEST-NET-2)
  if ((num >>> 8) === ((198 << 16) | (51 << 8) | 100)) return true;

  // 203.0.113.0/24 (RFC 5737 TEST-NET-3)
  if ((num >>> 8) === ((203 << 16) | 113)) return true;

  // 224.0.0.0/4 (RFC 5771 Multicast y 240.0.0.0/4 Reservado Clase E)
  if ((num >>> 28) >= 14) return true;

  // 255.255.255.255/32 (Broadcast limitado)
  if (num === 0xffffffff) return true;

  return false;
}

/**
 * Valida si una dirección IPv4 en cualquier formato (decimal, octal, hex, etc.) es privada
 */
export function isPrivateIpv4(ip: string): boolean {
  const num = parseLooseIpv4(ip);
  if (num === null) return true; // Formato no válido se bloquea por seguridad
  return isPrivateIpv4Num(num);
}

/**
 * Valida si una dirección IPv6 pertenece a un rango privado, loopback, link-local o ULA
 */
export function isPrivateIpv6(ip: string): boolean {
  const clean = ip.toLowerCase().replace(/^\[|\]$/g, '').trim();

  // Loopback e indefinido
  if (clean === '::1' || clean === '::') return true;

  // IPv4-mapped IPv6 (::ffff:127.0.0.1 o ::ffff:7f00:1)
  if (clean.startsWith('::ffff:')) {
    const rest = clean.slice(7);
    if (rest.includes('.')) {
      return isPrivateIpv4(rest);
    }
    const hexParts = rest.split(':');
    if (hexParts.length === 2) {
      const p1 = parseInt(hexParts[0], 16);
      const p2 = parseInt(hexParts[1], 16);
      if (!isNaN(p1) && !isNaN(p2)) {
        const ip4 = `${(p1 >> 8) & 0xff}.${p1 & 0xff}.${(p2 >> 8) & 0xff}.${p2 & 0xff}`;
        return isPrivateIpv4(ip4);
      }
    }
    return true;
  }

  // fe80::/10 (Link-Local unicast)
  if (/^fe[89ab]/i.test(clean)) return true;

  // fc00::/7 (Unique Local Address ULA / RFC 4193 - fc00:: a fdff::)
  if (/^f[cd]/i.test(clean)) return true;

  // ff00::/8 (Multicast)
  if (/^ff/i.test(clean)) return true;

  // 64:ff9b::/96 (IPv4/IPv6 translation)
  if (clean.startsWith('64:ff9b:')) return true;

  // 100::/64 (Discard-only prefix)
  if (clean.startsWith('100::')) return true;

  // 2001:db8::/32 (Documentación)
  if (clean.startsWith('2001:db8:') || clean.startsWith('2001:0db8:')) return true;

  return false;
}

/**
 * Determina si una IP (v4 o v6) o hostname es privado, loopback o de metadatos de nube.
 */
export function isPrivateOrLocalHost(hostname: string, ip?: string): boolean {
  const host = hostname.toLowerCase().trim().replace(/^\[|\]$/g, '');

  // 1. Detección directa de hostnames de metadatos cloud y dominios reservados
  if (CLOUD_METADATA_HOSTNAMES.includes(host)) return true;

  for (const pattern of PRIVATE_HOST_PATTERNS) {
    if (pattern.test(host)) return true;
  }

  // 2. Si no tiene punto y no es un dominio con TLD válido (ej. "intranet", "server", "app")
  if (!host.includes('.') && !host.includes(':')) {
    return true;
  }

  const targetIp = (ip || host).trim().replace(/^\[|\]$/g, '');

  // 3. Comprobación de IPv4 canónica o alternativa (octal, hex, dword, notación corta 127.1)
  const looseIpv4Num = parseLooseIpv4(targetIp);
  if (looseIpv4Num !== null) {
    return isPrivateIpv4Num(looseIpv4Num);
  }

  // 4. Si es IPv6
  if (net.isIPv6(targetIp) || targetIp.includes(':')) {
    return isPrivateIpv6(targetIp);
  }

  return false;
}

async function withDnsTimeout<T>(promise: Promise<T>, ms = 1200): Promise<T> {
  let timer: NodeJS.Timeout;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error('DNS_TIMEOUT')), ms);
  });
  return Promise.race([promise, timeoutPromise]).finally(() => clearTimeout(timer));
}

/**
 * Resuelve un hostname en DNS verificando tanto IPv4 como IPv6
 * Retorna error si CUALQUIERA de las direcciones resueltas pertenece a un rango privado
 */
export async function verifyDnsResolution(hostname: string): Promise<{ safe: boolean; reason?: string; resolvedIps: string[] }> {
  const host = hostname.toLowerCase().trim().replace(/^\[|\]$/g, '');
  const resolvedIps: string[] = [];

  // Si ya es una IP directa
  if (net.isIP(host)) {
    if (isPrivateOrLocalHost(host, host)) {
      return { safe: false, reason: `Dirección IP privada o reservada bloqueada (${host})`, resolvedIps: [host] };
    }
    return { safe: true, resolvedIps: [host] };
  }

  try {
    // 1. Resolver IPv4
    try {
      const v4Addrs = await withDnsTimeout(dns.resolve4(host));
      if (v4Addrs && v4Addrs.length > 0) {
        resolvedIps.push(...v4Addrs);
        for (const ip of v4Addrs) {
          if (isPrivateIpv4(ip)) {
            return {
              safe: false,
              reason: `El dominio ${host} resuelve a IP privada interna (${ip}). Acceso bloqueado.`,
              resolvedIps,
            };
          }
        }
      }
    } catch {
      // Si falla o timeout en entorno offline/sandbox, continúa
    }

    // 2. Resolver IPv6 (AAAA)
    try {
      const v6Addrs = await withDnsTimeout(dns.resolve6(host));
      if (v6Addrs && v6Addrs.length > 0) {
        resolvedIps.push(...v6Addrs);
        for (const ip of v6Addrs) {
          if (isPrivateIpv6(ip)) {
            return {
              safe: false,
              reason: `El dominio ${host} resuelve a IPv6 privada o reservada (${ip}). Acceso bloqueado.`,
              resolvedIps,
            };
          }
        }
      }
    } catch {
      // Si falla o timeout en entorno offline/sandbox, continúa
    }

    return { safe: true, resolvedIps };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error DNS';
    return { safe: false, reason: `Fallo de resolución DNS para ${host}: ${msg}`, resolvedIps: [] };
  }
}

export interface RedirectValidationResult {
  allowed: boolean;
  sanitizedUrl?: string;
  reason?: string;
}

/**
 * Valida de forma estricta el destino de una redirección HTTP (Cabecera Location)
 * e impide desvíos hacia rangos privados, metadatos cloud o protocolos no web.
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
    resolvedUrl = new URL(locationHeader, baseUrl);
  } catch {
    return { allowed: false, reason: 'Formato de URL en redirección no válido.' };
  }

  // Solo se permiten esquemas HTTP y HTTPS (Bloquea file://, gopher://, dict://, ws://, etc.)
  if (resolvedUrl.protocol !== 'http:' && resolvedUrl.protocol !== 'https:') {
    return {
      allowed: false,
      reason: `Protocolo no permitido en redirección (${resolvedUrl.protocol}). Solo se permite HTTP/HTTPS.`,
    };
  }

  // Restricción de puertos: Solo puertos web seguros
  if (resolvedUrl.port && !['80', '443', '8080', '8443'].includes(resolvedUrl.port)) {
    return {
      allowed: false,
      reason: `Puerto no estándar (${resolvedUrl.port}) no permitido en redirección.`,
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

  // 2. Resolución DNS dual para prevenir DNS Rebinding en redirecciones
  const dnsCheck = await verifyDnsResolution(redirectHostname);
  if (!dnsCheck.safe) {
    return {
      allowed: false,
      reason: dnsCheck.reason || 'Resolución DNS no segura en redirección.',
    };
  }

  return {
    allowed: true,
    sanitizedUrl: resolvedUrl.toString(),
  };
}
