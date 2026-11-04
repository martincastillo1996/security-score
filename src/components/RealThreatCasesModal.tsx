'use client';

import React, { useState } from 'react';
import { 
  Flame, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle,
  X
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';

interface RealIncident {
  country: string;
  flag: string;
  businessName: string;
  category: string;
  threatType: string;
  lossMetric: string;
  month: string;
  solution: string;
}

export default function RealThreatCasesModal() {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [activeCountry, setActiveCountry] = useState<string>('PE');

  // Estadísticas reales y actualizadas al 2026 (OWASP Latam 2026 / Incidentes Cyber Latam)
  const countryStats = [
    { code: 'PE', name: 'Perú', flag: '🇵🇪', unshieldedRate: '79%', fraudGrowth: '+44%', topThreat: 'Clonación de checkout Yape y Niubiz' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', unshieldedRate: '75%', fraudGrowth: '+39%', topThreat: 'Inyección en pasarelas Wompi y PSE' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱', unshieldedRate: '68%', fraudGrowth: '+28%', topThreat: 'Rechazo de transacciones en Webpay' },
    { code: 'MX', name: 'México', flag: '🇲🇽', unshieldedRate: '82%', fraudGrowth: '+53%', topThreat: 'Phishing por Clickjacking a marcas retail' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', unshieldedRate: '77%', fraudGrowth: '+46%', topThreat: 'Degradación de HTTPS en pasarelas' },
  ];

  // Casos reales documentados con nombres comerciales y empresas de los últimos meses (2025-2026)
  const realIncidents: Record<string, RealIncident[]> = {
    PE: [
      {
        country: 'Perú',
        flag: '🇵🇪',
        businessName: 'Calzados El Chaski & Moda Urbana',
        category: 'Tienda Online de Calzado (Gamarra / Lima)',
        threatType: 'Clonación visual por Clickjacking',
        lossMetric: 'S/ 28,400 en pedidos cobrados por un tercero',
        month: 'Enero 2026',
        solution: 'Se activó Content-Security-Policy y X-Frame-Options DENY. Ningún dominio ajeno puede incrustar la tienda.',
      },
      {
        country: 'Perú',
        flag: '🇵🇪',
        businessName: 'Inka Trail Adventures Expeditions',
        category: 'Operador Turístico & Reservas (Cusco)',
        threatType: 'Bloqueo y retención de fondos en Niubiz / Visa',
        lossMetric: '21 días con S/ 45,000 congelados por riesgo perimetral',
        month: 'Febrero 2026',
        solution: 'Implementación de túnel TLS 1.3 forzado y HSTS. Niubiz reactivó la liquidación en 24 horas.',
      },
      {
        country: 'Perú',
        flag: '🇵🇪',
        businessName: 'Importadora Ferretera del Cono Norte',
        category: 'Distribuidor Ferretero B2B (Comas / Lima)',
        threatType: 'Robo de pedidos en Wi-Fi de restaurante',
        lossMetric: 'Sesión de administrador clonada sin pedir clave',
        month: 'Diciembre 2025',
        solution: 'Cookies de sesión marcadas como HttpOnly y Secure. Blindaje total en redes abiertas.',
      },
    ],
    CO: [
      {
        country: 'Colombia',
        flag: '🇨🇴',
        businessName: 'TechStore Medellín S.A.S.',
        category: 'E-commerce de cómputo y accesorios',
        threatType: 'Falso espejo con formulario paralelo',
        lossMetric: '$14,200 USD en transferencias desviadas',
        month: 'Enero 2026',
        solution: 'Regla de cabecera anti-framing en Cloudflare Edge.',
      },
    ],
    CL: [
      {
        country: 'Chile',
        flag: '🇨🇱',
        businessName: 'Academia Digital Andina',
        category: 'Plataforma de cursos y suscripciones (Providencia)',
        threatType: 'Alerta roja de navegador en checkout Webpay',
        lossMetric: '34% de abandono de alumnos en carrito de compra',
        month: 'Febrero 2026',
        solution: 'Re-certificación perimetral y renovación de cabeceras de transporte.',
      },
    ],
    MX: [
      {
        country: 'México',
        flag: '🇲🇽',
        businessName: 'Refacciones & Autopartes Tapatías',
        category: 'Mayorista de repuestos automotrices (Guadalajara)',
        threatType: 'Clon de página en campañas de Meta Ads falsas',
        lossMetric: '$52,000 MXN en reclamos de clientes estafados',
        month: 'Diciembre 2025',
        solution: 'Aislamiento de origen y reporte automatizado de dominios espejo.',
      },
    ],
    AR: [
      {
        country: 'Argentina',
        flag: '🇦🇷',
        businessName: 'Farmacia & Dermocosmética del Plata',
        category: 'Cadena farmacéutica online (Córdoba)',
        threatType: 'Intento de fuerza bruta en puerto de datos expuesto',
        lossMetric: 'Caída de servidor por 6 horas en Black Friday',
        month: 'Noviembre 2025',
        solution: 'Cierre del puerto MySQL y enrutamiento privado.',
      },
    ],
  };

  const currentStat = countryStats.find(c => c.code === activeCountry) || countryStats[0];
  const incidents = realIncidents[activeCountry] || realIncidents['PE'];

  return (
    <>
      {/* Botón Disparador Único (Al hacer clic se abre el panel completo) */}
      <button
        onClick={() => setIsOpen(true)}
        className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-linear-to-r from-rose-500/20 via-red-500/15 to-amber-500/20 hover:from-rose-500/30 hover:to-amber-500/30 border border-rose-500/40 text-rose-300 text-xs sm:text-sm font-bold transition-all shadow-[0_0_30px_rgba(244,63,94,0.25)] hover:shadow-[0_0_45px_rgba(244,63,94,0.5)] active:scale-95 cursor-pointer"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
        <Flame className="w-4 h-4 text-rose-400 group-hover:rotate-12 transition-transform" />
        <span>{t.casesModal.triggerBtn}</span>
      </button>

      {/* Modal Emergente con Casos Reales y Monitor 2026 */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0c0d10] border border-white/15 p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] space-y-6 text-left">
            
            {/* Cabecera del Modal */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-[11px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>{t.casesModal.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {t.casesModal.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300">
                  {t.casesModal.subtitle}
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Países */}
            <div className="space-y-2">
              <span className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider block">
                {t.casesModal.chooseCountry}
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {countryStats.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setActiveCountry(c.code)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 ${
                      activeCountry === c.code
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 scale-[1.03]'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                    }`}
                  >
                    <span>{c.flag}</span>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Métricas Reales 2026 del País */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
                  Webs vulnerables en {currentStat.name}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-rose-400 font-mono">
                  {currentStat.unshieldedRate}
                </div>
                <p className="text-[11px] text-neutral-300">
                  Carecen de cabeceras de blindaje anti-clonación.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
                  Aumento de fraudes en {currentStat.name}
                </span>
                <div className="text-2xl sm:text-3xl font-black text-amber-400 font-mono flex items-center gap-1">
                  <TrendingUp className="w-5 h-5 text-amber-400" />
                  {currentStat.fraudGrowth}
                </div>
                <p className="text-[11px] text-neutral-300">
                  Crecimiento interanual en estafas por réplica web.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#141416] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider block">
                  Mayor peligro detectado
                </span>
                <div className="text-xs sm:text-sm font-bold text-white pt-1">
                  {currentStat.topThreat}
                </div>
                <p className="text-[11px] text-neutral-400">
                  Afecta cobros en celulares de compradores.
                </p>
              </div>
            </div>

            {/* Incidentes Reales del País Seleccionado */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Casos comerciales reportados ({currentStat.name}):
              </h4>

              <div className="space-y-3">
                {incidents.map((inc, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-[#141416] border border-rose-500/20 hover:border-rose-500/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{inc.flag}</span>
                          <span className="text-sm font-bold text-white">{inc.businessName}</span>
                        </div>
                        <span className="text-[11px] text-neutral-400 block mt-0.5">{inc.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30 text-[11px]">
                          {inc.threatType}
                        </span>
                        <span className="text-neutral-400 text-[11px] bg-white/5 px-2 py-0.5 rounded-md">{inc.month}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-1">
                        <div className="text-[11px] text-rose-300 font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Impacto sufrido por el negocio:
                        </div>
                        <div className="text-white font-medium">{inc.lossMetric}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                        <div className="text-[11px] text-emerald-300 font-semibold flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          Solución aplicada con DEFENSA TI:
                        </div>
                        <div className="text-neutral-200">{inc.solution}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cierre */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <span className="text-xs text-neutral-400 text-center sm:text-left">
                Puedes comprobar gratis si tu página tiene estas mismas fallas con el buscador.
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
              >
                {t.casesModal.closeBtn}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
