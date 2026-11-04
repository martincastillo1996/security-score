'use client';

import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Zap, 
  FileCheck2, 
  Sparkles
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function HowItWorksGuide() {
  const { t } = useI18n();

  const steps = [
    {
      step: '01',
      title: t.howItWorks.step1Title,
      desc: t.howItWorks.step1Desc,
      icon: Search,
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10',
      borderColor: 'border-sky-500/20'
    },
    {
      step: '02',
      title: t.howItWorks.step2Title,
      desc: t.howItWorks.step2Desc,
      icon: Zap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20'
    },
    {
      step: '03',
      title: t.howItWorks.step3Title,
      desc: t.howItWorks.step3Desc,
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 pt-4">
      {/* Tarjeta Bento Informativa Superior */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#0c0d10] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-6 text-left relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.howItWorks.badge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {t.howItWorks.title}
            </h3>
          </div>
          <span className="text-xs text-neutral-400 self-start sm:self-center">
            {t.howItWorks.freeTag}
          </span>
        </div>

        {/* 3 Pasos Ultra Visuales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#141416] border border-white/10 hover:border-white/20 transition-all space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-9 h-9 rounded-xl ${s.bgColor} ${s.borderColor} border flex items-center justify-center ${s.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold text-neutral-400">{s.step}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{s.title}</h4>
                    <p className="text-xs text-neutral-300 leading-relaxed mt-1">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Franja de Utilidad Inmediata */}
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-300">
          <span className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{t.howItWorks.footerAlert}</span>
          </span>
          <span className="text-[11px] text-neutral-400">{t.howItWorks.owaspTag}</span>
        </div>

      </div>
    </div>
  );
}
