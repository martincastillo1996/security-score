'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { Brain, ArrowLeft, Home, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] flex flex-col justify-between overflow-hidden select-none font-sans">
      
      {/* Fondo de constelaciones y nodos neuronales interactivos */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <NeuralBackground showDomains={false} />
      </div>

      {/* Gradientes decorativos estilo Apple Pro */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#0071e3]/15 via-[#7928ca]/10 to-transparent blur-3xl rounded-full" />
      </div>

      {/* Barra de Navegación Minimalista */}
      <header className="relative z-10 border-b border-white/10 bg-black/60 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(0,113,227,0.4)]">
              <div className="h-full w-full rounded-[14px] bg-black flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-white leading-none">
                NEURONAL GRAVITY
              </span>
              <span className="text-[11px] text-neutral-400 font-mono mt-0.5">
                neuronalgravity.com
              </span>
            </div>
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

      {/* Contenido Central 404 */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center space-y-8">
          
          {/* Badge de Alerta */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold tracking-wide shadow-[0_0_20px_rgba(244,63,94,0.15)]">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Coordenada no encontrada &bull; Código 404</span>
          </div>

          {/* Gran 404 Estilizado */}
          <div className="space-y-3">
            <h1 className="text-7xl sm:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-neutral-200 to-neutral-600 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Esta ruta no existe en el sistema
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 max-w-md mx-auto leading-relaxed">
              El enlace que seguiste pudo haber cambiado o la página fue reubicada dentro de nuestra infraestructura.
            </p>
          </div>

          {/* Tarjeta de Acciones */}
          <div className="p-6 rounded-3xl bg-[#141416]/90 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-lg shadow-[#0071e3]/30 transition-all active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                <span>Ir a la Portada Principal</span>
              </Link>
              <Link
                href="/scanner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 hover:text-white text-xs font-semibold transition-all active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#38bdf8]" />
                <span>Probar Auditoría DEFENSA TI</span>
              </Link>
            </div>

            <div className="pt-2 border-t border-white/5">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20encontr%C3%A9%20un%20enlace%20roto%20(404)%20en%20neuronalgravity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-[#25D366] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>¿Buscabas un servicio específico? Consúltanos por WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="relative z-10 border-t border-white/5 py-6 px-6 text-center text-xs text-neutral-500">
        <p>© 2026 Neuronal Gravity &bull; neuronalgravity.com &bull; Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
