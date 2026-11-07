import fs from 'fs';
import path from 'path';

export interface AuditConsentRecord {
  id: string;
  domain: string;
  normalizedUrl: string;
  timestamp: string; // ISO 8601
  date: string;      // DD de MMMM de YYYY
  time: string;      // HH:mm:ss
  ip: string;
  userAgent: string;
  hasSwornDeclaration: true;
  declarationText: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const CONSENTS_FILE = path.join(DATA_DIR, 'audit-consents.json');

function loadConsentsFromDisk(): AuditConsentRecord[] {
  try {
    if (fs.existsSync(CONSENTS_FILE)) {
      const raw = fs.readFileSync(CONSENTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Fallback silencioso en entornos de solo lectura (ej. Vercel Lambda)
  }
  return [];
}

function persistConsentsToDisk(records: AuditConsentRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(CONSENTS_FILE, JSON.stringify(records, null, 2), 'utf-8');
  } catch {
    // Fallback silencioso en entornos de solo lectura
  }
}

const globalForConsents = globalThis as unknown as {
  __auditConsentsStore?: AuditConsentRecord[];
};

if (!globalForConsents.__auditConsentsStore) {
  globalForConsents.__auditConsentsStore = loadConsentsFromDisk();
}

export const auditConsentsStore = globalForConsents.__auditConsentsStore;

/**
 * Guarda el registro de consentimiento bajo juramento y lo persiste en memoria y disco.
 */
export function saveAuditConsent(record: AuditConsentRecord): void {
  // 1. Guardar en memoria activa
  auditConsentsStore.unshift(record);
  if (auditConsentsStore.length > 2000) {
    auditConsentsStore.pop();
  }

  // 2. Persistir en disco para que sobreviva reinicios de PM2 en DigitalOcean
  persistConsentsToDisk(auditConsentsStore);
}

/**
 * Retorna todos los registros de consentimiento almacenados.
 */
export function getAllAuditConsents(): AuditConsentRecord[] {
  if (auditConsentsStore.length === 0) {
    const fromDisk = loadConsentsFromDisk();
    if (fromDisk.length > 0) {
      auditConsentsStore.push(...fromDisk);
    }
  }
  return [...auditConsentsStore];
}

/**
 * Busca consentimientos registrados por nombre de dominio.
 */
export function getAuditConsentsByDomain(domain: string): AuditConsentRecord[] {
  const all = getAllAuditConsents();
  const clean = domain.trim().toLowerCase();
  return all.filter((c) => c.domain.toLowerCase().includes(clean));
}
