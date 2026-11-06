'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import { 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  AlertTriangle, 
  FileCode,
  Layers,
  Check
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { projectsRegistry } from '@/projects/registry';

export default function NeuronalGravityHubHome() {
  const defensatiProject = projectsRegistry[0];

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      <NeuralBackground showDomains={false} />

      {/* 1. NAVEGACIÓN SUPERIOR APPLE PRO GLASS */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1px] shadow-[0_0_15px_rgba(0,113,227,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all">
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
              href="/defensati/escaner" 
              className="text-neutral-400 hover:text-white transition-colors hidden sm:inline-block"
            >
              Escáner Abierto
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

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-20 relative z-10">
        {/* 2. ENCABEZADO PRINCIPAL (SOLUCIONES TECNOLÓGICAS LISTAS PARA USAR) */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-[#0071e3]/20 via-[#7928ca]/20 to-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Hub Tecnológico Independiente &bull; Perú</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Soluciones tecnológicas listas para usar.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Desarrollamos herramientas técnicas e ingeniería de software especializada. Nuestro primer proyecto activo y desplegado para empresas es <strong className="text-white">DEFENSA TI</strong>.
          </p>

          <div className="pt-2">
            <Link
              href="/defensati"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(0,113,227,0.4)] hover:shadow-[0_0_35px_rgba(0,113,227,0.6)]"
            >
              <span>Conoce DEFENSA TI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 3. TARJETA ÚNICA DE PROYECTO: DEFENSA TI */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              <span>Proyecto Activo en Producción</span>
            </h2>
            <span className="text-xs text-neutral-400 font-mono">1 de 1 disponible hoy</span>
          </div>

          <div className="relative rounded-3xl bg-[#0f1219]/90 border border-[#38bdf8]/30 p-8 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-[#38bdf8]/60 transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{defensatiProject.badge}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {defensatiProject.title} &bull; Auditoría y Blindaje Web
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  {defensatiProject.description}
                </p>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-neutral-300 space-y-1">
                  <span className="text-neutral-400 uppercase font-mono text-[10px] tracking-wider block">¿Para quién es?</span>
                  <p>{defensatiProject.targetAudience}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-neutral-300">
                  {defensatiProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-72 shrink-0 p-6 rounded-2xl bg-black/60 border border-white/10 flex flex-col justify-between space-y-6 text-center lg:text-left">
                <div>
                  <span className="text-xs text-neutral-400 font-mono block">Tarifa de Entrada</span>
                  <span className="text-3xl font-black text-white block mt-1">{defensatiProject.entryPrice}</span>
                  <span className="text-[11px] text-neutral-400">Entrega técnica en 48 horas</span>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/defensati"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg"
                  >
                    <span>Ver Planes y Autoevaluación</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/defensati/escaner"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all hover:text-white"
                  >
                    <span>Probar Escáner Gratis</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OFERTA DESTACADA: LIMPIEZA DE SITIO HACKEADO */}
        <section className="relative rounded-3xl bg-linear-to-r from-rose-950/40 via-[#0f1219] to-black border border-rose-500/30 p-8 sm:p-10 backdrop-blur-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Atención Urgente &bull; Respuesta Rápida</span>
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                ¿Tu sitio web fue hackeado o redirige a sitios extraños?
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Ofrecemos el servicio de <strong className="text-white">Limpieza de Sitio Hackeado (Desde S/ 500)</strong> tras un diagnóstico previo de alcance. Eliminamos inyecciones maliciosas, puertas traseras (backdoors) y recuperamos la operatividad limpia de tu web.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, necesito asistencia urgente: creo que mi sitio web fue hackeado o tiene malware.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-rose-900/50"
              >
                <span>Solicitar Diagnóstico Urgente</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* 5. SOBRE MARTÍN CASTILLO (CERO INVENCIÓN: REPO REAL Y ESCÁNER CONSTRUIDO) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 backdrop-blur-xl space-y-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8]">Transparencia e Ingeniería</span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Desarrollado y Auditado por Martín Castillo
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Trabajo sobre código real y auditable. He construido el motor de escaneo perimetral de DEFENSA TI con validación de cabeceras de seguridad, inspección de certificados SSL/TLS y protecciones SSRF. Todo el código fuente del auditor está publicado de manera abierta y transparente en GitHub.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={siteConfig.business.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all hover:text-white"
            >
              <FileCode className="w-4 h-4 text-[#38bdf8]" />
              <span>Ver Repositorio Open Source en GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>

            <Link
              href="/defensati/escaner"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all hover:text-white"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Probar el Escáner Abierto</span>
            </Link>
          </div>
        </section>

        {/* 6. CONTACTO DIRECTO */}
        <section className="text-center max-w-xl mx-auto space-y-4 pt-4">
          <h2 className="text-xl font-bold text-white">¿Tienes dudas sobre cómo blindar tu web?</h2>
          <p className="text-xs text-neutral-400">
            Atención directa por WhatsApp: <strong>{siteConfig.contact.whatsappFormatted}</strong>. {siteConfig.contact.hours}.
          </p>
          <a
            href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, deseo coordinar una consulta técnica.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-md"
          >
            <span>Conversar por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </main>

      {/* 7. PIE DE PÁGINA PROFESIONAL Y LEGAL */}
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

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} {siteConfig.name} &bull; Primer proyecto: DEFENSA TI. {siteConfig.business.receiptNotice}.
            </p>
            <p className="text-neutral-400">
              Libro de Reclamaciones: <span className="text-neutral-500">[PENDIENTE: Confirmar si aplica enlace virtual]</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Orbe Flotante de Consulta */}
      <AiConsultantWidget />
    </div>
  );
}
