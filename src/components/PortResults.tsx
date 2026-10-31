'use client';

import { PortCheckResult } from '@/lib/scanner/portScanner';
import { Server, ShieldAlert, ShieldCheck, ArrowRightLeft } from 'lucide-react';

interface PortResultsProps {
  ports?: PortCheckResult[];
}

export default function PortResults({ ports }: PortResultsProps) {
  if (!ports || ports.length === 0) return null;

  return (
    <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-500" />
          <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
            Inspección Perimetral de Puertos Críticos
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Zero-Downtime TCP Probe</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {ports.map((p) => {
          const isPort80 = p.port === 80;

          return (
            <div
              key={p.port}
              className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                p.isOpen
                  ? isPort80
                    ? 'bg-amber-950/20 border-amber-500/40 text-amber-200'
                    : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                  : 'bg-white/5 border-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold">
                  Puerto {p.port} &bull; {p.service}
                </span>
                {p.isOpen ? (
                  isPort80 ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                      <ArrowRightLeft className="w-3 h-3" />
                      REDIRECCIÓN (HTTP)
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-400">
                      <ShieldAlert className="w-3 h-3" />
                      EXPUESTO
                    </span>
                  )
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    PROTEGIDO
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-2 leading-tight">
                {isPort80 && p.isOpen
                  ? 'Abierto para capturar tráfico no seguro y redirigir hacia HTTPS.'
                  : p.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}