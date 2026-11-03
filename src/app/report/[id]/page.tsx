'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Printer, 
  Share2, 
  Check, 
  ArrowLeft,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import ScoreCircle from '@/components/ScoreCircle';
import SslResults from '@/components/SslResults';
import PortResults from '@/components/PortResults';
import HeaderResults from '@/components/HeaderResults';
import RemediationList from '@/components/RemediationList';
import PrintableReport from '@/components/PrintableReport';
import TechnicalLogs from '@/components/TechnicalLogs';
import NeuralBackground from '@/components/NeuralBackground';
import { AuditReportRecord } from '@/lib/storage/reportStore';

export default function ReportPage({ params }: { params: Promise<{ id: string }> }) {
  // En Next.js 15/16 los params son una Promesa:
  const resolvedParams = use(params);
  const auditId = resolvedParams.id;

  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Cargar el reporte automáticamente al entrar a la página
  useEffect(() => {
    if (!auditId) return;

    // 1. Intentar decodificar desde el parámetro ?d= en la URL
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const encoded = urlParams.get('d');
      if (encoded) {
        const decoded = JSON.parse(decodeURIComponent(atob(encoded)));
        if (decoded && typeof decoded.score === 'number') {
          queueMicrotask(() => {
            setReport(decoded);
            setLoading(false);
          });
          return;
        }
      }
    } catch {
      // Fallback
    }

    // 2. Intentar leer desde localStorage local
    try {
      const cached = localStorage.getItem(`report_${auditId}`);
      if (cached) {
        const decoded = JSON.parse(cached);
        if (decoded && typeof decoded.score === 'number') {
          queueMicrotask(() => {
            setReport(decoded);
            setLoading(false);
          });
          return;
        }
      }
    } catch {
      // Fallback
    }

    fetch(`/api/report/${auditId}`)
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || 'Reporte no encontrado o expirado');
        }
        return res.json();
      })
      .then((data) => {
        setReport(data);
      })
      .catch((err) => {
        setError(err.message || 'Error al recuperar la auditoría');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [auditId]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // 1. Estado de Carga
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
        <NeuralBackground />
        <Loader2 className="w-8 h-8 animate-spin text-[#0071e3]" />
        <p className="text-neutral-400 text-sm">Recuperando auditoría perimetral...</p>
      </div>
    );
  }

  // 2. Estado de Error (Reporte no encontrado o expirado)
  if (error || !report) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-6 text-center">
        <NeuralBackground />
        <AlertTriangle className="w-12 h-12 text-rose-500 mb-2" />
        <h1 className="text-xl font-bold">Reporte no disponible</h1>
        <p className="text-neutral-400 text-sm max-w-md">
          {error || 'El reporte solicitado no existe o ha expirado de la memoria del servidor.'}
        </p>
        <Link 
          href="/" 
          className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Realizar nueva auditoría
        </Link>
      </div>
    );
  }

  // 3. Renderizar el reporte cargado
  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      <NeuralBackground />
      <PrintableReport report={report} auditId={auditId} />

      <div className="relative z-10 print:hidden flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#000000]/65 backdrop-blur-2xl">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ShieldCheck className="w-5 h-5 text-[#2997ff]" />
              <span className="font-semibold text-sm tracking-tight text-white">DEFENSA TI</span>
            </Link>
            <div className="flex items-center gap-3">
              <Link 
                href="/" 
                className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium flex items-center gap-1.5 text-neutral-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Nuevo Escaneo
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 py-12 space-y-8 flex-1 w-full">
          {/* Barra de Acciones del Reporte */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div>
              <span className="text-xs uppercase tracking-wider text-neutral-400">Auditoría compartida</span>
              <h2 className="text-lg font-semibold text-white">{report.url}</h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={copyShareLink}
                className="px-4 py-2 rounded-xl bg-[#0071e3]/15 hover:bg-[#0071e3]/25 border border-[#0071e3]/30 text-[#2997ff] text-xs font-medium flex items-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                {copied ? '¡Copiado!' : 'Compartir'}
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-medium flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" /> PDF
              </button>
            </div>
          </div>

          {/* Resultados de la Auditoría */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
              <ScoreCircle score={report.score} grade={(report.grade as 'A+' | 'A' | 'B' | 'C' | 'D' | 'F') || 'F'} />
            </div>
            <div className="md:col-span-2 rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
              <SslResults ssl={report.ssl} />
            </div>
          </div>

          {Boolean(report.ports?.length) && (
            <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
              <PortResults ports={report.ports || []} />
            </div>
          )}

          <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
            <HeaderResults headers={report.headers || []} />
          </div>

          <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
            <RemediationList items={report.remediations || []} />
          </div>

          <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
            <TechnicalLogs 
              id={auditId} 
              telemetry={report.telemetry} 
              scannedAt={report.scannedAt || ''} 
            />
          </div>
        </main>
      </div>
    </div>
  );
}
