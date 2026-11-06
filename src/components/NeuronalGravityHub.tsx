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
      badge: 'Ecosistema Tecnológico & Open Source',
      title: 'Desarrollado bajo el ecosistema NeuronalGravity.com',
      desc: 'NeuronalGravity es el laboratorio matriz de soluciones tecnológicas avanzadas, herramientas de seguridad perimetral, inteligencia artificial y proyectos de código abierto diseñados para acelerar empresas en Latinoamérica y el mundo.',
      mainCta: 'Visitar NeuronalGravity.com',
      projectsTitle: 'Proyectos & Soluciones en el Ecosistema:',
      project1: 'DEFENSA TI',
      project1Desc: 'Motor de auditoría perimetral no intrusiva y blindaje para e-commerce en Latam.',
      project2: 'Open Source Lab',
      project2Desc: 'Herramientas y librerías públicas para desarrolladores y sysadmins.',
      project3: 'AI Applied Solutions',
      project3Desc: 'Automatizaciones e inteligencia artificial aplicada a procesos de negocio reales.',
      labBadge: 'Matriz Tecnológica',
    },
    en: {
      badge: 'Technology Ecosystem & Open Source',
      title: 'Powered by the NeuronalGravity.com Ecosystem',
      desc: 'NeuronalGravity is the parent lab of advanced tech solutions, perimeter cybersecurity tools, applied artificial intelligence, and open-source initiatives built for businesses across Latin America and worldwide.',
      mainCta: 'Visit NeuronalGravity.com',
      projectsTitle: 'Ecosystem Projects & Solutions:',
      project1: 'DEFENSA TI',
      project1Desc: 'Non-intrusive perimeter audit engine and e-commerce hardening in Latam.',
      project2: 'Open Source Lab',
      project2Desc: 'Public tools and libraries for developers and system administrators.',
      project3: 'AI Applied Solutions',
      project3Desc: 'Automations and applied artificial intelligence for real-world workflows.',
      labBadge: 'Parent Tech Lab',
    },
    pt: {
      badge: 'Ecossistema Tecnológico & Open Source',
      title: 'Desenvolvido sob o ecossistema NeuronalGravity.com',
      desc: 'NeuronalGravity é o laboratório matriz de soluções tecnológicas avançadas, segurança perimetral, inteligência artificial e projetos de código aberto para empresas na América Latina e no mundo.',
      mainCta: 'Acessar NeuronalGravity.com',
      projectsTitle: 'Projetos & Soluções no Ecossistema:',
      project1: 'DEFENSA TI',
      project1Desc: 'Motor de auditoria perimetral não intrusiva e blindagem para e-commerce na América Latina.',
      project2: 'Open Source Lab',
      project2Desc: 'Ferramentas e bibliotecas públicas para desenvolvedores e administradores.',
      project3: 'AI Applied Solutions',
      project3Desc: 'Automações e inteligência artificial aplicada a processos reais de negócios.',
      labBadge: 'Matriz Tecnológica',
    },
  }[language] || {
    badge: 'Ecosistema Tecnológico & Open Source',
    title: 'Desarrollado bajo el ecosistema NeuronalGravity.com',
    desc: 'NeuronalGravity es el laboratorio matriz de soluciones tecnológicas avanzadas, herramientas de seguridad perimetral, inteligencia artificial y proyectos de código abierto.',
    mainCta: 'Visitar NeuronalGravity.com',
    projectsTitle: 'Proyectos & Soluções en el Ecosistema:',
    project1: 'DEFENSA TI',
    project1Desc: 'Motor de auditoría perimetral no intrusiva y blindaje para e-commerce.',
    project2: 'Open Source Lab',
    project2Desc: 'Herramientas y librerías públicas para desarrolladores.',
    project3: 'AI Applied Solutions',
    project3Desc: 'Automatizaciones e inteligencia artificial aplicada.',
    labBadge: 'Matriz Tecnológica',
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-10">
      <div className="relative rounded-[32px] p-7 sm:p-9 bg-linear-to-b from-[#0e131f] via-[#090b10] to-[#050608] border border-[#2997ff]/30 shadow-[0_25px_60px_rgba(0,113,227,0.18)] overflow-hidden space-y-7 text-left">
        
        {/* Glow de fondo neuronal */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2997ff]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none" />

        {/* Encabezado Principal */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 relative z-10 border-b border-white/10 pb-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-linear-to-r from-blue-500/20 via-purple-500/20 to-sky-500/20 border border-blue-400/40 text-[#38bdf8] text-xs font-bold shadow-[0_0_15px_rgba(56,189,248,0.2)]">
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
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-[#0071e3] to-[#2997ff] hover:from-[#0077ed] hover:to-[#38bdf8] text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/30 transition-all cursor-pointer active:scale-95 shrink-0 self-start sm:self-center"
          >
            <span>{labels.mainCta}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* 3 Soluciones del Hub */}
        <div className="space-y-3 relative z-10">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
            {labels.projectsTitle}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            
            {/* Proyecto 1: DEFENSA TI */}
            <div className="p-4 rounded-2xl bg-white/3 border border-white/10 hover:border-[#2997ff]/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[#38bdf8]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  En Vivo
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{labels.project1}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{labels.project1Desc}</p>
            </div>

            {/* Proyecto 2: Open Source Lab */}
            <div className="p-4 rounded-2xl bg-white/3 border border-white/10 hover:border-purple-500/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20 font-bold">
                  Open Source
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{labels.project2}</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">{labels.project2Desc}</p>
            </div>

            {/* Proyecto 3: AI Applied Solutions */}
            <div className="p-4 rounded-2xl bg-white/3 border border-white/10 hover:border-sky-500/50 transition-all space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 font-bold">
                  Autónomo
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
