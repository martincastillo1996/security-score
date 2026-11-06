'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import { 
  ShieldCheck, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  HelpCircle, 
  MessageSquare, 
  Check, 
  ExternalLink,
  ChevronDown,
  FileText,
  BadgeCheck,
  Eye,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function DefensatiSingleProductLanding() {
  // Estado para la Autoevaluación interactiva de 1 minuto (6 preguntas estratégicas)
  const [answers, setAnswers] = useState<Record<number, 'si' | 'no' | 'nose' | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
  });

  // Estado del Formulario Oficial de Auditoría
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    country: 'Perú',
    plan: 'Auditoría Independiente — S/ 65 (~$19 USD)',
    comments: '',
    authorized: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Preguntas de la Autoevaluación (sin cifras inventadas, con detección de malware y cierre a venta)
  const quizQuestions = [
    {
      id: 1,
      name: 'HTTPS completo',
      title: '1. ¿Tu web tiene candado seguro (HTTPS) en absolutamente todas las páginas y formularios?',
      tip: 'Si aparece "No seguro" en alguna sección o al ingresar datos, los navegadores advierten al cliente y dañan la confianza de compra.',
    },
    {
      id: 2,
      name: 'Plugins y temas',
      title: '2. ¿Has actualizado el gestor web, temas y extensiones en los últimos 30 días?',
      tip: 'Los plugins y temas desactualizados son una puerta de entrada frecuente para accesos no autorizados.',
    },
    {
      id: 3,
      name: '2FA y accesos',
      title: '3. ¿Tienes doble factor de autenticación (2FA) o límite de intentos de ingreso para administradores?',
      tip: 'Sin protección de accesos, robots automatizados pueden probar miles de contraseñas por minuto hasta ingresar.',
    },
    {
      id: 4,
      name: 'Copias externas',
      title: '4. ¿Cuentas con copias de seguridad automáticas guardadas fuera de tu proveedor de hosting?',
      tip: 'Si el servidor sufre un incidente o bloqueo, una copia guardada en el mismo alojamiento también queda inaccesible.',
    },
    {
      id: 5,
      name: 'Firewall WAF',
      title: '5. ¿Tienes un firewall de aplicaciones web (WAF) que detenga ataques antes de que toquen tu servidor?',
      tip: 'Un firewall activo filtra peticiones maliciosas, intentos de inyección y escaneos antes de que consuman recursos de tu web.',
    },
    {
      id: 6,
      name: 'Síntomas de virus',
      title: '6. ¿Notas redirecciones raras, anuncios que no pusiste o Google avisa de "Sitio peligroso"?',
      tip: 'Si respondes "Sí", tu web ya muestra síntomas de una infección o inyección de código activa.',
      isMalwareQuestion: true,
    },
  ];

  // Cálculo del resultado dinámico de la autoevaluación
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const hasActiveMalware = answers[6] === 'si';

  // Identificar qué preguntas preventivas (1 al 5) fallaron
  const failedItems: string[] = [];
  if (answers[1] === 'no' || answers[1] === 'nose') failedItems.push('HTTPS incompleto');
  if (answers[2] === 'no' || answers[2] === 'nose') failedItems.push('Plugins desactualizados');
  if (answers[3] === 'no' || answers[3] === 'nose') failedItems.push('Sin 2FA ni límite de accesos');
  if (answers[4] === 'no' || answers[4] === 'nose') failedItems.push('Sin respaldo fuera de hosting');
  if (answers[5] === 'no' || answers[5] === 'nose') failedItems.push('Sin Firewall WAF activo');

  const weakPointsCount = failedItems.length;

  // Generador de enlace para WhatsApp con datos calificados
  const getQuizWhatsAppUrl = () => {
    if (hasActiveMalware) {
      const text = `Hola Martín, hice la autoevaluación de DEFENSA TI en mi web y presenta síntomas de infección/redirecciones no deseadas. Necesito el servicio urgente de limpieza y desinfección de malware (desde $149 USD).`;
      return `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
    }
    const failuresText = failedItems.length > 0 ? failedItems.join(', ') : 'ningún punto evidente';
    const text = `Hola Martín, hice la autoevaluación de DEFENSA TI en mi web: detecté ${weakPointsCount} de 5 puntos débiles (${failuresText}). Quiero solicitar la auditoría formal de S/ 65.`;
    return `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
  };

  // Enviar formulario oficial y abrir WhatsApp
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized) return;

    setFormSubmitted(true);
    const text = `Hola Martín, deseo solicitar la auditoría DEFENSA TI para mi web:\n- Nombre: ${formData.name}\n- Web: ${formData.url}\n- Ubicación: Perú\n- Plan de interés: ${formData.plan}${formData.comments ? `\n- Comentarios: ${formData.comments}` : ''}\n- Declaración: Confirmo ser titular o contar con autorización para la auditoría.`;
    const waUrl = `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  const faqs = [
    {
      q: '¿Cómo se mide la mejora de seguridad en la auditoría?',
      a: 'Utilizamos una escala técnica estandarizada (de F a A) basada en las mejores prácticas de seguridad web (OWASP y SSL Labs). Evaluamos objetivamente la presencia de cabeceras de transporte seguro (HSTS), directivas anti-clonación (CSP, X-Frame-Options), cifrado TLS/SSL moderno y mitigación de exposición pública antes y después de nuestra intervención.',
    },
    {
      q: '¿Cómo funciona la garantía de devolución en el Blindaje Total?',
      a: 'Si tras contratar el plan Blindaje Total no logramos mejorar al menos un grado la calificación de seguridad de tu sitio en nuestra auditoría técnica independiente, te reembolsamos el 100% de lo pagado. La garantía queda por escrito en la propuesta formal y no tiene letra chica.',
    },
    {
      q: '¿Qué pasa si mi sitio web no es WordPress?',
      a: 'Auditamos y blindamos cualquier plataforma web: tiendas en Shopify, sistemas en Laravel, Node.js, Next.js, plataformas en PHP a medida o sitios con pasarelas de pago peruanas o internacionales.',
    },
    {
      q: '¿Van a necesitar las contraseñas de mi empresa?',
      a: 'Para la Auditoría Independiente (S/ 65) solo necesitamos la dirección pública de tu web; es una revisión 100% externa que no toca tu servidor. Para corregir (planes de blindaje), te solicitamos crear un usuario administrador temporal, realizamos una copia de seguridad verificada antes de tocar cualquier archivo, y al terminar te recomendamos eliminar la cuenta temporal.',
    },
    {
      q: '¿Cuánto demora la entrega del servicio?',
      a: 'La Auditoría Independiente se entrega en 48 horas laborables con llamada o nota explicativa. El Blindaje Esencial toma de 3 a 5 días hábiles y el Blindaje Total de 5 a 7 días hábiles.',
    },
    {
      q: '¿Para qué países está disponible el servicio en esta fase?',
      a: 'En esta etapa atendemos exclusivamente a negocios y empresas con sitios web en Perú, facilitando la gestión con pagos directos en Soles a través de Yape, Plin o Transferencia Bancaria (BCP / BBVA).',
    },
    {
      q: '¿El blindaje es un pago único o tengo que pagar una mensualidad?',
      a: 'Es un pago único. No hay cobros recurrentes forzosos. Dejamos tu sitio corregido, blindado y con copia de seguridad entregada. Si posteriormente requieres monitoreo periódico, se cotiza de forma opcional.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] font-sans antialiased selection:bg-[#0071e3] selection:text-white overflow-x-hidden">
      
      {/* FONDO APPLE GLASS CON NODOS NEURONALES INTERACTIVOS Y ORBES DE LUZ */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <NeuralBackground showDomains={false} />
        <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/50 to-[#000000]/90"></div>
        {/* Orbes de luz ambiental Apple Glass */}
        <div 
          className="absolute rounded-full bg-gradient-to-b from-[#0071e3]/20 via-[#7928ca]/15 to-transparent pointer-events-none" 
          style={{ top: '-180px', left: '50%', transform: 'translateX(-50%)', height: '650px', width: '900px', filter: 'blur(160px)' }}
        />
        <div 
          className="absolute rounded-full bg-[#38bdf8]/10 pointer-events-none" 
          style={{ top: '350px', left: '10%', height: '450px', width: '450px', filter: 'blur(140px)' }}
        />
      </div>

      {/* 1. NAVEGACIÓN APPLE GLASS */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur-2xl transition-all">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(0,113,227,0.35)] flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="h-full w-full rounded-[14px] bg-black flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white leading-none">DEFENSA TI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#38bdf8]">
                  BLINDAJE WEB
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">by Neuronal Gravity &bull; RUC 10704877850</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-300">
            <a href="#que-blindamos" className="hover:text-white transition-colors">Qué blindamos</a>
            <a href="#informe-muestra" className="hover:text-white transition-colors">Informe de Muestra</a>
            <a href="#autoevaluacion" className="hover:text-white transition-colors">Autoevaluación</a>
            <a href="#precios" className="hover:text-white transition-colors">Precios</a>
            <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
            <a href="#faq" className="hover:text-white transition-colors">Preguntas</a>
          </nav>

          <a
            href="#formulario"
            className="px-4 py-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,113,227,0.35)] active:scale-95"
          >
            Pedir mi auditoría — S/ 65
          </a>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-20 space-y-24">
        
        {/* 1. HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(0,113,227,0.2)]">
            <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
            <span>Auditoría Técnica y Blindaje para Sitios Web de Negocios en Perú</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-white leading-[1.08]">
            Tu web vende por ti.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#0071e3]">
              ¿Está blindada o está abierta?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Auditamos la seguridad de tu página web y corregimos cada punto débil hasta dejarla protegida. 
            Con el plan <strong>Blindaje Total</strong>, si no mejoramos la calificación de seguridad de tu sitio en al menos un grado, te devolvemos el 100% de tu dinero.
          </p>

          {/* Botones de Acción Apple Pro */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href="#precios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-extrabold text-sm shadow-[0_0_30px_rgba(0,113,227,0.4)] active:scale-98 transition-all"
            >
              <span>Ver planes — desde S/ 65 (~$19 USD)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#informe-muestra"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm backdrop-blur-xl transition-all"
            >
              <Eye className="w-4 h-4 text-[#38bdf8]" />
              <span>Ver informe de muestra</span>
            </a>
          </div>

          {/* 3 Checks de Confianza */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Garantía de mejora por escrito (Blindaje Total)
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Informe ejecutivo en lenguaje claro
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Entrega en 48 horas laborables
            </span>
          </div>

          {/* Badge de Enfoque Perú */}
          <div className="pt-2 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300">
              <span className="font-semibold text-white">🇵🇪 Servicio disponible en Perú:</span>
              <span>Cobros directos en Soles con Yape, Plin y Transferencia BCP / BBVA</span>
            </div>
          </div>
        </section>

        {/* 2. POR QUÉ BLINDAR (3 TARJETAS DE DOLOR REAL - SIN DATOS INFLADOS) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">Riesgos Reales en Negocios</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Muchos negocios descubren que su web está vulnerable cuando ya ocurrió el incidente
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-rose-500/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">1. Inyecciones silenciosas de código y redirecciones</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Modificaciones de código invisibles redirigen a tus prospectos hacia enlaces no deseados o alteran tus formularios. El visitante percibe el sitio como inseguro y abandona la compra.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-amber-500/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Bloqueo o advertencias disuasorias en el navegador</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Navegadores y motores de búsqueda despliegan advertencias rojas ante configuraciones defectuosas, dañando de forma inmediata la reputación del negocio y deteniendo las consultas.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-[#38bdf8]/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/20 text-[#38bdf8] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Exposición de datos y falta de cabeceras de privacidad</h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Consultas comerciales, correos y pedidos transmitidos sin cabeceras defensivas ni certificados robustos, exponiendo la privacidad conforme a la normativa peruana (Ley 29733).
              </p>
            </div>
          </div>
        </section>

        {/* 3. QUÉ REVISAMOS Y CORREGIMOS PUNTO POR PUNTO */}
        <section id="que-blindamos" className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Alcance Técnico Transparente</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Qué revisamos y corregimos en tu web, punto por punto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Conexión y Certificado (HTTPS / TLS)</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Verificamos que todo el tráfico viaje cifrado con protocolos modernos (TLSv1.3), renovaciones automáticas activas y sin contenidos mixtos que rompan el candado seguro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cabeceras Defensivas HTTP (OWASP)</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Implementamos HSTS estricto, X-Frame-Options (anti-clonación en iframes), Content-Security-Policy y directivas que impiden que terceros roben la identidad de tu marca.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Software, Temas y Plugins al Día</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Actualización segura de componentes de WordPress y extensiones con respaldo previo, eliminando módulos abandonados o con vulnerabilidades documentadas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Accesos y Contraseñas Protegidas</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Configuración de doble factor (2FA), límite de intentos fallidos contra ataques automatizados y eliminación de usuarios administradores antiguos o sospechosos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Firewall Web (WAF) Activo</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Bloqueo de bots maliciosos, escaneos automáticos de vulnerabilidades y peticiones sospechosas en el perímetro antes de que logren tocar los recursos de tu servidor.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-[#38bdf8] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Copias de Seguridad Verificadas</span>
              </div>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Automatización de respaldos externos fuera del hosting, comprobando que el archivo realmente pueda restaurar tu web si ocurre cualquier desastre técnico.
              </p>
            </div>
          </div>
        </section>

        {/* 4. SECCIÓN DESTACADA: INFORME DE MUESTRA (ALTA CONVERSIÓN & TRANSPARENCIA) */}
        <section id="informe-muestra" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DOCUMENTO DE MUESTRA REAL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Así luce el Informe Ejecutivo que recibes
            </h2>
            <p className="text-xs text-neutral-300">
              Sin tecnicismos incomprensibles. Un dictamen claro con el antes y el después, evidencia de cada prueba y acciones ejecutadas.
            </p>
          </div>

          {/* Tarjeta de Informe de Muestra Apple Dark Glass */}
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#141416]/90 backdrop-blur-2xl border border-white/15 shadow-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
            
            {/* Marca de Agua "EJEMPLO / MUESTRA" */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-neutral-400 text-[10px] font-mono tracking-widest uppercase font-bold">
              EJEMPLO / MUESTRA
            </div>

            {/* Cabecera del Informe */}
            <div className="border-b border-white/10 pb-6 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#0071e3]/20 flex items-center justify-center text-[#38bdf8]">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    Dictamen Técnico de Seguridad & Blindaje Web
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    Sitio Evaluado: empresa-ejemplo.pe &bull; Plataforma: WordPress / WooCommerce &bull; Fecha: Noviembre 2026
                  </p>
                </div>
              </div>
            </div>

            {/* Comparativa Visual Antes vs Después */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Antes */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold">
                  Diagnóstico Inicial (Antes de corregir)
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black font-mono text-rose-400">Grado F</span>
                  <span className="text-xs text-neutral-400">(28 / 100)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  5 vulnerabilidades críticas: Sin HSTS, versión de WordPress visible a atacantes, cabeceras anti-clonación ausentes y formulario de pago expuesto.
                </p>
              </div>

              {/* Después */}
              <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  Resultado Tras Blindaje Total
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-black font-mono text-emerald-400">Grado A</span>
                  <span className="text-xs text-neutral-400">(94 / 100)</span>
                </div>
                <p className="text-xs text-neutral-300 leading-snug">
                  Blindaje completo aplicado: HSTS precargado, CSP implementada, cabeceras de servidor ocultadas y respaldo exterior verificado.
                </p>
              </div>
            </div>

            {/* Tabla de Puntos Auditados en el Informe */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block">
                Comprobaciones Verificadas en el Dictamen:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Strict-Transport-Security (HSTS)</strong>
                    <span className="text-neutral-400">Cifrado forzado a nivel de navegador (max-age=63072000).</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Content-Security-Policy (CSP)</strong>
                    <span className="text-neutral-400">Protección activa contra robo de credenciales e inyecciones XSS.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Anti-Clonación (X-Frame-Options)</strong>
                    <span className="text-neutral-400">Bloquea que terceros monten tu tienda en iframes para estafar.</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Ocultación de Versiones de Software</strong>
                    <span className="text-neutral-400">Retira cabeceras X-Powered-By y versiones de plugins visibles.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Firma y Sello de Auditoría */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-[#38bdf8]" />
                <span>Auditado y firmado por: <strong>Martin Castillo</strong> &bull; DEFENSA TI</span>
              </div>
              <a
                href="#formulario"
                className="inline-flex items-center gap-1.5 text-[#38bdf8] hover:text-white font-semibold transition-colors"
              >
                <span>Solicitar la auditoría para mi web</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* TRANSPARENCIA EN ACCESOS */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-[#0071e3]/30 space-y-4 text-left">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <Lock className="w-6 h-6 text-[#38bdf8]" />
            <span>¿Van a necesitar las contraseñas de mi empresa?</span>
          </div>
          <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed space-y-2 font-normal">
            <p>
              <strong>Para la Auditoría Independiente (S/ 65 / ~$19 USD):</strong> Solo requerimos la dirección pública de tu web. Es una revisión 100% externa que no toca tu sitio ni solicita credenciales.
            </p>
            <p>
              <strong>Para corregir y blindar tu sitio:</strong> Aplicamos este protocolo transparente:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-300 text-xs">
              <li>Te pedimos crear una cuenta temporal con los permisos estrictamente necesarios, nunca tu cuenta principal.</li>
              <li>Antes de modificar cualquier archivo, realizamos una copia de seguridad verificada.</li>
              <li>Cada cambio ejecutado queda documentado en el informe de entrega.</li>
              <li>Al finalizar el trabajo, te recomendamos eliminar esa cuenta temporal y renovar contraseñas.</li>
              <li>No almacenamos contraseñas fuera del trabajo ni las compartimos con terceros.</li>
            </ul>
          </div>
        </section>

        {/* 5. AUTOEVALUACIÓN INTERACTIVA DE 1 MINUTO */}
        <section id="autoevaluacion" className="space-y-8 p-6 sm:p-12 rounded-3xl bg-[#141416]/85 backdrop-blur-xl border border-white/15">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-bold tracking-wide">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TEST DE VULNERABILIDAD RÁPIDO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Autoevaluación de seguridad de tu web (1 minuto)
            </h2>
            <p className="text-xs text-neutral-300">
              Responde con sinceridad estas 6 preguntas para calcular de inmediato qué tan expuesto está tu negocio y recibir tu recomendación técnica.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono">
              <span className="text-neutral-400">Progreso:</span>
              <span className={`font-bold ${answeredCount === 6 ? 'text-emerald-400' : 'text-[#38bdf8]'}`}>
                {answeredCount} de 6 preguntas respondidas
              </span>
            </div>
          </div>

          {/* Lista de Preguntas */}
          <div className="space-y-4 max-w-3xl mx-auto">
            {quizQuestions.map((q) => {
              const isMalware = q.isMalwareQuestion;
              return (
                <div 
                  key={q.id} 
                  className={`p-5 rounded-2xl border space-y-2.5 text-left transition-all ${
                    isMalware 
                      ? 'bg-rose-950/15 border-rose-500/30' 
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-bold ${isMalware ? 'text-rose-200' : 'text-white'}`}>
                      {q.title}
                    </p>
                    {isMalware && (
                      <span className="shrink-0 px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        Síntoma Crítico
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-400">{q.tip}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {(['si', 'no', 'nose'] as const).map((opt) => {
                      const isSelected = answers[q.id] === opt;
                      let activeClass = 'bg-white/10 text-neutral-300 hover:bg-white/15 hover:text-white';
                      if (isSelected) {
                        if (isMalware) {
                          activeClass = opt === 'si' 
                            ? 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]' 
                            : 'bg-emerald-600 text-white font-bold';
                        } else {
                          activeClass = opt === 'si'
                            ? 'bg-[#0071e3] text-white font-bold shadow-[0_0_15px_rgba(0,113,227,0.4)]'
                            : 'bg-rose-500 text-white font-bold';
                        }
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeClass}`}
                        >
                          {opt === 'si' ? '✓ Sí' : opt === 'no' ? '✗ No' : '? No sé'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* TARJETA DINÁMICA DE RESULTADO & CIERRE A LA VENTA */}
          <div className="max-w-3xl mx-auto pt-2">
            {answeredCount === 0 ? (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-xs text-neutral-400">
                Selecciona una opción en las preguntas arriba para calcular el nivel de riesgo de tu sitio web.
              </div>
            ) : hasActiveMalware ? (
              /* CASO 1: VIRUS O REDIRECCIONES DETECTADAS (VENTA DE LIMPIEZA DESDE $149) */
              <div className="p-7 sm:p-9 rounded-3xl bg-rose-950/30 border-2 border-rose-500 shadow-2xl shadow-rose-950/50 text-center space-y-5 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold">
                  <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>ALERTA CRÍTICA: SÍNTOMAS DE INFECCIÓN ACTIVA</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    Tu web requiere Desinfección y Limpieza Forense Urgente
                  </h3>
                  <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed max-w-xl mx-auto">
                    Redirecciones extrañas, anuncios no autorizados o avisos de Google indican que atacantes ya alteraron archivos en tu servidor. 
                    En este estado no requieres una auditoría preventiva, sino una <strong>limpieza y desinfección forense inmediata</strong> para frenar el daño comercial.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-sm shadow-xl shadow-rose-600/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Solicitar Desinfección Urgente (Desde $149 USD)</span>
                  </a>

                  <a
                    href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20tengo%20dudas%20sobre%20si%20mi%20web%20est%C3%A1%20infectada"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all"
                  >
                    <span>Consultar caso por WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : weakPointsCount > 0 ? (
              /* CASO 2: TIENE PUNTOS DÉBILES PREVENTIVOS (VENTA AUDITORÍA S/ 65) */
              <div className="p-7 sm:p-9 rounded-3xl bg-[#101422] border-2 border-[#0071e3] shadow-2xl shadow-[#0071e3]/20 text-center space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-mono font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>DIAGNÓSTICO ORIENTATIVO PRELIMINAR</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {weakPointsCount >= 3 ? 'Riesgo Alto de Exposición:' : 'Riesgo Moderado:'}{' '}
                    <span className="text-[#38bdf8]">{weakPointsCount} de 5 puntos débiles detectados</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    Tu sitio presenta brechas de configuración que facilitan ataques automatizados y ponen en riesgo tus pedidos o datos.
                  </p>
                </div>

                {/* Chips de puntos débiles identificados */}
                <div className="flex flex-wrap items-center justify-center gap-2 max-w-lg mx-auto">
                  {failedItems.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-medium">
                      ✗ {item}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-extrabold text-sm shadow-xl shadow-[#0071e3]/30 transition-all active:scale-95 cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Auditar mi web por S/ 65 (~$19 USD)</span>
                  </a>

                  <Link
                    href="/defensati"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all"
                  >
                    <span>O prueba el escáner gratuito en vivo →</span>
                  </Link>
                </div>
              </div>
            ) : answeredCount === 6 ? (
              /* CASO 3: TODO SÍ (AVISO ORIENTATIVO LEGAL SIN AFIRMAR QUE ES 100% INVIOLABLE) */
              <div className="p-7 sm:p-9 rounded-3xl bg-emerald-950/20 border border-emerald-500/40 text-center space-y-5 animate-in fade-in duration-300">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>ESTADO PRELIMINAR FAVORABLE</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    No detectamos riesgos evidentes en estas áreas evaluadas
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-xl mx-auto">
                    Has respondido favorablemente a las 5 preguntas preventivas. No obstante, recuerda que esta autoevaluación es orientativa: 
                    una auditoría técnica externa confirma el estado real de puertos, cabeceras de seguridad y cifrado profundo de tu servidor.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-all cursor-pointer"
                  >
                    <span>Confirmar con Auditoría Técnica — S/ 65</span>
                  </a>

                  <Link
                    href="/defensati"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold transition-all"
                  >
                    <span>Comprobar con escáner en vivo (/defensati) →</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 text-center text-xs text-neutral-400">
                Responde las {6 - answeredCount} pregunta(s) restante(s) para calcular el nivel de riesgo de tu web.
              </div>
            )}
          </div>
        </section>

        {/* 6. PRECIOS Y PLANES (DECISIONES DEL DUEÑO: SOLES PRINCIPAL, USD REFERENCIA) */}
        <section id="precios" className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Tarifas Transparentes & Pago Único</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Planes de Auditoría y Blindaje Web
            </h2>
            <p className="text-xs text-neutral-300">
              Precios fijos en Soles para Perú (Yape, Plin y transferencia bancaria). Sin mensualidades forzosas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* PLAN 1 */}
            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Paso 1: Diagnóstico</span>
                <h3 className="text-xl font-bold text-white">Auditoría Independiente</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 65</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$19 USD &bull; Pago 100% por adelantado</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Revisión externa completa de seguridad, dictamen de grado (de F a A) con evidencia, lista de fallas ordenada por riesgo y recomendaciones de corrección.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Informe ejecutivo completo en PDF</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Llamada breve para explicar los hallazgos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 48 horas laborables</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Auditoría Independiente — S/ 65 (~$19 USD)' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Pedir Auditoría — S/ 65
              </a>
            </div>

            {/* PLAN 2 (EL MÁS PEDIDO) */}
            <div className="p-7 rounded-3xl bg-gradient-to-b from-[#101b2a] via-[#141416] to-[#0c0e14] border-2 border-[#0071e3] shadow-2xl shadow-[#0071e3]/20 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0071e3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                El más pedido
              </div>
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">Protección Esencial</span>
                <h3 className="text-xl font-bold text-white">Blindaje Esencial</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 165</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$49 USD &bull; Pago 100% por adelantado</div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                  Todo lo de la Auditoría, más la corrección de fallas críticas y medias para dejar tu web blindada contra vulnerabilidades frecuentes.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Todo lo incluido en la Auditoría</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cabeceras HTTP de seguridad y HTTPS reforzado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Actualización segura de web, tema y extensiones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Endurecimiento de accesos (2FA y límites de ingreso)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 3 a 5 días hábiles</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Esencial — S/ 165 (~$49 USD)' })}
                className="w-full py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-black text-center block transition-all shadow-lg shadow-[#0071e3]/30"
              >
                Elegir Blindaje Esencial — S/ 165
              </a>
            </div>

            {/* PLAN 3 */}
            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Blindaje Integral</span>
                <h3 className="text-xl font-bold text-white">Blindaje Total</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 335</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$99 USD &bull; 50% al empezar, 50% al entregar</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Configuración completa de seguridad, firewall perimetral (WAF), copias de seguridad externas y re-medición con garantía de mejora por escrito.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Todo lo del Blindaje Esencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Firewall de aplicaciones web (WAF) configurado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Copias de seguridad externas automáticas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <strong className="text-white">Garantía de mejora de al menos 1 grado o devolución 100%</strong>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 5 a 7 días hábiles</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Total — S/ 335 (~$99 USD)' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Elegir Blindaje Total — S/ 335
              </a>
            </div>
          </div>

          {/* AVISO IMPORTANTE: SITIOS INFECTADOS */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed">
            <strong className="text-white">¿Tu web ya tiene un virus o envía spam en este momento?</strong> La limpieza y desinfección forense de sitios web previamente infectados se cotiza de forma independiente desde $149 USD (o equivalente en soles) tras un diagnóstico técnico.
          </div>
        </section>

        {/* 7. GARANTÍA POR ESCRITO (EXCLUSIVA DEL PLAN TOTAL) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-[#0071e3]/40 text-center max-w-3xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-[#0071e3]/20 text-[#38bdf8] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Garantía Exclusiva del Plan Blindaje Total</h3>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
            En el plan <strong>Blindaje Total</strong> trabajamos con un compromiso medible: si tras aplicar las correcciones técnicas no logramos subir al menos un grado la calificación de seguridad de tu web en nuestra auditoría independiente, te devolvemos el 100% de tu dinero. Todo estipulado con claridad en la propuesta formal.
          </p>
        </section>

        {/* 8. CÓMO TRABAJAMOS EN 5 PASOS */}
        <section id="proceso" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Metodología Clara</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cómo trabajamos en 5 pasos sencillos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">01</span>
              <h4 className="text-sm font-bold text-white">Nos das tu web</h4>
              <p className="text-xs text-neutral-300">Solo la dirección de tu página y tu WhatsApp. No pedimos contraseñas.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">02</span>
              <h4 className="text-sm font-bold text-white">Auditoría y Nota</h4>
              <p className="text-xs text-neutral-300">Auditoría pasiva de cabeceras HTTP, SSL/TLS y directivas OWASP.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">03</span>
              <h4 className="text-sm font-bold text-white">Propuesta cerrada</h4>
              <p className="text-xs text-neutral-300">Precio fijo sin sorpresas ni mensualidades obligatorias.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">04</span>
              <h4 className="text-sm font-bold text-white">Blindaje</h4>
              <p className="text-xs text-neutral-300">Copia de seguridad previa y corrección técnica de cada falla detectada.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">05</span>
              <h4 className="text-sm font-bold text-white">Verificación final</h4>
              <p className="text-xs text-neutral-300">Re-medición con informe de entrega y cierre de accesos temporales.</p>
            </div>
          </div>
        </section>

        {/* 9. PREGUNTAS FRECUENTES (FAQ) */}
        <section id="faq" className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Respuestas Directas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${faqOpen === i ? 'rotate-180 text-[#38bdf8]' : 'text-neutral-400'}`} />
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-5 text-xs text-neutral-200 leading-relaxed font-normal border-t border-white/5 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 10. FORMULARIO OFICIAL CON CASILLA DE AUTORIZACIÓN OBLIGATORIA */}
        <section id="formulario" className="max-w-3xl mx-auto space-y-8 p-8 sm:p-12 rounded-3xl bg-[#141416]/90 backdrop-blur-xl border border-white/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Solicitud Formal</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pide tu auditoría DEFENSA TI
            </h2>
            <p className="text-xs text-neutral-300">
              Completa los datos mínimos para coordinar tu informe técnico directamente por WhatsApp.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">¡Solicitud recibida!</h3>
              <p className="text-xs text-neutral-200">
                Se está abriendo tu WhatsApp para coordinar directamente con Martín Castillo. Si no abrió, pulsa el botón de abajo:
              </p>
              <a
                href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martín, acabo de enviar el formulario para ${formData.url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir WhatsApp (+1 (785) 643-3991)</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Tu Nombre o Nombre de Contacto *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Carlos Mendoza"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Dirección Web a Auditar *</label>
                  <input
                    type="text"
                    required
                    placeholder="tutienda.com o www.empresa.pe"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Ubicación del Negocio</label>
                  <input
                    type="text"
                    readOnly
                    value="Perú (Cobro en Soles / Yape / Plin / Transferencia)"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-neutral-300 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Plan de Interés Inicial *</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option value="Auditoría Independiente — S/ 65 (~$19 USD)">Auditoría Independiente — S/ 65 (~$19 USD)</option>
                    <option value="Blindaje Esencial — S/ 165 (~$49 USD)">Blindaje Esencial — S/ 165 (~$49 USD)</option>
                    <option value="Blindaje Total — S/ 335 (~$99 USD)">Blindaje Total — S/ 335 (~$99 USD)</option>
                    <option value="Desinfección de Malware (Desde $149 USD)">Sitio con Virus / Desinfección (Desde $149 USD)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Comentarios o Síntomas Notados (Opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Ej: Aparecen advertencias en el navegador, o sospecho que la pasarela no está protegida..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              {/* CASILLA OBLIGATORIA DE AUTORIZACIÓN LEGAL */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="auth-check"
                  required
                  checked={formData.authorized}
                  onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-neutral-600 text-[#0071e3] focus:ring-[#0071e3] cursor-pointer"
                />
                <label htmlFor="auth-check" className="text-xs text-neutral-300 leading-snug cursor-pointer">
                  <strong className="text-white">Autorización Expresa:</strong> Declaro ser titular de este sitio web o contar con autorización formal para que se audite su seguridad conforme a la <Link href="/privacidad" className="text-[#38bdf8] underline hover:text-white">Política de Privacidad</Link> y los <Link href="/terminos" className="text-[#38bdf8] underline hover:text-white">Términos del Servicio</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={!formData.authorized}
                className="w-full py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(0,113,227,0.35)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enviar y Continuar por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-400 pt-1">
                Atención directa por WhatsApp al <strong>+1 (785) 643-3991</strong> &bull; Lunes a Sábado de 9:00 a 20:00 (Hora Perú)
              </div>
            </form>
          )}
        </section>

        {/* 11. BLOQUE DEL FUNDADOR */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 text-left max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Atención Directa</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Detrás de DEFENSA TI hay una persona, no un call center
          </h3>
          <p className="text-sm text-neutral-200 leading-relaxed font-normal">
            Mi nombre es <strong>Martin Castillo</strong>. Lidero la arquitectura de seguridad y auditoría en DEFENSA TI (Neuronal Gravity). 
            Cada informe y cada remediación técnica se revisa personalmente con rigor de ingeniería, entregándote dictámenes en lenguaje claro y asegurando que tu negocio opere protegido sin sorpresas.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://wa.me/17856433991"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Conversar con Martín por WhatsApp (+1 (785) 643-3991)</span>
            </a>
            <a
              href="https://github.com/martincastillo1996/security-score"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 text-xs font-semibold transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Código Abierto del Auditor en GitHub</span>
            </a>
          </div>
        </section>
      </main>

      {/* 12. PIE DE PÁGINA PROFESIONAL CON DATOS FISCALES REALES */}
      <footer className="border-t border-white/10 bg-black/90 py-12 relative z-10 text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight">DEFENSA TI</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Servicio de Auditoría y Blindaje Web &bull; RUC con Negocio: <strong>10704877850</strong> &bull; Lima, Perú
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos del Servicio</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad (Ley 29733)</Link>
              <Link href="/defensati" className="hover:text-white transition-colors text-[#38bdf8]">Escáner Perimetral</Link>
              <a href="https://wa.me/17856433991" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp (+1 (785) 643-3991)</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} DEFENSA TI &bull; Neuronal Gravity. Comprobante de pago disponible (Boleta y Factura Electrónica).
            </p>
            <p className="text-neutral-400">
              ¿Necesitas otra solución técnica o desarrollo a medida? <a href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20busco%20desarrollo%20a%20medida" target="_blank" rel="noopener noreferrer" className="text-[#38bdf8] underline hover:text-white">Escríbenos a WhatsApp</a>
            </p>
          </div>
        </div>
      </footer>

      {/* Orbe Flotante Interactivo: Consultar con Neuronal Gravity AI */}
      <AiConsultantWidget />
    </div>
  );
}
