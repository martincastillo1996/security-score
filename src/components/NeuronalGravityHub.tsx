'use client';

import React from 'react';
import { 
  Sparkles, 
  ArrowUpRight, 
  ShieldCheck, 
  Code2, 
  Cpu
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function NeuronalGravityHub() {
  const { language } = useI18n();

  const labels = {
    es: {
      badge: 'Laboratorio Tecnológico & Open Source',
      title: 'Desarrollado bajo el ecosistema NeuronalGravity.com',
      desc: 'Neuronal Gravity es el laboratorio matriz de ingeniería de software y soluciones tecnológicas para empresas en el Perú. Desarrollamos herramientas prácticas y de código abierto para resolver problemas operativos reales.',
      mainCta: 'Conocer Neuronal Gravity',
      projectsTitle: 'Proyectos y Soluciones en el Ecosistema:',
      project1: 'DEFENSA TI',
      project1Badge: 'Primer Proyecto Activo',
      project1Desc: 'Servicio de auditoría perimetral no intrusiva y blindaje técnico para sitios web en el Perú.',
      project2: 'Open Source Lab',
      project2Badge: 'En Desarrollo',
      project2Desc: 'Herramientas y librerías públicas para desarrolladores y administradores de sistemas.',
      project3: 'AI Applied Solutions',
      project3Badge: 'Fase de Laboratorio',
      project3Desc: 'Investigación y desarrollo de automatizaciones con modelos de lenguaje para diversos rubros.',
      labBadge: 'Matriz Tecnológica',
    },
    en: {
      badge: 'Technology Lab & Open Source',
      title: 'Powered by the NeuronalGravity.com Ecosystem',
      desc: 'Neuronal Gravity is the parent engineering lab building software solutions for businesses in Peru. We build practical tools and open-source initiatives to solve real operational challenges.',
      mainCta: 'Visit Neuronal Gravity',
      projectsTitle: 'Ecosystem Projects & Solutions:',
      project1: 'DEFENSA TI',
      project1Badge: 'First Active Project',
      project1Desc: 'Non-intrusive perimeter security audit and technical hardening for websites in Peru.',
      project2: 'Open Source Lab',
      project2Badge: 'In Development',
      project2Desc: 'Public tools and libraries for developers and system administrators.',
      project3: 'AI Applied Solutions',
      project3Badge: 'Lab Phase',
      project3Desc: 'Research and development of workflow automations with language models across industries.',
      labBadge: 'Parent Tech Lab',
    },
    pt: {
      badge: 'Laboratório Tecnológico & Open Source',
      title: 'Desenvolvido sob o ecossistema NeuronalGravity.com',
      desc: 'Neuronal Gravity é o laboratório matriz de engenharia de software para empresas no Peru. Desenvolvemos ferramentas práticas e de código aberto para resolver desafios operacionais reais.',
      mainCta: 'Conhecer Neuronal Gravity',
      projectsTitle: 'Projetos e Soluções no Ecossistema:',
      project1: 'DEFENSA TI',
      project1Badge: 'Primeiro Projeto Ativo',
      project1Desc: 'Auditoria perimetral não intrusiva e blindagem técnica para sites no Peru.',
      project2: 'Open Source Lab',
      project2Badge: 'Em Desenvolvimento',
      project2Desc: 'Ferramentas e bibliotecas públicas para desenvolvedores e administradores.',
      project3: 'AI Applied Solutions',
      project3Badge: 'Fase de Laboratório',
      project3Desc: 'Pesquisa e desenvolvimento de automações com modelos de linguagem para vários setores.',
      labBadge: 'Matriz Tecnológica',
    },
  }[language] || {
    badge: 'Laboratorio Tecnológico & Open Source',
    title: 'Desarrollado bajo el ecosistema NeuronalGravity.com',
    desc: 'Neuronal Gravity es el laboratorio matriz de ingeniería de software para empresas en el Perú.',
    mainCta: 'Conocer Neuronal Gravity',
    projectsTitle: 'Proyectos y Soluciones en el Ecosistema:',
    project1: 'DEFENSA TI',
    project1Badge: 'Primer Proyecto Activo',
    project1Desc: 'Auditoría perimetral y blindaje para sitios web en el Perú.',
    project2: 'Open Source Lab',
    project2Badge: 'En Desarrollo',
    project2Desc: 'Herramientas y librerías públicas para desarrolladores.',
    project3: 'AI Applied Solutions',
    project3Badge: 'Fase de Laboratorio',
    project3Desc: 'Investigación y desarrollo de automatizaciones para diversos rubros.',
    labBadge: 'Matriz Tecnológica',
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <div className="relative rounded-[32px] p-7 sm:p-9 bg-gradient-to-b from-[#0e131f] via-[#090b10] to-[#050608] border border-[#2997ff]/30 shadow-[0_25px_60px_rgba(0,113,227,0.18)] overflow-hidden space-y-7 text-left">
        
        {/* Glow de fondo neuronal */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2997ff]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Encabezado Principal */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-sky-500/20 border border-blue-400/40 text-[#38bdf8] text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>{labels.badge}</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              neuronalgravity.com
            </h3>
            
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
              {labels.desc}
            </p>
          </div>

          <a
            href="https://neuronalgravity.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#0071e3] to-[#2997ff] hover:from-[#0077ed] hover:to-[#38bdf8] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 transition-all cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
          >
            <span>{labels.mainCta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Soluciones del Hub */}
        <div className="space-y-3 relative z-10">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block font-mono">
            {labels.projectsTitle}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Proyecto 1: DEFENSA TI (Primer producto activo) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-emerald-500/30 hover:border-emerald-500/60 transition-all space-y-2 shadow-md">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                  {labels.project1Badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{labels.project1}</h4>
              <p className="text-xs text-neutral-300 leading-relaxed">{labels.project1Desc}</p>
            </div>

            {/* Proyecto 2: Open Source Lab (En Desarrollo) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30 font-semibold">
                  {labels.project2Badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{labels.project2}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{labels.project2Desc}</p>
            </div>

            {/* Proyecto 3: AI Applied Solutions (Fase de Laboratorio) */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-sky-500/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded border border-sky-500/30 font-semibold">
                  {labels.project3Badge}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{labels.project3}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{labels.project3Desc}</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
