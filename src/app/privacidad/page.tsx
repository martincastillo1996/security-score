'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground showDomains={false} />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-white font-bold tracking-tight">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>DEFENSA TI</span>
          </Link>
          <Link href="/" className="text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-8 text-neutral-200">
        <div className="space-y-2 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Política de Privacidad y Protección de Datos</h1>
          <p className="text-xs text-neutral-400">En estricto cumplimiento de la Ley Peruana N° 29733 (Ley de Protección de Datos Personales) &bull; RUC 10704877850</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Titular del Banco de Datos</h2>
          <p>
            El responsable del tratamiento de los datos personales recopilados a través de este sitio web es Martin Castillo, con RUC con Negocio <strong>10704877850</strong>, con domicilio en Lima, Perú, y canal de contacto directo en <strong>martincastillorojas@gmail.com</strong> y WhatsApp <strong>+1 (785) 643-3991</strong>.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Datos Recopilados y Finalidad</h2>
          <p>
            Los datos personales proporcionados en los formularios (nombre, dirección web a auditar, WhatsApp y requerimientos técnicos) se utilizan exclusivamente para:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>Coordinar y entregar el informe técnico de auditoría perimetral solicitado.</li>
            <li>Gestionar el contacto directo para el servicio de blindaje contratado.</li>
            <li>Emitir el comprobante de pago electrónico correspondiente.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">3. Confidencialidad y Seguridad</h2>
          <p>
            DEFENSA TI no comercializa, transfiere ni cede datos a terceros. Toda información técnica de infraestructura analizada se maneja bajo estricta confidencialidad profesional. No utilizamos tus datos para entrenar modelos públicos de inteligencia artificial.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Ejercicio de Derechos ARCO</h2>
          <p>
            El titular de los datos puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) enviando un mensaje a martincastillorojas@gmail.com o directamente por WhatsApp al +1 (785) 643-3991.
          </p>
        </section>
      </main>
    </div>
  );
}
