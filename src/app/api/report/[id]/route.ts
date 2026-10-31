import { NextResponse } from 'next/server';
import { getReportById } from '@/lib/storage/reportStore';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json({ error: 'Identificador no suministrado' }, { status: 400 });
  }

  const report = getReportById(id);

  if (!report) {
    return NextResponse.json({ error: 'Reporte perimetral no encontrado o expirado' }, { status: 404 });
  }

  return NextResponse.json(report, { status: 200 });
}