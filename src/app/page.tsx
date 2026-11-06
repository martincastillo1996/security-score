'use client';

import React, { useState } from 'react';
import Link from 'next/link';
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
  ChevronDown
} from 'lucide-react';

export default function DefensatiSingleProductLanding() {
  // Estado para la Autoevaluación interactiva de 1 minuto (5 preguntas)
  const [answers, setAnswers] = useState<Record<number, 'si' | 'no' | 'nose' | null>>({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });

  // Estado del Formulario Oficial de Auditoría
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    country: 'Perú',
    plan: 'Auditoría Independiente — S/ 65 ($19 USD)',
    comments: '',
    authorized: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Preguntas de la Autoevaluación
  const quizQuestions = [
    {
      id: 1,
      title: '1. ¿Tu web tiene candado seguro (HTTPS) en absolutamente todas las páginas y formularios?',
      tip: 'Si aparece "No seguro" en alguna sección o al ingresar datos, Google y los navegadores alertan al cliente.',
    },
    {
      id: 2,
      title: '2. ¿Has actualizado WordPress, temas o plugins en los últimos 30 días?',
      tip: 'Más del 80% de los ataques a webs de pymes ocurren por plugins con vulnerabilidades públicas conocidas.',
    },
    {
      id: 3,
      title: '3. ¿Tienes doble factor de autenticación (2FA) o límite de intentos de ingreso para administradores?',
      tip: 'Sin límite de intentos, robots automatizados pueden probar miles de contraseñas por minuto hasta entrar.',
    },
    {
      id: 4,
      title: '4. ¿Cuentas con copias de seguridad automáticas guardadas fuera de tu proveedor de hosting?',
      tip: 'Si tu servidor sufre un ataque o falla el disco, la copia dentro del mismo hosting también se destruye.',
    },
    {
      id: 5,
      title: '5. ¿Tienes un firewall de aplicaciones web (WAF) que bloquee ataques antes de que toquen tu servidor?',
      tip: 'Un firewall activo detiene inyecciones SQL, escaneos maliciosos y bots de scraping en el perímetro.',
    },
  ];

  // Cálculo del resultado orientativo
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const noOrNoseCount = Object.values(answers).filter((v) => v === 'no' || v === 'nose').length;

  const getQuizGrade = () => {
    if (answeredCount === 0) return null;
    if (noOrNoseCount === 0) return { grade: 'A', label: 'Riesgo Bajo Estimado', color: 'text-emerald-400', bg: 'border-emerald-500/40 bg-emerald-950/20' };
    if (noOrNoseCount <= 2) return { grade: 'B', label: 'Riesgo Moderado (Requiere Atención)', color: 'text-amber-400', bg: 'border-amber-500/40 bg-amber-950/20' };
    return { grade: 'D / F', label: 'Riesgo Crítico de Exposición', color: 'text-rose-400', bg: 'border-rose-500/40 bg-rose-950/20' };
  };

  const quizResult = getQuizGrade();

  // Generador de enlace para WhatsApp de la Autoevaluación
  const getQuizWhatsAppUrl = () => {
    const text = `Hola Martín, realicé la autoevaluación de DEFENSA TI en mi web.\nResultado orientativo: ${quizResult?.grade || 'Evaluación'} (${quizResult?.label || ''}).\nRespondí que no/no sé en ${noOrNoseCount} de 5 puntos. Quiero cotizar la auditoría formal.`;
    return `https://wa.me/51987010380?text=${encodeURIComponent(text)}`;
  };

  // Enviar formulario oficial y abrir WhatsApp
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized) return;

    setFormSubmitted(true);
    const text = `Hola Martín, deseo solicitar la auditoría DEFENSA TI para mi web:\n- Nombre: ${formData.name}\n- Web: ${formData.url}\n- País: ${formData.country}\n- Plan de interés: ${formData.plan}${formData.comments ? `\n- Comentarios: ${formData.comments}` : ''}\n- Declaración: Confirmo ser titular o contar con autorización para la auditoría.`;
    const waUrl = `https://wa.me/51987010380?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 1000);
  };

  const faqs = [
    {
      q: '¿Qué significa exactamente alcanzar Grado A+?',
      a: 'Es la máxima calificación técnica en estándares internacionales de transporte seguro (RFC / OWASP). Significa que tu web cuenta con certificado SSL/TLS moderno, cabeceras contra clonación (HSTS, CSP, X-Frame-Options) y ningún puerto administrativo crítico expuesto a internet.',
    },
    {
      q: '¿Cómo funciona la garantía de devolución?',
      a: 'Si tras contratar el blindaje no logramos mejorar al menos un grado la nota de seguridad de tu sitio en nuestra auditoría independiente, te reembolsamos el 100% de lo pagado. Trabajamos con precio fijo y sin letra chica.',
    },
    {
      q: '¿Qué pasa si mi sitio web no es WordPress?',
      a: 'Auditamos y blindamos cualquier plataforma web: tiendas en Shopify, sistemas en Laravel, Node.js, Next.js, plataformas en PHP a medida o tiendas con pasarelas de pago como Mercado Pago, Niubiz o Stripe.',
    },
    {
      q: '¿Van a necesitar las contraseñas de mi empresa?',
      a: 'Para la Auditoría (S/ 65) solo necesitamos la dirección de tu web; es una revisión externa que no toca tu servidor. Para corregir (planes de blindaje), te pedimos crear un usuario administrador temporal, hacemos copia de seguridad antes de tocar nada y al terminar te recomendamos eliminar la cuenta y cambiar contraseñas.',
    },
    {
      q: '¿Cuánto demora la entrega del servicio?',
      a: 'La Auditoría Independiente se entrega en 48 horas laborables con llamada explicativa. El Blindaje Esencial toma de 3 a 5 días hábiles y el Blindaje Total de 5 a 7 días hábiles.',
    },
    {
      q: '¿Atienden negocios fuera de Perú?',
      a: 'Sí. Atendemos de forma remota a empresas en México, Colombia, Chile, Ecuador, Bolivia, Argentina y toda Latinoamérica con coordinación directa por WhatsApp y entrega de dictámenes ejecutivos.',
    },
    {
      q: '¿El blindaje es un pago único o tengo que pagar una mensualidad?',
      a: 'Es un pago único. No hay mensualidades forzosas. Dejamos tu web corregida, protegida y con copia de seguridad entregada. Si más adelante deseas monitoreo mensual continuo, se cotiza de forma opcional.',
    },
  ];

  return (
    <div className="relative min-h-screen bg-black text-[#f5f5f7] font-sans antialiased selection:bg-[#0071e3] selection:text-white">
      
      {/* 1. NAVEGACIÓN ESTRICTA DE UN SOLO PRODUCTO */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-2xl">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(0,113,227,0.4)] flex items-center justify-center">
              <div className="h-full w-full rounded-[14px] bg-black flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white leading-none">DEFENSA TI</span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  BLINDAJE WEB
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">by Neuronal Gravity &bull; RUC 10704877850</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-300">
            <a href="#que-blindamos" className="hover:text-white transition-colors">Qué blindamos</a>
            <a href="#autoevaluacion" className="hover:text-white transition-colors">Autoevaluación</a>
            <a href="#precios" className="hover:text-white transition-colors">Precios</a>
            <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
            <a href="#faq" className="hover:text-white transition-colors">Preguntas</a>
          </nav>

          <a
            href="#formulario"
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-95"
          >
            Pedir mi auditoría — S/ 65 ($19)
          </a>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-6xl mx-auto px-6 py-12 sm:py-20 space-y-24">
        
        {/* 1. HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 relative">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Blindaje Técnico y Auditoría para Sitios Web de Negocios</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-white leading-[1.08]">
            Tu web vende por ti.{' '}
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-[#38bdf8] to-blue-400">
              ¿Está blindada o está abierta?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Auditamos la seguridad de tu página web y corregimos cada punto débil hasta dejarla protegida. 
            Con el plan <strong>Blindaje Total</strong>, si no mejoramos la calificación de seguridad de tu sitio, te devolvemos el 100% de lo pagado.
          </p>

          {/* Botones de Acción */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href="#precios"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm shadow-[0_0_35px_rgba(16,185,129,0.4)] active:scale-98 transition-all"
            >
              <span>Ver planes — desde S/ 65 ($19 USD)</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#autoevaluacion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Evaluar mi web en 1 minuto</span>
            </a>
          </div>

          {/* 3 Checks de Confianza */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Garantía de mejora por escrito
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Informe claro sin tecnicismos
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Respuesta en menos de 24 h laborables
            </span>
          </div>

          {/* Chips de Países Atendidos */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2 text-[11px] text-neutral-400">
            <span className="font-semibold text-neutral-300">Atención remota a negocios en:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white">🇵🇪 Perú</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">🇲🇽 México</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">🇨🇴 Colombia</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">🇨🇱 Chile</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-300">LatAm</span>
          </div>
        </section>

        {/* 2. POR QUÉ BLINDAR (3 TARJETAS DE DOLOR REAL) */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">Riesgos Reales en Negocios</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Muchos negocios se enteran de que su web está vulnerable cuando ya es tarde
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-7 rounded-3xl bg-[#120d10] border border-rose-500/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">1. La web reparte virus o spam sin que te des cuenta</h3>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Inyecciones de código silenciosas agregan enlaces ocultos o redirigen a tus clientes a páginas de apuestas. El dueño no lo nota, pero los visitantes y los antivirus sí.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#12100d] border border-amber-500/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">2. Google marca tu página como &quot;Sitio peligroso&quot;</h3>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Una pantalla roja bloquea a cualquier persona que intente entrar. Las ventas caen a cero de inmediato y salir de la lista negra de Google toma semanas si no se corrigen las fallas.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-[#0d1218] border border-[#38bdf8]/30 space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 text-[#38bdf8] flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">3. Datos de clientes y pedidos expuestos</h3>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Formularios de contacto, correos o comprobantes interceptados por falta de cabeceras defensivas y cifrado SSL robusto, violando normativas de privacidad como la Ley 29733.
              </p>
            </div>
          </div>
        </section>

        {/* 3. QUÉ REVISAMOS Y CORREGIMOS PUNTO POR PUNTO */}
        <section id="que-blindamos" className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Alcance Técnico Transparente</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Qué revisamos y corregimos en tu web, punto por punto
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Conexión y Certificado (HTTPS / TLS)</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Verificamos que todo el tráfico viaje cifrado con protocolos modernos (TLSv1.3), renovaciones automáticas activas y sin contenidos mixtos que rompan el candado seguro.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Cabeceras Defensivas HTTP (OWASP)</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Implementamos HSTS estricto, X-Frame-Options (anti-clonación en iframes), Content-Security-Policy y directivas que impiden que terceros roben la identidad de tu marca.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Software, Temas y Plugins al Día</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Actualización segura de componentes de WordPress y extensiones con respaldo previo, eliminando módulos abandonados o con vulnerabilidades documentadas.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Accesos y Contraseñas Protegidas</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Configuración de doble factor (2FA), límite de intentos fallidos contra ataques de fuerza bruta y eliminación de usuarios administradores antiguos o sospechosos.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Firewall Web (WAF) Activo</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Bloqueo de bots maliciosos, escaneos automáticos de hackers y peticiones sospechosas en el perímetro antes de que logren tocar los recursos de tu servidor.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#0e1118] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Copias de Seguridad Verificadas</span>
              </div>
              <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                Automatización de respaldos externos fuera del hosting, comprobando que el archivo realmente pueda restaurar tu web si ocurre cualquier desastre técnico.
              </p>
            </div>
          </div>
        </section>

        {/* TRANSPARENCIA EN ACCESOS (SECCIÓN DESTACADA) */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0f1422] border border-blue-500/30 space-y-4 text-left">
          <div className="flex items-center gap-3 text-white font-bold text-lg">
            <Lock className="w-6 h-6 text-[#38bdf8]" />
            <span>¿Van a necesitar las contraseñas de mi empresa?</span>
          </div>
          <div className="text-xs sm:text-sm text-neutral-200 leading-relaxed space-y-2 font-normal">
            <p>
              <strong>Para la Auditoría Independiente (S/ 65 / $19):</strong> Solo necesitamos la dirección pública de tu web. Es una revisión 100% externa que no toca tu sitio ni pide claves.
            </p>
            <p>
              <strong>Para corregir y blindar tu sitio:</strong> Aplicamos este protocolo transparente:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-neutral-300 text-xs">
              <li>Te pedimos crear una cuenta temporal con los permisos mínimos necesarios, no tu cuenta personal ni principal.</li>
              <li>Antes de tocar cualquier archivo, hacemos una copia de seguridad verificada.</li>
              <li>Cada cambio realizado queda registrado en el informe de entrega.</li>
              <li>Al finalizar el trabajo, cerramos o eliminamos esa cuenta y te recomendamos cambiar tus claves.</li>
              <li>No guardamos contraseñas fuera del trabajo ni las compartimos con terceros.</li>
            </ul>
          </div>
        </section>

        {/* 4. AUTOEVALUACIÓN INTERACTIVA DE 1 MINUTO */}
        <section id="autoevaluacion" className="space-y-8 p-8 sm:p-12 rounded-3xl bg-linear-to-b from-[#101422] via-[#0b0e17] to-black border border-white/15">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Diagnóstico Rápido</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Autoevaluación de seguridad de tu web (1 minuto)
            </h2>
            <p className="text-xs text-neutral-300">
              Responde con sinceridad estas 5 preguntas para estimar de forma orientativa qué tan expuesto está tu negocio.
            </p>
          </div>

          <div className="space-y-4 max-w-3xl mx-auto">
            {quizQuestions.map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5 text-left">
                <p className="text-sm font-bold text-white">{q.title}</p>
                <p className="text-[11px] text-neutral-400">{q.tip}</p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {(['si', 'no', 'nose'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                      className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        answers[q.id] === opt
                          ? opt === 'si'
                            ? 'bg-emerald-500 text-black font-bold'
                            : 'bg-rose-500 text-white font-bold'
                          : 'bg-white/10 text-neutral-300 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {opt === 'si' ? '✓ Sí' : opt === 'no' ? '✗ No' : '? No sé'}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Resultado de la Autoevaluación */}
          {quizResult && (
            <div className={`p-6 rounded-2xl border text-center max-w-2xl mx-auto space-y-4 ${quizResult.bg}`}>
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Resultado Orientativo Preliminar:</span>
                <div className={`text-4xl font-black font-mono ${quizResult.color}`}>{quizResult.grade}</div>
                <p className="text-sm font-bold text-white">{quizResult.label}</p>
                <p className="text-xs text-neutral-300">
                  Respondiste {noOrNoseCount} punto(s) en No o No sé. Esto es una estimación orientativa basada en tus respuestas.
                </p>
              </div>

              <a
                href={getQuizWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Consultar por WhatsApp con este resultado</span>
              </a>
            </div>
          )}
        </section>

        {/* 5. PRECIOS Y PLANES (DECISIONES DEL DUEÑO: SOLES PRINCIPAL, USD REFERENCIA) */}
        <section id="precios" className="space-y-10">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Tarifas Transparentes & Pago Único</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Planes de Auditoría y Blindaje Web
            </h2>
            <p className="text-xs text-neutral-300">
              Precios fijos en Soles para Perú (Yape, Plin y transferencia bancaria). Sin mensualidades escondidas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* PLAN 1 */}
            <div className="p-7 rounded-3xl bg-[#0e1118] border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Paso 1: Diagnóstico</span>
                <h3 className="text-xl font-bold text-white">Auditoría Independiente</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 65</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$19 USD &bull; Pago 100% por adelantado</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Escaneo completo de seguridad, nota actual (de F a A+) con evidencia, lista de fallas ordenada por riesgo y plan de corrección paso a paso.
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
                onClick={() => setFormData({ ...formData, plan: 'Auditoría Independiente — S/ 65 ($19 USD)' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Pedir Auditoría — S/ 65
              </a>
            </div>

            {/* PLAN 2 (EL MÁS PEDIDO) */}
            <div className="p-7 rounded-3xl bg-linear-to-b from-[#101b2a] via-[#0d1420] to-[#080d14] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/20 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-black uppercase tracking-wider">
                El más pedido
              </div>
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Protección Esencial</span>
                <h3 className="text-xl font-bold text-white">Blindaje Esencial</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 165</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$49 USD &bull; Pago 100% por adelantado</div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                  Todo lo de la Auditoría, más la corrección de fallas críticas y altas para dejar tu web blindada contra ataques frecuentes.
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
                    <span>Actualización segura de web, tema y plugins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Endurecimiento de accesos (2FA y límites)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 3 a 5 días hábiles</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Esencial — S/ 165 ($49 USD)' })}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-black text-center block transition-all shadow-lg shadow-emerald-500/30"
              >
                Elegir Blindaje Esencial — S/ 165
              </a>
            </div>

            {/* PLAN 3 */}
            <div className="p-7 rounded-3xl bg-[#0e1118] border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Blindaje Máximo</span>
                <h3 className="text-xl font-bold text-white">Blindaje Total</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 335</div>
                  <div className="text-xs text-neutral-400">Referencia: ~$99 USD &bull; 50% al empezar, 50% al entregar</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Configuración completa de seguridad, firewall de aplicaciones web (WAF), copias de seguridad comprobables y re-medición verificada.
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
                    <span>Garantía de mejora de calificación por escrito</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 5 a 7 días hábiles</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Total — S/ 335 ($99 USD)' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Elegir Blindaje Total — S/ 335
              </a>
            </div>
          </div>

          {/* AVISO IMPORTANTE: SITIOS INFECTADOS */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300 max-w-3xl mx-auto text-center leading-relaxed">
            <strong className="text-white">¿Tu web ya tiene un virus o envía spam en este momento?</strong> La limpieza y desinfección forense de sitios web infectados se cotiza de forma independiente desde $149 USD (o equivalente en soles) tras un diagnóstico previo.
          </div>
        </section>

        {/* 6. GARANTÍA POR ESCRITO */}
        <section className="p-8 sm:p-10 rounded-3xl bg-linear-to-b from-[#121c16] to-[#090f0c] border border-emerald-500/40 text-center max-w-3xl mx-auto space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white">Garantía de Mejora Efectiva por Escrito</h3>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
            En los planes de blindaje de DEFENSA TI trabajamos con un objetivo claro: si tras aplicar las correcciones no logramos subir al menos un grado la calificación de seguridad de tu web en nuestra auditoría independiente, te devolvemos el 100% de tu dinero. Todo queda por escrito en la propuesta formal.
          </p>
        </section>

        {/* 7. CÓMO TRABAJAMOS EN 5 PASOS */}
        <section id="proceso" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Metodología Clara</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cómo trabajamos en 5 pasos sencillos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-[#0e1118] border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-emerald-400">01</span>
              <h4 className="text-sm font-bold text-white">Nos das tu web</h4>
              <p className="text-xs text-neutral-300">Solo la dirección de tu página y tu WhatsApp. No pedimos contraseñas.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1118] border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-emerald-400">02</span>
              <h4 className="text-sm font-bold text-white">Auditoría y Nota</h4>
              <p className="text-xs text-neutral-300">Escaneamos puertos, SSL y cabeceras OWASP entregando tu grado de F a A+.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1118] border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-emerald-400">03</span>
              <h4 className="text-sm font-bold text-white">Propuesta cerrada</h4>
              <p className="text-xs text-neutral-300">Precio fijo sin sorpresas ni mensualidades escondidas.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1118] border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-emerald-400">04</span>
              <h4 className="text-sm font-bold text-white">Blindaje</h4>
              <p className="text-xs text-neutral-300">Copia de seguridad previa y corrección técnica de cada falla detectada.</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#0e1118] border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-emerald-400">05</span>
              <h4 className="text-sm font-bold text-white">Verificación final</h4>
              <p className="text-xs text-neutral-300">Re-medición con informe de entrega y cierre de accesos temporales.</p>
            </div>
          </div>
        </section>

        {/* 8. PREGUNTAS FRECUENTES (FAQ) */}
        <section id="faq" className="space-y-8 max-w-3xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Respuestas Directas</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3 text-left">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${faqOpen === i ? 'rotate-180 text-emerald-400' : 'text-neutral-400'}`} />
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

        {/* 9. FORMULARIO OFICIAL CON CASILLA DE AUTORIZACIÓN OBLIGATORIA */}
        <section id="formulario" className="max-w-3xl mx-auto space-y-8 p-8 sm:p-12 rounded-3xl bg-[#0e1118] border border-white/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Solicitud Formal</span>
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
                href={`https://wa.me/51987010380?text=${encodeURIComponent(`Hola Martín, acabo de enviar el formulario para ${formData.url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir WhatsApp (+51 987 010 380)</span>
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
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
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">País de tu Negocio *</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Perú">Perú (Cobro en Soles / Yape / Plin / BCP)</option>
                    <option value="México">México</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Chile">Chile</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Otro país de LatAm">Otro país de Latinoamérica</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Plan de Interés Inicial *</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-400"
                  >
                    <option value="Auditoría Independiente — S/ 65 ($19 USD)">Auditoría Independiente — S/ 65 ($19 USD)</option>
                    <option value="Blindaje Esencial — S/ 165 ($49 USD)">Blindaje Esencial — S/ 165 ($49 USD)</option>
                    <option value="Blindaje Total — S/ 335 ($99 USD)">Blindaje Total — S/ 335 ($99 USD)</option>
                    <option value="Desinfección de Malware (Desde $149 USD)">Sitio con Virus / Desinfección (Desde $149 USD)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Comentarios o Síntomas Notados (Opcional)</label>
                <textarea
                  rows={3}
                  placeholder="Ej: Google me mostró una advertencia, o mis clientes reportan que la pasarela falla..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-400"
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
                  className="mt-1 h-4 w-4 rounded border-neutral-600 text-emerald-500 focus:ring-emerald-400 cursor-pointer"
                />
                <label htmlFor="auth-check" className="text-xs text-neutral-300 leading-snug cursor-pointer">
                  <strong className="text-white">Autorización Expresa:</strong> Declaro ser titular de este sitio web o contar con autorización formal para que se audite su seguridad conforme a la <Link href="/privacidad" className="text-emerald-400 underline hover:text-white">Política de Privacidad</Link> y los <Link href="/terminos" className="text-emerald-400 underline hover:text-white">Términos del Servicio</Link>.
                </label>
              </div>

              <button
                type="submit"
                disabled={!formData.authorized}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed text-black font-extrabold text-sm transition-all shadow-[0_0_25px_rgba(16,185,129,0.3)] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Enviar y Continuar por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-400 pt-1">
                Atención directa por WhatsApp al <strong>+51 987 010 380</strong> &bull; Lunes a Sábado de 9:00 a 20:00 (Hora Perú)
              </div>
            </form>
          )}
        </section>

        {/* 10. BLOQUE DEL FUNDADOR */}
        <section className="p-8 sm:p-12 rounded-3xl bg-[#0c0e14] border border-white/10 text-left max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">Atención Directa</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Detrás de DEFENSA TI hay una persona, no un call center
          </h3>
          <p className="text-sm text-neutral-200 leading-relaxed font-normal">
            Mi nombre es <strong>Martin Castillo</strong>. Lidero la arquitectura de seguridad y auditoría en DEFENSA TI (Neuronal Gravity). 
            Cada informe y cada corrección técnica se revisa personalmente con rigor de ingeniería, explicándote los resultados en lenguaje claro y asegurando que tu negocio opere protegido sin sorpresas.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://wa.me/51987010380"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 text-xs font-bold transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Conversar con Martín por WhatsApp</span>
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

      {/* 11. PIE DE PÁGINA PROFESIONAL CON DATOS FISCALES REALES */}
      <footer className="border-t border-white/10 bg-black py-12 relative z-10 text-xs text-neutral-400">
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
              <Link href="/defensati" className="hover:text-white transition-colors text-emerald-400">Escáner Perimetral</Link>
              <a href="https://wa.me/51987010380" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp (+51 987 010 380)</a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} DEFENSA TI &bull; Neuronal Gravity. Comprobante de pago disponible (Boleta y Factura Electrónica).
            </p>
            <p className="text-neutral-400">
              ¿Necesitas otra solución técnica o desarrollo a medida? <a href="https://wa.me/51987010380?text=Hola%20Mart%C3%ADn,%20busco%20desarrollo%20a%20medida" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-white">Escríbenos a WhatsApp</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
