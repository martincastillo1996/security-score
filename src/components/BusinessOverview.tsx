'use client';

import { 
  Building2, 
  ShieldAlert, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { AuditReportRecord } from '@/lib/storage/reportStore';

interface Props {
  report: AuditReportRecord;
}

export default function BusinessOverview({ report }: Props) {
  const isGoogleOrGiant = 
    report.url.includes('google.com') || 
    report.url.includes('github.com') || 
    report.url.includes('microsoft.com') || 
    report.url.includes('cloudflare.com');

  // Evaluar riesgos de negocio basados en los resultados
  const missingHeaders = (report.headers || []).filter(h => !h.present);
  const hasClickjackingRisk = missingHeaders.some(h => h.header.toLowerCase().includes('frame'));
  const hasDowngradeRisk = missingHeaders.some(h => h.header.toLowerCase().includes('transport-security'));
  const hasOpenAdminPorts = (report.ports || []).some(
    p => p.isOpen && [21, 22, 3306, 5432].includes(p.port)
  );

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-300">
      
      {/* Banner de Explicación de Caso Especial (Google, Cloudflare, etc.) */}
      {isGoogleOrGiant && (
        <div className="p-5 rounded-2xl bg-[#0f172a] border border-blue-500/30 text-blue-200 text-xs sm:text-sm flex items-start gap-3.5 shadow-xl">
          <HelpCircle className="w-5 h-5 text-[#2997ff] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-semibold text-white">¿Por qué un gigante como este obtiene Grado {report.grade || 'B'}?</span>
            <p className="text-neutral-200 leading-relaxed">
              Empresas masivas como Google priorizan la compatibilidad global con navegadores muy antiguos y utilizan listas de precarga nativas del navegador (<strong>HSTS Preload</strong> en Chrome). Sin embargo, <strong>para una empresa o comercio local</strong>, omitir estas cabeceras significa no tener ninguna protección ante ataques de suplantación.
            </p>
          </div>
        </div>
      )}

      {/* Tarjetas de Diagnóstico de Impacto Comercial - Con fondo sólido y alto contraste Apple */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Tarjeta 1: Riesgo de Marca y Phishing */}
        <div className="p-6 rounded-3xl bg-[#161618] border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Suplantación de Marca</span>
              {hasClickjackingRisk ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Riesgo Medio
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Blindado
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-white">Clonación y Clickjacking</h4>
            <p className="text-xs text-neutral-200 leading-relaxed font-normal">
              {hasClickjackingRisk
                ? 'Tu portal puede ser incrustado en webs maliciosas mediante marcos invisibles para capturar clics de clientes o robar credenciales.'
                : 'Tu web rechaza activamente ser incrustada en dominios de terceros. Protegido contra engaños visuales.'}
            </p>
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-2 pt-3 border-t border-white/10">
            <Users className="w-4 h-4 text-[#2997ff]" />
            <span>Impacto: Reputación y confianza de clientes</span>
          </div>
        </div>

        {/* Tarjeta 2: Fuga de Ventas y Advertencias */}
        <div className="p-6 rounded-3xl bg-[#161618] border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Conversión y Ventas</span>
              {hasDowngradeRisk ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Pérdida Potencial
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Óptimo
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-white">Fricción en el Navegador</h4>
            <p className="text-xs text-neutral-200 leading-relaxed font-normal">
              {hasDowngradeRisk
                ? 'Sin cifrado forzado (HSTS), conexiones públicas (Wi-Fi de cafeterías o centros comerciales) pueden degradar a HTTP plano provocando alertas de "Sitio no seguro".'
                : 'Conexión cifrada siempre forzada. Los clientes nunca verán advertencias de seguridad al entrar.'}
            </p>
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-2 pt-3 border-t border-white/10">
            <TrendingDown className="w-4 h-4 text-rose-400" />
            <span>Impacto: Hasta 23% de rebote en pagos</span>
          </div>
        </div>

        {/* Tarjeta 3: Intrusión Perimetral */}
        <div className="p-6 rounded-3xl bg-[#161618] border border-white/10 shadow-xl flex flex-col justify-between space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Acceso al Servidor</span>
              {hasOpenAdminPorts ? (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  Crítico
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  Protegido
                </span>
              )}
            </div>
            <h4 className="text-lg font-bold text-white">Puertas de Administración</h4>
            <p className="text-xs text-neutral-200 leading-relaxed font-normal">
              {hasOpenAdminPorts
                ? 'Se detectaron puertos de base de datos o administración (SSH/FTP) expuestos directamente a internet público sin firewall perimetral.'
                : 'Los puertos críticos de administración y bases de datos están filtrados o cerrados al público exterior.'}
            </p>
          </div>
          <div className="text-xs text-neutral-400 flex items-center gap-2 pt-3 border-t border-white/10">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>Impacto: Continuidad operativa y datos</span>
          </div>
        </div>

      </div>

      {/* Resumen Ejecutivo para Gerencia - Formato Ultra Claro y Humano */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#141416] border border-white/10 shadow-2xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <Building2 className="w-5 h-5 text-[#2997ff]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Diagnóstico en Términos de Negocio (Para el Dueño o Gerente)
            </h3>
          </div>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 w-fit">
            Sin tecnicismos complicados
          </span>
        </div>
        
        <div className="space-y-3 text-xs sm:text-sm">
          
          {/* 1. Candado de Seguridad */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-white block">1. Candado de Seguridad (Certificado SSL):</strong>
              <span className="text-neutral-300">
                {report.ssl?.valid 
                  ? `Está activo por los próximos ${report.ssl.daysRemaining} días. La conexión básica entre tu cliente y tu página viaja cifrada.`
                  : 'Está vencido o presenta fallas. Los navegadores muestran la pantalla roja de advertencia.'}
              </span>
            </div>
          </div>

          {/* 2. Escudo contra engaños */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
            {missingHeaders.length > 0 ? (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <strong className="text-white block">2. Protección Anti-Clonación en Navegadores:</strong>
              <span className="text-neutral-300">
                {missingHeaders.length > 0 
                  ? `Faltan ${missingHeaders.length} reglas de blindaje perimetral. Sin estas reglas, terceros pueden incrustar tu web en otros sitios para suplantar tu identidad.`
                  : 'Tu portal cuenta con todas las reglas que impiden ser duplicado dentro de otras páginas.'}
              </span>
            </div>
          </div>

          {/* 3. Acceso a datos internos */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5">
            {hasOpenAdminPorts ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-0.5">
              <strong className="text-white block">3. Accesos y Bases de Datos:</strong>
              <span className="text-neutral-300">
                {hasOpenAdminPorts 
                  ? 'Hay puertos de gestión abiertos a todo internet. Cualquier atacante puede intentar contraseñas por fuerza bruta.'
                  : 'Tus bases de datos y accesos privados están debidamente ocultos de miradas públicas.'}
              </span>
            </div>
          </div>

          {/* 4. Aceptación de Pagos */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-white block">4. Compatibilidad con Pasarelas de Pago (Yape, Niubiz, Mercado Pago, Stripe):</strong>
              <span className="text-neutral-300">
                Las pasarelas rechazan transacciones o retienen fondos cuando el portal auditado tiene calificación D o F por sospecha de riesgo transaccional. Mantener Grado A asegura fluidez en tus cobros.
              </span>
            </div>
          </div>

          {/* 5. Leyes de Protección de Datos */}
          <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#0071e3]/10 border border-[#0071e3]/25">
            <CheckCircle2 className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-white block">5. Leyes de Protección de Datos (Perú Ley 29733, Colombia Ley 1581, México, Chile):</strong>
              <span className="text-neutral-300">
                Exigen que las sesiones de los clientes viajen con cookies seguras (<em>Secure / HttpOnly</em>) para evitar multas de entes reguladores ante filtración de datos de usuarios.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 text-xs text-neutral-400 border-t border-white/5 flex items-center gap-2">
          <span>💡 Si tu programador necesita las instrucciones técnicas exactas de código, cambia a la pestaña superior <strong>&ldquo;Vista Técnica (SysAdmin / Dev)&rdquo;</strong>.</span>
        </div>
      </div>

    </div>
  );
}
