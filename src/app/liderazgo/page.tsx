import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import NeuralBackground from '@/components/NeuralBackground';
import NeuronalGravityBrandLogo from '@/components/NeuronalGravityBrandLogo';
import HeaderWhatsAppButton from '@/components/HeaderWhatsAppButton';
import { 
  ArrowLeft, 
  Sparkles, 
  MessageSquare, 
  CheckCircle2,
  Globe,
  Code,
  Mail,
  Phone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Liderazgo & Dirección Técnica | Martin Castillo | Neuronal Gravity',
  description: 'Conoce la visión directiva y técnica de Martin Castillo, fundador de Neuronal Gravity y especialista en arquitectura de IA aplicada y ciberdefensa.',
};

export default function LiderazgoPage() {
  const credentials = [
    'Especialista en integración de modelos de lenguaje avanzados aplicados a flujos comerciales',
    'Creador y arquitecto del motor determinista de auditoría perimetral DEFENSA TI',
    'Consultor estratégico para directivos y fundadores de empresas en Latinoamérica y EE.UU.',
    'Defensor de infraestructura propietaria, datos blindados y cero ataduras a terceros'
  ];

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] flex flex-col justify-between overflow-hidden font-sans">
      
      {/* Fondo de constelaciones */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <NeuralBackground showDomains={false} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-black/75 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between gap-4">
          <NeuronalGravityBrandLogo />
          <div className="flex items-center gap-3">
            <HeaderWhatsAppButton
              message="Hola Martín, estuve revisando tu perfil y liderazgo técnico en Neuronal Gravity y deseo conversar sobre un proyecto."
            />
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-neutral-300 hover:text-white transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 sm:py-24 space-y-16 flex-1 w-full">
        
        {/* Tarjeta de Perfil Profesional */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-8">
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            
            {/* Foto de Martin Castillo */}
            <div className="relative w-36 h-44 sm:w-44 sm:h-52 rounded-2xl overflow-hidden border-2 border-white/15 shadow-2xl shrink-0 bg-neutral-900">
              <Image
                src="/martin-castillo-preview.jpg"
                alt="Martin Castillo - Fundador de Neuronal Gravity"
                fill
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Información */}
            <div className="space-y-4 text-center sm:text-left flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#2997ff] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Fundador & Consultor Principal</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Martin Castillo
              </h1>

              <p className="text-sm font-medium text-neutral-300 leading-relaxed">
                Arquitecto de Soluciones de Negocio con Inteligencia Artificial y Especialista en Ciberdefensa Perimetral.
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Fundador de <strong>Neuronal Gravity</strong>. Colaboro directamente con directores generales, fundadores y líderes de tecnología para transformar operaciones manuales lentas en sistemas inteligentes que trabajan sin interrupción, manteniendo control total sobre sus datos y código.
              </p>

              {/* Botones de Contacto Directo */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-2">
                <a
                  href="https://wa.me/17856433991?text=Hola%20Martin,%20vi%20tu%20perfil%20en%20neuronalgravity.com%20y%20deseo%20conversar%20sobre%20un%20proyecto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp (+1 (785) 643-3991)</span>
                </a>

                <a
                  href="tel:+17856433991"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95"
                >
                  <Phone className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Llamadas (+1 (785) 643-3991)</span>
                </a>

                <a
                  href="mailto:castillo.karol96@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>castillo.karol96@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/karol-martin-castillo-rojas-83b384234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95"
                >
                  <Globe className="w-3.5 h-3.5 text-[#0a66c2]" />
                  <span>LinkedIn</span>
                </a>

                <a
                  href="https://github.com/martincastillo1996"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all active:scale-95"
                >
                  <Code className="w-3.5 h-3.5 text-neutral-300" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>

          </div>

          {/* Cita Directiva */}
          <div className="p-6 rounded-2xl bg-white/3 border border-white/5 italic text-sm text-neutral-300 border-l-4 border-l-[#0071e3] leading-relaxed">
            &ldquo;La inteligencia artificial no debe ser un adorno tecnológico ni un gasto inflado en licencias: debe ser una palanca financiera directa que multiplique el margen neto de tu negocio y libere el talento humano de la fricción repetitiva.&rdquo;
          </div>

          {/* Principios de Trabajo */}
          <div className="space-y-3 pt-4 border-t border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Enfoque Profesional & Criterio Técnico:
            </h3>
            <ul className="space-y-2.5">
              {credentials.map((cred, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-neutral-400">
        <p>© 2026 Neuronal Gravity &bull; Dirección Ejecutiva &bull; neuronalgravity.com &bull; <span className="text-[#38bdf8] font-semibold">by Martin Castillo</span></p>
      </footer>

    </div>
  );
}
