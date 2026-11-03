'use client';

import HeaderResults from '@/components/HeaderResults';
import NeuralBackground from '@/components/NeuralBackground';
import PortResults from '@/components/PortResults';
import PrintableReport from '@/components/PrintableReport';
import RemediationList from '@/components/RemediationList';
import ScoreCircle from '@/components/ScoreCircle';
import SslResults from '@/components/SslResults';
import TechnicalLogs from '@/components/TechnicalLogs';
import WhatsAppCta from '@/components/WhatsAppCta';
import BusinessOverview from '@/components/BusinessOverview';
import ServerLocationCard from '@/components/ServerLocationCard';
import CookieResults from '@/components/CookieResults';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Cpu,
  Globe2,
  Printer,
  Search,
  Server,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Terminal
} from 'lucide-react';
import { useState, useRef } from 'react';

export default function HomePage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'business' | 'tech'>('business');
  const resultsRef = useRef<HTMLDivElement>(null);

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

      setReport(data.report || data);
      setAuditId(data.id || (data.report && data.report.id) || 'audit-local');

      // Enfoque automático suave hacia el resultado para confirmar la finalización
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error de conexión con el motor perimetral';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    if (!auditId) return;
    let shareableUrl = `${window.location.origin}/report/${auditId}`;
    try {
      if (report) {
        localStorage.setItem(`report_${auditId}`, JSON.stringify(report));
        const encoded = btoa(encodeURIComponent(JSON.stringify(report)));
        shareableUrl = `${window.location.origin}/report/${auditId}?d=${encoded}`;
      }
    } catch {
      // Fallback
    }
    navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Fondo Interactivo Suavizado (opacidad y difuminado para no distraer) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-45">
        <NeuralBackground />
        <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/40 to-[#000000]/80" />
      </div>

      {/* Iluminación Ambiental */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div 
          className="absolute rounded-full bg-linear-to-b from-[#1d4ed8]/20 via-[#0071e3]/10 to-transparent"
          style={{ top: '-100px', height: '550px', width: '800px', filter: 'blur(140px)' }} 
        />
        <div 
          className="absolute rounded-full bg-[#3b82f6]/5"
          style={{ top: '400px', height: '400px', width: '600px', filter: 'blur(160px)' }} 
        />
      </div>

      {/* Reporte Impreso */}
      {report && auditId && <PrintableReport report={report} auditId={auditId} />}

      <div className="relative z-10 print:hidden flex flex-col min-h-screen">
        
        {/* Barra de Navegación */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/65 backdrop-blur-2xl transition-all">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-xl bg-linear-to-b from-white/15 to-white/5 border border-white/10 flex items-center justify-center shadow-inner">
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
              <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 text-[11px]">
                Zero-Cost Core
              </span>
            </nav>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] shadow-[0_0_8px_#30d158]" />
                <span className="text-neutral-400">OWASP Engine</span> 1.2.0-cloud
              </div>
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="max-w-5xl mx-auto px-6 py-16 sm:py-20 space-y-16 flex-1 w-full">
          
          {/* Hero */}
          <section className="text-center space-y-6 max-w-2xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#2997ff] text-xs font-medium tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              Security Score Pro &bull; Zero-Downtime Socket Audit
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
              Auditoría Perimetral.
              <span className="block text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] via-[#d1d5db] to-[#6b7280]">
                Defensiva y Precisa.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl mx-auto">
              Análisis determinista no intrusivo de cabeceras de transporte HTTP, certificados SSL/TLS, exposición de sockets TCP y parches generados por IA.
            </p>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleScan();
              }}
              className="pt-4 max-w-xl mx-auto"
            >
              <div className="relative p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-[0_0_30px_rgba(0,113,227,0.15)] flex items-center gap-2 ring-1 ring-white/10 focus-within:ring-[#0071e3]/80 focus-within:border-[#0071e3]/80 focus-within:shadow-[0_0_45px_rgba(0,113,227,0.35)] transition-all">
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

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2">
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

            {error && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center justify-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </section>

          {/* Resultados de Auditoría */}
          {report && (
            <div ref={resultsRef} className="space-y-8 pt-8 scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#161618] border border-white/10 shadow-2xl backdrop-blur-2xl">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">Objetivo Analizado</span>
                  <h2 className="text-xl font-bold text-white">{report.url}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <Printer className="w-4 h-4" />
                    Exportar PDF
                  </button>
                  <button
                    onClick={copyShareLink}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0071e3]/30"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                    {copied ? '¡Copiado!' : 'Compartir Enlace'}
                  </button>
                </div>
              </div>

              {/* Selector de Perspectiva: Negocio vs Técnico (Estilo Apple Pro Switcher - Más grande y llamativo) */}
              <div className="flex justify-center py-2">
                <div className="inline-flex p-1.5 rounded-2xl bg-[#161618] border border-white/15 shadow-2xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('business')}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                      viewMode === 'business'
                        ? 'bg-[#0071e3] text-white shadow-xl shadow-[#0071e3]/40 scale-[1.02]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    Vista de Negocio (Gerencial)
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('tech')}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                      viewMode === 'tech'
                        ? 'bg-[#0071e3] text-white shadow-xl shadow-[#0071e3]/40 scale-[1.02]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-4 h-4" />
                    Vista Técnica (SysAdmin / Dev)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                  <ScoreCircle score={report.score} grade={report.grade || 'F'} />
                </div>
                <div className="md:col-span-2 rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                  <SslResults ssl={report.ssl} />
                </div>
              </div>

              {/* Geolocalización e Infraestructura de Servidor (Inspirado en WebCheck / Apple Style) */}
              <ServerLocationCard 
                location={report.location} 
                resolvedIp={report.telemetry?.targetResolvedIp} 
                targetDomain={report.url}
              />

              {/* Contenido Condicional según Perspectiva */}
              {viewMode === 'business' ? (
                <BusinessOverview report={report} />
              ) : (
                <div className="space-y-6">
                  {Boolean(report.ports?.length) && (
                    <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                      <PortResults ports={report.ports || []} />
                    </div>
                  )}

                  <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                    <HeaderResults headers={report.headers || []} />
                  </div>

                  {/* Auditoría Forense de Cookies de Sesión */}
                  <CookieResults cookies={report.cookies} />

                  <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                    <RemediationList items={report.remediations || []} />
                  </div>
                </div>
              )}

              {/* Llamado a la Acción Comercial de Blindaje Inmediato */}
              <WhatsAppCta url={report.url} score={report.score} grade={report.grade || 'F'} />

              {viewMode === 'tech' && (
                <div className="rounded-3xl bg-white/2 border border-white/5 p-6 backdrop-blur-xl">
                  <TechnicalLogs 
                    id={auditId || ''} 
                    telemetry={report.telemetry} 
                    scannedAt={report.scannedAt || ''} 
                  />
                </div>
              )}
            </div>
          )}

          {/* Secciones Informativas */}
          <div className="pt-10 space-y-24">
            
            <section id="vision" className="space-y-8 scroll-mt-20">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Defensa Profunda Perimetral
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  Tres pilares de inspección criptográfica y arquitectónica para blindar infraestructuras web.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-[#2997ff]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Criptografía TLS/SSL</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Evaluación exhaustiva de cadenas de confianza, algoritmos de firma, fechas de expiración y soporte de TLSv1.3.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white">Inspección de Sockets TCP</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Sondeo perimetral sin impacto que detecta puertos de bases de datos, protocolos obsoletos o proxies expuestos.
                  </p>
                </div>

                <div className="p-6 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl space-y-3">
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

            <section id="especificaciones" className="space-y-8 scroll-mt-20">
              <div className="text-center space-y-2">
                <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                  Especificaciones del Sistema
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  Arquitectura ligera y de alta velocidad montada sobre Node.js nativo y ejecución serverless.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-xl">
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

            <section id="owasp" className="space-y-8 scroll-mt-20">
              <div className="p-8 rounded-3xl bg-linear-to-b from-white/5 to-transparent border border-white/10 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
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
                    className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-all flex items-center justify-center gap-2 border border-white/10"
                  >
                    Auditar autonoma.pe
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </section>

          </div>
        </main>

        {/* Banner Flotante de Consentimiento de Cookies (Ley Peruana 29733 / RGPD) */}
        <CookieConsentBanner />

        {/* Botón Flotante Permanente de WhatsApp (Contacto Directo en Vivo) */}
        <FloatingWhatsAppButton url={report?.url} score={report?.score} />

        <footer className="border-t border-white/10 py-14 text-xs text-neutral-400 bg-[#000000]/90 backdrop-blur-xl mt-24">
          <div className="max-w-5xl mx-auto px-6 space-y-8 text-center">
            
            {/* Redes y Conexiones Scrapling Style */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20vi%20DEFENSA%20TI%20y%20quiero%20cotizar%20un%20blindaje%20perimetral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                WhatsApp: +1 (785) 643-3991
              </a>

              <a
                href="https://www.linkedin.com/in/karol-martin-castillo-rojas-17a496168/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
              >
                LinkedIn Profesional
              </a>

              <a
                href="https://github.com/martincastillo1996/security-score"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
              >
                GitHub Oficial &bull; ★ Star
              </a>
            </div>

            <div className="space-y-1 text-center">
              <p className="font-medium text-white">&copy; 2026 DEFENSA TI Inc. Todos los derechos reservados.</p>
              <p className="text-[11px] text-neutral-500">
                Auditoría perimetral determinista no intrusiva &bull; Diseñado & Desarrollado por Martin Castillo
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
