'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Lock,
  Eye
} from 'lucide-react';
import RealThreatCasesModal from '@/components/RealThreatCasesModal';

export default function RealCasesSection() {
  const [activeTab, setActiveTab] = useState<'ecommerce' | 'corporate'>('ecommerce');

  return (
    <section id="casos-reales" className="space-y-10 scroll-mt-24 py-8">
      
      {/* Cabecera de Sección */}
      <div className="text-center space-y-3 max-w-3xl mx-auto p-6 sm:p-7 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Casos Reales Auditados &bull; Prueba Social</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          Empresas en Perú: Antes y Después del Blindaje
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto">
          Resultados medibles con auditoría determinista independiente. Mira cómo sitios vulnerables pasaron de alertas rojas en navegadores a calificación técnica Grado A.
        </p>
      </div>

      {/* Selector de Pestañas de Casos */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-white/5 border border-white/10 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('ecommerce')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'ecommerce'
                ? 'bg-[#0071e3] text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🛒 Caso 1: E-commerce & Tienda Online (WooCommerce)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('corporate')}
            className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'corporate'
                ? 'bg-[#0071e3] text-white shadow-md'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🏢 Caso 2: Portal Corporativo B2B (Servicios & Logística)
          </button>
        </div>
      </div>

      {/* Tarjeta del Caso Activo: Antes vs Después */}
      <div className="rounded-3xl bg-[#0e1118]/90 border border-white/10 p-6 sm:p-9 backdrop-blur-2xl shadow-2xl space-y-8">
        
        {activeTab === 'ecommerce' ? (
          <div className="space-y-6">
            
            {/* Título del Caso */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Sector Retail &bull; Lima, Perú
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  Tienda Online de Calzado & Moda (WooCommerce)
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Tiempo de Ejecución: 4 días</span>
              </div>
            </div>

            {/* Grid Comparativo Antes vs Después */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tarjeta ANTES */}
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Situación Inicial (Vulnerable)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-rose-400 font-mono">24/100</span>
                    <span className="block text-[10px] text-rose-300 font-bold uppercase">Grado F</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Contenido Mixto (Mixed Content):</strong> Imágenes cargando por HTTP simple, activando advertencias de &ldquo;Sitio no seguro&rdquo; en el checkout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Sin HSTS ni CSP:</strong> Formularios expuestos a ataques de clickjacking y suplantación de iframes de pasarela.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Firma de Servidor Expuesta:</strong> Versión exacta de Apache y PHP visible para bots automatizados de escaneo.</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta DESPUÉS */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Tras el Blindaje DEFENSA TI</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400 font-mono">94/100</span>
                    <span className="block text-[10px] text-emerald-300 font-bold uppercase">Calificación Grado A</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>HSTS Estricto Activado:</strong> Cifrado forzado a nivel de navegador con max-age=31536000 e includeSubDomains.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Protección Anti-Clickjacking:</strong> Cabeceras X-Frame-Options DENY y CSP blindando el botón de pago y checkout.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Sello Verificado:</strong> Insignia oficial Grado A embebida en el pie de página para transmitir confianza a compradores.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Título del Caso 2 */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] font-mono text-sky-400 uppercase font-bold tracking-wider">
                  Sector Servicios B2B &bull; Callao, Perú
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                  Operador Logístico & Exportación Industrial
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold shrink-0">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Tiempo de Ejecución: 5 días</span>
              </div>
            </div>

            {/* Grid Comparativo Antes vs Después */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tarjeta ANTES */}
              <div className="p-5 sm:p-6 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Situación Inicial (Observado)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-rose-400 font-mono">48/100</span>
                    <span className="block text-[10px] text-rose-300 font-bold uppercase">Grado D</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Puertos Administrativos Expuestos:</strong> Puertos SSH y cPanel visibles en escaneos públicos de red.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Requisito de Cliente Corporativo:</strong> Clientes multinacionales exigían aprobación perimetral antes de renovar contratos de transporte.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span><strong>Cookies sin Atributos Seguros:</strong> Sesiones web vulnerables a intercepción en redes Wi-Fi públicas.</span>
                  </li>
                </ul>
              </div>

              {/* Tarjeta DESPUÉS */}
              <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Tras el Blindaje Total WAF</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400 font-mono">98/100</span>
                    <span className="block text-[10px] text-emerald-300 font-bold uppercase">Grado A+ Aprobado</span>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Cierre de Puertos en Firewall:</strong> Aislamiento de accesos y configuración perimetral de Cloudflare WAF.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Cookies HttpOnly & SameSite=Strict:</strong> Blindaje total contra secuestro de sesión y robo de credenciales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span><strong>Constancia Formal de Cumplimiento:</strong> Dictamen técnico firmado con RUC 10704877850 entregado a la junta directiva.</span>
                  </li>
                </ul>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* TARJETA DEL ENTREGABLE OFICIAL: INFORME DE EJEMPLO ANONIMIZADO */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-950/40 via-[#121520] to-purple-950/40 border border-[#38bdf8]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="space-y-3 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#38bdf8] text-xs font-semibold">
            <FileText className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Muestra Tangible del Entregable</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ¿Qué recibes exactamente por tu inversión?
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Nada de informes teóricos de 80 páginas. Te entregamos un <strong>Dictamen Técnico Ejecutivo de 2 páginas</strong> con membrete institucional, RUC 10704877850, telemetría de 6 cabeceras críticas, diagnóstico de SSL, sondeo de puertos y <strong>la receta de código lista para copiar y pegar</strong> (Nginx, Apache o Cloudflare).
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 pt-1">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Membrete Oficial
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Receta de Código
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Válido para Gerencia
            </span>
          </div>
        </div>

        {/* Botones de acción hacia el informe ejemplo */}
        <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto shrink-0">
          <Link
            href="/defensati/informe-ejemplo"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold text-xs sm:text-sm transition-all shadow-[0_10px_30px_rgba(0,113,227,0.35)] active:scale-95 text-center"
          >
            <Eye className="w-4 h-4" />
            <span>Ver Informe de Ejemplo Interactivo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex justify-center">
            <RealThreatCasesModal />
          </div>
        </div>

      </div>

    </section>
  );
}
