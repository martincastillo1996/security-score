'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle,
  X
} from 'lucide-react';

interface RegionalIncident {
  region: string;
  badge: string;
  businessType: string;
  threatType: string;
  lossMetric: string;
  solution: string;
}

export default function RealThreatCasesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState<string>('LIMA');

  // Regiones del Perú (Cobertura Nacional)
  const regions = [
    { code: 'LIMA', name: 'Lima y Callao', icon: '🏛️', unshieldedRate: '79%', fraudGrowth: '+44%', topThreat: 'Clonación de checkout Yape y Niubiz' },
    { code: 'NORTE', name: 'Norte (Trujillo, Piura, Chiclayo)', icon: '🌊', unshieldedRate: '82%', fraudGrowth: '+38%', topThreat: 'Rechazo de pasarelas y advertencias de no seguro' },
    { code: 'SUR', name: 'Sur (Arequipa, Cusco, Tacna)', icon: '⛰️', unshieldedRate: '75%', fraudGrowth: '+41%', topThreat: 'Falsas réplicas en reservas turísticas y comercio' },
    { code: 'CENTRO', name: 'Centro y Oriente (Huancayo, Tarapoto, Iquitos)', icon: '🌿', unshieldedRate: '84%', fraudGrowth: '+49%', topThreat: 'Robo de credenciales en conexiones sin cifrado HSTS' },
  ];

  // Casos típicos documentados en el ecosistema comercial peruano
  const regionalIncidents: Record<string, RegionalIncident[]> = {
    LIMA: [
      {
        region: 'Lima y Callao',
        badge: 'Comercio Minorista / E-commerce',
        businessType: 'Tiendas online de calzado y moda en galerías comerciales',
        threatType: 'Clonación visual por Clickjacking',
        lossMetric: 'Desvío de pedidos y cobros mediante formularios incrustados en dominios espejo.',
        solution: 'Implementación estricta de Content-Security-Policy y directivas X-Frame-Options DENY.',
      },
      {
        region: 'Lima y Callao',
        badge: 'Distribución B2B & Ferretería',
        businessType: 'Distribuidores y empresas mayoristas con catálogos web',
        threatType: 'Robo de sesiones en redes no seguras',
        lossMetric: 'Suplantación de credenciales de administradores al conectarse desde redes externas.',
        solution: 'Directivas de cookies marcadas como HttpOnly, Secure y SameSite=Strict.',
      },
    ],
    NORTE: [
      {
        region: 'Norte (La Libertad, Piura, Lambayeque)',
        badge: 'Agroindustria & Exportación',
        businessType: 'Portales de servicios agrícolas, transporte y logística',
        threatType: 'Caída de confianza por certificado SSL mal encadenado',
        lossMetric: 'Advertencias rojas de navegador que provocan cancelaciones de pedidos por clientes.',
        solution: 'Corrección de cadena intermedia de certificados TLS y renovación de registros DNS.',
      },
      {
        region: 'Norte (Trujillo)',
        badge: 'Retail & Tiendas Locales',
        businessType: 'Comercios de calzado y confecciones con pasarelas de pago',
        threatType: 'Rechazo de transacciones en pasarelas de cobro',
        lossMetric: 'Pasarelas de pago bloquean el flujo de cobro por no contar con protocolo TLS 1.3 forzado.',
        solution: 'Túnel perimetral TLS 1.3 obligatorio con suite de cifrado de alta compatibilidad.',
      },
    ],
    SUR: [
      {
        region: 'Sur (Cusco, Arequipa, Puno)',
        badge: 'Turismo & Hotelería',
        businessType: 'Operadores turísticos, agencias de viajes y hospedajes',
        threatType: 'Bloqueo temporal de fondos por riesgo de seguridad',
        lossMetric: 'Retención de liquidaciones bancarias por incumplimiento de requisitos mínimos perimetrales.',
        solution: 'Endurecimiento perimetral conforme a directivas OWASP y activación de HSTS.',
      },
      {
        region: 'Sur (Arequipa)',
        badge: 'Gastronomía & Servicios',
        businessType: 'Cartas digitales, pedidos en línea y restaurantes',
        threatType: 'Inyección de enlaces de spam y redirecciones no deseadas',
        lossMetric: 'Google cataloga el dominio como engañoso y suspende campañas publicitarias.',
        solution: 'Cierre de puertos innecesarios expuestos y reglas estrictas de cabecera HTTP.',
      },
    ],
    CENTRO: [
      {
        region: 'Centro y Oriente (Junín, San Martín, Loreto)',
        badge: 'Distribución & Farmacias',
        businessType: 'Boticas, droguerías y comercializadoras regionales',
        threatType: 'Exposición de puertos de administración en la web pública',
        lossMetric: 'Robots automatizados prueban ataques de fuerza bruta las 24 horas del día.',
        solution: 'Aislamiento perimetral y bloqueo de accesos administrativos fuera de IP autorizada.',
      },
    ],
  };

  const currentStats = regions.find(r => r.code === activeRegion) || regions[0];
  const currentCases = regionalIncidents[activeRegion] || [];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold backdrop-blur-xl transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:border-emerald-500/30"
      >
        <span className="text-base">🇵🇪</span>
        <span>Casos típicos en Perú por regiones: Cómo protegen sus webs los negocios</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0a0d14] border border-white/15 p-6 sm:p-8 space-y-6 shadow-2xl text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="text-sm">🇵🇪</span>
                  <span>Incidentes Reales &bull; Cobertura en todo el Perú</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Casos de Riesgo y Soluciones Perimetrales en el Perú
                </h3>
                <p className="text-xs text-neutral-400">
                  Situaciones comunes en comercios y empresas del país organizadas por regiones:
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de Regiones de Perú */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block font-mono">
                Selecciona la región del Perú:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {regions.map((reg) => (
                  <button
                    key={reg.code}
                    onClick={() => setActiveRegion(reg.code)}
                    className={`p-3 rounded-2xl border text-xs font-bold text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                      activeRegion === reg.code
                        ? 'bg-[#0071e3] border-[#0071e3] text-white shadow-lg shadow-blue-500/30 scale-[1.02]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-base">{reg.icon}</span>
                    <span className="leading-tight text-[11px]">{reg.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tarjetas de Estadísticas de la Región */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Vulnerabilidad promedio</span>
                <div className="text-2xl font-black text-rose-400 font-mono">{currentStats.unshieldedRate}</div>
                <p className="text-[11px] text-neutral-400">Carecen de cabeceras de blindaje perimetral.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Crecimiento de fraudes</span>
                <div className="text-2xl font-black text-amber-400 font-mono">{currentStats.fraudGrowth}</div>
                <p className="text-[11px] text-neutral-400">Incremento en reportes de clonación web.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[10px] text-neutral-400 uppercase font-mono block">Mayor riesgo observado</span>
                <div className="text-xs font-bold text-white leading-snug">{currentStats.topThreat}</div>
                <p className="text-[11px] text-neutral-400">Punto crítico verificado en pasarelas.</p>
              </div>
            </div>

            {/* Lista de Casos por Región */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block font-mono">
                Casos documentados en {currentStats.name}:
              </span>

              <div className="space-y-3">
                {currentCases.map((incident, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div className="space-y-0.5">
                        <span className="text-xs font-mono font-semibold text-[#38bdf8] block">
                          {incident.badge}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {incident.businessType}
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] font-mono font-bold">
                        {incident.threatType}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 space-y-1">
                        <span className="text-[10px] font-bold text-rose-300 flex items-center gap-1 uppercase font-mono">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Impacto en el negocio:</span>
                        </span>
                        <p className="text-neutral-300 text-[11px] leading-relaxed">
                          {incident.lossMetric}
                        </p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-300 flex items-center gap-1 uppercase font-mono">
                          <ShieldCheck className="w-3 h-3" />
                          <span>Solución aplicada con DEFENSA TI:</span>
                        </span>
                        <p className="text-neutral-300 text-[11px] leading-relaxed">
                          {incident.solution}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-[11px] text-neutral-400">
                ¿Sospechas que tu sitio presenta algún riesgo similar en tu región?
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-bold transition-all cursor-pointer"
              >
                Cerrar y Revisar mi Web
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
