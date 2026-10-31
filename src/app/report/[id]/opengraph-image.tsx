import { ImageResponse } from 'next/og';
import { getReportById } from '@/lib/storage/reportStore';

export const runtime = 'nodejs';
export const alt = 'DEFENSA TI - Security Score';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = getReportById(id);

  const domain = report ? new URL(report.url).hostname : 'Objetivo Web';
  const score = report ? report.score : 0;
  const grade = report ? report.grade : '-';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          border: '12px solid #1e293b',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 4, color: '#3b82f6', textTransform: 'uppercase', marginBottom: 12 }}>
          DEFENSA TI &bull; AUDITORÍA PERIMETRAL
        </div>
        <div style={{ fontSize: 52, fontWeight: 900, marginBottom: 20 }}>
          {domain}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            padding: '16px 36px',
            borderRadius: 9999,
            backgroundColor: '#171717',
            border: '2px solid #262626',
          }}
        >
          <span style={{ fontSize: 44, fontWeight: 900, color: score >= 80 ? '#10b981' : '#f43f5e' }}>
            {score}/100
          </span>
          <span style={{ fontSize: 32, fontWeight: 700, color: '#94a3b8' }}>
            Grado {grade}
          </span>
        </div>
        <div style={{ position: 'absolute', bottom: 30, fontSize: 16, color: '#64748b' }}>
          Reporte Técnico Determinista TLSv1.3 &bull; OWASP Headers &bull; TCP Sockets
        </div>
      </div>
    ),
    { ...size }
  );
}