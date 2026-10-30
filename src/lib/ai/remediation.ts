import { GoogleGenAI } from '@google/genai';
import { HeaderResult } from '../scanner/headerScanner';

export interface RemediationSnippets {
  nginx: string;
  apache: string;
  express: string;
}

export interface RemediationItem {
  header: string;
  headerName: string;
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  impact?: string;
  description: string;
  fix: string;
  snippets: RemediationSnippets;
}

// 1. MOTOR PROPIO LOCAL: Matriz determinista OWASP (Costo $0, infalible ante caídas de IA)
const OWASP_LOCAL_ENGINE: Record<string, RemediationItem> = {
  'content-security-policy': {
    header: 'content-security-policy',
    headerName: 'Content-Security-Policy',
    severity: 'Crítica',
    impact: 'Mitiga ataques de inyección de código y Cross-Site Scripting (XSS).',
    description: 'Restringe el origen de scripts, estilos, imágenes y conexiones que el navegador tiene autorización de cargar.',
    fix: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self' 'unsafe-inline'; object-src 'none';\" always;",
    snippets: {
      nginx: "add_header Content-Security-Policy \"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;\" always;",
      apache: "Header always set Content-Security-Policy \"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;\"",
      express: "app.use(helmet.contentSecurityPolicy({ directives: { defaultSrc: [\"'self'\"] } }));",
    },
  },
  'strict-transport-security': {
    header: 'strict-transport-security',
    headerName: 'Strict-Transport-Security (HSTS)',
    severity: 'Crítica',
    impact: 'Previene ataques Man-in-the-Middle y degradación de protocolo (SSL Stripping).',
    description: 'Obliga a los navegadores a comunicarse exclusivamente mediante canales HTTPS cifrados durante un año.',
    fix: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
    snippets: {
      nginx: 'add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;',
      apache: 'Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"',
      express: 'app.use(helmet.hsts({ maxAge: 31536000, includeSubDomains: true, preload: true }));',
    },
  },
  'x-frame-options': {
    header: 'x-frame-options',
    headerName: 'X-Frame-Options',
    severity: 'Alta',
    impact: 'Protege contra ataques de Clickjacking y secuestro de interfaz en iframes externos.',
    description: 'Prohíbe terminantemente que el sitio web sea embebido dentro de marcos o iframes en dominios de terceros.',
    fix: 'add_header X-Frame-Options "DENY" always;',
    snippets: {
      nginx: 'add_header X-Frame-Options "DENY" always;',
      apache: 'Header always set X-Frame-Options "DENY"',
      express: 'app.use(helmet.frameguard({ action: "deny" }));',
    },
  },
  'x-content-type-options': {
    header: 'x-content-type-options',
    headerName: 'X-Content-Type-Options',
    severity: 'Alta',
    impact: 'Previene ataques de MIME sniffing y ejecución encubierta de scripts maliciosos.',
    description: 'Fuerza al navegador a respetar estrictamente el MIME Type declarado por el servidor sin intentar deducirlo.',
    fix: 'add_header X-Content-Type-Options "nosniff" always;',
    snippets: {
      nginx: 'add_header X-Content-Type-Options "nosniff" always;',
      apache: 'Header always set X-Content-Type-Options "nosniff"',
      express: 'app.use(helmet.noSniff());',
    },
  },
  'referrer-policy': {
    header: 'referrer-policy',
    headerName: 'Referrer-Policy',
    severity: 'Media',
    impact: 'Evita fugas de información sensible y tokens de autenticación en la URL.',
    description: 'Controla qué porcentaje de la URL y dominio viaja en la cabecera Referer al navegar hacia enlaces externos.',
    fix: 'add_header Referrer-Policy "strict-origin-when-cross-origin" always;',
    snippets: {
      nginx: 'add_header Referrer-Policy "strict-origin-when-cross-origin" always;',
      apache: 'Header always set Referrer-Policy "strict-origin-when-cross-origin"',
      express: 'app.use(helmet.referrerPolicy({ policy: "strict-origin-when-cross-origin" }));',
    },
  },
  'permissions-policy': {
    header: 'permissions-policy',
    headerName: 'Permissions-Policy',
    severity: 'Media',
    impact: 'Restringe accesos no autorizados a sensores físicos o APIs intrusivas del hardware del cliente.',
    description: 'Inhabilita por defecto el acceso en el navegador a cámara web, micrófono, acelerómetro y geolocalización.',
    fix: 'add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;',
    snippets: {
      nginx: 'add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;',
      apache: 'Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"',
      express: 'res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");',
    },
  },
};

