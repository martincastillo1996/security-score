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
  ArrowRight
} from 'lucide-react';

export default function LeadQuoteSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Agente Autónomo de Ventas en WhatsApp',
    budget: '$500 - $1,500 USD',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { id: 'Agente Autónomo de Ventas en WhatsApp', label: 'Agente de Ventas en WhatsApp 24/7', icon: Bot },
    { id: 'Automatización Operativa de Documentos', label: 'Automatización de Facturas y Procesos', icon: Zap },
    { id: 'Auditoría Perimetral DEFENSA TI', label: 'Auditoría y Blindaje DEFENSA TI', icon: ShieldCheck },
    { id: 'Consultoría y Desarrollo de IA a Medida', label: 'Solución Integral de IA a Medida', icon: Sparkles },
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
    } catch {
      setError('No pudimos enviar tu mensaje directamente. Puedes contactar directamente por WhatsApp a Martín.');
    } finally {
      setLoading(false);
    }
  };

  const getWhatsAppAlternativeUrl = () => {
    const text = `Hola Martin, estuve revisando Neuronal Gravity y deseo cotizar una propuesta formal:\n- *Nombre:* ${formData.name || 'Empresa'}\n- *Empresa:* ${formData.company || 'Confidencial'}\n- *Servicio:* ${formData.service}\n- *Presupuesto:* ${formData.budget}\n- *Detalles:* ${formData.details || 'Coordinar diagnóstico'}`;
    return `https://wa.me/17856433991?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="cotizar" className="relative z-10 max-w-5xl mx-auto px-6 py-20">
      <div className="relative rounded-3xl bg-linear-to-b from-[#141416]/95 via-[#10131a]/90 to-[#090b10]/95 border border-white/10 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl overflow-hidden">
        
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Columna Izquierda: Copy persuasivo */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cotización y Diagnóstico Directo</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              Diseñemos la Solución Exacta para tu Empresa
            </h2>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Completa el formulario y analizaremos la arquitectura ideal para tu negocio. Recibirás un desglose técnico, alcance estimado y cotización formal sin compromiso.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/10 text-xs text-neutral-300">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Respuesta en menos de 24 horas</strong> con análisis preliminar de factibilidad.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Atención directa de Martin Castillo</strong>, fundador y arquitecto de soluciones.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Acuerdo de confidencialidad (NDA)</strong> garantizado sobre tus datos y métricas internas.</span>
              </div>
            </div>

            {/* Alternativa WhatsApp */}
            <div className="pt-4">
              <p className="text-[11px] text-neutral-400 mb-2">¿Prefieres respuesta inmediata por mensajería?</p>
              <a
                href={getWhatsAppAlternativeUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold transition-all shadow-[0_0_15px_rgba(37,211,102,0.15)]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Escribir por WhatsApp a Martín (+1 785 643-3991)</span>
              </a>
            </div>
          </div>

          {/* Columna Derecha: Formulario */}
          <div className="lg:col-span-7">
            {success ? (
              <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">¡Solicitud Recibida con Éxito!</h3>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Gracias por contactarnos. Martin Castillo revisará tus requerimientos y te responderá con una propuesta inicial y diagnóstico de factibilidad a <strong>{formData.email}</strong>.
                </p>
                <div className="pt-4">
                  <a
                    href={getWhatsAppAlternativeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-semibold transition-all"
                  >
                    <span>Abrir seguimiento en WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Selector de Servicio */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Servicio o Solución que necesitas:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {services.map((srv) => {
                      const Icon = srv.icon;
                      const selected = formData.service === srv.id;
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, service: srv.id })}
                          className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs text-left transition-all cursor-pointer ${
                            selected
                              ? 'bg-[#0071e3]/20 border-[#38bdf8] text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                              : 'bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white'
                          }`}
                        >
                          <Icon className={`w-4 h-4 shrink-0 ${selected ? 'text-[#38bdf8]' : 'text-neutral-400'}`} />
                          <span className="font-medium line-clamp-1">{srv.label}</span>
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
                      Empresa o Negocio
                    </label>
                    <input
                      type="text"
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

                {/* Presupuesto Estimado */}
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
                    <option value="$300 - $600 USD">Exploratorio: $300 a $600 USD</option>
                    <option value="$600 - $1,500 USD">Crecimiento / Producción: $600 a $1,500 USD</option>
                    <option value="$1,500 - $3,500 USD">Corporativo / Múltiples Procesos: $1,500 a $3,500 USD</option>
                    <option value="+ $3,500 USD">Infraestructura Propietaria Enterprise (+ $3,500 USD)</option>
                  </select>
                </div>

                {/* Detalles del requerimiento */}
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-neutral-300 flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-[#38bdf8]" />
                    Describe brevemente el flujo o problema que deseas resolver:
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
                  className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-[#0071e3] to-[#38bdf8] hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-[#0071e3]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-98"
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
