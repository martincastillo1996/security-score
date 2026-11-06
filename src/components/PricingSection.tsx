'use client';

import React from 'react';
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

interface Props {
  targetUrl?: string;
  score?: number;
  grade?: string;
}

export default function PricingSection({ targetUrl, score, grade }: Props) {
  const { t } = useI18n();
  const cleanUrl = targetUrl ? targetUrl.replace(/^https?:\/\//i, '').replace(/\/.*$/, '') : '';

  const getPlanWhatsAppUrl = (planName: string, pricePen: string, priceUsd: string) => {
    const message = `Hola Martín, estuve revisando mi web ${cleanUrl ? `(${cleanUrl})` : ''} en DEFENSA TI ${score ? `con nota ${score}/100 (Grado ${grade})` : ''} y quiero contratar el plan: *${planName}* (${pricePen} / ${priceUsd}). ¿Cuáles son los pasos para empezar?`;
    return `https://wa.me/17856433991?text=${encodeURIComponent(message)}`;
  };

  const plans = [
    {
      name: 'Auditoría',
      tag: 'Diagnóstico Externo',
      pricePen: 'S/ 65',
      priceUsd: '$19',
      badge: 'Entrega en 48 horas',
      highlight: false,
      description: 'Auditoría perimetral completa. Ideal como diagnóstico inicial.',
      features: [
        'Diagnóstico externo no intrusivo (SSL, cabeceras, exposición pública)',
        'Informe técnico con prioridades de negocio en 48 horas laborables',
        'Checklist de cabeceras pendientes (OWASP)',
        'Sin acceso a tus servidores ni contraseñas (Cero riesgo)',
      ],
      ctaText: 'Pedir Auditoría - S/ 65',
      popular: false,
    },
    {
      name: 'Blindaje Esencial',
      tag: 'Corrección de Configuración',
      pricePen: 'S/ 165',
      priceUsd: '$49',
      badge: 'Plazo: 3 a 5 días',
      highlight: true,
      description: 'Precio total cerrado. Ya incluye la Auditoría previa y remediación directa.',
      features: [
        'Todo lo incluido en la Auditoría previa',
        'Corrección de fallas críticas y medias de configuración web',
        'Implementación estricta de cabeceras de seguridad (HSTS, CSP, X-Frame)',
        'Actualización segura de CMS, temas y plugins (WordPress, Shopify, etc.)',
        'Endurecimiento de accesos y políticas de credenciales administrativas',
      ],
      ctaText: 'Pedir Blindaje Esencial - S/ 165',
      popular: true,
    },
    {
      name: 'Blindaje Total',
      tag: 'Protección y Re-medición',
      pricePen: 'S/ 335',
      priceUsd: '$99',
      badge: 'Plazo: 5 a 7 días',
      highlight: false,
      description: 'Precio total cerrado. Auditoría + Blindaje Esencial + WAF y meta Grado A.',
      features: [
        'Todo lo del plan Blindaje Esencial',
        'Configuración perimetral de WAF (Cloudflare / servidor) contra bots y ataques',
        'Re-medición técnica independiente post-implementación con reporte final',
        'Meta: llevar tu web a Grado A en la evaluación técnica acordada',
        'Garantía de servicio técnico delimitada conforme a términos legales',
      ],
      ctaText: 'Pedir Blindaje Total - S/ 335',
      popular: false,
    },
  ];

  return (
    <section id="planes" className="space-y-8 scroll-mt-20 py-8">
      {/* Cabecera de la sección con fondo sólido para evitar colisiones visuales */}
      <div className="text-center space-y-3 max-w-2xl mx-auto p-6 sm:p-7 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#2997ff] text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" />
          {t.pricing.badge}
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
          {t.pricing.title}
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          {t.pricing.desc}
        </p>
      </div>

      {/* Grid de 3 Planes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((p, idx) => (
          <div
            key={idx}
            className={`relative rounded-[28px] p-6 sm:p-7 flex flex-col justify-between transition-all ${
              p.highlight
                ? 'bg-gradient-to-b from-blue-600/15 via-[#0c0d10] to-[#0c0d10] border-2 border-[#0071e3] shadow-[0_20px_50px_rgba(0,113,227,0.3)] scale-[1.02]'
                : 'bg-[#0c0d10] border border-white/10 hover:border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-[#0071e3] text-white font-bold text-[10px] tracking-wide uppercase shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Recomendado
              </span>
            )}

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                  {p.tag}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight mt-0.5">{p.name}</h3>
                <p className="text-xs text-neutral-300 mt-2 leading-relaxed">{p.description}</p>
              </div>

              {/* Precios (Soles principal, USD secundario) */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-white">{p.pricePen}</span>
                  <span className="text-xs text-neutral-400 font-medium">PEN pago único</span>
                </div>
                <div className="text-[12px] text-[#38bdf8] font-semibold mt-0.5 flex items-center gap-1.5">
                  <span>o aprox. {p.priceUsd} USD</span>
                  <span className="text-[10px] text-neutral-500 font-normal">| Facturación local / internacional</span>
                </div>
                <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-neutral-300 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {p.badge}
                </div>
              </div>

              {/* Lista de características */}
              <ul className="space-y-2.5 pt-3 border-t border-white/5 text-xs text-neutral-200">
                {p.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botón de acción */}
            <div className="pt-6">
              <a
                href={getPlanWhatsAppUrl(p.name, p.pricePen, p.priceUsd)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-md ${
                  p.highlight
                    ? 'bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-blue-500/30'
                    : 'bg-white/10 hover:bg-white/15 text-white'
                }`}
              >
                <span>{p.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="block text-center text-[10px] text-neutral-400 mt-2">
                Coordinación directa por WhatsApp personal
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Aviso de Garantía y Términos */}
      <div className="text-center pt-2">
        <p className="text-xs text-neutral-400">
          * La garantía de servicio y condiciones de soporte se rigen conforme a nuestros{' '}
          <a href="/terminos#garantia" className="text-[#38bdf8] hover:underline font-medium">
            Términos y Condiciones del Servicio
          </a>.
        </p>
      </div>
    </section>
  );
}
