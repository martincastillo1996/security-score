This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# SecurityScore — Cloud-Native Web Security & AI Remediation Engine

[![Next.js 16](https://img.shields.io/badge/Next.js-16.x-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js Engine](https://img.shields.io/badge/Node.js-22.x-green?style=flat&logo=node.js)](https://nodejs.org/)
[![Turbopack](https://img.shields.io/badge/Turbopack-Enabled-orange)](https://turbo.build/)

Un motor pasivo y automatizado de auditoría de seguridad web y configuración TLS/SSL, integrado con remediación heurística impulsada por modelos fundacionales (Google GenAI / Gemini 2.5). Diseñado para evaluar de manera no intrusiva el estado perimetral de cualquier dominio público y generar parches de configuración directos para servidores Nginx, Apache y Express.

---

## 🏛️ Decisiones de Arquitectura e Ingeniería

### 1. Auditoría Pasiva y Prevención de Riesgos Legales (SSRF Hardening)
A diferencia de los escáneres activos que realizan inyecciones o pruebas de fuzzing intrusivas, SecurityScore opera exclusivamente bajo el modelo de inspección pasiva:
* **Protocolo de Inspección:** Emplea peticiones HTTP con método `HEAD` y negociación directa de sockets TLS en el puerto 443.
* **Capa Anti-SSRF (Server-Side Request Forgery):** Antes de resolver cualquier petición saliente, la API ejecuta una resolución DNS asíncrona mediante `dns.promises.lookup` e inspecciona la dirección IPv4/IPv6 obtenida contra un bloqueador de subredes privadas RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8` y `169.254.0.0/16`). Si el dominio resuelve hacia una IP interna, la solicitud se interrumpe de inmediato con HTTP 403 Forbidden.

### 2. Inspección TLS/SSL a Nivel Socket
En lugar de depender de herramientas binarias externas (`OpenSSL` CLI) o dependencias de terceros desactualizadas:
* Implementa una conexión cruda mediante el módulo nativo `node:tls`.
* Extrae dinámicamente metadatos del certificado del host remoto (`peerCertificate`): emisor (Issuer Organization/CN), periodo de validez, días restantes para expiración y protocolo negociado.
* Configuración con bandera `rejectUnauthorized: false` para auditar dominios con certificados vencidos, autofirmados o revocados sin bloquear la ejecución del hilo principal.

### 3. Pipeline de Remediación con Doble Vía (Multi-Tier LLM Fallback)
Para garantizar una disponibilidad del 99.9% incluso ante límites de cuota (`429 Too Many Requests`) o falta de credenciales de API en entornos aislados:
* **Capa Primaria:** Invocación estructurada a Gemini 2.5 Flash mediante `@google/genai` con esquemas de salida JSON rígidos (`responseSchema`).
* **Capa Secundaria (Fallback Heurístico Inmediato):** Motor estático interno precalculado que genera configuraciones optimizadas para Nginx, Apache y Express si la llamada remota falla o excede el tiempo límite de red.

---

## 📊 Especificación de Cabeceras Auditadas

El motor evalúa 6 vectores principales según los estándares OWASP Secure Headers Project:

| Cabecera | Peso | Severidad | Propósito Técnico |
| :--- | :---: | :---: | :--- |
| **Strict-Transport-Security (HSTS)** | 25 pts | Crítica | Fuerza cifrado TLS continuo y mitiga ataques de degradación SSL Strip. |
| **Content-Security-Policy (CSP)** | 25 pts | Alta | Mitiga Cross-Site Scripting (XSS) y restricciones de origen de scripts. |
| **X-Frame-Options** | 15 pts | Media | Previene ataques de Clickjacking forzando políticas de framing (`DENY`/`SAMEORIGIN`). |
| **X-Content-Type-Options** | 15 pts | Media | Deshabilita el MIME-type sniffing en navegadores (`nosniff`). |
| **Referrer-Policy** | 10 pts | Baja | Controla la fuga de metadatos de rutas internas en cabeceras de referencia. |
| **Permissions-Policy** | 10 pts | Baja | Restringe el acceso a APIs del navegador (geolocalización, cámara, micrófono). |

---

## 🚀 Despliegue y Ejecución Local

### Prerrequisitos
* Node.js v20.x o superior
* npm v10.x o superior

### Instalación
```bash
# Clonar el repositorio
git clone [https://github.com/TU_USUARIO/security-score.git](https://github.com/martincastillo1996
/security-score.git)
cd security-score

# Instalar dependencias
npm install



# SecurityScore - Auditor de Seguridad Perimetral & TLS

Herramienta de inspección defensiva pasiva orientada a la evaluación de cabeceras HTTP (estándar OWASP), análisis de certificados TLS/SSL a nivel socket y generación automatizada de parches de infraestructura asistidos por IA.

## Características Técnicas

- **Auditoría Pasiva:** Inspección no intrusiva mediante solicitudes `HEAD` y negociación directa de sockets TLS en Node.js sin pruebas destructivas.
- **Protección Anti-SSRF:** Validación DNS y restricción estricta de rangos de direcciones IP privadas (RFC 1918) y bucles locales.
- **Matriz de Cabeceras OWASP:** Evaluación de `HSTS`, `CSP`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` y `Permissions-Policy`.
- **Motor de Remediación Dual:** Generación contextual de directivas para Nginx, Apache y Express mediante Gemini 2.5 Flash, con fallback automático a reglas heurísticas precalculadas.
- **Rutas de Auditoría Persistentes:** Generación de identificadores UUID únicos para consulta y compartición de reportes.

## Stack Tecnológico

- **Frontend & Backend:** Next.js (App Router, Turbopack), React, TypeScript, Tailwind CSS.
- **Seguridad & Tipado:** Zod, módulos nativos `node:tls` y `node:dns`.
- **Inferencia:** Google GenAI SDK (`gemini-2.5-flash`).
- **Despliegue Objetivo:** AWS Amplify / AWS CloudFront + S3.

## Configuración Local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/martincastillo1996/security-score.git](https://github.com/martincastillo1996/security-score.git)
   cd security-score