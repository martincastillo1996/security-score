import { PortCheckResult } from '@/lib/scanner/portScanner';
import { HeaderCheckItem } from '@/lib/scanner/headerScanner';
import { SslCheckResult } from '@/lib/scanner/sslScanner';
import { RemediationItem } from '@/lib/ai/remediation';
import { ServerGeoLocation } from '@/lib/scanner/geoScanner';
import { CookieScanResult } from '@/lib/scanner/cookieScanner';

export interface AuditTelemetry {
  durationMs: number;
  aiModel: string;
  targetResolvedIp?: string;
  engineVersion: string;
}

export interface AuditReportRecord {
  id?: string;
  url: string;
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  ssl?: SslCheckResult;
  headers?: HeaderCheckItem[];
  ports?: PortCheckResult[];
  remediations?: RemediationItem[];
  telemetry?: AuditTelemetry;
  location?: ServerGeoLocation | null;
  cookies?: CookieScanResult;
  scannedAt?: string;
  isHyperscale?: boolean;
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
