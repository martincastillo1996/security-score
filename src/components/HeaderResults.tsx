import { HeaderResult } from '@/lib/scanner/headerScanner';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  headers: HeaderResult[];
}

export default function HeaderResults({ headers }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-indigo-400" />
        Auditoría de Cabeceras OWASP
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {headers.map((h, i) => {
          const item = h as any;
          const infoText = item.purpose || item.description || item.impact || 'Cabecera de seguridad web';
          const points = item.weight || item.score || 15;

          return (
            <div
              key={i}
              className={`p-3 rounded-xl border flex items-start justify-between gap-2 ${
                h.present
                  ? 'bg-slate-950/70 border-emerald-900/40 text-slate-200'
                  : 'bg-slate-950/70 border-rose-900/40 text-slate-300'
              }`}
            >
              <div>
                <p className="font-mono text-xs font-semibold">{h.name}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{infoText}</p>
              </div>
              {h.present ? (
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded">
                  +{points} pts
                </span>
              ) : (
                <span className="text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-800 px-2 py-0.5 rounded flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Falta
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}