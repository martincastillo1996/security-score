'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, ExternalLink, Code } from 'lucide-react';

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
            Fundador de <strong>Neuronal Gravity</strong>. Ayudo a dueños de negocios, directores y fundadores en el Perú a transformar procesos manuales lentos en sistemas inteligentes que operan 24/7 con alta rentabilidad, robustez y eficiencia técnica.
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(37,211,102,0.35)] hover:shadow-[0_0_25px_rgba(37,211,102,0.5)] active:scale-98"
              >
                <svg
                  className="w-4 h-4 fill-white shrink-0"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Consultar mi Caso por WhatsApp (+1 785 643-3991)</span>
                <span className="inline-flex items-center gap-1 ml-1 text-sm select-none" title="Perú y Estados Unidos">
                  <span>🇵🇪</span>
                  <span>🇺🇸</span>
                </span>
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
