import { GoogleGenAI } from '@google/genai';
import { HeaderResult } from '../scanner/headerScanner';

export interface RemediationSnippets {
  nginx: string;
  apache: string;
  express: string;
}

export interface RemediationItem {
  header: string;
  headerName: string; // Retrocompatibilidad para RemediationList.tsx
  severity: 'Crítica' | 'Alta' | 'Media' | 'Baja';
  impact?: string;    // Retrocompatibilidad para RemediationList.tsx
  description: string;
  fix: string;        // Snippet principal o directiva general
  snippets: RemediationSnippets;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function generateRemediation(
  targetUrl: string,
  missingHeaders: HeaderResult[] | string,
  isHyperscale: boolean = false
): Promise<RemediationItem[]> {
  // Manejo flexible si se recibe string o array de HeaderResult
  let headersToAudit: string[] = [];
  if (Array.isArray(missingHeaders)) {
    headersToAudit = missingHeaders.map(h => h.name);
  } else if (typeof missingHeaders === 'string') {
    headersToAudit = missingHeaders.split(',').map(s => s.trim());
  }

  if (headersToAudit.length === 0) return [];

  const contextInstruction = isHyperscale
    ? `NOTA DE CONTEXTO: El dominio ${targetUrl} pertenece a una infraestructura de hiperescala global. Aclara en tus notas técnicas que la ausencia de cabeceras en páginas de inicio suele responder a decisiones de optimización de latencia y no a negligencia crítica.`
    : '';

  const prompt = `
Eres un ingeniero senior de ciberseguridad defensiva y hardening perimetral.
${contextInstruction}

Analiza las siguientes cabeceras ausentes para el sitio: ${targetUrl}
Cabeceras ausentes: ${headersToAudit.join(', ')}

Genera una respuesta JSON pura (array de objetos) con exactamente esta estructura:
[
  {
    "header": "Nombre de cabecera",
    "severity": "Crítica" | "Alta" | "Media" | "Baja",
    "description": "Explicación concisa del riesgo y contexto",
    "impact": "Impacto operativo o perimetral",
    "snippets": {
      "nginx": "directiva exacta de nginx",
      "apache": "directiva exacta de apache",
      "express": "directiva exacta de express/helmet"
    }
  }
]
No agregues bloques markdown de código (\`\`\`json), únicamente la cadena JSON pura.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const text = response.text?.trim() || '[]';
    const cleanedText = text.replace(/^```json/, '').replace(/```$/, '').trim();
    const parsed = JSON.parse(cleanedText);

    return parsed.map((item: any) => ({
      header: item.header,
      headerName: item.header,
      severity: item.severity || 'Media',
      impact: item.impact || 'Exposición a ataques perimetrales en clientes web.',
      description: item.description,
      fix: item.snippets?.nginx || `add_header ${item.header} "default" always;`,
      snippets: {
        nginx: item.snippets?.nginx || `add_header ${item.header} "default" always;`,
        apache: item.snippets?.apache || `Header always set ${item.header} "default"`,
        express: item.snippets?.express || `res.setHeader('${item.header}', 'default');`,
      },
    }));
  } catch (error) {
    console.error('Error generando remediación con IA:', error);
    return headersToAudit.map((name) => ({
      header: name,
      headerName: name,
      severity: name.includes('content-security-policy') ? 'Crítica' : 'Alta',
      impact: 'Exposición potencial ante vectores XSS o inyección de código.',
      description: `Implementar cabecera defensiva ${name} según lineamientos OWASP.`,
      fix: `add_header ${name} "default" always;`,
      snippets: {
        nginx: `add_header ${name} "default" always;`,
        apache: `Header always set ${name} "default"`,
        express: `res.setHeader('${name}', 'default');`,
      },
    }));
  }
}