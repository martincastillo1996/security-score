import { FullAuditResult } from '../scanner/sslScanner';
import { RemediationItem } from '../ai/remediation';

export interface AuditReportRecord extends FullAuditResult {
  id: string;
  remediations: RemediationItem[];
  telemetry: {
    durationMs: number;
    aiModel: string;
    targetResolvedIp?: string;
    engineVersion: string;
  };
}

// Almacén en memoria global para el ciclo de vida del servidor
const globalReportStore = new Map<string, AuditReportRecord>();

export function saveReport(report: AuditReportRecord): void {
  globalReportStore.set(report.id, report);
}

export function getReportById(id: string): AuditReportRecord | null {
  return globalReportStore.get(id) || null;
}