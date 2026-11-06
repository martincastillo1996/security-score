'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ShieldCheck, Cpu, Lock, Sparkles, Activity, Check } from 'lucide-react';

interface NeuralScanTakeoverProps {
  targetUrl: string;
}

const SCAN_STEPS = [
  { 
    phase: 'Fase 1 / 4',
    title: 'Mapeando Sinapsis Perimetral',
    log: '[SINAPSIS] Mapeando topología de red y resolución de DNS...',
    progress: 25, 
    icon: Cpu 
  },
  { 
    phase: 'Fase 2 / 4',
    title: 'Inspeccionando Cifrado SSL / TLS',
    log: '[CRIPTO] Verificando cadena X.509, protocolo TLS y vigencia de certificado...',
    progress: 55, 
    icon: Lock 
  },
  { 
    phase: 'Fase 3 / 4',
    title: 'Auditando Cabeceras OWASP',
    log: '[OWASP] Evaluando HSTS, CSP, X-Frame y blindaje anti-clonación...',
    progress: 82, 
    icon: ShieldCheck 
  },
  { 
    phase: 'Fase 4 / 4',
    title: 'Generando Dictamen de Blindaje',
    log: '[IA NEURONAL] Sintetizando telemetría y consolidando calificación final...',
    progress: 98, 
    icon: Activity 
  },
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label?: string;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function NeuralScanTakeover({ targetUrl }: NeuralScanTakeoverProps) {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [progress, setProgress] = useState(18);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cleanDomain = targetUrl
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .toLowerCase();

  // Bloquear el scroll del body mientras la pantalla de carga neuronal esté activa
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, []);

  // Transición guiada entre fases (~950ms por paso para apreciar la auditoría y telemetría en tiempo real)
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
    }, 950);

    return () => clearInterval(stepInterval);
  }, []);

  // Canvas interactivo: Red Neuronal con Nodos, Axones y Sinapsis Eléctricas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Inicializar nodos neuronales
    const nodeCount = Math.min(50, Math.floor((width * height) / 25000));
    const labels = [
      'SSL/TLS 1.3',
      'HSTS Gate',
      'CSP Shield',
      'OWASP Core',
      'Anti-Bot',
      'DNS Root',
      'X-Frame',
      'Niubiz/Yape Guard',
      'WAF Synapse',
      'Cipher Suite'
    ];

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 2,
        label: i < labels.length ? labels[i] : undefined,
      });
    }

    // Impulsos eléctricos sinápticos que viajan entre nodos
    const pulses: Pulse[] = [];
    for (let i = 0; i < 18; i++) {
      const from = Math.floor(Math.random() * nodes.length);
      let to = Math.floor(Math.random() * nodes.length);
      if (to === from) to = (from + 1) % nodes.length;
      pulses.push({
        fromNode: from,
        toNode: to,
        progress: Math.random(),
        speed: 0.015 + Math.random() * 0.02,
      });
    }

    let pulseWave = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Onda concéntrica expansiva desde el centro
      pulseWave = (pulseWave + 1.2) % (Math.max(width, height) * 0.75);
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, pulseWave, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(56, 189, 248, ${Math.max(0, 0.25 - pulseWave / (Math.max(width, height) * 0.75))})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Actualizar posiciones de nodos
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Dibujar conexiones axonales (sinapsis)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Dibujar impulsos eléctricos que viajan por las conexiones
      for (let i = 0; i < pulses.length; i++) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.fromNode = Math.floor(Math.random() * nodes.length);
          p.toNode = (p.fromNode + Math.floor(Math.random() * 5) + 1) % nodes.length;
        }

        const from = nodes[p.fromNode];
        const to = nodes[p.toNode];
        if (!from || !to) continue;

        const currentX = from.x + (to.x - from.x) * p.progress;
        const currentY = from.y + (to.y - from.y) * p.progress;

        // Partícula brillante eléctrica
        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#38bdf8';
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Dibujar nodos
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.label ? '#38bdf8' : '#7928ca';
        ctx.shadowColor = '#0071e3';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Etiquetas flotantes en nodos clave
        if (n.label) {
          ctx.font = '10px monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.fillText(n.label, n.x + 8, n.y + 3);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const activeStep = SCAN_STEPS[currentStepIdx];
  const StepIcon = activeStep.icon;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05070e]/95 backdrop-blur-3xl overflow-hidden select-none animate-in fade-in duration-300">
      
      {/* 1. LIENZO VIVO DE LA RED NEURONAL EN PANTALLA COMPLETA */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* 2. GRADIENTES Y AURAS CÓSMICAS ORBITALES */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#0071e3]/20 via-[#7928ca]/20 to-[#38bdf8]/15 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#0071e3]/15 blur-[90px] pointer-events-none" />

      {/* 3. PANEL CENTRAL TIPO HUD APPLE PRO (PANTALLA DE CARGA NEURONAL) */}
      <div className="relative z-10 w-full max-w-2xl mx-auto px-6 py-8 sm:py-12 flex flex-col items-center text-center space-y-7">
        
        {/* Badge superior: Red Neuronal Activa */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/15 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-mono font-bold tracking-widest uppercase shadow-[0_0_25px_rgba(56,189,248,0.3)]">
          <Sparkles className="w-4 h-4 text-[#38bdf8] animate-spin [animation-duration:4s]" />
          <span>RED NEURONAL ACTIVA &bull; NEURONAL GRAVITY</span>
        </div>

        {/* HOLOGRMA NEURONAL CENTRAL GIGANTE */}
        <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
          {/* Anillos concéntricos giratorios en direcciones opuestas */}
          <div className="absolute inset-0 rounded-full border border-sky-400/30 animate-spin [animation-duration:8s]" />
          <div className="absolute inset-3 rounded-full border-2 border-dashed border-[#7928ca]/50 animate-spin [animation-duration:12s] [animation-direction:reverse]" />
          <div className="absolute inset-7 rounded-full border border-sky-300/40 animate-spin [animation-duration:5s]" />
          <div className="absolute inset-11 rounded-full border-2 border-t-transparent border-emerald-400/60 animate-spin [animation-duration:3s]" />
          
          {/* Pulso de onda de radar */}
          <span className="absolute inset-0 rounded-full bg-[#38bdf8]/10 animate-ping [animation-duration:2.5s]" />

          {/* Núcleo Neuronal Central */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-tr from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-1 shadow-[0_0_50px_rgba(56,189,248,0.7)] animate-pulse">
            <div className="w-full h-full bg-[#07090e] rounded-3xl flex items-center justify-center text-[#38bdf8]">
              <StepIcon className="w-10 h-10 sm:w-11 sm:h-11 animate-bounce" />
            </div>
          </div>

          {/* Nodos satelitales en órbita */}
          <span className="absolute top-2 right-4 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] animate-ping" />
          <span className="absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_12px_#c084fc] animate-ping [animation-delay:400ms]" />
          <span className="absolute top-1/2 -left-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-ping [animation-delay:800ms]" />
        </div>

        {/* Información del Objetivo & Dominio */}
        <div className="space-y-2 max-w-lg">
          <div className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider">
            {activeStep.phase} &bull; {activeStep.title}
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Auditando Perímetro de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] via-sky-300 to-white block sm:inline">
              {cleanDomain}
            </span>
          </h2>

          {/* Consola de Telemetría Dinámica */}
          <div className="h-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-black/70 border border-white/10 text-xs sm:text-sm font-mono text-neutral-300 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate max-w-sm sm:max-w-md">{activeStep.log}</span>
            </div>
          </div>
        </div>

        {/* BARRA DE PROGRESO DE ALTA PRECISIÓN */}
        <div className="w-full max-w-xl space-y-2">
          <div className="w-full h-3 sm:h-3.5 rounded-full bg-white/10 p-0.5 overflow-hidden border border-white/15 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-[#0071e3] via-[#7928ca] to-[#38bdf8] rounded-full transition-all duration-700 ease-out shadow-[0_0_20px_rgba(56,189,248,0.8)] relative"
              style={{ width: `${progress}%` }}
            >
              {/* Reflejo de brillo móvil */}
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          <div className="flex justify-between items-center text-xs font-mono text-neutral-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
              <span>Sondeo Cero-Riesgo (No invasivo)</span>
            </span>
            <span className="font-extrabold text-[#38bdf8] text-sm">
              {progress}%
            </span>
          </div>
        </div>

        {/* 4 CHECKPOINTS DE TELEMETRÍA */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full max-w-xl pt-1">
          {SCAN_STEPS.map((s, idx) => {
            const isCompleted = currentStepIdx > idx;
            const isCurrent = currentStepIdx === idx;

            return (
              <div
                key={idx}
                className={`p-3 rounded-2xl border text-xs font-mono transition-all flex flex-col items-center justify-center gap-1 ${
                  isCompleted
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : isCurrent
                    ? 'bg-[#0071e3]/30 border-[#38bdf8] text-white font-bold shadow-[0_0_25px_rgba(0,113,227,0.5)] scale-[1.03]'
                    : 'bg-white/5 border-white/10 text-neutral-500'
                }`}
              >
                <div className="flex items-center gap-1">
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-600" />
                  )}
                  <span className="text-[10px] font-bold">Paso {idx + 1}</span>
                </div>
                <span className="font-semibold text-[11px] truncate w-full text-center">
                  {idx === 0 && 'Sinapsis'}
                  {idx === 1 && 'Cifrado SSL'}
                  {idx === 2 && 'OWASP'}
                  {idx === 3 && 'Dictamen'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Pie de pantalla: Garantía de seguridad */}
        <p className="text-[11px] text-neutral-400 font-mono flex items-center gap-2 pt-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Auditoría perimetral sin tocar tu base de datos ni pedir credenciales.</span>
        </p>

      </div>

    </div>
  );
}
