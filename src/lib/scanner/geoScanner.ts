import net from 'net';
import { isPrivateOrLocalHost } from '@/lib/security/ssrfValidator';

export interface ServerGeoLocation {
  ip: string;
  country: string;
  countryCode: string;
  region: string;
  city: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
}

// Caché en Memoria de Geolocalización (TTL 24 horas para evitar saturación de API)
const GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const MAX_GEO_CACHE_ENTRIES = 1000;

interface GeoCacheEntry {
  data: ServerGeoLocation;
  expiresAt: number;
}

const globalForGeoCache = globalThis as unknown as {
  __serverGeoCache?: Map<string, GeoCacheEntry>;
};

if (!globalForGeoCache.__serverGeoCache) {
  globalForGeoCache.__serverGeoCache = new Map<string, GeoCacheEntry>();
}

const geoCache = globalForGeoCache.__serverGeoCache;

/**
 * Consulta de geolocalización segura bajo HTTPS con timeout estricto (900ms) y caché de 24h.
 * Fail-safe: Si falla o excede el tiempo, retorna null sin detener la auditoría principal.
 */
export async function lookupServerLocation(ipOrHost: string): Promise<ServerGeoLocation | null> {
  if (!ipOrHost || typeof ipOrHost !== 'string') {
    return null;
  }

  const cleanIp = ipOrHost.trim().toLowerCase().replace(/^\[|\]$/g, '');

  // 1. Validar que sea una IP real (no dominios malformados o inyecciones)
  if (!net.isIP(cleanIp)) {
    return null;
  }

  // 2. Bloquear IPs privadas, de loopback o de infraestructura interna
  if (isPrivateOrLocalHost(cleanIp)) {
    return null;
  }

  // 3. Revisar Caché en Memoria (Respuesta en 0 ms sin consumir llamadas de red)
  const cached = geoCache.get(cleanIp);
  if (cached) {
    if (Date.now() < cached.expiresAt) {
      return cached.data;
    }
    geoCache.delete(cleanIp);
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 950);

    // Consulta segura cifrada bajo HTTPS
    const res = await fetch(`https://ipwho.is/${encodeURIComponent(cleanIp)}`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    if (!data || data.success === false) return null;

    const locationResult: ServerGeoLocation = {
      ip: data.ip || cleanIp,
      country: data.country || 'Desconocido',
      countryCode: data.country_code || '',
      region: data.region || '',
      city: data.city || '',
      lat: Number(data.latitude) || 0,
      lon: Number(data.longitude) || 0,
      timezone: data.timezone?.id || 'UTC',
      isp: data.connection?.isp || data.connection?.org || 'Desconocido',
      org: data.connection?.org || '',
      as: data.connection?.asn ? `AS${data.connection.asn}` : '',
    };

    // Almacenar en caché con rotación FIFO
    if (geoCache.size >= MAX_GEO_CACHE_ENTRIES) {
      const oldestKey = geoCache.keys().next().value;
      if (oldestKey) geoCache.delete(oldestKey);
    }
    geoCache.set(cleanIp, {
      data: locationResult,
      expiresAt: Date.now() + GEO_CACHE_TTL_MS,
    });

    return locationResult;
  } catch {
    return null;
  }
}
