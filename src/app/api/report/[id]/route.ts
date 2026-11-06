import { NextResponse } from 'next/server';
import { getReportById } from '@/lib/storage/reportStore';

interface RouteContext {
  params: Promise<{ id: string }>;
}

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id || !UUID_V4_REGEX.test(id)) {
    return NextResponse.json(
      { error: 'Identificador de reporte inválido. Debe ser un UUID v4 canónico.' },
      { status: 400 }
    );
  }

  const report = getReportById(id);

  if (!report) {
    return NextResponse.json(
      { error: 'Reporte perimetral no encontrado o expirado' },
      { status: 404 }
    );
  }

  return NextResponse.json(report, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
