'use client';

import { useState } from 'react';
import { 

  
  ShieldCheck, 
  Search, 
  ArrowRight, 
  Printer, 
  Share2, 
  Check, 
  AlertTriangle, 
  Sparkles,
  Lock,
  Server,
  Zap,
  Cpu,
  Layers,
  Terminal,
  FileText,
  CheckCircle2,
  Globe2,
  ShieldAlert
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

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleScan = async (targetUrl?: string) => {
    const finalUrl = targetUrl || url;
    if (!finalUrl) return;

    setLoading(true);
    setError(null);
    setReport(null);
    setAuditId(null);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: finalUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Error al ejecutar auditoría');
      }

      setReport(data.report);
      setAuditId(data.id);
    } catch (err: any) {
      setError(err.message || 'Error de conexión con el motor perimetral');
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    if (!auditId) return;
    const shareableUrl = `${window.location.origin}/report/${auditId}`;
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Fondo Interactivo de Nodos */}
      <NeuralBackground />

      {/* Iluminación Ambiental de Fondo (Apple Style Glow) */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div className="absolute top-[-100px] h-[550px] w-[800px] rounded-full bg-gradient-to-b from-[#1d4ed8]/20 via-[#0071e3]/10 to-transparent blur-[140px]" />
        <div className="absolute top-[400px] h-[400px] w-[600px] rounded-full bg-[#3b82f6]/5 blur-[160px]" />
      </div>

      {/* Reporte Impreso Oculto en Web */}
      {report && auditId && <PrintableReport report={report as any} auditId={auditId} />}

      <div className="relative z-10 print:hidden flex flex-col min-h-screen">
        
        {/* Barra de Navegación Glassmorphism */}
        <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#000000]/65 backdrop-blur-2xl transition-all">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-b from-white/15 to-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm tracking-tight text-white">DEFENSA TI</span>
                <span className="text-[11px] text-neutral-400 font-normal">by Martin C.</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8 text-[12px] font-medium text-neutral-400">
              <a href="#vision" className="hover:text-white transition-colors duration-200">Visión General</a>
              <a href="#especificaciones" className="hover:text-white transition-colors duration-200">Especificaciones</a>
              <a href="#owasp" className="hover:text-white transition-colors duration-200">OWASP Engine</a>
              <span className="px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-neutral-300 text-[11px]">
                Zero-Cost Core
              </span>
            </nav>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] shadow-[0_0_8px_#30d158]" />
                <span className="text-neutral-400">OWASP Engine</span> 1.2.0-cloud
              </div>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="max-w-5xl mx-auto px-6 py-16 sm:py-20 space-y-16 flex-1 w-full">
          
          {/* Hero Section */}
          <section className="text-center space-y-6 max-w-2xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[#2997ff] text-xs font-medium tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              Security Score Pro &bull; Zero-Downtime Socket Audit
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
              Auditoría Perimetral.
              <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#d1d5db] to-[#6b7280]">
                Defensiva y Precisa.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-[#86868b] font-normal leading-relaxed max-w-xl mx-auto">
              Análisis determinista no intrusivo de cabeceras de transporte HTTP, certificados SSL/TLS, exposición de sockets TCP y parches generados por IA.
            </p>

            {/* Input Form Cápsula Apple */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleScan();
              }}
              className="pt-4 max-w-xl mx-auto"
            >
              <div className="p-1.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] backdrop-blur-xl shadow-2xl flex items-center gap-2 ring-1 ring-white/[0.05] focus-within:ring-[#0071e3]/60 focus-within:border-[#0071e3]/60 transition-all">
                <div className="pl-3.5 text-neutral-500">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  placeholder="https://tudominio.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-transparent border-none py-2 text-sm text-white placeholder-neutral-500 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] disabled:bg-neutral-800 disabled:text-neutral-500 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 text-white shadow-sm shrink-0"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Analizando...
                    </>
                  ) : (
                    <>
                      Auditar
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sugerencias Rápidas */}
            <div className="pt-2 text-[12px] text-neutral-500 flex items-center justify-center gap-2">
              <span>¿Quieres probar?</span>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://autonoma.pe');
                  handleScan('https://autonoma.pe');
                }}
                className="text-[#2997ff] hover:underline"
              >
                autonoma.pe
              </button>
              <span>&bull;</span>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://github.com');
                  handleScan('https://github.com');
                }}
                className="text-[#2997ff] hover:underline"
              >
                github.com
              </button>
            </div>
          </section>

          {/* Error Banner */}
          {error && (
            <div className="max-w-xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-3 backdrop-blur-xl">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Bloque de Resultados (Aparece al auditar) */}
          {report && (
            <div className="space-y-8 animate-in fade-in-50 duration-500 pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-3xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-2xl shadow-2xl">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-neutral-400 block font-medium">
                    Objetivo Analizado
                  </span>
                  <span className="text-xl font-semibold text-white tracking-tight">{report.url}</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] active:scale-[0.98] border border-white/[0.08] text-xs font-medium flex items-center justify-center gap-2 transition-all text-neutral-200"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Descargar PDF
                  </button>
                  <button
                    onClick={copyShareLink}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[#0071e3]/15 hover:bg-[#0071e3]/25 active:scale-[0.98] border border-[#0071e3]/30 text-[#2997ff] text-xs font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                    {copied ? '¡Copiado!' : 'Compartir Enlace'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                  <ScoreCircle score={report.score} grade={report.grade as any} />
                </div>
                <div className="md:col-span-2 rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                  <SslResults ssl={report.ssl} />
                </div>
              </div>

              {Boolean((report as any).ports?.length) && (
                <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                  <PortResults ports={(report as any).ports} />
                </div>
              )}

              <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                <HeaderResults headers={report.headers as any} />
              </div>

              <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                <RemediationList {...({ remediations: report.remediations, items: report.remediations } as any)} />
              </div>

              <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 backdrop-blur-xl">
                <TechnicalLogs {...({ telemetry: report.telemetry, data: report.telemetry } as any)} />
              </div>
            </div>
          )}

          {/* SECCIONES PERMANENTES INFORMATIVAS (Visibles siempre) */}
          <div className="pt-10 space-y-24">
            
            {/* 1. Visión General */}
            <section id="vision" className="space-y-8 scroll-mt-20">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Visión General del Blindaje
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  Metodología defensiva activa para mitigar vectores de explotación perimetral antes de que lleguen a la capa de aplicación.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Inspección de Tráfico</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Evaluación de transporte TLS 1.3 y verificación de certificados de Autoridades Emisoras reconocidas (CA).
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Superficie de Ataque TCP</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Sondeo determinista de puertos críticos (HTTP, HTTPS, SSH, FTP, MySQL) con detección de redirección segura.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Directivas OWASP</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Validación rigurosa de HSTS, CSP, X-Frame-Options y políticas de aislamiento contra Clickjacking y XSS.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Especificaciones Técnicas */}
            <section id="especificaciones" className="space-y-8 scroll-mt-20">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Especificaciones del Sistema
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  Arquitectura ligera y de alta velocidad montada sobre Node.js nativo y ejecución serverless.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-white tracking-tight">0.8s</span>
                    <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">Latencia Media</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-[#30d158] tracking-tight">TLSv1.3</span>
                    <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">Cifrado Negociado</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-white tracking-tight">5/5</span>
                    <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">Sockets Evaluados</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-bold text-[#2997ff] tracking-tight">A4 PDF</span>
                    <span className="text-[11px] text-neutral-500 block uppercase tracking-wider">Exportación Nativa</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. OWASP Engine & Zero-Cost Core */}
            <section id="owasp" className="space-y-8 scroll-mt-20">
              <div className="p-8 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/[0.08] backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <Cpu className="w-3.5 h-3.5" />
                    Zero-Cost Core Architecture
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Motor OWASP Determinado y Remediación en Cascada</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    Si no hay cuota de IA o falla la conexión externa, el auditor conmuta automáticamente al motor de reglas locales OWASP ($0 costo perpetuo), entregando parches exactos para Nginx, Apache y Express al instante.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    onClick={() => {
                      setUrl('https://autonoma.pe');
                      handleScan('https://autonoma.pe');
                    }}
                    className="px-6 py-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.12] text-xs font-medium text-white transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    Auditar autonoma.pe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>
<div className="fixed inset-0 pointer-events-none z-0 print:hidden">
  <NeuralBackground />
</div>
          </div>
        </main>

        {/* Footer Minimalista */}
        <footer className="border-t border-white/[0.06] py-12 text-center text-xs text-neutral-500 bg-[#000000] mt-24">
          <div className="max-w-5xl mx-auto px-6 space-y-2">
            <p className="font-normal text-neutral-400">&copy; 2026 DEFENSA TI Inc. Todos los derechos reservados.</p>
            <p className="text-[11px] text-neutral-600">Designed & Engineered by Martin C.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}