'use client';

import { useEffect, useRef } from 'react';

const TOP_DOMAINS = [
  'google.com', 'cloudflare.com', 'github.com', 'apple.com',
  'amazon.com', 'microsoft.com', 'openai.com', 'netflix.com',
  'aws.amazon.com', 'vercel.com', 'meta.com', 'spotify.com',
  'stripe.com', 'docker.com', 'linux.org', 'nasa.gov',
  'wikipedia.org', 'adobe.com', 'mit.edu', 'oracle.com'
];

interface DomainNode {
  domain: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  fontSize: number;
  isImportant: boolean;
}

interface BlastWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface NeuralProps {
  onSelectDomain?: (domain: string) => void;
}

export default function NeuralBackground({ onSelectDomain }: NeuralProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const onSelectDomainRef = useRef(onSelectDomain);
  useEffect(() => {
    onSelectDomainRef.current = onSelectDomain;
  }, [onSelectDomain]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = width < 768;

    const dpr = Math.max(window.devicePixelRatio || 1, 1);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = true;
    };

    resize();
    window.addEventListener('resize', resize);

    const count = isMobile ? 26 : 46;
    const nodes: DomainNode[] = [];
    const maxLinkDist = isMobile ? 95 : 140;

    for (let i = 0; i < count; i++) {
      const domain = TOP_DOMAINS[i % TOP_DOMAINS.length];
      const isImportant = i % 3 === 0;
      const vx = (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5);
      const vy = (Math.random() - 0.5) * (isMobile ? 0.35 : 0.5);

      nodes.push({
        domain,
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        radius: isImportant ? 3.5 : 2.2,
        fontSize: isImportant ? (isMobile ? 11 : 13) : (isMobile ? 9 : 11),
        isImportant,
      });
    }

    const mouse = { x: -2000, y: -2000, radius: isMobile ? 150 : 240 };
    const blasts: BlastWave[] = [];

    // Control para diferenciar clic limpio de un arrastre involuntario
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerStartTime = 0;

    const triggerBigBang = (clickX: number, clickY: number) => {
      blasts.push({
        x: clickX,
        y: clickY,
        radius: 12,
        maxRadius: Math.max(width, height) * 1.1,
        alpha: 1,
      });

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let dx = node.x - clickX;
        let dy = node.y - clickY;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) {
          dx = Math.random() - 0.5;
          dy = Math.random() - 0.5;
          dist = Math.sqrt(dx * dx + dy * dy);
        }

        const force = Math.max(14, 38 - dist * 0.04);
        node.vx = (dx / dist) * force;
        node.vy = (dy / dist) * force;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      pointerStartX = clientX;
      pointerStartY = clientY;
      pointerStartTime = Date.now();
    };

    const onPointerUp = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('input, button, a, form, nav, section, footer')) {
        return;
      }

      const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'changedTouches' in e ? e.changedTouches[0].clientY : (e as MouseEvent).clientY;

      const deltaX = Math.abs(clientX - pointerStartX);
      const deltaY = Math.abs(clientY - pointerStartY);
      const deltaTime = Date.now() - pointerStartTime;

      // Si se movió más de 6px o duró más de 250ms, fue un arrastre -> se ignora
      if (deltaX > 6 || deltaY > 6 || deltaTime > 250) {
        return;
      }

      // Clic limpio confirmado: comprobar si seleccionó un dominio
      const callback = onSelectDomainRef.current;
      if (callback) {
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const dx = clientX - node.x;
          const dy = clientY - node.y;
          if (Math.sqrt(dx * dx + dy * dy) < 32) {
            callback(node.domain);
            break;
          }
        }
      }

      triggerBigBang(clientX, clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      mouse.x = -2000;
      mouse.y = -2000;
    };

    window.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mouseup', onPointerUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    window.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';

      for (let b = blasts.length - 1; b >= 0; b--) {
        const blast = blasts[b];
        blast.radius += (blast.maxRadius - blast.radius) * 0.12 + 10;
        blast.alpha *= 0.92;

        ctx.beginPath();
        ctx.arc(blast.x, blast.y, blast.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${blast.alpha * 0.8})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        if (blast.alpha < 0.015 || blast.radius >= blast.maxRadius) {
          blasts.splice(b, 1);
        }
      }

      const total = nodes.length;

      for (let i = 0; i < total; i++) {
        const n1 = nodes[i];

        n1.vx += (n1.baseVx - n1.vx) * 0.035;
        n1.vy += (n1.baseVy - n1.vy) * 0.035;
        n1.x += n1.vx;
        n1.y += n1.vy;

        const dxM = mouse.x - n1.x;
        const dyM = mouse.y - n1.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);

        if (distM < mouse.radius && distM > 10) {
          const force = (1 - distM / mouse.radius) * 0.05;
          n1.x += dxM * force;
          n1.y += dyM * force;
        }

        if (n1.x < -80) n1.x = width + 80;
        else if (n1.x > width + 80) n1.x = -80;
        if (n1.y < -40) n1.y = height + 40;
        else if (n1.y > height + 40) n1.y = -40;

        const renderX = Math.round(n1.x);
        const renderY = Math.round(n1.y);

        ctx.beginPath();
        ctx.arc(renderX, renderY, n1.radius, 0, Math.PI * 2);
        ctx.fillStyle = n1.isImportant ? '#38bdf8' : '#ffffff';
        ctx.fill();

        ctx.font = `600 ${n1.fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
        ctx.fillStyle = n1.isImportant ? 'rgba(186, 230, 253, 0.25)' : 'rgba(148, 163, 184, 0.15)';
        ctx.fillText(n1.domain, renderX + 9, renderY + 4);

        for (let j = i + 1; j < total; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDist) {
            const alpha = (1 - dist / maxLinkDist) * 0.4;
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(Math.round(n2.x), Math.round(n2.y));
            ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (distM < mouse.radius) {
          const rayAlpha = (1 - distM / mouse.radius) * 0.8;
          ctx.beginPath();
          ctx.moveTo(renderX, renderY);
          ctx.lineTo(Math.round(mouse.x), Math.round(mouse.y));
          ctx.strokeStyle = `rgba(56, 189, 248, ${rayAlpha})`;
          ctx.lineWidth = 1.1;
          ctx.stroke();
        }
      }

      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mouseup', onPointerUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}