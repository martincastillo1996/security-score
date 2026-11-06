import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveLead } from '@/lib/storage/leadStore';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, budget, details } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: 'Por favor completa los campos requeridos.' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' });

    // 0. Persistencia del Lead en Almacenamiento Estructurado
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
      userAgent: req.headers.get('user-agent') || undefined,
      ip: req.headers.get('x-forwarded-for') || undefined,
    };
    saveLead(leadRecord);

    // Log estructurado en servidor
    console.log('[NUEVO LEAD - NEURONAL GRAVITY]', {
      name,
      company,
      email,
      phone,
      service,
      budget,
      details,
      date: new Date().toISOString(),
    });

    // 1. Envío de Correo Profesional vía Resend (si existe RESEND_API_KEY)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || 'castillo.karol96@gmail.com';

        // Notificación al administrador / Martín
        await resend.emails.send({
          from: 'Neuronal Gravity Leads <onboarding@resend.dev>',
          to: adminEmail,
          subject: `🚨 Nuevo Lead: ${name} (${company || 'Empresa'}) - ${service}`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0b0f17; color: #f3f4f6; padding: 30px; border-radius: 12px; max-width: 600px; margin: auto;">
              <h2 style="color: #38bdf8; margin-top: 0;">🚀 Nueva Solicitud de Propuesta Comercial</h2>
              <p style="color: #9ca3af; font-size: 14px;">Recibida el ${timestamp} (Hora Perú)</p>
              
              <div style="background-color: #161e2e; border: 1px solid #1f2937; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <p style="margin: 8px 0;"><strong>👤 Nombre:</strong> ${name}</p>
                <p style="margin: 8px 0;"><strong>🏢 Empresa:</strong> ${company || 'No especificada'}</p>
                <p style="margin: 8px 0;"><strong>✉️ Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
                <p style="margin: 8px 0;"><strong>📱 Teléfono:</strong> ${phone || 'No especificado'}</p>
                <p style="margin: 8px 0;"><strong>🛠️ Servicio:</strong> <span style="color: #34d399; font-weight: bold;">${service}</span></p>
                <p style="margin: 8px 0;"><strong>💰 Presupuesto Estimado:</strong> ${budget || 'A definir'}</p>
              </div>

              ${details ? `
              <div style="background-color: #111827; border-left: 4px solid #38bdf8; padding: 15px; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 13px; color: #d1d5db;"><strong>Detalles del proyecto:</strong></p>
                <p style="margin: 6px 0 0; color: #f3f4f6; white-space: pre-wrap;">${details}</p>
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

    // 2. Envío a Webhook opcional de respaldo (Discord / Slack / CRM)
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

    // 3. Envío opcional a Telegram Bot
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (telegramToken && telegramChatId) {
      try {
        const text = `🚨 *NUEVO LEAD COMERCIAL - NEURONAL GRAVITY*\n\n` +
          `👤 *Nombre:* ${name}\n` +
          `🏢 *Empresa:* ${company || 'N/A'}\n` +
          `✉️ *Email:* ${email}\n` +
          `📱 *Teléfono:* ${phone || 'N/A'}\n` +
          `🛠️ *Servicio:* ${service}\n` +
          `💰 *Presupuesto:* ${budget || 'A definir'}\n` +
          (details ? `📝 *Detalles:* ${details}\n` : '') +
          `🕒 *Fecha:* ${timestamp}`;

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
