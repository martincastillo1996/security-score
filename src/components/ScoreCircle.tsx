'use client';

interface ScoreCircleProps {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
}

export default function ScoreCircle({ score, grade }: ScoreCircleProps) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  const getTheme = (g: string) => {
    switch (g) {
      case 'A+':
      case 'A':
        return {
          stroke: '#10b981',
          text: 'text-emerald-400',
          glow: 'rgba(16, 185, 129, 0.25)',
          label: 'Excelente',
        };
      case 'B':
        return {
          stroke: '#3b82f6',
          text: 'text-blue-400',
          glow: 'rgba(59, 130, 246, 0.25)',
          label: 'Aceptable',
        };
      case 'C':
        return {
          stroke: '#f59e0b',
          text: 'text-amber-400',
          glow: 'rgba(245, 158, 11, 0.25)',
          label: 'Mejorable',
        };
      case 'D':
        return {
          stroke: '#f97316',
          text: 'text-orange-500',
          glow: 'rgba(249, 115, 22, 0.25)',
          label: 'Deficiente',
        };
      case 'F':
      default:
        return {
          stroke: '#f43f5e',
          text: 'text-rose-500',
          glow: 'rgba(244, 63, 94, 0.25)',
          label: 'Crítico',
        };
    }
  };

  const theme = getTheme(grade);

  return (
// Línea 59:
<div className="flex flex-col items-center justify-between p-6 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-2xl shadow-2xl h-full min-h-70">      <div className="w-full flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Nivel de Seguridad
        </span>
        <span className={`text-[11px] font-semibold tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 ${theme.text}`}>
          {theme.label}
        </span>
      </div>

      <div className="relative flex items-center justify-center my-4">
        <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
          {/* Círculo base */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            fill="transparent"
            className="text-neutral-800/80"
          />
          {/* Círculo animado de progreso */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={theme.stroke}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: `drop-shadow(0 0 12px ${theme.glow})`,
              transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={`text-4xl font-semibold tracking-tight ${theme.text}`}>
            {grade}
          </span>
          <span className="text-xs font-medium text-slate-400 font-mono mt-0.5">
            {score}/100
          </span>
        </div>
      </div>

      <p className="text-xs text-slate-400 text-center leading-normal">
        Puntaje calculado en base a directivas de hardening perimetral OWASP y TLS.
      </p>
    </div>
  );
}