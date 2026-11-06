'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft, BookOpen, AlertTriangle, Scale, Lock } from 'lucide-react';

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

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-10 text-neutral-200">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>Marco Legal República del Perú &bull; Versión 2.0 (Vigente 2026)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-xs text-neutral-400">
            Última actualización: 6 de noviembre de 2026 &bull; Prestador: Karol Martin Castillo Rojas &bull; RUC: 10704877850 &bull; Lima, Perú
          </p>
        </div>

        {/* 1. Identificación del Prestador */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1. Identificación del Prestador</span>
          </h2>
          <p>
            El presente contrato de prestación de servicios regula el acceso y contratación de las soluciones técnicas de auditoría y blindaje web provistas bajo la marca comercial <strong>DEFENSA TI</strong> (proyecto tecnológico de <strong>Neuronal Gravity</strong>), de titularidad de <strong>Karol Martin Castillo Rojas</strong>, con RUC <strong>10704877850</strong>, con domicilio en la ciudad de Lima, República del Perú, y canales de contacto oficial: correo electrónico <strong>castillo.karol96@gmail.com</strong> y WhatsApp <strong>+1 (785) 643-3991</strong>.
          </p>
        </section>

        {/* 2. Ámbito Territorial y Naturaleza del Servicio */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>2. Ámbito Territorial y Naturaleza del Servicio</span>
          </h2>
          <p>
            Los servicios de auditoría y blindaje perimetral de DEFENSA TI están dirigidos y prestados <strong>exclusivamente a personas naturales y personas jurídicas que operen y desarrollen actividades en la República del Perú</strong>.
          </p>
          <p>
            DEFENSA TI brinda servicios de evaluación técnica perimetral no intrusiva y configuración preventiva de seguridad web (con especialización en WordPress, WooCommerce y plataformas web a medida). Las auditorías se ejecutan sobre componentes públicos y protocolos de red (cabeceras HTTP, cifrado SSL/TLS, configuración DNS y análisis perimetral de puertos expuestos).
          </p>
        </section>

        {/* 3. Declaración y Garantía de Autorización (Ley 30096) */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span>3. Declaración y Garantía de Autorización del Titular (Ley 30096)</span>
          </h2>
          <p>
            En estricto cumplimiento de la <strong>Ley N° 30096 (Ley de Delitos Informáticos)</strong> y sus modificatorias:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Declaración del Cliente:</strong> Al solicitar un diagnóstico o contratar un plan, el cliente <strong>declara y garantiza</strong> que es el titular legítimo del dominio web ingresado o que cuenta con la delegación y autorización expresa y por escrito de la empresa u organización propietaria para someter el sitio a evaluaciones técnicas de seguridad.
            </li>
            <li>
              <strong>Permiso del Proveedor de Infraestructura:</strong> El cliente declara y garantiza que la auditoría no infringe los términos de servicio de su proveedor de hosting o nube, siendo de exclusiva responsabilidad del cliente tramitar cualquier consentimiento previo que su proveedor exija.
            </li>
            <li>
              <strong>Metodología No Intrusiva:</strong> Las evaluaciones realizadas por DEFENSA TI consisten exclusivamente en revisiones externas pasivas. No implican pruebas de denegación de servicio (DoS/DDoS), alteración destructiva de datos, inyección maliciosa ni extracción o sustracción de bases de datos.
            </li>
            <li>
              <strong>Cláusula de Indemnidad:</strong> Si la declaración de titularidad del cliente resultara falsa, inexacta o no autorizada, el cliente asumirá de forma exclusiva toda la responsabilidad legal, penal, civil o administrativa que pudiera derivarse, obligándose a mantener plenamente indemne a Karol Martin Castillo Rojas y al equipo de DEFENSA TI frente a reclamaciones de terceros o proveedores de telecomunicaciones.
            </li>
            <li>
              <strong>Facultad de Suspensión:</strong> DEFENSA TI se reserva el derecho irrestricto de rechazar, suspender o cancelar cualquier diagnóstico o servicio si surgen dudas razonables sobre la titularidad del dominio o la legitimidad de la solicitud.
            </li>
          </ul>
        </section>

        {/* 4. Condiciones de Uso del Escáner Gratuito */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">4. Condiciones del Escáner Gratuito</h2>
          <p>
            El escáner perimetral accesible en nuestro portal es una herramienta gratuita de orientación preliminar. Queda expresamente prohibido su empleo contra dominios ajenos sin consentimiento, así como el uso abusivo, automatizado o mediante scripts masivos contra nuestra API. El escáner se brinda &ldquo;tal cual&rdquo; (as is) sin garantías de disponibilidad ininterrumpida.
          </p>
        </section>

        {/* 5. Alcance Técnico, Copias de Respaldo y Exclusiones */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>5. Alcance Técnico, Copias de Respaldo y Exclusiones</span>
          </h2>
          <p>
            Para los servicios que requieran configuración correctiva sobre el sitio del cliente:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Protocolo de Accesos:</strong> No se solicitan contraseñas maestras. El cliente habilitará un usuario temporal con los privilegios mínimos necesarios, el cual deberá ser eliminado por el cliente una vez concluido el servicio.
            </li>
            <li>
              <strong>Copias de Seguridad (Backups):</strong> DEFENSA TI procurará realizar una copia de seguridad previa cuando sea técnicamente factible dentro del entorno del cliente. No obstante, <strong>el cliente mantiene en todo momento la obligación principal de conservar y verificar sus propias copias de seguridad íntegras y vigentes</strong> antes de autorizar cualquier intervención técnica.
            </li>
            <li>
              <strong>Incompatibilidades de Software:</strong> La actualización de CMS, plugins o temas puede generar incompatibilidades imprevistas con código personalizado desarrollado por terceros. En tal supuesto, la responsabilidad técnica de DEFENSA TI se limita a restaurar el sitio al estado respaldado previo a la intervención.
            </li>
            <li>
              <strong>Exclusiones Expresas:</strong> El blindaje perimetral no incluye rescate o desinfección forense de servidores comprometidos a nivel de sistema operativo raíz (root/SSH), pruebas de penetración destructivas (pentesting ofensivo), auditoría de código interno de terceros ni garantías sobre fallas de conectividad originadas en el proveedor de hosting o caídas de DNS globales.
            </li>
          </ul>
        </section>

        {/* 6. Garantía de Calificación y Procedimiento de Incumplimiento */}
        <section id="garantia" className="space-y-3 text-sm leading-relaxed scroll-mt-20">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>6. Garantía del Servicio Activada tras la Contratación y Pago</span>
          </h2>
          <p>
            En virtud del principio de buena fe contractual (Art. 1401 y concordantes del Código Civil peruano), las siguientes condiciones y cláusulas de garantía técnica entran en pleno vigor a favor del cliente a partir de la confirmación formal del pago:
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed space-y-3">
            <p>
              <strong>Alcance y Meta de la Garantía:</strong> En los planes de blindaje contratados, DEFENSA TI se compromete a mejorar la calificación perimetral del sitio web auditado en <strong>al menos un grado</strong> respecto al estado inicial (o meta Grado A en el plan Total).
            </p>
            <div className="p-3.5 rounded-lg bg-black/40 border border-emerald-500/30 text-emerald-300 font-mono text-[11px] leading-relaxed">
              &ldquo;Trabajamos para llevar tu web a Grado A en la evaluación final del blindaje contratado. Este es un servicio informativo y preventivo: la auditoría y el blindaje informan y previenen, no garantizan seguridad absoluta ni que no habrá ataques futuros. La garantía cubre solo el trabajo de blindaje realizado y entregado, dentro de su alcance. Martín / DEFENSA TI no se hace responsable por ataques futuros, vulnerabilidades nuevas, fallas del hosting o de proveedores, ni por lo que el cliente haga o deje de hacer después del blindaje. Desde la entrega, el cliente es responsable de mantener sus actualizaciones al día, proteger y no compartir sus accesos, cambiar las contraseñas entregadas y conservar copias de seguridad vigentes. Modificar el sitio, instalar código, plugins o temas sin revisión, o no mantenerlo, deja la garantía sin efecto sobre lo modificado.&rdquo;
            </div>
            <p>
              <strong>Criterio de Incumplimiento:</strong> Se considerará incumplimiento únicamente si, habiendo el cliente facilitado los accesos temporales necesarios y dentro del alcance técnico pactado, la re-medición técnica final no refleja la mejora comprometida.
            </p>
            <p>
              <strong>Plazo de Reclamo y Devolución:</strong> El cliente dispone de un plazo de <strong>15 días calendario</strong> contados desde la entrega formal del informe final para comunicar cualquier disconformidad con la calificación obtenida. Ante un reclamo fundado, DEFENSA TI repetirá los ajustes sin costo adicional; de persistir la imposibilidad técnica, se procederá con la <strong>devolución del 100% del pago realizado</strong>.
            </p>
          </div>
        </section>

        {/* 7. Límite Cuantitativo de Responsabilidad */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>7. Límite Cuantitativo de Responsabilidad Legal</span>
          </h2>
          <p>
            Conforme al Código Civil y la legislación de protección al consumidor, DEFENSA TI no excluye la responsabilidad que por ley resulte inderogable (dolo o culpa inexcusable). Sin perjuicio de ello:
          </p>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 leading-relaxed font-mono">
            &ldquo;La responsabilidad económica total y acumulada de Karol Martin Castillo Rojas / DEFENSA TI frente al cliente por cualquier daño, perjuicio o controversia derivada de la prestación del servicio contratado estará expresamente limitada al monto efectivamente pagado por el cliente por el servicio específico que originó el reclamo.&rdquo;
          </div>
          <p className="text-xs text-neutral-400">
            DEFENSA TI no se hace responsable por ataques informáticos futuros, incidentes ocasionados por negligencia del cliente al compartir contraseñas, omisión de actualizaciones posteriores a la entrega o vulnerabilidades de día cero (0-day) sobrevenidas.
          </p>
        </section>

        {/* 8. Tarifas, Pagos, Facturación y Cancelaciones */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>8. Tarifas, Pasarelas de Pago y Facturación</span>
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Precios Finales en Moneda Nacional:</strong> Todos los precios aplicables para clientes en el Perú se encuentran expresados en Soles (PEN) y corresponden a pagos únicos sin cobros recurrentes ni mensualidades ocultas.
            </li>
            <li>
              <strong>Medios de Pago Autorizados:</strong> Los pagos se coordinan y procesan de forma segura mediante <strong>Yape</strong> y la pasarela de pagos <strong>Culqi</strong> (tarjetas de crédito y débito nacionales).
            </li>
            <li>
              <strong>Condiciones de Pago:</strong> Los planes de S/ 65 y S/ 165 se cancelan al 100% por adelantado al iniciar el servicio. En el plan de S/ 335, se abona 50% al inicio y el 50% restante contra entrega verificada del informe. La entrega final de informes ejecutivos y credenciales quedará suspendida en tanto no se cancele el saldo pendiente.
            </li>
            <li>
              <strong>Comprobantes Electrónicos:</strong> Por cada servicio contratado se emite Boleta de Venta o Factura Electrónica conforme a las directivas de la SUNAT bajo el RUC <strong>10704877850</strong>.
            </li>
          </ul>
        </section>

        {/* 9. Confidencialidad y Propiedad Intelectual */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>9. Confidencialidad y Propiedad Intelectual</span>
          </h2>
          <p>
            <strong>Confidencialidad del Informe:</strong> El informe de auditoría entregado es de titularidad exclusiva del cliente una vez cancelado el servicio. DEFENSA TI no divulga, comercializa ni expone públicamente los resultados ni las vulnerabilidades detectadas en el sitio del cliente sin consentimiento expreso por escrito.
          </p>
          <p>
            <strong>Propiedad Intelectual:</strong> Las herramientas de escaneo, metodologías de blindaje y componentes de software desarrollados por Neuronal Gravity / DEFENSA TI permanecen bajo la titularidad de su autor o bajo las licencias de código abierto que rigen sus respectivos repositorios públicos en GitHub.
          </p>
        </section>

        {/* 10. Libro de Reclamaciones Virtual */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>10. Libro de Reclamaciones Virtual (INDECOPI)</span>
          </h2>
          <p>
            En cumplimiento del <strong>Decreto Supremo N° 011-2011-PCM</strong> y las disposiciones de <strong>INDECOPI</strong>, ponemos a disposición de nuestros usuarios el <strong>Libro de Reclamaciones Virtual</strong> para el registro de cualquier queja o reclamo relacionado con los servicios prestados.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white block">Libro de Reclamaciones Virtual - DEFENSA TI</span>
              <span className="text-neutral-400 text-[11px]">Conforme a la normativa peruana, todo reclamo será atendido en un plazo máximo de quince (15) días hábiles.</span>
            </div>
            <a
              href="mailto:castillo.karol96@gmail.com?subject=Reclamo%20-%20Libro%20de%20Reclamaciones%20DEFENSA%20TI&body=Estimado%20Martin%20Castillo,%20deseo%20asentar%20un%20reclamo/queja%20formal%20sobre%20el%20servicio%20recibido:%0A%0A-%20Nombre%20o%20Raz%C3%B3n%20Social:%0A-%20DNI/RUC:%0A-%20Tel%C3%A9fono%20/%20WhatsApp:%0A-%20Dominio%20Web%20Auditado:%0A-%20Detalle%20del%20Reclamo:"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold transition-all shrink-0"
            >
              Registrar Reclamo
            </a>
          </div>
        </section>

        {/* 11. Ley Aplicable y Jurisdicción */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>11. Ley Aplicable y Jurisdicción</span>
          </h2>
          <p>
            Los presentes Términos y Condiciones se interpretan, ejecutan y rigen de conformidad con las leyes vigentes de la República del Perú. Para la resolución de controversias entre empresas, las partes se someten a la competencia de los jueces y tribunales del Distrito Judicial de Lima, Perú, <strong>sin perjuicio de los fueros y derechos que correspondan al consumidor final</strong> bajo el marco de la Ley N° 29571 (Código de Protección y Defensa del Consumidor).
          </p>
        </section>
      </main>

      {/* Pie con Copyright y Contacto */}
      <footer className="border-t border-white/10 py-8 text-xs text-neutral-400 bg-black/80 relative z-10 text-center">
        <p>
          &copy; {new Date().getFullYear()} DEFENSA TI &bull; Neuronal Gravity &bull; Karol Martin Castillo Rojas &bull; RUC 10704877850 &bull; Lima, Perú
        </p>
      </footer>
    </div>
  );
}
