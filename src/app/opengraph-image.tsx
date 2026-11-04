import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Neuronal Gravity | Inteligencia Artificial Aplicada a Negocios & Ciberdefensa';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 50% 10%, rgba(0, 113, 227, 0.3) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(121, 40, 202, 0.25) 0%, transparent 50%)',
          padding: '60px 70px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Cabecera / Marca */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '54px',
                height: '54px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #0071e3 0%, #7928ca 50%, #38bdf8 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(0, 113, 227, 0.6)',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '13px',
                  backgroundColor: '#000000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                }}
              >
                🧠
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '26px', fontWeight: 900, letterSpacing: '-0.02em', color: '#ffffff' }}>
                NEURONAL GRAVITY
              </span>
              <span style={{ fontSize: '14px', fontFamily: 'monospace', color: '#38bdf8', letterSpacing: '0.05em' }}>
                neuronalgravity.com
              </span>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 18px',
              borderRadius: '999px',
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              color: '#38bdf8',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.05em',
            }}
          >
            SOLUCIONES DE NEGOCIO CON IA
          </div>
        </div>

        {/* Centro: Titular de Alto Impacto */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: '1000px',
            gap: '16px',
          }}
        >
          <h1
            style={{
              fontSize: '54px',
              fontWeight: 900,
              lineHeight: 1.12,
              letterSpacing: '-0.03em',
              margin: 0,
              background: 'linear-gradient(180deg, #ffffff 40%, #a1a1aa 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Impulsa tu Empresa con Soluciones Prácticas de Inteligencia Artificial
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#d4d4d8',
              lineHeight: 1.45,
              maxWidth: '850px',
              margin: 0,
            }}
          >
            Agentes autónomos de ventas en WhatsApp 24/7, automatización operativa de comprobantes y ciberdefensa perimetral con DEFENSA TI.
          </p>
        </div>

        {/* Footer: Métricas y Respaldo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '20px 28px',
            borderRadius: '24px',
            backgroundColor: 'rgba(20, 20, 22, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#38bdf8' }}>+300%</span>
              <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Capacidad de Atención</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#34d399' }}>-65%</span>
              <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Costos Operativos</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '22px', fontWeight: 900, color: '#f59e0b' }}>&lt; 30 Días</span>
              <span style={{ fontSize: '11px', color: '#a1a1aa' }}>Puesta en Marcha</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff' }}>Martin Castillo</span>
            <span style={{ fontSize: '12px', color: '#71717a' }}>&bull;</span>
            <span style={{ fontSize: '12px', color: '#a1a1aa' }}>Consultor Principal & Fundador</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
