import fs from 'fs';
import path from 'path';

export interface LeadRecord {
  id: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  details?: string;
  createdAt: string;
  userAgent?: string;
  ip?: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

function loadLeadsFromDisk(): LeadRecord[] {
  try {
    if (fs.existsSync(LEADS_FILE)) {
      const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
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

function persistLeadsToDisk(leads: LeadRecord[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf-8');
  } catch {
    // Fallback silencioso en entornos donde el FS sea de solo lectura
  }
}

const globalForLeads = globalThis as unknown as {
  __leadsStore?: LeadRecord[];
};

if (!globalForLeads.__leadsStore) {
  globalForLeads.__leadsStore = loadLeadsFromDisk();
}

export const leadsStore = globalForLeads.__leadsStore;

export function saveLead(lead: LeadRecord): void {
  // 1. Guardar en memoria activa
  leadsStore.unshift(lead);
  if (leadsStore.length > 500) {
    leadsStore.pop();
  }

  // 2. Persistir en disco para que sobreviva reinicios de PM2 en el servidor
  persistLeadsToDisk(leadsStore);
}

export function getAllLeads(): LeadRecord[] {
  // Si la memoria está vacía, intentar sincronizar desde el disco
  if (leadsStore.length === 0) {
    const fromDisk = loadLeadsFromDisk();
    if (fromDisk.length > 0) {
      leadsStore.push(...fromDisk);
    }
  }
  return [...leadsStore];
}
