'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import FounderProfileCard from '@/components/FounderProfileCard';
import { 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Layers,
  Cpu
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function NeuronalGravityHubHome() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      {/* Fondo estelar cósmico limpio sin texto atravesado */}
      <NeuralBackground showDomains={false} />

      {/* 1. NAVEGACIÓN SUPERIOR APPLE PRO GLASS */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1px] shadow-[0_0_15px_rgba(0,113,227,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all">
              <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
                <span className="text-[#38bdf8] font-black text-sm tracking-tighter">NG</span>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
                NEURONAL GRAVITY
              </span>
              <span className="text-[10px] text-neutral-400 font-mono block">
                Soluciones Tecnológicas &bull; RUC {siteConfig.business.ruc}
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-4 text-xs">
            <Link 
              href="/defensati" 
              className="text-[#38bdf8] hover:text-white transition-colors font-medium flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>DEFENSA TI</span>
            </Link>
            <Link 
              href="/defensati" 
              className="text-neutral-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              Escáner Perimetral
            </Link>
            <a
              href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, vi el portal de Neuronal Gravity y deseo consultar sobre una solución técnica.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold transition-all hover:border-[#38bdf8]/40"
            >
              WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24 relative z-10">
        
        {/* BLOQUE 1: PRESENTACIÓN CORTA DE NEURONAL GRAVITY */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-[#0071e3]/20 via-[#7928ca]/20 to-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Desarrollo de Software & Ciberdefensa</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.035em] text-white leading-[1.08] max-w-4xl mx-auto">
            Soluciones tecnológicas listas
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e5e7eb] to-[#9ca3af]">
              para usar.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            En <strong>Neuronal Gravity</strong> desarrollamos herramientas de software e ingeniería aplicada para empresas. Presentamos nuestro primer proyecto activo y desplegado para producción: <strong className="text-white">DEFENSA TI</strong>.
          </p>

          {/* Único botón principal de la página principal */}
          <div className="pt-2">
            <Link
              href="/defensati"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(0,113,227,0.4)] hover:shadow-[0_0_35px_rgba(0,113,227,0.6)]"
            >
              <span>Conoce DEFENSA TI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* BLOQUE 2: PRESENTACIÓN DEL PRIMER PROYECTO (DEFENSA TI) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              <span>Primer Proyecto Activo</span>
            </h2>
            <span className="text-xs text-neutral-400 font-mono">1 de 1 disponible hoy</span>
          </div>

          <div className="relative rounded-3xl bg-[#0f1219]/90 border border-[#38bdf8]/30 p-8 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-[#38bdf8]/60 transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>DEFENSA TI es el servicio de seguridad web de Neuronal Gravity</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  DEFENSA TI &bull; Auditoría y Blindaje Web
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  Auditoría de seguridad externa y blindaje técnico para sitios web de negocios, con especialización en WordPress, WooCommerce y sistemas web a medida. Detectamos vulnerabilidades visibles antes de que afecten tus ventas y aplicamos las correcciones necesarias.
                </p>

                <p className="text-xs text-neutral-400 font-mono">
                  Cobertura para empresas en todo el Perú &bull; Diagnóstico técnico objetivo en 48 horas laborables.
                </p>
              </div>

              <div className="lg:w-64 shrink-0 flex flex-col justify-center space-y-4 text-center">
                <Link
                  href="/defensati"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg"
                >
                  <span>Probar Escáner Perimetral</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BLOQUE 3: SOBRE MARTÍN CASTILLO, FUNDADOR (TARJETA IDÉNTICA A LA CAPTURA) */}
        <FounderProfileCard />

        {/* BLOQUE 4: FUTURO (TEXTO EXACTO AUTORIZADO) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 backdrop-blur-xl space-y-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>Próximamente &bull; En desarrollo</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Próximas Soluciones: Integración de LLMs avanzados para automatización de consultas y operaciones de negocio (en fase de laboratorio)
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Diseñamos arquitecturas avanzadas para conectar Modelos de Lenguaje a flujos de trabajo empresariales, optimizando consultas operativas con trazabilidad de ingeniería y privacidad estricta. Actualmente en fase experimental y laboratorio técnico.
            </p>
          </div>
        </section>

      </main>

      {/* PIE DE PÁGINA PROFESIONAL Y LEGAL */}
      <footer className="border-t border-white/10 bg-black/90 py-12 relative z-10 text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight">NEURONAL GRAVITY</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                RUC con Negocio: <strong>{siteConfig.business.ruc}</strong> &bull; {siteConfig.business.receiptNotice}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos del Servicio</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad (Ley 29733)</Link>
              <Link href="/defensati" className="hover:text-white transition-colors text-[#38bdf8]">DEFENSA TI</Link>
              <Link href="/defensati/informe-ejemplo" className="hover:text-white transition-colors">Informe Ejemplo</Link>
              <a href={siteConfig.contact.whatsappLink} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                WhatsApp ({siteConfig.contact.whatsappFormatted})
              </a>
            </div>
          </div>

          <div className="text-[11px] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name} &bull; Primer proyecto: DEFENSA TI. {siteConfig.business.receiptNotice}.
            </p>
          </div>
        </div>
      </footer>

      {/* Orbe Flotante de Consulta */}
      <AiConsultantWidget />
    </div>
  );
}
