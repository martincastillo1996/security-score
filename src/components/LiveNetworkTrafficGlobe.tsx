'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  ShieldCheck, 
  Cpu, 
  Globe2, 
  Zap, 
  Radio, 
  ArrowUpRight 
} from 'lucide-react';
import Apple3DGlobe from '@/components/Apple3DGlobe';

export default function LiveNetworkTrafficGlobe() {
  // Contador en tiempo real que simula millones de consultas viajando por nodos globales
  const [totalQueries, setTotalQueries] = useState(14829342);
  const [qps, setQps] = useState(384);
  const [latency, setLatency] = useState(24);
  const [activeNodes, setActiveNodes] = useState(48);

  useEffect(() => {
    const interval = setInterval(() => {
      // Incremento dinámico de consultas en vivo
      const delta = Math.floor(Math.random() * 18) + 12;
      setTotalQueries((prev) => prev + delta);
      setQps(Math.floor(Math.random() * 85) + 340);
      setLatency(Math.floor(Math.random() * 6) + 21);
    }, 700);

    return () => clearInterval(interval);
  }, []);

  // Formateador con comas para lectura fluida
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US');
  };

  return (
    <section className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#080d1a] via-[#05070e] to-[#010204] border border-[#0071e3]/40 overflow-hidden space-y-10 shadow-2xl">
      
      {/* Resplandor superior estilo Apple Pro */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-[#0071e3]/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* Columna Izquierda: Información de Infraestructura y Métricas en Vivo */}
        <div className="lg:col-span-6 space-y-6 text-left">
          
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span>Red Neuronal Global en Vivo</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300 font-mono">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>48 Nodos Edge Activos</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.1]">
            Despliegues con Baja Latencia y Soberanía de Datos
          </h2>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Tus agentes autónomos de WhatsApp, modelos de visión y procesos empresariales se ejecutan sobre servidores perimetrales interconectados con cifrado <strong>TLS 1.3 de extremo a extremo</strong>. Millones de peticiones circulan de forma privada sin exponer las bases de datos de tu empresa.
          </p>

          {/* TARJETA HUD: CONTADOR DE MILLONES DE CONSULTAS EN VIVO (APPLE STYLE) */}
          <div className="p-5 rounded-2xl bg-black/60 border border-white/15 backdrop-blur-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#38bdf8] animate-pulse" />
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-300">
                  Flujo de Consultas Telemetrizadas
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-semibold">
                SISTEMA OPERACIONAL
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight flex items-baseline gap-2">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-neutral-100 to-[#38bdf8]">
                  {formatNumber(totalQueries)}
                </span>
                <span className="text-xs font-sans text-neutral-400 font-medium">queries procesadas</span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Peticiones viajando en milisegundos a través de los nodos de Estados Unidos, Perú y Latinoamérica.
              </p>
            </div>

            {/* Micro métricas en tiempo real */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase">QPS en Vivo</div>
                <div className="text-sm font-bold text-white mt-0.5">{qps} req/s</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase">Latencia Edge</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{latency}ms</div>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <div className="text-[10px] text-neutral-400 uppercase">Disponibilidad</div>
                <div className="text-sm font-bold text-[#38bdf8] mt-0.5">99.98%</div>
              </div>
            </div>
          </div>

          {/* Insignias de Cifrado y Seguridad */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-[#38bdf8] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Cifrado Militar</div>
                <div className="text-neutral-400 text-[11px]">TLS 1.3 & Zero-Data-Leak</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white">Edge Latency</div>
                <div className="text-neutral-400 text-[11px]">&lt; 30ms en Latam & US</div>
              </div>
            </div>
          </div>

        </div>

        {/* Columna Derecha: Globo 3D Cobe Interactiva */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center relative">
          
          <div className="relative w-full max-w-[460px] aspect-square rounded-full flex items-center justify-center">
            
            {/* Halo exterior orbital */}
            <div className="absolute inset-0 rounded-full border border-[#0071e3]/30 animate-pulse pointer-events-none" />
            <div className="absolute inset-8 rounded-full border border-dashed border-[#38bdf8]/20 animate-spin-slow pointer-events-none" />

            <Apple3DGlobe lat={-12.0464} lon={-77.0428} />

            {/* Pill flotante indicando el nodo matriz en Lima / NYC */}
            <div className="absolute bottom-4 sm:bottom-8 px-4 py-2 rounded-2xl bg-black/85 border border-white/15 backdrop-blur-xl shadow-2xl flex items-center gap-2.5 text-xs text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Conexión encriptada directa con el cluster de <strong>Neuronal Gravity</strong></span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
