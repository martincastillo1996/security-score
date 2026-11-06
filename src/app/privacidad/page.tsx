'use client';

import React from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import { ShieldCheck, ArrowLeft, Lock, FileText, Database, Globe2, AlertCircle } from 'lucide-react';

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

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 sm:py-16 space-y-10 text-neutral-200">
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" />
            <span>Ley N° 29733 &bull; D.S. 016-2024-JUS &bull; Versión 2.0 (Vigente 2026)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Política de Privacidad y Protección de Datos Personales
          </h1>
          <p className="text-xs text-neutral-400">
            Última actualización: 6 de noviembre de 2026 &bull; Responsable: Karol Martin Castillo Rojas (persona natural con negocio) &bull; RUC 10704877850 &bull; Lima, Perú
          </p>
        </div>

        {/* 1. Titular del Banco de Datos */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>1. Titular del Banco de Datos Personales</span>
          </h2>
          <p>
            El responsable del tratamiento de los datos personales recopilados a través de esta plataforma es <strong>Karol Martin Castillo Rojas</strong>, identificado como persona natural con negocio con RUC <strong>10704877850</strong>, con domicilio en la ciudad de Lima, República del Perú, operando bajo la marca comercial <strong>DEFENSA TI</strong> (proyecto de <strong>Neuronal Gravity</strong>).
          </p>
          <p>
            Canal oficial y único de atención para el ejercicio de derechos sobre datos personales: correo electrónico <strong>castillo.karol96@gmail.com</strong> y WhatsApp oficial <strong>+1 (785) 643-3991</strong>.
          </p>
          <p className="text-xs text-neutral-400">
            Los datos personales recopilados se incorporan al banco de datos denominado <em>&ldquo;Clientes y Contactos Comerciales DEFENSA TI&rdquo;</em>, el cual se encuentra en proceso de regularización e inscripción formal ante el Registro Nacional de Protección de Datos Personales administrado por la Dirección General de Transparencia, Acceso a la Información Pública y Protección de Datos Personales (ANPDP) del Ministerio de Justicia y Derechos Humanos (MINJUS).
          </p>
        </section>

        {/* 2. Marco Normativo */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">2. Marco Normativo Aplicable</h2>
          <p>
            Esta Política de Privacidad se formula y aplica en estricta observancia de la <strong>Ley N° 29733 (Ley de Protección de Datos Personales)</strong> y su <strong>Nuevo Reglamento aprobado mediante Decreto Supremo N° 016-2024-JUS</strong>, garantizando los principios de legalidad, consentimiento, finalidad, proporcionalidad, calidad, seguridad y nivel de protección adecuado.
          </p>
        </section>

        {/* 3. Datos Personales Recopilados */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-[#38bdf8]" />
            <span>3. Datos Personales y Técnicos que Recopilamos</span>
          </h2>
          <p>
            Para la navegación, uso del escáner y contratación de servicios de auditoría y blindaje web, recopilamos las siguientes categorías de datos:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-300">
            <li>
              <strong>Datos de Identificación y Contacto:</strong> Nombre de la persona de contacto, número de teléfono/WhatsApp, correo electrónico y comentarios técnicos ingresados voluntariamente a través de nuestros formularios o chats directos.
            </li>
            <li>
              <strong>Datos Técnicos de Diagnóstico y Telemetría:</strong> Dirección IP de origen de la consulta, fecha y hora de la solicitud, URL o dominio web analizado, cabeceras HTTP públicas, protocolo SSL/TLS y registros de puertos de red expuestos.
            </li>
            <li>
              <strong>Datos de Facturación:</strong> Nombre o Razón Social, número de DNI o RUC y domicilio fiscal para la emisión de Boleta de Venta o Factura Electrónica conforme a las directivas de la SUNAT.
            </li>
            <li>
              <strong>Datos Financieros y de Pasarela de Pago:</strong> Los pagos electrónicos con tarjeta de débito o crédito se procesan a través de la pasarela autorizada <strong>Culqi</strong> (Compañía Incubadora de Soluciones Móviles S.A.C.) o transferencias directas por <strong>Yape</strong>. <strong>DEFENSA TI nunca recopila, almacena, procesa ni tiene acceso a los números completos de tarjeta, códigos de seguridad CVV ni fechas de caducidad bancaria.</strong>
            </li>
          </ul>
        </section>

        {/* 4. Finalidades del Tratamiento y Tiempos de Conservación */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>4. Finalidades del Tratamiento y Plazos de Conservación</span>
          </h2>
          <p>
            Tus datos personales se recopilan exclusivamente para los siguientes fines legítimos:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
            <li>Ejecutar la auditoría perimetral no intrusiva solicitada y generar el informe técnico en PDF.</li>
            <li>Coordinar directamente vía WhatsApp y correo la entrega de resultados y cotización de blindaje.</li>
            <li>Gestionar el cobro del servicio contratado y emitir el respectivo comprobante fiscal ante la SUNAT.</li>
            <li>Registrar la evidencia comprobable de aceptación expresa de los Términos del Servicio y esta Política.</li>
            <li>Atender oportunamente consultas, reclamos o quejas a través del Libro de Reclamaciones Virtual.</li>
            <li>Prevenir incidentes de denegación de servicio (DoS) o uso abusivo de las herramientas públicas mediante limitación de tasa por IP (rate limiting).</li>
          </ul>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-2 mt-3">
            <span className="font-bold text-white block">Plazos de Conservación de la Información:</span>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Caché de escaneo público:</strong> Los resultados de análisis perimetral se conservan durante un máximo de <strong>24 a 48 horas</strong> en memoria caché para evitar sobrecargar los servidores evaluados.</li>
              <li><strong>Datos de contacto de cotizaciones:</strong> Se conservan durante <strong>12 meses</strong> desde su recepción para fines de seguimiento técnico, tras lo cual se eliminan salvo contratación efectiva o solicitud de cancelación del titular.</li>
              <li><strong>Información contable y comprobantes de pago:</strong> Se conservan durante el plazo legal de <strong>5 años</strong> exigido por el Código Tributario peruano.</li>
            </ul>
          </div>
        </section>

        {/* 5. Transferencia a Terceros y Flujo Transfronterizo */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-sky-400" />
            <span>5. Encargados del Tratamiento y Flujo Transfronterizo de Datos</span>
          </h2>
          <p>
            DEFENSA TI no vende, alquila ni comercializa datos personales bajo ninguna modalidad. Sin embargo, para la correcta provisión del servicio web y de infraestructura, ciertos datos son procesados por terceros proveedores que actúan en calidad de encargados de tratamiento, algunos de los cuales albergan servidores fuera de la República del Perú (flujo transfronterizo bajo estándares internacionales de seguridad):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="font-bold text-white block">Infraestructura Web & Hosting</span>
              <p className="text-neutral-400">Vercel Inc. (EE. UU.) y DigitalOcean LLC (EE. UU.). Proveen el alojamiento de la aplicación y la computación en la nube bajo cifrado TLS.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="font-bold text-white block">Seguridad Perimetral & Red DNS</span>
              <p className="text-neutral-400">Cloudflare Inc. (EE. UU.). Protección anti-DDoS, firewall de aplicaciones web (WAF) y mitigación de tráfico malicioso.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="font-bold text-white block">Pasarela de Pagos</span>
              <p className="text-neutral-400">Culqi / Compañía Incubadora de Soluciones Móviles S.A.C. (Perú). Procesamiento seguro de pagos con tarjeta de débito y crédito.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="font-bold text-white block">Comunicaciones Directas</span>
              <p className="text-neutral-400">WhatsApp / Meta Platforms Inc. (EE. UU.). Canal de mensajería cifrada de extremo a extremo para coordinación técnica con el cliente.</p>
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-200 mt-2 font-mono">
            &bull; Compromiso estricto con Inteligencia Artificial: No utilizamos los datos personales, informes ni infraestructura técnica de nuestros clientes para entrenar modelos públicos de inteligencia artificial (LLMs comerciales).
          </div>
        </section>

        {/* 6. Consentimiento y Casillas de Aceptación */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">6. Consentimiento Expreso e Inequívoco</h2>
          <p>
            En cumplimiento del D.S. 016-2024-JUS, el tratamiento de datos personales para la contratación de servicios se sustenta en el consentimiento previo, libre, expreso, informado e inequívoco otorgado por el usuario mediante la marcación afirmativa de casillas sin pre-marcar junto a los formularios del portal.
          </p>
          <p className="text-xs text-neutral-400">
            Cualquier comunicación comercial futura que no sea estrictamente operativa requerirá una casilla independiente y opcional, la cual podrá ser rechazada o revocada en cualquier momento por el usuario sin afectar el servicio contratado.
          </p>
        </section>

        {/* 7. Ejercicio de Derechos ARCO y Revocatoria */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>7. Ejercicio de Derechos ARCO y Procedimiento</span>
          </h2>
          <p>
            El titular de los datos personales puede ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>, así como revocar el consentimiento previamente otorgado, mediante comunicación dirigida a:
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-2">
            <p>
              <strong>Correo Oficial ARCO:</strong> <span className="text-white font-mono font-bold">castillo.karol96@gmail.com</span> con el asunto <em>&ldquo;Ejercicio de Derechos ARCO - [Nombre del Titular]&rdquo;</em>.
            </p>
            <p>
              <strong>Plazos de Respuesta Legal (D.S. 016-2024-JUS):</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-neutral-400">
              <li>Derecho de Información / Acceso: Máximo de <strong>veinte (20) días hábiles</strong> desde la recepción de la solicitud.</li>
              <li>Derecho de Rectificación, Cancelación u Oposición: Máximo de <strong>diez (10) días hábiles</strong> desde la recepción.</li>
            </ul>
            <p className="text-[11px] text-neutral-400 pt-1 border-t border-white/5">
              Si el solicitante considera que su requerimiento no ha sido atendido en el plazo o forma legal, tiene derecho a interponer una reclamación de tutela ante la <strong>Dirección General de Transparencia, Acceso a la Información Pública y Protección de Datos Personales del MINJUS</strong> en Calle Scipión Llona 350, Miraflores, Lima, Perú.
            </p>
          </div>
        </section>

        {/* 8. Medidas de Seguridad de la Información */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">8. Medidas de Seguridad Técnicas y Organizativas</h2>
          <p>
            Para garantizar la confidencialidad, integridad y disponibilidad de la información, aplicamos medidas proporcionales:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
            <li>Cifrado estricto en tránsito mediante certificados TLS 1.3 con directivas de cabecera HSTS.</li>
            <li>Aislamiento de variables de entorno y credenciales administrativas mediante bóvedas seguras en la nube.</li>
            <li>Respaldos regulares cifrados y control de accesos basado en el principio de mínimo privilegio.</li>
          </ul>
        </section>

        {/* 9. Menores de Edad */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>9. Servicios Exclusivos para Mayores de Edad y Empresas</span>
          </h2>
          <p>
            Nuestros servicios de auditoría y ciberseguridad están diseñados y dirigidos exclusivamente a mayores de 18 años, profesionales, apoderados legales y titulares de negocios. No recopilamos intencionalmente información perteneciente a menores de edad. En caso de detectarse el registro involuntario de datos de un menor, se procederá a su eliminación inmediata.
          </p>
        </section>

        {/* 10. Uso de Cookies y Modificaciones */}
        <section className="space-y-3 text-sm leading-relaxed">
          <h2 className="text-lg font-bold text-white">10. Política de Cookies y Modificaciones</h2>
          <p>
            Este sitio web utiliza cookies técnicas esenciales y de sesión estrictamente necesarias para la navegación, el funcionamiento del escáner y la prevención de fraudes. No empleamos cookies invasivas de rastreo publicitario entre sitios de terceros.
          </p>
          <p>
            DEFENSA TI se reserva el derecho de actualizar periódicamente esta Política de Privacidad para adecuarla a reformas legislativas o criterios de la autoridad. Cualquier cambio entrará en vigor de forma inmediata al publicarse en esta misma página con indicación de su fecha y número de versión.
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-xs text-neutral-400 bg-black/80 relative z-10 text-center">
        <p>
          &copy; {new Date().getFullYear()} DEFENSA TI &bull; Neuronal Gravity &bull; Karol Martin Castillo Rojas &bull; RUC 10704877850 &bull; Lima, Perú
        </p>
      </footer>
    </div>
  );
}
