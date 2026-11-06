import { NextResponse } from 'next/server';
import { getAllLeads } from '@/lib/storage/leadStore';
import crypto from 'crypto';

// Rate limiter en memoria para intentos fallidos de autenticación admin (frena fuerza bruta)
const failedAttemptsMap = new Map<string, { count: number; blockedUntil: number }>();

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return '127.0.0.1';
}

function isIpBlocked(ip: string): boolean {
  const record = failedAttemptsMap.get(ip);
  if (!record) return false;
  if (Date.now() > record.blockedUntil) {
    failedAttemptsMap.delete(ip);
    return false;
  }
  return record.count >= 5;
}

function recordFailedAttempt(ip: string) {
  const now = Date.now();
  const record = failedAttemptsMap.get(ip) || { count: 0, blockedUntil: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.blockedUntil = now + 15 * 60 * 1000; // Bloqueo temporal por 15 minutos
  }
  failedAttemptsMap.set(ip, record);
}

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function GET(req: Request) {
  const clientIp = getClientIp(req);

  // 1. Protección Anti-Fuerza Bruta
  if (isIpBlocked(clientIp)) {
    return NextResponse.json(
      { error: 'Demasiados intentos fallidos. Acceso temporalmente suspendido.' },
      { status: 429 }
    );
  }

  // 2. Token de administración obligatorio desde variables de entorno seguras (Cero fallbacks en código)
  const expectedSecret = process.env.ADMIN_TOKEN;
  if (!expectedSecret || expectedSecret.trim().length < 16) {
    return NextResponse.json(
      { error: 'El panel de administración no está configurado en este servidor.' },
      { status: 403 }
    );
  }

  // 3. Extracción de token de autorización (Preferencia por Header Bearer o x-admin-token)
  const authHeader = req.headers.get('authorization') || '';
  let providedToken = '';

  if (authHeader.startsWith('Bearer ')) {
    providedToken = authHeader.slice(7).trim();
  } else if (req.headers.get('x-admin-token')) {
    providedToken = req.headers.get('x-admin-token')!.trim();
  } else {
    // Soporte residual temporal para query string con validación segura
    const { searchParams } = new URL(req.url);
    providedToken = searchParams.get('token') || '';
  }

  // 4. Comparación de tiempo constante (Anti-Timing Attack)
  if (!providedToken || !safeCompare(providedToken, expectedSecret)) {
    recordFailedAttempt(clientIp);
    return NextResponse.json(
      { error: 'Acceso no autorizado: Credenciales inválidas.' },
      { status: 401 }
    );
  }

  // Éxito: limpiar intentos fallidos
  failedAttemptsMap.delete(clientIp);

  const leads = getAllLeads();
  return NextResponse.json({
    total: leads.length,
    leads,
  });
}
