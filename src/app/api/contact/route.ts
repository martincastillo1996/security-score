import { NextResponse } from 'next/server';

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

    // Envío a Webhook opcional (Discord / Slack / Make / Zapier) si está configurado
    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `🚨 **¡Nuevo Lead Comercial Recibido!**\n**Nombre:** ${name}\n**Empresa:** ${company || 'N/A'}\n**Email:** ${email}\n**Teléfono:** ${phone || 'N/A'}\n**Servicio:** ${service}\n**Presupuesto:** ${budget || 'A definir'}\n**Detalles:** ${details || 'Sin notas adicionales'}\n**Fecha:** ${new Date().toLocaleString('es-PE', { timeZone: 'America/Lima' })}`,
          }),
        });
      } catch (webhookErr) {
        console.error('Error enviando notificación webhook de lead:', webhookErr);
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
