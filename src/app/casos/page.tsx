import type { Metadata } from 'next';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { 
  ShoppingCart, 
  Building2, 
  Stethoscope, 
  Truck, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2,
  MessageSquare
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Casos por Industria y Resultados de Negocio | Neuronal Gravity',
  description: 'Ejemplos reales de implementación de IA en Comercio, Servicios B2B, Salud y Logística con métricas de rentabilidad comprobables.',
};

export default function CasosPage() {
  const industries = [
    {
      icon: ShoppingCart,
      name: 'Comercio Minorista & E-commerce',
      title: 'Ventas Nocturnas Autónomas y Blindaje Transaccional',
      desc: 'Integración de un agente comercial en WhatsApp conectado al inventario en tiempo real y pasarela de pago. Atiende preguntas sobre tallas, especificaciones y disponibilidad, guiando al comprador hasta el comprobante de pago.',
      result: '+42% en ventas concretadas fuera del horario de oficina',
      metric: '42%',
      metricLabel: 'Más ventas nocturnas',
      bullets: [
        'Cero prospectos perdidos los fines de semana o feriados',
        'Generación de links de pago automáticos con Culqi y Yape',
        'Auditoría continua con DEFENSA TI para proteger las transacciones'
      ],
      color: 'from-blue-500/20 to-cyan-500/20 border-[#38bdf8]/40 text-[#38bdf8]'
    },
    {
      icon: Building2,
      name: 'Empresas de Servicios B2B & Consultoría',
      title: 'Calificación Instantánea de Leads y Agendamiento',
      desc: 'Filtro inteligente que evalúa si un prospecto entrante cuenta con el presupuesto y tamaño necesario antes de agendar una reunión con el equipo de ventas, eliminando horas de reuniones improductivas.',
      result: 'Tiempo de primer contacto reducido de 4 horas a 15 segundos',
      metric: '15s',
      metricLabel: 'Respuesta inmediata',
      bullets: [
        'Sincronización directa con Google Calendar y CRM',
        'Respuestas técnicas adaptadas a la industria del cliente',
        'Detección y priorización de cuentas corporativas de alto valor'
      ],
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-400'
    },
    {
      icon: Stethoscope,
      name: 'Salud, Clínicas y Centros Médicos',
      title: 'Confirmación y Reagendamiento Proactivo de Pacientes',
      desc: 'Sistema conversacional que envía recordatorios interactivos, resuelve dudas previas a exámenes (ayuno, preparación) y permite cancelar o cambiar turnos de inmediato, reasignando el cupo a otro paciente.',
      result: 'Reducción del 70% en citas médicas desaprovechadas',
      metric: '-70%',
      metricLabel: 'Menos inasistencias',
      bullets: [
        'Disminución radical de consultorios vacíos por olvido',
        'Liberación de carga telefónica para el personal de recepción',
        'Protocolo de privacidad conforme a la Ley de Datos Médicos'
      ],
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400'
    },
    {
      icon: Truck,
      name: 'Logística, Transporte y Distribución',
      title: 'Extracción de Guías y Consulta Automatizada de Envíos',
      desc: 'Lectura inteligente de comprobantes físicos y manifiestos de carga mediante visión computacional, permitiendo a clientes y conductores consultar el estado de sus pedidos por WhatsApp.',
      result: 'El 80% de consultas de seguimiento se resuelven sin operador',
      metric: '80%',
      metricLabel: 'Autonomía en consultas',
      bullets: [
        'Digitalización inmediata de documentos sin digitadores dedicados',
        'Notificaciones automáticas en cada hito del trayecto',
        'Ahorro significativo en llamadas de reclamo y coordinación'
      ],
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400'
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

      {/* Contenido */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-16 flex-1 w-full">
        
        {/* Cabecera */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resultados Comprobables</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Casos de Uso Diseñados para Resolver Problemas Reales
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Conoce cómo empresas de diferentes sectores han integrado nuestras soluciones para multiplicar su capacidad operativa y su margen de rentabilidad.
          </p>
        </div>

        {/* Grid de Industrias */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#38bdf8]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10">
                      {ind.name}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {ind.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {ind.desc}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="block text-2xl font-black text-emerald-400 font-mono">
                        {ind.metric}
                      </span>
                      <span className="text-[11px] text-neutral-400">
                        {ind.metricLabel}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-neutral-300 text-right max-w-[200px]">
                      {ind.result}
                    </span>
                  </div>

                  <ul className="space-y-2 pt-2">
                    {ind.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <a
                    href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martin, me interesa evaluar una solución similar al caso de ${ind.name} para mi empresa`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Consultar para mi Industria</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-neutral-400">
        <p>© 2026 Neuronal Gravity &bull; Casos de Negocio &bull; neuronalgravity.com &bull; <span className="text-[#38bdf8] font-semibold">by Martin Castillo</span></p>
      </footer>

    </div>
  );
}
