import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveLead } from '@/lib/storage/leadStore';
import { v4 as uuidv4 } from 'uuid';

// Rate Limiter per IP (5 envíos por cada 10 minutos para evitar spam y saturación)
const contactRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutos
  const maxRequests = 5;

  const record = contactRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    contactRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

// Funciones de Sanitización y Escapado
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Elimina etiquetas HTML completas
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, ''); // Elimina caracteres de control
}

function sanitizeText(val: unknown, maxLength: number): string {
  if (typeof val !== 'string') return '';
  return stripHtml(val).trim().slice(0, maxLength);
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
}

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);

    // 1. Rate Limiting por IP
    if (!checkContactRateLimit(clientIp)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes enviadas. Por favor espera unos minutos o comunícate por WhatsApp.' },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Cuerpo de la solicitud inválido.' },
        { status: 400 }
      );
    }

    // 2. Trampa Honeypot contra Bots automatizados
    if (body.website || body.honeypot || body.fax) {
      return NextResponse.json({
        success: true,
        message: 'Solicitud recibida correctamente.',
      });
    }

    // 3. Sanitización estricta de todos los campos
    const name = sanitizeText(body.name, 80);
    const company = sanitizeText(body.company, 80);
    const email = sanitizeText(body.email, 100).toLowerCase();
    const phone = sanitizeText(body.phone, 30);
    const service = sanitizeText(body.service, 80);
    const budget = sanitizeText(body.budget, 50);
    const details = sanitizeText(body.details, 1200);

    // 4. Validaciones Requeridas y de Formato
    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Por favor completa los campos requeridos (Nombre, Email y Servicio).' },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { error: 'El formato del correo electrónico no es válido.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

    // 5. Persistencia del Lead en Almacenamiento Estructurado (Datos ya limpios de HTML)
    const leadRecord = {
      id: uuidv4(),
      name,
      company: company || '',
      email,
      phone: phone || '',
      service,
      budget: budget || '',
      details: details || '',
      createdAt: new Date().toISOString(),
      userAgent: sanitizeText(req.headers.get('user-agent'), 250) || undefined,
      ip: clientIp,
    };
    saveLead(leadRecord);

    // Log en servidor sin contenido sin procesar
    console.log('[NUEVO LEAD - NEURONAL GRAVITY]', {
      name,
      company,
      email,
      phone,
      service,
      budget,
      date: new Date().toISOString(),
    });

    // 6. Envío de Correo Profesional vía Resend con Escapado HTML Estricto (Anti-HTML Injection)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'castillo.karol96@gmail.com';

        const safeName = escapeHtml(name);
        const safeCompany = escapeHtml(company || 'No especificada');
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || 'No especificado');
        const safeService = escapeHtml(service);
        const safeBudget = escapeHtml(budget || 'A definir');
        const safeDetails = details ? escapeHtml(details).replace(/\n/g, '<br/>') : '';

        await resend.emails.send({
          from: 'Neuronal Gravity Leads <onboarding@resend.dev>',
          to: adminEmail,
          subject: `🚨 Nuevo Lead: ${safeName} (${company || 'Empresa'}) - ${safeService}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f17; color: #f3f4f6; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto;">
              <h2 style="color: #38bdf8; margin-top: 0;">🚀 Nueva Solicitud de Propuesta Comercial</h2>
              <p style="color: #9ca3af; font-size: 14px;">Recibida el ${timestamp} (Hora Perú)</p>
              
              <div style="background-color: #161e2e; border: 1px solid #1f2937; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>👤 Nombre:</strong> ${safeName}</p>
                <p style="margin: 8px 0;"><strong>🏢 Empresa:</strong> ${safeCompany}</p>
                <p style="margin: 8px 0;"><strong>✉️ Email:</strong> <a href="mailto:${safeEmail}" style="color: #38bdf8;">${safeEmail}</a></p>
                <p style="margin: 8px 0;"><strong>📱 Teléfono:</strong> ${safePhone}</p>
                <p style="margin: 8px 0;"><strong>🛠️ Servicio:</strong> <span style="color: #34d399; font-weight: bold;">${safeService}</span></p>
                <p style="margin: 8px 0;"><strong>💰 Presupuesto Estimado:</strong> ${safeBudget}</p>
              </div>

              ${safeDetails ? `
              <div style="background-color: #111827; border-left: 4px solid #38bdf8; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 13px; color: #d1d5db;"><strong>Detalles del proyecto:</strong></p>
                <p style="margin: 6px 0 0; color: #f3f4f6;">${safeDetails}</p>
              </div>` : ''}

              <div style="text-align: center; margin-top: 25px;">
                <a href="https://wa.me/${phone ? phone.replace(/[^0-9]/g, '') : ''}" style="background-color: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
                  Responder por WhatsApp
                </a>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.error('Error enviando correo de notificación con Resend:', emailErr);
      }
    }

    // 7. Envío a Webhook opcional de respaldo (Discord / Slack / CRM)
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🚨 **¡Nuevo Lead Comercial Recibido!**\n**Nombre:** ${name}\n**Empresa:** ${company || 'N/A'}\n**Email:** ${email}\n**Teléfono:** ${phone || 'N/A'}\n**Servicio:** ${service}\n**Presupuesto:** ${budget || 'A definir'}\n**Detalles:** ${details || 'Sin notas adicionales'}\n**Fecha:** ${timestamp}`,
          }),
        });
      } catch (webhookErr) {
        console.error('Error enviando notificación webhook de lead:', webhookErr);
      }
    }

    // 8. Envío opcional a Telegram Bot
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const text = `🚨 *NUEVO LEAD COMERCIAL - NEURONAL GRAVITY*\n\n` +
          `👤 *Nombre:* ${escapeMarkdown(name)}\n` +
          `🏢 *Empresa:* ${escapeMarkdown(company || 'N/A')}\n` +
          `✉️ *Email:* ${escapeMarkdown(email)}\n` +
          `📱 *Teléfono:* ${escapeMarkdown(phone || 'N/A')}\n` +
          `🛠️ *Servicio:* ${escapeMarkdown(service)}\n` +
          `💰 *Presupuesto:* ${escapeMarkdown(budget || 'A definir')}\n` +
          (details ? `📝 *Detalles:* ${escapeMarkdown(details)}\n` : '') +
          `🕒 *Fecha:* ${escapeMarkdown(timestamp)}`;

        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text,
            parse_mode: 'Markdown',
          }),
        });
      } catch (tgErr) {
        console.error('Error enviando notificación a Telegram:', tgErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Solicitud recibida correctamente. Nos comunicaremos a la brevedad.',
    });
  } catch (error) {
    console.error('Error al procesar solicitud de cotización:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Por favor intenta por WhatsApp.' },
      { status: 500 }
    );
  }
}
