'use client';

import React from 'react';
import { Zap, Lock, Activity, ShieldCheck, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';
import { CANONICAL_PORTS } from '@/config/ports';

export default function AppleCyberHud() {
  const ports = CANONICAL_PORTS.map(p => ({ port: p.port, name: p.shortName }));

  return (
    <div id="arquitectura" className="w-full max-w-4xl mx-auto py-4 scroll-mt-24 space-y-5">
      {/* Encabezado de Arquitectura Perimetral */}
      <div className="text-center space-y-1.5">
        <span className="text-[11px] font-mono font-bold text-[#38bdf8] uppercase tracking-wider">
          Telemetría y Motor Perimetral
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          Inspección Cero-Riesgo a Nivel Sockets
        </h3>
        <p className="text-xs text-neutral-400 max-w-lg mx-auto">
          Evaluación asíncrona no intrusiva de puertos, transporte TLS y cabeceras OWASP en tiempo real.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
        
        {/* Tarjeta 1: ENGINE CORE V1.2 */}
        <div className="p-6 rounded-[28px] bg-[#0c0d10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4 relative overflow-hidden group hover:border-[#0071e3]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#38bdf8] tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8]" />
              ENGINE CORE V1.2
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#38bdf8]">
              <Zap className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2 font-mono">
              <span>&lt; 1.2s</span>
              <span className="text-[11px] text-neutral-400 font-sans font-normal">latencia promedio</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              Sondeo asíncrono no intrusivo a nivel sockets del kernel sin colapsar el servidor.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">TLSv1.3 ECDHE</span>
            <span className="text-[#34d399] font-bold">100% Determinado</span>
          </div>
        </div>

        {/* Tarjeta 2: TCP SOCKETS MATRIX */}
        <div className="p-6 rounded-[28px] bg-[#0c0d10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#34d399] tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399] shadow-[0_0_8px_#34d399]" />
              TCP SOCKETS MATRIX
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#34d399]">
              <Activity className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl sm:text-2xl font-black text-white tracking-tight">5 Puertos Críticos</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                Pasivo
              </span>
            </div>
            
            {/* Rack de Puertos con LEDs */}
            <div className="flex items-center gap-2 pt-1">
              {ports.map((p) => (
                <div
                  key={p.port}
                  className="flex-1 py-2 px-1 rounded-xl bg-black/60 border border-white/10 text-center space-y-1"
                >
                  <div className="w-2 h-2 rounded-full bg-[#34d399] mx-auto shadow-[0_0_8px_#34d399]" />
                  <div className="text-[10px] font-mono text-white font-bold">{p.port}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">Sondeo Timeout</span>
            <span className="text-white">600ms por Socket</span>
          </div>
        </div>

        {/* Tarjeta 3: OWASP & ANTI-SSRF */}
        <div className="p-6 rounded-[28px] bg-[#0c0d10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-4 relative overflow-hidden group hover:border-indigo-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#818cf8] tracking-wider uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#818cf8] shadow-[0_0_8px_#818cf8]" />
              OWASP & ANTI-SSRF
            </span>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#818cf8]">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-baseline gap-2 font-mono">
              <span>RFC 1918</span>
              <span className="text-[11px] text-emerald-400 font-sans font-bold">Hardened</span>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed font-normal">
              Pre-resolución DNS contra saltos de red privada e inspección de cabeceras de transporte.
            </p>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-neutral-400">IA Fallback Dual</span>
            <span className="text-[#38bdf8] font-bold">Gemini + Local OWASP</span>
          </div>
        </div>

      </div>

      {/* Ventajas Estratégicas y de Negocio del Motor Perimetral */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-emerald-500/30 transition-all">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Cero Caídas (Zero-Downtime)</span>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Sondeo asíncrono pasivo que no satura servidores ni altera bases de datos.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-[#38bdf8]/30 transition-all">
          <div className="p-2 rounded-xl bg-blue-500/10 text-[#38bdf8] shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Aprobación Pasarelas</span>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Verifica los estándares perimetrales que evitan retenciones en Yape, Niubiz y Culqi.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-indigo-500/30 transition-all">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Privacidad Cero-Conocimiento</span>
            <p className="text-[11px] text-neutral-400 leading-snug">
              No requiere contraseñas, tokens ni credenciales. Solo evalúa la armadura exterior.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 hover:border-violet-500/30 transition-all">
          <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
            <Cpu className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white block">Recetas Listas para Dev</span>
            <p className="text-[11px] text-neutral-400 leading-snug">
              Código directo en Nginx, Apache y Cloudflare para corregir cualquier brecha en 5 minutos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
