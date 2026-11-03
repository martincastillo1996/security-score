'use client';

import { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario ya aceptó las cookies previamente
    const consent = localStorage.getItem('defensati_cookie_consent');
    if (!consent) {
      // Pequeño retardo para que la animación de entrada sea elegante estilo Apple
      const timer = setTimeout(() => setShowBanner(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('defensati_cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('defensati_cookie_consent', 'essential_only');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <aside 
      aria-label="Consentimiento de Cookies y Privacidad"
      className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-50 animate-in fade-in-50 slide-in-from-bottom-5 duration-500"
    >
      <div className="p-5 rounded-3xl bg-[#161618]/95 border border-white/15 shadow-2xl backdrop-blur-2xl text-[#f5f5f7] space-y-4">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#0071e3]/15 border border-[#0071e3]/30 flex items-center justify-center text-[#2997ff]">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Privacidad & Cookies</h4>
              <p className="text-[11px] text-neutral-400">Ley Peruana N° 29733 (LPDP)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleEssentialOnly}
            aria-label="Cerrar banner de cookies"
            className="p-1 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          Utilizamos cookies esenciales y analíticas técnicas no intrusivas para garantizar la seguridad perimetral, la persistencia de reportes sin base de datos y cumplir con el estándar nacional de protección de datos personales.
        </p>

        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={handleAccept}
            className="flex-1 py-2 px-4 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-semibold shadow-lg shadow-[#0071e3]/30 transition-all active:scale-[0.98]"
          >
            Aceptar Todas
          </button>
          
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="py-2 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-medium transition-all active:scale-[0.98]"
          >
            Solo Esenciales
          </button>
        </div>

        <div className="text-[10px] text-neutral-500 flex items-center gap-1.5 pt-1 border-t border-white/5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Datos cifrados de extremo a extremo sin venta a terceros</span>
        </div>

      </div>
    </aside>
  );
}
