import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  message: string;
  history?: ChatMessage[];
  reportContext?: {
    url?: string;
    score?: number;
    grade?: string;
    missingHeaders?: string[];
    openPorts?: number[];
    sslValid?: boolean;
    sslProtocol?: string;
  };
}

// 1. Rate Limiter per IP (10 consultas por minuto por cliente para frenar abusos de cuota)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minuto
  const maxRequests = 10;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// 2. Patrones de Prompt Injection / Jailbreak / Intento de usar como proxy abierto
const INJECTION_PATTERNS = [
  /ignore (all )?(previous|above) instructions/i,
  /you are now/i,
  /act as (a|an)/i,
  /jailbreak/i,
  /dan mode/i,
  /system prompt/i,
  /repeat the words above/i,
  /print your instructions/i,
  /show me your prompt/i,
  /disregard/i,
  /python code/i,
  /write a script/i,
  /as an unrestricted/i,
];

function isPotentialJailbreak(text: string): boolean {
  return INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

const SYSTEM_INSTRUCTION = `Eres Neuronal Gravity AI (y DEFENSA IT AI), el consultor comercial y de ciberseguridad perimetral de Neuronal Gravity (fundado por Martín Castillo, Perú).
Tu único rol es asesorar sobre:
1. Auditorías perimetrales DEFENSA TI (cabeceras OWASP, SSL/TLS, pasarelas de pago Yape/Niubiz).
2. Servicios de desarrollo de software a medida y agentes de IA empresariales de Neuronal Gravity.

REGLAS DE SEGURIDAD ESTRICTAS:
- Nunca actúes como asistente de programación general, traductor o redactor de contenidos no relacionados.
- Si el usuario te pide código arbitrario, poesía o tareas ajenas a Neuronal Gravity, responde educadamente que tu función exclusiva es asesorar sobre seguridad web y servicios tecnológicos de la empresa.
- Respuestas breves: máximo 2 párrafos concisos orientados a valor de negocio.
- Invita cordialmente al contacto directo por WhatsApp con Martín cuando deseen cotizar o coordinar.`;

export async function POST(req: NextRequest) {
  try {
    const clientIp = getClientIp(req);

    // 1. Control de Tasa (Anti-DDoS y Anti-Abuso de API)
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Límite de consultas alcanzado. Por favor, espera un minuto o contáctanos por WhatsApp.' },
        { status: 429 }
      );
    }

    // 2. Validación de Origen (Solo llamadas desde la aplicación oficial)
    const origin = req.headers.get('origin');
    const referer = req.headers.get('referer');
    const host = req.headers.get('host') || '';

    const isAllowedHost =
      host.includes('neuronalgravity.com') ||
      host.includes('vercel.app') ||
      host.includes('localhost') ||
      host.includes('127.0.0.1');

    if (origin) {
      const isAllowedOrigin =
        origin.includes('neuronalgravity.com') ||
        origin.includes('vercel.app') ||
        origin.includes('localhost') ||
        origin.includes('127.0.0.1');

      if (!isAllowedOrigin && !isAllowedHost) {
        return NextResponse.json(
          { error: 'Acceso no autorizado desde este origen.' },
          { status: 403 }
        );
      }
    } else if (referer) {
      const isAllowedReferer =
        referer.includes('neuronalgravity.com') ||
        referer.includes('vercel.app') ||
        referer.includes('localhost') ||
        referer.includes('127.0.0.1');

      if (!isAllowedReferer && !isAllowedHost) {
        return NextResponse.json(
          { error: 'Acceso no autorizado desde este referer.' },
          { status: 403 }
        );
      }
    }

    const body: RequestBody = await req.json();
    const { message, history = [], reportContext } = body;

    // 3. Validación y límites estrictos de contenido (Previene payloads masivos)
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'El mensaje es requerido.' },
        { status: 400 }
      );
    }

    const trimmedMsg = message.trim();
    if (trimmedMsg.length === 0 || trimmedMsg.length > 400) {
      return NextResponse.json(
        { error: 'El mensaje debe tener entre 1 y 400 caracteres.' },
        { status: 400 }
      );
    }

    // 4. Detección Anti-Jailbreak / Anti-Proxy
    if (isPotentialJailbreak(trimmedMsg)) {
      return NextResponse.json({
        reply: 'Hola. Como consultor de DEFENSA TI y Neuronal Gravity, solo puedo asesorarte sobre la seguridad de tu página web o el desarrollo de soluciones empresariales. Si deseas una consulta personalizada, con gusto te conecto directamente con Martín por WhatsApp.',
        shouldSuggestWhatsApp: true,
        leadSummary: {
          domain: reportContext?.url || 'Consulta General',
          score: reportContext?.score ?? 0,
          grade: reportContext?.grade || 'F',
          userQuery: 'Consulta de seguridad',
        },
      });
    }

    // 5. Historial sanitizado (Máximo 4 mensajes, truncados a 200 caracteres)
    const sanitizedHistory = Array.isArray(history)
      ? history.slice(-4).map((h) => ({
          role: h.role === 'user' ? ('user' as const) : ('model' as const),
          parts: [{ text: String(h.content || '').slice(0, 200) }],
        }))
      : [];

    const apiKey = process.env.GEMINI_API_KEY;

    let contextPrompt = '';
    if (reportContext) {
      contextPrompt = `
[CONTEXTO DEL REPORTE AUDITADO]
- Dominio: ${String(reportContext.url || 'No especificado').slice(0, 80)}
- Calificación: ${reportContext.score ?? 'N/A'}/100 (Grado: ${reportContext.grade || 'N/A'})
- Cabeceras ausentes: ${reportContext.missingHeaders?.slice(0, 5).join(', ') || 'Ninguna crítica'}
`;
    }

    let reply = '';
    const lowerMsg = trimmedMsg.toLowerCase();
    const isLeadIntent =
      lowerMsg.includes('precio') ||
      lowerMsg.includes('costo') ||
      lowerMsg.includes('plan') ||
      lowerMsg.includes('cuanto') ||
      lowerMsg.includes('cuánto') ||
      lowerMsg.includes('contratar') ||
      lowerMsg.includes('ayuda') ||
      lowerMsg.includes('wsp') ||
      lowerMsg.includes('whatsapp') ||
      lowerMsg.includes('cotizar') ||
      lowerMsg.includes('martin') ||
      lowerMsg.includes('martín');

    let shouldSuggestWhatsApp = isLeadIntent;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const contents = [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${contextPrompt}` }] },
          { role: 'model', parts: [{ text: 'Entendido. Asesoraré únicamente sobre ciberdefensa web y soluciones tecnológicas de Neuronal Gravity.' }] },
          ...sanitizedHistory,
          { role: 'user', parts: [{ text: trimmedMsg }] },
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents,
          config: {
            temperature: 0.4,
            maxOutputTokens: 250, // Límite estricto para evitar uso como generador masivo
          },
        });

        reply = response.text || 'Hola, soy DEFENSA IT AI. ¿En qué puedo orientarte sobre la seguridad de tu web?';
      } catch (geminiError) {
        console.warn('Error en Gemini, conmutando a motor seguro de contingencia:', geminiError);
      }
    }

    if (!reply) {
      reply = `Hola. En DEFENSA TI auditamos y blindamos tu sitio web para evitar clonaciones de pasarelas (Yape/Niubiz) o alertas de "Sitio no seguro". Puedes revisar nuestros planes desde S/. 65 o tocar el botón de WhatsApp para coordinar directamente con Martín.`;
      shouldSuggestWhatsApp = true;
    }

    return NextResponse.json({
      reply,
      shouldSuggestWhatsApp,
      leadSummary: {
        domain: reportContext?.url || 'Sin especificar',
        score: reportContext?.score ?? 0,
        grade: reportContext?.grade || 'F',
        userQuery: trimmedMsg,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
