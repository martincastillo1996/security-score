<div align="center">

# 🛡️ DEFENSA TI

### *Ultra-Fast Perimeter Security, TLS Hardening & OWASP Compliance Engine*

<p align="center">
  Un motor de auditoría perimetral no intrusivo y de alta velocidad diseñado para evaluar la postura criptográfica, exposición de sockets TCP y directivas defensivas OWASP en cualquier infraestructura web moderna.
</p>

<!-- Status & Quality Badges -->
[![CI Pipeline](https://img.shields.io/github/actions/workflow/status/martincastillo1996/security-score/ci.yml?branch=main&style=for-the-badge&logo=github-actions&logoColor=white&label=CI%20Status)](https://github.com/martincastillo1996/security-score/actions)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.x-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Anti-SSRF Hardened](https://img.shields.io/badge/Anti--SSRF-RFC_1918_Protected-0284c7?style=for-the-badge&logo=shield&logoColor=white)](#-arquitectura-de-seguridad-anti-ssrf)
[![License: MIT](https://img.shields.io/badge/License-MIT-amber?style=for-the-badge)](LICENSE)

<br/>

<!-- Community & Social Connections (Scrapling Style) -->
[![WhatsApp Contact](https://img.shields.io/badge/WhatsApp-Consultor%C3%ADa%20Inmediata-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/17856433991?text=Hola%20Martin,%20vi%20DEFENSA%20TI%20y%20quiero%20cotizar%20un%20blindaje%20perimetral)
[![LinkedIn Profile](https://img.shields.io/badge/LinkedIn-Martin%20Castillo-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/karol-martin-castillo-rojas-17a496168/)
[![TikTok QA & Security](https://img.shields.io/badge/TikTok-Auditor%C3%ADas%20en%20Vivo-000000?style=for-the-badge&logo=tiktok&logoColor=white)](https://tiktok.com/@martincastillo)
[![GitHub Stars](https://img.shields.io/github/stars/martincastillo1996/security-score?style=for-the-badge&color=eab308&logo=github)](https://github.com/martincastillo1996/security-score/stargazers)

<br/>

[🌐 Probar en Producción](https://security-score-seven.vercel.app) &bull; [📖 Documentación](#-características-principales) &bull; [⚡ API Quickstart](#-api-quickstart-curl) &bull; [💬 WhatsApp Directo (+1 785 643-3991)](https://wa.me/17856433991)

---

</div>

## 📑 Tabla de Contenidos

- [🎯 Por qué DEFENSA TI](#-por-qué-defensa-ti)
- [✨ Características Principales](#-características-principales)
- [📊 Tabla Comparativa](#-tabla-comparativa)
- [🏛️ Arquitectura del Sistema](#-arquitectura-del-sistema)
- [🛡️ Blindaje Anti-SSRF y Validación de Redirecciones](#-blindaje-anti-ssrf-y-validación-de-redirecciones)
- [🚀 Inicio Rápido (Local)](#-inicio-rápido-local)
- [⚡ API Quickstart (cURL)](#-api-quickstart-curl)
- [🧪 Suite de Tests Automatizados](#-suite-de-tests-automatizados)
- [💼 Conversión Comercial & WhatsApp](#-conversión-comercial--contacto)
- [📄 Licencia](#-licencia)

---

## 🎯 Por qué DEFENSA TI

La mayoría de escáneres de seguridad tradicionales (*Qualys*, *Mozilla Observatory*) sufren de tres problemas críticos:
1. **Lentitud extrema:** Tardan entre 30 y 120 segundos en auditar un solo dominio.
2. **Cero contexto de negocio:** Arrojan términos técnicos densos que ningún dueño de empresa o tomador de decisiones entiende.
3. **Falta de parches accionables:** Indican qué está mal, pero no entregan la configuración exacta para solucionarlo.

**DEFENSA TI** resuelve esto ejecutando una **auditoría completa en menos de 1.2 segundos**, traduciendo cada fallo a impacto financiero/comercial y generando parches listos para copiar y pegar en **Nginx, Apache y Express**.

---

## ✨ Características Principales

* ⚡ **Auditoría Perimetral Asíncrona Concurrente:** Inspección optimizada de transporte TLS, puertos TCP y cabeceras HTTP sin colgar el hilo de ejecución (tiempos típicos de 1 a 2 segundos en condiciones estándar de red).
* 🔒 **Inspección de Sockets TLS a Nivel Kernel:** Conexión cruda mediante `node:tls` para verificar algoritmos de cifrado, cadenas de certificación, vigencia y compatibilidad con **TLSv1.3**.
* 🔌 **Matriz Canónica de Sockets TCP:** Inspección en puertos web (`80`, `443`, `8080`) y verificación de exposición de infraestructura (`21 FTP`, `22 SSH`, `3306 MySQL`) con sondeo no intrusivo y timeouts de `600ms`.
* 🛡️ **Hardening Anti-SSRF Exhaustivo (IPv4 + IPv6 + Redirects):** Mitigación multicapa con pre-resolución DNS dual (A y AAAA), bloqueo de rangos privados (RFC 1918, RFC 3927 Cloud Metadata, RFC 4193 ULA, CGNAT) e inspección estricta de saltos 301/302 para frenar desvíos y DNS Rebinding.
* 🤖 **Motor de Remediación con Cascada Dual:** Inteligencia artificial vía Google Gemini con fallback inmediato a reglas heurísticas estáticas ($0 costo permanente).
* 📄 **Dictamen Perimetral en PDF A4:** Generación instantánea de reportes ejecutivos con membrete formal y receta de código lista para aplicar en Nginx, Apache o Cloudflare.
* 💼 **Modo Dual Dueño de Negocio vs. Ingeniero:** Interruptor en vivo que traduce las directivas técnicas a riesgos comerciales de clickjacking, pérdida de ventas o robo de sesiones.

---

## 📊 Tabla Comparativa

| Capacidad / Métrica | **DEFENSA TI** | Mozilla Observatory | Qualys SSL Labs |
| :--- | :---: | :---: | :---: |
| **Tiempo de Auditoría Promedio** | **⚡ 1 - 2 seg (Concurrente)** | 🐢 15 - 30 seg | ⏳ 60 - 120 seg |
| **Inspección de Sockets TCP (80, 443, 8080, 21, 22, 3306)** | ✅ **Sí (Nativa)** | ❌ No | ❌ No |
| **Generación de Parches Nginx/Apache/Node** | ✅ **Inmediata (IA + Local)** | ❌ Solo enlaces | ❌ No |
| **Protección Activa Anti-SSRF (IPv4 + IPv6 + DNS Rebinding)** | ✅ **DNS Dual + Redirects** | ❌ N/A | ❌ N/A |
| **Persistencia de Enlaces $0 (Sin Base de Datos)** | ✅ **Payload Autónomo** | ❌ Requiere BD | ❌ Temporal |
| **Exportación Forense A4 PDF** | ✅ **Nativa en 1-Click** | ❌ No | ❌ Solo Print |
| **Traducción a Impacto de Negocio** | ✅ **Sí (Modo Dual)** | ❌ Solo técnico | ❌ Solo técnico |

---

## 🏛️ Arquitectura del Sistema

```mermaid
flowchart TD
    A[🌐 Petición de Auditoría: targetUrl] --> B[🛡️ Capa Anti-SSRF: Validación Dual IPv4/IPv6]
    B -->|Dominio Público Válido| C[⚡ Despachador Concurrente en Paralelo]
    B -->|Host Privado / Metadata / Loopback| X[🛑 HTTP 400: Auditoría Denegada]

    subgraph Inspección Perimetral Concurrente
        C --> D[🔒 Socket TLS 1.3 & Certificado X.509]
        C --> E[🌐 Cabeceras Defensivas HTTP & Redirects]
        C --> F[🔌 Sockets TCP: 80, 443, 8080, 21, 22, 3306]
    end

    E -->|Detecta 301/302 Location| E1{Validar Salto HTTP}
    E1 -->|Host Privado / Metadata / Protocolo Extraño| E2[🛑 Bloquear Salto SSRF]
    E1 -->|Destino Público Seguro| E3[Continuar Salto Re-validado]

    D & E & F --> G[🧮 Motor de Puntuación Algorítmica DEFENSA TI 0-100]
    G --> H[🤖 Pipeline de Remediación]
    H -->|Gemini API Disponible| H1[IA Generativa: Parches Contextuales]
    H -->|Fallo / Sin Conexión| H2[Motor Determinista Local OWASP]

    H1 & H2 --> I[📊 Reporte Unificado JSON / UI / PDF / WhatsApp]
```

---

## 🛡️ Blindaje Anti-SSRF y Validación de Redirecciones

Para garantizar que el motor perimetral no pueda ser utilizado como proxy abierto ni vector de ataque contra redes internas (*Server-Side Request Forgery*):

1. **Resolución DNS Dual (IPv4 e IPv6):** Se resuelven concurrentemente los registros `A` (`dns.resolve4`) y `AAAA` (`dns.resolve6`) antes de abrir conexiones de red.
2. **Filtrado Estricto de Direcciones y Rangos Especiales:**
   * **IPv4:** RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), Loopback (`127.0.0.0/8`), Cloud Metadata (`169.254.169.254`), CGNAT (`100.64.0.0/10`), Multicast (`224.0.0.0/4`) y Broadcast (`255.255.255.255/32`).
   * **IPv6:** Loopback (`::1`), Indefinido (`::`), ULA RFC 4193 (`fc00::/7`), Link-Local (`fe80::/10`), IPv4-mapped IPv6 (`::ffff:0:0/96`) y Translation (`64:ff9b::/96`).
   * **Parsing Anti-Evasión:** Normalización canónica de notaciones alternativas (octal, hexadecimal, entero dword de 32 bits y notaciones abreviadas).
3. **Validación Salto a Salto en Redirecciones (`validateRedirectTarget`):** Si un dominio responde con `301`, `302`, `307` o `308`, se captura la cabecera `Location`, se restringe el esquema estrictamente a `http:` o `https:` (bloqueando `file://`, `gopher://`, etc.), se re-resuelve el DNS del nuevo host y se bloquea si apunta a una red interna o a endpoints de metadatos de nube.
4. **Delimitación de Alcance y Responsabilidad:**
   * La **Calificación DEFENSA TI (0 a 100, Grado A a F)** evalúa la superficie perimetral externa (cabeceras HTTP OWASP, transporte SSL/TLS y exposición de puertos).
   * **No constituye una certificación formal ISO 27001 ni PCI-DSS**, ni audita código fuente interno, bases de datos o credenciales de la aplicación.
   * Conforme a la **Ley N° 30096 (Ley de Delitos Informáticos del Perú)**, el usuario declara bajo juramento contar con la titularidad o autorización expresa del propietario del dominio ingresado.

---

## 🚀 Inicio Rápido (Local)

### Prerrequisitos
* Node.js v20.x o superior
* npm v10.x o superior

```bash
# 1. Clonar el repositorio
git clone https://github.com/martincastillo1996/security-score.git
cd security-score

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (Opcional para IA)
cp .env.example .env.local
# Agrega tu GEMINI_API_KEY si deseas remediación por IA generativa

# 4. Iniciar en modo desarrollo
npm run dev
```

Abre en tu navegador [http://localhost:3000](http://localhost:3000).

---

## ⚡ API Quickstart (cURL)

Puedes consumir el motor de auditoría perimetral de forma programática:

```bash
curl -X POST https://security-score-seven.vercel.app/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://autonoma.pe"}'
```

### Respuesta de Ejemplo (JSON estructurado)
```json
{
  "id": "22f1c318-6808-4bfc-b340-918bf1da7468",
  "url": "https://autonoma.pe",
  "score": 40,
  "grade": "D",
  "ssl": {
    "valid": true,
    "protocol": "TLSv1.2",
    "daysRemaining": 133
  },
  "ports": [
    { "port": 80, "service": "HTTP", "isOpen": true, "risk": "MEDIO" },
    { "port": 21, "service": "FTP", "isOpen": false, "risk": "CRÍTICO" },
    { "port": 22, "service": "SSH", "isOpen": false, "risk": "ALTO" },
    { "port": 3306, "service": "MySQL", "isOpen": false, "risk": "CRÍTICO" },
    { "port": 8080, "service": "Proxy/Dev", "isOpen": false, "risk": "MEDIO" }
  ],
  "headers": [
    { "name": "Strict-Transport-Security", "status": "fail", "present": false },
    { "name": "Content-Security-Policy", "status": "fail", "present": false },
    { "name": "X-Frame-Options", "status": "fail", "present": false }
  ]
}
```

---

## 🧪 Suite de Tests Automatizados

DEFENSA TI cuenta con una suite integral de verificación de vectores de ataque:

```bash
# Correr suite de validación de redirecciones y Anti-SSRF
npm run test:ssrf

# Comprobar linteo estricto (0 errores, 0 warnings)
npm run lint

# Comprobar integridad de tipos TypeScript
npx tsc --noEmit
```

---

## 🌐 Comunidad, Viralidad & Redes de Contacto

Inspirado en el estándar de engagement de proyectos open-source de alto crecimiento (como [Scrapling](https://github.com/D4Vinci/Scrapling)), ponemos a disposición canales directos para soporte, cotizaciones corporativas y demostraciones en vivo:

| Canal | Propósito | Enlace |
| :--- | :--- | :--- |
| 💬 **WhatsApp Oficial** | Consultoría perimetral directa, blindaje urgente de servidores y presupuestos | [Iniciar Conversación](https://wa.me/17856433991?text=Hola%20Martin,%20vi%20DEFENSA%20TI%20y%20quiero%20cotizar) |
| 💼 **LinkedIn Corporativo** | Artículos de seguridad ofensiva/defensiva y networking profesional | [Conectar con Martin Castillo](https://www.linkedin.com/in/karol-martin-castillo-rojas-17a496168/) |
| 🎬 **TikTok Auditorías QA** | Casos prácticos de estudio en vivo, análisis perimetrales y divulgación de brechas | [Ver Contenido Viral](https://tiktok.com/@martincastillo) |
| 🐙 **GitHub Discussions** | Sugerencias de nuevas pruebas OWASP, reportes y colaboración técnica | [Abrir Discusión](https://github.com/martincastillo1996/security-score/issues) |

---

## 💼 Conversión Comercial & Servicios de Blindaje

DEFENSA TI está diseñado tanto para auditorías públicas como para la prospección de servicios de ciberseguridad defensiva:
* **Generación de Leads:** Cada reporte emitido incluye opciones para exportar dictamen forense y contactar a un ingeniero especializado vía WhatsApp con un clic.
* **Soluciones Ofrecidas:**
  1. Configuración de **TLSv1.3 & HSTS Preload**.
  2. Implementación de **Content Security Policy (CSP)** a prueba de inyecciones XSS.
  3. Cierre perimetral de puertos y configuración de firewalls (iptables/ufw/AWS Security Groups).
  4. Auditorías de cumplimiento para e-commerce (PCI-DSS).

* **Línea Directa de Consultoría:** [+1 (785) 643-3991](https://wa.me/17856433991)
* **Ingeniero Líder:** Martin Castillo &bull; [castillo.karol96@gmail.com](mailto:castillo.karol96@gmail.com)

---

## 📄 Licencia

Distribuido bajo la Licencia **MIT**. Consulta el archivo [`LICENSE`](LICENSE) para más detalles.

<div align="center">
  <sub>Diseñado y desarrollado con pasión por <strong>Martin Castillo</strong> &bull; DEFENSA TI © 2026</sub>
</div>
