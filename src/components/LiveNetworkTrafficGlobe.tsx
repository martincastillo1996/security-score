'use client';

import { useState } from 'react';
import { 
  Clock, 
  TrendingDown, 
  AlertOctagon, 
  FileSpreadsheet, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import Apple3DGlobe from '@/components/Apple3DGlobe';

export default function LiveNetworkTrafficGlobe() {
  const [activeTab, setActiveTab] = useState<'ventas' | 'facturas' | 'seguridad'>('ventas');

  return (
    <section className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#0a0f1d] via-[#060812] to-[#020306] border border-[#0071e3]/40 overflow-hidden space-y-10 shadow-2xl">
      
      {/* Resplandor superior sutil */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#0071e3]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Columna Izquierda: Tipografía Grande, Nítida y de Alto Contraste */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold tracking-wide">
            <AlertOctagon className="w-4 h-4 text-rose-400" />
            <span>Realidad Financiera del Mercado en 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            ¿Cuánto Dinero Pierde tu Empresa por Procesos Lentos?
          </h2>

          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed font-normal">
            No son estimaciones abstractas. Son datos medidos por consultoras globales: el cliente moderno no espera respuestas lentas y los errores manuales destruyen el margen de ganancia de cualquier negocio.
          </p>

          {/* SELECTOR DE PUNTOS CRÍTICOS (BOTONES GRANDES Y CLAROS) */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 p-1.5 rounded-2xl bg-[#141416] border border-white/15 max-w-lg">
            <button
              onClick={() => setActiveTab('ventas')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'ventas'
                  ? 'bg-[#0071e3] text-white shadow-lg shadow-[#0071e3]/40'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Fuga en Ventas</span>
            </button>

            <button
              onClick={() => setActiveTab('facturas')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'facturas'
                  ? 'bg-[#0071e3] text-white shadow-lg shadow-[#0071e3]/40'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Costos Operativos</span>
            </button>

            <button
              onClick={() => setActiveTab('seguridad')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'seguridad'
                  ? 'bg-[#0071e3] text-white shadow-lg shadow-[#0071e3]/40'
                  : 'text-neutral-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Riesgo Digital</span>
            </button>
          </div>

          {/* TARJETA COMPARATIVA DE ALTO CONTRASTE Y LETRAS GRANDES */}
          <div className="p-7 rounded-3xl bg-[#0c0e14] border border-white/20 shadow-2xl space-y-5">
            
            {activeTab === 'ventas' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-rose-400 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-xs font-semibold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    Fuente: Harvard Business Review
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-rose-400">-391%</span>
                    <span className="text-sm sm:text-base font-sans text-neutral-200 font-medium">en probabilidad de cerrar la venta</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
                    Si un cliente te escribe a WhatsApp o a tu web y tardas <strong className="text-white underline decoration-rose-400 font-bold">más de 5 minutos</strong> en responder, las probabilidades de cerrar la compra caen un 391%. El cliente moderno le compra al primero que contesta.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity con Máximo Contraste */}
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 space-y-2">
                  <div className="text-sm sm:text-base font-black text-emerald-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    Solución de Neuronal Gravity:
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed">
                    Agentes de inteligencia artificial en WhatsApp que responden en <strong className="text-white font-bold">menos de 3 segundos</strong>, muestran tu catálogo con precios actualizados y cierran ventas los 365 días del año.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'facturas' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-amber-400 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-xs font-semibold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    Fuente: Gartner Research
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-amber-400">30%</span>
                    <span className="text-sm sm:text-base font-sans text-neutral-200 font-medium">del tiempo pagado perdido en digitación</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
                    Los equipos administrativos y contables desperdician casi un tercio de su jornada pasando datos a mano de facturas, cuadrando comprobantes en Excel y armando reportes que la tecnología procesa en 1 segundo.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity */}
                <div className="p-5 rounded-2xl bg-purple-950/40 border border-purple-500/40 space-y-2">
                  <div className="text-sm sm:text-base font-black text-purple-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                    Solución de Neuronal Gravity:
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed">
                    Automatización documental con visión inteligente OCR: lectura y extracción automática de facturas y contratos directo a tu ERP o base de datos sin errores de digitación.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'seguridad' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs sm:text-sm uppercase font-black tracking-wider text-[#38bdf8] flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-xs font-semibold text-neutral-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    Fuente: IBM Security & OWASP
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-[#38bdf8]">$2.4M USD</span>
                    <span className="text-sm sm:text-base font-sans text-neutral-200 font-medium">costo promedio por filtración y fraude</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-200 leading-relaxed font-normal">
                    Tener certificados SSL débiles, puertos expuestos o páginas web sin cabeceras perimetrales facilita que delincuentes clonen tu web para estafar a tus clientes o robar bases de datos.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity */}
                <div className="p-5 rounded-2xl bg-sky-950/40 border border-[#38bdf8]/40 space-y-2">
                  <div className="text-sm sm:text-base font-black text-sky-300 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0" />
                    Solución de Neuronal Gravity:
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-100 leading-relaxed">
                    Auditoría perimetral continua con DEFENSA TI y blindaje TLS 1.3 de extremo a extremo para proteger tus pasarelas de pago sin tocar tu código base.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Compromisos de Valor Innegociables en Blanco Puro y Nítido */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#141416] border border-white/15 text-xs text-neutral-200">
              <div className="font-bold text-white text-sm">Retorno de Inversión (ROI)</div>
              <div className="text-neutral-300 text-xs mt-1">La implementación se amortiza sola en menos de 45 días.</div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141416] border border-white/15 text-xs text-neutral-200">
              <div className="font-bold text-white text-sm">Soberanía de Datos Privada</div>
              <div className="text-neutral-300 text-xs mt-1">Tus datos nunca se usan para entrenar IA pública de terceros.</div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Globo 3D Cobe Interactivo con Órbitas */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center relative">
          
          <div className="relative w-full max-w-[460px] aspect-square rounded-full flex items-center justify-center">
            
            {/* Halo exterior orbital */}
            <div className="absolute inset-0 rounded-full border border-[#0071e3]/30 animate-pulse pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-dashed border-[#38bdf8]/20 animate-spin-slow pointer-events-none" />

            <Apple3DGlobe lat={-12.0464} lon={-77.0428} />

            {/* Pill flotante indicando el nodo matriz con contraste total */}
            <div className="absolute bottom-4 sm:bottom-8 px-5 py-2.5 rounded-2xl bg-[#0e1118] border border-white/20 shadow-2xl flex items-center gap-2.5 text-xs text-white font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>Infraestructura optimizada para operaciones en <strong className="text-[#38bdf8]">Latinoamérica y EE.UU.</strong></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
