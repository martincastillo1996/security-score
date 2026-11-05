import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/storage/leadStore';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('token');
  const expectedSecret = process.env.ADMIN_TOKEN || 'neuronalgravity-secure-2026';

  if (!secret || secret !== expectedSecret) {
    return NextResponse.json({ error: 'Acceso no autorizado' }, { status: 401 });
  }

  const leads = getAllLeads();
  return NextResponse.json({
    total: leads.length,
    leads,
  });
}
