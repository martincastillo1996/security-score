import type { Metadata } from 'next';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos del Servicio | DEFENSA TI',
  description: 'Términos y condiciones del servicio de auditoría y blindaje web DEFENSA TI. RUC 10704877850.',
};

export default function TerminosPage() {
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Términos y Condiciones del Servicio</h1>
          <p className="text-xs text-neutral-400">Prestador: Martin Castillo &bull; RUC con Negocio: 10704877850 &bull; Lima, Perú</p>
        </div>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">1. Alcance del Servicio</h2>
          <p>
            DEFENSA TI es un servicio profesional de auditoría técnica perimetral y endurecimiento de seguridad (hardening) para sitios web corporativos y de comercio electrónico.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li><strong>Plan Auditoría (S/ 65 / ~$19 USD):</strong> Evaluación no intrusiva externa de cabeceras, SSL/TLS, exposición de puertos y entrega de reporte con nota de F a A+ en 48 horas laborables. No requiere acceso a servidores ni contraseñas.</li>
            <li><strong>Plan Blindaje Esencial (S/ 165 / ~$49 USD):</strong> Auditoría más corrección de fallas críticas, cabeceras HTTP defensivas, actualización segura y endurecimiento de accesos. Entrega en 3 a 5 días hábiles.</li>
            <li><strong>Plan Blindaje Total (S/ 335 / ~$99 USD):</strong> Hardening integral, firewall de aplicaciones web (WAF), copias de seguridad comprobables y verificación con re-medición. Entrega en 5 a 7 días hábiles.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Exclusiones Importantes: Sitios Infectados con Malware</h2>
          <p>
            Los planes estándar de blindaje aplican exclusivamente a sitios web operativos que requieren protección preventiva. 
            <strong> La limpieza, desinfección forense o rescate de sitios web ya infectados con malware o spam activo NO está incluida en el plan de S/ 335 ($99)</strong> y se cotiza como servicio independiente desde $149 USD tras diagnóstico previo.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">3. Garantía Comercial por Escrito</h2>
          <p>
            Para los planes de blindaje implementados por DEFENSA TI, aplica la garantía de mejora efectiva:
            &ldquo;Si tras aplicar las correcciones técnicas no logramos subir al menos un grado la calificación de seguridad de tu web en nuestra auditoría independiente, te devolvemos el 100% de lo pagado.&rdquo;
          </p>
          <p className="text-xs text-neutral-400">
            Nota: La obtención de Grado A+ absoluto depende de las restricciones técnicas del proveedor de hosting del cliente. Si el hosting impide configuraciones avanzadas, se notificará al cliente antes de intervenir.
          </p>
        </section>

        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Protocolo Estricto de Accesos y Seguridad</h2>
          <p>
            Para tareas de blindaje que requieran ingreso al sitio:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-neutral-300">
            <li>El cliente creará un usuario administrador temporal exclusivo para DEFENSA TI.</li>
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
