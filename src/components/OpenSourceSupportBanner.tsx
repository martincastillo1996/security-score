'use client';

import React, { useState } from 'react';
import { 
  Heart, 
  Coffee, 
  Sparkles, 
  Smartphone, 
  CreditCard, 
  Copy, 
  Check, 
  ShieldCheck, 
  Code2,
  ExternalLink 
} from 'lucide-react';

export default function OpenSourceSupportBanner() {
  const [copiedYape, setCopiedYape] = useState(false);

  const handleOpenDonation = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-donation-modal'));
    }
  };

  const copyYapeNumber = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText('987010380');
      setCopiedYape(true);
      setTimeout(() => setCopiedYape(false), 2200);
    }
  };

  return (
    <section className="relative w-full rounded-3xl p-6 sm:p-9 bg-[#0d1017]/90 border border-white/10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] overflow-hidden">
      {/* Resplandor ambiental de fondo */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 bg-gradient-to-br from-amber-500/15 via-purple-600/10 to-transparent rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-[#0071e3]/15 via-emerald-500/10 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 space-y-6">
        
        {/* Badges superiores */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Code2 className="w-3.5 h-3.5" />
            <span>Código Abierto • Open Source</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-xs font-medium">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-current animate-pulse" />
            <span>Respaldado por la Comunidad</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-[11px] font-mono font-bold">
            <span>Yape: 987 010 380</span>
          </div>
        </div>

        {/* Contenido textual */}
        <div className="space-y-3 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
            DEFENSA TI es un Proyecto de Código Abierto
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            Desarrollado de forma transparente por <strong>Neuronal Gravity</strong> (Martín Castillo) para que cualquier emprendedor, desarrollador o negocio en el Perú audite su seguridad perimetral de manera gratuita, sin registros obligatorios ni venta de datos.
          </p>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Mantenemos los servidores del escáner perimetral, la infraestructura y el análisis de cabeceras gracias a donaciones voluntarias de quienes valoran el software libre peruano.
          </p>
        </div>

        {/* Tarjeta interactiva de Yape Directo & Culqi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {/* Tarjeta Yape */}
          <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shrink-0">
                <Smartphone className="w-5 h-5 text-purple-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                  Yape Directo (Perú)
                </div>
                <div className="text-sm font-mono font-bold text-white truncate">
                  987 010 380
                </div>
                <div className="text-[10px] text-neutral-400">
                  A nombre de Karol Martin Castillo
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={copyYapeNumber}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
            >
              {copiedYape ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar</span>
                </>
              )}
            </button>
          </div>

          {/* Tarjeta Pasarela Culqi */}
          <div className="p-4 rounded-2xl bg-black/60 border border-emerald-500/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <CreditCard className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                  Pasarela Culqi Oficial
                </div>
                <div className="text-xs font-bold text-white truncate">
                  Tarjetas &bull; Soles y Dólares
                </div>
                <div className="text-[10px] text-neutral-400">
                  Cifrado bancario TLS 1.3
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenDonation}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 shrink-0 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Donar</span>
            </button>
          </div>
        </div>

        {/* Botones de acción principales */}
        <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-white/5">
          <button
            type="button"
            onClick={handleOpenDonation}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs sm:text-sm transition-all shadow-[0_10px_30px_rgba(245,158,11,0.25)] hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Coffee className="w-4 h-4 text-neutral-950" />
            <span>Apoyar Proyecto con Yape o Culqi</span>
          </button>

          <a
            href="https://github.com/martincastillo1996/security-score"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs sm:text-sm transition-all active:scale-95"
          >
            <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            <span>Ver Repositorio en GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>

          <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Sin cargos ocultos • Donación 100% voluntaria</span>
          </div>
        </div>

      </div>
    </section>
  );
}
