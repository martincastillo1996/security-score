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
import CookieConsentBanner from '@/components/CookieConsentBanner';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import RealThreatCasesModal from '@/components/RealThreatCasesModal';
import HowItWorksGuide from '@/components/HowItWorksGuide';
import PricingSection from '@/components/PricingSection';
import AppleCyberHud from '@/components/AppleCyberHud';
import DonationModal from '@/components/DonationModal';
import SocialViralHub from '@/components/SocialViralHub';
import NeuronalGravityHub from '@/components/NeuronalGravityHub';
import LanguageSelector from '@/components/LanguageSelector';
import { useI18n } from '@/lib/i18n/I18nContext';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Printer,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Briefcase,
  Terminal
} from 'lucide-react';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback } from 'react';

export default function HomePage() {
  const { t } = useI18n();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<AuditReportRecord | null>(null);
  const [auditId, setAuditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'business' | 'tech'>('business');
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScan = useCallback(async (targetUrl?: string) => {
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
  }, [url]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const target = params.get('target') || params.get('url');
      if (target) {
        const timer = setTimeout(() => {
          setUrl(target);
          handleScan(target);
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [handleScan]);

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
      
      {/* Fondo Interactivo (+20% visibilidad de nodos) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-65">
        <NeuralBackground />
        <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/30 to-[#000000]/70" />
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
        
        {/* Barra de Navegación Apple Glass */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/75 backdrop-blur-2xl transition-all">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="mr-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-white/5">
                <span>←</span>
                <span className="font-semibold text-sky-400">Neuronal Gravity</span>
              </Link>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="h-9 w-9 rounded-xl bg-linear-to-b from-white/15 to-white/5 border border-white/10 flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-white leading-none">DEFENSA TI</span>
                <span className="text-[10px] text-neutral-400 font-normal mt-0.5">by Martin C.</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-neutral-400">
              <a href="#planes" className="text-white hover:text-[#2997ff] transition-colors duration-200">{t.nav.pricing}</a>
              <a href="#especificaciones" className="hover:text-white transition-colors duration-200">{t.nav.architecture}</a>
              <a href="#casos-reales" className="hover:text-white transition-colors duration-200">{t.nav.realCases}</a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30d158] shadow-[0_0_8px_#30d158]" />
                <span className="text-neutral-400">{t.nav.engine}</span> 1.2.0
              </div>

              {/* Selector Multi-Idioma Global (ES / EN / PT) */}
              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="max-w-5xl mx-auto px-6 py-16 sm:py-20 space-y-16 flex-1 w-full">
          
          {/* Hero */}
          <section className="text-center space-y-6 max-w-2xl mx-auto pt-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#2997ff] text-xs font-medium tracking-tight">
              <Sparkles className="w-3.5 h-3.5" />
              {t.hero.badge}
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-semibold tracking-[-0.03em] text-white leading-[1.08]">
              {t.hero.title1}
              <span className="block text-transparent bg-clip-text bg-linear-to-b from-[#ffffff] via-[#d1d5db] to-[#6b7280]">
                {t.hero.title2}
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-slate-100 font-normal leading-relaxed max-w-xl mx-auto">
              {t.hero.desc}
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
                  placeholder={t.hero.placeholder}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-transparent border-none py-2 text-sm text-white placeholder-neutral-500 focus:outline-none font-normal"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] disabled:bg-neutral-800 disabled:text-neutral-500 font-medium text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 text-white shadow-sm shrink-0 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.hero.btnAnalyzing}
                    </>
                  ) : (
                    <>
                      {t.hero.btnAudit}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2">
              <span>{t.hero.samplePrompt}</span>
              <button
                type="button"
                onClick={() => {
                  setUrl('https://autonoma.pe');
                  handleScan('https://autonoma.pe');
                }}
                className="text-[#2997ff] hover:underline cursor-pointer"
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
                className="text-[#2997ff] hover:underline cursor-pointer"
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

            {/* Resumen Inicial: Qué es la app y qué puedes hacer (Super visual y fácil de entender) */}
            {!report && <HowItWorksGuide />}
          </section>

          {/* Resultados de Auditoría */}
          {report && (
            <div ref={resultsRef} className="space-y-8 pt-8 scroll-mt-20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-[#161618] border border-white/10 shadow-2xl backdrop-blur-2xl">
                <div>
                  <span className="text-xs uppercase tracking-wider text-neutral-400 font-medium">{t.reportCard.targetAnalyzed}</span>
                  <h2 className="text-xl font-bold text-white">{report.url}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 active:scale-[0.98] border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    {t.reportCard.printBtn}
                  </button>
                  <button
                    onClick={copyShareLink}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#0071e3]/30 cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Share2 className="w-4 h-4" />}
                    {copied ? t.reportCard.copiedBtn : t.reportCard.shareBtn}
                  </button>
                </div>
              </div>

              {/* Selector de Perspectiva: Negocio vs Técnico (Estilo Apple Pro Switcher - Más grande y llamativo) */}
              <div className="flex justify-center py-2">
                <div className="inline-flex p-1.5 rounded-2xl bg-[#161618] border border-white/15 shadow-2xl">
                  <button
                    type="button"
                    onClick={() => setViewMode('business')}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                      viewMode === 'business'
                        ? 'bg-[#0071e3] text-white shadow-xl shadow-[#0071e3]/40 scale-[1.02]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" />
                    {t.reportCard.businessTab}
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('tech')}
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                      viewMode === 'tech'
                        ? 'bg-[#0071e3] text-white shadow-xl shadow-[#0071e3]/40 scale-[1.02]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Terminal className="w-4 h-4" />
                    {t.reportCard.techTab}
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

          {/* EMBUDO DE CONVERSIÓN Y VALOR */}
          <div className="pt-6 space-y-16">
            
            {/* Paso 1: Casos Reales (Solo abre el panel emergente al hacer clic) */}
            <section id="casos-reales" className="scroll-mt-20">
              <div className="flex justify-center">
                <RealThreatCasesModal />
              </div>
            </section>

            {/* Paso 2: Telemetría & Arquitectura Apple Pro (Bento Grid - Solo visible al escanear) */}
            {report && (
              <section id="especificaciones" className="scroll-mt-20">
                <AppleCyberHud />
              </section>
            )}

            {/* Paso 3: Planes y Tarifas de Solución Express */}
            <section id="planes" className="scroll-mt-20">
              <PricingSection targetUrl={report?.url} score={report?.score} grade={report?.grade} />
            </section>

            {/* Paso 4: Hub Viral & Difusión en Redes */}
            <SocialViralHub targetUrl={report?.url} score={report?.score} />

            {/* Paso 5: Ecosistema Matriz Open Source - NeuronalGravity.com */}
            <NeuronalGravityHub />

          </div>
        </main>

        {/* Modal Flotante de Donación */}
        <DonationModal />

        {/* Banner Flotante de Consentimiento de Cookies (Ley Peruana 29733 / RGPD) */}
        <CookieConsentBanner />

        {/* Asistente DEFENSA IT AI (Consultor Virtual Autónomo con Traspaso a WhatsApp) */}
        <AiConsultantWidget report={report} />

        <footer className="border-t border-white/10 py-14 text-xs text-neutral-400 bg-[#000000]/90 backdrop-blur-xl mt-24">
          <div className="max-w-5xl mx-auto px-6 space-y-8 text-center">
            
            {/* Redes y Conexiones Directas de Martín */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://neuronalgravity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-blue-600/20 via-purple-600/20 to-sky-600/20 hover:from-blue-600/30 hover:to-sky-600/30 border border-blue-400/30 text-[#38bdf8] font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)]"
              >
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <span>neuronalgravity.com</span>
              </a>

              <a
                href="mailto:martincastillorojas@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
              >
                <svg className="w-4 h-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>martincastillorojas@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/karol-martin-castillo-rojas-17a496168/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/40 text-[#38bdf8] font-medium transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn Profesional</span>
              </a>

              <a
                href="https://github.com/martincastillo1996/security-score"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                <span>GitHub &bull; Martin Castillo</span>
              </a>

              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20estuve%20revisando%20DEFENSA%20TI%20y%20quiero%20cotizar%20un%20blindaje%20perimetral"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-medium transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp: +1 (785) 643-3991</span>
              </a>
            </div>

            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <p className="font-medium text-white">
                &copy; 2026 DEFENSA TI Inc. &bull; Parte del ecosistema{' '}
                <a 
                  href="https://neuronalgravity.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#38bdf8] hover:underline font-bold"
                >
                  NeuronalGravity.com
                </a>
              </p>
              <p className="text-[11px] text-neutral-400">
                Soluciones Tecnológicas & Auditoría Perimetral Open Source &bull; Creado por Martin Castillo
              </p>
              <p className="text-[10px] text-neutral-500 leading-relaxed pt-2 border-t border-white/5">
                <strong>Descargo de Responsabilidad:</strong> DEFENSA TI proporciona diagnósticos no intrusivos basados en directivas públicas OWASP y análisis de cabeceras de transporte. Este servicio se brinda a título exclusivo de asesoría técnica y recomendaciones de buenas prácticas perimetrales. No constituye una certificación de infalibilidad ni auditoría de código interno o credenciales. DEFENSA TI y sus consultores quedan exentos de toda responsabilidad derivada de la implementación o incidentes de seguridad externos.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
