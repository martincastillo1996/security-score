'use client';

import { MapPin } from 'lucide-react';
import { ServerGeoLocation } from '@/lib/scanner/geoScanner';

interface Props {
  location?: ServerGeoLocation | null;
  resolvedIp?: string;
}

export default function ServerLocationCard({ location, resolvedIp }: Props) {
  // Coordenadas normalizadas a la proyección SVG (ancho 360, alto 180)
  // Lat: [-90, 90] -> y: [180, 0]
  // Lon: [-180, 180] -> x: [0, 360]
  const lat = location?.lat ?? 33.85;
  const lon = location?.lon ?? -84.37;
  const x = Math.max(10, Math.min(350, ((lon + 180) / 360) * 360));
  const y = Math.max(10, Math.min(170, ((90 - lat) / 180) * 180));

  return (
    <div className="rounded-3xl bg-[#161617]/70 border border-white/10 p-6 backdrop-blur-2xl shadow-xl space-y-6">
      
      {/* Encabezado con estética Apple */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#2997ff]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-tight">Ubicación del Servidor & Perímetro</h3>
            <p className="text-[11px] text-[#86868b]">Geolocalización del hosting, ASN y latencia de infraestructura</p>
          </div>
        </div>

        {location?.countryCode && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white">
            <span className="text-base leading-none">
              {getCountryFlag(location.countryCode)}
            </span>
            <span>{location.countryCode}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* Mapa Mundial Estilo Apple / WebCheck (SVG Vectorial Oscuro) */}
        <div className="lg:col-span-7 relative rounded-2xl bg-[#0d0d0e] border border-white/5 p-4 overflow-hidden flex items-center justify-center min-h-[190px]">
          
          {/* Grilla sutil de fondo */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#2997ff 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />

          {/* Silueta de Continentes SVG */}
          <svg
            viewBox="0 0 360 180"
            className="w-full h-auto max-h-[160px] opacity-35 select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* América del Norte */}
            <path
              d="M40 30 Q65 20 90 28 Q115 35 110 60 Q105 85 85 95 Q65 105 50 80 Q35 55 40 30 Z"
              fill="#86868b"
            />
            {/* América del Sur */}
            <path
              d="M85 100 Q105 105 100 130 Q95 155 80 170 Q70 155 75 130 Q78 115 85 100 Z"
              fill="#86868b"
            />
            {/* Europa */}
            <path
              d="M170 30 Q200 25 205 45 Q195 65 175 60 Q165 45 170 30 Z"
              fill="#86868b"
            />
            {/* África */}
            <path
              d="M175 70 Q205 70 200 105 Q190 140 170 135 Q155 105 175 70 Z"
              fill="#86868b"
            />
            {/* Asia */}
            <path
              d="M210 25 Q270 20 300 50 Q285 90 240 85 Q215 65 210 25 Z"
              fill="#86868b"
            />
            {/* Oceanía */}
            <path
              d="M280 115 Q310 115 305 135 Q285 150 275 135 Q270 125 280 115 Z"
              fill="#86868b"
            />
          </svg>

          {/* Marcador del Servidor Animado (Punto de pulso estilo Apple) */}
          <div 
            className="absolute transition-all duration-700 ease-out flex items-center justify-center"
            style={{
              left: `${(x / 360) * 100}%`,
              top: `${(y / 180) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <span className="absolute w-6 h-6 rounded-full bg-[#2997ff]/30 animate-ping" />
            <span className="relative w-3 h-3 rounded-full bg-[#2997ff] border-2 border-white shadow-[0_0_12px_#2997ff]" />
          </div>

          <div className="absolute bottom-2 left-3 text-[10px] text-[#86868b] flex items-center gap-1.5 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#30d158]" />
            <span>GEO IP: {location ? `${location.lat.toFixed(2)}°, ${location.lon.toFixed(2)}°` : 'Resolviendo...'}</span>
          </div>
        </div>

        {/* Metadatos Forenses de Infraestructura */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
          
          <div className="p-3 rounded-2xl bg-white/2 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#86868b] block font-medium">Ciudad / Región</span>
            <span className="text-white font-semibold truncate block">
              {location?.city ? `${location.city}, ${location.region || ''}` : 'No determinada'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/2 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#86868b] block font-medium">País Anfitrión</span>
            <span className="text-white font-semibold truncate block">
              {location?.country || 'Internacional'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/2 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#86868b] block font-medium">IP Perimetral</span>
            <span className="text-[#2997ff] font-mono font-medium truncate block">
              {location?.ip || resolvedIp || 'Resolviendo...'}
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-white/2 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#86868b] block font-medium">Zona Horaria</span>
            <span className="text-white font-mono truncate block">
              {location?.timezone || 'UTC'}
            </span>
          </div>

          <div className="col-span-2 p-3 rounded-2xl bg-white/2 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#86868b] block font-medium">Proveedor de Red (ASN / ISP)</span>
            <span className="text-[#f5f5f7] font-medium text-[11px] truncate block">
              {location?.as || location?.isp || 'Cloud Infrastructure / CDN'}
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}

// Convertir código ISO de 2 letras en emoji de bandera
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
