import type { Metadata } from 'next';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad | DEFENSA TI',
  description: 'Política de privacidad y protección de datos personales de DEFENSA TI conforme a la Ley Peruana N° 29733. RUC 10704877850.',
};

export default function PrivacidadPage() {
  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] font-sans antialiased selection:bg-[#0071e3] selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <NeuralBackground />
        <div className="absolute inset-0 bg-radial from-transparent via-black/50 to-black" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-2xl">
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
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">[BORRADOR VIGENTE 2026]</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Política de Privacidad y Protección de Datos</h1>
          <p className="text-xs text-neutral-400">En estricto cumplimiento de la Ley Peruana N° 29733 (Ley de Protección de Datos Personales) &bull; RUC 10704877850</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Titular del Banco de Datos</h2>
          <p>
            El responsable del tratamiento de los datos personales recopilados a través de este sitio web es Martin Castillo, con RUC con Negocio <strong>10704877850</strong>, con domicilio en Lima, Perú, y canal de contacto directo en <strong>castillo.karol96@gmail.com</strong> y WhatsApp <strong>+51 987 010 380</strong>.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Datos Solicitados y Finalidad</h2>
          <p>
            Recopilamos únicamente los datos mínimos indispensables para la prestación del servicio:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li><strong>Nombre y teléfono/WhatsApp:</strong> Para coordinar la entrega del informe y la propuesta técnica.</li>
            <li><strong>Dirección web:</strong> Para ejecutar la auditoría perimetral de seguridad no invasiva.</li>
            <li><strong>Consentimiento expreso:</strong> Se exige al usuario confirmar que es titular del dominio o cuenta con autorización formal para su evaluación.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">3. Confidencialidad y No Transferencia</h2>
          <p>
            Los datos de auditoría, correos y teléfonos de contacto jamás se comercializan, alquilan ni ceden a terceros. La información sensible de los clientes se resguarda bajo acuerdo de confidencialidad tácito o formal (NDA).
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Ejercicio de Derechos ARCO</h2>
          <p>
            El titular de los datos puede ejercer en cualquier momento sus derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO) enviando un mensaje a castillo.karol96@gmail.com o directamente por WhatsApp al +51 987 010 380.
          </p>
        </section>
      </main>
    </div>
  );
}
