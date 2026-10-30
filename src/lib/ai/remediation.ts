import { GoogleGenAI, Type } from '@google/genai';
import { HeaderResult } from '../scanner/headerScanner';
import { SslScanResult } from '../scanner/sslScanner';

export interface RemediationItem {
  headerName: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  impact: string;
  fix: {
    nginx: string;
    apache: string;
    express: string;
  };
}

// Fallback estático inmediato si no hay API Key o si ocurre un error de cuota/red
const STATIC_FALLBACKS: Record<string, RemediationItem> = {
  'content-security-policy': {
    headerName: 'Content-Security-Policy',
    severity: 'Alta',
    impact: 'Protege contra Cross-Site Scripting (XSS) e inyección no autorizada de scripts.',
    fix: {
      nginx: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';\" always;",
      apache: "Header set Content-Security-Policy \"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';\"",
      express: "app.use(helmet.contentSecurityPolicy()); // o res.setHeader('Content-Security-Policy', \"default-src 'self'\");",
    },
  },
  'strict-transport-security': {
    headerName: 'Strict-Transport-Security',
    severity: 'Alta',
    impact: 'Fuerza conexiones HTTPS y evita ataques de degradación de cifrado (SSL Stripping).',
    fix: {
      nginx: "add_header Strict-Transport-Security \"max-age=31536000; includeSubDomains; preload\" always;",
      apache: "Header always set Strict-Transport-Security \"max-age=31536000; includeSubDomains; preload\"",
      express: "res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');",
    },
  },
  'x-frame-options': {
    headerName: 'X-Frame-Options',
    severity: 'Media',
    impact: 'Evita ataques de Clickjacking impidiendo que la web sea embebida en iframes externos.',
    fix: {
      nginx: "add_header X-Frame-Options \"SAMEORIGIN\" always;",
      apache: "Header always set X-Frame-Options \"SAMEORIGIN\"",
      express: "res.setHeader('X-Frame-Options', 'SAMEORIGIN');",
    },
  },
  'x-content-type-options': {
    headerName: 'X-Content-Type-Options',
    severity: 'Media',
    impact: 'Impide que los navegadores interpreten archivos como un tipo MIME diferente (MIME sniffing).',
    fix: {
      nginx: "add_header X-Content-Type-Options \"nosniff\" always;",
      apache: "Header always set X-Content-Type-Options \"nosniff\"",
      express: "res.setHeader('X-Content-Type-Options', 'nosniff');",
    },
  },
  'referrer-policy': {
    headerName: 'Referrer-Policy',
    severity: 'Baja',
    impact: 'Evita la fuga de parámetros de URLs sensibles al navegar a sitios externos.',
    fix: {
      nginx: "add_header Referrer-Policy \"strict-origin-when-cross-origin\" always;",
      apache: "Header always set Referrer-Policy \"strict-origin-when-cross-origin\"",
      express: "res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');",
    },
  },
  'permissions-policy': {
    headerName: 'Permissions-Policy',
    severity: 'Baja',
    impact: 'Bloquea el uso de hardware local sensible como geolocalización, cámara y micrófono.',
    fix: {
      nginx: "add_header Permissions-Policy \"geolocation=(), camera=(), microphone=()\" always;",
      apache: "Header always set Permissions-Policy \"geolocation=(), camera=(), microphone=()\"",
      express: "res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');",
    },
  },
};

export async function generateRemediation(
  missingHeaders: HeaderResult[],
  ssl: SslScanResult
): Promise<RemediationItem[]> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (missingHeaders.length === 0 && ssl.valid) {
    return [];
  }

  // Si no hay API key configurada en .env.local, devuelve la solución predeterminada
  if (!apiKey) {
    return missingHeaders
      .map((h) => STATIC_FALLBACKS[h.name.toLowerCase()])
      .filter((item): item is RemediationItem => Boolean(item));
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Analiza las siguientes cabeceras de seguridad ausentes en una auditoría web pasiva:
Cabeceras ausentes: ${JSON.stringify(missingHeaders.map((h) => h.name))}
Estado SSL: ${ssl.valid ? 'Válido' : 'Inválido/Inseguro'}

Genera soluciones técnicas de remediación directas en formato JSON estrictamente para entornos de producción.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headerName: { type: Type.STRING },
              severity: {
                type: Type.STRING,
                enum: ['Crítica', 'Alta', 'Media', 'Baja'],
              },
              impact: { type: Type.STRING },
              fix: {
                type: Type.OBJECT,
                properties: {
                  nginx: { type: Type.STRING },
                  apache: { type: Type.STRING },
                  express: { type: Type.STRING },
                },
                required: ['nginx', 'apache', 'express'],
              },
            },
            required: ['headerName', 'severity', 'impact', 'fix'],
          },
        },
      },
    });

    if (!response.text) {
      throw new Error('Sin respuesta del modelo.');
    }

    return JSON.parse(response.text) as RemediationItem[];
  } catch {
    // Si la cuota se agota o falla la red, el usuario no se queda sin respuesta
    return missingHeaders
      .map((h) => STATIC_FALLBACKS[h.name.toLowerCase()])
      .filter((item): item is RemediationItem => Boolean(item));
  }
}