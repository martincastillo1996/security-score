'use client';

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { 
  Coffee, 
  Heart, 
  X, 
  Sparkles, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  Copy,
  Check
} from 'lucide-react';
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
  const [currency, setCurrency] = useState<'PEN' | 'USD'>('PEN');
  
  // Montos seleccionados
  const [selectedPenAmount, setSelectedPenAmount] = useState<number>(10);
  const [customPenAmount, setCustomPenAmount] = useState<string>('');
  
  const [selectedUsdAmount, setSelectedUsdAmount] = useState<number>(5);
  const [customUsdAmount, setCustomUsdAmount] = useState<string>('');
  
  const [copiedText, setCopiedText] = useState<string | null>(null);

  useEffect(() => {
    // Escuchar el evento de confirmación de Culqi
    window.culqi = () => {
      alert('¡Muchas gracias por apoyar a Neuronal Gravity! Tu aporte impulsa nuestra infraestructura independiente.');
      if (window.Culqi) {
        window.Culqi.close();
      }
      setIsOpen(false);
    };
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getAmountInCents = (): number => {
    if (currency === 'PEN') {
      if (customPenAmount && parseFloat(customPenAmount) > 0) {
        return Math.round(parseFloat(customPenAmount) * 100);
      }
      return selectedPenAmount * 100;
    } else {
      if (customUsdAmount && parseFloat(customUsdAmount) > 0) {
        return Math.round(parseFloat(customUsdAmount) * 100);
      }
      return selectedUsdAmount * 100;
    }
  };

  const handlePayWithCulqi = () => {
    if (typeof window !== 'undefined' && window.Culqi) {
      const amountInCents = getAmountInCents();
      
      window.Culqi.publicKey = CULQI_PUBLIC_KEY;
      window.Culqi.settings({
        title: `Donación Neuronal Gravity (${currency})`,
        currency: currency,
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

  const currentDisplayAmount = (getAmountInCents() / 100).toFixed(2);

  return (
    <>
      {/* Script oficial de Culqi Checkout v4 */}
      <Script
        src="https://checkout.culqi.com/js/v4"
        strategy="lazyOnload"
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
                  Yape &bull; Culqi Oficial
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Apoyar a Neuronal Gravity
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Tu aporte mantiene nuestras herramientas de auditoría perimetral y código abierto gratuitas.
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

            {/* SECCIÓN 1: YAPE DIRECTO (NÚMERO OFICIAL) */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 via-[#18181b] to-[#18181b] border border-purple-500/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Yape Directo (Sin comisiones)</span>
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded-full border border-purple-500/30 font-bold">
                  Perú &bull; Inmediato
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/80 border border-purple-500/30 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-white font-bold tracking-wider">941 235 586</span>
                  <span className="text-[11px] text-neutral-400 font-sans hidden sm:inline">(Martín C.)</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('941235586', 'yape-num')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-sans font-semibold transition-all cursor-pointer shadow-md active:scale-95"
                >
                  {copiedText === 'yape-num' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText === 'yape-num' ? '¡Copiado!' : 'Copiar'}</span>
                </button>
              </div>
            </div>

            {/* SECCIÓN 2: PASARELA CULQI (TARJETAS + YAPE) */}
            <div className="space-y-4 pt-1">
              
              {/* Selector de Moneda para Culqi */}
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-300">
                  O paga con pasarela Culqi:
                </label>
                <div className="inline-flex p-1 rounded-xl bg-white/5 border border-white/10 gap-1">
                  <button
                    type="button"
                    onClick={() => setCurrency('PEN')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      currency === 'PEN'
                        ? 'bg-[#0071e3] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    🇵🇪 Soles (PEN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrency('USD')}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                      currency === 'USD'
                        ? 'bg-[#0071e3] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    💵 Dólares (USD)
                  </button>
                </div>
              </div>

              {/* Montos Rápidos según la Moneda */}
              {currency === 'PEN' ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 20, 50].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedPenAmount(amt);
                          setCustomPenAmount('');
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedPenAmount === amt && !customPenAmount
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
                      placeholder="Otro monto en Soles (ej. 35)"
                      value={customPenAmount}
                      onChange={(e) => setCustomPenAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-[#0071e3] transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-4 gap-2">
                    {[5, 10, 25, 50].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedUsdAmount(amt);
                          setCustomUsdAmount('');
                        }}
                        className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          selectedUsdAmount === amt && !customUsdAmount
                            ? 'bg-[#0071e3] text-white shadow-md shadow-[#0071e3]/40 border border-[#38bdf8]/50'
                            : 'bg-white/5 text-neutral-300 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        $ {amt} USD
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-400">
                      $
                    </span>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      placeholder="Otro monto en USD (ej. 30)"
                      value={customUsdAmount}
                      onChange={(e) => setCustomUsdAmount(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold placeholder:text-neutral-500 focus:outline-none focus:border-[#0071e3] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Botón Principal Culqi */}
              <button
                type="button"
                onClick={handlePayWithCulqi}
                className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/25 active:scale-98 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pagar {currency === 'PEN' ? `S/ ${currentDisplayAmount}` : `$ ${currentDisplayAmount} USD`} con Culqi</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>

            {/* Garantía de Seguridad y Confianza Oficial Culqi */}
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pago 100% Seguro y Protegido por Culqi</span>
              </div>
              <p className="text-[11px] text-neutral-300 leading-relaxed pl-5">
                Tus datos viajan con cifrado bancario TLS 1.3 de extremo a extremo. Procesado oficialmente por <strong>Culqi (empresa del Grupo Credicorp / BCP)</strong>. Aceptamos Yape, todas las tarjetas y PagoEfectivo sin guardar tus datos financieros.
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
