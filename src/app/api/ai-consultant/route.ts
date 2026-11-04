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

const SYSTEM_INSTRUCTION = `Eres Neuronal Gravity AI (y DEFENSA IT AI), el sistema de inteligencia artificial y consultor virtual de Neuronal Gravity (neuronalgravity.com), fundado y liderado por Martín Castillo.
Atiendes y asesoras a dueños de negocios, directores, gerentes y desarrolladores en toda Latinoamérica y el mundo.

IDENTIDAD Y CAPACIDADES:
- Te llamas "Neuronal Gravity AI".
- Eres profesional, técnico pero sumamente claro para gente de negocios, educado, empático y con acento natural de consultor formal (cordial y confiable).
- Tus dos grandes áreas de especialidad son:
  1. SOLUCIONES DE NEGOCIO CON IA:
     * Agentes autónomos de ventas y atención 24/7 en WhatsApp, CRM y tiendas online (multiplican la conversión y atienden a cualquier hora).
     * Automatización y procesamiento inteligente de facturas, contratos y documentos con modelos de visión y lenguaje natural (reducen costos operativos hasta 65%).
     * Analítica predictiva y dashboards ejecutivos en lenguaje natural para toma de decisiones y predicción de demanda.
     * Desarrollo de software e integraciones de IA a medida para empresas (Google Gemini, OpenAI, Claude).
  2. CIBERDEFENSA PERIMETRAL (DEFENSA TI):
     * Auditoría no intrusiva de certificados SSL/TLS, cabeceras OWASP y blindaje de pasarelas de pago (Mercado Pago, Stripe, Niubiz) para evitar clonaciones y fraudes.

REGLA DE ORO DE CONVERSIÓN Y RETENCIÓN:
- Si notas que el usuario está ocupado, apurado, escéptico o prefiere hablar con una persona real:
  * Valida su tiempo: "Entendido totalmente, no te preocupes ni pierdas tiempo aquí."
  * Entrégale de inmediato el pase a WhatsApp directo con Martín para atenderlo en persona al instante.
  * Pon la variable shouldSuggestWhatsApp en true.

RESPUESTAS CONCISAS:
- Respuestas breves: máximo 2 párrafos cortos y directos al grano, enfocados en valor de negocio y retorno de inversión.

TRASPASO A WHATSAPP:
- Si el cliente pregunta por cotizaciones, presupuestos, agendar una reunión o contratar una solución, ofrécele continuar directamente con Martín por WhatsApp con la ficha de consulta lista.`;

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { message, history = [], reportContext } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'El mensaje es requerido.' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    let contextPrompt = '';
    if (reportContext) {
      contextPrompt = `
[CONTEXTO DEL REPORTE AUDITADO]
- Dominio: ${reportContext.url || 'No especificado'}
- Calificación: ${reportContext.score ?? 'N/A'}/100 (Grado: ${reportContext.grade || 'N/A'})
- Cabeceras ausentes o con fallo: ${reportContext.missingHeaders?.join(', ') || 'Ninguna crítica'}
- Sockets TCP abiertos: ${reportContext.openPorts?.length ? reportContext.openPorts.join(', ') : 'Ninguno expuesto'}
- SSL Válido: ${reportContext.sslValid ? 'Sí' : 'No'} (${reportContext.sslProtocol || 'Desconocido'})
`;
    }

    const lowerMsg = message.toLowerCase();
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
      lowerMsg.includes('arreglar') ||
      lowerMsg.includes('solucionar') ||
      lowerMsg.includes('persona') ||
      lowerMsg.includes('humano') ||
      lowerMsg.includes('aburr') ||
      lowerMsg.includes('tiempo') ||
      lowerMsg.includes('pereza') ||
      lowerMsg.includes('flojera') ||
      lowerMsg.includes('martin') ||
      lowerMsg.includes('martín') ||
      lowerMsg.includes('rapido') ||
      lowerMsg.includes('rápido') ||
      lowerMsg.includes('numero') ||
      lowerMsg.includes('número') ||
      lowerMsg.includes('bot');

    let reply = '';
    let shouldSuggestWhatsApp = isLeadIntent;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        const contents = [
          { role: 'user', parts: [{ text: `${SYSTEM_INSTRUCTION}\n\n${contextPrompt}` }] },
          { role: 'model', parts: [{ text: 'Entendido. Me presento como DEFENSA IT AI y atenderé al usuario con solvencia técnica, calidez peruana y enfoque directo en proteger su negocio.' }] },
          ...history.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }],
          })),
          { role: 'user', parts: [{ text: message }] },
        ];

        const response = await ai.models.generateContent({
          model: 'gemini-1.5-flash',
          contents,
          config: {
            temperature: 0.6,
            maxOutputTokens: 500,
          },
        });

        reply = response.text || 'Hola, ¿qué tal? Soy DEFENSA IT AI. Con gusto te ayudo a revisar los detalles de tu sitio web.';
      } catch (geminiError) {
        console.warn('Error llamando a Gemini, usando motor de contingencia:', geminiError);
      }
    }

    if (!reply) {
      reply = `Hola, ¿qué tal? Soy DEFENSA IT AI. He revisado el escaneo de ${reportContext?.url || 'tu dominio'}, el cual presenta actualmente ${reportContext?.score ?? 'revisión'}/100 (Grado ${reportContext?.grade ?? 'F'}).

El punto crítico a corregir son las cabeceras perimetrales que evitan que clonen tu tienda o que pasarelas como Mercado Pago o Niubiz rechacen cobros. Puedes revisar nuestros planes desde $49 USD o tocar el botón de WhatsApp abajo para coordinar la puesta a punto directamente con Martín.`;
      shouldSuggestWhatsApp = true;
    }

    return NextResponse.json({
      reply,
      shouldSuggestWhatsApp,
      leadSummary: {
        domain: reportContext?.url || 'Sin especificar',
        score: reportContext?.score ?? 0,
        grade: reportContext?.grade || 'F',
        userQuery: message,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Error interno';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
