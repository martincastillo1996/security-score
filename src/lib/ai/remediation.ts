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

// 1. MOTOR PROPIO LOCAL DETERMINISTA (Zero-Failure, $0 Costo)
const OWASP_LOCAL_ENGINE: Record<string, RemediationItem> = {
  'content-security-policy': {
    header: 'content-security-policy',
    headerName: 'Content-Security-Policy',
    severity: 'Crítica',
    impact: 'Mitiga inyecciones de código malicioso y Cross-Site Scripting (XSS).',
    description: 'Define y restringe las fuentes de carga autorizadas para scripts, estilos, conexiones e imágenes.',
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
    impact: 'Previene ataques Man-in-the-Middle y degradación de cifrado (SSL Stripping).',
    description: 'Fuerza al cliente a establecer únicamente conexiones bajo túneles TLS/HTTPS durante al menos 1 año.',
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
    impact: 'Bloquea ataques de Clickjacking y secuestro visual mediante frames embebidos.',
    description: 'Prohíbe a cualquier dominio o aplicación de terceros renderizar esta página dentro de un iframe.',
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
    impact: 'Inhabilita la inferencia de tipos MIME y ejecución encubierta de scripts maliciosos.',
    description: 'Obliga al navegador a interpretar estrictamente el Content-Type enviado sin sniffing.',
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
    impact: 'Previene la fuga de parámetros confidenciales o tokens embebidos en la URL de navegación.',
    description: 'Restringe la transmisión de datos del origen hacia destinos externos al navegar entre enlaces.',
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
    impact: 'Restringe el acceso involuntario a hardware sensible (micrófono, cámara, geolocalización).',
    description: 'Desactiva por defecto el consumo de APIs invasivas del navegador en el contexto perimetral.',
    fix: 'add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;',
    snippets: {
      nginx: 'add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;',
      apache: 'Header always set Permissions-Policy "geolocation=(), microphone=(), camera=()"',
      express: 'res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");',
    },
  },
};

// 2. MEMORIA DE APRENDIZAJE Y CACHÉ LOCAL
const knowledgeBase = new Map<string, RemediationItem[]>();

function buildPrompt(targetUrl: string, headers: string[], isHyperscale: boolean): string {
  const context = isHyperscale
    ? `CONTEXTO: El objetivo (${targetUrl}) opera sobre infraestructura global de hiperescala. Justifica cómo la omisión en raíz optimiza latencia y se mitiga internamente.`
    : '';

  return `
Eres un ingeniero senior de ciberseguridad defensiva y hardening de servidores web.
${context}

Genera parches técnicos de configuración para estas cabeceras ausentes en ${targetUrl}:
Cabeceras ausentes: ${headers.join(', ')}

Devuelve ÚNICAMENTE un array JSON válido sin bloques markdown ni texto extra. Estructura exacta requerida:
[
  {
    "header": "nombre-cabecera",
    "severity": "Crítica" | "Alta" | "Media" | "Baja",
    "description": "Explicación concisa y contextual del riesgo",
    "impact": "Impacto operativo o defensivo concreto",
    "snippets": {
      "nginx": "directiva completa para nginx",
      "apache": "directiva completa para apache",
      "express": "directiva completa para express"
    }
  }
]
`;
}

function parseResponse(raw: string): RemediationItem[] {
  const clean = raw.replace(/```json/g, '').replace(/```/g, '').trim();
  const parsed = JSON.parse(clean);
  const items = Array.isArray(parsed) ? parsed : (parsed.remediations || parsed.items || []);

  return (items as Array<Partial<RemediationItem> & { snippets?: Record<string, string> }>).map((item) => ({
    header: item.header || '',
    headerName: item.headerName || item.header || '',
    severity: item.severity || 'Media',
    impact: item.impact || 'Exposición defensiva ante vectores web.',
    description: item.description || '',
    fix: item.snippets?.nginx || `add_header ${item.header} "nosniff" always;`,
    snippets: {
      nginx: item.snippets?.nginx || `add_header ${item.header} "nosniff" always;`,
      apache: item.snippets?.apache || `Header always set ${item.header} "nosniff"`,
      express: item.snippets?.express || `res.setHeader('${item.header}', 'nosniff');`,
    },
  }));
}

