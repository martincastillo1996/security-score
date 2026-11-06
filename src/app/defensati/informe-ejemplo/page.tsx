'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { 
  ShieldCheck, 
  ArrowLeft, 
  FileText, 
  CheckCircle2,
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function InformeEjemploPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      {/* Fondo estelar limpio sin etiquetas de dominios atravesadas */}
      <NeuralBackground showDomains={false} />

      {/* Cabecera */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/defensati" className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a DEFENSA TI</span>
          </Link>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold tracking-wider">
            <span>MODELO DE MUESTRA PARA GERENCIA</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10 space-y-8">
        
        {/* Banner de Orientación para el Empresario */}
        <div className="p-6 rounded-3xl bg-linear-to-r from-blue-900/20 via-[#141416] to-emerald-950/20 border border-white/10 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            <ShieldCheck className="w-4 h-4" />
            <span>¿Qué es este documento y por qué le interesa a tu empresa?</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Así es el Informe Técnico y Comercial que recibes en 48 horas
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            No te entregamos tecnicismos incomprensibles ni 50 páginas de relleno. Este es un <strong>diagnóstico de decisión ejecutiva</strong>: identifica exactamente en qué punto tu web pierde ventas, expone datos de clientes o corre riesgo de clonación de pasarelas (Yape/Niubiz), y te da la solución puntual en Soles (PEN).
          </p>
        </div>

        {/* Portada del Informe Simulado */}
        <div className="p-6 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl">
          
          {/* Encabezado del dictamen */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>DICTAMEN TÉCNICO OFICIAL DEFENSA TI</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Auditoría Perimetral y de Riesgo Comercial
              </h2>
              <p className="text-xs text-neutral-400 mt-1 font-mono">
                Empresa analizada: <strong>distribuidora-textil-demo.pe</strong> (Caso Modelo)
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1 text-xs text-neutral-400 font-mono">
              <span>Entrega: <strong>48 Horas Laborables</strong></span>
              <span>Auditor: <strong>Martín Castillo</strong></span>
              <span>RUC: <strong>{siteConfig.business.ruc}</strong> (Lima, Perú)</span>
              <span className="text-emerald-400 font-semibold mt-0.5">✓ Validez ante SUNAT / Comprobante Electrónico</span>
            </div>
          </div>

          {/* Métricas Visuales de Impacto Empresarial */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Calificación Inicial</span>
              <span className="text-4xl sm:text-5xl font-black text-amber-400 my-1.5">Grado C</span>
              <span className="text-[11px] text-amber-300/90 font-medium">Vulnerable a clonación de pasarela</span>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Cifrado de Clientes</span>
              <span className="text-4xl sm:text-5xl font-black text-emerald-400 my-1.5">TLS 1.3</span>
              <span className="text-[11px] text-emerald-300/90 font-medium">Canal activo y seguro</span>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/20 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Impacto Económico en Riesgo</span>
              <span className="text-4xl sm:text-5xl font-black text-rose-400 my-1.5">Alto</span>
              <span className="text-[11px] text-rose-300/90 font-medium">Robo de pedidos en Wi-Fi abierta</span>
            </div>
          </div>

          {/* Hallazgos traducidos a Lenguaje de Negocio */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#38bdf8]" />
                <span>3 Hallazgos Críticos Detectados y su Impacto en Ventas</span>
              </h3>
              <span className="text-xs text-neutral-400 hidden sm:inline">Explicado sin jerga innecesaria</span>
            </div>

            <div className="space-y-3">
              {/* Fallo 1 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-rose-200 text-xs sm:text-sm">
                    1. Tu tienda o web puede ser incrustada en páginas clonadas (Falta de X-Frame-Options)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold uppercase">
                    Peligro Crítico
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Impacto en el Negocio:</strong> Un ciberdelincuente puede crear un dominio similar y meter tu web en un marco invisible. Cuando el cliente hace clic en tu botón de pago o WhatsApp, el dinero o el pedido se desvían a la cuenta del atacante.
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/20 text-[11px] text-emerald-400 font-medium">
                  ✓ Solución con DEFENSA TI: Inyectamos directivas de bloqueo perimetral. Nadie fuera de tu dominio puede replicar tu web.
                </div>
              </div>

              {/* Fallo 2 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-amber-200 text-xs sm:text-sm">
                    2. Conexión desprotegida en redes públicas de restaurantes y hoteles (Falta de HSTS)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase">
                    Riesgo Comercial
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Impacto en el Negocio:</strong> Si un comprador o administrador de tu empresa se conecta desde una cafetería o feria comercial, un tercero en la misma red Wi-Fi puede degradar la conexión y espiar las compras o pedidos en trámite.
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-emerald-400 font-medium">
                  ✓ Solución con DEFENSA TI: Forzado de túnel cifrado permanente HSTS con precarga de 1 año.
                </div>
              </div>

              {/* Fallo 3 */}
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-500/10 border border-sky-500/25 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-sky-200 text-xs sm:text-sm">
                    3. Visibilidad de tu versión de CMS a ojos de robots atacantes (Server Tokens Expuestos)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 font-mono text-[10px] font-bold uppercase">
                    Alerta Preventiva
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white">Impacto en el Negocio:</strong> Los atacantes usan bots automáticos buscando tiendas con versiones antiguas. Si dejas expuesta la versión exacta de tu servidor o plugins, te conviertes en un blanco fácil en listas de ataque masivo.
                </p>
                <div className="p-2.5 rounded-xl bg-black/40 border border-sky-500/20 text-[11px] text-emerald-400 font-medium">
                  ✓ Solución con DEFENSA TI: Ocultamiento perimetral de cabeceras de servidor e insensibilización de versiones.
                </div>
              </div>
            </div>
          </div>

          {/* Cuadro de Retorno de Inversión (ROI) */}
          <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>Por qué esta Auditoría te ahorra miles de Soles</span>
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              En el Perú, una sola retención de fondos por riesgo perimetral en pasarelas como Niubiz o Culqi inmoviliza capital de trabajo durante 15 a 30 días, y una queja ante INDECOPI por fuga de datos acarrea sanciones que superan las 5 UIT. 
              Por solo <strong>S/ 65 PEN</strong> obtienes la radiografía completa, y por <strong>S/ 165 o S/ 335</strong> dejas tu web completamente blindada.
            </p>
          </div>

          {/* Botones de Acción: WhatsApp en Verde Oficial */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              href="/defensati"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-500/25 text-center flex items-center justify-center gap-2"
            >
              <span>Pedir Auditoría para mi Web (S/ 65)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, revisé el informe de ejemplo de DEFENSA TI y quiero consultar sobre la auditoría y blindaje para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

        </div>
      </main>
    </div>
  );
}
