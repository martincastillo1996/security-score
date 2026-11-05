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
