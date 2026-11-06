import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

interface Props {
  className?: string;
  showSubtitle?: boolean;
}

export default function NeuronalGravityBrandLogo({ className = '', showSubtitle = true }: Props) {
  return (
    <Link href="/" className={`flex items-center gap-3 group ${className}`}>
      {/* Icono NG con aura y gradiente Pro Dark Glass */}
      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1.5px] shadow-[0_0_18px_rgba(0,113,227,0.45)] group-hover:shadow-[0_0_24px_rgba(56,189,248,0.7)] transition-all">
        <div className="w-full h-full bg-[#0a0d14] rounded-[10px] flex items-center justify-center">
          <span className="text-[#38bdf8] font-black text-sm tracking-tighter">NG</span>
        </div>
      </div>

      {/* Tipografía Oficial */}
      <div>
        <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-[#38bdf8] transition-colors block leading-tight">
          NEURONAL GRAVITY
        </span>
        {showSubtitle && (
          <span className="text-[10px] text-neutral-400 font-mono block mt-0.5 leading-none">
            Soluciones Tecnológicas &bull; RUC {siteConfig.business.ruc}
          </span>
        )}
      </div>
    </Link>
  );
}
