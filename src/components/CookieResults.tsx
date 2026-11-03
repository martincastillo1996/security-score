'use client';

import { Cookie, CheckCircle2, AlertTriangle } from 'lucide-react';
import { CookieScanResult } from '@/lib/scanner/cookieScanner';

interface Props {
  cookies?: CookieScanResult;
}

export default function CookieResults({ cookies }: Props) {
  if (!cookies || cookies.totalCookies === 0) {
    return (
      <div className="rounded-3xl bg-[#161618] border border-white/10 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Directivas de Cookies & Ley de Datos</h3>
              <p className="text-xs text-neutral-400">Inspección de atributos Secure, HttpOnly y SameSite</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-neutral-300">
            0 Cookies en respuesta inicial
          </span>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          El servidor no emitió cookies de sesión en la cabecera HTTP inicial. No hay exposición inmediata de tokens o identificadores de usuario en este punto de entrada.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-3xl bg-[#161618] border border-white/10 p-6 sm:p-7 shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#0071e3]/15 border border-[#0071e3]/30 flex items-center justify-center text-[#2997ff]">
            <Cookie className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">Directivas de Cookies & Privacidad</h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#0071e3]/20 text-[#2997ff] border border-[#0071e3]/30">
                {cookies.compliantCount}/{cookies.totalCookies} Blindadas
              </span>
            </div>
            <p className="text-xs text-neutral-300">
              Auditoría de atributos contra robo de sesión (XSS) y falsificación CSRF
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {cookies.compliantCount === cookies.totalCookies ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Conforme
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              Requiere Hardening
            </div>
          )}
        </div>
      </div>

      {/* Lista de Cookies */}
      <div className="space-y-3">
        {cookies.items.map((item, idx) => (
          <div 
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              item.isCompliant 
                ? 'bg-[#121214] border-white/5' 
                : 'bg-rose-500/5 border-rose-500/20'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5">
              <span className="font-mono text-sm font-bold text-white tracking-tight break-all">
                {item.name}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono">
                <span className={`px-2 py-0.5 rounded-md border ${item.hasSecure ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
                  Secure: {item.hasSecure ? '✓' : '✗'}
                </span>
                <span className={`px-2 py-0.5 rounded-md border ${item.hasHttpOnly ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/15 text-rose-300 border-rose-500/30'}`}>
                  HttpOnly: {item.hasHttpOnly ? '✓' : '✗'}
                </span>
                <span className={`px-2 py-0.5 rounded-md border ${item.sameSite !== 'Ausente' ? 'bg-[#0071e3]/10 text-[#2997ff] border-[#0071e3]/20' : 'bg-amber-500/15 text-amber-300 border-amber-500/30'}`}>
                  SameSite: {item.sameSite}
                </span>
              </div>
            </div>

            {item.issues.length > 0 && (
              <div className="pt-2.5 space-y-1">
                {item.issues.map((issue, i) => (
                  <p key={i} className="text-xs text-rose-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                    <span>{issue}</span>
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
