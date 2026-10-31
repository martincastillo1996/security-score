'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

export interface RemediationSnippets {
  nginx: string;
  apache: string;
  express: string;
}

export interface RemediationItem {
  header?: string;
  headerName?: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  impact?: string;
  description: string;
  fix?: string | Record<string, string>;
  snippets?: RemediationSnippets;
}

interface Props {
  items: RemediationItem[];
}

export default function RemediationList({ items }: Props) {
  const [activeTabs, setActiveTabs] = useState<Record<number, 'nginx' | 'apache' | 'express'>>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="p-8 rounded-3xl bg-emerald-500/5 border border-emerald-500/20 text-center space-y-3 backdrop-blur-xl">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-1">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-white tracking-tight">
          Perímetro Óptimo y Blindado
        </h3>
        <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
          No se detectaron cabeceras críticas ausentes ni directivas desalineadas con los estándares OWASP. La configuración actual cumple con las directivas de seguridad evaluadas.
        </p>
      </div>
    );
  }

  const handleCopy = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'Crítica':
      case 'Alta':
        return 'text-rose-400 bg-rose-950/40 border-rose-800/50';
      case 'Media':
        return 'text-amber-400 bg-amber-950/40 border-amber-800/50';
      default:
        return 'text-emerald-400 bg-emerald-950/40 border-emerald-800/50';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-100">Parches y Remediación con IA</h3>
        <span className="text-xs font-mono text-slate-400">
          {items.length} {items.length === 1 ? 'vulnerabilidad detectada' : 'vulnerabilidades detectadas'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          type ServerType = 'nginx' | 'apache' | 'express';
          const currentTab = (activeTabs[idx] || 'nginx') as ServerType;

          const snippetObj = item.snippets || (typeof item.fix === 'object' ? item.fix : null);
          const currentCode =
            snippetObj?.[currentTab] ||
            (typeof item.fix === 'string' ? item.fix : '# Configuración defensiva recomendada');

          const title = item.headerName || item.header || 'Directiva OWASP';

          return (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-sm text-slate-200">{title}</span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded p-0.5 text-xs font-mono">
                  {(['nginx', 'apache', 'express'] as ServerType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [idx]: tab }))}
                      className={`px-2 py-0.5 rounded transition ${
                        currentTab === tab ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              {item.impact && <p className="text-xs text-slate-500 italic">Impacto: {item.impact}</p>}

              <div className="relative group">
                <pre className="bg-slate-900 border border-slate-800 rounded p-3 text-xs font-mono text-emerald-400 overflow-x-auto">
                  <code>{currentCode}</code>
                </pre>
                <button
                  onClick={() => handleCopy(currentCode, idx)}
                  className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono rounded transition opacity-80 group-hover:opacity-100"
                >
                  {copiedIdx === idx ? 'Copiado!' : 'Copiar'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}