// 1. Google Gemini 2.5 Flash
async function callGemini(prompt: string, apiKey: string): Promise<RemediationItem[]> {
  const ai = new GoogleGenAI({ apiKey });
  const res = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
    config: { responseMimeType: 'application/json' },
  });
  return parseResponse(res.text || '[]');
}

// 2. Groq (Llama 3.3 70B Versatile)
async function callGroq(prompt: string, apiKey: string): Promise<RemediationItem[]> {
  const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    }),
  });
  if (!res.ok) throw new Error(`Groq status ${res.status}`);
  const data = await res.json();
  return parseResponse(data.choices?.[0]?.message?.content || '[]');
}

// 3. Cloudflare Workers AI (@cf/meta/llama-3-8b-instruct)
async function callCloudflare(prompt: string, accountId: string, apiToken: string): Promise<RemediationItem[]> {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3-8b-instruct`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!res.ok) throw new Error(`Cloudflare AI status ${res.status}`);
  const data = await res.json();
  return parseResponse(data.result?.response || '[]');
}

// 4. Motor Local Determinist
function getLocalEngineFallback(headers: string[]): RemediationItem[] {
  return headers.map((name) => {
    if (OWASP_LOCAL_ENGINE[name]) {
      return OWASP_LOCAL_ENGINE[name];
    }
    return {
      header: name,
      headerName: name,
      severity: 'Alta',
      impact: 'Riesgo perimetral por falta de cabecera de control defensivo.',
      description: `Implementar cabecera de endurecimiento ${name} según lineamientos OWASP.`,
      fix: `add_header ${name} "default-src 'self'" always;`,
      snippets: {
        nginx: `add_header ${name} "default-src 'self'" always;`,
        apache: `Header always set ${name} "default-src 'self'"`,
        express: `res.setHeader('${name}', 'default-src \\'self\\'');`,
      },
    };
  });
}

// DESPACHADOR CENTRAL
export async function generateRemediation(
  targetUrl: string,
  missingHeaders: HeaderResult[] | string,
  isHyperscale: boolean = false
): Promise<RemediationItem[]> {
  let headersToAudit: string[] = [];
  if (Array.isArray(missingHeaders)) {
  headersToAudit = missingHeaders.map((h) => (h.name || h.header).toLowerCase());
  } else if (typeof missingHeaders === 'string') {
    headersToAudit = missingHeaders.split(',').map((s) => s.trim().toLowerCase());
  }

  if (headersToAudit.length === 0) return [];

  // Paso 0: Base de conocimiento aprendida / Caché local
  const cacheKey = `${targetUrl}:${headersToAudit.sort().join('|')}`;
  if (knowledgeBase.has(cacheKey)) {
    console.info(`[MOTOR LOCAL] Servido desde Memoria Local (${cacheKey}). 0 ms / $0.`);
    return knowledgeBase.get(cacheKey)!;
  }

  const prompt = buildPrompt(targetUrl, headersToAudit, isHyperscale);

  // 1. Intentar Gemini
  const geminiKey = process.env.GEMINI_API_KEY?.trim();
  if (geminiKey) {
    try {
      const result = await callGemini(prompt, geminiKey);
      knowledgeBase.set(cacheKey, result);
      return result;
    } catch {
      console.warn('[CASCADE] Gemini no disponible. Conmutando a Groq (Llama 3.3)...');
    }
  }

  // 2. Intentar Groq
  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    try {
      const result = await callGroq(prompt, groqKey);
      knowledgeBase.set(cacheKey, result);
      return result;
    } catch {
      console.warn('[CASCADE] Groq no disponible. Conmutando a Cloudflare Workers AI...');
    }
  }

  // 3. Intentar Cloudflare
  const cfKey = process.env.CLOUDFLARE_API_KEY?.trim();
  const cfAccount = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  if (cfKey && cfAccount) {
    try {
      const result = await callCloudflare(prompt, cfAccount, cfKey);
      knowledgeBase.set(cacheKey, result);
      return result;
    } catch {
      console.warn('[CASCADE] Cloudflare AI no disponible. Conmutando a Motor Propio Local OWASP...');
    }
  }

  // 4. Motor Determinista Propio
  console.info('[CASCADE] Operando sobre Motor Propio Local OWASP ($0 permanente).');
  const localResult = getLocalEngineFallback(headersToAudit);
  knowledgeBase.set(cacheKey, localResult);
  return localResult;
}