// 2. CACHÉ EN MEMORIA (Ahorro total de tokens y respuesta en 0 ms para dominios repetidos)
const localAuditCache = new Map<string, RemediationItem[]>();

export async function generateRemediation(
  targetUrl: string,
  missingHeaders: HeaderResult[] | string,
  isHyperscale: boolean = false
): Promise<RemediationItem[]> {
  let headersToAudit: string[] = [];
  if (Array.isArray(missingHeaders)) {
    headersToAudit = missingHeaders.map((h) => h.name.toLowerCase());
  } else if (typeof missingHeaders === 'string') {
    headersToAudit = missingHeaders.split(',').map((s) => s.trim().toLowerCase());
  }

  if (headersToAudit.length === 0) return [];

  // Verificación en caché local
  const cacheKey = `${targetUrl}:${headersToAudit.sort().join('|')}`;
  if (localAuditCache.has(cacheKey)) {
    return localAuditCache.get(cacheKey)!;
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim() || '';

  // Si no hay API Key configurada, entrega inmediatamente el motor local OWASP
  if (!apiKey) {
    const fallbackData = getLocalOwaspRemediation(headersToAudit);
    localAuditCache.set(cacheKey, fallbackData);
    return fallbackData;
  }

  const ai = new GoogleGenAI({ apiKey });

  const contextInstruction = isHyperscale
    ? `NOTA TÉCNICA: El objetivo (${targetUrl}) opera sobre infraestructura perimetral de hiperescala global. Explica en cada descripción cómo la omisión de cabeceras en páginas raíz suele relacionarse con optimización de payload/latencia de red y cómo mitiga el riesgo a nivel interno.`
    : '';

  const prompt = `
Eres un ingeniero senior de ciberseguridad defensiva y hardening de servidores web.
${contextInstruction}

Genera parches técnicos de configuración para estas cabeceras ausentes en ${targetUrl}:
Cabeceras ausentes: ${headersToAudit.join(', ')}

Devuelve ÚNICAMENTE un array JSON válido, sin bloques de código markdown ni texto adicional. Estructura exacta requerida:
[
  {
    "header": "nombre-de-cabecera",
    "severity": "Crítica" | "Alta" | "Media" | "Baja",
    "description": "Explicación concisa y contextual del riesgo",
    "impact": "Impacto operativo o defensivo concreto",
    "snippets": {
      "nginx": "directiva completa y funcional para nginx",
      "apache": "directiva completa y funcional para apache",
      "express": "directiva funcional para express"
    }
  }
]
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const rawText = response.text || '[]';
    const parsed = JSON.parse(rawText);

    const result: RemediationItem[] = parsed.map((item: any) => ({
      header: item.header,
      headerName: item.header,
      severity: item.severity || 'Media',
      impact: item.impact || 'Exposición ante vectores web perimetrales.',
      description: item.description,
      fix: item.snippets?.nginx || `add_header ${item.header} "nosniff" always;`,
      snippets: {
        nginx: item.snippets?.nginx || `add_header ${item.header} "nosniff" always;`,
        apache: item.snippets?.apache || `Header always set ${item.header} "nosniff"`,
        express: item.snippets?.express || `res.setHeader('${item.header}', 'nosniff');`,
      },
    }));

    localAuditCache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.warn('[AI FALLBACK] Cuota de Gemini agotada o servicio no disponible. Conmutando a Motor Local OWASP.');
    const localData = getLocalOwaspRemediation(headersToAudit);
    localAuditCache.set(cacheKey, localData);
    return localData;
  }
}

function getLocalOwaspRemediation(headers: string[]): RemediationItem[] {
  return headers.map((name) => {
    if (OWASP_LOCAL_ENGINE[name]) {
      return OWASP_LOCAL_ENGINE[name];
    }

    return {
      header: name,
      headerName: name,
      severity: 'Alta',
      impact: 'Exposición ante vectores de ataque perimetrales en clientes web.',
      description: `Implementar cabecera defensiva ${name} según lineamientos oficiales OWASP.`,
      fix: `add_header ${name} "default-src 'self'" always;`,
      snippets: {
        nginx: `add_header ${name} "default-src 'self'" always;`,
        apache: `Header always set ${name} "default-src 'self'"`,
        express: `res.setHeader('${name}', 'default-src \\'self\\'');`,
      },
    };
  });
}