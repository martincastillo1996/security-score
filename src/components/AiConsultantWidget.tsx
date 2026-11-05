'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  User, 
  Loader2, 
  MessageSquare, 
  ArrowRight,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { AuditReportRecord } from '@/lib/storage/reportStore';

// Icono Ciber-Futurista Apple Neural Core para DEFENSA IT AI
function CyberCoreIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cyberGlow" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="0.5" stopColor="#3b82f6" />
          <stop offset="1" stopColor="#818cf8" />
        </linearGradient>
        <radialGradient id="cyberCore" cx="12" cy="12" r="5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#1e3a8a" />
        </radialGradient>
      </defs>
      {/* Anillo exterior segmentado */}
      <circle cx="12" cy="12" r="9" stroke="url(#cyberGlow)" strokeWidth="1.6" strokeDasharray="5 3" />
      {/* Rombo orbital de seguridad */}
      <path d="M12 4.5L19.5 12L12 19.5L4.5 12Z" stroke="#38bdf8" strokeWidth="1.2" strokeOpacity="0.8" />
      {/* Núcleo de Fusión Cuántica */}
      <circle cx="12" cy="12" r="3.2" fill="url(#cyberCore)" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
      {/* Pines de interconexión neural */}
      <line x1="12" y1="2" x2="12" y2="4" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="12" y1="20" x2="12" y2="22" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2" y1="12" x2="4" y2="12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="20" y1="12" x2="22" y2="12" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

interface Props {
  report?: AuditReportRecord | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  isWhatsAppCta?: boolean;
}

