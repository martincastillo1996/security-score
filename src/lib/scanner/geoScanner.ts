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

/**
 * Consulta ultrarrápida (timeout 800ms) de geolocalización de IP para mapa perimetral.
 * Fail-safe: Si falla o da timeout, retorna null sin detener la auditoría principal.
 */
export async function lookupServerLocation(ip: string): Promise<ServerGeoLocation | null> {
  if (!ip || ip === '127.0.0.1' || ip === '::1') {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 900);

    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,countryCode,regionName,city,lat,lon,timezone,isp,org,as,query`, {
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = await res.json();
    if (data.status !== 'success') return null;

    return {
      ip: data.query || ip,
      country: data.country || 'Desconocido',
      countryCode: data.countryCode || '',
      region: data.regionName || '',
      city: data.city || '',
      lat: Number(data.lat) || 0,
      lon: Number(data.lon) || 0,
      timezone: data.timezone || 'UTC',
      isp: data.isp || 'Desconocido',
      org: data.org || '',
      as: data.as || '',
    };
  } catch {
    return null;
  }
}
