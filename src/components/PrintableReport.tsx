'use client';

import React from 'react';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, Building2, Code2 } from 'lucide-react';

interface Props {
  report: AuditReportRecord;
  auditId: string;
}

export default function PrintableReport({ report, auditId }: Props) {
  if (!report) return null;

  const scannedDate = new Date(report.scannedAt || '1970-01-01T00:00:00.000Z');
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

  const hasValidSsl =
    Boolean(report.ssl?.valid) &&
    report.ssl?.protocol !== 'Sin HTTPS' &&
    !report.url?.startsWith('http://');

  const missingHeaders = (report.headers || []).filter(h => !h.present);
  const hasDowngradeRisk = missingHeaders.some(h => (h.header || h.name || '').toLowerCase().includes('transport-security'));
  const hasOpenAdminPorts = (report.ports || []).some(
    p => p.isOpen && [21, 22, 3306, 5432].includes(p.port)
  );

  return (
    <div className="hidden print:block fixed inset-0 bg-white text-black z-[9999] text-xs font-sans">
      
      {/* ========================================================================= */}
      {/* PÁGINA 1: DICTAMEN EJECUTIVO (PARA GERENCIA / DUEÑO DE NEGOCIO) */}
      {/* ========================================================================= */}
      <div className="p-8 min-h-screen flex flex-col justify-between">
        <div>
          {/* Encabezado Superior */}
          <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-neutral-900 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight uppercase text-neutral-900">
                  NEURONAL GRAVITY &bull; DEFENSA TI
                </h1>
                <p className="text-[10px] text-neutral-700 font-bold">
                  Soluciones Tecnológicas &bull; RUC 10704877850 &bull; Lima, Perú
                </p>
                <div className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[9px] font-bold">
                  <Building2 className="w-3 h-3 text-emerald-400" />
                  <span>PARTE 1 DE 2: DICTAMEN EJECUTIVO (PARA EL DUEÑO O GERENCIA)</span>
                </div>
              </div>
            </div>

            {/* Metadatos */}
            <div className="text-right font-mono text-[10px] text-neutral-700">
              <p className="font-bold text-neutral-900">ID: {auditId || report.id || 'N/A'}</p>
              <p>{formattedDate} {formattedTime}</p>
              <p className="text-neutral-500">Auditor: Martín Castillo</p>
            </div>
          </div>

          {/* Tarjeta de Resumen Ejecutivo */}
          <div className="border border-neutral-300 rounded-xl p-3.5 mb-4 flex justify-between items-center bg-neutral-50/70">
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">
                Empresa / Dominio Evaluado
              </span>
              <span className="text-base font-bold font-mono text-neutral-900">{report.url}</span>
              <div className="text-[9.5px] text-neutral-600 font-mono mt-0.5">
                <span>IP Servidor: {report.telemetry?.targetResolvedIp || 'Anycast Edge Cloud'}</span>
              </div>
            </div>
            <div className="text-right border-l border-neutral-300 pl-5">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-wider block">
                Calificación Perimetral
              </span>
              <span className="text-2xl font-black font-mono text-neutral-900">
                {report.score}/100
              </span>
              <span className="block text-xs font-bold text-neutral-800">Grado {report.grade}</span>
            </div>
          </div>

          {/* Semáforo de 5 Puntos Clave de Negocio */}
          <div className="mb-4">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-2">
              <h2 className="text-[11px] font-bold uppercase tracking-wider text-neutral-900">
                Diagnóstico de Riesgo Comercial (Semáforo de Decisión)
              </h2>
              <span className="text-[9px] font-mono text-neutral-500">
                🟢 Óptimo &bull; 🟡 Advertencia &bull; 🔴 Crítico
              </span>
            </div>

            <div className="space-y-2 text-[10px]">
              {/* 1. Candado SSL */}
              <div className={`p-2.5 rounded-lg border flex items-start justify-between gap-3 ${hasValidSsl ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">1. Candado de Seguridad (Certificado SSL):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {hasValidSsl 
                      ? `Activo y vigente por los próximos ${report.ssl?.daysRemaining ?? '...'} días. La conexión básica entre tu cliente y tu página viaja cifrada.` 
                      : 'Crítico: Certificado SSL vencido o ausente. Los navegadores muestran advertencia roja y ahuyentan clientes.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] shrink-0 ${hasValidSsl ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {hasValidSsl ? '🟢 Óptimo' : '🔴 Crítico'}
                </span>
              </div>

              {/* 2. Anti-Clonación */}
              <div className={`p-2.5 rounded-lg border flex items-start justify-between gap-3 ${missingHeaders.length === 0 ? 'bg-emerald-50/50 border-emerald-300' : missingHeaders.length < 3 ? 'bg-amber-50/50 border-amber-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">2. Protección Anti-Clonación en Navegadores:</strong>
                  <span className="text-neutral-700 leading-tight">
                    {missingHeaders.length === 0
                      ? 'Blindado: Tu portal cuenta con las directivas perimetrales que impiden ser duplicado o incrustado dentro de otras páginas.'
                      : `Atención: Faltan ${missingHeaders.length} reglas perimetrales (CSP, X-Frame). Terceros pueden incrustar tu web en páginas espejo para suplantar identidad.`}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] shrink-0 ${missingHeaders.length === 0 ? 'bg-emerald-200 text-emerald-900' : missingHeaders.length < 3 ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}`}>
                  {missingHeaders.length === 0 ? '🟢 Óptimo' : missingHeaders.length < 3 ? '🟡 Advertencia' : '🔴 Crítico'}
                </span>
              </div>

              {/* 3. Accesos y Bases de Datos */}
              <div className={`p-2.5 rounded-lg border flex items-start justify-between gap-3 ${!hasOpenAdminPorts ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">3. Accesos y Bases de Datos:</strong>
                  <span className="text-neutral-700 leading-tight">
                    {!hasOpenAdminPorts
                      ? 'Protegido: Tus bases de datos y accesos privados están debidamente ocultos y cerrados a miradas públicas.'
                      : 'Crítico: Hay puertos de gestión o base de datos abiertos a internet público. Riesgo de ataques de fuerza bruta.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] shrink-0 ${!hasOpenAdminPorts ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {!hasOpenAdminPorts ? '🟢 Óptimo' : '🔴 Crítico'}
                </span>
              </div>

              {/* 4. Pasarelas de Pago */}
              <div className={`p-2.5 rounded-lg border flex items-start justify-between gap-3 ${(report.score ?? 0) >= 85 ? 'bg-emerald-50/50 border-emerald-300' : (report.score ?? 0) >= 60 ? 'bg-amber-50/50 border-amber-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">4. Compatibilidad con Pasarelas de Pago (Yape, Niubiz, Culqi):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {(report.score ?? 0) >= 85
                      ? 'Óptimo: Cumple con los estándares perimetrales de seguridad exigidos por pasarelas peruanas, asegurando fluidez en tus cobros.'
                      : 'Riesgo Comercial: Pasarelas rechazan transacciones o retienen fondos preventivamente ante sospecha de riesgo transaccional en webs no blindadas.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] shrink-0 ${(report.score ?? 0) >= 85 ? 'bg-emerald-200 text-emerald-900' : (report.score ?? 0) >= 60 ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}`}>
                  {(report.score ?? 0) >= 85 ? '🟢 Óptimo' : (report.score ?? 0) >= 60 ? '🟡 Advertencia' : '🔴 Crítico'}
                </span>
              </div>

              {/* 5. Ley de Protección de Datos */}
              <div className={`p-2.5 rounded-lg border flex items-start justify-between gap-3 ${hasValidSsl && !hasDowngradeRisk ? 'bg-emerald-50/50 border-emerald-300' : 'bg-amber-50/50 border-amber-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">5. Ley de Protección de Datos Personales (Perú Ley N° 29733):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {hasValidSsl && !hasDowngradeRisk
                      ? 'En cumplimiento: Las sesiones de clientes viajan con cifrado seguro forzado, protegiendo datos personales conforme a ley.'
                      : 'En observación: Requiere forzar cifrado permanente HSTS para evitar sanciones ante filtraciones accidentales de credenciales.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[9px] shrink-0 ${hasValidSsl && !hasDowngradeRisk ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}`}>
                  {hasValidSsl && !hasDowngradeRisk ? '🟢 Óptimo' : '🟡 Advertencia'}
                </span>
              </div>
            </div>
          </div>

          {/* Cuadro de Retorno de Inversión y Decisión Gerencial */}
          <div className="p-3 rounded-lg border border-neutral-300 bg-neutral-50 text-[9.5px] leading-relaxed">
            <strong className="text-neutral-900 block font-bold mb-0.5">Impacto Económico y Retorno de Inversión (ROI):</strong>
            Una retención preventiva de fondos en pasarelas como Niubiz o Culqi paraliza el flujo de caja comercial durante 15 a 30 días hábiles. El blindaje perimetral elimina esta fricción y asegura la continuidad de cobros. Entrega la <strong>Página 2 de este informe</strong> a tu equipo de desarrollo o contrata el servicio de Blindaje Llave en Mano para resolverlo sin tocar tu código base.
          </div>
        </div>

        {/* Pie de Página 1 */}
        <div className="border-t-2 border-neutral-900 pt-2 flex justify-between items-center text-[9px] font-mono text-neutral-700">
          <div>
            <span className="font-bold text-neutral-900 block">NEURONAL GRAVITY &bull; RUC 10704877850</span>
            <span>Auditoría y Soluciones Tecnológicas &bull; Página 1 de 2</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-neutral-900">Pasa a la Página 2 para la Receta de Código TI &rarr;</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 2: DIRECTIVAS DE CÓDIGO Y TELEMETRÍA (PARA EL DESARROLLADOR / DEV) */}
      {/* ========================================================================= */}
      <div 
        className="p-8 min-h-screen flex flex-col justify-between"
        style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
      >
        <div>
          {/* Encabezado Superior Página 2 */}
          <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-3 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-neutral-900 rounded-lg">
                <Code2 className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight uppercase text-neutral-900">
                  NEURONAL GRAVITY &bull; DEFENSA TI
                </h1>
                <p className="text-[10px] text-neutral-700 font-bold">
                  Receta de Código y Telemetría Perimetral RFC / OWASP &bull; RUC 10704877850
                </p>
                <div className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[9px] font-bold">
                  <Code2 className="w-3 h-3 text-sky-400" />
                  <span>PARTE 2 DE 2: GUÍA TÉCNICA Y RECETA DE CÓDIGO (PARA EL PROGRAMADOR / SYSADMIN)</span>
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-neutral-700">
              <p className="font-bold text-neutral-900">{report.url}</p>
              <p>Meta: Grado A (90-100 pts)</p>
            </div>
          </div>

          {/* 1. Sockets Perimetrales */}
          <div className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">
              1. Superficie de Exposición de Red (TCP Sockets)
            </h2>
            <div className="grid grid-cols-6 gap-2">
              {(report.ports || []).map((p) => {
                const isPort80 = p.port === 80;
                const isGitSsh = p.port === 22 && isGitPlatform;

                let badgeText = 'CERRADO';
                let borderStyle = 'border-neutral-200 bg-neutral-50';

                if (p.isOpen) {
                  if (isPort80) {
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
                  <div key={p.port} className={`border rounded-lg p-1.5 text-center ${borderStyle}`}>
                    <div className="font-mono text-[10px] font-bold text-neutral-900">
                      Puerto {p.port}
                    </div>
                    <div className="text-[8.5px] text-neutral-500 truncate">{p.service}</div>
                    <div className="mt-0.5 font-mono text-[8.5px] font-bold">
                      {badgeText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Directivas OWASP */}
          <div className="mb-4">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900">
              2. Cabeceras Defensivas HTTP (OWASP / RFC)
            </h2>
            <table className="w-full text-left border-collapse text-[9.5px]">
              <thead>
                <tr className="border-b border-neutral-300 font-mono text-neutral-500">
                  <th className="py-1">Cabecera</th>
                  <th className="py-1">Estado</th>
                  <th className="py-1">Severidad</th>
                  <th className="py-1">Función de Seguridad</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-mono">
                {(report.headers || []).map((h, i: number) => (
                  <tr key={i} className="py-0.5">
                    <td className="py-1 font-bold text-neutral-900">{h.name || h.header}</td>
                    <td className="py-1">
                      <span className={`font-semibold ${h.status === 'pass' || h.present ? 'text-emerald-700' : 'text-rose-700'}`}>
                        {h.status === 'pass' || h.present ? '✓ PRESENTE' : '✗ AUSENTE'}
                      </span>
                    </td>
                    <td className="py-1 text-neutral-600 uppercase">{h.severity || 'MEDIA'}</td>
                    <td className="py-1 text-neutral-600 font-sans text-[9px]">
                      {h.description || 'Validación perimetral de cabecera conforme a especificación.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Receta de Código Lista para Copiar y Pegar */}
          <div className="mb-3">
            <h2 className="text-[11px] font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-2 text-neutral-900 flex items-center justify-between">
              <span>3. Receta de Código de Remediación Inmediata</span>
              <span className="text-[9px] font-mono text-emerald-800">Copia y pega en tu servidor web</span>
            </h2>

            <div className="border border-neutral-400 rounded-lg p-2.5 bg-neutral-900 text-neutral-100 font-mono text-[9px] leading-relaxed overflow-x-hidden">
              <p className="text-neutral-400 mb-1"># Opción A: Configuración para Nginx (/etc/nginx/conf.d/security.conf)</p>
              <p className="text-emerald-300">add_header X-Frame-Options &quot;DENY&quot; always;</p>
              <p className="text-emerald-300">add_header X-Content-Type-Options &quot;nosniff&quot; always;</p>
              <p className="text-emerald-300">add_header Strict-Transport-Security &quot;max-age=31536000; includeSubDomains; preload&quot; always;</p>
              <p className="text-emerald-300">add_header Referrer-Policy &quot;strict-origin-when-cross-origin&quot; always;</p>
              <p className="text-emerald-300">add_header Permissions-Policy &quot;camera=(), microphone=(), geolocation=()&quot; always;</p>
              <p className="text-neutral-400 mt-2 mb-1"># Opción B: Reglas para Apache (.htaccess o httpd.conf)</p>
              <p className="text-sky-300">Header always set X-Frame-Options &quot;DENY&quot;</p>
              <p className="text-sky-300">Header always set X-Content-Type-Options &quot;nosniff&quot;</p>
              <p className="text-sky-300">Header always set Strict-Transport-Security &quot;max-age=31536000; includeSubDomains; preload&quot;</p>
            </div>
          </div>

          {/* Descargo Legal */}
          <div className="p-2 rounded border border-neutral-300 bg-neutral-50 text-[8px] text-neutral-600 leading-normal font-sans">
            <strong>Aviso Legal y Descargo de Responsabilidad:</strong> Diagnóstico automatizado no intrusivo generado con base en directivas públicas OWASP y análisis de cabeceras de transporte. Este dictamen se expide a título exclusivo de recomendaciones de buenas prácticas perimetrales. No constituye una certificación de infalibilidad ni auditoría de código interno.
          </div>
        </div>

        {/* Pie de Página 2 */}
        <div className="border-t-2 border-neutral-900 pt-2 flex justify-between items-center text-[9px] font-mono text-neutral-700">
          <div>
            <span className="font-bold text-neutral-900 block">NEURONAL GRAVITY &bull; RUC 10704877850</span>
            <span>Martín Castillo &bull; Ciberdefensa Perimetral &bull; Página 2 de 2</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-emerald-800">Dictamen Técnico Completo (2 Páginas: Negocio + Dev)</span>
            <span>https://neuronalgravity.com</span>
          </div>
        </div>
      </div>

    </div>
  );
}
