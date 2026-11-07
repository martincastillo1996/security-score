'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import NeuronalGravityBrandLogo from '@/components/NeuronalGravityBrandLogo';
import HeaderWhatsAppButton from '@/components/HeaderWhatsAppButton';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Lock, 
  Database, 
  Scale, 
  BookOpen, 
  Server,
  CheckCircle2
} from 'lucide-react';

export default function TerminosYPrivacidadPage() {
  const [activeTab, setActiveTab] = useState<'todos' | 'terminos' | 'privacidad'>('todos');

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground showDomains={false} />
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <NeuronalGravityBrandLogo />
          <div className="flex items-center gap-2.5 sm:gap-3">
            <HeaderWhatsAppButton
              message="Hola Martín, estoy revisando los Términos y Condiciones de Neuronal Gravity y deseo hacer una consulta."
            />
            <Link 
              href="/reclamaciones" 
              className="text-xs text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold transition-colors border border-amber-400/30 px-3 py-1.5 rounded-xl bg-amber-400/10"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Libro de Reclamaciones</span>
            </Link>
            <Link href="/" className="text-xs text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-10 text-neutral-200">
        
        {/* Cabecera Principal */}
        <div className="space-y-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <Scale className="w-3.5 h-3.5" />
              <span>Marco Legal República del Perú</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5" />
              <span>Ley N° 29733 &bull; D.S. 016-2024-JUS &bull; Ley N° 30096</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Términos del Servicio y Política de Privacidad
          </h1>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1.5">
            <p>
              <strong>Titular y Prestador:</strong> Karol Martin Castillo Rojas (Persona Natural con Negocio) &bull; <strong>RUC:</strong> 10704877850 &bull; Domicilio: Lima, República del Perú.
            </p>
            <p>
              <strong>Contacto Oficial y Ejercicio de Derechos:</strong> Correo: <a href="mailto:castillo.karol96@gmail.com" className="text-[#38bdf8] underline">castillo.karol96@gmail.com</a> &bull; WhatsApp Oficial: <a href="https://wa.me/17856433991" className="text-emerald-400 underline">+1 (785) 643-3991</a>.
            </p>
            <p className="text-[11px] text-neutral-400">
              * Vigente a partir de 2026. Documento unificado de observancia obligatoria para contrataciones y uso en todo el territorio nacional peruano.
            </p>
          </div>

          {/* Filtros de navegación rápida */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setActiveTab('todos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'todos' ? 'bg-[#0071e3] text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Ver Documento Completo
            </button>
            <button
              onClick={() => setActiveTab('terminos')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'terminos' ? 'bg-[#0071e3] text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Términos del Servicio (Ley 30096 y Código Consumidor)
            </button>
            <button
              onClick={() => setActiveTab('privacidad')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'privacidad' ? 'bg-[#0071e3] text-white shadow-md' : 'bg-white/5 text-neutral-400 hover:text-white'
              }`}
            >
              Protección de Datos (Ley 29733 / D.S. 016-2024-JUS)
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PARTE I: TÉRMINOS Y CONDICIONES DEL SERVICIO */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'terminos') && (
          <div className="space-y-8">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-emerald-400">
              <Scale className="w-5 h-5" />
              <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">
                Parte I: Términos y Condiciones del Servicio
              </h2>
            </div>

            {/* 1. Ámbito Territorial y Exclusividad Perú */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">1. Ámbito Territorial Exclusivo (República del Perú)</h3>
              <p>
                Los servicios de auditoría perimetral y blindaje web ofrecidos por <strong>DEFENSA TI</strong> y la plataforma <strong>Neuronal Gravity</strong> están destinados y prestados <strong>exclusivamente a personas naturales y personas jurídicas domiciliadas o que desarrollen actividades comerciales en la República del Perú</strong>.
              </p>
              <p>
                No realizamos prospección, venta activa ni contratación de servicios para mercados extranjeros. Todo pago, comprobante tributario y relación contractual se estructura bajo la legislación peruana y las normativas de la Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT).
              </p>
            </section>

            {/* 2. Declaración y Garantía de Autorización (Ley 30096 - Delitos Informáticos) */}
            <section id="delitos-informaticos" className="space-y-3 text-sm leading-relaxed scroll-mt-20">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>2. Declaración y Garantía de Titularidad (Ley N° 30096)</span>
              </h3>
              <p>
                En estricto cumplimiento de la <strong>Ley N° 30096 (Ley de Delitos Informáticos del Perú)</strong> y sus modificatorias:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li>
                  <strong>Declaración Bajo Juramento:</strong> Toda persona natural o jurídica que ingrese un dominio en el escáner declara y garantiza expresamente ser el propietario legítimo del dominio web ingresado, o contar con poder formal y por escrito de la empresa para someterlo a diagnóstico y remediación perimetral.
                </li>
                <li>
                  <strong>Técnica No Intrusiva:</strong> DEFENSA TI realiza análisis perimetrales externos y deterministas no intrusivos (cabeceras HTTP, certificados SSL/TLS, DNS y sondeo de puertos de transporte expuestos). <strong>Quedan prohibidas y expresamente excluidas cualquier maniobra de inyección destructiva, denegación de servicio (DDoS), interceptación o vulneración no autorizada de bases de datos.</strong>
                </li>
                <li>
                  <strong>Cláusula de Indemnidad:</strong> Si el dominio fuera ingresado por un tercero sin autorización legal, dicho usuario asumirá toda la responsabilidad penal, civil y administrativa conforme al Código Penal y la Ley N° 30096, eximiendo y manteniendo indemne a Karol Martin Castillo Rojas y a la plataforma DEFENSA TI.
                </li>
              </ul>
            </section>

            {/* 3. Definición de Planes, Precios en Soles y Tiempos de Entrega */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">3. Modalidades de Contratación y Plazos Técnicos de Entrega</h3>
              <p>
                Las tarifas se expresan preferentemente en moneda nacional (PEN / Nuevos Soles) e incluyen los siguientes alcances y plazos de ejecución técnica:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-bold text-white block text-sm">Dictamen Técnico (Gratis por Lanzamiento • Antes S/. 65)</span>
                  <p className="text-neutral-300">Diagnóstico externo no intrusivo sin acceso a claves. Entrega de informe técnico con prioridades al instante.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-bold text-white block text-sm">Blindaje Esencial (S/. 165 PEN)</span>
                  <p className="text-neutral-300">Incluye auditoría previa y remediación directa de cabeceras críticas (HSTS, CSP, X-Frame), endurecimiento de accesos y CMS estándar en <strong>3 a 5 días hábiles</strong>.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <span className="font-bold text-white block text-sm">Blindaje Total (S/. 335 PEN)</span>
                  <p className="text-neutral-300">Auditoría + Blindaje + WAF perimetral y meta técnica de Grado A en la re-evaluación final, ejecutado en <strong>5 a 7 días hábiles</strong>.</p>
                </div>
              </div>
            </section>

            {/* 4. Meta Grado A con Re-medición y Límites Técnicos del Servicio */}
            <section id="garantia" className="space-y-3 text-sm leading-relaxed scroll-mt-20">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>4. Alcance de la Garantía Grado A, Re-medición y Exclusión de Responsabilidad por Ataques Futuros</span>
              </h3>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed space-y-3">
                <p>
                  <strong>Compromiso Técnico de Meta Grado A:</strong> En los planes contratados que incluyan remediación técnica (Blindaje Llave en Mano y Blindaje Total WAF), nos comprometemos a llevar la infraestructura perimetral del cliente a la meta acordada (Grado A, 90-100 pts) al momento de la entrega. Si tras la primera remediación no se alcanza dicho Grado en el re-escaneo oficial de validación, aplicaremos las correcciones adicionales necesarias sin costo suplementario hasta certificar la meta acordada en el informe de entrega.
                </p>
                <p>
                  <strong>Naturaleza Preventiva y No Inmunidad:</strong> La ciberseguridad perimetral es una disciplina técnica de reducción objetiva de superficie de exposición y endurecimiento de cabeceras, no un escudo de inmunidad absoluta o infalible.
                </p>
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 space-y-1.5">
                  <strong className="text-white block font-semibold">Exclusión Expresa de Responsabilidad por Ataques Futuros:</strong>
                  <p>
                    DEFENSA TI y Neuronal Gravity <strong>no asumen responsabilidad civil, comercial, penal ni indemnizatoria alguna por ataques cibernéticos futuros, intrusiones, suplantaciones, brechas de datos o incidentes que ocurran en el futuro</strong> tras la entrega formal del servicio o la emisión del dictamen.
                  </p>
                  <p>
                    La seguridad informática depende de una gestión continua y activa que escapa al control de DEFENSA TI una vez finalizada la remediación perimetral.
                  </p>
                </div>
                <div className="space-y-1.5 text-neutral-300">
                  <strong className="text-white block">Responsabilidades Exclusivas del Cliente a Futuro:</strong>
                  <p>
                    Es deber y responsabilidad única del cliente en todo momento futuro:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-neutral-400">
                    <li>Mantener intactas y no remover las cabeceras defensivas inyectadas durante actualizaciones o nuevos despliegues futuros de su web.</li>
                    <li>Actualizar permanentemente su CMS (WordPress, Shopify, Magento, etc.), plugins, temas y librerías frente a vulnerabilidades de día cero (zero-day).</li>
                    <li>Renovar oportunamente sus certificados SSL/TLS y gestionar contraseñas seguras y doble factor de autenticación (2FA) para sus administradores.</li>
                    <li>Monitorear caídas o fallas de configuración de su proveedor de hosting o servidor privado.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 5. Medios de Pago y Aclaración sobre Tarjetas (Culqi) */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">5. Medios de Pago y Aclaración sobre Procesamiento de Tarjetas (Culqi)</h3>
              <p>
                Los pagos por servicios de auditoría, blindaje o donaciones pueden realizarse mediante transferencias bancarias directas, billeteras digitales (Yape / Plin) o tarjetas de crédito y débito.
              </p>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-xs text-neutral-300">
                <p>
                  <strong>Aclaración Estricta sobre Tarjetas Bancarias:</strong> <strong>DEFENSA TI / Neuronal Gravity nunca captura, almacena, procesa ni tiene acceso directamente en sus servidores a números de tarjetas de crédito o débito, fechas de vencimiento, códigos CVV ni claves bancarias de los usuarios.</strong> Toda nuestra arquitectura opera bajo el principio de cero conocimiento respecto a instrumentos financieros.
                </p>
                <p>
                  <strong>Procesamiento Externo y Delegado vía Culqi (Grupo Credicorp):</strong> Para los pagos o aportes con tarjeta de crédito o débito, la transacción es gestionada de manera <strong>100% externa y delegada</strong> por la pasarela de pagos regulada <strong>Culqi (Compañía Incubadora de Soluciones Móviles S.A.C., empresa del Grupo Credicorp en el Perú)</strong>. Culqi cuenta con la certificación internacional de seguridad <strong>PCI-DSS Nivel 1</strong>. La captura y validación de los datos de la tarjeta ocurre de forma cifrada exclusivamente en los servidores certificados de Culqi, sin que DEFENSA TI reciba ni almacene jamás dicha información confidencial.
                </p>
                <p>
                  Por cada servicio contratado se emite la constancia técnica de entrega del blindaje perimetral.
                </p>
              </div>
            </section>

            {/* 6. Libro de Reclamaciones */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>6. Libro de Reclamaciones Virtual (INDECOPI)</span>
              </h3>
              <p>
                En cumplimiento del <strong>Decreto Supremo N° 011-2011-PCM</strong> y el <strong>Código de Protección y Defensa del Consumidor (Ley N° 29571)</strong>, ponemos a disposición de todos los usuarios nuestro Libro de Reclamaciones Virtual para asentar quejas o reclamos. Toda comunicación ingresada será atendida en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong>.
              </p>
              <div className="pt-1">
                <Link
                  href="/reclamaciones"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold text-xs transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Acceder al Libro de Reclamaciones Virtual</span>
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PARTE II: POLÍTICA DE PROTECCIÓN DE DATOS PERSONALES */}
        {/* ========================================================================= */}
        {(activeTab === 'todos' || activeTab === 'privacidad') && (
          <div className="space-y-8 pt-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-sky-400">
              <Lock className="w-5 h-5" />
              <h2 className="text-xl font-extrabold uppercase tracking-wider text-white">
                Parte II: Política de Privacidad y Tratamiento de Datos Personales
              </h2>
            </div>

            {/* 1. Marco Legal Peruano */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">1. Marco Normativo Vigente</h3>
              <p>
                El tratamiento de datos personales en esta plataforma se rige conforme a la <strong>Ley N° 29733 (Ley de Protección de Datos Personales)</strong> y su <strong>Nuevo Reglamento aprobado mediante Decreto Supremo N° 016-2024-JUS</strong> (vigente desde marzo de 2025), garantizando los principios de legalidad, consentimiento previo, informado, expreso e inequívoco, finalidad, proporcionalidad y seguridad técnica.
              </p>
            </section>

            {/* 2. Banco de Datos Personales */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">2. Banco de Datos Personales</h3>
              <p>
                Los datos personales recopilados a través del sitio web, chats o formularios se incorporan en el banco de datos denominado <strong>&ldquo;Clientes y Contactos Comerciales DEFENSA TI&rdquo;</strong>, de titularidad de Karol Martin Castillo Rojas, encontrándose en proceso formal de inscripción y registro ante la Autoridad Nacional de Protección de Datos Personales (ANPDP) del Ministerio de Justicia y Derechos Humanos (MINJUS).
              </p>
            </section>

            {/* 3. Datos que Recopilamos y Datos Técnicos */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-400" />
                <span>3. Datos Recopilados y Plazos Específicos de Conservación</span>
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-300">
                <li>
                  <strong>Datos de Contacto y Cotización (Nombre, teléfono, correo):</strong> Se conservan durante el tiempo necesario para la relación comercial y hasta por un plazo máximo de <strong>2 años</strong> tras el último contacto, salvo solicitud de supresión anticipada.
                </li>
                <li>
                  <strong>Dirección IP y Registro de Escaneos Públicos:</strong> Registrados para control de abuso y limitación de tasa (rate limiting). Los resultados de escáner se almacenan en memoria caché por un máximo de <strong>24 horas</strong> y luego son depurados.
                </li>
                <li>
                  <strong>Datos Tributarios y de Facturación (DNI/RUC, Razón Social, Dirección):</strong> Se conservan durante <strong>cinco (5) años</strong> en estricto cumplimiento del Código Tributario y obligaciones ante SUNAT.
                </li>
                <li>
                  <strong>Registros del Libro de Reclamaciones:</strong> Se conservan durante <strong>dos (2) años</strong> conforme a la directiva de INDECOPI para fiscalización.
                </li>
              </ul>
            </section>

            {/* 4. Terceros Encargados y Flujo Transfronterizo */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Server className="w-4 h-4 text-emerald-400" />
                <span>4. Terceros Encargados del Tratamiento y Transferencia Transfronteriza</span>
              </h3>
              <p>
                DEFENSA TI no comercializa ni vende datos personales. Para la operatividad técnica de la plataforma, determinados datos son procesados por terceros bajo estándares estrictos de seguridad perimetral, implicando un <strong>flujo transfronterizo de datos</strong> con las siguientes entidades:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">Vercel Inc. (EE. UU.)</strong>
                  <span className="text-neutral-400">Infraestructura de hosting, CDN perimetral y entrega de la aplicación web.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">DigitalOcean LLC (EE. UU.)</strong>
                  <span className="text-neutral-400">Servidores para ejecución del motor de auditoría perimetral y proxies.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">Meta Platforms Inc. / WhatsApp (EE. UU.)</strong>
                  <span className="text-neutral-400">Canal cifrado de mensajería para coordinación de soporte y entrega.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <strong className="text-white block">Culqi / Compañía Incubadora (Perú)</strong>
                  <span className="text-neutral-400">Procesamiento seguro y certificado de pagos con tarjeta de crédito/débito.</span>
                </div>
              </div>
            </section>

            {/* 5. Privacidad en Modelos de Inteligencia Artificial */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">5. Política de Inteligencia Artificial</h3>
              <p>
                Los resúmenes y parches técnicos sugeridos se procesan mediante llamadas aisladas a modelos de lenguaje vía API empresarial. <strong>Ningún dato personal, credencial o información confidencial de clientes en Perú es utilizada para entrenar modelos públicos de inteligencia artificial.</strong>
              </p>
            </section>

            {/* 6. Derechos ARCO y Revocatoria */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>6. Ejercicio de Derechos ARCO y Revocatoria del Consentimiento</span>
              </h3>
              <p>
                El titular de los datos personales puede ejercer en cualquier momento sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición (ARCO)</strong>, así como el derecho de revocar el consentimiento previamente otorgado, sin costo alguno:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-neutral-300">
                <li>
                  Enviando una solicitud al correo oficial: <strong>castillo.karol96@gmail.com</strong> indicando en el asunto &ldquo;Ejercicio de Derechos ARCO&rdquo; y adjuntando copia simple de su DNI/RUC.
                </li>
                <li>
                  <strong>Plazos de Respuesta según D.S. 016-2024-JUS:</strong> Acceso (20 días hábiles); Rectificación, Cancelación u Oposición (10 días hábiles).
                </li>
                <li>
                  <strong>Tutela ante la Autoridad:</strong> En caso de denegatoria o disconformidad con la respuesta, el titular tiene expedito su derecho a recurrir en reclamación ante la Dirección de Protección de Datos Personales del MINJUS en Lima, Perú.
                </li>
              </ul>
            </section>

            {/* 7. Política sobre Menores de Edad */}
            <section className="space-y-3 text-sm leading-relaxed">
              <h3 className="text-base font-bold text-white">7. Usuarios Mayores de Edad</h3>
              <p>
                Los servicios de auditoría y ciberseguridad están diseñados estrictamente para empresas, negocios y mayores de 18 años con capacidad legal para contratar según el Código Civil Peruano. No recopilamos conscientemente datos de menores de edad.
              </p>
            </section>
          </div>
        )}

        {/* Pie de Página Unificado */}
        <div className="pt-8 border-t border-white/10 text-center space-y-3 text-xs text-neutral-400">
          <p>
            &copy; 2026 DEFENSA TI &bull; Neuronal Gravity &bull; RUC 10704877850 &bull; Karol Martin Castillo Rojas.
          </p>
          <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <span>&bull;</span>
            <Link href="/defensati" className="hover:text-white transition-colors text-[#38bdf8]">DEFENSA TI</Link>
            <span>&bull;</span>
            <Link href="/reclamaciones" className="hover:text-amber-300 transition-colors">Libro de Reclamaciones</Link>
          </div>
        </div>

      </main>
    </div>
  );
}
