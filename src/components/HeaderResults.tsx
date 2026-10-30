import { HeaderResult } from '@/lib/scanner/headerScanner';
import { ShieldCheck, ShieldAlert, Info } from 'lucide-react';

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
              className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 ${
                h.present
                  ? 'bg-slate-950/70 border-emerald-900/40 text-slate-200'
                  : 'bg-slate-950/70 border-rose-900/40 text-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-xs font-semibold">{h.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{infoText}</p>
                </div>
                {h.present ? (
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded shrink-0">
                    +{points} pts
                  </span>
                ) : (
                  <span className="text-[10px] font-mono bg-rose-950 text-rose-400 border border-rose-800 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                    <ShieldAlert className="w-3 h-3" /> Falta
                  </span>
                )}
              </div>

              {item.contextNote && (
                <div className="text-[11px] text-sky-300 bg-sky-950/40 border border-sky-800/50 rounded-lg p-2.5 flex items-start gap-2">
                  <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <span className="font-semibold text-sky-400 mr-1">Contexto Perimetral:</span>
                    {item.contextNote}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}