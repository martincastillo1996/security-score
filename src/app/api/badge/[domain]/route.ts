import { NextResponse } from 'next/server';

interface RouteContext {
  params: Promise<{ domain: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { domain } = await context.params;
  const cleanDomain = (domain || 'sitio-verificado').replace(/[^a-zA-Z0-9.-]/g, '').toLowerCase();

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="42" viewBox="0 0 280 42" fill="none">
  <defs>
    <linearGradient id="bg_grad" x1="0" y1="0" x2="280" y2="42" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0a0d14"/>
      <stop offset="1" stop-color="#121824"/>
    </linearGradient>
    <linearGradient id="border_grad" x1="0" y1="0" x2="280" y2="42" gradientUnits="userSpaceOnUse">
      <stop stop-color="#0071e3"/>
      <stop offset="0.5" stop-color="#7928ca"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
    <filter id="glow" x="-4" y="-4" width="288" height="50" filterUnits="userSpaceOnUse">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Fondo Dark Glass -->
  <rect x="1" y="1" width="278" height="40" rx="8" fill="url(#bg_grad)" stroke="url(#border_grad)" stroke-width="1.5"/>

  <!-- Icono Escudo Perimetral -->
  <g transform="translate(14, 11)">
    <path d="M10 2L3 5.5V11C3 15.5 6 19.5 10 21C14 19.5 17 15.5 17 11V5.5L10 2Z" fill="#0071e3" fill-opacity="0.25" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.5 11.5L9.2 13.2L12.8 9.5" stroke="#30d158" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <!-- Textos de Certificación -->
  <text x="40" y="17" fill="#94a3b8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" letter-spacing="1">DEFENSA TI &bull; BLINDAJE WEB</text>
  <text x="40" y="30" fill="#f8fafc" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700">GRADO A VERIFICADO</text>

  <!-- Tag de Certificación -->
  <rect x="206" y="11" width="60" height="20" rx="5" fill="#30d158" fill-opacity="0.15" stroke="#30d158" stroke-width="1"/>
  <text x="236" y="24" fill="#30d158" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9.5" font-weight="800" text-anchor="middle">ACTIVO</text>
</svg>`;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
