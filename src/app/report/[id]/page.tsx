'use client';

import { Suspense, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ScoreCircle from '@/components/ScoreCircle';
import SslResults from '@/components/SslResults';
import HeaderResults from '@/components/HeaderResults';
import RemediationList from '@/components/RemediationList';
import TechnicalLogs from '@/components/TechnicalLogs';
import PrintableReport from '@/components/PrintableReport';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { Shield, ChevronLeft, FileDown, Loader2, AlertCircle } from 'lucide-react';

function ReportContent() {
  const params = useParams();
  const auditId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : '';

  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!auditId) return;

    async function fetchReport() {
      try {
        const res = await fetch(`/api/report/${auditId}`);
        if (!res.ok) {
          setNotFound(true);
          return;
        }
        const data = await res.json();
        setReport(data);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [auditId]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
        <p className="text-xs font-mono text-slate-400">Recuperando dictamen perimetral...</p>
      </div>
    );
  }

  if (notFound || !report) {
    return (
      <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-6 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
          <div>
            <h2 className="text-base font-bold text-slate-100">Reporte no localizado</h2>
            <p className="text-xs text-slate-400 mt-1">
              El identificador solicitado ha expirado o no existe en el repositorio perimetral activo.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs text-slate-200 transition-all font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Volver al Auditor</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 antialiased selection:bg-blue-600/30 relative">
      <nav className="print:hidden fixed top-0 left-0 right-0 z-50 h-12 bg-black/85 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Auditor</span>
          </Link>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-bold text-slate-200">DEFENSA TI</span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Descargar PDF</span>
        </button>
      </nav>

      <main className="pt-20 pb-20 px-4 max-w-5xl mx-auto space-y-8">
        <div className="print:hidden space-y-6 animate-in fade-in duration-500">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Dictamen Técnico Oficial
              </span>
              <h1 className="text-lg sm:text-2xl font-bold text-slate-100 tracking-tight mt-0.5 break-all">
                {report.url}
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Emitido el {new Date(report.scannedAt).toLocaleString('es-PE')} &bull; ID: {report.id}
              </p>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all self-start sm:self-auto cursor-pointer shadow-lg"
            >
              <FileDown className="w-4 h-4" />
              <span>Descargar Reporte PDF</span>
            </button>
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
        </div>

        <PrintableReport report={report} auditId={report.id} />
      </main>
    </div>
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black text-slate-100 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
          <p className="text-xs font-mono text-slate-400">Cargando reporte perimetral...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}