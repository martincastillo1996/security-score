'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Zap, 
  Lock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export default function HowItWorksGuide() {
  return (
    <section id="como-funciona" className="w-full max-w-5xl mx-auto space-y-6 scroll-mt-24">
      {/* Tarjeta Bento Informativa Superior en Estilo Apple Pro Dark Glass */}
      <div className="p-7 sm:p-10 rounded-[32px] bg-[#0c0d10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-8 text-left relative overflow-hidden">
        
        {/* Cabecera ejecutiva */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>¿Cómo funciona en 3 simples pasos?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Protección Perimetral para Páginas Web y Tiendas Online
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold self-start sm:self-center shrink-0">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            100% Gratuito &bull; Sin Contraseñas
          </span>
        </div>

        {/* 3 Pasos Visuales e Ilustrativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* PASO 1 */}
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-sky-500/30 transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                  <Search className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-black text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">
                  PASO 01
                </span>
              </div>

              {/* Gráfico visual simulado de barra de búsqueda */}
              <div className="h-11 px-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shrink-0" />
                <span className="text-xs font-mono text-neutral-300 truncate">tutienda.pe</span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white">Escribes tu web</h4>
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mt-1.5">
                  Solo ingresas el link de tu negocio. <strong>Nunca te pediremos contraseñas</strong> ni accesos a tu hosting.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium pt-3 border-t border-white/5">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Cero riesgo para tu servidor</span>
            </div>
          </div>

          {/* PASO 2 */}
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                  PASO 02
                </span>
              </div>

              {/* Gráfico visual simulado de semáforo de nota */}
              <div className="h-11 px-3.5 rounded-xl bg-black/50 border border-white/5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-amber-300 font-mono whitespace-nowrap">
                  Calificación Grado A a F
                </span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white">Diagnóstico al instante</h4>
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mt-1.5">
                  En 1 segundo ves tu nota: si tu web es vulnerable a <strong>clonación de pagos o robo de compras</strong> en Wi-Fi.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium pt-3 border-t border-white/5">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Detecta fallas antes que los estafadores</span>
            </div>
          </div>

          {/* PASO 3 */}
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-5 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  PASO 03
                </span>
              </div>

              {/* Gráfico visual simulado de candado blindado */}
              <div className="h-11 px-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/20 flex items-center gap-2.5 text-emerald-300">
                <Lock className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span className="text-xs font-bold whitespace-nowrap">Web 100% Protegida (Grado A)</span>
              </div>

              <div>
                <h4 className="text-base font-extrabold text-white">Blindas tu negocio</h4>
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed mt-1.5">
                  Descargas tu informe para tu técnico o <strong>nosotros lo blindamos por ti</strong> en 3 a 5 días con garantía.
                </p>
              </div>
            </div>

            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 font-medium pt-3 border-t border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cero cobros bloqueados en Yape o Niubiz</span>
            </div>
          </div>

        </div>

        {/* Franja de Utilidad Empresarial Inmediata */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div className="space-y-0.5">
              <p className="leading-snug">
                Evita que tus clientes vean alertas de <strong>&ldquo;Sitio No Seguro&rdquo;</strong> o te retengan cobros en pasarelas.
              </p>
              <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#38bdf8] font-semibold">Resultados en tiempo real (1.2s)</span>
                <span>&bull;</span>
                <span>100% gratuito y sin contraseñas</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('url-scan-input') || document.querySelector('input[type="text"]');
              if (input) {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                (input as HTMLInputElement).focus();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0071e3] to-[#2997ff] hover:from-[#0077ed] hover:to-[#38bdf8] text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-95 transition-all cursor-pointer shrink-0 w-full sm:w-auto"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Escanear Mi Web Ahora</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
