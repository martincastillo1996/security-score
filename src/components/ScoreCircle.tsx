interface ScoreCircleProps {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
}

export default function ScoreCircle({ score, grade }: ScoreCircleProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (gradeValue: string) => {
    switch (gradeValue) {
      case 'A+':
      case 'A':
        return 'text-emerald-500 stroke-emerald-500';
      case 'B':
        return 'text-amber-500 stroke-amber-500';
      case 'C':
        return 'text-orange-500 stroke-orange-500';
      default:
        return 'text-rose-500 stroke-rose-500';
    }
  };

  const themeClass = getColor(grade);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
      <div className="relative flex items-center justify-center">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-800"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className={`${themeClass} transition-all duration-1000 ease-out`}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-4xl font-extrabold ${themeClass}`}>{grade}</span>
          <span className="text-xs text-slate-400 font-medium">{score}/100</span>
        </div>
      </div>
      <p className="mt-4 text-xs tracking-wider uppercase text-slate-400 font-semibold">
        Postura General
      </p>
    </div>
  );
}