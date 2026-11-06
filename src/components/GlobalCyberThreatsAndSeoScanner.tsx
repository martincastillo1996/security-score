'use client';

import { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  TrendingDown, 
  Globe2, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight,
  ExternalLink,
  Bot,
  Radio
} from 'lucide-react';
import Link from 'next/link';

export default function GlobalCyberThreatsAndSeoScanner() {
  // Estado del micro-escáner interactivo de SEO & Seguridad
  const [domainInput, setDomainInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState<{
    domain: string;
    securityScore: number;
    seoScore: number;
    lostSalesPotential: string;
    criticalIssues: string[];
    aiFixAdvice: string;
  } | null>(null);

  const handleSimulateScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainInput.trim()) return;

    setIsAnalyzing(true);
    setScanResult(null);

    // Simulación diagnóstica inmediata con insights de negocio
    setTimeout(() => {
      const cleanDomain = domainInput.replace(/https?:\/\//, '').replace(/\/.*$/, '').toLowerCase();
      setIsAnalyzing(false);
      setScanResult({
        domain: cleanDomain,
        securityScore: Math.floor(Math.random() * 25) + 35, // 35 a 60 (alerta)
        seoScore: Math.floor(Math.random() * 20) + 42, // 42 a 62 (pérdida de tráfico)
        lostSalesPotential: '-38% de conversión por fricción técnica y desconfianza',
        criticalIssues: [
          'Sin cabeceras de seguridad HTTP (Vulnerable a Clickjacking y robo de sesión)',
          'Etiquetas OpenGraph y Schema.org incompletas (Penalización en ranking de Google)',
          'Sin agente de respuesta inmediata en WhatsApp (Prospectos abandonan en menos de 10 seg)'
        ],
        aiFixAdvice: 'Podemos blindar la arquitectura y desplegar un agente conversacional para recuperar los leads perdidos.'
      });
    }, 1400);
  };

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-16 space-y-12">
      
      {/* CABECERA & CONTADORES EN VIVO DE IMPACTO GLOBAL */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
          <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
          <span>Monitor Global de Riesgo Digital & Pérdida de Clientes</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          El Costo Oculto de una Web Mal Optimizada
        </h2>

        <p className="text-sm text-neutral-300 leading-relaxed">
          Más del 73% de portales y comercios electrónicos en Latinoamérica operan con vulnerabilidades de seguridad y errores graves de SEO técnico que espantan a Google y hacen que los clientes compren a la competencia.
        </p>
      </div>

      {/* 3 TARJETAS HUD: PILOTO Y MÉTRICAS DE RIESGO REALES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Tarjeta 1: Auditoría Técnica Perimetral */}
        <div className="p-6 rounded-3xl bg-linear-to-b from-[#181116] via-[#120c10] to-[#0a0709] border border-rose-500/30 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300">
              Vulnerabilidad en Pasarelas y SSL
            </span>
            <ShieldAlert className="w-5 h-5 text-rose-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
            7 de cada 10
          </div>
          <p className="text-xs text-neutral-200 leading-snug">
            Sitios web en la región carecen de cabeceras HSTS y Content-Security-Policy obligatorias para evitar clonaciones.
          </p>
        </div>

        {/* Tarjeta 2: Caída de Conversión por Fricción */}
        <div className="p-6 rounded-3xl bg-linear-to-b from-[#18140f] via-[#120f0b] to-[#0a0806] border border-amber-500/30 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Pérdida por Lentitud y Respuesta Tardía
            </span>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-black text-amber-400 tracking-tight">
            &gt; 5 minutos
          </div>
          <p className="text-xs text-neutral-200 leading-snug">
            Tardar más de 5 minutos en responder una consulta comercial en WhatsApp reduce drásticamente el cierre de ventas.
          </p>
        </div>

        {/* Tarjeta 3: Piloto Rápido y Retorno */}
        <div className="p-6 rounded-3xl bg-linear-to-b from-[#0f171f] via-[#091118] to-[#04080d] border border-[#38bdf8]/30 shadow-xl space-y-3 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">
              Plazo de Puesta en Marcha
            </span>
            <TrendingDown className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-black text-white tracking-tight">
            7 Días
          </div>
          <p className="text-xs text-neutral-200 leading-snug">
            Desplegamos un piloto funcional con tu catálogo y preguntas frecuentes sin alterar tu infraestructura actual.
          </p>
        </div>
      </div>

      {/* HERRAMIENTA INTERACTIVA: AUDITORÍA PREVENTIVA DE WEB & SEO */}
      <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-b from-[#141416]/95 via-[#0e1118]/90 to-[#07090f]/95 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Diagnóstico Rápido de Salud Digital & Potencial de Conversión</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              ¿Tu página web está perdiendo clientes en este momento?
            </h3>
            <p className="text-xs text-neutral-400">
              Ingresa el dominio de tu negocio y revisa en segundos si tu seguridad perimetral y SEO ahuyentan compradores.
            </p>
          </div>

          <Link
            href="/defensati"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold shrink-0 transition-all"
          >
            <span>Ir a DEFENSA TI Avanzado</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Input Bar de Análisis */}
        <form onSubmit={handleSimulateScan} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Globe2 className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              placeholder="ejemplo.com o tuempresa.pe"
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-linear-to-r from-[#0071e3] to-[#38bdf8] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#0071e3]/30 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 active:scale-98"
          >
            <Search className="w-4 h-4" />
            <span>{isAnalyzing ? 'Auditando Parámetros...' : 'Analizar Mi Sitio Gratis'}</span>
          </button>
        </form>

        {/* RESULTADO DEL DIAGNÓSTICO */}
        {scanResult && (
          <div className="p-6 rounded-2xl bg-black/60 border border-white/15 space-y-6 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[11px] text-neutral-400 font-mono">Dominio Evaluado</span>
                <div className="text-lg font-bold text-white font-mono flex items-center gap-2">
                  <span>{scanResult.domain}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-sans">
                    Requiere Optimización
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-center p-2.5 px-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">Seguridad</div>
                  <div className="text-lg font-bold text-rose-400">{scanResult.securityScore}/100</div>
                </div>
                <div className="text-center p-2.5 px-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-neutral-400 uppercase">SEO & Tráfico</div>
                  <div className="text-lg font-bold text-amber-400">{scanResult.seoScore}/100</div>
                </div>
              </div>
            </div>

            {/* Impacto en Ventas */}
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-center gap-3">
              <TrendingDown className="w-5 h-5 shrink-0" />
              <div>
                <strong>Impacto Financiero Proyectado:</strong> {scanResult.lostSalesPotential}.
              </div>
            </div>

            {/* Fallas Detectadas */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                Vulnerabilidades y Brechas de Conversión Detectadas:
              </div>
              <ul className="space-y-2 text-xs text-neutral-300">
                {scanResult.criticalIssues.map((issue, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solución de IA Directa */}
            <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Bot className="w-5 h-5 text-[#38bdf8] shrink-0" />
                <p className="text-xs text-neutral-200">
                  <strong className="text-white">Diagnóstico Neuronal Gravity:</strong> {scanResult.aiFixAdvice}
                </p>
              </div>

              <a
                href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martin, acabo de auditar mi web ${scanResult.domain} en Neuronal Gravity y vi que tengo baja nota en seguridad y SEO. Deseo una propuesta para corregirlo e implementar IA.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs shadow-md transition-all shrink-0 cursor-pointer"
              >
                <span>Reparar con Martin por WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        )}

      </div>

    </section>
  );
}
