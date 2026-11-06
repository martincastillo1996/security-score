'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { 
  ShieldCheck, 
  ArrowLeft, 
  FileText, 
  AlertTriangle 
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function InformeEjemploPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      <NeuralBackground />

      {/* Cabecera */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/defensati" className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a DEFENSA TI</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold tracking-wider">
            <span>DOCUMENTO ROTULADO: EJEMPLO ILUSTRATIVO</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 relative z-10 space-y-10">
        {/* Banner de Ejemplo */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm text-amber-100">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>AVISO: INFORME DE MUESTRA ROTULADO &ldquo;EJEMPLO&rdquo;</span>
          </div>
          <p>
            Este documento no contiene datos de ningún sitio web real. Los nombres de dominio, cabeceras y métricas aquí expuestos han sido anonimizados y generados con fines exclusivamente demostrativos para ilustrar el formato, profundidad técnica y estructura ejecutiva que entregamos en nuestras auditorías de 48 horas.
          </p>
        </div>

        {/* Portada del Informe Simulado */}
        <div className="p-8 md:p-12 rounded-3xl bg-[#0f1219]/90 border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/20 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-semibold mb-3">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DICTAMEN TÉCNICO OFICIAL DEFENSA TI</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                Auditoría de Seguridad Perimetral &bull; Web Corporativa
              </h1>
              <p className="text-sm text-neutral-400 mt-1 font-mono">
                Objetivo auditado: <strong>ejemplo-empresa-demo.com</strong> (Sitio Ficticio)
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 text-xs text-neutral-400 font-mono">
              <span>Fecha de Emisión: <strong>[Muestra Demo]</strong></span>
              <span>Auditor Responsable: <strong>Martín Castillo</strong></span>
              <span>RUC con Negocio: <strong>{siteConfig.business.ruc}</strong></span>
              <span className="text-emerald-400 font-semibold mt-1">✓ Entrega en 48 Horas Cumplida</span>
            </div>
          </div>

          {/* Calificación Global */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Calificación Inicial</span>
              <span className="text-5xl font-extrabold text-amber-400 my-2">Grado C</span>
              <span className="text-[11px] text-amber-300/80">3 vulnerabilidades de cabecera detectadas</span>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Cifrado SSL/TLS</span>
              <span className="text-5xl font-extrabold text-emerald-400 my-2">TLS 1.3</span>
              <span className="text-[11px] text-emerald-300/80">Certificado activo y válido</span>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center justify-center text-center">
              <span className="text-xs uppercase font-mono text-neutral-400 tracking-wider">Exposición de Versión</span>
              <span className="text-5xl font-extrabold text-rose-400 my-2">Riesgo</span>
              <span className="text-[11px] text-rose-300/80">Versión del CMS visible a terceros</span>
            </div>
          </div>

          {/* Hallazgos Clave */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#38bdf8]" />
              <span>Resumen Ejecutivo de Hallazgos Prioritarios</span>
            </h2>

            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-rose-200">
                  <span>1. Ausencia de Content-Security-Policy (CSP)</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase font-mono text-[10px]">Prioridad Alta</span>
                </div>
                <p className="text-neutral-300">
                  El servidor no restringe los orígenes de scripts ejecutables en el navegador, exponiendo el portal a inyecciones de código malicioso (XSS).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-amber-200">
                  <span>2. Falta de cabecera HSTS (Strict-Transport-Security)</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 uppercase font-mono text-[10px]">Prioridad Media</span>
                </div>
                <p className="text-neutral-300">
                  No se obliga al navegador a utilizar HTTPS de manera persistente, permitiendo posibles ataques de degradación a HTTP sin cifrar en redes públicas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-blue-200">
                  <span>3. Cabecera Server &bull; Divulgación de Tecnología</span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase font-mono text-[10px]">Prioridad Baja</span>
                </div>
                <p className="text-neutral-300">
                  La cabecera revela el software y la versión del servidor web, facilitando que atacantes automatizados busquen vulnerabilidades específicas conocidas.
                </p>
              </div>
            </div>
          </div>

          {/* Plan de Mitigación Recomendado */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono text-[#38bdf8]">
              Ruta de Corrección Técnica Recomendada
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              En el informe real, cada hallazgo incluye las líneas de código exactas para Nginx, Apache o Cloudflare, permitiendo a tu equipo técnico corregirlo en minutos o delegarlo directamente a nuestro plan <strong>Esencial (S/ 165)</strong> o <strong>Blindaje Total (S/ 335)</strong>.
            </p>
          </div>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              href="/defensati"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg text-center"
            >
              Solicitar Auditoría Oficial para mi Web (S/ 65)
            </Link>

            <a
              href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, vi el informe de ejemplo de DEFENSA TI y deseo consultar sobre una auditoría para mi web')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all text-center"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
