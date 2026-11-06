'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import FounderProfileCard from '@/components/FounderProfileCard';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  MessageSquare, 
  Check, 
  ChevronDown,
  Eye,
  AlertTriangle,
  Gift
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
    whatsapp: '',
    country: 'Perú',
    plan: 'Auditoría desde S/ 65 / $19, es el plan básico',
    comments: '',
    authorized: false,
    noLiabilityAccepted: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  // Preguntas de la Autoevaluación (5 preguntas exactas según encargo)
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
      tip: 'Los plugins y temas desactualizados son una puerta de entrada frecuente para accesos no autorizados en cualquier plataforma.',
    },
    {
      id: 3,
      name: 'Acceso seguro',
      title: '3. ¿Tu panel de administración tiene segundo factor (2FA) o límite de intentos fallidos?',
      tip: 'Sin protección contra fuerza bruta, robots automatizados pueden probar miles de contraseñas por minuto hasta ingresar.',
    },
    {
      id: 4,
      name: 'Copias de respaldo',
      title: '4. ¿Cuentas con copias de seguridad automáticas almacenadas fuera de tu propio hosting?',
      tip: 'Si tu servidor sufre un incidente y las copias están en el mismo lugar, podrías perder la información completa de tu negocio.',
    },
    {
      id: 5,
      name: 'Síntomas sospechosos / Redirecciones',
      title: '5. ¿Has notado redirecciones extrañas, avisos de "sitio peligroso", spam o lentitud inexplicable?',
      tip: 'Las redirecciones no autorizadas o avisos del navegador indican que el sitio requiere limpieza como parte del blindaje.',
      isMalwareQuestion: true,
    },
  ];

  // Cálculo de respuestas
  const answeredCount = Object.values(answers).filter((v) => v !== null).length;
  const hasActiveMalware = answers[5] === 'si';

  // Puntuación: 'si' suma 20 puntos, 'no' o 'nose' 0 puntos
  let score = 0;
  const failedItems: string[] = [];
  if (answers[1] === 'si') score += 20; else if (answers[1] !== null) failedItems.push('HTTPS incompleto');
  if (answers[2] === 'si') score += 20; else if (answers[2] !== null) failedItems.push('Plugins/temas desactualizados');
  if (answers[3] === 'si') score += 20; else if (answers[3] !== null) failedItems.push('Sin 2FA ni límite de accesos');
  if (answers[4] === 'si') score += 20; else if (answers[4] !== null) failedItems.push('Sin respaldo fuera de hosting');
  if (answers[5] === 'no') score += 20; else if (answers[5] === 'si' || answers[5] === 'nose') failedItems.push('Síntomas de redirección o sospecha de infección');

  // Asignación de Calificación separando D y F
  let grade = 'F';
  if (score >= 90) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';
  else if (score >= 30) grade = 'D';
  else grade = 'F';

  // Generador de enlace para WhatsApp con datos calificados
  const getQuizWhatsAppUrl = () => {
    if (hasActiveMalware) {
      const text = `Hola Martín, hice la autoevaluación de DEFENSA TI en mi web y presenta síntomas de redirecciones extrañas o aviso de sitio peligroso. Necesito el servicio de blindaje con limpieza incluida.`;
      return `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
    }
    const failuresText = failedItems.length > 0 ? failedItems.join(', ') : 'ningún riesgo evidente en estas 5 áreas';
    const text = `Hola Martín, hice la autoevaluación de DEFENSA TI en mi web: obtuve Nota ${score}/100 (Grado ${grade}) con ${failedItems.length} puntos observados (${failuresText}). Quiero pedir mi auditoría por WhatsApp - S/ 65.`;
    return `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
  };

  // Enviar formulario oficial y abrir WhatsApp
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.authorized || !formData.noLiabilityAccepted) return;

    setFormSubmitted(true);
    const quizSummary = answeredCount > 0 ? `\n- Resultado Autoevaluación: Nota ${score}/100 (Grado ${grade})` : '';
    const text = `Hola Martín, deseo solicitar la auditoría DEFENSA TI para mi web:\n- Nombre: ${formData.name}\n- Web: ${formData.url}\n- WhatsApp: ${formData.whatsapp}\n- Ubicación: Perú\n- Plan: ${formData.plan}${quizSummary}${formData.comments ? `\n- Comentarios: ${formData.comments}` : ''}\n- He marcado la autorización del titular y aceptado los Términos y Condiciones con el límite legal de responsabilidad.`;
    const waUrl = `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  const faqs = [
    {
      q: '¿Cómo funciona la garantía a Grado A?',
      a: 'Trabajamos para llevar tu web a Grado A en la evaluación final del blindaje contratado. Este es un servicio informativo y preventivo: la auditoría y el blindaje informan y previenen, no garantizan seguridad absoluta ni que no habrá ataques futuros. La garantía cubre solo el trabajo de blindaje realizado y entregado, dentro de su alcance. Martín / DEFENSA TI no se hace responsable por ataques futuros, vulnerabilidades nuevas, fallas del hosting o de proveedores, ni por lo que el cliente haga o deje de hacer después del blindaje. Desde la entrega, el cliente es responsable de mantener sus actualizaciones al día, proteger y no compartir sus accesos, cambiar las contraseñas entregadas y conservar copias de seguridad vigentes. Modificar el sitio, instalar código, plugins o temas sin revisión, o no mantenerlo, deja la garantía sin efecto sobre lo modificado.',
    },
    {
      q: '¿Qué plataformas cubre DEFENSA TI?',
      a: 'DEFENSA TI cubre todas las páginas y todas las plataformas: WordPress, Wix, Shopify, tiendas en línea, sistemas a medida en PHP, Laravel, Node.js, Next.js y cualquier sitio web con pasarelas de pago o formularios.',
    },
    {
      q: '¿El servicio incluye mensualidades o monitoreo periódico?',
      a: 'No. No hay monitoreo mensual ni mensualidades forzosas. Son únicamente 3 planes de pago único cerrados: Auditoría (desde S/ 65 / $19), Blindaje Esencial (S/ 165 / $49, precio total ya incluye Auditoría) y Blindaje Total (S/ 335 / $99, precio total ya incluye Auditoría y Esencial).',
    },
    {
      q: '¿Cómo se maneja si mi sitio web fue hackeado o tiene virus?',
      a: 'La limpieza de código malicioso no se vende como plan con precio aparte: se realiza como parte del blindaje cuando el sitio lo necesita para restaurar su operatividad.',
    },
    {
      q: '¿Cuáles son los medios de pago y plazos de entrega?',
      a: 'Aceptamos Yape, Plin y transferencia bancaria (BCP / BBVA e interbancaria). En USD solo donde ya se ofrece para fuera de Perú, sin cambiar la moneda de los precios en soles. Plazos: Auditoría en 48 horas laborables; Blindaje Esencial en 3 a 5 días; Blindaje Total en 5 a 7 días.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <NeuralBackground showDomains={false} />
      </div>

      {/* CABECERA APPLE PRO GLASS */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1px] shadow-[0_0_15px_rgba(0,113,227,0.4)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.6)] transition-all">
              <div className="w-full h-full bg-[#0a0d14] rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#38bdf8]" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#38bdf8] transition-colors">
                DEFENSA TI
              </span>
              <span className="text-[10px] text-neutral-400 font-mono mt-0.5 block">
                DEFENSA TI es el servicio de seguridad web de Neuronal Gravity &bull; RUC 10704877850
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-300 font-medium">
            <a href="#gancho-gratis" className="text-emerald-400 hover:text-white transition-colors">Beneficios Gratis</a>
            <a href="#planes" className="hover:text-white transition-colors">3 Precios</a>
            <a href="#autoevaluacion" className="hover:text-white transition-colors">Autoevaluación</a>
            <a href="#proceso" className="hover:text-white transition-colors">Proceso</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          <a
            href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20pedir%20mi%20auditor%C3%ADa%20por%20WhatsApp%20-%20S/%2065"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-md"
          >
            Pedir mi auditoría por WhatsApp - S/ 65
          </a>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 sm:py-20 space-y-24">
        
        {/* 1. HERO SECTION */}
        <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-bold tracking-wide shadow-[0_0_20px_rgba(0,113,227,0.2)]">
            <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
            <span>Auditoría Técnica y Blindaje para Sitios Web en Todo el Perú</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.03em] text-white leading-[1.08]">
            Tu web vende por ti.{' '}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-white to-[#0071e3]">
              ¿Está blindada o está abierta?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 font-normal leading-relaxed max-w-2xl mx-auto">
            Auditamos la seguridad de tu página web y corregimos cada punto débil hasta dejarla protegida. Meta: llevar tu web a Grado A en la evaluación final del blindaje contratado.
          </p>

          {/* Único Botón Principal de la Página: Pedir mi auditoría por WhatsApp - S/ 65 */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
            <a
              href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20quiero%20pedir%20mi%20auditor%C3%ADa%20por%20WhatsApp%20-%20S/%2065"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white font-extrabold text-sm shadow-[0_0_30px_rgba(0,113,227,0.4)] active:scale-98 transition-all"
            >
              <span>Pedir mi auditoría por WhatsApp - S/ 65</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <Link
              href="/defensati/informe-ejemplo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm backdrop-blur-xl transition-all"
            >
              <Eye className="w-4 h-4 text-[#38bdf8]" />
              <span>Ver informe de muestra</span>
            </Link>
          </div>

          {/* 3 Checks de Confianza */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-300">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Meta: llegar a Grado A con límite legal
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Informe ejecutivo en lenguaje de negocio
            </span>
            <span className="text-neutral-600 hidden sm:inline">&bull;</span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Entrega en 48 horas laborables
            </span>
          </div>
        </section>

        {/* 2. GANCHO GRATIS PRIMERO: DOS BENEFICIOS DISTINTOS (OBLIGATORIO ANTES DE LOS PRECIOS) */}
        <section id="gancho-gratis" className="p-8 sm:p-10 rounded-3xl bg-linear-to-b from-[#0e1724] to-[#121620] border-2 border-emerald-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>BENEFICIOS 100% GRATIS DISPONIBLES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Comprueba el estado de tu web sin pagar nada por adelantado
            </h2>
            <p className="text-xs text-neutral-300">
              Aprovecha dos beneficios gratuitos distintos antes de decidir cualquier contratación:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Beneficio 1 */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-[#0071e3]/20 text-[#38bdf8] text-[10px] font-mono font-bold uppercase">Beneficio 1</span>
                <h3 className="text-lg font-bold text-white">Escaneo y Autoevaluación Gratis</h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Realiza un test interactivo de 1 minuto o ejecuta el escáner perimetral de código abierto para identificar de inmediato qué cabeceras de seguridad y cifrados le faltan a tu sitio.
                </p>
              </div>
              <div className="pt-2">
                <a
                  href="#autoevaluacion"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#38bdf8] hover:text-white transition-colors"
                >
                  <span>Hacer Autoevaluación de 1 minuto abajo ↓</span>
                </a>
              </div>
            </div>

            {/* Beneficio 2 */}
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold uppercase">Beneficio 2</span>
                <h3 className="text-lg font-bold text-white">PDF Forense de Diagnóstico Gratis</h3>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Recibe un informe preliminar en formato PDF formal con el puntaje de cabeceras de tu dominio, totalmente gratis hasta la fecha límite confirmada.
                </p>
                <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
                  📅 Vigencia confirmada: <strong>PDF gratis hasta el lunes 30 de noviembre de 2026</strong>.
                </div>
              </div>
              <div className="pt-2">
                <Link
                  href="/defensati/escaner"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-white transition-colors"
                >
                  <span>Abrir Escáner y generar PDF gratis →</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SOLO 3 PRECIOS, NADA MÁS, SOLO PAGO ÚNICO (DESPUÉS DE LO GRATIS) */}
        <section id="planes" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Tarifas Transparentes & Solo Pago Único</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Solo 3 Precios Totales &bull; Sin Mensualidades
            </h2>
            <p className="text-xs text-neutral-300">
              Auditoría desde S/ 65 / $19, es el plan básico. Blindaje Esencial S/ 165 / $49, precio total, ya incluye la Auditoría. Blindaje Total S/ 335 / $99, precio total, ya incluye la Auditoría y el Blindaje Esencial. Los 3 precios son totales, no se suman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            
            {/* PLAN 1 */}
            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Paso 1: Diagnóstico Básico</span>
                <h3 className="text-xl font-bold text-white">Auditoría</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">Desde S/ 65</div>
                  <div className="text-xs text-neutral-400">Referencia: $19 USD &bull; Plazo: 48 horas laborables &bull; Pago 100% adelantado</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Auditoría desde S/ 65 / $19, es el plan básico desde el que se parte. Diagnóstico externo no intrusivo sin pedir contraseñas.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Informe técnico ejecutivo en PDF en lenguaje de negocio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Llamada breve para explicar los hallazgos y prioridades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 48 horas laborables</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Auditoría desde S/ 65 / $19, es el plan básico' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Pedir Auditoría — S/ 65
              </a>
            </div>

            {/* PLAN 2 (EL MÁS PEDIDO) */}
            <div className="p-7 rounded-3xl bg-linear-to-b from-[#101b2a] via-[#141416] to-[#0c0e14] border-2 border-[#0071e3] shadow-2xl shadow-[#0071e3]/20 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#0071e3] text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                El más pedido
              </div>
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#38bdf8]">Corrección de Configuración</span>
                <h3 className="text-xl font-bold text-white">Blindaje Esencial</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 165</div>
                  <div className="text-xs text-neutral-400">Referencia: $49 USD &bull; Plazo: 3 a 5 días &bull; Pago 100% adelantado</div>
                </div>
                <p className="text-xs text-neutral-200 leading-relaxed font-normal">
                  Blindaje Esencial S/ 165 / $49, precio total, ya incluye la Auditoría previa. Corrige fallas críticas y medias.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Todo lo incluido en la Auditoría</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cabeceras HTTP de seguridad estrictas (HSTS, CSP)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Actualización segura en cualquier plataforma (WordPress, Wix, Shopify o a medida)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Endurecimiento de accesos y contraseñas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 3 a 5 días laborables</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Esencial S/ 165 / $49, precio total, ya incluye la Auditoría' })}
                className="w-full py-3.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-black text-center block transition-all shadow-lg shadow-[#0071e3]/30"
              >
                Elegir Blindaje Esencial — S/ 165
              </a>
            </div>

            {/* PLAN 3 */}
            <div className="p-7 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-white/15 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Protección Completa & Re-medición</span>
                <h3 className="text-xl font-bold text-white">Blindaje Total</h3>
                <div className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">S/ 335</div>
                  <div className="text-xs text-neutral-400">Referencia: $99 USD &bull; Plazo: 5 a 7 días &bull; 50% al empezar y 50% al entregar</div>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                  Blindaje Total S/ 335 / $99, precio total, ya incluye la Auditoría y el Blindaje Esencial. Corrección completa y re-medición independiente.
                </p>
                <ul className="space-y-2 text-xs text-neutral-200 border-t border-white/10 pt-4">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Todo lo de la Auditoría y el Blindaje Esencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Corrección completa y configuración avanzada de WAF perimetral</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Re-medición final certificada tras la implementación</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Meta: llegar a Grado A con límite legal de responsabilidad</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Entrega en 5 a 7 días laborables</span>
                  </li>
                </ul>
              </div>

              <a
                href="#formulario"
                onClick={() => setFormData({ ...formData, plan: 'Blindaje Total S/ 335 / $99, precio total, ya incluye la Auditoría y el Blindaje Esencial' })}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold text-center block transition-all"
              >
                Elegir Blindaje Total — S/ 335
              </a>
            </div>

          </div>
        </section>

        {/* 4. GARANTÍA A GRADO A CON TEXTO LEGAL OBLIGATORIO */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#141416]/80 backdrop-blur-xl border border-emerald-500/30 text-left max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3 text-emerald-400 font-bold text-lg">
            <ShieldCheck className="w-6 h-6 shrink-0" />
            <span>Garantía a Grado A con Límite Legal</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-mono p-4 rounded-2xl bg-black/40 border border-white/10">
            &ldquo;Trabajamos para llevar tu web a Grado A en la evaluación final del blindaje contratado. Este es un servicio informativo y preventivo: la auditoría y el blindaje informan y previenen, no garantizan seguridad absoluta ni que no habrá ataques futuros. La garantía cubre solo el trabajo de blindaje realizado y entregado, dentro de su alcance. Martín / DEFENSA TI no se hace responsable por ataques futuros, vulnerabilidades nuevas, fallas del hosting o de proveedores, ni por lo que el cliente haga o deje de hacer después del blindaje. Desde la entrega, el cliente es responsable de mantener sus actualizaciones al día, proteger y no compartir sus accesos, cambiar las contraseñas entregadas y conservar copias de seguridad vigentes. Modificar el sitio, instalar código, plugins o temas sin revisión, o no mantenerlo, deja la garantía sin efecto sobre lo modificado.&rdquo;
          </p>
        </section>

        {/* 5. AUTOEVALUACIÓN INTERACTIVA DE 1 MINUTO (5 PREGUNTAS CON D Y F SEPARADOS) */}
        <section id="autoevaluacion" className="space-y-8 p-6 sm:p-12 rounded-3xl bg-[#141416]/85 backdrop-blur-xl border border-white/15">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-[#38bdf8] text-xs font-bold tracking-wide">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>TEST DE VULNERABILIDAD RÁPIDO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Audita tu web en 1 minuto
            </h2>
            <p className="text-xs text-neutral-300">
              Responde estas 5 preguntas para calcular de inmediato qué tan expuesto está tu negocio y recibir tu recomendación técnica.
            </p>
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono">
              <span className="text-neutral-400">Progreso:</span>
              <span className={`font-bold ${answeredCount === 5 ? 'text-emerald-400' : 'text-[#38bdf8]'}`}>
                {answeredCount} de 5 preguntas respondidas
              </span>
            </div>
          </div>

          {/* Tabla de Umbrales Visible */}
          <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-black/40 border border-white/10 text-xs">
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2 font-mono">Tabla de Umbrales de Calificación:</span>
            <div className="grid grid-cols-5 gap-2 text-center font-mono">
              <div className="p-2 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <span className="font-bold block">Grado A</span>
                <span className="text-[10px]">90 - 100 pts</span>
              </div>
              <div className="p-2 rounded bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <span className="font-bold block">Grado B</span>
                <span className="text-[10px]">70 - 89 pts</span>
              </div>
              <div className="p-2 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <span className="font-bold block">Grado C</span>
                <span className="text-[10px]">50 - 69 pts</span>
              </div>
              <div className="p-2 rounded bg-orange-500/10 border border-orange-500/30 text-orange-400">
                <span className="font-bold block">Grado D</span>
                <span className="text-[10px]">30 - 49 pts</span>
              </div>
              <div className="p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-400">
                <span className="font-bold block">Grado F</span>
                <span className="text-[10px]">0 - 29 pts</span>
              </div>
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
                            : 'bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]';
                        } else {
                          activeClass = opt === 'si'
                            ? 'bg-emerald-600 text-white font-bold shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                            : 'bg-rose-600 text-white font-bold shadow-[0_0_15px_rgba(225,29,72,0.5)]';
                        }
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                          className={`px-4 py-2 rounded-xl text-xs transition-all font-medium cursor-pointer ${activeClass}`}
                        >
                          {opt === 'si' ? 'Sí, confirmado' : opt === 'no' ? 'No / No lo sé' : 'Tengo dudas'}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resultado de la Autoevaluación */}
          {answeredCount > 0 && (
            <div className="max-w-2xl mx-auto pt-4 space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-center">
                Respondiste {answeredCount} de 5 pregunta(s) &bull; Puntaje acumulado: <strong>{score} de 100 puntos</strong> &bull; Calificación estimada: <strong className="text-white text-sm">Grado {grade}</strong>
              </div>

              {hasActiveMalware ? (
                <div className="p-6 rounded-2xl bg-rose-950/30 border border-rose-500/40 text-center space-y-3">
                  <AlertTriangle className="w-8 h-8 text-rose-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Síntomas de Infección o Redirecciones Detectados</h3>
                  <p className="text-xs text-neutral-300">
                    Tu sitio presenta indicios de compromiso o redirecciones. La limpieza de código malicioso se realiza como parte del blindaje técnico para restaurar tu web.
                  </p>
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Consultar Blindaje con Limpieza por WhatsApp</span>
                  </a>
                </div>
              ) : answeredCount === 5 && score === 100 ? (
                <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h3 className="text-xl font-bold text-white">Estado Preliminar Favorable (Grado A)</h3>
                  <p className="text-xs text-neutral-300">
                    No detectamos riesgos evidentes en estas 5 áreas; la auditoría técnica confirma el resto de cabeceras y cifrados profundos.
                  </p>
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold transition-all"
                  >
                    <span>Confirmar con Auditoría Técnica — S/ 65</span>
                  </a>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-[#101422] border-2 border-[#0071e3] text-center space-y-3">
                  <h3 className="text-xl font-bold text-white">Calificación Estimada: Grado {grade} ({score}/100)</h3>
                  <p className="text-xs text-neutral-300">
                    Se detectaron {failedItems.length} puntos observados. Se recomienda ejecutar el diagnóstico técnico formal en 48 horas laborables.
                  </p>
                  <a
                    href={getQuizWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Pedir mi auditoría por WhatsApp - S/ 65</span>
                  </a>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 6. CÓMO TRABAJAMOS EN 5 PASOS (#proceso con tiempos, qué haces tú y botón S/ 65) */}
        <section id="proceso" className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Metodología Clara</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cómo trabajamos en 5 pasos sencillos
            </h2>
            <p className="text-xs text-neutral-300">
              Tiempos exactos, responsabilidades delimitadas y sin sorpresas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Paso 1 */}
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">01</span>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">Tiempo: Inmediato</span>
              <h4 className="text-sm font-bold text-white">Nos das tu web</h4>
              <p className="text-xs text-neutral-300">
                Para la auditoría no pedimos contraseñas. Para el blindaje, solo una cuenta temporal con permisos mínimos, nunca tu contraseña principal, y se cierra al terminar.
              </p>
              <div className="text-[11px] text-[#38bdf8] pt-1">
                <strong>Qué tienes que hacer tú:</strong> Solo indicarnos la URL de tu página y tu número de WhatsApp.
              </div>
            </div>

            {/* Paso 2 */}
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">02</span>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">Tiempo: 48 horas</span>
              <h4 className="text-sm font-bold text-white">Auditoría y Nota</h4>
              <p className="text-xs text-neutral-300">
                Traducimos el lenguaje técnico a riesgos de negocio. Recibes un informe completo en PDF y coordinamos una llamada breve explicativa.
              </p>
              <div className="text-[11px] text-[#38bdf8] pt-1">
                <strong>Qué tienes que hacer tú:</strong> Revisar el informe en PDF y atender una breve llamada de 10 minutos.
              </div>
            </div>

            {/* Paso 3 */}
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">03</span>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">Tiempo: Inmediato</span>
              <h4 className="text-sm font-bold text-white">Propuesta cerrada</h4>
              <p className="text-xs text-neutral-300">
                Precio fijo total sin mensualidades ni costes ocultos. Solo pagos únicos.
              </p>
              <div className="text-[11px] text-[#38bdf8] pt-1">
                <strong>Qué tienes que hacer tú:</strong> Confirmar si deseas aplicar la corrección por tu cuenta o delegarla a DEFENSA TI.
              </div>
            </div>

            {/* Paso 4 */}
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">04</span>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">Tiempo: 3 a 7 días</span>
              <h4 className="text-sm font-bold text-white">Blindaje</h4>
              <p className="text-xs text-neutral-300">
                Copia de seguridad previa. Esencial corrige fallas críticas y medias; la corrección completa es solo de Blindaje Total.
              </p>
              <div className="text-[11px] text-[#38bdf8] pt-1">
                <strong>Qué tienes que hacer tú:</strong> Habilitar el usuario temporal con permisos mínimos para el trabajo.
              </div>
            </div>

            {/* Paso 5 */}
            <div className="p-5 rounded-2xl bg-[#141416]/80 backdrop-blur-xl border border-white/10 space-y-2 text-left">
              <span className="text-2xl font-black font-mono text-[#38bdf8]">05</span>
              <span className="text-[10px] font-mono text-neutral-400 block uppercase">Tiempo: Cierre formal</span>
              <h4 className="text-sm font-bold text-white">Verificación final</h4>
              <p className="text-xs text-neutral-300">
                Re-medición técnica independiente. Meta: llegar a Grado A con el límite legal de responsabilidad.
              </p>
              <div className="text-[11px] text-[#38bdf8] pt-1">
                <strong>Qué tienes que hacer tú:</strong> Eliminar el usuario temporal y conservar tu copia de seguridad entregada.
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <a
              href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20le%C3%AD%20el%20proceso%20y%20deseo%20pedir%20mi%20auditor%C3%ADa%20-%20S/%2065"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg"
            >
              <span>Pedir mi auditoría - S/ 65</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* 7. PREGUNTAS FRECUENTES (FAQ) */}
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

        {/* 8. FORMULARIO OFICIAL CON NÚMERO DE WHATSAPP Y CASILLA OBLIGATORIA DE NO RESPONSABILIDAD */}
        <section id="formulario" className="p-8 sm:p-12 rounded-3xl bg-linear-to-b from-[#101422] to-[#0c0e14] border border-[#0071e3]/40 max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] font-bold">Atención Directa por WhatsApp</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Solicita tu Auditoría o Blindaje Web
            </h3>
            <p className="text-xs text-neutral-300">
              Completa los datos para coordinar de inmediato con Martín Castillo por WhatsApp. Al enviar, se abrirá tu WhatsApp con la información lista para iniciar en 48 horas laborables.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-bold text-white">¡Solicitud recibida!</h3>
              <p className="text-xs text-neutral-200">
                Se está abriendo tu WhatsApp para coordinar directamente con Martín Castillo. Si no abrió automáticamente, haz clic en el botón de abajo:
              </p>
              <a
                href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martín, acabo de enviar el formulario para ${formData.url}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-xs font-bold shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Abrir WhatsApp (+1 785 643 3991)</span>
              </a>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Tu Nombre o Contacto *</label>
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
                  <label className="text-xs font-medium text-neutral-300">Número de WhatsApp de Contacto *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej: +51 987 654 321"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300">Plan de Interés (Solo 3 Precios) *</label>
                  <select
                    value={formData.plan}
                    onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                    className="w-full bg-[#18181b] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                  >
                    <option value="Auditoría desde S/ 65 / $19, es el plan básico">Auditoría: desde S/ 65 / $19 (Plan Básico)</option>
                    <option value="Blindaje Esencial S/ 165 / $49, precio total, ya incluye la Auditoría">Blindaje Esencial: S/ 165 / $49 (Precio Total)</option>
                    <option value="Blindaje Total S/ 335 / $99, precio total, ya incluye la Auditoría y el Blindaje Esencial">Blindaje Total: S/ 335 / $99 (Precio Total)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300">Comentarios o Síntomas Notados (Opcional)</label>
                <textarea
                  rows={2}
                  placeholder="Ej: Aparecen advertencias en el navegador, o sospecho que la pasarela no está protegida..."
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                />
              </div>

              {/* CASILLA 1: AUTORIZACIÓN DEL TITULAR */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="auth-check"
                  required
                  checked={formData.authorized}
                  onChange={(e) => setFormData({ ...formData, authorized: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-600 text-[#0071e3] focus:ring-[#0071e3] cursor-pointer"
                />
                <label htmlFor="auth-check" className="text-xs text-neutral-300 leading-snug cursor-pointer">
                  <strong className="text-white">Autorización Expresa:</strong> Soy el titular del sitio web o tengo autorización formal para que se audite su seguridad conforme a la <Link href="/privacidad" className="text-[#38bdf8] underline hover:text-white">Política de Privacidad</Link> y los <Link href="/terminos" className="text-[#38bdf8] underline hover:text-white">Términos del Servicio</Link>. Pagos por Yape, Plin o transferencia bancaria.
                </label>
              </div>

              {/* CASILLA 2: NO RESPONSABILIDAD OBLIGATORIA SEGÚN ENCARGO */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="liability-check"
                  required
                  checked={formData.noLiabilityAccepted}
                  onChange={(e) => setFormData({ ...formData, noLiabilityAccepted: e.target.checked })}
                  className="mt-0.5 h-4 w-4 rounded border-neutral-600 text-[#0071e3] focus:ring-[#0071e3] cursor-pointer"
                />
                <label htmlFor="liability-check" className="text-xs text-neutral-300 leading-snug cursor-pointer">
                  <strong className="text-white">Límite Legal Obligatorio:</strong> &ldquo;Entiendo que DEFENSA TI es un servicio informativo y preventivo, que no garantiza que no habrá ataques futuros, y que Martín / DEFENSA TI no se hace responsable por ataques futuros ni por lo que yo haga o deje de hacer después del blindaje, incluido no mantener actualizaciones, accesos y copias.&rdquo; Acepto expresamente los <Link href="/terminos" className="text-[#38bdf8] underline hover:text-white">Términos y Condiciones</Link> según la ley peruana.
                </label>
              </div>

              <div className="text-[11px] text-neutral-400">
                <strong>Qué pasa después de enviar:</strong> Se abre tu WhatsApp con los datos ya ordenados para coordinar la auditoría en 48 horas laborables con Martín Castillo.
              </div>

              <button
                type="submit"
                disabled={!formData.authorized || !formData.noLiabilityAccepted}
                className="w-full py-4 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 disabled:cursor-not-allowed text-white font-extrabold text-sm transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Pedir mi auditoría por WhatsApp - S/ 65</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-[11px] text-neutral-400 pt-1">
                Atención directa por WhatsApp al <strong>+1 785 643 3991</strong> &bull; Lunes a Sábado de 9:00 a 20:00 (Hora Perú)
              </div>
            </form>
          )}
        </section>

        {/* 9. TARJETA OFICIAL DEL FUNDADOR */}
        <FounderProfileCard />
      </main>

      {/* PIE DE PÁGINA PROFESIONAL CON TEXTO LEGAL EN LETRA PEQUEÑA */}
      <footer className="border-t border-white/10 bg-black/90 py-12 relative z-10 text-xs text-neutral-400">
        <div className="max-w-6xl mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div>
              <span className="font-extrabold text-white text-sm tracking-tight">DEFENSA TI</span>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                DEFENSA TI es el servicio de seguridad web de Neuronal Gravity &bull; RUC con Negocio: <strong>10704877850</strong> &bull; Lima, Perú
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-300">
              <Link href="/terminos" className="hover:text-white transition-colors">Términos del Servicio</Link>
              <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad (Ley 29733)</Link>
              <Link href="/defensati/informe-ejemplo" className="hover:text-white transition-colors">Informe de Ejemplo</Link>
              <Link href="/defensati/escaner" className="hover:text-white transition-colors text-[#38bdf8]">Escáner Abierto</Link>
              <a href="https://wa.me/17856433991" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp (+1 785 643 3991)</a>
            </div>
          </div>

          {/* Texto Legal Obligatorio en letra pequeña */}
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-[10px] text-neutral-500 leading-relaxed font-mono">
            <strong>AVISO LEGAL Y ALCANCE PREVENTIVO:</strong> Trabajamos para llevar tu web a Grado A en la evaluación final del blindaje contratado. Este es un servicio informativo y preventivo: la auditoría y el blindaje informan y previenen, no garantizan seguridad absoluta ni que no habrá ataques futuros. La garantía cubre solo el trabajo de blindaje realizado y entregado, dentro de su alcance. Martín / DEFENSA TI no se hace responsable por ataques futuros, vulnerabilidades nuevas, fallas del hosting o de proveedores, ni por lo que el cliente haga o deje de hacer después del blindaje. Desde la entrega, el cliente es responsable de mantener sus actualizaciones al día, proteger y no compartir sus accesos, cambiar las contraseñas entregadas y conservar copias de seguridad vigentes. Modificar el sitio, instalar código, plugins o temas sin revisión, o no mantenerlo, deja la garantía sin efecto sobre lo modificado.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
            <p>
              &copy; {new Date().getFullYear()} DEFENSA TI &bull; Neuronal Gravity. Comprobante de pago disponible.
            </p>
            <p className="text-neutral-400">
              Atención: Lunes a Sábado de 9:00 a 20:00 (Hora Perú) &bull; WhatsApp: +1 785 643 3991
            </p>
          </div>
        </div>
      </footer>

      {/* Orbe Flotante Interactivo */}
      <AiConsultantWidget />
    </div>
  );
}
