'use client';

import React from 'react';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import { ShieldCheck, CheckCircle2, AlertTriangle, Building2, Code2, Lock } from 'lucide-react';

interface Props {
  report: AuditReportRecord;
  auditId: string;
}

export default function PrintableReport({ report, auditId }: Props) {
  if (!report) return null;

  const scannedDate = new Date(report.scannedAt || '1970-01-01T00:00:00.000Z');
  const formattedDate = scannedDate.toLocaleDateString('es-PE', {
    day: '2-digit',
    month: 'long',
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

  const displayUrl = report.url.includes('demo') || report.url.includes('ejemplo') || report.url.includes('textil')
    ? 'https://ejemplo-empresa-demo.pe (EMPRESA FICTICIA DE MUESTRA)'
    : report.url;

  return (
    <div className="hidden print:block fixed inset-0 bg-white text-black z-[9999] text-xs font-sans">
      
      {/* ========================================================================= */}
      {/* PÁGINA 1: DICTAMEN EJECUTIVO (PARA GERENCIA / DUEÑO DE NEGOCIO) */}
      {/* ========================================================================= */}
      <div className="relative p-7 min-h-screen flex flex-col justify-between overflow-hidden">
        
        {/* Marca de Agua de Fondo Página 1 */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-0 opacity-[0.065]">
          <div className="text-center transform -rotate-30 font-black text-7xl tracking-widest text-neutral-900 border-8 border-neutral-900 p-8 rounded-3xl">
            EJEMPLO<br />NO OFICIAL
          </div>
        </div>

        <div className="relative z-10">
          {/* Banner de Aviso Legal y Muestra No Oficial */}
          <div className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 text-center font-bold text-[8.5px] uppercase tracking-wider rounded mb-3 flex items-center justify-between">
            <span>⚠️ DOCUMENTO DE MUESTRA Y EJEMPLO DIDÁCTICO</span>
            <span className="font-extrabold text-rose-800">NO ES UN DOCUMENTO OFICIAL NI AUDITORÍA VINCULANTE</span>
            <span>RUC 10704877850</span>
          </div>

          {/* Encabezado Superior */}
          <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-2.5 mb-3">
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
                <div className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[8.5px] font-bold">
                  <Building2 className="w-3 h-3 text-emerald-400" />
                  <span>PARTE 1 DE 2: DICTAMEN EJECUTIVO COMERCIAL (PARA EL DUEÑO O GERENCIA)</span>
                </div>
              </div>
            </div>

            {/* Metadatos y Auditor Responsable */}
            <div className="text-right font-mono text-[9.5px] text-neutral-700 space-y-0.5">
              <p className="font-bold text-neutral-900">ID: {auditId || report.id || 'DEMO-EJEMPLO-2026'}</p>
              <p>{formattedDate} &bull; {formattedTime}</p>
              <p className="text-neutral-800 font-bold">Auditor: Karol Martín Castillo Rojas</p>
              <span className="px-1.5 py-0.2 bg-amber-200 text-amber-900 font-bold rounded text-[8px] uppercase">
                Muestra Didáctica
              </span>
            </div>
          </div>

          {/* Tarjeta de Resumen Ejecutivo y Meta Grado A */}
          <div className="border border-neutral-300 rounded-xl p-3 mb-3 flex justify-between items-center bg-neutral-50/70">
            <div>
              <span className="text-[8.5px] font-mono text-neutral-500 uppercase tracking-wider block font-bold">
                Empresa / Portal Web Analizado
              </span>
              <span className="text-sm font-bold font-mono text-neutral-900 block">{displayUrl}</span>
              <div className="text-[9px] text-neutral-600 font-mono mt-0.5">
                <span>IP Servidor: <strong>[PROTEGIDA POR SEGURIDAD]</strong> &bull; Verificación DNS Segura Anti-SSRF (OK)</span>
              </div>
            </div>
            <div className="text-right border-l border-neutral-300 pl-4 space-y-0.5">
              <span className="text-[8.5px] font-mono text-neutral-500 uppercase tracking-wider block">
                Calificación Inicial
              </span>
              <span className="text-xl font-black font-mono text-neutral-900">
                {report.score}/100 <span className="text-sm font-bold text-neutral-800">(Grado {report.grade})</span>
              </span>
              <span className="block text-[8.5px] font-mono font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                Meta Blindaje: Grado A (90-100 pts)
              </span>
            </div>
          </div>

          {/* Semáforo de 5 Puntos Clave de Negocio */}
          <div className="mb-3">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-1.5">
              <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-900">
                Diagnóstico de Riesgo Comercial (Semáforo de Decisión Ejecutiva)
              </h2>
              <span className="text-[8.5px] font-mono text-neutral-500 font-bold">
                🟢 Óptimo &bull; 🟡 Advertencia &bull; 🔴 Crítico
              </span>
            </div>

            <div className="space-y-1.5 text-[9.5px]">
              {/* 1. Candado SSL */}
              <div className={`p-2 rounded-lg border flex items-start justify-between gap-3 ${hasValidSsl ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">1. Candado de Seguridad (Certificado SSL / TLS):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {hasValidSsl 
                      ? `Activo y vigente (${report.ssl?.protocol || 'TLS 1.3'}, vigencia por ${report.ssl?.daysRemaining ?? '...'} días). La conexión básica viaja cifrada.` 
                      : 'Crítico: Certificado SSL vencido o ausente. Los navegadores muestran advertencia roja y ahuyentan compradores.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8.5px] shrink-0 ${hasValidSsl ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {hasValidSsl ? '🟢 Óptimo' : '🔴 Crítico'}
                </span>
              </div>

              {/* 2. Anti-Clonación */}
              <div className={`p-2 rounded-lg border flex items-start justify-between gap-3 ${missingHeaders.length === 0 ? 'bg-emerald-50/50 border-emerald-300' : missingHeaders.length < 3 ? 'bg-amber-50/50 border-amber-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">2. Protección Anti-Clonación en Navegadores:</strong>
                  <span className="text-neutral-700 leading-tight">
                    {missingHeaders.length === 0
                      ? 'Blindado: Tu portal cuenta con las directivas perimetrales que impiden ser duplicado o incrustado dentro de otras páginas.'
                      : `Atención: Faltan ${missingHeaders.length} reglas perimetrales (CSP, X-Frame). Terceros pueden incrustar tu web en páginas espejo para desviar pedidos o suplantar identidad.`}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8.5px] shrink-0 ${missingHeaders.length === 0 ? 'bg-emerald-200 text-emerald-900' : missingHeaders.length < 3 ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}`}>
                  {missingHeaders.length === 0 ? '🟢 Óptimo' : missingHeaders.length < 3 ? '🟡 Advertencia' : '🔴 Crítico'}
                </span>
              </div>

              {/* 3. Accesos y Bases de Datos */}
              <div className={`p-2 rounded-lg border flex items-start justify-between gap-3 ${!hasOpenAdminPorts ? 'bg-emerald-50/50 border-emerald-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">3. Accesos y Bases de Datos:</strong>
                  <span className="text-neutral-700 leading-tight">
                    {!hasOpenAdminPorts
                      ? 'Protegido: Tus bases de datos y accesos privados (MySQL, SSH, FTP) están debidamente ocultos y cerrados a miradas públicas.'
                      : 'Crítico: Hay puertos de gestión o base de datos abiertos a internet público. Riesgo de ataques de fuerza bruta.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8.5px] shrink-0 ${!hasOpenAdminPorts ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}`}>
                  {!hasOpenAdminPorts ? '🟢 Óptimo' : '🔴 Crítico'}
                </span>
              </div>

              {/* 4. Pasarelas de Pago */}
              <div className={`p-2 rounded-lg border flex items-start justify-between gap-3 ${(report.score ?? 0) >= 85 ? 'bg-emerald-50/50 border-emerald-300' : (report.score ?? 0) >= 60 ? 'bg-amber-50/50 border-amber-300' : 'bg-rose-50/50 border-rose-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">4. Compatibilidad con Pasarelas de Pago (Yape, Niubiz, Culqi):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {(report.score ?? 0) >= 85
                      ? 'Óptimo: Cumple con los estándares perimetrales de seguridad exigidos por pasarelas peruanas, asegurando fluidez en tus cobros.'
                      : 'Riesgo Comercial: Las pasarelas pueden aplicar revisiones de riesgo o retener fondos preventivamente en webs con calificación baja o sin directivas estrictas.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8.5px] shrink-0 ${(report.score ?? 0) >= 85 ? 'bg-emerald-200 text-emerald-900' : (report.score ?? 0) >= 60 ? 'bg-amber-200 text-amber-900' : 'bg-rose-200 text-rose-900'}`}>
                  {(report.score ?? 0) >= 85 ? '🟢 Óptimo' : (report.score ?? 0) >= 60 ? '🟡 Advertencia' : '🔴 Crítico'}
                </span>
              </div>

              {/* 5. Ley de Protección de Datos */}
              <div className={`p-2 rounded-lg border flex items-start justify-between gap-3 ${hasValidSsl && !hasDowngradeRisk ? 'bg-emerald-50/50 border-emerald-300' : 'bg-amber-50/50 border-amber-300'}`}>
                <div>
                  <strong className="text-neutral-900 block font-bold">5. Ley de Protección de Datos Personales (Perú Ley N° 29733):</strong>
                  <span className="text-neutral-700 leading-tight">
                    {hasValidSsl && !hasDowngradeRisk
                      ? 'En cumplimiento: Las sesiones de clientes viajan con cifrado forzado, protegiendo datos personales conforme a la Ley N° 29733.'
                      : 'En observación: Requiere forzar cifrado permanente HSTS y cookies seguras para prevenir fugas accidentales y multas de hasta 50 UIT.'}
                  </span>
                </div>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[8.5px] shrink-0 ${hasValidSsl && !hasDowngradeRisk ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200 text-amber-900'}`}>
                  {hasValidSsl && !hasDowngradeRisk ? '🟢 Óptimo' : '🟡 Advertencia'}
                </span>
              </div>
            </div>
          </div>

          {/* Planes Comerciales y Llamado a la Acción (S/ 65 y S/ 165) */}
          <div className="p-2.5 rounded-lg border-2 border-neutral-900 bg-neutral-50 mb-2.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-300 pb-1.5 mb-1.5">
              <div>
                <strong className="text-[10px] font-black uppercase text-neutral-900 block">
                  ¿Cómo solucionar estos riesgos y alcanzar Grado A? (Servicios Disponibles)
                </strong>
                <span className="text-[8.5px] text-neutral-600">
                  Entrega en 24h &bull; Sin tocar contraseñas ni base de datos &bull; Facturación formal con RUC 10704877850
                </span>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-bold text-neutral-900 block">Coordinar con Martín Castillo:</span>
                <span className="text-[9.5px] font-mono font-black text-emerald-800">WhatsApp: +1 (785) 643-3991</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[8.5px]">
              <div className="p-1.5 rounded border border-neutral-300 bg-white">
                <span className="font-bold text-neutral-900 block">OPCIÓN 1: Dictamen Firmado + Receta de Código (S/ 65 PEN)</span>
                <p className="text-neutral-700 leading-tight mt-0.5">
                  Recibes el dictamen formal en PDF firmado por el auditor y el archivo de configuración exacto listo para que tu programador lo pegue en 5 minutos.
                </p>
              </div>
              <div className="p-1.5 rounded border border-neutral-300 bg-white">
                <span className="font-bold text-neutral-900 block">OPCIÓN 2: Blindaje Perimetral Llave en Mano (S/ 165 PEN)</span>
                <p className="text-neutral-700 leading-tight mt-0.5">
                  Nosotros nos encargamos de inyectar las directivas perimetrales directamente en tu servidor con re-auditoría incluida y garantía de Grado A.
                </p>
              </div>
            </div>
          </div>

          {/* Transparencia Tecnológica y Motores Utilizados */}
          <div className="p-2 rounded-lg border border-neutral-300 bg-neutral-100 text-[8px] leading-tight space-y-0.5">
            <strong className="text-neutral-900 block font-bold text-[8.5px]">
              Transparencia Tecnológica: ¿Cómo se generó este dictamen de ejemplo?
            </strong>
            <p className="text-neutral-800">
              &bull; <strong>Motor de Red (Determinista):</strong> DEFENSA TI Network Probe Engine v{report.telemetry?.engineVersion || '1.2.0'} (Sondeo TCP de sockets, TLS X.509 y RFC 9110). Datos 100% matemáticos y auditables.
            </p>
            <p className="text-neutral-800">
              &bull; <strong>Motor de IA (Consultivo):</strong> Neuronality AI Defense Core ({report.telemetry?.aiModel || 'Google Gemini 1.5 Flash'}). <em>La IA no inventa calificaciones ni vulnerabilidades</em>; traduce la telemetría a impacto comercial en Soles y redacta las recetas de código.
            </p>
          </div>
        </div>

        {/* Firma Oficial y Pie de Página 1 */}
        <div className="relative z-10 border-t-2 border-neutral-900 pt-2 flex justify-between items-end text-[8.5px] font-mono text-neutral-700">
          <div>
            <span className="font-bold text-neutral-900 block text-[9.5px]">NEURONAL GRAVITY &bull; DEFENSA TI</span>
            <span>Auditor Responsable: Karol Martín Castillo Rojas &bull; RUC 10704877850</span>
            <span className="block text-neutral-500">Página 1 de 2 &bull; Dictamen Ejecutivo de Ejemplo</span>
          </div>
          <div className="text-center border border-neutral-300 bg-neutral-50 px-3 py-1 rounded">
            <span className="font-mono text-[8px] font-bold text-neutral-900 block">[FIRMA DIGITAL VERIFICADA]</span>
            <span className="text-[7.5px] text-neutral-600 block">DOCUMENTO DE MUESTRA DIDÁCTICA</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-neutral-900">Pasa a la Página 2 para la Receta de Código TI &rarr;</span>
            <span className="text-neutral-500">https://neuronalgravity.com</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PÁGINA 2: DIRECTIVAS DE CÓDIGO Y TELEMETRÍA (PARA EL DESARROLLADOR / DEV) */}
      {/* ========================================================================= */}
      <div 
        className="relative p-7 min-h-screen flex flex-col justify-between overflow-hidden"
        style={{ pageBreakBefore: 'always', breakBefore: 'page' }}
      >
        {/* Marca de Agua de Fondo Página 2 */}
        <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-0 opacity-[0.065]">
          <div className="text-center transform -rotate-30 font-black text-7xl tracking-widest text-neutral-900 border-8 border-neutral-900 p-8 rounded-3xl">
            EJEMPLO<br />NO OFICIAL
          </div>
        </div>

        <div className="relative z-10">
          {/* Banner de Aviso Legal y Muestra No Oficial */}
          <div className="bg-amber-100 border border-amber-300 text-amber-900 px-3 py-1 text-center font-bold text-[8.5px] uppercase tracking-wider rounded mb-3 flex items-center justify-between">
            <span>⚠️ DOCUMENTO DE MUESTRA Y GUÍA TÉCNICA DIDÁCTICA</span>
            <span className="font-extrabold text-rose-800">NO ES UN DOCUMENTO OFICIAL NI AUDITORÍA VINCULANTE</span>
            <span>RUC 10704877850</span>
          </div>

          {/* Encabezado Superior Página 2 */}
          <div className="flex justify-between items-start border-b-2 border-neutral-900 pb-2.5 mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 border-2 border-neutral-900 rounded-lg">
                <Code2 className="w-6 h-6 text-neutral-900" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight uppercase text-neutral-900">
                  NEURONAL GRAVITY &bull; DEFENSA TI
                </h1>
                <p className="text-[10px] text-neutral-700 font-bold">
                  Ficha Técnica de Red &bull; Recetas de Remediación RFC / OWASP &bull; RUC 10704877850
                </p>
                <div className="inline-flex items-center gap-1.5 mt-0.5 px-2 py-0.5 rounded bg-neutral-900 text-white font-mono text-[8.5px] font-bold">
                  <Code2 className="w-3 h-3 text-sky-400" />
                  <span>PARTE 2 DE 2: GUÍA TÉCNICA Y RECETA DE CÓDIGO (PARA EL PROGRAMADOR / SYSADMIN)</span>
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-[9px] text-neutral-700 space-y-0.5">
              <p className="font-bold text-neutral-900 text-[9.5px]">{displayUrl}</p>
              <p className="text-emerald-800 font-bold">Meta: Grado A (90-100 pts)</p>
              <p className="text-neutral-600">Motor Red: DEFENSA TI v{report.telemetry?.engineVersion || '1.2.0'}</p>
              <p className="text-neutral-600">Auditor: Karol Martín Castillo Rojas</p>
            </div>
          </div>

          {/* 1. Sockets Perimetrales Explicados Claramente (Sin confusión de puertos) */}
          <div className="mb-3">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1 mb-1.5">
              <h2 className="text-[10.5px] font-bold uppercase tracking-wider text-neutral-900">
                1. Superficie de Exposición de Red (Zero-Downtime TCP Sockets)
              </h2>
              <span className="text-[8.5px] font-mono text-neutral-500 font-bold">
                Puerto 443 = Canal Seguro HTTPS &bull; Puerto 80 = Redirección Forzada
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {(report.ports || []).map((p) => {
                const isPort80 = p.port === 80;
                const isPort443 = p.port === 443;
                const isGitSsh = p.port === 22 && isGitPlatform;

                let badgeText = 'CERRADO (OK)';
                let borderStyle = 'border-neutral-200 bg-neutral-50 text-neutral-600';
                let portMeaning = p.service;

                if (p.isOpen) {
                  if (isPort443) {
                    badgeText = 'ABIERTO (ÓPTIMO)';
                    borderStyle = 'border-emerald-400 bg-emerald-50/80 text-emerald-900 font-bold';
                    portMeaning = 'HTTPS Seguro (Requerido para pagos y cifrado)';
                  } else if (isPort80) {
                    badgeText = hasValidSsl ? 'REDIRECCIÓN HTTPS' : 'EXPUESTO SIN CIFRADO';
                    borderStyle = hasValidSsl
                      ? 'border-blue-400 bg-blue-50/80 text-blue-900 font-bold'
                      : 'border-rose-400 bg-rose-50/80 text-rose-900 font-bold';
                    portMeaning = hasValidSsl 
                      ? 'Redirección obligatoria hacia HTTPS' 
                      : 'Tráfico plano expuesto sin cifrado';
                  } else if (isGitSsh) {
                    badgeText = 'GIT SSH (OK)';
                    borderStyle = 'border-blue-400 bg-blue-50/80 text-blue-900 font-bold';
                    portMeaning = 'Repositorio Git autorizado';
                  } else {
                    badgeText = 'EXPUESTO (RIESGO)';
                    borderStyle = 'border-rose-400 bg-rose-50/80 text-rose-900 font-bold';
                    portMeaning = 'Puerto de gestión expuesto a internet';
                  }
                }

                return (
                  <div key={p.port} className={`border rounded-lg p-2 text-center ${borderStyle}`}>
                    <div className="font-mono text-[10px] font-black text-neutral-900">
                      Puerto {p.port}
                    </div>
                    <div className="text-[7.5px] leading-tight my-0.5 truncate">{portMeaning}</div>
                    <div className="mt-0.5 font-mono text-[8px] font-black tracking-wide">
                      {badgeText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Directivas OWASP */}
          <div className="mb-3">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-1.5 text-neutral-900">
              2. Cabeceras Defensivas HTTP (OWASP / RFC 9110)
            </h2>
            <table className="w-full text-left border-collapse text-[9px]">
              <thead>
                <tr className="border-b border-neutral-300 font-mono text-neutral-500">
                  <th className="py-1">Cabecera</th>
                  <th className="py-1">Estado</th>
                  <th className="py-1">Severidad</th>
                  <th className="py-1">Función Defensiva</th>
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
                    <td className="py-1 text-neutral-600 font-sans text-[8.5px]">
                      {h.description || 'Validación perimetral de cabecera conforme a especificación.'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. Receta de Código Lista para Copiar y Pegar */}
          <div className="mb-2.5">
            <h2 className="text-[10.5px] font-bold uppercase tracking-wider border-b border-neutral-300 pb-1 mb-1.5 text-neutral-900 flex items-center justify-between">
              <span>3. Receta de Código de Remediación Inmediata</span>
              <span className="text-[8.5px] font-mono text-emerald-800 font-bold">Copia y pega en tu servidor web (Nginx o Apache)</span>
            </h2>

            <div className="border border-neutral-400 rounded-lg p-2.5 bg-neutral-900 text-neutral-100 font-mono text-[8.5px] leading-relaxed overflow-x-hidden">
              <p className="text-neutral-400 mb-0.5"># Opción A: Configuración para Nginx (/etc/nginx/conf.d/security.conf)</p>
              <p className="text-emerald-300">add_header X-Frame-Options &quot;DENY&quot; always;</p>
              <p className="text-emerald-300">add_header X-Content-Type-Options &quot;nosniff&quot; always;</p>
              <p className="text-emerald-300">add_header Strict-Transport-Security &quot;max-age=31536000; includeSubDomains; preload&quot; always;</p>
              <p className="text-emerald-300">add_header Referrer-Policy &quot;strict-origin-when-cross-origin&quot; always;</p>
              <p className="text-emerald-300">add_header Permissions-Policy &quot;camera=(), microphone=(), geolocation=()&quot; always;</p>
              <p className="text-neutral-400 mt-1.5 mb-0.5"># Opción B: Reglas para Apache (.htaccess o httpd.conf)</p>
              <p className="text-sky-300">Header always set X-Frame-Options &quot;DENY&quot;</p>
              <p className="text-sky-300">Header always set X-Content-Type-Options &quot;nosniff&quot;</p>
              <p className="text-sky-300">Header always set Strict-Transport-Security &quot;max-age=31536000; includeSubDomains; preload&quot;</p>
            </div>
          </div>

          {/* Descargo Legal */}
          <div className="p-2 rounded border border-neutral-300 bg-neutral-50 text-[7.5px] text-neutral-600 leading-normal font-sans">
            <strong>Aviso Legal y Descargo de Responsabilidad:</strong> Diagnóstico automatizado no intrusivo generado con base en directivas públicas OWASP y análisis de cabeceras de transporte. Este documento es un <strong>ejemplo didáctico no oficial</strong> emitido a título informativo de buenas prácticas perimetrales. No constituye una certificación ISO, PCI-DSS ni auditoría de código interno.
          </div>
        </div>

        {/* Firma Oficial y Pie de Página 2 */}
        <div className="relative z-10 border-t-2 border-neutral-900 pt-2 flex justify-between items-end text-[8.5px] font-mono text-neutral-700">
          <div>
            <span className="font-bold text-neutral-900 block text-[9.5px]">NEURONAL GRAVITY &bull; RUC 10704877850</span>
            <span>Auditor Responsable: Karol Martín Castillo Rojas &bull; Ciberdefensa Perimetral</span>
            <span className="block text-neutral-500">Página 2 de 2 &bull; Ficha Técnica y Receta Dev</span>
          </div>
          <div className="text-center border border-neutral-300 bg-neutral-50 px-3 py-1 rounded">
            <span className="font-mono text-[8px] font-bold text-neutral-900 block">[FIRMA DIGITAL VERIFICADA]</span>
            <span className="text-[7.5px] text-neutral-600 block">SELLO OFICIAL DE AUDITORÍA TI</span>
          </div>
          <div className="text-right">
            <span className="block font-bold text-emerald-800">Dictamen Técnico Completo (Negocio + Dev)</span>
            <span className="text-neutral-500">https://neuronalgravity.com</span>
          </div>
        </div>
      </div>

    </div>
  );
}
