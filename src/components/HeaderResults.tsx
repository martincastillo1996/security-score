'use client';

import { useState } from 'react';
import { HeaderResult } from '@/lib/scanner/headerScanner';
import { 
  ShieldAlert, 
  Binary, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Layers,
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

interface Props {
  headers: HeaderResult[];
}

const DUAL_TRANSLATIONS: Record<string, { plain: string; technical: string; fixSnippet: string }> = {
  'content-security-policy': {
    plain: 'Evita que atacantes inyecten virus o scripts falsos dentro de tu web para robar contraseñas o clonar pasarelas de pago.',
    technical: 'Mitigación estricta contra Cross-Site Scripting (XSS) y Data Injection limitando los orígenes autorizados por el W3C.',
    fixSnippet: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self'; style-src 'self';\" always;"
  },
  'strict-transport-security': {
    plain: 'Obliga a que toda la navegación viaje 100% blindada por candado HTTPS permanente, impidiendo espionaje en redes Wi-Fi públicas.',
    technical: 'Directiva RFC 6797 que fuerza túneles TLS evitando ataques Man-in-the-Middle y degradación de cifrado (SSL Stripping).',
    fixSnippet: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;'
  },
  'x-frame-options': {
    plain: 'Prohíbe que clonen o metan tu web dentro de otra página trampa invisible para engañar a tus clientes haciéndoles clic donde no deben.',
    technical: 'Protección perimetral de interfaz contra secuestro de clics (Clickjacking) restringiendo contextos de renderizado en iframes.',
    fixSnippet: 'add_header X-Frame-Options "DENY" always;'
  },
  'x-content-type-options': {
    plain: 'Impide que los navegadores confundan archivos inofensivos (como una foto) con programas dañinos o virus ejecutables.',
    technical: 'Inhabilita el algoritmo de MIME-sniffing obligando al navegador a interpretar únicamente el Content-Type declarado.',
    fixSnippet: 'add_header X-Content-Type-Options "nosniff" always;'
  },
  'referrer-policy': {
    plain: 'Evita que al hacer clic en un enlace externo se filtre información privada contenida en la barra de direcciones de tu tienda.',
    technical: 'Control de privacidad de cabecera HTTP Referer mitigando fuga de identificadores de sesión o tokens en URLs.',
    fixSnippet: 'add_header Referrer-Policy "strict-origin-when-cross-origin" always;'
  },
  'permissions-policy': {
    plain: 'Apaga por completo el permiso de encender la cámara, micrófono o ubicación del cliente sin que este se entere.',
    technical: 'Control de gobierno perimetral sobre APIs de hardware invasivas y sensores del dispositivo cliente.',
    fixSnippet: 'add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;'
  },
};

const BUSINESS_RISKS: Record<string, string> = {
  'content-security-policy': 'Riesgo: Inyección de publicidad fraudulenta o robo de tarjetas en pasarelas',
  'strict-transport-security': 'Riesgo: Alertas de "Sitio No Seguro" a clientes (Pérdida directa de ventas)',
  'x-frame-options': 'Riesgo: Clonación visual de tu marca / Suplantación de checkout (Clickjacking)',
  'x-content-type-options': 'Riesgo: Ejecución encubierta de malware camuflado en imágenes',
  'referrer-policy': 'Riesgo: Filtración de URLs privadas o tokens de sesión de compradores',
  'permissions-policy': 'Riesgo: Acceso no autorizado a hardware o sensores del dispositivo',
};

export default function HeaderResults({ headers }: Props) {
  const [viewMode, setViewMode] = useState<'plain' | 'technical'>('plain');
  
  // Control de acordeón: por defecto colapsadas para ver lo principal limpiamente,
  // permitiendo abrir una por una al hacer clic o expandir todas.
  const [expandedHeaders, setExpandedHeaders] = useState<Record<string, boolean>>({});

  const toggleHeader = (name: string) => {
    setExpandedHeaders(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const areAllExpanded = headers.length > 0 && headers.every(h => Boolean(expandedHeaders[h.name.toLowerCase()]));

  const toggleAll = () => {
    if (areAllExpanded) {
      setExpandedHeaders({});
    } else {
      const all: Record<string, boolean> = {};
      headers.forEach(h => {
        all[h.name.toLowerCase()] = true;
      });
      setExpandedHeaders(all);
    }
  };

  const passedCount = headers.filter(h => h.present).length;
  const missingCount = headers.length - passedCount;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0c0d10] border border-white/10 p-6 sm:p-8 shadow-2xl transition-all duration-300 space-y-6">
      
      {/* 1. LO PRINCIPAL (ENCABEZADO Y RESUMEN EJECUTIVO LIMPIO) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              <span>Directivas y Cabeceras Defensivas HTTP</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/15 text-blue-300 border border-blue-500/30 font-mono">
              OWASP Core
            </span>
          </div>
          <p className="text-xs text-neutral-400">
            {viewMode === 'plain'
              ? 'Toca cualquier cabecera para ver el detalle de cómo protege tus ventas y clientes.'
              : 'Haz clic en cada directiva para inspeccionar su parámetro RFC y configuración de servidor.'}
          </p>
        </div>

        {/* Selector de Modo + Botón Expandir Todo */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setViewMode('plain')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'plain'
                  ? 'bg-[#0071e3] text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dueño de Negocio
            </button>
            <button
              type="button"
              onClick={() => setViewMode('technical')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                viewMode === 'technical'
                  ? 'bg-white/15 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Binary className="w-3.5 h-3.5" />
              Técnico / RFC
            </button>
          </div>

          <button
            type="button"
            onClick={toggleAll}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-neutral-300 transition-all cursor-pointer flex items-center gap-1.5"
          >
            {areAllExpanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5 text-neutral-400" />
                <span>Contraer todo</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5 text-[#38bdf8]" />
                <span>Expandir todo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Franja de Resumen Principal: Cuántas pasan vs cuántas faltan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center sm:text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 block">Total Evaluadas</span>
          <span className="text-lg font-black text-white font-mono">{headers.length} Directivas</span>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center sm:text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block">Activas y Blindadas</span>
          <span className="text-lg font-black text-emerald-300 font-mono">{passedCount} / {headers.length}</span>
        </div>
        <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-center sm:text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-rose-400 block">Faltantes Críticas</span>
          <span className="text-lg font-black text-rose-300 font-mono">{missingCount} Pendientes</span>
        </div>
      </div>

      {/* 2. LISTA INTERACTIVA DE CABECERAS: AL HACER CLIC SE DESPLIEGA TODO */}
      <div className="space-y-3">
        {headers.map((h, i) => {
          const item = h as HeaderResult & { purpose?: string; weight?: number; score?: number; contextNote?: string; severity?: string };
          const key = h.name.toLowerCase();
          const translation = DUAL_TRANSLATIONS[key] || {
            plain: 'Directiva de seguridad encargada de proteger la integridad del sitio web.',
            technical: item.purpose || item.description || 'Configuración de cabecera perimetral estándar.',
            fixSnippet: `add_header ${h.name} "nosniff" always;`
          };
          const businessRisk = BUSINESS_RISKS[key] || 'Riesgo: Vulnerabilidad de configuración perimetral expuesta';
          const points = item.weight || item.score || 15;
          const isExpanded = Boolean(expandedHeaders[key]);

          return (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                h.present
                  ? isExpanded 
                    ? 'bg-[#12161f] border-emerald-500/40 shadow-lg' 
                    : 'bg-[#101217] border-white/10 hover:border-emerald-500/30'
                  : isExpanded 
                    ? 'bg-[#181216] border-rose-500/40 shadow-lg' 
                    : 'bg-[#141215] border-rose-500/20 hover:border-rose-500/35'
              }`}
            >
              {/* FILA PRINCIPAL COMPACTA (SIEMPRE VISIBLE Y CLICKEABLE) */}
              <button
                type="button"
                onClick={() => toggleHeader(key)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer"
                aria-expanded={isExpanded}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    h.present ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                  }`}>
                    {h.present ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs sm:text-sm font-bold text-white tracking-wide">
                        {h.name}
                      </span>
                      {h.severity && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-neutral-400 uppercase">
                          {h.severity}
                        </span>
                      )}
                    </div>
                    {/* Resumen en 1 línea limpia para no saturar */}
                    <p className="text-[11px] sm:text-xs text-neutral-400 truncate mt-0.5 max-w-xl">
                      {viewMode === 'plain' ? translation.plain : translation.technical}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {h.present ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      ✓ Activa (+{points} pts)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/15 text-rose-400 border border-rose-500/30">
                      ✗ Falta
                    </span>
                  )}

                  <div className={`p-1.5 rounded-lg bg-white/5 border border-white/10 text-neutral-400 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180 text-white bg-white/15' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </button>

              {/* PANEL EXPANDIBLE: AL HACER CLIC SE MUESTRA TODO EL DETALLE */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-white/5 space-y-4 text-xs animate-in fade-in duration-200">
                  
                  {/* Explicación Detallada */}
                  <div className="space-y-1.5">
                    <strong className="text-neutral-300 uppercase tracking-wider text-[10px] font-mono block">
                      {viewMode === 'plain' ? 'Impacto en tu negocio y clientes:' : 'Especificación Técnica RFC:'}
                    </strong>
                    <p className="text-neutral-200 leading-relaxed text-xs sm:text-[13px]">
                      {viewMode === 'plain' ? translation.plain : translation.technical}
                    </p>
                  </div>

                  {/* Alerta de Riesgo Comercial si falta */}
                  {!h.present && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-400 shrink-0" />
                      <strong className="font-semibold">{businessRisk}</strong>
                    </div>
                  )}

                  {/* Receta de Código Sugerida para el Desarrollador */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/10 space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span>Directiva recomendada para Nginx:</span>
                      <span className="text-[#38bdf8]">Solución Rápida</span>
                    </div>
                    <code className="text-emerald-400 text-xs block overflow-x-auto selection:bg-emerald-500/30">
                      {translation.fixSnippet}
                    </code>
                  </div>

                  {item.contextNote && (
                    <div className="flex items-start gap-2 text-[11px] text-sky-300 bg-sky-950/30 rounded-xl p-2.5 border border-sky-800/40">
                      <HelpCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <p className="leading-snug">
                        <span className="font-semibold text-sky-400">Nota Perimetral: </span>
                        {item.contextNote}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-center">
        <p className="text-[11px] text-neutral-400 flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
          <span>Haz clic sobre cualquier cabecera para ver su código de configuración y explicación completa.</span>
        </p>
      </div>

    </div>
  );
}
