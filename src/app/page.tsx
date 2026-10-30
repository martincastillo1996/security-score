'use client';

import { useState } from 'react';
import ScoreCircle from '@/components/ScoreCircle';
import SslResults from '@/components/SslResults';
import HeaderResults from '@/components/HeaderResults';
import RemediationList from '@/components/RemediationList';
import TechnicalLogs from '@/components/TechnicalLogs';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { ShieldCheck, Search, Loader2, Share2, Check, ExternalLink } from 'lucide-react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleScan = async (targetUrl?: string) => {
    const domainToScan = (targetUrl || url).trim();
    if (!domainToScan) {
      setError('Por favor ingresa un dominio válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: domainToScan }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocurrió un error al realizar la auditoría.');
      }

      setReport(data);
      if (targetUrl) setUrl(targetUrl);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error inesperado al conectar con el motor de escaneo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-12">
      <div className="max-w-4xl w-full space-y-8">
        {/* Cabecera Principal */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-800 text-indigo-400 text-xs font-mono">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Auditoría Pasiva & Hardening Perimetral</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Security Score <span className="text-indigo-400">DEFENSA TI</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Inspección no intrusiva de cabeceras HTTP, validación TLS/SSL a nivel socket y
            generación de parches de infraestructura asistidos por IA.
          </p>
        </header>

        {/* Input de Auditoría */}
        <div className="bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-2xl shadow-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="ejemplo.com o https://misitio.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
                className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium px-6 py-3 rounded-xl transition text-sm cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Auditando...</span>
                </>
              ) : (
                <span>Auditar Dominio</span>
              )}
            </button>
          </form>

          {/* Botón de prueba rápida */}
          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>¿Sin un objetivo a mano?</span>
            <button
              type="button"
              onClick={() => handleScan('github.com')}
              disabled={loading}
              className="text-indigo-400 hover:text-indigo-300 font-mono underline inline-flex items-center gap-1 cursor-pointer"
            >
              Probar escaneo en vivo con github.com <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Alerta de Error */}
        {error && (
          <div className="bg-rose-950/60 border border-rose-800/80 text-rose-300 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Resultados del Escaneo */}
        {report && (
          <section className="space-y-6 pt-4 animate-in fade-in duration-300">
            {/* Barra superior del reporte */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
              <div>
                <p className="text-xs text-slate-400">Objetivo auditado:</p>
                <h2 className="text-lg font-bold font-mono text-slate-100">{report.url}</h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const shareUrl = `${window.location.origin}/report/${report.id}`;
                  navigator.clipboard.writeText(shareUrl);
                  setCopiedShare(true);
                  setTimeout(() => setCopiedShare(false), 2000);
                }}
                className="flex items-center gap-1.5 text-xs bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-200 px-3.5 py-2 rounded-xl transition self-start sm:self-auto cursor-pointer"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Enlace Copiado</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Compartir Reporte</span>
                  </>
                )}
              </button>
            </div>

            {/* Cuadrícula de Score y SSL */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <ScoreCircle score={report.score} grade={report.grade} />
              </div>
              <div className="md:col-span-2">
                <SslResults ssl={report.ssl} />
              </div>
            </div>

            {/* Cabeceras HTTP */}
            <HeaderResults headers={report.headers} />

            {/* Remediación IA */}
            {report.remediations && report.remediations.length > 0 && (
              <RemediationList items={report.remediations} />
            )}

            {/* Telemetría Técnica */}
            <TechnicalLogs
              id={report.id}
              telemetry={report.telemetry}
              scannedAt={report.scannedAt}
            />
          </section>
        )}
      </div>
    </main>
  );
}