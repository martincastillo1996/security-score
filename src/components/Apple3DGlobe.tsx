'use client';

import { useEffect, useRef } from 'react';
import createGlobe, { Globe } from 'cobe';

interface Props {
  lat: number;
  lon: number;
}

export default function Apple3DGlobe({ lat, lon }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    // Posición angular inicial orientada al objetivo
    let phi = (lon * Math.PI) / 180;
    const theta = (lat * Math.PI) / 180 * 0.4;
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        width = canvas.offsetWidth;
      }
    };
    window.addEventListener('resize', onResize);
    onResize();

    let globe: Globe | null = null;
    let animationFrameId: number;

    try {
      // Estética Apple Pro: Negro espacial profundo, puntos de titanio, halo azul glaciar
      globe = createGlobe(canvas, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi,
        theta,
        dark: 1,
        diffuse: 1.3,
        mapSamples: 24000,
        mapBrightness: 8,
        baseColor: [0.08, 0.08, 0.10],      // Titanio espacial oscuro
        markerColor: [0.16, 0.59, 1.0],     // Azul eléctrico Apple #2997ff
        glowColor: [0.08, 0.22, 0.45],      // Halo glaciar difuso
        markers: [
          { location: [lat, lon], size: 0.09 },
        ],
      });

      const animate = () => {
        // Velocidad ultra suave y lenta (0.001 en lugar de 0.004)
        if (!pointerInteracting.current) {
          phi += 0.001;
        }
        if (globe) {
          globe.update({
            phi: phi + pointerInteractionMovement.current,
            width: width * 2,
            height: width * 2,
          });
        }
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();
    } catch {
      // Manejar WebGL
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (globe) globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [lat, lon]);

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] mx-auto flex items-center justify-center">
      {/* Halo exterior estilo keynote Apple */}
      <div 
        className="absolute inset-4 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0, 113, 227, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(20px)',
        }}
      />

      <canvas
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
        }}
        onPointerUp={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onPointerOut={() => {
          pointerInteracting.current = null;
          if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current;
            pointerInteractionMovement.current = delta * 0.005;
          }
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 transition-opacity duration-700"
      />
    </div>
  );
}
