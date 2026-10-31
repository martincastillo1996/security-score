'use client';

import { useState, useRef } from 'react';
import ScoreCircle from '@/components/ScoreCircle';
import SslResults from '@/components/SslResults';
import HeaderResults from '@/components/HeaderResults';
import RemediationList from '@/components/RemediationList';
import TechnicalLogs from '@/components/TechnicalLogs';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { Shield, Search, Loader2, Share2, Check, ChevronRight, CheckCircle2, FileDown } from 'lucide-react';
import NeuralBackground from '@/components/NeuralBackground';
import PrintableReport from '@/components/PrintableReport';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShareOrPrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const inputRef = useRef<HTMLInputElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleScan = async (targetUrl?: string) => {
    const domainToScan = (targetUrl || url).trim();
    if (!domainToScan) {
      setError('Introduce un dominio o URL para auditar.');
      return;
    }

    setLoading(true);
    setError(null);
    setShowToast(false);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domainToScan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al procesar la auditoría.');
      }

      setReport(data);
      if (targetUrl) setUrl(targetUrl);

      setShowToast(true);
      setTimeout(() => setShowToast(false), 4500);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error inesperado de comunicación con el motor perimetral.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-100 antialiased selection:bg-blue-600/30 relative">
      {/* Dynamic Notification Toast */}
      {showToast && (
        <aside 
          aria-live="polite"
          className="print:hidden fixed top-14 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-emerald-500/40 text-emerald-400 text-xs font-medium shadow-[0_10px_30px_rgba(16,185,129,0.25)] backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-slate-200">
            Auditoría completada exitosamente. <span className="text-emerald-400 font-semibold">Resultados listos</span>.
          </span>
        </aside>
      )}

      {/* Fondo inmersivo Apple */}
      <div 
        className="print:hidden fixed inset-0 pointer-events-none bg-cover bg-center opacity-30 select-none z-0"
        style={{ backgroundImage: "url('/IMAGEN APPLE 1.jpg')" }}
      />

      {/* Universo Neuronal */}
      <div className="print:hidden">
        <NeuralBackground 
          onSelectDomain={(selectedDomain) => {
            setUrl(selectedDomain);
            setError(null);
            inputRef.current?.focus();
          }} 
        />
      </div>

      {/* Degradado general */}
      <div className="print:hidden fixed inset-0 pointer-events-none bg-linear-to-b from-black/40 via-transparent to-black/90 z-0" />

      {/* Contenedor interactivo */}
      <div className="relative z-10">
        {/* Barra de Navegación */}
        <nav className="print:hidden fixed top-0 left-0 right-0 z-50 h-11 bg-black/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 max-w-5xl mx-auto">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-slate-400 hover:text-white transition-colors shrink-0" />
            <span className="text-xs font-semibold tracking-tight text-slate-200">DEFENSA TI</span>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-normal tracking-tight">by Martin C.</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-xs text-slate-400">
            <span className="hover:text-white transition-colors cursor-pointer">Visión General</span>
            <span className="hover:text-white transition-colors cursor-pointer">Especificaciones</span>
            <span className="hover:text-white transition-colors cursor-pointer">OWASP Engine</span>
          </div>

          <div className="text-[10px] sm:text-xs font-mono text-slate-400 bg-white/5 px-2 py-0.5 sm:px-2.5 rounded-full border border-white/10">
            Zero-Cost Core
          </div>
        </nav>

        {/* Contenedor principal */}
        <main className="pt-24 sm:pt-28 pb-24 sm:pb-32 px-4 max-w-5xl mx-auto space-y-12 sm:space-y-16">
          {/* Tipografía Hero Apple */}
          <section className="print:hidden relative text-center space-y-4 pt-4 sm:pt-6">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11/12 max-w-2xl h-80 bg-black/75 rounded-full blur-3xl pointer-events-none -z-10" />

            <h2 className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-slate-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Seguridad Perimetral Profesional
            </h2>

            <div className="space-y-1">
              <h1 className="text-5xl sm:text-7xl font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
                Security Score Pro.
              </h1>
              <p className="text-sm sm:text-xl font-semibold tracking-tight text-transparent bg-clip-text bg-linear-to-b from-white via-slate-100 to-slate-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                by Martin C.
              </p>
            </div>

            <p className="text-base sm:text-xl text-slate-200 max-w-xl mx-auto font-normal tracking-tight leading-relaxed pt-2 px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Auditoría defensiva no intrusiva de cabeceras HTTP, sockets TLS e inteligencia de endurecimiento.
            </p>
            
            {/* Buscador minimalista */}
            <div className="pt-4 sm:pt-6 max-w-md mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleScan();
                }}
                className="flex items-center rounded-full bg-neutral-900/80 border border-white/20 p-1.5 backdrop-blur-2xl focus-within:border-blue-500 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
              >
                <div className="pl-3 pr-2 text-slate-400 shrink-0">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="ejemplo.com o https://..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={loading}
                  className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none tracking-tight font-normal min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-4 sm:px-5 py-2 text-xs font-medium tracking-tight transition-all disabled:opacity-50 shrink-0 flex items-center gap-1.5 cursor-pointer shadow-lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span className="hidden sm:inline">Auditando</span>
                    </>
                  ) : (
                    <>
                      <span>Auditar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                <span>¿Quieres probar?</span>
                <button
                  type="button"
                  onClick={() => handleScan('github.com')}
                  disabled={loading}
                  className="text-blue-400 hover:underline flex items-center cursor-pointer font-medium"
                >
                  Probar con github.com <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Error */}
          {error && (
            <div className="print:hidden max-w-md mx-auto rounded-2xl bg-neutral-900/90 border border-red-500/40 p-4 text-xs text-red-400 text-center backdrop-blur-md shadow-2xl">
              {error}
            </div>
          )}

          {/* Ancla para Scroll Automático y Contenedor de Resultados Web */}
          <div ref={resultsRef} className="pt-2 print:hidden">
            {report && (
              <section className="space-y-6 sm:space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Objetivo Analizado
                    </span>
                    <h3 className="text-lg sm:text-2xl font-semibold text-slate-100 tracking-tight mt-0.5 break-all">
                      {report.url}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                    {/* Botón Descargar PDF */}
                    <button
                      type="button"
                      onClick={handleShareOrPrint}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all cursor-pointer shadow-lg active:scale-95"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Descargar PDF</span>
                    </button>

                    {/* Botón Compartir Reporte */}
                    <button
                      type="button"
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/report/${report.id}`;
                        navigator.clipboard.writeText(shareUrl);
                        setCopiedShare(true);
                        setTimeout(() => setCopiedShare(false), 2000);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium bg-white/10 hover:bg-white/15 text-slate-100 border border-white/10 transition-all cursor-pointer backdrop-blur-md"
                    >
                      {copiedShare ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Enlace Copiado</span>
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5 text-slate-300" />
                          <span>Compartir Enlace</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <ScoreCircle score={report.score} grade={report.grade} />
                  </div>
                  <div className="md:col-span-2">
                    <SslResults ssl={report.ssl} />
                  </div>
                </div>

                <HeaderResults headers={report.headers} />

                {report.remediations && report.remediations.length > 0 && (
                  <RemediationList items={report.remediations} />
                )}

                <TechnicalLogs
                  id={report.id}
                  telemetry={report.telemetry}
                  scannedAt={report.scannedAt}
                />
              </section>
            )}
          </div>

          {/* Plantilla formal A4 para impresión / guardar como PDF */}
          {report && <PrintableReport report={report} auditId={report.id} />}

          {/* Footer Estilo Apple */}
          <footer className="print:hidden pt-16 sm:pt-20 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2 text-center sm:text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              <span>© 2026 DEFENSA TI Inc. Todos los derechos reservados.</span>
            </div>
            <div className="flex items-center gap-1.5 font-medium text-slate-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              <span>Designed & Engineered</span>
              <span className="text-slate-100 font-semibold">by Martin C.</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}