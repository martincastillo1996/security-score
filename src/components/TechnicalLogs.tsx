'use client';

import { Terminal, Cpu, Clock, ShieldAlert } from 'lucide-react';

interface TelemetryProps {
  id: string;
  telemetry?: {
    durationMs: number;
    aiModel: string;
    targetResolvedIp?: string;
    engineVersion: string;
  };
  scannedAt: string;
}

export default function TechnicalLogs({ id, telemetry, scannedAt }: TelemetryProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-xs font-mono">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <span className="flex items-center gap-2 font-bold text-slate-200">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>System Execution Telemetry</span>
        </span>
        <span className="text-slate-500 uppercase">Engine {telemetry?.engineVersion || 'v1.0'}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-500 flex items-center gap-1 mb-1">
            <Clock className="w-3.5 h-3.5 text-blue-400" /> Latencia de Escaneo
          </span>
          <p className="font-semibold text-slate-200">{telemetry?.durationMs ?? 0} ms</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-500 flex items-center gap-1 mb-1">
            <Cpu className="w-3.5 h-3.5 text-purple-400" /> Motor de Inferencia
          </span>
          <p className="font-semibold text-slate-200 truncate">{telemetry?.aiModel || 'gemini-2.0-flash'}</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-500 flex items-center gap-1 mb-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> IP Destino Validada
          </span>
          <p className="font-semibold text-slate-200">{telemetry?.targetResolvedIp || 'DNS Check OK'}</p>
        </div>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
          <span className="text-slate-500 flex items-center gap-1 mb-1">Audit UUID</span>
          <p className="font-semibold text-slate-200 truncate" title={id}>{id ? id.slice(0, 8) : 'N/A'}...</p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1.5 font-sans">
        <div className="flex items-center gap-2 text-slate-200 font-semibold font-mono text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Arquitectura Híbrida: Red Determinista + IA Consultiva</span>
        </div>
        <p>
          &bull; <strong>Motor de Red (DEFENSA TI v{telemetry?.engineVersion || '1.2.0'}):</strong> Sondeo activo de sockets TCP, análisis RFC 9110 e inspección X.509. Puntuación calculada por algoritmo determinista (cero alucinaciones).
        </p>
        <p>
          &bull; <strong>Motor IA ({telemetry?.aiModel || 'Neuronality AI - Gemini 1.5 Flash'}):</strong> Módulo consultor de lenguaje que sintetiza hallazgos en impacto comercial y genera recetas de remediación listas para Dev.
        </p>
      </div>

      <p className="mt-3 text-slate-500 text-[11px]">
        Timestamp: {scannedAt ? new Date(scannedAt).toLocaleString() : new Date().toLocaleString()}
      </p>
    </div>
  );
}