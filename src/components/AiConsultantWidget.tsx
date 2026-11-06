'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  ExternalLink,
  Search,
  MessageSquare,
  Send,
  Coffee,
  CheckCheck,
  Bot
} from 'lucide-react';
import { AuditReportRecord } from '@/lib/storage/reportStore';

// Orbe Gravitacional Vivo - Estilo Apple Intelligence / Cosmos Neuronal
function AppleCosmicOrb({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Resplandor nebulosa exterior pulsante */}
      <span className="absolute -inset-2 rounded-full bg-gradient-to-tr from-[#0071e3]/50 via-[#a855f7]/40 to-[#38bdf8]/50 blur-md animate-cosmic-pulse pointer-events-none" />
      
      {/* Ondas orbitales gravitacionales */}
      <div className="absolute inset-0 rounded-full border border-[#38bdf8]/40 animate-cosmic-rotate pointer-events-none" />
      <div className="absolute -inset-1 rounded-full border border-dashed border-[#c084fc]/30 animate-spin pointer-events-none [animation-duration:15s]" />

      {/* Orbe iridiscente central Apple Intelligence */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-tr from-[#0071e3] via-[#818cf8] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(56,189,248,0.6)]">
        <div className="w-full h-full rounded-full bg-[#07090e] flex items-center justify-center relative overflow-hidden">
          {/* Núcleo estelar interno con rotación fluida */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#38bdf8]/60 via-[#9333ea]/30 to-transparent animate-cosmic-rotate" />
          
          {/* Constelación o punto de singularidad de gravedad */}
          <span className="relative z-10 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff] animate-ping" />
          <span className="absolute z-10 w-2 h-2 rounded-full bg-white" />
        </div>
      </div>
    </div>
  );
}

function NeuronalityAiAvatar({ size = 'w-9 h-9', iconSize }: { size?: string; iconSize?: string }) {
  return <AppleCosmicOrb className={size} />;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  ctaType?: 'whatsapp' | 'scan' | 'plans' | 'donate';
}

interface Props {
  report?: AuditReportRecord | null;
}

export default function AiConsultantWidget({ report }: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [view, setView] = useState<'chat' | 'scan' | 'plans'>('chat');
  const [scanUrl, setScanUrl] = useState('');
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mensaje inicial contextual identificado claramente como Neuronality AI
  const initialGreeting = report?.url 
    ? `¡Hola! 👋 Soy Neuronality AI, el asistente oficial de DEFENSA TI y Neuronal Gravity. Veo que estás analizando ${report.url} con puntaje ${report.score ?? 0}/100 (Grado ${report.grade || 'F'}). ¿Tienes alguna duda sobre cómo blindarla o corregir las cabeceras? ¡Hablemos!`
    : `¡Hola! 👋 Soy Neuronality AI, el asistente inteligente de DEFENSA TI y Neuronal Gravity. ¿Tienes alguna pregunta sobre la seguridad de tu página web, pasarelas de pago o cómo blindar tu plataforma? ¡Hablemos!`;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: initialGreeting,
    }
  ]);

  const exampleQuestions = [
    {
      label: '🛡️ ¿Por qué mi web sale "No segura"?',
      prompt: '¿Por qué mi página web sale como No segura o con advertencias de navegador?'
    },
    {
      label: '💳 ¿Cómo proteger mis pagos (Yape/Niubiz)?',
      prompt: '¿Cómo puedo evitar que clonen mis formularios o pasarelas de pago de Yape y tarjetas?'
    },
    {
      label: '💰 ¿Cómo funciona el Blindaje (S/ 165)?',
      prompt: '¿Qué incluye exactamente el plan Blindaje Llave en Mano de S/ 165 y en cuántos días lo entregan?'
    },
    {
      label: '☕ ¿Cómo apoyar con donación Open Source?',
      prompt: '¿Cómo puedo apoyar el proyecto Open Source DEFENSA TI por Yape o Culqi?'
    },
    {
      label: '📱 Hablar directo con Martín por WhatsApp',
      prompt: 'Deseo hablar directamente con Martín por WhatsApp para coordinar mi proyecto.'
    }
  ];

  const plans = [
    {
      name: 'Dictamen Técnico & Receta',
      price: 'GRATIS',
      original: 'S/ 65',
      time: 'Inmediato',
      desc: 'Diagnóstico perimetral profundo, membrete legal institucional y receta de código lista para aplicar.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20consultar%20sobre%20el%20Dictamen%20T%C3%A9cnico%20gratuito%20de%20DEFENSA%20TI.'
    },
    {
      name: 'Blindaje Llave en Mano',
      price: 'S/ 165',
      original: '',
      time: '3 a 5 días',
      desc: 'Implementación directa de cabeceras de seguridad, anti-clonación de formularios y endurecimiento de servidor.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20contratar%20el%20plan%20Blindaje%20Llave%20en%20Mano%20(S/%20165)%20para%20mi%20sitio%20web.'
    },
    {
      name: 'Blindaje Total WAF + Meta Grado A',
      price: 'S/ 335',
      original: '',
      time: '5 a 7 días',
      desc: 'Auditoría integral, WAF perimetral activo (Cloudflare), bloqueo anti-bots y Meta Grado A con re-medición incluida.',
      link: 'https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20deseo%20contratar%20el%20plan%20Blindaje%20Total%20WAF%20(S/%20335)%20para%20mi%20sitio%20web.'
    }
  ];

  useEffect(() => {
    if (isOpen && view === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, view]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isTyping) return;

    setInputMessage('');
    const newMessages: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setIsTyping(true);

    // Detección de intención rápida de WhatsApp (Derivación con Martín)
    if (/whatsapp|hablar directo|martin/i.test(text)) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '¡Con gusto! Te conecto directamente con Martín por WhatsApp al **+1 (785) 643-3991** para coordinar tu requerimiento técnico o blindaje perimetral de inmediato.',
            ctaType: 'whatsapp'
          }
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    // Detección de donaciones
    if (/donaci[oó]n|apoyar|yape|culqi|open source|caf[eé]/i.test(text)) {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '¡Muchas gracias por valorar el código abierto! DEFENSA TI se mantiene gratuito gracias a donaciones voluntarias por **Yape** al **987 010 380** (Karol Martin Castillo) o con tarjeta mediante pasarela **Culqi** oficial.',
            ctaType: 'donate'
          }
        ]);
        setIsTyping(false);
      }, 500);
      return;
    }

    try {
      const response = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: newMessages.slice(-5),
          reportContext: report ? {
            url: report.url,
            score: report.score,
            grade: report.grade,
            missingHeaders: report.headers?.filter(h => !h.status).map(h => h.name) || [],
            sslValid: report.ssl?.valid,
            sslProtocol: report.ssl?.protocol
          } : undefined
        }),
      });

      const data = await response.json();
      const assistantReply = data.reply || 'Estoy a tu servicio para resolver cualquier duda sobre seguridad web o cotizar tu blindaje.';

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: assistantReply,
        }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Soy Neuronality AI. En DEFENSA TI auditamos y blindamos tu web contra ataques y bloqueos de pasarela. Puedes tocar el botón para coordinar directamente con Martín por WhatsApp al +1 (785) 643-3991.',
          ctaType: 'whatsapp'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleLaunchScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scanUrl.trim()) return;
    const clean = scanUrl.trim().replace(/^https?:\/\//i, '');
    setIsOpen(false);
    router.push(`/defensati?target=${encodeURIComponent(`https://${clean}`)}`);
  };

  const handleOpenDonation = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-donation-modal'));
    }
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 select-none font-sans">
      
      {/* 1. PROACTIVE PREVIEW BUBBLE (IDÉNTICO AL EJEMPLO PROPORCIONADO) */}
      {!isOpen && !bubbleDismissed && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] sm:w-84 rounded-3xl bg-[#0f121a]/95 border border-white/15 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in slide-in-from-bottom-3 duration-300">
          
          {/* Fila superior: Texto + Avatares superpuestos */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5">
              <h4 className="text-sm font-bold text-white tracking-tight leading-snug">
                ¿Tienes alguna pregunta?
              </h4>
              <p className="text-sm font-extrabold text-[#38bdf8] leading-tight">
                ¡Hablemos!
              </p>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">
                  Estamos en línea
                </span>
              </div>
            </div>

            {/* Grupo de Avatares superpuestos + Botón cerrar */}
            <div className="flex items-center gap-1.5 shrink-0">
              <div className="flex -space-x-2.5 overflow-hidden p-0.5">
                {/* Avatar 1: Orbe Cósmico Neuronality AI */}
                <div className="relative w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                  <AppleCosmicOrb className="w-7 h-7" />
                </div>
                {/* Avatar 2: Ingeniero / Asistente */}
                <div className="relative w-7 h-7 rounded-full ring-2 ring-[#0071e3] bg-gradient-to-tr from-[#0071e3] to-[#38bdf8] flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                {/* Avatar 3: Neuronal Gravity Badge */}
                <div className="relative w-7 h-7 rounded-full ring-2 ring-[#0071e3] bg-[#07090e] border border-white/20 flex items-center justify-center text-[9px] font-black text-[#38bdf8] shadow-md">
                  NG
                </div>
              </div>

              {/* Cerrar burbuja */}
              <button
                type="button"
                onClick={() => setBubbleDismissed(true)}
                className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Cerrar sugerencia"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Fila inferior: Botones de píldora estilo Astra / Crisp */}
          <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setView('chat');
              }}
              className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="truncate">Chatea con Neuronality AI</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsOpen(true);
                setView('plans');
              }}
              className="px-3 py-2 rounded-xl bg-[#0071e3]/20 hover:bg-[#0071e3]/30 border border-[#0071e3]/40 text-[#38bdf8] text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="truncate">Ver Soluciones</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. BOTÓN LAUNCHER FLOTANTE (ORBE CÓSMICO APPLE INTELLIGENCE + PUNTO VERDE EN ÓRBITA 360°) */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setView('chat');
          }}
          className="relative group w-14 h-14 rounded-full p-2 bg-gradient-to-b from-[#141b2d] via-[#0b0f19] to-[#04060c] border border-white/20 hover:border-[#38bdf8] text-white shadow-[0_0_30px_rgba(56,189,248,0.4)] hover:shadow-[0_0_55px_rgba(168,85,247,0.7)] active:scale-95 transition-all cursor-pointer flex items-center justify-center"
          aria-label={isOpen ? "Cerrar asistente" : "Abrir chat con Neuronality AI"}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-neutral-300 relative z-10" />
          ) : (
            <AppleCosmicOrb className="w-8 h-8" />
          )}

          {/* Anillo de trayectoria orbital y punto verde orbitando 360 grados */}
          {!isOpen && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-[60px] h-[60px] rounded-full border border-emerald-500/25 pointer-events-none" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black shadow-[0_0_10px_#34d399] z-20 animate-orbit-dot" />
            </div>
          )}
        </button>
      </div>

      {/* 3. MODAL DE CHAT & ASISTENTE COMPLETO */}
      {isOpen && (
        <div className="fixed sm:absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[410px] max-w-[420px] rounded-3xl bg-[#0d111a]/98 border border-white/15 backdrop-blur-3xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col transition-all z-50">
          
          {/* Cabecera del Chat */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <NeuronalityAiAvatar size="w-10 h-10" iconSize="w-5 h-5" />
              <div className="min-w-0">
                <h3 className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5 truncate">
                  <span>Neuronality AI</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-[#38bdf8] text-[9px] font-mono font-bold">
                    IA Oficial
                  </span>
                </h3>
                <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>En línea • Asistente DEFENSA TI</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20estoy%20en%20DEFENSA%20TI%20y%20deseo%20hacerte%20una%20consulta%20directa."
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#25D366] transition-colors"
                title="Coordinar con Martín por WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navegador de Pestañas Rápidas */}
          <div className="flex items-center gap-1 p-1.5 bg-black/40 border-b border-white/5 text-[11px] font-bold">
            <button
              type="button"
              onClick={() => setView('chat')}
              className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                view === 'chat'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat Inteligente</span>
            </button>

            <button
              type="button"
              onClick={() => setView('plans')}
              className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                view === 'plans'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Planes & Blindaje</span>
            </button>

            <button
              type="button"
              onClick={() => setView('scan')}
              className={`flex-1 py-1.5 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                view === 'scan'
                  ? 'bg-[#0071e3] text-white shadow-md'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>Auditar Web</span>
            </button>
          </div>

          {/* CUERPO DEL CHAT / VISTAS */}
          <div className="p-4 space-y-3.5 max-h-[60vh] sm:max-h-[460px] overflow-y-auto">
            
            {/* VISTA 1: CHAT INTERACTIVO CON PREGUNTAS DE EJEMPLO */}
            {view === 'chat' && (
              <div className="space-y-3">
                
                {/* Mensajes */}
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-2.5 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <NeuronalityAiAvatar size="w-7 h-7" iconSize="w-3.5 h-3.5" />
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#0071e3] text-white font-medium rounded-br-none shadow-md'
                          : 'bg-white/10 text-neutral-200 border border-white/10 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Botones de acción contextuales integrados */}
                      {msg.ctaType === 'whatsapp' && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <a
                            href="https://wa.me/17856433991?text=Hola%20Mart%C3%ADn,%20estuve%20chateando%20con%20el%20asistente%20de%20DEFENSA%20TI%20y%20deseo%20hacerte%20una%20consulta."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-bold shadow-md transition-all active:scale-95"
                          >
                            <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span>Abrir WhatsApp (+1 785 643-3991)</span>
                          </a>
                        </div>
                      )}

                      {msg.ctaType === 'donate' && (
                        <div className="mt-2.5 pt-2 border-t border-white/10">
                          <button
                            type="button"
                            onClick={handleOpenDonation}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-[11px] font-bold shadow-md transition-all active:scale-95 cursor-pointer"
                          >
                            <Coffee className="w-3.5 h-3.5" />
                            <span>Abrir Modal de Donación (Yape/Culqi)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-2.5 items-center">
                    <NeuronalityAiAvatar size="w-7 h-7" iconSize="w-3.5 h-3.5" />
                    <div className="rounded-2xl px-3.5 py-2.5 bg-white/5 border border-white/10 text-xs text-neutral-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.2s]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}

                {/* Preguntas de ejemplo sugeridas (Estilo Chips interactivos) */}
                <div className="pt-2 space-y-1.5">
                  <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                    Preguntas frecuentes:
                  </span>
                  <div className="flex flex-col gap-1.5">
                    {exampleQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q.prompt)}
                        className="w-full text-left p-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#38bdf8]/40 text-neutral-300 hover:text-white text-[11px] font-medium transition-all flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-2">{q.label}</span>
                        <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-[#38bdf8] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* VISTA 2: ESCÁNER DIRECTO */}
            {view === 'scan' && (
              <div className="space-y-4 py-2">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed">
                  Ingresa tu dominio web para auditar de inmediato cabeceras HTTP, cifrado SSL y estado perimetral:
                </div>

                <form onSubmit={handleLaunchScan} className="space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="ej: mitienda.pe o miweb.com"
                    value={scanUrl}
                    onChange={(e) => setScanUrl(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#0071e3] to-sky-500 hover:from-[#0077ed] hover:to-sky-400 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Auditar Web Ahora</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <p className="text-[10px] text-neutral-400 text-center font-mono">
                  Diagnóstico 100% externo, no invasivo y sin pedir contraseñas.
                </p>
              </div>
            )}

            {/* VISTA 3: PLANES DE BLINDAJE */}
            {view === 'plans' && (
              <div className="space-y-3 py-1">
                <div className="text-xs text-neutral-300">
                  Precios transparentes para Perú (pagos únicos sin suscripciones):
                </div>

                <div className="space-y-2">
                  {plans.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1.5 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{p.name}</span>
                        <div className="flex items-baseline gap-1.5">
                          {p.original && (
                            <span className="text-[10px] text-neutral-500 line-through">
                              {p.original}
                            </span>
                          )}
                          <span className="text-xs font-mono font-black text-emerald-400">
                            {p.price}
                          </span>
                        </div>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-snug">
                        {p.desc}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-neutral-400 font-mono">Plazo: {p.time}</span>
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-bold text-[#38bdf8] hover:underline flex items-center gap-1"
                        >
                          <span>Consultar &rarr;</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* INPUT BARRA DE ESCRITURA (EN VISTA CHAT) */}
          {view === 'chat' && (
            <div className="p-3 bg-black/60 border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Pregúntale a Neuronality AI..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0071e3]"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="p-2.5 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white transition-all cursor-pointer shadow-md shrink-0"
                  aria-label="Enviar mensaje"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* Pie del Widget */}
          <div className="py-2 px-4 bg-black/80 border-t border-white/5 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
            <span>Neuronal Gravity &bull; RUC 10704877850</span>
            <span className="text-emerald-400 font-sans">🟢 En vivo</span>
          </div>

        </div>
      )}

    </div>
  );
}
