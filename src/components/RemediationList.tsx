'use client';

import React, { useState } from 'react';
import { ShieldCheck, Cloud, Copy, Check } from 'lucide-react';

export interface RemediationSnippets {
  nginx: string;
  apache: string;
  express: string;
  cloudflare?: string;
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
  type ServerType = 'cloudflare' | 'nginx' | 'apache' | 'express';
  const [activeTabs, setActiveTabs] = useState<Record<number, ServerType>>({});
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedMaster, setCopiedMaster] = useState(false);

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

  const generateCloudflareSnippet = (headerName: string) => {
    const h = headerName.toLowerCase();
    if (h.includes('frame')) return 'Header: X-Frame-Options | Value: SAMEORIGIN';
    if (h.includes('transport')) return 'Header: Strict-Transport-Security | Value: max-age=31536000; includeSubDomains; preload';
    if (h.includes('content-type')) return 'Header: X-Content-Type-Options | Value: nosniff';
    if (h.includes('referrer')) return 'Header: Referrer-Policy | Value: strict-origin-when-cross-origin';
    if (h.includes('policy')) return "Header: Content-Security-Policy | Value: default-src 'self'; script-src 'self' 'unsafe-inline';";
    return `Header: ${headerName} | Value: enabled`;
  };

  const masterCloudflareConfig = items
    .map((it) => generateCloudflareSnippet(it.headerName || it.header || 'Header'))
    .join('\n');

  const copyMasterConfig = () => {
    navigator.clipboard.writeText(masterCloudflareConfig);
    setCopiedMaster(true);
    setTimeout(() => setCopiedMaster(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Banner Especial de Solución Rápida sin Código (Cloudflare) */}
      <div className="p-5 rounded-2xl bg-[#f6821f]/10 border border-[#f6821f]/30 backdrop-blur-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#f6821f]">
            <Cloud className="w-5 h-5 shrink-0" />
            <h4 className="text-sm font-bold text-white">
              Solución Express sin tocar código en tu Servidor (Cloudflare Transform Rules)
            </h4>
          </div>
          <button
            onClick={copyMasterConfig}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f6821f] hover:bg-[#e07116] text-black font-semibold text-xs transition-all shadow-md active:scale-95 cursor-pointer"
          >
            {copiedMaster ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedMaster ? '¡Reglas Copiadas!' : 'Copiar Todas las Reglas'}
          </button>
        </div>
        <p className="text-xs text-neutral-300 leading-relaxed">
          En vez de editar archivos delicados de Linux o Apache, puedes añadir Cloudflare gratis a tu dominio y en <strong>Rules &gt; Transform Rules &gt; Modify Response Header</strong> pegar estos valores para subir a <strong>Grado A+</strong> en 2 minutos:
        </p>
        <pre className="p-3 rounded-xl bg-black/60 border border-white/10 text-[11px] font-mono text-amber-300 overflow-x-auto whitespace-pre">
          {masterCloudflareConfig}
        </pre>
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-100">Parches Específicos por Servidor</h3>
        <span className="text-xs font-mono text-slate-400">
          {items.length} {items.length === 1 ? 'directiva pendiente' : 'directivas pendientes'}
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const currentTab = (activeTabs[idx] || 'cloudflare') as ServerType;
          const title = item.headerName || item.header || 'Directiva OWASP';

          let currentCode = '';
          if (currentTab === 'cloudflare') {
            currentCode = generateCloudflareSnippet(title);
          } else {
            const snippetObj = item.snippets || (typeof item.fix === 'object' ? item.fix : null);
            currentCode =
              snippetObj?.[currentTab] ||
              (typeof item.fix === 'string' ? item.fix : '# Configuración defensiva recomendada');
          }

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
                  {(['cloudflare', 'nginx', 'apache', 'express'] as ServerType[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [idx]: tab }))}
                      className={`px-2 py-0.5 rounded transition capitalize ${
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
                  className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono rounded transition opacity-80 group-hover:opacity-100 cursor-pointer"
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
