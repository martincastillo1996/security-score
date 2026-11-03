'use client';

import { useState } from 'react';
import { HeaderResult } from '@/lib/scanner/headerScanner';
import { ShieldAlert, Binary, HelpCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  headers: HeaderResult[];
}

const DUAL_TRANSLATIONS: Record<string, { plain: string; technical: string }> = {
  'content-security-policy': {
    plain: 'Evita que atacantes inyecten virus o scripts falsos dentro de tu web para robar contraseñas de tus usuarios.',
    technical: 'Mitigación estricta contra Cross-Site Scripting (XSS) y Data Injection limitando los orígenes permitidos por el W3C.',
  },
  'strict-transport-security': {
    plain: 'Obliga a que toda la navegación viaje 100% blindada por candado HTTPS, impidiendo que te espíen en redes Wi-Fi públicas.',
    technical: 'Directiva RFC 6797 que fuerza túneles TLS evitando ataques Man-in-the-Middle y técnicas de SSL Stripping.',
  },
  'x-frame-options': {
    plain: 'Prohíbe que clonen o metan tu web dentro de otra página trampa para engañar a tus clientes haciéndoles clic donde no deben.',
    technical: 'Protección perimetral de interfaz contra secuestro de clics (Clickjacking) restringiendo contextos de renderizado en iframes.',
  },
  'x-content-type-options': {
    plain: 'Impide que los navegadores confundan archivos inofensivos (como una foto) con programas dañinos ejecutables.',
    technical: 'Inhabilita el algoritmo de MIME-sniffing obligando a interpretar únicamente el Content-Type declarado.',
  },
  'referrer-policy': {
    plain: 'Evita que al hacer clic en un enlace externo se filtre información privada contenida en la barra de direcciones.',
    technical: 'Control de privacidad de cabecera HTTP Referer mitigando fuga de identificadores de sesión o tokens en query params.',
  },
  'permissions-policy': {
    plain: 'Apaga por completo el permiso de encender la cámara, micrófono o ubicación del usuario sin que este se entere.',
    technical: 'Control de gobierno perimetral sobre APIs de hardware invasivas y sensores del dispositivo cliente.',
  },
};

const BUSINESS_RISKS: Record<string, string> = {
  'content-security-policy': 'Riesgo: Inyección de publicidad fraudulenta o robo de tarjetas de clientes',
  'strict-transport-security': 'Riesgo: Alerta "Sitio No Seguro" a clientes (Pérdida directa de ventas)',
  'x-frame-options': 'Riesgo: Clonación de marca / Suplantación visual de tu web (Clickjacking)',
  'x-content-type-options': 'Riesgo: Descarga oculta de malware camuflado en imágenes o archivos',
  'referrer-policy': 'Riesgo: Filtración de URLs privadas o tokens de sesión de tus usuarios',
  'permissions-policy': 'Riesgo: Acceso no autorizado a hardware o sensores del dispositivo cliente',
};

export default function HeaderResults({ headers }: Props) {
  const [viewMode, setViewMode] = useState<'plain' | 'technical'>('plain');

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-2xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Directivas y Cabeceras Defensivas HTTP
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-950 text-blue-400 border border-blue-800">
              OWASP Core
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {viewMode === 'plain'
              ? 'Explicación del impacto directo en la seguridad de tu negocio y tus clientes.'
              : 'Detalle de configuración perimetral de transporte para desarrolladores y SysAdmins.'}
          </p>
        </div>

        {/* Selector de Modo */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('plain')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'plain'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dueño de Negocio
          </button>
          <button
            type="button"
            onClick={() => setViewMode('technical')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === 'technical'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Binary className="w-3.5 h-3.5" />
            Técnico / RFC
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {headers.map((h, i) => {
          const item = h as HeaderResult & { purpose?: string; weight?: number; score?: number; contextNote?: string };
          const key = h.name.toLowerCase();
          const translation = DUAL_TRANSLATIONS[key] || {
            plain: 'Directiva de seguridad encargada de proteger la integridad del sitio web.',
            technical: item.purpose || item.description || 'Configuración de cabecera perimetral estándar.',
          };
          const businessRisk = BUSINESS_RISKS[key] || 'Riesgo: Vulnerabilidad de configuración perimetral expuesta';
          const points = item.weight || item.score || 15;

          return (
            <div
              key={i}
              className={`flex flex-col justify-between rounded-2xl p-5 border transition-all ${
                h.present
                  ? 'bg-slate-950/70 border-emerald-900/40'
                  : 'bg-slate-950/70 border-rose-900/40'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold tracking-wide text-slate-200">
                    {h.name}
                  </span>
                  {h.present ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" />
                      +{points} pts
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-rose-950 text-rose-400 border border-rose-800">
                      <ShieldAlert className="w-3 h-3" />
                      Falta
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed font-normal">
                  {viewMode === 'plain' ? translation.plain : translation.technical}
                </p>

                {/* Etiqueta de Impacto / Riesgo Comercial para Dueños de Negocio */}
                {!h.present && (
                  <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-[11px] font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{businessRisk}</span>
                  </div>
                )}
              </div>

              {item.contextNote && (
                <div className="mt-3.5 pt-3 border-t flex items-start gap-2 text-[11px] text-sky-300 bg-sky-950/40 rounded-xl p-2.5 border border-sky-800/50">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <p className="leading-snug">
                    <span className="font-semibold text-sky-400">Contexto Perimetral: </span>
                    {item.contextNote}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
