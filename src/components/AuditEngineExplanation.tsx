'use client';

import React from 'react';
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
  Network
} from 'lucide-react';

interface AuditEngineExplanationProps {
  engineVersion?: string;
  aiModel?: string;
  targetResolvedIp?: string;
  durationMs?: number;
  variant?: 'compact' | 'full';
}

export default function AuditEngineExplanation({
  engineVersion = '1.2.0-cloud',
  aiModel = 'Neuronality AI (Google Gemini 1.5 Flash)',
  targetResolvedIp,
  durationMs,
  variant = 'full'
}: AuditEngineExplanationProps) {
  return (
    <div className="rounded-3xl bg-[#0c0d10] border border-white/10 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] space-y-6 text-left">
      {/* Encabezado Principal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-[#38bdf8] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Transparencia y Gobernanza Técnica</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            ¿Cómo funciona este escaneo y qué tecnologías garantizan que la información es 100% verídica?
          </h3>
          <p className="text-xs sm:text-[13px] text-neutral-400 max-w-3xl leading-relaxed">
            Para proteger tu tranquilidad y darte seguridad jurídica y comercial, DEFENSA TI separa estrictamente la <strong>auditoría de red determinista</strong> (datos duros e incontestables) de la <strong>inteligencia artificial explicativa</strong>.
          </p>
        </div>

        <div className="shrink-0 flex sm:flex-col items-center sm:items-end gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Auditado en Tiempo Real
          </span>
          {durationMs !== undefined && (
            <span className="text-neutral-400 text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#38bdf8]" /> Latencia: {durationMs} ms
            </span>
          )}
        </div>
      </div>

      {/* Grid de 2 Motores: Motor de Red vs Motor de IA */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* MOTOR 1: MOTOR DE RED Y BÚSQUEDA PERIMETRAL */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#141416] border border-white/10 space-y-4 hover:border-sky-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400">
                <Network className="w-5 h-5" />
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
              100% Determinista
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>Sondeo TCP de Sockets:</strong> Conexión activa no invasiva a puertos canónicos (80, 443, 8080, 21, 22, 3306) para verificar exposición perimetral sin tocar tu base de datos.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>Validación Criptográfica X.509:</strong> Inspección directa del túnel TLS/SSL, vigencia de días restantes, algoritmo de cifrado y verificación de cadena de certificación.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>
                <strong>Auditoría HTTP RFC 9110:</strong> Comprobación de cabeceras defensivas (HSTS, CSP, X-Frame-Options) y cookies seguras para prevenir clonación de pasarelas.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 font-mono">
            <strong className="text-white block font-sans text-xs mb-1">Garantía para el Dueño de Negocio:</strong>
            Este motor no estima ni inventa datos. Si un puerto sale abierto o falta una cabecera, es un hecho técnico medible e indiscutible de tu servidor.
          </div>
        </div>

        {/* MOTOR 2: MOTOR DE INTELIGENCIA ARTIFICIAL */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#141416] border border-white/10 space-y-4 hover:border-purple-500/30 transition-all group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Sparkles className="w-5 h-5" />
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
              {aiModel.includes('Gemini') ? 'Google Gemini 1.5' : 'IA Neuronal'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs text-neutral-300 leading-relaxed">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>La IA NO inventa notas ni vulnerabilidades:</strong> La calificación (A a F) proviene 100% del motor determinista matemático; la IA no tiene autorización de alterar la nota.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Traducción a Impacto Comercial en Soles:</strong> Explica sin tecnicismos cómo cada falla arriesga cobros en Yape o Niubiz y qué multas contempla la Ley N° 29733 de Perú.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <span>
                <strong>Recetas de Código Listas para Dev:</strong> Redacta los bloques de código exactos para Nginx, Apache y Cloudflare para que tu programador no pierda tiempo.
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-[11px] text-neutral-400 font-mono">
            <strong className="text-white block font-sans text-xs mb-1">Garantía para el Dueño de Negocio:</strong>
            Cero alucinaciones. La IA actúa como consultor de apoyo sobre la evidencia cruda del motor de red, asegurando un informe técnico formal y defendible.
          </div>
        </div>

      </div>

      {/* Ficha Resumen de Telemetría Oficial */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Motor de Red</span>
          <span className="font-semibold text-white truncate block">DEFENSA TI v{engineVersion}</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Motor IA Consultivo</span>
          <span className="font-semibold text-purple-300 truncate block">{aiModel}</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">Estándar Aplicado</span>
          <span className="font-semibold text-sky-300 truncate block">RFC 9110 &bull; OWASP &bull; Ley 29733</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-500 font-mono uppercase block">IP Destino Validada</span>
          <span className="font-semibold text-emerald-400 truncate block">{targetResolvedIp || 'DNS Seguro Anti-SSRF'}</span>
        </div>
      </div>
    </div>
  );
}
