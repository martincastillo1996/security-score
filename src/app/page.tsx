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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold transition-all shadow-[0_0_15px_rgba(37,211,102,0.35)] active:scale-95"
            >
              <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
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

        {/* BLOQUE 4: FUTURO (SOLUCIONES EN FASE DE LABORATORIO) */}
        <section className="relative p-8 sm:p-12 rounded-3xl bg-[#0f1219]/90 border border-purple-500/20 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-purple-500/40 transition-all">
          {/* Resplandor ambiental cósmico violeta/azul */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md">
                <Cpu className="w-3.5 h-3.5 text-purple-400" />
                <span>Próximamente &bull; En desarrollo</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Próximas Soluciones: Nuevos proyectos y herramientas tecnológicas para distintos rubros (en fase de laboratorio)
              </h2>

              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                En <strong>Neuronal Gravity</strong> nos encontramos desarrollando y testeando nuevas soluciones de ingeniería de software e inteligencia artificial aplicadas a diversos sectores comerciales. Cada proyecto atraviesa una fase estricta de pruebas en nuestro laboratorio técnico antes de su lanzamiento oficial para producción.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs font-mono text-purple-300">
                <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  &bull; Soluciones Multi-Rubro
                </span>
                <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  &bull; Modelos de Lenguaje &amp; Automatización
                </span>
                <span className="px-3 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  &bull; Laboratorio Experimental
                </span>
              </div>
            </div>

            {/* Diseño 3D Isométrico Cósmico de Laboratorio / Núcleo de IA */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 shrink-0 flex items-center justify-center">
              {/* Anillos orbitales giratorios */}
              <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-dashed border-sky-400/25 animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute inset-10 rounded-full border border-purple-400/30 animate-[spin_25s_linear_infinite]" />

              {/* Orbe Central 3D Dark Glass con Glow Cósmico */}
              <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-tr from-[#16122b] via-[#1f1642] to-[#2e1d66] border border-purple-400/40 p-4 shadow-[0_0_50px_rgba(168,85,247,0.35)] flex flex-col items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-500 backdrop-blur-2xl">
                {/* Reflejo glass Apple superior */}
                <div className="absolute inset-x-2 top-2 h-10 rounded-t-2xl bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-sky-400 p-[1.5px] shadow-[0_0_25px_rgba(168,85,247,0.5)]">
                  <div className="w-full h-full bg-[#0a0d14] rounded-2xl flex items-center justify-center">
                    <Sparkles className="w-7 h-7 text-purple-300 animate-pulse" />
                  </div>
                </div>

                <div className="mt-2.5 text-center">
                  <span className="text-[10px] font-mono tracking-widest uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-sky-300 block">
                    NG &bull; LAB
                  </span>
                  <span className="text-[9px] text-neutral-400 font-mono">Fase Experimental</span>
                </div>

                {/* Micro nodos orbitales flotantes */}
                <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-sky-400 shadow-[0_0_12px_#38bdf8] border-2 border-[#0f1219]" />
                <div className="absolute -bottom-2 -left-2 w-3.5 h-3.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] border-2 border-[#0f1219]" />
              </div>
            </div>
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
