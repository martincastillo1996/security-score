import type { Metadata } from 'next';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  MessageSquare,
  Search,
  Cpu,
  Layers,
  TrendingUp,
  ShieldAlert
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo Trabajamos | Metodología de Negocio con IA | Neuronal Gravity',
  description: 'Proceso ágil y estructurado en 4 etapas: desde el diagnóstico de cuellos de botella hasta el despliegue con soporte continuo y medición de ROI.',
};

export default function MetodologiaPage() {
  const steps = [
    {
      num: '01',
      icon: Search,
      badge: 'Semana 1',
      title: 'Diagnóstico Operativo y Detección de Cuellos de Botella',
      desc: 'Analizamos cómo fluyen las operaciones diarias de tu negocio: tiempos de respuesta a clientes, tareas manuales repetitivas y procesos lentos que generan sobrecostos. Identificamos con precisión el punto exacto donde la automatización o un agente generará el mayor impacto comercial.',
      deliverables: [
        'Mapeo visual del flujo de trabajo actual vs. flujo automatizado',
        'Cálculo estimado de horas-hombre recuperables por semana',
        'Definición de indicadores clave de rendimiento (KPIs de rentabilidad)'
      ]
    },
    {
      num: '02',
      icon: Cpu,
      badge: 'Semana 2',
      title: 'Prototipo Funcional Rápido (Prueba de Concepto en 7 Días)',
      desc: 'Antes de realizar una inversión grande o comprometer tus sistemas principales, construimos una versión funcional preliminar conectada a una muestra real de tus datos o catálogo. Así validas la velocidad, precisión y utilidad del sistema sin riesgo.',
      deliverables: [
        'Entorno de pruebas privado para que tu equipo interactúe con el prototipo',
        'Validación de respuestas en lenguaje natural con la identidad de tu marca',
        'Ajuste fino de reglas de negocio, precios y límites operativos'
      ]
    },
    {
      num: '03',
      icon: Layers,
      badge: 'Semanas 3 a 4',
      title: 'Despliegue e Integración en Infraestructura Blindada',
      desc: 'Conectamos la solución a tus canales de comunicación (WhatsApp Business API, portal web, pasarelas de pago, CRM o ERP). Implementamos el protocolo de ciberdefensa de DEFENSA TI para asegurar que ninguna transacción ni dato confidencial quede vulnerable.',
      deliverables: [
        'Conexión directa con bases de datos y sistemas de facturación',
        'Auditoría perimetral de transporte seguro y cabeceras criptográficas',
        'Capacitación práctica a tu personal clave para supervisar la herramienta'
      ]
    },
    {
      num: '04',
      icon: TrendingUp,
      badge: 'Continuo',
      title: 'Monitoreo, Soporte Estratégico y Optimización de Resultados',
      desc: 'La inteligencia artificial mejora conforme aprende de los datos reales de tu negocio. Brindamos mantenimiento proactivo, monitoreo de disponibilidad 24/7 y sesiones periódicas para evaluar ventas adicionales y optimizar márgenes operativos.',
      deliverables: [
        'Panel de control con métricas de interacciones y conversiones',
        'Actualización continua de modelos ante cambios en tus productos o tarifas',
        'Canal directo de asistencia técnica prioritaria'
      ]
    }
  ];

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] flex flex-col justify-between overflow-hidden font-sans">
      
      {/* Fondo de constelaciones */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <NeuralBackground showDomains={false} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold text-base tracking-tight text-white leading-none">
              NEURONAL GRAVITY
            </span>
            <span className="text-xs text-[#38bdf8] font-mono font-semibold">by Martin Castillo</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Inicio</span>
          </Link>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 sm:py-24 space-y-16 flex-1 w-full">
        
        {/* Cabecera */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proceso Ágil y Predecible</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Cómo Llevamos la IA a tu Negocio en 4 Pasos Concretos
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Eliminamos la incertidumbre tecnológica trabajando bajo un método estructurado, medible y orientado a generar resultados operativos desde el primer mes.
          </p>
        </div>

        {/* Pasos */}
        <div className="space-y-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start gap-6 hover:border-white/20 transition-all"
              >
                <div className="flex md:flex-col items-center gap-3 shrink-0">
                  <span className="font-mono text-4xl sm:text-5xl font-black text-[#0071e3]">
                    {step.num}
                  </span>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#38bdf8]">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400">
                      {step.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {step.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {step.desc}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      Entregables de esta etapa:
                    </span>
                    <ul className="space-y-1.5">
                      {step.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#0071e3]/20 via-[#141416] to-emerald-500/20 border border-white/15 text-center space-y-5">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            ¿Listo para evaluar el primer caso de uso en tu empresa?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-lg mx-auto">
            Cuéntanos qué proceso manual o de atención al cliente está consumiendo el tiempo de tu equipo. Te presentaremos un plan de acción en menos de 48 horas.
          </p>
          <div>
            <a
              href="https://wa.me/17856433991?text=Hola%20Martin,%20deseo%20evaluar%20un%20caso%20de%20uso%20de%20IA%20para%20mi%20empresa"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-xl shadow-[#0071e3]/40 transition-all active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Conversar con Martin Castillo por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-neutral-400">
        <p>© 2026 Neuronal Gravity &bull; Metodología de Implementación &bull; neuronalgravity.com &bull; <span className="text-[#38bdf8] font-semibold">by Martin Castillo</span></p>
      </footer>

    </div>
  );
}
