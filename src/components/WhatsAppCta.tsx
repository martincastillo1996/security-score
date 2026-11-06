'use client';

import React, { useState, useEffect } from 'react';

interface WhatsAppCtaProps {
  url: string;
  score: number;
  grade: string;
}

export default function WhatsAppCta({ url, score, grade }: WhatsAppCtaProps) {
  const [locationStr, setLocationStr] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchLoc = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/', { cache: 'force-cache' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.city) {
            setLocationStr(`${data.city}, ${data.country_name}`);
            return;
          }
        }
        if (isMounted) {
          const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'América';
          setLocationStr(tz.replace(/_/g, ' '));
        }
      } catch {
        // Fallback
      }
    };
    fetchLoc();
    return () => {
      isMounted = false;
    };
  }, []);

  const cleanUrl = url.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
  const deviceType = typeof window !== 'undefined' && window.innerWidth < 768 ? '📱 Celular' : '💻 Computadora';

  const message = `Hola Martín, estuve revisando mi web (${cleanUrl}) en DEFENSA TI.

━━━━━━━━━━━━━━━━━━━━━
📊 FICHA DEL PROSPECTO
• Dominio: ${cleanUrl}
• Calificación: ${score}/100 (Grado ${grade})
• Ubicación: 📍 ${locationStr || 'Detectada en la app'}
• Dispositivo: ${deviceType}
• Interés: Puesta a punto perimetral y blindaje Grado A
━━━━━━━━━━━━━━━━━━━━━

Quisiera coordinar contigo una asesoría para poner a punto las directivas perimetrales y dejar mi sitio protegido.`;

  const whatsappUrl = `https://wa.me/17856433991?text=${encodeURIComponent(message)}`;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#25D366]/15 via-[#25D366]/5 to-transparent border border-[#25D366]/30 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_0_50px_rgba(37,211,102,0.15)] transition-all">
      {/* Luz de fondo sutil */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2.5 text-center md:text-left max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            Asesoría y Puesta a Punto Perimetral &bull; Per�
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            ¿Deseas que dejemos tu sitio en Grado A hoy mismo?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Aplicamos las mejores prácticas en Cloudflare o tu servidor para evitar rechazos en pasarelas de pago (Mercado Pago, Niubiz, Stripe) y eliminar advertencias de &quot;Sitio no seguro&quot;.
          </p>
          <div className="text-[11px] text-neutral-400">
            Aceptamos pagos en Soles (Yape / Plin / BCP) y en USD para Sudamérica (Tarjeta / PayPal / Transferencia bancaria local).
          </div>
        </div>

        <div className="shrink-0 w-full md:w-auto flex flex-col items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:scale-[0.98] text-black font-bold text-xs sm:text-sm tracking-wide shadow-[0_10px_30px_rgba(37,211,102,0.35)] transition-all cursor-pointer"
          >
            {/* SVG Oficial de WhatsApp */}
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Coordinar por WhatsApp
          </a>
          <span className="text-[11px] text-neutral-400">
            Respuesta promedio: &lt; 15 minutos
          </span>
        </div>
      </div>
    </div>
  );
}
