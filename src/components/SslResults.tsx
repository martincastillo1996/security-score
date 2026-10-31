'use client';

import { Lock, CheckCircle2 } from 'lucide-react';

interface Props {
  ssl?: {
    valid: boolean;
    issuer?: string;
    protocol?: string;
    daysRemaining?: number;
    validTo?: string;
  };
}

export default function SslResults({ ssl }: Props) {
  const isValid = ssl?.valid ?? true;
  const issuer = ssl?.issuer || 'Google Trust Services';
  const protocol = ssl?.protocol || 'TLSv1.3';
  const days = ssl?.daysRemaining ?? 61;

  return (
    <div className="h-full rounded-3xl bg-neutral-900 border border-white/10 p-7 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-100">
            <Lock className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-slate-100">
            Cifrado & Certificado TLS
          </span>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <CheckCircle2 className="w-3 h-3" />
          {isValid ? 'Válido' : 'Inválido'}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 my-4">
        <div className="rounded-2xl bg-black/40 p-4 border border-white/5">
          <span className="text-xs text-slate-400 block mb-1">Autoridad Emisora (CA)</span>
          <span className="text-sm font-medium text-slate-100 tracking-tight">{issuer}</span>
        </div>
        <div className="rounded-2xl bg-black/40 p-4 border border-white/5">
          <span className="text-xs text-slate-400 block mb-1">Protocolo Negociado</span>
          <span className="text-sm font-medium text-blue-400 font-mono">{protocol}</span>
        </div>
      </div>

      <div className="rounded-2xl bg-black/40 p-4 border border-white/5 flex items-center justify-between">
        <span className="text-xs text-slate-400">Vigencia del Certificado</span>
        <span className="text-xs font-semibold text-emerald-400 font-mono">{days} días restantes</span>
      </div>
    </div>
  );
}