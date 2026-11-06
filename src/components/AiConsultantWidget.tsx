'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Search,
  ChevronRight
} from 'lucide-react';
import { AuditReportRecord } from '@/lib/storage/reportStore';

// Orbe Gravitacional Vivo - Estilo Apple Intelligence / Cosmos Neuronal
function AppleCosmicOrb({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#0071e3]/50 via-[#a855f7]/40 to-[#38bdf8]/50 blur-md animate-pulse pointer-events-none" />
      <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#0071e3] via-[#818cf8] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.6)]">
        <div className="w-full h-full rounded-full bg-[#07090e] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/60 via-[#9333ea]/30 to-transparent" />
          <span className="relative z-10 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
        </div>
      </div>
    </div>
  );
}

interface Props {
  report?: AuditReportRecord | null;
}

export default function AiConsultantWidget({}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'menu' | 'scan' | 'plans'>('menu');
  const [scanUrl, setScanUrl] = useState('');

  const plans = [
    {
      name: 'Auditoría',
      price: 'S/ 65',
      time: '48 horas',
      desc: 'Diagnóstico no intrusivo de SSL, cabeceras y exposición con informe técnico en PDF.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20contratar%20la%20Auditor%C3%ADa%20(S/%2065)%20para%20mi%20sitio%20web.'
    },
    {
      name: 'Blindaje Esencial',
      price: 'S/ 165',
      time: '3 a 5 días',
      desc: 'Corrección de fallas críticas y medias en cabeceras, SSL y CMS (WordPress/a medida). Incluye la Auditoría.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20contratar%20el%20Blindaje%20Esencial%20(S/%20165)%20para%20mi%20sitio%20web.'
    },
    {
      name: 'Blindaje Total',
      price: 'S/ 335',
      time: '5 a 7 días',
      desc: 'Corrección completa, WAF avanzado y re-medición independiente. Meta: llegar a Grado A.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20contratar%20el%20Blindaje%20Total%20(S/%20335)%20para%20mi%20sitio%20web.'
    }
  ];

  const handleLaunchScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanUrl.trim()) return;
    const clean = scanUrl.trim().replace(/^https?:\/\//i, '');
    router.push(`/defensati?target=${encodeURIComponent(`https://${clean}`)}`);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Botón flotante del Orbe */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setView('menu');
          }}
          className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0a0d14]/90 border border-white/15 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.7)] hover:border-[#38bdf8]/50 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all cursor-pointer active:scale-95"
          aria-label="Abrir asistente Neuronal Gravity"
        >
          <AppleCosmicOrb className="w-8 h-8" />
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Asistente Directo</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] text-neutral-400 font-mono">Guía &amp; Contacto</span>
          </div>
        </button>
      )}

      {/* Ventana Modal del Asistente Flujo Guiado */}
      {isOpen && (
        <div className="w-[90vw] sm:w-96 rounded-3xl bg-[#0a0d14]/95 border border-white/15 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col transition-all">
          
          {/* Cabecera */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <AppleCosmicOrb className="w-8 h-8" />
              <div>
                <h3 className="text-xs font-extrabold text-white tracking-tight flex items-center gap-1">
                  <span>Neuronal Gravity</span>
                  <Sparkles className="w-3 h-3 text-[#38bdf8]" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Asistente de Navegación</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cuerpo según vista */}
          <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
            
            {/* VISTA 1: MENÚ PRINCIPAL */}
            {view === 'menu' && (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-200 leading-relaxed">
                  👋 <strong>¡Hola!</strong> Soy el asistente guiado de <strong>Neuronal Gravity</strong>. ¿En qué te puedo orientar hoy?
                </div>

                <div className="space-y-2">
                  {/* Opción 1: Auditar Web */}
                  <button
                    onClick={() => setView('scan')}
                    className="w-full p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#38bdf8]/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#0071e3]/20 border border-[#0071e3]/30 flex items-center justify-center text-[#38bdf8] shrink-0">
                        <Search className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                          Quiero auditar mi página web
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          Escaneo perimetral gratuito de cabeceras y SSL
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </button>

                  {/* Opción 2: Ver Planes de Blindaje */}
                  <button
                    onClick={() => setView('plans')}
                    className="w-full p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          Cotizar Blindaje Técnico
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          Precios transparentes desde S/ 65 (solo pago único)
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors" />
                  </button>

                  {/* Opción 3: WhatsApp Directo con Martín */}
                  <a
                    href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20vi%20tu%20sitio%20web%20Neuronal%20Gravity%20y%20deseo%20hacerte%20una%20consulta%20directa."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full p-3.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-left transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#25D366] flex items-center justify-center text-white shrink-0 shadow-md">
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-emerald-300">
                          Hablar directo con Martín
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          WhatsApp personal: +1 785 643-3991
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-emerald-400" />
                  </a>
                </div>
              </div>
            )}

            {/* VISTA 2: ESCANEO RÁPIDO */}
            {view === 'scan' && (
              <div className="space-y-4">
                <button
                  onClick={() => setView('menu')}
                  className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  &larr; Volver al menú
                </button>

                <div className="text-xs text-neutral-300">
                  Ingresa tu dominio web para auditar de inmediato las cabeceras, protocolo SSL y vulnerabilidades visibles:
                </div>

                <form onSubmit={handleLaunchScan} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="ej: miweb.com o www.empresa.pe"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Ejecutar Escáner Ahora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[10px] text-neutral-400 text-center font-mono">
                  Diagnóstico 100% externo, no invasivo y sin pedir contraseñas.
                </p>
              </div>
            )}

            {/* VISTA 3: PLANES DE BLINDAJE */}
            {view === 'plans' && (
              <div className="space-y-3">
                <button
                  onClick={() => setView('menu')}
                  className="text-xs text-[#38bdf8] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  &larr; Volver al menú
                </button>

                <div className="text-xs text-neutral-300">
                  Solo 3 precios totales, pagos únicos sin mensualidades:
                </div>

                <div className="space-y-2">
                  {plans.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{p.name}</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{p.price}</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-snug">
                        {p.desc}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-neutral-400 font-mono">Entrega: {p.time}</span>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#38bdf8] hover:underline flex items-center gap-1"
                        >
                          <span>Elegir &rarr;</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-neutral-400 text-center">
                  Atención de Lunes a Sábado de 9:00 a 20:00 (Hora Perú)
                </p>
              </div>
            )}

          </div>

          {/* Pie del Widget */}
          <div className="p-3 bg-black/40 border-t border-white/5 text-center">
            <span className="text-[10px] text-neutral-400 font-mono">
              Neuronal Gravity &bull; DEFENSA TI
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
