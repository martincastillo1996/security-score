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
      name: 'Dictamen Técnico & Receta de Código',
      tag: 'Para Empresas con Informático Propio',
      pricePen: 'S/ 65',
      priceUsd: '$19',
      badge: 'Entrega en 48 horas laborables',
      highlight: false,
      description: 'Revisión exhaustiva externa. Informe formal firmado con membrete, RUC y boleta/factura, más el código exacto listo para aplicar.',
      features: [
        'Diagnóstico perimetral profundo sin tocar tu servidor (Cero riesgo)',
        'Informe técnico formal firmado con membrete institucional y RUC',
        'Receta de código lista para copiar y pegar (Nginx, Apache o Cloudflare)',
        'Emisión inmediata de Boleta de Venta o Factura Electrónica',
        'Checklist prioritario para que tu equipo corrija las fallas en horas',
      ],
      ctaText: 'Pedir Dictamen Técnico - S/ 65',
      popular: false,
    },
    {
      name: 'Blindaje Llave en Mano',
      tag: 'Nosotros lo Arreglamos por Ti',
      pricePen: 'S/ 165',
      priceUsd: '$49',
      badge: 'Plazo: 3 a 5 días',
      highlight: true,
      description: 'El plan recomendado. Con acceso temporal nos encargamos de todo el trabajo técnico. Tú y tu empresa no mueven un solo dedo.',
      features: [
        'Todo lo incluido en el Dictamen Técnico previo',
        'Implementación directa de cabeceras de seguridad (HSTS, CSP, X-Frame)',
        'Blindaje anti-clonación de formularios y pasarelas (Yape, Niubiz, Culqi)',
        'Ocultamiento perimetral de versiones para frenar escaneos de robots',
        'Actualización segura de CMS, temas y plugins en plataformas estándar',
        'Endurecimiento de accesos y cierre seguro de entrega',
      ],
      ctaText: 'Pedir Blindaje Llave en Mano - S/ 165',
      popular: true,
    },
    {
      name: 'Blindaje Total WAF + Certificación Grado A',
      tag: 'Protección Avanzada & Anti-Ataques',
      pricePen: 'S/ 335',
      priceUsd: '$99',
      badge: 'Plazo: 5 a 7 días',
      highlight: false,
      description: 'Para e-commerce y empresas de alto tráfico. Auditoría + remediación + WAF perimetral activo, blindaje anti-bots y meta técnica Grado A.',
      features: [
        'Todo lo del plan Blindaje Llave en Mano',
        'Configuración avanzada de WAF (Cloudflare / servidor) contra ataques web',
        'Reglas de Rate Limiting y bloqueo de bots automatizados sospechosos',
        'Re-escaneo y remediación continua hasta alcanzar meta técnica Grado A (90-100 pts)',
        'Certificado formal de cumplimiento perimetral y entrega de directivas',
      ],
      ctaText: 'Pedir Blindaje Total WAF - S/ 335',
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
