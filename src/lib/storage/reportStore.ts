import { PortCheckResult } from '@/lib/scanner/portScanner';

export interface AuditReportRecord {
  id?: string;
  url: string;
  score: number;
  grade: string;
  ssl?: any;
  headers?: any[];
  ports?: PortCheckResult[] | any[];
  remediations?: any[];
  telemetry?: any;
  scannedAt?: string;
  [key: string]: any;
}

const globalForReports = globalThis as unknown as {
  __reportsMap?: Map<string, AuditReportRecord>;
};

if (!globalForReports.__reportsMap) {
  globalForReports.__reportsMap = new Map<string, AuditReportRecord>();
}

export const reportStore = globalForReports.__reportsMap;

export function saveReport(id: string, report: AuditReportRecord): void {
  reportStore.set(id, report);
}

export function getReportById(id: string): AuditReportRecord | undefined {
  return reportStore.get(id);
}