'use client';

import { useState } from 'react';
import { RemediationItem } from '@/lib/ai/remediation';
import { Wrench, Check, Copy, AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
  items: RemediationItem[];
}

export default function RemediationList({ items }: Props) {
  const [activeTabs, setActiveTabs] = useState<Record<number, 'nginx' | 'apache' | 'express'>>({});
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getSeverityBadge = (severity: RemediationItem['severity']) => {
    switch (severity) {
      case 'Crítica':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'Alta':
        return 'bg-orange-950 text-orange-300 border-orange-800';
      case 'Media':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Wrench className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-bold text-slate-100">Parches y Remediación con IA</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {items.length} {items.length === 1 ? 'vulnerabilidad detectada' : 'vulnerabilidades detectadas'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const currentTab = activeTabs[idx] || 'nginx';
          const currentCode = item.fix[currentTab] || '# No disponible';

          return (
            <div key={idx} className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-sm text-slate-200">
                    {item.headerName}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {item.impact}
              </p>

              {/* Selector de servidor */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                  {(['nginx', 'apache', 'express'] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [idx]: tab }))}
                      className={`px-2.5 py-1 text-xs font-mono rounded capitalize transition cursor-pointer ${
                        currentTab === tab
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(currentCode, idx)}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Snippet de código */}
              <pre className="bg-slate-900/90 text-indigo-300 text-xs p-3 rounded-lg overflow-x-auto font-mono border border-slate-800/60">
                <code>{currentCode}</code>
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}