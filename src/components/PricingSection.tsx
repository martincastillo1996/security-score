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

  const getPlanWhatsAppUrl = (planName: string, pricePen: string) => {
    const message = `Hola Martín, estuve revisando mi web ${cleanUrl ? `(${cleanUrl})` : ''} en DEFENSA TI ${score ? `con nota ${score}/100 (Grado ${grade})` : ''} y quiero contratar el plan: *${planName}* (${pricePen}). ¿Cuáles son los pasos para empezar?`;
    return `https://wa.me/17856433991?text=${encodeURIComponent(message)}`;
  };

  const plans = [
    {
      name: 'Dictamen Técnico & Receta de Código',
      tag: 'Promoción de Lanzamiento',
      originalPrice: 'S/. 65',
      pricePen: 'GRATIS',
      badge: 'Entrega: Inmediata en pantalla',
      highlight: false,
      isFree: true,
      description: 'Revisión perimetral profunda al instante. Informe formal descargable con membrete, estado de cabeceras y código listo para aplicar.',
      features: [
        'Diagnóstico perimetral profundo sin tocar tu servidor (Cero riesgo)',
        'Informe técnico formal descargable con membrete y RUC',
        'Receta de código lista para copiar y pegar (Nginx, Apache o Cloudflare)',
        'Checklist prioritario para que tu equipo corrija las fallas en minutos',
        'Acceso 100% libre sin registro de tarjetas ni contraseñas',
      ],
      ctaAction: 'Escanear Web Gratis',
      popular: false,
      footerNote: 'Acceso libre sin registro de tarjetas',
    },
    {
      name: 'Blindaje Llave en Mano',
      tag: 'Nosotros lo Arreglamos por Ti',
      originalPrice: '',
      pricePen: 'S/. 165',
      badge: 'Plazo: 3 a 5 días',
      highlight: true,
      isFree: false,
      description: 'El plan recomendado. Con acceso temporal nos encargamos de todo el trabajo técnico. Tú y tu empresa no mueven un solo dedo.',
      features: [
        'Todo lo incluido en el Dictamen Técnico previo',
        'Implementación directa de cabeceras de seguridad (HSTS, CSP, X-Frame)',
        'Blindaje anti-clonación de formularios y pasarelas (Yape, Niubiz, Culqi)',
        'Ocultamiento perimetral de versiones para frenar escaneos de robots',
        'Actualización segura de CMS, temas y plugins en plataformas estándar',
        'Endurecimiento de accesos y cierre seguro de entrega',
      ],
      ctaAction: 'Pedir Blindaje Llave en Mano',
      popular: true,
      footerNote: 'Coordinación directa por WhatsApp personal',
    },
    {
      name: 'Blindaje Total WAF + Certificación Grado A',
      tag: 'Protección Avanzada & Anti-Ataques',
      originalPrice: '',
      pricePen: 'S/. 335',
      badge: 'Plazo: 5 a 7 días',
      highlight: false,
      isFree: false,
      description: 'Para e-commerce y empresas de alto tráfico. Auditoría + remediación + WAF perimetral activo, blindaje anti-bots y meta técnica Grado A.',
      features: [
        'Todo lo del plan Blindaje Llave en Mano',
        'Configuración avanzada de WAF (Cloudflare / servidor) contra ataques web',
        'Reglas de Rate Limiting y bloqueo de bots automatizados sospechosos',
        'Re-escaneo y remediación continua hasta alcanzar meta técnica Grado A (90-100 pts)',
        'Certificado formal de cumplimiento perimetral y entrega de directivas',
      ],
      ctaAction: 'Pedir Blindaje Total WAF',
      popular: false,
      footerNote: 'Coordinación directa por WhatsApp personal',
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
            className={`relative rounded-[28px] p-5 sm:p-7 flex flex-col justify-between transition-all ${
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

              {/* Precios (Exclusivo en Soles para Perú) */}
              <div className="pt-2 border-t border-white/10">
                <div className="flex items-baseline justify-between gap-2">
                  {p.isFree ? (
                    <div className="flex items-baseline gap-2 shrink-0">
                      <span className="text-lg sm:text-xl font-bold text-neutral-500 line-through decoration-rose-500 decoration-2">
                        {p.originalPrice}
                      </span>
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                        GRATIS
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      {p.pricePen}
                    </span>
                  )}
                  <span className="text-xs text-neutral-400 font-medium text-right shrink-0">
                    {p.isFree ? 'Sin costo' : 'Pago único'}
                  </span>
                </div>
                <div className="text-[12px] text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                  <span>{p.isFree ? 'Diagnóstico al instante sin costo' : 'Constancia y entrega técnica garantizada'}</span>
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
              {p.isFree ? (
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('url-scan-input') || document.querySelector('input[type="text"]');
                    if (input) {
                      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      (input as HTMLInputElement).focus();
                    } else {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-3.5 px-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer active:scale-95 shadow-md bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-emerald-500/25"
                >
                  <span className="text-left font-bold">{p.ctaAction}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-black/25 text-white">
                      GRATIS
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </button>
              ) : (
                <a
                  href={getPlanWhatsAppUrl(p.name, p.pricePen)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-3 px-3.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-between gap-2 transition-all cursor-pointer active:scale-95 shadow-md ${
                    p.highlight
                      ? 'bg-[#0071e3] hover:bg-[#0077ed] text-white shadow-blue-500/30'
                      : 'bg-white/10 hover:bg-white/15 text-white'
                  }`}
                >
                  <span className="text-left font-bold">{p.ctaAction}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`px-2 py-0.5 rounded-lg text-xs font-black whitespace-nowrap ${
                      p.highlight ? 'bg-black/25 text-white' : 'bg-white/10 text-white'
                    }`}>
                      {p.pricePen}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </div>
                </a>
              )}
              <span className={`block text-center text-[10px] mt-2 font-medium ${
                p.isFree ? 'text-emerald-400 font-semibold' : 'text-neutral-400'
              }`}>
                {p.footerNote}
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
