'use client';

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Lock, Sparkles, Activity } from 'lucide-react';

interface NeuralScanTakeoverProps {
  targetUrl: string;
}

const SCAN_STEPS = [
  { label: 'Sincronizando sinapsis de red neuronal...', progress: 20, icon: Cpu },
  { label: 'Inspeccionando candado SSL/TLS y certificados...', progress: 45, icon: Lock },
  { label: 'Evaluando cabeceras de endurecimiento OWASP...', progress: 75, icon: ShieldCheck },
  { label: 'Calculando calificación y dictamen perimetral...', progress: 95, icon: Activity },
];

export default function NeuralScanTakeover({ targetUrl }: NeuralScanTakeoverProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(15);

  const cleanDomain = targetUrl.replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase();

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStepIdx((prev) => {
        if (prev < SCAN_STEPS.length - 1) {
          const next = prev + 1;
          setProgress(SCAN_STEPS[next].progress);
          return next;
        }
        return prev;
      });
    }, 450); // Cambia cada 450ms (~1.8s total para no hacer esperar al usuario)

    return () => clearInterval(stepInterval);
  }, []);

  const activeStep = SCAN_STEPS[currentStepIdx];
  const StepIcon = activeStep.icon;

  return (
    <div className="relative w-full max-w-xl mx-auto my-6 p-6 sm:p-8 rounded-3xl bg-neutral-950/85 border border-[#38bdf8]/30 backdrop-blur-3xl shadow-[0_0_50px_rgba(0,113,227,0.25)] overflow-hidden animate-in fade-in zoom-in-95 duration-300">
      
      {/* Auras y Reflejos de Fondo */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#0071e3]/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#7928ca]/25 rounded-full blur-[80px] pointer-events-none animate-pulse" />

      {/* Núcleo Neuronal Central */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-5">
        
        {/* Holograma Neuronal Animado */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Anillos orbitales giratorios */}
          <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-spin [animation-duration:6s]" />
          <div className="absolute inset-1.5 rounded-full border-t-2 border-r-2 border-purple-500/50 animate-spin [animation-duration:3s] [animation-direction:reverse]" />
          <div className="absolute inset-4 rounded-full border border-dashed border-sky-400/40 animate-spin [animation-duration:10s]" />
          
          {/* Nodo central pulsante */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-0.5 shadow-[0_0_25px_rgba(56,189,248,0.5)] animate-pulse">
            <div className="w-full h-full bg-[#0a0d14] rounded-2xl flex items-center justify-center text-[#38bdf8]">
              <StepIcon className="w-5 h-5 animate-bounce" />
            </div>
          </div>

          {/* Partículas de sinapsis satelitales */}
          <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
          <span className="absolute bottom-2 left-1 w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-ping [animation-delay:300ms]" />
        </div>

        {/* Título de la Fase Neuronal */}
        <div className="space-y-1 max-w-md">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#38bdf8] text-[11px] font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-[#38bdf8]" />
            Red Neuronal Activa &bull; Neuronal Gravity
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight pt-1">
            Auditando Perímetro de <span className="text-[#38bdf8] underline decoration-[#0071e3] decoration-2 underline-offset-4">{cleanDomain}</span>
          </h3>

          <p className="text-xs text-slate-300 font-mono flex items-center justify-center gap-2 pt-1 h-5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activeStep.label}
          </p>
        </div>

        {/* Barra de Progreso Fluida con Gradiente */}
        <div className="w-full space-y-1.5 pt-2">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-[#0071e3] via-[#7928ca] to-[#38bdf8] rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 px-0.5">
            <span>Sondeo Cero-Riesgo</span>
            <span className="font-bold text-[#38bdf8]">{progress}%</span>
          </div>
        </div>

        {/* Micro-Checkpoints de Telemetría */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full pt-1">
          {SCAN_STEPS.map((s, idx) => {
            const isCompleted = currentStepIdx > idx;
            const isCurrent = currentStepIdx === idx;

            return (
              <div
                key={idx}
                className={`p-2 rounded-xl border text-[10px] font-mono transition-all text-center ${
                  isCompleted
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
                    : isCurrent
                    ? 'bg-[#0071e3]/20 border-[#38bdf8]/50 text-white font-bold shadow-[0_0_10px_rgba(0,113,227,0.3)]'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}
              >
                <span className="block truncate">
                  {idx === 0 && '1. Sinapsis'}
                  {idx === 1 && '2. Candado SSL'}
                  {idx === 2 && '3. OWASP'}
                  {idx === 3 && '4. Calificación'}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
