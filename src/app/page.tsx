'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NeuralBackground from '@/components/NeuralBackground';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import { 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  FileCode,
  Layers,
  Check,
  Cpu,
  Globe,
  Mail,
  MessageSquare
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

      <main className="max-w-5xl mx-auto px-6 py-16 space-y-24 relative z-10">
        
        {/* 2. ENCABEZADO PUNTUAL DEL HUB */}
        <section className="text-center max-w-3xl mx-auto space-y-6 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-[#0071e3]/20 via-[#7928ca]/20 to-[#38bdf8]/20 border border-[#38bdf8]/30 text-[#38bdf8] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Desarrollo de Software & Ciberseguridad</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Soluciones tecnológicas listas para usar.
          </h1>

          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal">
            En <strong>Neuronal Gravity</strong> desarrollamos herramientas de software e ingeniería aplicada para empresas. Presentamos nuestro primer proyecto activo y desplegado para producción: <strong className="text-white">DEFENSA TI</strong>.
          </p>

          <div className="pt-2">
            <Link
              href="/defensati"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-sm transition-all shadow-[0_0_25px_rgba(0,113,227,0.4)] hover:shadow-[0_0_35px_rgba(0,113,227,0.6)]"
            >
              <span>Ir a DEFENSA TI</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* 3. PRESENTACIÓN DEL PRIMER PROYECTO: DEFENSA TI (CON PRECIOS EN SOLES Y DÓLARES) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#38bdf8]" />
              <span>Primer Proyecto Activo</span>
            </h2>
            <span className="text-xs text-neutral-400 font-mono">Disponible hoy</span>
          </div>

          <div className="relative rounded-3xl bg-[#0f1219]/90 border border-[#38bdf8]/30 p-8 sm:p-10 backdrop-blur-xl shadow-2xl overflow-hidden hover:border-[#38bdf8]/60 transition-all">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="space-y-4 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Auditoría & Blindaje Perimetral</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  DEFENSA TI
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                  Diagnóstico técnico determinista y mitigación perimetral para sitios web corporativos y comercio electrónico. Identificamos brechas en cabeceras de seguridad, certificados SSL y exposición de versiones visibles antes de que sean explotadas.
                </p>

                {/* Niveles de Servicio y Precios Directos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Plan Base</span>
                    <span className="text-sm font-bold text-white block">Auditoría</span>
                    <span className="text-xs font-semibold text-[#38bdf8] block">Desde S/ 65 <span className="text-neutral-400 font-normal">/ $19</span></span>
                    <p className="text-[11px] text-neutral-400">Diagnóstico técnico completo e informe en 48 horas.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Plan Medio</span>
                    <span className="text-sm font-bold text-white block">Blindaje Esencial</span>
                    <span className="text-xs font-semibold text-[#38bdf8] block">S/ 165 <span className="text-neutral-400 font-normal">/ $49</span></span>
                    <p className="text-[11px] text-neutral-400">Precio total. Ya incluye la Auditoría previa.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1">
                    <span className="text-[10px] uppercase font-mono text-neutral-400 block">Blindaje Completo</span>
                    <span className="text-sm font-bold text-white block">Blindaje Total</span>
                    <span className="text-xs font-semibold text-[#38bdf8] block">S/ 335 <span className="text-neutral-400 font-normal">/ $99</span></span>
                    <p className="text-[11px] text-neutral-400">Precio total. Incluye Auditoría, Esencial y re-medición.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Sin invasión ni escaneo de puertos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Informe técnico con código de remediación</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-64 shrink-0 flex flex-col justify-center space-y-4 text-center">
                <Link
                  href="/defensati"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg"
                >
                  <span>Ver Proyecto Completo</span>
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
        </section>

        {/* 4. VISIÓN A FUTURO: TECNOLOGÍA CON IA Y LLMs AVANZADOS (HONESTO, SIN NADA FICTICIO) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 backdrop-blur-xl space-y-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Cpu className="w-3.5 h-3.5" />
              <span>I+D en Desarrollo</span>
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              Visión a Futuro: Soluciones Tecnológicas con IA y LLMs Avanzados
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              Más allá de la seguridad perimetral, en <strong>Neuronal Gravity</strong> investigamos y diseñamos arquitecturas de software basadas en Modelos de Lenguaje (LLMs) y agentes autónomos orientados a empresas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block">Integración de LLMs en Flujos de Negocio</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Asistencia conversacional contextual conectada a bases de conocimiento propietarias y flujos de consulta técnica directa sin exponer datos a modelos públicos.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-2">
              <span className="text-xs font-bold text-white block">Automatización Determinista de Operaciones</span>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sistemas autónomos que ejecutan tareas repetitivas de forma confiable, con trazabilidad de ingeniería y validaciones antes de impactar sistemas productivos.
              </p>
            </div>
          </div>

          <div className="text-xs text-neutral-400 pt-1 font-mono">
            &bull; Proyectos en fase de experimentación técnica y validación controlada.
          </div>
        </section>

        {/* 5. SOBRE MARTÍN CASTILLO (CON FOTO PROFESIONAL Y ENLACES VERIFICADOS) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 backdrop-blur-xl space-y-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* Foto de Martín Castillo */}
            <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl shrink-0 bg-neutral-900">
              <Image
                src="/martin-castillo-preview.jpg"
                alt="Martin Castillo - Fundador de Neuronal Gravity"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Información Técnica Real */}
            <div className="space-y-4 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Desarrollador & Fundador</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Martín Castillo
              </h2>

              <p className="text-sm font-medium text-neutral-300 leading-relaxed">
                Fundador y desarrollador de <strong>Neuronal Gravity</strong> y creador de <strong>DEFENSA TI</strong>.
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                Diseño y construyo herramientas tecnológicas desde cero. He desarrollado el motor de auditoría perimetral de DEFENSA TI con inspección no invasiva de cabeceras, SSL y defensas SSRF, manteniendo el código del analizador disponible en GitHub.
              </p>

              {/* Enlaces Reales de Contacto y Redes */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, vi tu perfil en Neuronal Gravity y deseo conversar.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all shadow-md shadow-emerald-600/30"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp ({siteConfig.contact.whatsappFormatted})</span>
                </a>

                <a
                  href="https://github.com/martincastillo1996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-all hover:text-white"
                >
                  <FileCode className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>GitHub</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>

                <a
                  href="https://www.linkedin.com/in/karol-martin-castillo-rojas-83b384234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-all hover:text-white"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0a66c2]" />
                  <span>LinkedIn</span>
                  <ExternalLink className="w-3 h-3 text-neutral-500" />
                </a>

                <a
                  href="mailto:castillo.karol96@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-semibold transition-all hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Directo</span>
                </a>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* 6. PIE DE PÁGINA PROFESIONAL Y LEGAL */}
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
