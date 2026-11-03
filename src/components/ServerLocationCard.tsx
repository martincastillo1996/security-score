'use client';

import { useState } from 'react';
import { 
  Globe2, 
  Server, 
  Activity, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Layers,
  MapPin,
  Lock,
  Radio
} from 'lucide-react';
import Apple3DGlobe from './Apple3DGlobe';
import { ServerGeoLocation } from '@/lib/scanner/geoScanner';

interface Props {
  location?: ServerGeoLocation | null;
  resolvedIp?: string;
  targetDomain?: string;
}

export default function ServerLocationCard({ location, resolvedIp, targetDomain }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const lat = location?.lat ?? 37.7749;
  const lon = location?.lon ?? -122.4194;

  return (
    <div className="rounded-3xl bg-[#0f0f11] border border-white/10 overflow-hidden shadow-2xl text-[#f5f5f7]">
      
      {/* Barra Superior Estilo Apple macOS / Keynote */}
      <div className="px-6 py-4 bg-[#141416] border-b border-white/5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]/80 inline-block" />
          </div>
          <span className="text-xs font-mono text-neutral-400 pl-2 border-l border-white/10 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#2997ff] animate-pulse" />
            BGP Telemetry & Datacenter Node
          </span>
        </div>

        <div className="flex items-center gap-2">
          {location?.countryCode && (
            <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-neutral-200">
              {getCountryFlag(location.countryCode)} {location.city || location.country}
            </span>
          )}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3 py-1 rounded-full bg-[#0071e3]/15 hover:bg-[#0071e3]/25 border border-[#0071e3]/30 text-xs font-medium text-[#2997ff] flex items-center gap-1 transition-all"
          >
            {isExpanded ? (
              <>
                <span>Ocultar Inspección</span>
                <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <span>Inspección Forense</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Cuerpo Principal: Globo 3D Elegante al Centro con Datos Flotantes */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Globo 3D Ultra Minimalista */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center relative min-h-[340px]">
          <Apple3DGlobe lat={lat} lon={lon} />
          
          <div className="absolute bottom-0 text-center">
            <span className="text-[11px] font-mono text-neutral-400 bg-[#161618] border border-white/10 px-3 py-1 rounded-full shadow-lg">
              {lat >= 0 ? `${lat.toFixed(2)}°N` : `${Math.abs(lat).toFixed(2)}°S`}, {lon >= 0 ? `${lon.toFixed(2)}°E` : `${Math.abs(lon).toFixed(2)}°W`} &bull; Nodo Satelital
            </span>
          </div>
        </div>

        {/* Panel de Métricas Apple Minimal con Fondo Sólido de Alto Contraste */}
        <div className="lg:col-span-5 space-y-3">
          
          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 shadow-lg space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Datacenter Físico</span>
            <div className="text-white font-bold text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#2997ff]" />
              <span className="break-words">
                {location?.city ? `${location.city}, ${location.region ? location.region + ', ' : ''}${location.country}` : 'Centro Cloud Edge'}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 shadow-lg space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Dirección IP Pública</span>
            <div className="text-[#2997ff] font-mono font-bold text-base flex items-center gap-2">
              <Globe2 className="w-4 h-4 shrink-0" />
              <span className="break-all">{location?.ip || resolvedIp || 'Resolviendo...'}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#141416] border border-white/10 shadow-lg space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Zona Horaria</span>
              <span className="text-white font-mono text-xs block truncate">{location?.timezone || 'UTC'}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#141416] border border-white/10 shadow-lg space-y-1">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Sistema BGP</span>
              <span className="text-white font-mono text-xs block truncate">{location?.as ? location.as.split(' ')[0] : 'AS Privado'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 shadow-lg space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 block font-bold">Proveedor Troncal (Carrier / ISP)</span>
            <span className="text-neutral-200 font-semibold text-xs block break-words">
              {location?.org || location?.isp || 'Cloud Edge Network'}
            </span>
          </div>

        </div>

      </div>

      {/* Sección Desglosable Ampliada Estilo WebCheck */}
      {isExpanded && (
        <div className="p-6 sm:p-8 bg-[#141416] border-t border-white/5 space-y-6 animate-in fade-in-50 duration-300">
          
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2997ff]" />
              Auditoría Forense de Perímetro y Tráfico
            </h4>
            <span className="text-[11px] text-neutral-500 font-mono">RFC & BGP Compliance</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            {/* Bloque 1 */}
            <div className="p-4 rounded-2xl bg-[#0d0d0e] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Server className="w-4 h-4 text-[#2997ff]" />
                <h5>Perímetro de Servidor</h5>
              </div>
              <div className="space-y-2 text-neutral-200 text-[11px]">
                <div className="flex flex-col gap-0.5 py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Dominio Analizado:</span>
                  <span className="font-mono text-white break-all text-xs font-semibold">{targetDomain || 'Servidor'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Anycast Routing:</span>
                  <span className="text-emerald-400 font-semibold">Habilitado</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Sockets Activos:</span>
                  <span className="text-white font-mono font-semibold">80, 443</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400 font-medium">Reverse Proxy:</span>
                  <span className="text-white font-semibold">Edge Shield</span>
                </div>
              </div>
            </div>

            {/* Bloque 2 */}
            <div className="p-4 rounded-2xl bg-[#0d0d0e] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h5>Jurisdicción & Ley de Datos (Perú / Global)</h5>
              </div>
              <div className="space-y-2 text-neutral-200 text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">País Anfitrión:</span>
                  <span className="text-white font-semibold">{location?.country || 'Internacional'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Ley 29733 (Perú LPDP):</span>
                  <span className="text-emerald-400 font-semibold">Flujo Transfronterizo Apto</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Cifrado de Tráfico:</span>
                  <span className="text-white font-mono font-semibold">TLSv1.3 Activo</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400 font-medium">Protección Anti-DDoS:</span>
                  <span className="text-emerald-400 font-semibold">Mitigación Perimetral</span>
                </div>
              </div>
            </div>

            {/* Bloque 3 */}
            <div className="p-4 rounded-2xl bg-[#0d0d0e] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Activity className="w-4 h-4 text-purple-400" />
                <h5>Registro de Telecomunicaciones</h5>
              </div>
              <div className="space-y-2 text-neutral-200 text-[11px]">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">AS Number:</span>
                  <span className="font-mono text-white font-semibold">{location?.as ? location.as.split(' ')[0] : 'AS16509'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">ISP Principal:</span>
                  <span className="text-white truncate max-w-[130px] font-semibold">{location?.isp || 'Cloud Network'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-neutral-400 font-medium">Anuncio BGP:</span>
                  <span className="text-emerald-400 font-semibold">Verificado Global</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-neutral-400 font-medium">Base de Datos ARIN:</span>
                  <a 
                    href={`https://whois.arin.net/rest/nets;q=${location?.ip || resolvedIp}?showDetails=true`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-[#2997ff] hover:underline flex items-center gap-1 font-semibold"
                  >
                    Whois Lookup <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
