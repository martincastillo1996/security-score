'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export default function TerminosPage() {
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Términos y Condiciones del Servicio</h1>
          <p className="text-xs text-neutral-400">Prestador: Martin Castillo &bull; RUC con Negocio: 10704877850 &bull; Lima, Perú</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Naturaleza del Servicio</h2>
          <p>
            DEFENSA TI es un servicio de auditoría técnica externa, evaluación de seguridad web y remediación perimetral preventiva para sitios web, tiendas de comercio electrónico y aplicaciones web operadas por empresas y profesionales en el Perú y a nivel internacional.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Consentimiento y Autorización del Titular</h2>
          <p>
            Al solicitar una auditoría preventiva o contratar un plan de blindaje, el cliente declara bajo juramento ser el propietario legítimo del dominio web proporcionado o contar con la delegación y autorización expresa de la organización titular para realizar la evaluación de seguridad.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">3. Garantía a Grado A y Límite Legal de Responsabilidad</h2>
          <p className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed font-mono">
            &ldquo;Trabajamos para llevar tu web a Grado A en la evaluación final del blindaje contratado. Este es un servicio informativo y preventivo: la auditoría y el blindaje informan y previenen, no garantizan seguridad absoluta ni que no habrá ataques futuros. La garantía cubre solo el trabajo de blindaje realizado y entregado, dentro de su alcance. Martín / DEFENSA TI no se hace responsable por ataques futuros, vulnerabilidades nuevas, fallas del hosting o de proveedores, ni por lo que el cliente haga o deje de hacer después del blindaje. Desde la entrega, el cliente es responsable de mantener sus actualizaciones al día, proteger y no compartir sus accesos, cambiar las contraseñas entregadas y conservar copias de seguridad vigentes. Modificar el sitio, instalar código, plugins o temas sin revisión, o no mantenerlo, deja la garantía sin efecto sobre lo modificado.&rdquo;
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Protocolo Estricto de Accesos y Seguridad</h2>
          <p>
            Para tareas de blindaje que requieran ingreso al sitio:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>Para la auditoría no pedimos contraseñas. Para el blindaje, solo una cuenta temporal con permisos mínimos, nunca tu contraseña principal, y se cierra al terminar.</li>
            <li>Se realizará una copia de seguridad verificada previa a cualquier cambio técnico.</li>
            <li>Cada ajuste se documenta en el informe de entrega.</li>
            <li>Finalizado el servicio, el cliente debe eliminar o deshabilitar dicho usuario temporal.</li>
            <li>DEFENSA TI no almacena contraseñas ni comparte accesos con terceros bajo ninguna circunstancia.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">5. Pagos y Facturación</h2>
          <p>
            Medios aceptados: Yape, Plin y Transferencia Bancaria (Perú).
            Los planes de S/ 65 y S/ 165 se cancelan al 100% por adelantado. El plan de S/ 335 se abona 50% al iniciar y 50% contra entrega verificada.
            Se emite Boleta o Factura Electrónica bajo el RUC 10704877850.
          </p>
        </section>
      </main>
    </div>
  );
}
