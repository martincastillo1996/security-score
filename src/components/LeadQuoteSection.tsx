'use client';

import { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  Mail, 
  User, 
  Phone, 
  Briefcase, 
  DollarSign, 
  MessageSquare,
  ShieldCheck,
  Bot,
  Zap,
  ArrowRight,
  Shield,
  Clock,
  Award
} from 'lucide-react';

export default function LeadQuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Agente de Ventas en WhatsApp 24/7',
    timeline: 'En menos de 2 semanas',
    budget: 'A convenir / Abierto a propuestas',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { 
      id: 'Agente de Ventas en WhatsApp 24/7', 
      title: 'Agente de Ventas en WhatsApp 24/7', 
      desc: 'Atención instantánea, catálogo en vivo y cierres de compra automáticos',
      icon: Bot,
      color: 'text-emerald-400 border-emerald-500/40' 
    },
    { 
      id: 'Automatización de Facturas y Procesos Operativos', 
      title: 'Automatización de Facturas y Procesos', 
      desc: 'Extracción OCR inteligente directo a tu ERP, Excel y bases de datos',
      icon: Zap,
      color: 'text-purple-400 border-purple-500/40' 
    },
    { 
      id: 'Auditoría y Blindaje DEFENSA TI', 
      title: 'Auditoría y Blindaje DEFENSA TI', 
      desc: 'Detección perimetral, pasarelas de pago y protección anti-clonación Grado A+',
      icon: ShieldCheck,
      color: 'text-[#38bdf8] border-[#38bdf8]/40' 
    },
    { 
      id: 'Solución Integral de IA a Medida', 
      title: 'Solución Integral de IA a Medida', 
      desc: 'Arquitectura completa y modelos propietarios para tu modelo de negocio',
      icon: Sparkles,
      color: 'text-amber-400 border-amber-500/40' 
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Hubo un inconveniente al enviar la solicitud.');
      }

      setSuccess(true);

      // Redirección profesional directa a WhatsApp tras 1.2 segundos para iniciar chat con Martín
      const waUrl = getWhatsAppAlternativeUrl();
      setTimeout(() => {
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      }, 1200);
    } catch {
      setError('No pudimos enviar tu mensaje directamente. Puedes contactar directamente por WhatsApp a Martín.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppAlternativeUrl = () => {
    const text = `Hola Martín, estuve revisando Neuronal Gravity y deseo cotizar una propuesta formal:\n- *Nombre:* ${formData.name || 'Cliente'}${formData.company ? `\n- *Empresa:* ${formData.company}` : ''}\n- *Servicio:* ${formData.service}\n- *Plazo:* ${formData.timeline}${formData.budget ? `\n- *Presupuesto:* ${formData.budget}` : ''}${formData.details ? `\n- *Detalles:* ${formData.details}` : ''}`;
    return `https://wa.me/51987010380?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="cotizar" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <div className="relative rounded-3xl bg-linear-to-b from-[#141416]/95 via-[#10131a]/90 to-[#090b10]/95 border border-white/10 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Copy Persuasivo & Propuesta de Valor Irresistible */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cotización y Diagnóstico Directo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Diseñemos la Solución Exacta para tu Empresa
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Sin intermediarios ni agencias lentas. Desarrollamos herramientas que se integran a tus sistemas y multiplican tus ventas y eficiencia desde el primer mes.
            </p>

            {/* Beneficios Competitivos Clave frente al Mercado */}
            <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-emerald-500/15 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">Garantía de Entrega y Piloto Funcional:</strong>
                  <p className="text-neutral-400 mt-0.5">Validamos el flujo con datos reales de tu negocio antes de salir a producción definitiva.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-blue-500/15 text-[#38bdf8] shrink-0 mt-0.5">
                  <Shield className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">Soberanía de Datos & Acuerdo NDA:</strong>
                  <p className="text-neutral-400 mt-0.5">Tus catálogos, facturas y bases de datos nunca se usan para entrenar IA pública de terceros.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-purple-500/15 text-purple-300 shrink-0 mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <strong className="text-white">Atención y Arquitectura Directa:</strong>
                  <p className="text-neutral-400 mt-0.5">Liderado personalmente por Martin Castillo, fundador y arquitecto senior.</p>
                </div>
              </div>
            </div>

            {/* Alternativa Rápida por WhatsApp */}
            <div className="pt-4">
              <p className="text-[11px] text-neutral-400 mb-2">¿Necesitas coordinar de inmediato por mensajería?</p>
              <a
                href={getWhatsAppAlternativeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold transition-all shadow-[0_0_15px_rgba(37,211,102,0.15)]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Escribir por WhatsApp a Martín (+51 987 010 380)</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Alta Conversión sin Truncamientos */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Solicitud Recibida con Éxito!</h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Gracias por contactarnos. Hemos recibido tus requerimientos en el servidor y te estamos abriendo WhatsApp para atenderte de inmediato con Martín Castillo.
                </p>
                <div className="pt-2">
                  <a
                    href={getWhatsAppAlternativeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-lg shadow-emerald-500/30"
                  >
                    <span>Abrir Chat de WhatsApp Directo</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Selector de Servicio con Textos Completos y Claros */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Selecciona el servicio o solución que necesitas:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {services.map((srv) => {
                      const Icon = srv.icon;
                      const selected = formData.service === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.id })}
                          className={`flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#0071e3]/20 border-[#38bdf8] text-white shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <div className={`p-2 rounded-xl bg-white/5 border border-white/10 shrink-0 mt-0.5 ${selected ? 'text-[#38bdf8]' : 'text-neutral-400'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <span className="block font-bold text-xs text-white leading-snug">
                              {srv.title}
                            </span>
                            <span className="block text-[11px] text-neutral-400 mt-0.5 leading-snug">
                              {srv.desc}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Campos Personales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <User className="w-3 h-3 text-[#38bdf8]" />
                      Tu Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Carlos Mendoza"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <Building className="w-3 h-3 text-[#38bdf8]" />
                      Empresa o Negocio *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Distribuidora SAC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#38bdf8]" />
                      Correo Electrónico Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="nombre@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#38bdf8]" />
                      Teléfono / WhatsApp de Contacto
                    </label>
                    <input
                      type="tel"
                      placeholder="+51 900 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>
                </div>

                {/* Presupuesto y Plazo Estimado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <DollarSign className="w-3 h-3 text-[#38bdf8]" />
                      Presupuesto estimado de inversión:
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                    >
                      <option value="A convenir / Abierto a propuestas">A convenir / Conversar según alcance</option>
                      <option value="Piloto de Entrada: Menos de S/ 500 (~$130 USD)">Piloto de Entrada: Menos de S/ 500 (~$130 USD)</option>
                      <option value="Implementación Básica: S/ 500 a S/ 1,500 ($130 a $400 USD)">Implementación Básica: S/ 500 a S/ 1,500 ($130 a $400 USD)</option>
                      <option value="Proyecto a Medida: S/ 1,500 a S/ 3,800 ($400 a $1,000 USD)">Proyecto a Medida: S/ 1,500 a S/ 3,800 ($400 a $1,000 USD)</option>
                      <option value="Solución Integral / Avanzada: Más de S/ 3,800 (+ $1,000 USD)">Solución Integral / Avanzada: Más de S/ 3,800 (+ $1,000 USD)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#38bdf8]" />
                      Plazo estimado de lanzamiento:
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full bg-[#18181b] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#38bdf8]"
                    >
                      <option value="Urgente (menos de 7 días)">Urgente: Menos de 7 días</option>
                      <option value="En menos de 2 semanas">Planificado: 1 a 2 semanas</option>
                      <option value="1 a 2 meses">Proyecto a Mediano Plazo: 1 a 2 meses</option>
                      <option value="Exploración tecnológica">Solo explorando factibilidad técnica</option>
                    </select>
                  </div>
                </div>

                {/* Detalles del requerimiento */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-[#38bdf8]" />
                    Describe brevemente el proceso o problema que deseas resolver:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Ej: Necesitamos que los clientes que nos escriban al WhatsApp reciban cotizaciones automáticas según nuestro catálogo y se registren en un Google Sheet o CRM..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#38bdf8] resize-none"
                  />
                </div>

                {error && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-[#0071e3] to-[#38bdf8] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#0071e3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? 'Enviando solicitud...' : 'Solicitar Propuesta y Diagnóstico Gratuito'}</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
