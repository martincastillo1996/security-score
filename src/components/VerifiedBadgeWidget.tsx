'use client';

import React, { useState } from 'react';
import { Award, Check, Copy, ExternalLink, ShieldCheck } from 'lucide-react';

interface VerifiedBadgeWidgetProps {
  domain: string;
  auditId?: string;
  grade?: string;
  score?: number;
}

export default function VerifiedBadgeWidget({ domain, auditId, grade, score = 0 }: VerifiedBadgeWidgetProps) {
  const [copied, setCopied] = useState(false);

  // Solo se muestra a sitios con Grado A o calificación de alta seguridad
  const isHighGrade = grade === 'A+' || grade === 'A' || score >= 85;
  if (!isHighGrade) return null;

  const cleanDomain = domain.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();
  const badgeUrl = `https://neuronalgravity.com/api/badge/${encodeURIComponent(cleanDomain)}`;
  const reportUrl = auditId ? `https://neuronalgravity.com/report/${auditId}` : `https://neuronalgravity.com/defensati?target=${encodeURIComponent(cleanDomain)}`;

  const embedSnippet = `<!-- Sello de Blindaje Web Verificado por DEFENSA TI -->\n<a href="${reportUrl}" target="_blank" rel="noopener noreferrer" title="Certificado de Seguridad DEFENSA TI - Neuronal Gravity">\n  <img src="${badgeUrl}" alt="Blindaje Web Verificado por DEFENSA TI" width="280" height="42" style="border:none;" />\n</a>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-[#0a0d14] to-[#121824] border border-[#38bdf8]/30 p-5 sm:p-6 backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.12)] space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0071e3]/15 border border-[#38bdf8]/40 flex items-center justify-center text-[#38bdf8] shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#38bdf8] bg-[#0071e3]/20 px-2 py-0.5 rounded-full border border-[#0071e3]/30">
                Sello Oficial de Confianza
              </span>
              <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Calificación Grado {grade || 'A'}
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-1">
              Incrusta tu Insignia de Blindaje Web en tu Tienda
            </h3>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
        Las tiendas online y páginas web que exhiben su certificación perimetral aumentan hasta un <strong>18% su tasa de conversión en pasarelas de pago</strong> al transmitir legitimidad inmediata a sus clientes en Perú y el mundo.
      </p>

      {/* Previsualización del Sello */}
      <div className="p-4 rounded-xl bg-black/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono text-slate-400 block mb-2">Vista previa interactiva en tu sitio:</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/api/badge/${encodeURIComponent(cleanDomain)}`}
            alt="Sello de Seguridad DEFENSA TI"
            className="rounded-lg shadow-md max-w-full"
            width={280}
            height={42}
          />
        </div>

        <button
          onClick={copyCode}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#0071e3]/25 active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          {copied ? '¡Código Copiado al Portapapeles!' : 'Copiar Código HTML para tu Web'}
        </button>
      </div>
    </div>
  );
}
