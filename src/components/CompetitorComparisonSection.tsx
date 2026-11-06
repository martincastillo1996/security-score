'use client';

import React, { useState } from 'react';
import { ArrowRight, Swords, ShieldCheck, ShieldAlert, Sparkles, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { AuditReportRecord } from '@/lib/storage/reportStore';

export default function CompetitorComparisonSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [myUrl, setMyUrl] = useState('');
  const [compUrl, setCompUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [myReport, setMyReport] = useState<AuditReportRecord | null>(null);
  const [compReport, setCompReport] = useState<AuditReportRecord | null>(null);

  const handleCompare = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!myUrl || !compUrl) {
      setError('Por favor ingresa tanto tu página web como la de tu competidor.');
      return;
    }

    setLoading(true);
    setError(null);
    setMyReport(null);
    setCompReport(null);

    try {
      const [resMy, resComp] = await Promise.all([
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: myUrl.trim() }),
        }),
        fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: compUrl.trim() }),
        }),
      ]);

      const dataMy = await resMy.json();
      const dataComp = await resComp.json();

      if (!resMy.ok) throw new Error(dataMy.error || 'Error al auditar tu web');
      if (!resComp.ok) throw new Error(dataComp.error || 'Error al auditar la web del competidor');

      setMyReport(dataMy.report || dataMy);
      setCompReport(dataComp.report || dataComp);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al realizar la comparativa perimetral.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 stroke-emerald-400';
    if (score >= 60) return 'text-blue-400 stroke-blue-400';
    if (score >= 40) return 'text-amber-400 stroke-amber-400';
    return 'text-rose-500 stroke-rose-500';
  };

  return (
    <div className="pt-2 max-w-2xl mx-auto w-full px-2 sm:px-0">
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#0071e3]/20 via-[#7928ca]/20 to-[#38bdf8]/20 border border-[#38bdf8]/30 text-xs font-semibold text-[#38bdf8] hover:bg-[#38bdf8]/15 transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <Swords className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
          <span className="whitespace-normal leading-tight text-center">
            {isOpen ? 'Ocultar Comparador de Competencia' : '⚡ Nuevo: Comparar Blindaje contra tu Competidor'}
          </span>
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 p-4 sm:p-6 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-2xl shadow-[0_0_35px_rgba(0,113,227,0.15)] space-y-5 animate-in fade-in duration-300">
          <div className="text-center space-y-1">
            <h3 className="text-sm sm:text-base font-bold text-white flex items-center justify-center gap-2">
              <Swords className="w-4 h-4 text-[#2997ff] shrink-0" />
              Auditoría Comparativa Cara a Cara
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
              Analiza en tiempo real las debilidades y fortalezas técnicas de tu negocio frente a tu rival directo en el mercado.
            </p>
          </div>

          <form onSubmit={handleCompare} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Tu Sitio Web:
                </label>
                <input
                  type="text"
                  placeholder="ej. mitienda.pe"
                  value={myUrl}
                  onChange={(e) => setMyUrl(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0071e3]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Web de tu Competidor:
                </label>
                <input
                  type="text"
                  placeholder="ej. competidordirecto.pe"
                  value={compUrl}
                  onChange={(e) => setCompUrl(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-[16px] sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#7928ca]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-[#0071e3] to-[#7928ca] hover:opacity-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#0071e3]/20 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  <span>Auditando ambos perímetros en paralelo...</span>
                </>
              ) : (
                <>
                  <Swords className="w-4 h-4 shrink-0" />
                  <span>Comparar Seguridad en Tiempo Real</span>
                </>
              )}
            </button>
          </form>

          {error && (
            <p className="text-xs text-rose-400 font-medium text-center bg-rose-950/20 p-2.5 rounded-lg border border-rose-500/30">
              {error}
            </p>
          )}

          {/* Resultados de la Comparativa */}
          {myReport && compReport && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Tu Web */}
                <div className={`p-4 rounded-xl border ${myReport.score >= compReport.score ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-rose-950/20 border-rose-500/40'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Tu Negocio</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{myReport.url}</h4>
                  
                  <div className="flex items-center gap-3 my-3">
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                        <path className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className={getScoreColor(myReport.score)} strokeDasharray={`${myReport.score}, 100`} strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <span className="absolute font-mono font-bold text-xs text-white">{myReport.score}</span>
                    </div>

                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">Grado: {myReport.grade}</span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {myReport.ssl?.valid ? 'SSL Válido' : 'SSL Vulnerable'} &bull; {myReport.headers?.filter(h => h.present).length ?? 0}/6 Cabeceras
                      </span>
                    </div>
                  </div>
                </div>

                {/* Competidor */}
                <div className={`p-4 rounded-xl border ${compReport.score > myReport.score ? 'bg-emerald-950/20 border-emerald-500/40' : 'bg-neutral-900 border-white/10'}`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Competidor</span>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate">{compReport.url}</h4>

                  <div className="flex items-center gap-3 my-3">
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                        <path className="text-white/10" strokeWidth="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className={getScoreColor(compReport.score)} strokeDasharray={`${compReport.score}, 100`} strokeWidth="3.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <span className="absolute font-mono font-bold text-xs text-white">{compReport.score}</span>
                    </div>

                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block">Grado: {compReport.grade}</span>
                      <span className="text-[11px] text-slate-400 block truncate">
                        {compReport.ssl?.valid ? 'SSL Válido' : 'SSL Vulnerable'} &bull; {compReport.headers?.filter(h => h.present).length ?? 0}/6 Cabeceras
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Veredicto de Conversión */}
              <div className="p-4 rounded-xl bg-black/60 border border-white/15 text-center space-y-2">
                {compReport.score > myReport.score ? (
                  <>
                    <p className="text-xs text-amber-300 font-semibold flex items-center justify-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                      Tu competidor cuenta con un nivel de protección superior ({compReport.score}/100 vs tu {myReport.score}/100).
                    </p>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Su tienda online transmite mayor seguridad en pasarelas de pago y tiene menor riesgo de sufrir bloqueos bancarios o caídas de anuncios.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-emerald-400 font-semibold flex items-center justify-center gap-1.5">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      ¡Lideras en seguridad técnica frente a tu competidor directo! ({myReport.score}/100 vs {compReport.score}/100).
                    </p>
                    <p className="text-[11px] text-slate-300 leading-normal">
                      Mantén tu ventaja competitiva y asegura tu certificación perimetral Grado A permanente.
                    </p>
                  </>
                )}

                <div className="pt-2">
                  <a
                    href={`https://wa.me/51965682976?text=${encodeURIComponent(`Hola Martín, realicé la comparativa técnica entre mi web ${myReport.url} (${myReport.score} pts) y mi competidor ${compReport.url} (${compReport.score} pts). Deseo blindar mi sitio para superarlo con Grado A.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md active:scale-95 w-full sm:w-auto"
                  >
                    <span>Coordinar Blindaje Superior por WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