export default function AiConsultantWidget({ report }: Props) {
  const { t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showWhatsAppCta, setShowWhatsAppCta] = useState(false);
  const [lastQuery, setLastQuery] = useState('');
  
  // TELEMETRÍA DEL PROSPECTO EN VIVO
  const [secondsOnSite, setSecondsOnSite] = useState(1);
  const [clientCity, setClientCity] = useState<string>('Detectando...');
  const [clientCountry, setClientCountry] = useState<string>('');
  const [clickedInterest, setClickedInterest] = useState<string>('Auditoría General');

  // Contador de tiempo de permanencia en la app
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsOnSite((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Obtener geolocalización aproximada del visitante ($0 costo, sin bloquear la carga)
  useEffect(() => {
    let isMounted = true;
    const detectLocation = async () => {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
        const parts = timeZone.split('/');
        if (isMounted) {
          setClientCity(parts[1]?.replace(/_/g, ' ') || 'Latinoamérica');
          setClientCountry(parts[0] || 'Región');
        }

        // Intento silencioso en segundo plano sin esperar ni bloquear
        fetch('https://ipapi.co/json/', { cache: 'force-cache' })
          .then((res) => (res.ok ? res.json() : null))
          .then((data) => {
            if (isMounted && data && data.city && data.country_name) {
              setClientCity(data.city);
              setClientCountry(data.country_name);
            }
          })
          .catch(() => {
            // Silencioso
          });
      } catch {
        // Silencioso
      }
    };
    detectLocation();
    return () => {
      isMounted = false;
    };
  }, []);

  // Preguntas de alto impacto comercial según contexto
  const quickQuestions = report
    ? [
        {
          label: '¿Por qué mi web sacó Grado F si "funciona bien"?',
          query: '¿Por qué mi página web obtuvo Grado F si aparentemente carga y funciona con normalidad?',
          interestTag: 'Duda sobre Grado F vs Funcionamiento',
        },
        {
          label: '¿Cómo clonan mi web para estafar a mis clientes?',
          query: '¿Cómo es que pueden clonar mi página web mediante Clickjacking si no tengo cabeceras de protección?',
          interestTag: 'Preocupación por Clonación y Phishing',
        },
        {
          label: '¿Cuánto cuesta y cuánto tarda blindar mi sitio?',
          query: '¿Cuánto cuesta y cuánto tiempo demora realizar la puesta a punto perimetral para subir mi web a Grado A+?',
          interestTag: 'Intención de Compra y Tarifas',
        },
      ]
    : [
        {
          label: '¿Cómo un agente de IA en WhatsApp aumenta mis ventas?',
          query: '¿Cómo funciona un agente de ventas con IA en WhatsApp y cuánto puede incrementar la conversión de mi negocio?',
          interestTag: 'Agentes de Ventas en WhatsApp',
        },
        {
          label: '¿Cómo automatizar la lectura de facturas y contratos?',
          query: '¿Cómo podemos automatizar el procesamiento de facturas, contratos y documentos con IA para ahorrar costos operativos?',
          interestTag: 'Automatización de Documentos con IA',
        },
        {
          label: '¿Cómo funciona la auditoría perimetral de DEFENSA TI?',
          query: '¿Cómo funciona el escáner de DEFENSA TI para proteger mi comercio electrónico y pasarelas de pago?',
          interestTag: 'Ciberdefensa DEFENSA TI',
        },
      ];

  // Inicialización de mensajes con saludo personalizado
  const [messages, setMessages] = useState<Message[]>(() => {
    if (report) {
      return [
        {
          role: 'assistant',
          content: `Hola, ¿qué tal? Soy **Neuronal Gravity AI**, el asistente de ciberseguridad e inteligencia artificial de Martín Castillo.\n\nAcabo de analizar **${report.url}** y obtuvo **${report.score}/100 (Grado ${report.grade || 'F'})**.\n\nPuedes hacerme cualquier consulta técnica o elegir una de las preguntas frecuentes abajo para evaluar tu nivel de riesgo.`,
        },
      ];
    }
    return [
      {
        role: 'assistant',
        content: 'Hola, ¿qué tal? Soy **Neuronal Gravity AI**, el asistente de soluciones de negocio e inteligencia artificial de Martín Castillo.\n\n¿En qué podemos impulsar tu empresa hoy? Consúltame sobre:\n• **Agentes de ventas 24/7 en WhatsApp**\n• **Automatización de facturas y documentos**\n• **Analítica predictiva y dashboards de negocio**\n• **Auditoría de ciberseguridad con DEFENSA TI**\n\n¿Qué proceso deseas optimizar en tu empresa?',
      },
    ];
  });

  const lastReportUrl = useRef<string | undefined>(report?.url);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Actualizar saludo cuando cambie el dominio auditado
  useEffect(() => {
    if (report?.url && report.url !== lastReportUrl.current) {
      lastReportUrl.current = report.url;
      const greeting = `Hola, ¿qué tal? Soy **Neuronal Gravity AI**. He revisado la auditoría de **${report.url}** (Nota: **${report.score}/100**, Grado **${report.grade || 'F'}**).\n\n¿Deseas saber si tu web tiene riesgo de clonación o cómo dejarla en Grado A+ hoy mismo?`;
      queueMicrotask(() => {
        setMessages([{ role: 'assistant', content: greeting }]);
      });
    }
  }, [report]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading, isOpen]);

  // Cálculo formateado del tiempo de permanencia
  const getTimeOnSiteString = () => {
    if (secondsOnSite < 60) return `${secondsOnSite} segundos`;
    const minutes = Math.floor(secondsOnSite / 60);
    const remainingSecs = secondsOnSite % 60;
    return `${minutes}m ${remainingSecs}s`;
  };

  // Generador de Ficha de Inteligencia del Prospecto para WhatsApp Personal
  const getWhatsAppHandoffUrl = (customQuery?: string) => {
    const timeSpent = getTimeOnSiteString();
    const locationStr = clientCountry ? `${clientCity}, ${clientCountry}` : clientCity;
    const deviceType = typeof window !== 'undefined' && window.innerWidth < 768 ? '📱 Celular' : '💻 Computadora';

    if (report) {
      const domain = report?.url ? report.url.replace(/^https?:\/\//i, '').replace(/\/.*$/, '') : 'No especificado';
      const score = report?.score ?? 'N/A';
      const grade = report?.grade ?? 'F';
      const query = customQuery || lastQuery || 'Quiero cotizar la puesta a punto perimetral.';

      const message = `Hola Martín, vengo de hablar con tu asistente Neuronal Gravity AI sobre mi sitio web (${domain}).

━━━━━━━━━━━━━━━━━━━━━
📊 FICHA DEL PROSPECTO (AUDITORÍA PERIMETRAL)
• Dominio: ${domain}
• Calificación: ${score}/100 (Grado ${grade})
• Ubicación: 📍 ${locationStr}
• Tiempo en la app: ⏱️ ${timeSpent}
• Dispositivo: ${deviceType}
• Tema de mayor interés: 🎯 ${clickedInterest}
• Consulta puntual: "${query}"
━━━━━━━━━━━━━━━━━━━━━

Quisiera coordinar contigo una asesoría para poner a punto mi sitio y subir a Grado A+.`;

      return `https://wa.me/17856433991?text=${encodeURIComponent(message)}`;
    }

    const query = customQuery || lastQuery || 'Quiero cotizar una solución de IA para mi empresa.';
    const message = `Hola Martín, estuve conversando con tu asistente Neuronal Gravity AI en neuronalgravity.com.

━━━━━━━━━━━━━━━━━━━━━
📊 FICHA DEL PROSPECTO (SOLUCIONES DE NEGOCIO CON IA)
• Ubicación: 📍 ${locationStr}
• Tiempo en el sitio: ⏱️ ${timeSpent}
• Dispositivo: ${deviceType}
• Interés principal: 🎯 ${clickedInterest}
• Consulta puntual: "${query}"
━━━━━━━━━━━━━━━━━━━━━

Quisiera coordinar contigo una reunión para evaluar cómo implementar soluciones de IA en mi negocio.`;

    return `https://wa.me/17856433991?text=${encodeURIComponent(message)}`;
  };

  const handleSend = async (userText?: string, interestTag?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || loading) return;

    if (interestTag) {
      setClickedInterest(interestTag);
    } else {
      setClickedInterest('Consulta personalizada en chat');
    }

    setLastQuery(textToSend);
    const newHistory: Message[] = [...messages, { role: 'user', content: textToSend }];
    setMessages(newHistory);
    setInput('');
    setLoading(true);

    try {
      const missingHeaders = (report?.headers || []).filter((h) => !h.present).map((h) => h.header);
      const openPorts = (report?.ports || []).filter((p) => p.isOpen).map((p) => p.port);

      const res = await fetch('/api/ai-consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: newHistory.slice(-6),
          reportContext: report
            ? {
                url: report.url,
                score: report.score,
                grade: report.grade,
                missingHeaders,
                openPorts,
                sslValid: report.ssl?.valid,
                sslProtocol: report.ssl?.protocol,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Error al consultar al asistente');

      if (data.shouldSuggestWhatsApp) {
        setShowWhatsAppCta(true);
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          isWhatsAppCta: Boolean(data.shouldSuggestWhatsApp),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Disculpa, hubo una intermitencia de conexión momentánea. Dale clic abajo para pasar directamente a mi WhatsApp y darte el informe personalizado.',
          isWhatsAppCta: true,
        },
      ]);
      setShowWhatsAppCta(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Botón Flotante con Marca DEFENSA IT AI */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#141416]/95 border border-[#38bdf8]/30 hover:border-[#38bdf8] text-xs text-neutral-200 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            <span>{t.aiBot.consultBtn} <strong className="text-white group-hover:text-[#38bdf8] transition-colors">{t.aiBot.title}</strong></span>
          </button>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group p-3.5 rounded-2xl bg-linear-to-b from-[#141416] via-[#101726] to-[#080d1a] border border-[#38bdf8]/40 hover:border-[#38bdf8] text-white shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] active:scale-95 transition-all cursor-pointer"
          aria-label={t.aiBot.title}
        >
          {isOpen ? <X className="w-6 h-6 text-neutral-300" /> : <CyberCoreIcon className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />}
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black shadow-[0_0_8px_#34d399]" />
        </button>
      </div>

      {/* Ventana de Chat Flotante */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[94vw] sm:w-[450px] max-h-[640px] h-[80vh] flex flex-col rounded-3xl bg-[#0c0d10]/98 border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Cabecera con DEFENSA IT AI */}
          <div className="px-5 py-3.5 border-b border-white/10 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-[#0f172a] border border-[#38bdf8]/40 flex items-center justify-center text-white shadow-inner">
                  <CyberCoreIcon className="w-6 h-6" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c0d10] shadow-[0_0_6px_#34d399]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  {t.aiBot.title}
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                </h4>
                <p className="text-[11px] text-emerald-400 font-medium">{t.aiBot.status}</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className="space-y-2">
                <div
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                      <CyberCoreIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#0071e3] text-white rounded-br-xs shadow-md'
                        : 'bg-white/5 border border-white/10 text-neutral-200 rounded-bl-xs'
                    }`}
                  >
                    <p className="whitespace-pre-line">{m.content}</p>
                  </div>
                  {m.role === 'user' && (
                    <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Tarjeta de Traspaso a WhatsApp */}
                {m.isWhatsAppCta && (
                  <div className="ml-8 p-3.5 rounded-2xl bg-linear-to-b from-[#25D366]/15 to-[#25D366]/5 border border-[#25D366]/30 space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#25D366] font-bold">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Ficha de Diagnóstico Lista
                      </span>
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Ya preparé la ficha técnica con tu dominio y nota para que hables con Martín por WhatsApp y te dé una cotización exacta.
                    </p>
                    <a
                      href={getWhatsAppHandoffUrl(lastQuery)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-bold text-xs transition-all shadow-md active:scale-95"
                    >
                      Continuar en WhatsApp con Martín
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-center text-neutral-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-sky-950/60 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                </div>
                <span className="italic text-[11px] text-sky-300">Neuronal Gravity AI está evaluando tu consulta...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* OPCIONES RÁPIDAS Y ESCAPE A WHATSAPP */}
          {messages.length <= 2 && (
            <div className="p-3 border-t border-white/10 bg-black/50 space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-bold uppercase tracking-wider px-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                <span>{t.aiBot.faqTitle}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q.query, q.interestTag)}
                    className="w-full text-left p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/40 text-[11px] text-neutral-200 font-medium transition-all flex items-center justify-between gap-2 cursor-pointer group"
                  >
                    <span>{q.label}</span>
                    <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-blue-400 shrink-0 transition-colors" />
                  </button>
                ))}

                {/* Opción destacada en verde WhatsApp para quien no desea escribir */}
                <a
                  href={getWhatsAppHandoffUrl('Hola Martín, prefiero coordinar directo por WhatsApp')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left p-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[11px] text-[#25D366] font-semibold transition-all flex items-center justify-between gap-2 cursor-pointer shadow-[0_0_15px_rgba(37,211,102,0.15)]"
                >
                  <span className="flex items-center gap-1.5">
                    <PhoneCall className="w-3.5 h-3.5 text-[#25D366]" />
                    {t.aiBot.optDirectWhatsApp}
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#25D366] shrink-0" />
                </a>
              </div>
            </div>
          )}

          {/* Barra inferior si ya se activó la opción de WhatsApp */}
          {showWhatsAppCta && (
            <div className="px-4 py-2 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
              <span>¿Prefieres atención personalizada?</span>
              <a
                href={getWhatsAppHandoffUrl(lastQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#25D366] hover:underline font-bold"
              >
                Abrir mi WhatsApp &rarr;
              </a>
            </div>
          )}

          {/* Caja de Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-white/5 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t.aiBot.inputPlaceholder}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#0071e3]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] disabled:opacity-40 text-white transition-all shadow-md shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Descargo legal */}
          <div className="py-1 px-4 text-center text-[9px] text-neutral-500 bg-black/50">
            {t.aiBot.legal}
          </div>
        </div>
      )}
    </>
  );
}
