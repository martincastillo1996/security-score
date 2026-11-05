'use client';

import { useState } from 'react';
import { 
  Clock, 
  TrendingDown, 
  AlertOctagon, 
  FileSpreadsheet, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  MessageSquare,
  Zap,
  ArrowRight
} from 'lucide-react';
import Apple3DGlobe from '@/components/Apple3DGlobe';

export default function LiveNetworkTrafficGlobe() {
  const [activeTab, setActiveTab] = useState<'ventas' | 'facturas' | 'seguridad'>('ventas');

  return (
    <section className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#080d1a] via-[#05070e] to-[#010204] border border-[#0071e3]/40 overflow-hidden space-y-10 shadow-2xl">
      
      {/* Resplandor superior sutil */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#0071e3]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Columna Izquierda: Datos Inapelables y Fuentes Reales */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
            <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
            <span>Realidad Financiera del Mercado en 2026</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            ¿Cuánto Dinero Pierde tu Empresa por Procesos Lentos?
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed">
            No son estimaciones abstractas. Son datos medidos por consultoras globales: el cliente moderno no espera respuestas lentas y los errores manuales destruyen el margen de ganancia de cualquier negocio.
          </p>

          {/* SELECTOR DE PUNTOS CRÍTICOS (TABS APPLE STYLE) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 max-w-md">
            <button
              onClick={() => setActiveTab('ventas')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ventas'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Fuga en Ventas</span>
            </button>

            <button
              onClick={() => setActiveTab('facturas')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'facturas'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Costos Operativos</span>
            </button>

            <button
              onClick={() => setActiveTab('seguridad')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'seguridad'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Riesgo Digital</span>
            </button>
          </div>

          {/* TARJETA COMPARATIVA: EL PROBLEMA REAL VS NUESTRA SOLUCIÓN CON IA */}
          <div className="p-6 rounded-2xl bg-black/75 border border-white/15 backdrop-blur-2xl space-y-4 shadow-xl">
            
            {activeTab === 'ventas' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Fuente: Harvard Business Review
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                    -391% <span className="text-xs font-sans text-rose-300 font-normal">en probabilidad de venta</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Si un prospecto te escribe a WhatsApp o web y tardas <strong>más de 5 minutos</strong> en responder, las probabilidades de cerrar la venta se desploman en casi un 400%. La gente compra al primero que contesta.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Solución Neuronal Gravity:
                  </div>
                  <p className="text-neutral-300">
                    Agentes autónomos de IA que responden en <strong>menos de 3 segundos</strong>, califican el cliente y cierran ventas los 365 días del año.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'facturas' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Fuente: Gartner Research
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                    30% <span className="text-xs font-sans text-amber-300 font-normal">del tiempo en tareas mecánicas</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Los equipos administrativos y contables desperdician casi un tercio de su jornada digitando facturas, conciliando archivos Excel y armando reportes que una máquina hace en 1 segundo.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity */}
                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                    Solución Neuronal Gravity:
                  </div>
                  <p className="text-neutral-300">
                    Automatización de documentos con visión artificial OCR: extracción sin errores directo a tu ERP o base de datos.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'seguridad' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#38bdf8] flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4" />
                    El Problema Tradicional
                  </span>
                  <span className="text-[10px] font-mono text-neutral-400">
                    Fuente: IBM Security & OWASP
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
                    $2.4M <span className="text-xs font-sans text-cyan-300 font-normal">costo promedio por filtración</span>
                  </div>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Tener certificados vencidos, cabeceras web desprotegidas o puertos abiertos facilita que clonen tu portal para estafar a tus clientes o secuestren tu base de datos.
                  </p>
                </div>

                {/* La Solución con Neuronal Gravity */}
                <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#38bdf8]" />
                    Solución Neuronal Gravity:
                  </div>
                  <p className="text-neutral-300">
                    Auditoría perimetral determinista DEFENSA TI y blindaje TLS 1.3 de extremo a extremo sin tocar tu código base.
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Compromisos de Valor Innegociables */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300">
              <div className="font-bold text-white">Retorno de Inversión (ROI)</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">La solución se paga sola en &lt; 45 días</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300">
              <div className="font-bold text-white">Soberanía de Datos Privada</div>
              <div className="text-neutral-400 text-[11px] mt-0.5">Tus datos nunca entrenan modelos públicos</div>
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

            {/* Pill flotante indicando el nodo matriz */}
            <div className="absolute bottom-4 sm:bottom-8 px-4 py-2 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Infraestructura optimizada para operaciones en <strong>Latinoamérica y EE.UU.</strong></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
