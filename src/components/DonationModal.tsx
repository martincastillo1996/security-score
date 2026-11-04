'use client';

import React, { useState } from 'react';
import { Coffee, Heart, X, Check, Copy, Sparkles, ExternalLink, Globe2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function DonationModal() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <>
      {/* Botón Flotante con efecto pulsante en la esquina superior derecha */}
      <div className="fixed top-20 right-6 z-40 hidden sm:block animate-in fade-in duration-300">
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141416]/95 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <Coffee className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>{t.donation.button}</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
        </button>
      </div>

      {/* Versión móvil accesible */}
      <div className="sm:hidden fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-2xl bg-[#141416]/95 border border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-xl active:scale-95 cursor-pointer flex items-center gap-1.5"
          aria-label={t.donation.button}
        >
          <Coffee className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] font-bold">{t.donation.button}</span>
        </button>
      </div>

      {/* Modal Emergente Apple Glass */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#141416] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-5 text-left">
            
            {/* Cabecera */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Software Libre &bull; Zero-Cost Core
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {t.donation.title}
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  {t.donation.desc}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Opciones de Donación Seguras: Solo Yape, Global66 y WhatsApp */}
            <div className="space-y-3">
              
              {/* Opción 1: Yape / Plin (Perú) - Número Oficial 941 235 586 */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/30 via-[#141416] to-[#141416] border border-purple-500/40 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🇵🇪</span>
                    <span className="text-xs font-bold text-white">Yape / Plin (Perú)</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30 font-bold">
                    Inmediato &bull; 0% Comisiones
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/70 border border-purple-500/30 font-mono text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                    <span className="text-white font-bold tracking-wider">941 235 586</span>
                    <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline">(Martín C.)</span>
                  </div>
                  <button
                    onClick={() => handleCopy('941235586', 'yape')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-sans font-semibold transition-all cursor-pointer shadow-md active:scale-95"
                  >
                    {copiedAccount === 'yape' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount === 'yape' ? '¡Copiado!' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="text-[10px] text-neutral-400 flex items-center justify-between px-1">
                  <span>Abre tu app Yape o Plin y transfiere directo</span>
                  <span className="text-purple-400 font-semibold">Cualquier aporte suma</span>
                </div>
              </div>

              {/* Opción 2: Global66 (Internacional & Sudamérica) */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/30 via-[#141416] to-[#141416] border border-blue-500/40 shadow-lg space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe2 className="w-4 h-4 text-[#2997ff]" />
                    <span className="text-xs font-bold text-white">Global66 (Internacional / Sudamérica)</span>
                  </div>
                  <span className="text-[10px] font-mono text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30 font-bold">
                    Sin comisiones bancarias
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300 leading-relaxed">
                  Transfiere en USD, pesos colombianos, chilenos o cualquier moneda local mediante Global66 sin exponer cuentas bancarias personales.
                </p>
                <a
                  href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20quiero%20hacerte%20una%20donaci%C3%B3n%20por%20Global66%20para%20apoyar%20DEFENSA%20TI.%20%C2%BFCu%C3%A1l%20es%20tu%20enlace%20o%20usuario%20de%20Global66?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <Globe2 className="w-3.5 h-3.5" />
                  <span>Pedir enlace de Global66 por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Opción 3: Coordinar Directo por WhatsApp */}
              <div className="p-4 rounded-2xl bg-white/3 border border-emerald-500/30 hover:border-emerald-500/50 transition-all space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💬</span>
                    <span className="text-xs font-bold text-white">Otras Vías Seguras (WhatsApp)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                    100% Seguro
                  </span>
                </div>
                <p className="text-[11px] text-neutral-300">
                  ¿Prefieres coordinar otro método? Escríbeme directamente por WhatsApp.
                </p>
                <a
                  href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20quiero%20apoyar%20el%20proyecto%20DEFENSA%20TI%20con%20una%20donaci%C3%B3n.%20%C2%BFCu%C3%A1les%20son%20las%20opciones%20disponibles?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Hablar directo por WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

            {/* Agradecimiento */}
            <div className="text-center pt-2">
              <p className="text-[11px] text-neutral-400 italic">
                &ldquo;Cada donación asegura que este escáner se mantenga gratis para los emprendedores de la región.&rdquo;
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
