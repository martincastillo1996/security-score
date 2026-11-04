import type { Metadata } from 'next';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  Code2, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Soluciones de Negocio con Inteligencia Artificial | Neuronal Gravity',
  description: 'Implementamos agentes autónomos, automatizaciones de procesos operativos y ciberseguridad perimetral para empresas que buscan rentabilidad y escala.',
};

export default function SolucionesPage() {
  const solutions = [
    {
      icon: Bot,
      badge: 'Ventas y Atención 24/7',
      title: 'Agentes Autónomos en WhatsApp y Canales Comerciales',
      desc: 'Sistemas conversacionales conectados al catálogo de tu empresa, stock en tiempo real y pasarelas de pago. Atienden consultas complejas, califican prospectos y cierran ventas en segundos sin intervención humana.',
      points: [
        'Atención continua los 365 días del año sin costos de horas extra',
        'Integración con tu CRM, Google Sheets, ERP o base de datos actual',
        'Respuestas precisas sobre precios, disponibilidad y condiciones de envío'
      ],
      color: 'from-blue-500/20 to-cyan-500/20 border-[#38bdf8]/40 text-[#38bdf8]',
      cta: 'Cotizar Agente Comercial',
      whatsappText: 'Hola Martin, me interesa cotizar un Agente Autónomo de Ventas por WhatsApp para mi empresa'
    },
    {
      icon: Zap,
      badge: 'Eficiencia de Procesos',
      title: 'Automatización Operativa y Flujos de Trabajo Inteligentes',
      desc: 'Eliminamos la carga manual en tareas repetitivas: extracción de datos de facturas y contratos, generación de reportes ejecutivos, conciliación de inventarios y alertas preventivas.',
      points: [
        'Reducción de hasta un 65% en costos operativos manuales',
        'Eliminación de errores de digitación en comprobantes y planillas',
        'Aceleración de procesos internos que antes demoraban días a solo segundos'
      ],
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/40 text-purple-400',
      cta: 'Automatizar Flujos Operativos',
      whatsappText: 'Hola Martin, deseo evaluar la automatización de procesos operativos en mi empresa'
    },
    {
      icon: ShieldCheck,
      badge: 'Protección Transaccional',
      title: 'DEFENSA TI — Ciberseguridad Perimetral para Empresas',
      desc: 'Blindaje preventivo para tiendas en línea, pasarelas de pago y portales corporativos. Diagnosticamos certificados SSL, cabeceras HTTP, sockets expuestos y riesgos de clonación sin interrumpir tu servicio.',
      points: [
        'Auditoría no intrusiva de sockets y transporte seguro en tiempo real',
        'Prevención de bloqueos bancarios y pantallas rojas de advertencia en navegadores',
        'Instrucciones técnicas claras para tu equipo de programación o soporte'
      ],
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
      cta: 'Probar Escáner DEFENSA TI',
      href: '/scanner'
    },
    {
      icon: Code2,
      badge: 'Ingeniería a la Medida',
      title: 'Desarrollo de Software Propietario con IA Integrada',
      desc: 'Cuando las herramientas estándar del mercado no se ajustan a tu modelo de negocio, construimos plataformas web y aplicaciones personalizadas con infraestructura en la nube escalable y modelos de lenguaje de vanguardia.',
      points: [
        'Propiedad intelectual 100% de tu negocio, sin mensualidades abusivas por usuario',
        'Arquitectura moderna con Next.js, APIs de alto rendimiento y servidores protegidos',
        'Modelos entrenados con las reglas y protocolos exclusivos de tu industria'
      ],
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
      cta: 'Consultar Desarrollo a Medida',
      whatsappText: 'Hola Martin, tengo un proyecto de software a medida con IA para mi empresa'
    },
    {
      icon: Users,
      badge: 'Estrategia y Capacitación',
      title: 'Consultoría Estratégica en Adopción de IA para Equipos',
      desc: 'Acompañamos a directores y líderes de área a identificar qué procesos generan el mayor retorno financiero con IA, capacitando a su personal para adoptar herramientas modernas con agilidad.',
      points: [
        'Diagnóstico de cuellos de botella con priorización por rentabilidad y retorno',
        'Talleres prácticos orientados a resultados comerciales concretos',
        'Supervisión y control de calidad en cada etapa de implementación'
      ],
      color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-400',
      cta: 'Agendar Sesión de Consultoría',
      whatsappText: 'Hola Martin, deseo agendar una sesión de consultoría estratégica de IA para mi equipo'
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
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-16 flex-1 w-full">
        
        {/* Cabecera de Página */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Servicios de Alto Impacto Financiero</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Soluciones de Negocio Diseñadas para Generar Utilidad Real
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            No desarrollamos demostraciones tecnológicas decorativas. Construimos herramientas prácticas de inteligencia artificial que incrementan tus ventas, protegen tus operaciones y reducen horas de trabajo innecesarias.
          </p>
        </div>

        {/* Lista de Soluciones en Tarjetas Glass */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol, index) => {
            const Icon = sol.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col justify-between space-y-6 hover:border-white/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className={`p-3 rounded-2xl bg-white/5 border ${sol.color.split(' ')[2]} ${sol.color.split(' ')[3]}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                      {sol.badge}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white tracking-tight">
                    {sol.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {sol.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {sol.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5">
                  {sol.href ? (
                    <Link
                      href={sol.href}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold transition-all"
                    >
                      <span>{sol.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={`https://wa.me/17856433991?text=${encodeURIComponent(sol.whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-md shadow-[#0071e3]/30 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{sol.cta}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 Neuronal Gravity &bull; Consultoría Estratégica &bull; neuronalgravity.com</p>
      </footer>

    </div>
  );
}
