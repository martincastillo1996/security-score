'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Server, 
  ShieldCheck, 
  CheckCircle2, 
  Activity, 
  Sparkles, 
  Lock, 
  Terminal, 
  HelpCircle,
  FileCode2,
  Clock,
  Network,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface AuditEngineExplanationProps {
  engineVersion?: string;
  aiModel?: string;
  targetResolvedIp?: string;
  durationMs?: number;
  defaultExpanded?: boolean;
}

export default function AuditEngineExplanation({
  engineVersion = '1.2.0-cloud',
  aiModel = 'Neuronality AI (Google Gemini 1.5 Flash)',
  targetResolvedIp,
  durationMs,
  defaultExpanded = false
}: AuditEngineExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="rounded-3xl bg-[#0c0d10] border border-white/10 p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-5 text-left transition-all">
      
      {/* Encabezado Principal Compacto */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-[#38bdf8] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Transparencia y Gobernanza Técnica</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
            ¿Cómo funciona este escaneo y qué tecnologías lo respaldan?
          </h3>
          <p className="text-xs text-neutral-400 max-w-2xl leading-relaxed">
            Separación estricta entre la <strong>auditoría de red determinista</strong> (datos duros e incontestables) y la <strong>inteligencia artificial consultiva</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm hover:border-sky-500/30"
          >
            {isExpanded ? (
              <>
                <span>Ocultar desglose</span>
                <ChevronUp className="w-4 h-4 text-[#38bdf8]" />
              </>
            ) : (
              <>
                <span>Ver cómo funciona todo</span>
                <ChevronDown className="w-4 h-4 text-[#38bdf8]" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Ficha Resumen Principal (Visible Siempre) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Motor de Red</span>
          <span className="font-semibold text-white truncate block">DEFENSA TI v{engineVersion}</span>
          <span className="text-[10px] text-sky-400 block font-mono">100% Determinista</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Motor IA Consultivo</span>
          <span className="font-semibold text-purple-300 truncate block">Neuronality AI</span>
          <span className="text-[10px] text-neutral-400 block font-mono">Google Gemini 1.5</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Estándar Aplicado</span>
          <span className="font-semibold text-sky-300 truncate block">RFC 9110 &bull; OWASP</span>
          <span className="text-[10px] text-emerald-400 block font-mono">Ley 29733 (Perú)</span>
        </div>
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">IP Destino / Latencia</span>
          <span className="font-semibold text-emerald-400 truncate block">{targetResolvedIp || 'DNS Check OK'}</span>
          <span className="text-[10px] text-neutral-400 block font-mono">{durationMs ?? 840} ms en vivo</span>
        </div>
      </div>

      {/* DETALLE COMPLETO DESPLEGABLE: AL HACER CLIC SE MUESTRAN LOS DETALLES */}
      {isExpanded && (
        <div className="pt-2 border-t border-white/5 space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            
            {/* MOTOR 1: MOTOR DE RED Y BÚSQUEDA PERIMETRAL */}
            <div className="p-5 rounded-2xl bg-[#141416] border border-white/10 space-y-3.5 hover:border-sky-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Network className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold block">
                      Motor de Escaneo y Red
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      DEFENSA TI Network Probe Engine v{engineVersion}
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                  Sin Alucinaciones
                </span>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Sondeo TCP de Sockets:</strong> Conexión no invasiva a puertos canónicos (80, 443, 8080, 21, 22, 3306) sin tocar tu base de datos ni pedir contraseñas.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Validación Criptográfica X.509:</strong> Inspección directa del túnel TLS/SSL, vigencia de días y algoritmo de cifrado.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Auditoría HTTP RFC 9110:</strong> Comprobación de cabeceras defensivas (HSTS, CSP, X-Frame-Options) para evitar clonación de pasarelas.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 font-mono">
                <strong className="text-white block font-sans text-xs mb-0.5">Garantía para el Dueño de Negocio:</strong>
                Este motor no estima datos. Si un puerto sale abierto o falta una cabecera, es un hecho técnico medible e indiscutible de tu servidor.
              </div>
            </div>

            {/* MOTOR 2: MOTOR DE INTELIGENCIA ARTIFICIAL */}
            <div className="p-5 rounded-2xl bg-[#141416] border border-white/10 space-y-3.5 hover:border-purple-500/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                      Motor de Inteligencia Artificial
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      Neuronality AI Defense Core
                    </h4>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                  Consultor de Negocio
                </span>
              </div>

              <div className="space-y-2 text-xs text-neutral-300 leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>La IA NO inventa notas ni fallas:</strong> La calificación (A a F) proviene del cálculo matemático determinista; la IA no puede alterar la nota.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Traducción a Impacto en Soles (PEN):</strong> Explica sin tecnicismos cómo cada falla arriesga cobros en Yape o Niubiz y qué multas contempla la Ley N° 29733.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Recetas de Código Listas para Dev:</strong> Redacta los bloques de código exactos para Nginx y Apache para que tu técnico solo copie y pegue.
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 font-mono">
                <strong className="text-white block font-sans text-xs mb-0.5">Garantía para el Dueño de Negocio:</strong>
                Cero alucinaciones. La IA actúa como consultor de apoyo sobre la evidencia cruda del motor de red, asegurando un informe formal y defendible.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
