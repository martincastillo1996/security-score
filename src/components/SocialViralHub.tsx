'use client';

import React, { useState, useEffect } from 'react';
import { Share2, Check, MessageSquare, Sparkles } from 'lucide-react';

interface Props {
  targetUrl?: string;
  score?: number;
}

export default function SocialViralHub({ targetUrl, score }: Props) {
  const [copied, setCopied] = useState(false);
  const [appUrl, setAppUrl] = useState('https://defensati.com');

  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window !== 'undefined') {
        setAppUrl(window.location.origin);
      }
    });
  }, []);

  const viralText = targetUrl
    ? `Acabo de pasar mi web (${targetUrl}) por DEFENSA TI y obtuve ${score ?? '...'}/100. Puse a prueba mis certificados y cabeceras de seguridad en 1 segundo. ¡Audita tu sitio gratis aquí! 👇`
    : `Descubre en 1 segundo si tu página web tiene riesgos de clonación o fallos en pasarelas de pago. Auditoría perimetral gratis con DEFENSA TI 👇`;

  const shareWhatsApp = `https://api.whatsapp.com/send?text=${encodeURIComponent(`${viralText} ${appUrl}`)}`;
  const shareTwitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(viralText)}&url=${encodeURIComponent(appUrl)}`;
  const shareLinkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(appUrl)}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(appUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-b from-white/5 to-white/2 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6 text-center">
        
        {/* Encabezado */}
        <div className="space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-pink-500/15 via-purple-500/15 to-blue-500/15 border border-white/10 text-white text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            <span>Comunidad &bull; Comparte el Proyecto</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Ayuda a que más empresas protejan su web en Latinoamérica
          </h3>
          <p className="text-xs text-neutral-300">
            Comparte esta herramienta con otros emprendedores o síguenos en redes para ver auditorías en vivo.
          </p>
        </div>

        {/* Canales y Redes Oficiales (5 Columnas) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-3xl mx-auto">
          
          {/* TikTok */}
          <a
            href="https://tiktok.com/@martincastillo"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-pink-500/40 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#00f2fe] to-[#fe0979] flex items-center justify-center text-black font-black text-xs shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-white">TikTok</span>
            <span className="text-[10px] text-neutral-400">En vivo</span>
          </a>

          {/* WhatsApp Compartir */}
          <a
            href={shareWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <MessageSquare className="w-4 h-4 fill-current" />
            </div>
            <span className="text-xs font-bold text-white">WhatsApp</span>
            <span className="text-[10px] text-neutral-400">Pasar link</span>
          </a>

          {/* X (Twitter) */}
          <a
            href={shareTwitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-white/40 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <span className="font-black text-xs">𝕏</span>
            </div>
            <span className="text-xs font-bold text-white">X (Twitter)</span>
            <span className="text-[10px] text-neutral-400">Publicar</span>
          </a>

          {/* LinkedIn */}
          <a
            href={shareLinkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-blue-500/40 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0a66c2] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-white">LinkedIn</span>
            <span className="text-[10px] text-neutral-400">Profesional</span>
          </a>

          {/* GitHub Star */}
          <a
            href="https://github.com/martincastillo1996/security-score"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-black/60 hover:bg-black/90 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col items-center justify-center gap-1.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span className="text-xs font-bold text-white">GitHub</span>
            <span className="text-[10px] text-amber-400 font-bold">★ Star</span>
          </a>

        </div>

        {/* Botón Rápido Copiar Link */}
        <div className="pt-2 flex justify-center">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-all cursor-pointer shadow-md active:scale-95"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? '¡Enlace copiado al portapapeles!' : 'Copiar enlace directo de la web'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
