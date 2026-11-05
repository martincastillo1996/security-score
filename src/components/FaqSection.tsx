'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      q: '¿Tengo que cambiar los sistemas, CRM o ERP que mi empresa ya utiliza?',
      a: 'No. Nuestras soluciones de IA y agentes se integran sobre tu infraestructura existente mediante APIs o webhooks: conectamos con WhatsApp Business, Google Sheets, HubSpot, Salesforce, bases de datos SQL o tu propio ERP sin interrumpir tu operación diaria ni forzarte a pagar licencias adicionales.',
    },
    {
      q: '¿Cómo garantizan la seguridad y privacidad de la información de mi negocio?',
      a: 'La privacidad es no negociable. No utilizamos los datos confidenciales de tu empresa ni los registros de tus clientes para entrenar modelos públicos de terceros. Además, implementamos arquitectura con cifrado de transporte TLS/HTTPS, control estricto de roles y auditoría continua con nuestro motor DEFENSA TI.',
    },
    {
      q: '¿Cuánto tiempo demora poner en marcha un Agente de Ventas o Automatización?',
      a: 'Nuestros proyectos se ejecutan con metodología ágil en fases cortas: un agente conversacional para WhatsApp conectado a catálogo suele estar listo en un plazo de 5 a 10 días hábiles. Las automatizaciones de documentos o extracción de facturas se despliegan en menos de 2 semanas.',
    },
    {
      q: '¿Qué diferencia a Neuronal Gravity de las típicas herramientas genéricas de IA?',
      a: 'No vendemos demostraciones decorativas ni chats genéricos que inventan respuestas erróneas ("alucinaciones"). Desarrollamos herramientas deterministas con validación de datos, integradas directamente a las finanzas y ventas de tu negocio, con soporte directivo personalizado y mediciones de retorno de inversión (ROI) verificables.',
    },
    {
      q: '¿Ofrecen soporte continuo tras la entrega de la solución?',
      a: 'Por supuesto. Cada desarrollo incluye un periodo de acompañamiento posdespliegue para calibración de respuestas y monitoreo de estabilidad. También ofrecemos planes de mantenimiento preventivo y escalamiento mensual según el volumen de transacciones de tu empresa.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative z-10 max-w-4xl mx-auto px-6 py-16 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Claridad y Confianza</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Preguntas Frecuentes sobre Soluciones de IA
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Respuestas transparentes a las dudas más comunes de gerentes, fundadores y líderes de tecnología antes de iniciar un proyecto.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen 
                  ? 'bg-[#141416]/95 border-white/20 shadow-xl' 
                  : 'bg-[#10131a]/60 border-white/5 hover:border-white/10'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-white">
                  {faq.q}
                </span>
                <div className={`p-1.5 rounded-xl bg-white/5 text-neutral-300 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#38bdf8]' : ''}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
