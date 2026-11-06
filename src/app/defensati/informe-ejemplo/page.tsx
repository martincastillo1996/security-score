'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import PrintableReport from '@/components/PrintableReport';
import { 
  ShieldCheck, 
  ArrowLeft, 
  FileText, 
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Building2,
  Code2,
  Printer,
  Copy,
  Check,
  Terminal,
  Lock,
  Server,
  AlertTriangle
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import HeaderWhatsAppButton from '@/components/HeaderWhatsAppButton';
import { AuditReportRecord } from '@/lib/storage/reportStore';
import AuditEngineExplanation from '@/components/AuditEngineExplanation';

const DEMO_REPORT: AuditReportRecord = {
  id: 'DEMO-EJEMPLO-2026',
  url: 'https://ejemplo-empresa-demo.pe',
  score: 68,
  grade: 'C',
  scannedAt: '2026-11-06T15:30:00.000Z',
  ssl: {
    valid: true,
    protocol: 'TLSv1.3',
    daysRemaining: 54,
    validTo: '2026-12-31T23:59:59.000Z',
    issuer: "Let's Encrypt Authority X3",
    score: 95
  },
  headers: [
    { name: 'Strict-Transport-Security', header: 'Strict-Transport-Security', status: 'fail', present: false, value: null, severity: 'ALTA', description: 'Obliga conexiones HTTPS permanentes evitando degradación a HTTP plano.' },
    { name: 'Content-Security-Policy', header: 'Content-Security-Policy', status: 'fail', present: false, value: null, severity: 'ALTA', description: 'Evita inyección de scripts maliciosos y clonación de formularios de pago.' },
    { name: 'X-Frame-Options', header: 'X-Frame-Options', status: 'fail', present: false, value: null, severity: 'ALTA', description: 'Impide que terceros incrusten la web en iframes invisibles (Clickjacking).' },
    { name: 'X-Content-Type-Options', header: 'X-Content-Type-Options', status: 'pass', present: true, value: 'nosniff', severity: 'MEDIA', description: 'Protege contra la ejecución de archivos MIME alterados.' },
    { name: 'Referrer-Policy', header: 'Referrer-Policy', status: 'pass', present: true, value: 'strict-origin-when-cross-origin', severity: 'BAJA', description: 'Limita la fuga de URLs y referencias de usuarios en enlaces salientes.' },
    { name: 'Permissions-Policy', header: 'Permissions-Policy', status: 'fail', present: false, value: null, severity: 'MEDIA', description: 'Desactiva acceso a cámara, micrófono y geolocalización no autorizados.' }
  ],
  ports: [
    { port: 80, isOpen: true, service: 'HTTP (Redirección obligatoria hacia HTTPS)', risk: 'BAJO', description: 'Redirección estándar hacia puerto 443 activa.' },
    { port: 443, isOpen: true, service: 'HTTPS (Canal Seguro TLS 1.3 - Óptimo)', risk: 'BAJO', description: 'Canal cifrado obligatorio para transacciones y pagos.' },
    { port: 8080, isOpen: false, service: 'HTTP-Proxy alternativo (Cerrado)', risk: 'BAJO', description: 'Puerto cerrado y protegido.' },
    { port: 21, isOpen: false, service: 'FTP plano (Cerrado tras firewall)', risk: 'BAJO', description: 'Cerrado para prevenir transferencias sin cifrar.' },
    { port: 22, isOpen: false, service: 'SSH administración (Cerrado a internet)', risk: 'BAJO', description: 'Aislado de internet público.' },
    { port: 3306, isOpen: false, service: 'MySQL base de datos (Protegido)', risk: 'BAJO', description: 'Base de datos protegida tras firewall perimetral.' }
  ],
  telemetry: {
    targetResolvedIp: '[PROTEGIDA POR SEGURIDAD]',
    engineVersion: '1.2.0-cloud',
    durationMs: 840,
    aiModel: 'Neuronality AI Defense Core'
  }
};

export default function InformeEjemploPage() {
  const [activeTab, setActiveTab] = useState<'business' | 'dev'>('business');
  const [activeServerTab, setActiveServerTab] = useState<'nginx' | 'apache' | 'cloudflare'>('nginx');
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const nginxSnippet = `# Configuración para Nginx (/etc/nginx/conf.d/security.conf o dentro de server {})
add_header X-Frame-Options "DENY" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;

# Ocultar versión del servidor en cabeceras
server_tokens off;`;

  const apacheSnippet = `# Reglas para Apache (.htaccess o en el VirtualHost)
<IfModule mod_headers.c>
  Header always set X-Frame-Options "DENY"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"
</IfModule>

# Ocultar versión de Apache
ServerSignature Off
ServerTokens Prod`;

  const cloudflareSnippet = `# Reglas en Cloudflare Dashboard (Rules -> Transform Rules -> Modify Response Header)
# Header 1:
Set dynamic: X-Frame-Options = "DENY"
# Header 2:
Set dynamic: X-Content-Type-Options = "nosniff"
# Header 3:
Set dynamic: Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
# Header 4:
Set dynamic: Referrer-Policy = "strict-origin-when-cross-origin"`;

  return (
    <div className="min-h-screen bg-[#07090e] text-white selection:bg-[#0071e3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      
      {/* Componente PDF que se activa con window.print() */}
      <PrintableReport report={DEMO_REPORT} auditId="DEMO-2026-TEXTIL" />

      {/* Fondo estelar limpio */}
      <NeuralBackground showDomains={false} />

      {/* Cabecera */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10 print:hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/defensati" className="inline-flex items-center gap-2 text-xs sm:text-sm text-neutral-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a DEFENSA TI</span>
          </Link>

          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Botón Imprimir PDF */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-all shadow-md active:scale-95 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">Descargar PDF (2 Páginas)</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <HeaderWhatsAppButton
              message="Hola Martín, vi el informe de muestra (Negocio + Dev) en DEFENSA TI y deseo solicitar la auditoría para mi web."
            />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14 relative z-10 space-y-8 print:hidden">
        
        {/* Banner de Orientación */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900/20 via-[#141416] to-emerald-950/20 border border-white/10 backdrop-blur-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#38bdf8]">
            <ShieldCheck className="w-4 h-4" />
            <span>Entregable Oficial DEFENSA TI (2 Vistas en 1 Solo Documento)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            Así es el Informe Técnico y Comercial que recibes en tu Auditoría
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Te entregamos exactamente lo que necesitas: <strong>Página 1 para la Gerencia</strong> (impacto comercial, ventas y pasarelas sin tecnicismos) y <strong>Página 2 para tu Programador</strong> (receta de código lista para copiar y pegar para corregirlo en minutos).
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar en PDF de 2 Páginas</span>
            </button>
          </div>
        </div>

        {/* SELECTOR INTERACTIVO DE LAS 2 EXPLICACIONES: NEGOCIO VS DEV */}
        <div className="flex justify-center">
          <div className="p-1.5 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-2xl grid grid-cols-2 gap-2 w-full max-w-xl shadow-xl">
            <button
              type="button"
              onClick={() => setActiveTab('business')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'business'
                  ? 'bg-gradient-to-r from-[#0071e3] to-sky-500 text-white shadow-lg shadow-blue-500/30 scale-[1.01]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>1. Para Dueño de Negocio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('dev')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'dev'
                  ? 'bg-gradient-to-r from-[#0071e3] to-sky-500 text-white shadow-lg shadow-blue-500/30 scale-[1.01]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>2. Para Desarrollador (Dev)</span>
            </button>
          </div>
        </div>

        {/* CONTENEDOR DEL DOCUMENTO MODELO */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-[#0f1219]/90 border border-white/10 shadow-2xl space-y-8 backdrop-blur-xl overflow-hidden">
          
          {/* Marca de Agua de Fondo Tenue */}
          <div className="absolute inset-0 pointer-events-none select-none flex items-center justify-center z-0 opacity-[0.03]">
            <div className="text-center transform -rotate-30 font-black text-8xl tracking-widest text-white border-8 border-white p-12 rounded-3xl">
              EJEMPLO<br />NO OFICIAL
            </div>
          </div>

          <div className="relative z-10 space-y-8">
            {/* Banner de Advertencia Legal: Documento Didáctico de Muestra */}
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-semibold flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
              <span className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>⚠️ DOCUMENTO DE MUESTRA Y CASO MODELO FICTICIO &bull; NO ES UN DICTAMEN OFICIAL NI AFECTA A NINGUNA ENTIDAD REAL</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-bold shrink-0">
                EJEMPLO NO OFICIAL
              </span>
            </div>

            {/* Encabezado del dictamen */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-[#38bdf8] text-xs font-semibold mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>CASO DE AUDITORÍA MODELO (MUESTRA DIDÁCTICA)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  Auditoría Perimetral y de Riesgo Comercial
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  Portal analizado: <strong className="text-white">ejemplo-empresa-demo.pe</strong> <span className="text-amber-400 font-bold">(Empresa Ficticia de Muestra)</span>
                </p>
              </div>

              <div className="flex flex-col items-start md:items-end gap-1 text-xs text-neutral-400 font-mono">
                <span>Entrega: <strong>24 a 48 Horas Laborables</strong></span>
                <span>Auditor Responsable: <strong className="text-white">Karol Martín Castillo Rojas</strong></span>
                <span>RUC: <strong>10704877850</strong> (Neuronal Gravity &bull; Lima, Perú)</span>
                <span className="text-emerald-400 font-semibold mt-0.5">✓ Comprobante Electrónico SUNAT Disponible</span>
              </div>
            </div>

          {/* ===================================================================== */}
          {/* PESTAÑA 1: VISIÓN DUEÑO DE NEGOCIO (COMERCIAL & GERENCIAL) */}
          {/* ===================================================================== */}
          {activeTab === 'business' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Badge Identificador de Vista */}
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-200 flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Explicación para el Dueño o Gerencia: Impacto en ventas, reputación y pasarelas</span>
                </span>
                <span className="font-mono text-[10px] text-blue-300">Sin jerga incomprensible</span>
              </div>

              {/* Métricas Visuales de Impacto Empresarial */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-black/40 border border-amber-500/20 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Calificación Inicial</span>
                  <span className="text-4xl sm:text-5xl font-black text-amber-400 my-1.5">Grado C</span>
                  <span className="text-[11px] text-amber-300/90 font-medium">Vulnerable a clonación de pasarela</span>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-emerald-500/20 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Cifrado de Clientes</span>
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 my-1.5">TLS 1.3</span>
                  <span className="text-[11px] text-emerald-300/90 font-medium">Canal activo y seguro</span>
                </div>

                <div className="p-5 rounded-2xl bg-black/40 border border-rose-500/20 flex flex-col items-center justify-center text-center">
                  <span className="text-[11px] uppercase font-mono text-neutral-400 tracking-wider">Impacto Económico en Riesgo</span>
                  <span className="text-4xl sm:text-5xl font-black text-rose-400 my-1.5">Alto</span>
                  <span className="text-[11px] text-rose-300/90 font-medium">Robo de pedidos en Wi-Fi abierta</span>
                </div>
              </div>

              {/* Hallazgos traducidos a Lenguaje de Negocio */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#38bdf8]" />
                    <span>3 Hallazgos Críticos Detectados y su Impacto en Ventas</span>
                  </h3>
                  <span className="text-xs text-neutral-400 hidden sm:inline">Explicado sin jerga innecesaria</span>
                </div>

                <div className="space-y-3">
                  {/* Fallo 1 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-rose-200 text-xs sm:text-sm">
                        1. Tu tienda o web puede ser incrustada en páginas clonadas (Falta de X-Frame-Options)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold uppercase">
                        🔴 Peligro Crítico
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong className="text-white">Impacto en el Negocio:</strong> Un ciberdelincuente puede crear un dominio similar y meter tu web en un marco invisible. Cuando el cliente hace clic en tu botón de pago o WhatsApp, el dinero o el pedido se desvían a la cuenta del atacante.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-rose-500/20 text-[11px] text-emerald-400 font-medium">
                      ✓ Solución con DEFENSA TI: Inyectamos directivas de bloqueo perimetral. Nadie fuera de tu dominio puede replicar tu web.
                    </div>
                  </div>

                  {/* Fallo 2 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-amber-200 text-xs sm:text-sm">
                        2. Conexión desprotegida en redes públicas de restaurantes y hoteles (Falta de HSTS)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase">
                        🟡 Riesgo Comercial
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong className="text-white">Impacto en el Negocio:</strong> Si un comprador o administrador de tu empresa se conecta desde una cafetería o feria comercial, un tercero en la misma red Wi-Fi puede degradar la conexión y espiar las compras o pedidos en trámite.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-emerald-400 font-medium">
                      ✓ Solución con DEFENSA TI: Forzado de túnel cifrado permanente HSTS con precarga de 1 año.
                    </div>
                  </div>

                  {/* Fallo 3 */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-amber-200 text-xs sm:text-sm">
                        3. Visibilidad de tu versión de CMS a ojos de robots atacantes (Server Tokens Expuestos)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-bold uppercase">
                        🟡 Alerta Preventiva
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      <strong className="text-white">Impacto en el Negocio:</strong> Los atacantes usan bots automáticos buscando tiendas con versiones antiguas. Si dejas expuesta la versión exacta de tu servidor o plugins, te conviertes en un blanco fácil en listas de ataque masivo.
                    </p>
                    <div className="p-2.5 rounded-xl bg-black/40 border border-amber-500/20 text-[11px] text-emerald-400 font-medium">
                      ✓ Solución con DEFENSA TI: Ocultamiento perimetral de cabeceras de servidor e insensibilización de versiones.
                    </div>
                  </div>
                </div>
              </div>

              {/* Semáforo de Cumplimiento de Ley de Protección de Datos */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Cumplimiento Legal: Ley de Protección de Datos Personales (Perú Ley N° 29733)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    🟢 En Adecuación
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  El blindaje perimetral garantiza que las sesiones de usuarios no viajen en texto claro ni puedan ser capturadas por terceros, protegiendo a la empresa frente a sanciones administrativas de hasta 50 UIT de la Autoridad Nacional de Protección de Datos Personales.
                </p>
              </div>

              {/* Cuadro de Planes Comerciales y Retorno de Inversión (ROI) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#141416] to-[#0c0d10] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                  <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>¿Cómo solucionar estos hallazgos y alcanzar Grado A? (Servicios y Precios)</span>
                  </h4>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold self-start sm:self-center">
                    Meta de Blindaje: Grado A (90-100 pts)
                  </span>
                </div>

                <p className="text-xs text-neutral-300 leading-relaxed">
                  En el Perú, una sola retención de fondos por riesgo perimetral en pasarelas como Niubiz o Culqi inmoviliza capital comercial durante 15 a 30 días, y una queja ante INDECOPI por filtración de datos acarrea sanciones que superan las 5 UIT. Cuentas con dos alternativas directas:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-xs">Plan Dictamen Firmado + Receta Dev</span>
                      <span className="text-xs font-mono font-black text-sky-400">S/ 65 PEN</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      Recibes el <strong>dictamen formal en PDF firmado por el auditor</strong> (Karol Martín Castillo Rojas) con membrete oficial y el archivo exacto de configuración para que tu programador lo pegue en 5 minutos.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-white text-xs">Plan Blindaje Llave en Mano</span>
                      <span className="text-xs font-mono font-black text-emerald-400">S/ 165 PEN</span>
                    </div>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Nosotros inyectamos y configuramos las cabeceras perimetrales directamente en tu servidor (Nginx/Apache/Cloudflare) con re-auditoría incluida y <strong>garantía de Grado A</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ===================================================================== */}
          {/* PESTAÑA 2: VISIÓN DESARROLLADOR / SYSADMIN (DEV & RECETA DE CÓDIGO) */}
          {/* ===================================================================== */}
          {activeTab === 'dev' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* Badge Identificador de Vista */}
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-xs text-sky-200 flex items-center justify-between">
                <span className="font-semibold flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Explicación para el Programador o SysAdmin: Receta de configuración y telemetría RFC</span>
                </span>
                <span className="font-mono text-[10px] text-sky-300">Código Listo para Copiar</span>
              </div>

              {/* Matriz de Sockets TCP Auditados */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Server className="w-4 h-4 text-[#38bdf8]" />
                    <span>Superficie de Exposición de Red (Zero-Downtime TCP Sockets)</span>
                  </h3>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Puerto 443 = Canal Seguro HTTPS &bull; Puerto 80 = Redirección Obligatoria
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                  {(DEMO_REPORT.ports || []).map((p) => {
                    const isPort443 = p.port === 443;
                    const isPort80 = p.port === 80;

                    let statusTitle = p.isOpen ? 'Abierto' : 'Cerrado';
                    let subtitle = 'Sin exposición';
                    let badgeColor = 'bg-white/5 border-white/10 text-neutral-400';

                    if (p.isOpen) {
                      if (isPort443) {
                        statusTitle = 'Abierto (Óptimo)';
                        subtitle = 'HTTPS Seguro';
                        badgeColor = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
                      } else if (isPort80) {
                        statusTitle = 'Redirección HTTPS';
                        subtitle = 'Hacia puerto 443';
                        badgeColor = 'bg-blue-500/15 border-blue-500/40 text-sky-300';
                      } else {
                        statusTitle = 'Expuesto';
                        subtitle = 'Alerta de riesgo';
                        badgeColor = 'bg-rose-500/15 border-rose-500/40 text-rose-300';
                      }
                    } else {
                      subtitle = 'Protegido';
                    }

                    return (
                      <div 
                        key={p.port}
                        className={`p-2.5 rounded-xl border text-center ${badgeColor}`}
                      >
                        <div className="font-mono font-bold text-xs text-white">Puerto {p.port}</div>
                        <div className="text-[10px] font-semibold mt-0.5">{statusTitle}</div>
                        <div className="text-[9px] opacity-70 mt-0.5">{subtitle}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tabla de Cabeceras OWASP / RFC */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#38bdf8]" />
                  <span>Evaluación de Cabeceras RFC y Parámetros Requeridos</span>
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-white/5 border-b border-white/10 font-mono text-neutral-400 text-[11px]">
                      <tr>
                        <th className="p-3">Cabecera</th>
                        <th className="p-3">Estado</th>
                        <th className="p-3">Severidad</th>
                        <th className="p-3">Directiva de Remediación</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-[11px] font-mono">
                      <tr>
                        <td className="p-3 font-bold text-white">X-Frame-Options</td>
                        <td className="p-3 text-rose-400 font-bold">✗ FALTA</td>
                        <td className="p-3 text-rose-300">ALTA</td>
                        <td className="p-3 text-emerald-400">DENY</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Strict-Transport-Security</td>
                        <td className="p-3 text-rose-400 font-bold">✗ FALTA</td>
                        <td className="p-3 text-rose-300">ALTA</td>
                        <td className="p-3 text-emerald-400">max-age=31536000; includeSubDomains; preload</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">Content-Security-Policy</td>
                        <td className="p-3 text-rose-400 font-bold">✗ FALTA</td>
                        <td className="p-3 text-rose-300">CRÍTICA</td>
                        <td className="p-3 text-emerald-400">frame-ancestors &apos;none&apos;;</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-white">X-Content-Type-Options</td>
                        <td className="p-3 text-emerald-400 font-bold">✓ PRESENTE</td>
                        <td className="p-3 text-neutral-400">MEDIA</td>
                        <td className="p-3 text-neutral-300">nosniff</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* RECETA DE CÓDIGO INTERACTIVA (NGINX / APACHE / CLOUDFLARE) */}
              <div className="space-y-4 p-5 sm:p-6 rounded-2xl bg-black/70 border border-white/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-xs font-mono text-[#38bdf8] uppercase font-bold block">
                      Receta de Código para Remediación (5 Minutos)
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      Aplica estas directivas para elevar la web a Grado A
                    </h4>
                  </div>

                  {/* Selector de Servidor */}
                  <div className="inline-flex p-1 rounded-xl bg-white/10 border border-white/10 gap-1 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveServerTab('nginx')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        activeServerTab === 'nginx' ? 'bg-[#0071e3] text-white shadow' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Nginx
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveServerTab('apache')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        activeServerTab === 'apache' ? 'bg-[#0071e3] text-white shadow' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Apache
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveServerTab('cloudflare')}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                        activeServerTab === 'cloudflare' ? 'bg-[#0071e3] text-white shadow' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Cloudflare
                    </button>
                  </div>
                </div>

                {/* Bloque de Código con botón de copia */}
                <div className="relative rounded-xl overflow-hidden bg-[#07090e] border border-white/10 p-4">
                  <button
                    type="button"
                    onClick={() => {
                      const code = activeServerTab === 'nginx' ? nginxSnippet : activeServerTab === 'apache' ? apacheSnippet : cloudflareSnippet;
                      copyCode(code);
                    }}
                    className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-white transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSnippet ? 'Copiado' : 'Copiar'}</span>
                  </button>

                  <pre className="font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed pt-2">
                    <code>
                      {activeServerTab === 'nginx' && nginxSnippet}
                      {activeServerTab === 'apache' && apacheSnippet}
                      {activeServerTab === 'cloudflare' && cloudflareSnippet}
                    </code>
                  </pre>
                </div>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 font-mono">
                  <span>Comando de verificación posterior: </span>
                  <code className="text-sky-300">curl -I https://ejemplo-empresa-demo.pe</code>
                </div>
              </div>

            </div>
          )}

          {/* Explicación Detallada de los Motores: Red Determinista + IA Consultiva */}
          <AuditEngineExplanation 
            engineVersion="1.2.0-cloud"
            aiModel="Neuronality AI (Google Gemini 1.5 Flash)"
            targetResolvedIp="[PROTEGIDA POR SEGURIDAD]"
            durationMs={840}
          />

          {/* Botones de Acción: WhatsApp en Verde Oficial */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <Link
              href="/defensati"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs sm:text-sm font-bold transition-all shadow-lg shadow-blue-500/25 text-center flex items-center justify-center gap-2"
            >
              <span>Escanear y Obtener Dictamen Gratis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`${siteConfig.contact.whatsappLink}?text=${encodeURIComponent('Hola Martín, revisé el informe de ejemplo de DEFENSA TI (Negocio + Dev) y quiero consultar sobre la auditoría y blindaje para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/30 active:scale-95 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
              </svg>
              <span>Consultar por WhatsApp</span>
            </a>
          </div>

          </div>
        </div>
      </main>
    </div>
  );
}
