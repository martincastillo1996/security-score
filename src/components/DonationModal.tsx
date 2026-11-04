'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { Coffee, Heart, X, Sparkles, CreditCard, Smartphone, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

declare global {
  interface Window {
    Culqi?: {
      publicKey: string;
      settings: (config: {
        title: string;
        currency: string;
        amount: number;
        culqilib?: string;
      }) => void;
      options: (opts: {
        lang: string;
        modal: boolean;
        installments: boolean;
        customButton?: string;
        style?: {
          logo?: string;
          maincolor?: string;
          buttontext?: string;
        };
      }) => void;
      open: () => void;
      close: () => void;
    };
    culqi?: () => void;
  }
}

const CULQI_PUBLIC_KEY = 'pk_test_4X14aLJdiXe9CfYC';

export default function DonationModal() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(10);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCulqiReady, setIsCulqiReady] = useState(false);

  useEffect(() => {
    // Escuchar el evento de token generado de Culqi
    window.culqi = () => {
      alert('¡Muchas gracias por apoyar a Neuronal Gravity! Tu aporte impulsa nuestra infraestructura independiente.');
      if (window.Culqi) {
        window.Culqi.close();
      }
      setIsOpen(false);
    };
  }, []);

  const getFinalAmount = (): number => {
    if (customAmount && parseFloat(customAmount) > 0) {
      return Math.round(parseFloat(customAmount) * 100);
    }
    return selectedAmount * 100;
  };

  const handlePayWithCulqi = () => {
    if (typeof window !== 'undefined' && window.Culqi) {
      const amountInCents = getFinalAmount();
      
      window.Culqi.publicKey = CULQI_PUBLIC_KEY;
      window.Culqi.settings({
        title: 'Donación Neuronal Gravity',
        currency: 'PEN',
        amount: amountInCents,
      });

      window.Culqi.options({
        lang: 'es',
        modal: true,
        installments: false,
        style: {
          maincolor: '#0071e3',
          buttontext: '#ffffff',
        },
      });

      window.Culqi.open();
    } else {
      alert('Cargando pasarela de pago segura de Culqi. Por favor, intenta de nuevo en unos segundos.');
    }
  };

  return (
    <>
      {/* Script oficial de Culqi Checkout v4 */}
      <Script
        src="https://checkout.culqi.com/js/v4"
        strategy="lazyOnload"
        onLoad={() => setIsCulqiReady(true)}
      />

      {/* Botón Flotante en la esquina superior derecha */}
      <div className="fixed top-20 right-6 z-40 hidden sm:block animate-in fade-in duration-300">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141416]/95 border border-amber-500/40 text-amber-300 text-xs font-bold transition-all shadow-[0_10px_30px_rgba(245,158,11,0.2)] hover:border-amber-400 hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <Coffee className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Apoyar Proyecto</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-current animate-pulse" />
        </button>
      </div>

      {/* Versión móvil accesible */}
      <div className="sm:hidden fixed bottom-6 left-6 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="p-3.5 rounded-2xl bg-[#141416]/95 border border-amber-500/50 text-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] backdrop-blur-xl active:scale-95 cursor-pointer flex items-center gap-1.5"
          aria-label="Apoyar Proyecto"
        >
          <Coffee className="w-5 h-5 text-amber-400" />
          <span className="text-[11px] font-bold">Apoyar</span>
        </button>
      </div>

      {/* Modal Emergente Apple Glass */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-[#141416] border border-white/15 p-6 sm:p-7 shadow-2xl space-y-6 text-left">
            
            {/* Cabecera */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Culqi &bull; Yape &bull; Tarjetas
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Apoyar a Neuronal Gravity
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Tu contribución mantiene nuestras auditorías de seguridad y herramientas de código abierto gratuitas.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selección de Monto (Soles PEN) */}
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-neutral-300">
                Selecciona el monto en Soles (PEN):
              </label>
              
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 50].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt);
                      setCustomAmount('');
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedAmount === amt && !customAmount
                        ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/40 border border-[#38bdf8]/50'
                        : 'bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10'
                    }`}
                  >
                    S/ {amt}
                  </button>
                ))}
              </div>

              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                  S/
                </span>
                <input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Otro monto libre (ej. 35)"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-[#0071e3] transition-colors"
                />
              </div>
            </div>

            {/* Métodos de Pago incluidos en Culqi */}
            <div className="p-3.5 rounded-2xl bg-white/3 border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Métodos de pago aceptados en la pasarela:
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  <Smartphone className="w-3.5 h-3.5" />
                  Yape (Directo)
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 border border-blue-500/40 font-bold">
                  <CreditCard className="w-3.5 h-3.5" />
                  Tarjetas Débito / Crédito
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  PagoEfectivo
                </span>
              </div>
            </div>

            {/* Botón de Acción Principal con Culqi */}
            <button
              type="button"
              onClick={handlePayWithCulqi}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/25 active:scale-98 cursor-pointer"
            >
              <span>Donar S/ {(getFinalAmount() / 100).toFixed(2)} con Culqi & Yape</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Garantía de Seguridad */}
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transacción cifrada protegida por Culqi (Banco de Crédito BCP)</span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
