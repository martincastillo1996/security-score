'use client';

import React, { useState } from 'react';
import { Bell, Check, Loader2, ShieldAlert, Sparkles } from 'lucide-react';

interface SslAlertWidgetProps {
  domain: string;
  daysRemaining?: number;
}

export default function SslAlertWidget({ domain, daysRemaining = 0 }: SslAlertWidgetProps) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cleanDomain = domain.replace(/^https?:\/\//i, '').split('/')[0].toLowerCase();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.trim().length < 8) {
      setError('Ingresa un número de WhatsApp válido.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Responsable de ${cleanDomain}`,
          company: cleanDomain,
          email: `notificacion-ssl@${cleanDomain.replace(/[^a-z0-9.-]/g, '')}`,
          phone: phone.trim(),
          service: 'Alerta Preventiva de Vencimiento SSL y Caídas',
          budget: 'Gratuito por Lanzamiento',
          details: `Activación de monitoreo de candado SSL para ${cleanDomain}. Días restantes reportados: ${daysRemaining}. Notificar 7 días antes del vencimiento.`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'No se pudo registrar la alerta en este momento.');
      }

      setRegistered(true);

      // Abrir enlace opcional a WhatsApp para confirmación inmediata
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const msg = encodeURIComponent(`Hola Martín, acabo de activar la alerta preventiva de vencimiento SSL para mi web ${cleanDomain} (WhatsApp: ${cleanPhone}). Confirmo mi suscripción gratuita.`);
      window.open(`https://wa.me/17856433991?text=${msg}`, '_blank');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-5 sm:p-6 backdrop-blur-xl relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                Monitoreo Proactivo Gratis
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mt-0.5">
              Alerta de Vencimiento de SSL y Caídas en WhatsApp
            </h4>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
        {daysRemaining > 0 
          ? `Tu certificado SSL actual tiene ${daysRemaining} días de vigencia. Si tu candado expira, los bancos bloquearán Yape/Niubiz y Google marcará tu web en rojo como "No Segura".`
          : `Tu sitio web no cuenta con un certificado SSL seguro o está vencido. Esto bloquea pasarelas de pago y genera pérdida inmediata de ventas.`}
      </p>

      {registered ? (
        <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>¡Alerta activada correctamente para <strong>{cleanDomain}</strong>! Te avisaremos por WhatsApp antes de que tu web sufra caídas.</span>
        </div>
      ) : (
        <form onSubmit={handleSubscribe} className="mt-4 flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="tel"
            placeholder="Ej. +51 987 654 321 (WhatsApp)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={loading}
            className="w-full sm:w-auto sm:flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#0071e3] transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#25D366] hover:bg-[#20ba59] disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md shadow-[#25D366]/20 active:scale-95"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Bell className="w-3.5 h-3.5" />}
            <span>Activar Alerta Gratis</span>
          </button>
        </form>
      )}

      {error && (
        <p className="text-[11px] text-rose-400 mt-2 font-medium flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
