'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, MessageSquare, ExternalLink, Code } from 'lucide-react';

interface Props {
  className?: string;
}

export default function FounderProfileCard({ className = '' }: Props) {
  return (
    <div className={`p-8 sm:p-12 rounded-3xl bg-[#0d111a]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-8 ${className}`}>
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
        
        {/* Tarjeta de Foto con Indicador de Estado */}
        <div className="relative w-64 sm:w-72 shrink-0 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl p-2.5 space-y-2.5">
          <div className="relative w-full h-80 rounded-xl overflow-hidden bg-neutral-900 border border-white/10">
            <Image
              src="/martin-castillo-preview.jpg"
              alt="Martin Castillo - Fundador de Neuronal Gravity"
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </div>

          <div className="flex items-center justify-between px-2 py-1 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white text-[11px]">Martin Castillo</span>
            </div>
            <span className="text-[10px] text-neutral-400">Lead Architect</span>
          </div>
        </div>

        {/* Información y Propuesta de Valor */}
        <div className="space-y-4 text-center lg:text-left flex-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fundador &amp; Consultor Principal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Martin Castillo
          </h2>

          <p className="text-sm sm:text-base font-semibold text-[#38bdf8] leading-snug">
            Arquitecto de Soluciones de Negocio con IA &amp; Consultor Principal
          </p>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
            Fundador de <strong>Neuronal Gravity</strong>. Ayudo a dueños de negocios, directores y fundadores en Latinoamérica y el mundo a transformar procesos manuales lentos en sistemas inteligentes que operan 24/7 con alta rentabilidad, robustez y eficiencia técnica.
          </p>

          {/* Cita en Tarjeta Glass */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm text-neutral-300 italic leading-relaxed text-left">
            &ldquo;La inteligencia artificial no debe ser un adorno tecnológico ni un gasto inflado: debe ser una palanca directa que multiplique las utilidades de tu empresa y libere a tu equipo de tareas mecánicas.&rdquo;
          </div>

          {/* Botones de Acción Oficiales */}
          <div className="space-y-3 pt-2">
            <div>
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20vi%20tu%20perfil%20en%20la%20web%20y%20quiero%20consultar%20mi%20caso"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/50 text-emerald-300 text-xs font-bold transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>Consultar mi Caso por WhatsApp (+1 785 643-3991)</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href="https://www.linkedin.com/in/karol-martin-castillo-rojas-83b384234/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0071e3]/15 hover:bg-[#0071e3]/25 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-semibold transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Perfil en LinkedIn</span>
              </a>

              <a
                href="https://github.com/martincastillo1996"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-all hover:text-white"
              >
                <Code className="w-3.5 h-3.5 text-neutral-400" />
                <span>&lt;/&gt; Repositorios Open Source en GitHub</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
