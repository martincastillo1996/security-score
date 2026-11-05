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

const globalForLeads = globalThis as unknown as {
  __leadsStore?: LeadRecord[];
};

if (!globalForLeads.__leadsStore) {
  globalForLeads.__leadsStore = [];
}

export const leadsStore = globalForLeads.__leadsStore;

export function saveLead(lead: LeadRecord): void {
  // Mantener en memoria persistente de Node.js (hasta 500 registros)
  leadsStore.unshift(lead);
  if (leadsStore.length > 500) {
    leadsStore.pop();
  }
}

export function getAllLeads(): LeadRecord[] {
  return [...leadsStore];
}
