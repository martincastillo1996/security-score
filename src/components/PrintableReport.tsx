'use client';

import React from 'react';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface Props {
  report: AuditReportRecord;
  auditId: string;
}

export default function PrintableReport({ report, auditId }: Props) {
  if (!report) return null;

  const scannedDate = new Date(report.scannedAt || Date.now());
  const formattedDate = scannedDate.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
  const formattedTime = scannedDate.toLocaleTimeString('es-PE', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const isGitPlatform =
    report.url?.includes('github.com') || report.url?.includes('gitlab.com');

  // Detección estricta de SSL
  const hasValidSsl =
    Boolean(report.ssl?.valid) &&
    report.ssl?.protocol !== 'Sin HTTPS' &&
    !report.url?.startsWith('http://');

  return (
    <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[9999] text-xs font-sans">
      {/* Encabezado Superior */}
      <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 border-2 border-neutral-900 rounded-lg">
            {hasValidSsl ? (
              <ShieldCheck className="w-6 h-6 text-neutral-900" />
            ) : (
              <ShieldAlert className="w-6 h-6 text-neutral-900" />
            )}
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight uppercase text-neutral-900">
              DEFENSA TI &bull; SECURITY SCORE PRO
            </h1>
            <p className="text-[10px] text-neutral-600 font-mono">
              Dictamen Forense Perimetral de Transporte y Cabeceras RFC / OWASP
            </p>
          </div>
        </div>

        {/* Metadatos */}
        <div className="text-right font-mono text-[10px] text-neutral-700">
          <p className="font-bold text-neutral-900">ID: {auditId || report.id || 'N/A'}</p>
          <p>{formattedDate} {formattedTime}</p>
          <p className="text-neutral-500">Motor: {report.telemetry?.engineVersion || '1.2.0-cloud'}</p>
        </div>
      </div>

      {/* Tarjeta de Resumen */}
      <div className="border border-neutral-300 rounded-xl p-4 mb-6 flex justify-between items-center bg-neutral-50/50">
        <div>
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
            Objetivo Evaluado
          </span>
          <span className="text-lg font-bold font-mono text-neutral-900">{report.url}</span>
          <div className="text-[10px] text-neutral-600 font-mono mt-1">
            <span>IP: {report.telemetry?.targetResolvedIp || 'Anycast Edge Cloud'}</span>
          </div>
        </div>
        <div className="text-right border-l border-neutral-300 pl-6">
          <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block">
            Puntaje Global
          </span>
          <span className="text-3xl font-extrabold font-mono text-neutral-900">
            {report.score}/100
          </span>
          <span className="block text-xs font-bold text-neutral-700">Grado {report.grade}</span>
        </div>
      </div>

      {/* 1. Transporte Seguro */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">
          1. Transporte Seguro (SSL / TLS)
        </h2>
        <div className="grid grid-cols-3 gap-3 border border-neutral-200 rounded-lg p-3 text-[11px]">
          <div>
            <span className="text-neutral-500 block">Estado:</span>
            <span className={`font-semibold ${hasValidSsl ? 'text-neutral-900' : 'text-rose-600 font-bold'}`}>
              {hasValidSsl ? 'Certificado Válido' : 'Sin HTTPS / Inválido'}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Protocolo Negociado:</span>
            <span className="font-semibold text-neutral-900">
              {hasValidSsl ? report.ssl?.protocol || 'TLSv1.3' : 'Sin Cifrado'}
            </span>
          </div>
          <div>
            <span className="text-neutral-500 block">Vigencia Restante:</span>
            <span className="font-semibold text-neutral-900">
              {hasValidSsl ? `${report.ssl?.daysRemaining ?? 'N/A'} días` : '0 días'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Sockets Perimetrales */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">
          2. Superficie de Exposición de Red (Zero-Downtime TCP Sockets)
        </h2>
        <div className="grid grid-cols-5 gap-2">
          {((report as any).ports || []).map((p: any) => {
            const isPort80 = p.port === 80;
            const isGitSsh = p.port === 22 && isGitPlatform;

            let badgeText = 'PROTEGIDO';
            let borderStyle = 'border-neutral-200 bg-neutral-50';

            if (p.isOpen) {
              if (isPort80) {
                // Si el sitio NO tiene SSL válido, el puerto 80 es texto plano expuesto
                badgeText = hasValidSsl ? 'REDIREC.' : 'EXPUESTO';
                borderStyle = hasValidSsl
                  ? 'border-amber-400 bg-amber-50/50'
                  : 'border-rose-400 bg-rose-50/50 text-rose-600';
              } else if (isGitSsh) {
                badgeText = 'GIT SSH';
                borderStyle = 'border-blue-400 bg-blue-50/50';
              } else {
                badgeText = 'EXPUESTO';
                borderStyle = 'border-rose-400 bg-rose-50/50 text-rose-600';
              }
            }

            return (
              <div key={p.port} className={`border rounded-lg p-2 text-center ${borderStyle}`}>
                <div className="font-mono text-[10px] font-bold text-neutral-900">
                  Puerto {p.port}
                </div>
                <div className="text-[9px] text-neutral-500 truncate">{p.service}</div>
                <div className="mt-1 font-mono text-[9px] font-bold">
                  {badgeText}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Directivas OWASP */}
      <div className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">
          3. Cabeceras Defensivas HTTP (OWASP / RFC)
        </h2>
        <table className="w-full text-left border-collapse text-[10px]">
          <thead>
            <tr className="border-b border-neutral-300 font-mono text-neutral-500">
              <th className="py-1">Cabecera</th>
              <th className="py-1">Estado</th>
              <th className="py-1">Severidad</th>
              <th className="py-1">Descripción Breve</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 font-mono">
            {(report.headers || []).map((h: any, i: number) => (
              <tr key={i} className="py-1">
                <td className="py-1.5 font-bold text-neutral-900">{h.name || h.header}</td>
                <td className="py-1.5">
                  <span className="font-semibold text-neutral-900">
                    {h.status === 'ok' || h.score > 0 || h.present ? '✓ OK' : '✗ FALTA'}
                  </span>
                </td>
                <td className="py-1.5 text-neutral-600 uppercase">{h.severity || 'MEDIA'}</td>
                <td className="py-1.5 text-neutral-600 font-sans text-[10px]">
                  {h.description || 'Validación perimetral de cabecera conforme a especificación.'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pie de Página */}
      <div className="mt-auto border-t border-neutral-300 pt-3 flex justify-between items-center text-[9px] font-mono text-neutral-500">
        <span>DEFENSA TI &bull; Reporte emitido automáticamente</span>
        <span>Uso confidencial &bull; Página 1 de 1</span>
      </div>
    </div>
  );
}