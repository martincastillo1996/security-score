'use client';

import React from 'react';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';

interface PrintableReportProps {
  report: AuditReportRecord;
  auditId: string;
}

export default function PrintableReport({ report, auditId }: PrintableReportProps) {
  const portsList = (report as any).ports || [];

  return (
    <div className="hidden print:block bg-white text-slate-900 p-8 max-w-[210mm] mx-auto min-h-[297mm] text-xs font-sans leading-tight">
      {/* Encabezado Técnico */}
      <header className="border-b-2 border-slate-900 pb-4 mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-700" />
            <h1 className="text-lg font-black tracking-tight uppercase text-slate-900">
              DEFENSA TI &bull; Security Score Pro
            </h1>
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
            Dictamen Forense Perimetral de Transporte y Cabeceras RFC
          </p>
        </div>
        <div className="text-right">
          <span className="text-[9px] font-mono text-slate-400 block">ID: {auditId}</span>
          <span className="text-[10px] font-mono font-bold text-slate-700">
            {new Date(report.scannedAt).toLocaleDateString('es-PE')} {new Date(report.scannedAt).toLocaleTimeString('es-PE')}
          </span>
        </div>
      </header>

      {/* Resumen Ejecutivo del Objetivo */}
      <section className="grid grid-cols-4 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg mb-4">
        <div className="col-span-3">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 block">
            Objetivo Evaluado
          </span>
          <span className="font-mono text-sm font-black text-slate-900 break-all">
            {report.url}
          </span>
          <div className="flex gap-4 mt-1 text-[10px] text-slate-600 font-mono">
            <span>IP: {report.telemetry?.targetResolvedIp || 'Anycast Edge'}</span>
            <span>Motor: {report.telemetry?.engineVersion || '1.2.0-cloud'}</span>
          </div>
        </div>
        <div className="text-center border-l border-slate-200 flex flex-col justify-center items-center">
          <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500">Puntaje</span>
          <div className="text-2xl font-black text-slate-900">{report.score}/100</div>
          <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-200 text-slate-800">
            Grado {report.grade}
          </span>
        </div>
      </section>

      {/* Evaluación SSL / TLS */}
      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
          1. Transporte Seguro (SSL / TLS)
        </h2>
        <div className="grid grid-cols-3 gap-2 text-[10px] bg-slate-50 p-2.5 rounded border border-slate-200 font-mono">
          <div>
            <span className="text-slate-500 block">Estado:</span>
            <span className={report.ssl?.valid ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>
              {report.ssl?.valid ? 'Certificado Válido' : 'Inválido / Fallido'}
            </span>
          </div>
          <div>
            <span className="text-slate-500 block">Protocolo:</span>
            <span className="font-bold text-slate-800">{report.ssl?.protocol || 'N/A'}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Vigencia Restante:</span>
            <span className="font-bold text-slate-800">{report.ssl?.daysRemaining ?? 'N/A'} días</span>
          </div>
        </div>
      </section>

      {/* Exposición Perimetral de Red (Puertos Críticos) */}
      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
          2. Superficie de Exposición de Red (Zero-Downtime TCP Sockets)
        </h2>
        <div className="grid grid-cols-5 gap-1.5 text-center font-mono">
          {portsList.length > 0 ? (
            portsList.map((p: any) => {
              const isPort80 = p.port === 80;

              return (
                <div
                  key={p.port}
                  className={`p-1.5 rounded border ${
                    p.isOpen
                      ? isPort80
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-rose-50 border-rose-300 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="text-[10px] font-bold">Puerto {p.port}</div>
                  <div className="text-[8px] text-slate-500 truncate">{p.service}</div>
                  <div className="text-[9px] font-black mt-1">
                    {p.isOpen
                      ? isPort80
                        ? 'REDIREC.'
                        : 'EXPUESTO'
                      : 'PROTEGIDO'}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-5 text-slate-400 text-[10px] py-1 bg-slate-50 border border-slate-200 rounded">
              Sin datos de puertos de red registrados
            </div>
          )}
        </div>
      </section>

      {/* Cabeceras Defensivas HTTP */}
      <section className="mb-4">
        <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
          3. Cabeceras Defensivas HTTP (OWASP / RFC)
        </h2>
        <table className="w-full text-[10px] text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-300 text-slate-600 font-bold uppercase text-[9px]">
              <th className="py-1">Cabecera</th>
              <th className="py-1">Estado</th>
              <th className="py-1">Severidad</th>
              <th className="py-1">Descripción Breve</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono">
            {(Array.isArray(report.headers) ? report.headers : []).map((h: any) => (
              <tr key={h.name}>
                <td className="py-1 font-bold text-slate-800">{h.name}</td>
                <td className="py-1">
                  {h.present ? (
                    <span className="text-emerald-700 font-bold inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> OK
                    </span>
                  ) : (
                    <span className="text-rose-700 font-bold inline-flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> AUSENTE
                    </span>
                  )}
                </td>
                <td className="py-1 text-[9px] font-bold text-slate-600">{h.severity || 'MEDIA'}</td>
                <td className="py-1 text-[9px] text-slate-500 font-sans truncate max-w-50">
                  {h.description || 'Configuración estándar perimetral'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Remediaciones Principales */}
      {report.remediations && report.remediations.length > 0 && (
        <section className="mb-4">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-800 border-b border-slate-200 pb-1 mb-2">
            4. Guía de Mitigación Inmediata
          </h2>
          <div className="space-y-1.5 text-[9px]">
            {report.remediations.slice(0, 3).map((r: any, idx: number) => (
              <div key={idx} className="p-2 rounded bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-900 block font-mono">
                  &bull; {r.header || r.title || 'Remediación Perimetral'}
                </span>
                <p className="text-slate-600 mt-0.5">{r.recommendation || r.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Pie de Página */}
      <footer className="mt-auto pt-3 border-t border-slate-200 text-[9px] text-slate-400 flex justify-between font-mono">
        <span>DEFENSA TI &bull; Reporte emitido automáticamente</span>
        <span>Uso confidencial &bull; Página 1 de 1</span>
      </footer>
    </div>
  );
}