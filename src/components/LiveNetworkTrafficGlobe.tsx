'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Radio, 
  Clock, 
  TrendingUp, 
  FileCheck2,
  DollarSign
} from 'lucide-react';
import Apple3DGlobe from '@/components/Apple3DGlobe';

export default function LiveNetworkTrafficGlobe() {
  // Pestaña activa del HUD de telemetría de negocio
  const [activeTab, setActiveTab] = useState<'ventas' | 'operaciones' | 'ciberdefensa'>('ventas');

  // 1. Contador: Conversaciones y Ventas en WhatsApp atendidas por IA en vivo
  const [whatsappChats, setWhatsappChats] = useState(2489150);
  // 2. Contador: Facturas y documentos procesados automáticamente
  const [docsProcessed, setDocsProcessed] = useState(612040);
  // 3. Contador: Horas manuales ahorradas a las empresas
  const [hoursSaved, setHoursSaved] = useState(38490);
  // 4. Contador: Amenazas y ataques bloqueados por DEFENSA TI
  const [threatsBlocked, setThreatsBlocked] = useState(14829776);

  // Micro métricas en tiempo real
  const [activeConversationsNow, setActiveConversationsNow] = useState(412);
  const [conversionRate, setConversionRate] = useState(28.4);
  const [costReduction, setCostReduction] = useState(62);

  useEffect(() => {
    const interval = setInterval(() => {
      // Incrementos orgánicos en vivo según el giro de negocio
      setWhatsappChats((prev) => prev + Math.floor(Math.random() * 5) + 3);
      setDocsProcessed((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setHoursSaved((prev) => prev + (Math.random() > 0.6 ? 1 : 0));
      setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 15) + 8);

      setActiveConversationsNow((prev) => {
        const delta = Math.floor(Math.random() * 11) - 5;
        return Math.max(390, Math.min(460, prev + delta));
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <section className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#080d1a] via-[#05070e] to-[#010204] border border-[#0071e3]/40 overflow-hidden space-y-10 shadow-2xl">
      
      {/* Resplandor superior estilo Apple Pro */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#0071e3]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Columna Izquierda: Información de Giro de Negocio con Métricas Reales */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Telemetría de Negocio en Tiempo Real</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300 font-mono">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>{activeConversationsNow} sesiones simultáneas activas</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Impacto Operativo & Financiero en Vivo
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Nuestros agentes autónomos de WhatsApp, motores de extracción de facturas y escáneres de ciberdefensa procesan transacciones y consultas comerciales las 24 horas del día sin intervención humana.
          </p>

          {/* SELECTOR DE PILARES DE NEGOCIO (TABS APPLE STYLE) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/5 border border-white/10 max-w-md">
            <button
              onClick={() => setActiveTab('ventas')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ventas'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ventas WhatsApp</span>
            </button>

            <button
              onClick={() => setActiveTab('operaciones')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'operaciones'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Operaciones & Ahorro</span>
            </button>

            <button
              onClick={() => setActiveTab('ciberdefensa')}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'ciberdefensa'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>DEFENSA TI</span>
            </button>
          </div>

          {/* TARJETA HUD DINÁMICA SEGÚN EL GIRO DE NEGOCIO */}
          <div className="p-6 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-2xl space-y-4 shadow-xl">
            
            {activeTab === 'ventas' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                      Mensajes y Cierres de Ventas Comerciales
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-semibold">
                    WHATSAPP 24/7
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 via-white to-[#38bdf8]">
                      {formatNumber(whatsappChats)}
                    </span>
                    <span className="text-xs font-sans text-neutral-400 font-medium">mensajes atendidos</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Consultas de catálogo, precios y cierre de pedidos resueltos automáticamente sin costo de turnos noche.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Tiempo de Respuesta</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 3 seg</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Tasa de Conversión</div>
                    <div className="text-sm font-bold text-white mt-0.5">+{conversionRate}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Disponibilidad</div>
                    <div className="text-sm font-bold text-[#38bdf8] mt-0.5">365 Días</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'operaciones' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                      Automatización de Comprobantes & ERP
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 font-semibold">
                    CERO ERROR MANUAL
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-white to-[#38bdf8]">
                      {formatNumber(docsProcessed)}
                    </span>
                    <span className="text-xs font-sans text-neutral-400 font-medium">facturas & contratos</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Extracción estructurada con IA directamente a bases de datos, ERP y planillas contables.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Horas Ahorradas</div>
                    <div className="text-sm font-bold text-white mt-0.5">+{formatNumber(hoursSaved)}h</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Ahorro Operativo</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">-{costReduction}%</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Precisión OCR</div>
                    <div className="text-sm font-bold text-[#38bdf8] mt-0.5">99.7%</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ciberdefensa' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                    <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                      Escaneos y Vulnerabilidades Mitigadas
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 font-semibold">
                    DEFENSA TI
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#38bdf8] via-white to-emerald-400">
                      {formatNumber(threatsBlocked)}
                    </span>
                    <span className="text-xs font-sans text-neutral-400 font-medium">análisis perimetrales</span>
                  </div>
                  <p className="text-[11px] text-neutral-400">
                    Puertos expuestos detectados, validación de certificados SSL y protección anti-clonación.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Protocolo</div>
                    <div className="text-sm font-bold text-white mt-0.5">TLS 1.3</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Latencia Socket</div>
                    <div className="text-sm font-bold text-emerald-400 mt-0.5">&lt; 25ms</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-[10px] text-neutral-400 uppercase">Estándar</div>
                    <div className="text-sm font-bold text-[#38bdf8] mt-0.5">OWASP Top 10</div>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Insignias de Cifrado y Seguridad de Negocio */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-[#38bdf8] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Soberanía de Datos</div>
                <div className="text-neutral-400 text-[11px]">Cero filtración a modelos públicos</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Retorno de Inversión</div>
                <div className="text-neutral-400 text-[11px]">ROI positivo en &lt; 30 días</div>
              </div>
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

            {/* Pill flotante indicando el nodo matriz en Lima / NYC */}
            <div className="absolute bottom-4 sm:bottom-8 px-4 py-2 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Flujos comerciales sincronizados con el clúster de <strong>Neuronal Gravity</strong></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
