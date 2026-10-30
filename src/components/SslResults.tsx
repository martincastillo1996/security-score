import { SslScanResult } from '@/lib/scanner/sslScanner';
import { Lock, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface Props {
  ssl: SslScanResult;
}

export default function SslResults({ ssl }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <span className="flex items-center gap-2 font-bold text-slate-100">
            <Lock className="w-4 h-4 text-indigo-400" />
            Certificado TLS/SSL
          </span>
          {ssl.valid ? (
            <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3 h-3" /> Válido
            </span>
          ) : (
            <span className="text-xs bg-rose-950 text-rose-400 border border-rose-800 px-2.5 py-0.5 rounded-full flex items-center gap-1 font-mono">
              <ShieldAlert className="w-3 h-3" /> Inválido
            </span>
          )}
        </div>

        <div className="space-y-3 mt-4 text-xs font-mono">
          <div>
            <p className="text-slate-500">Emisor (CA):</p>
            <p className="text-slate-200 font-semibold truncate">{ssl.issuer}</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-slate-500">Protocolo:</p>
              <p className="text-slate-200">{ssl.protocol}</p>
            </div>
            <div>
              <p className="text-slate-500">Días Restantes:</p>
              <p className={ssl.daysRemaining > 30 ? 'text-emerald-400' : 'text-amber-400 font-bold'}>
                {ssl.daysRemaining} días
              </p>
            </div>
          </div>
        </div>
      </div>

      {ssl.error && (
        <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-900/50 p-2.5 rounded-lg mt-3">
          {ssl.error}
        </p>
      )}
    </div>
  );
}