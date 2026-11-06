# Política de Seguridad de DEFENSA TI

La seguridad es el núcleo fundamental de este proyecto. Agradecemos la colaboración de la comunidad y de investigadores de seguridad para mantener segura la plataforma.

## Versiones Soportadas

| Versión | Soportada          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Vectores Defensivos Implementados

* **Hardening Anti-SSRF Exhaustivo:**
  * **IPv4:** Bloqueo estricto de subredes privadas RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), Loopback (`127.0.0.0/8`), Cloud Metadata (`169.254.169.254`), CGNAT (`100.64.0.0/10`), Multicast (`224.0.0.0/4`) y Broadcast (`255.255.255.255/32`).
  * **IPv6:** Bloqueo de Loopback (`::1`), Indefinido (`::`), ULA RFC 4193 (`fc00::/7`), Link-Local (`fe80::/10`), IPv4-mapped IPv6 (`::ffff:0:0/96`) y Translation (`64:ff9b::/96`).
  * **Parsing Anti-Evasión:** Conversión canónica contra bypass por octal, hexadecimal, entero dword de 32 bits y notaciones cortas.
* **Inspección de Redirecciones (Anti-DNS Rebinding):**
  * Validación estricta de la cabecera `Location` en saltos `301`, `302`, `307` y `308`.
  * Restricción estricta de esquemas a solo `http:` y `https:`.
  * Re-resolución DNS en cada salto antes de conectar para neutralizar desvíos maliciosos hacia IPs internas.
* **Matriz Canónica de Puertos y Sondeo No Intrusivo:**
  * Inspección activa restringida exclusivamente a puertos web (`80`, `443`, `8080`).
  * Inspección no invasiva de puertos de infraestructura (`21`, `22`, `3306`) sin port-scanning agresivo.
  * Cero pruebas de inyección, fuerza bruta o denegación de servicio (DDoS).
* **Marco Legal y Declaración de Titularidad:**
  * En cumplimiento de la **Ley N° 30096 (Ley de Delitos Informáticos del Perú)**, toda auditoría requiere que el usuario declare bajo juramento ser propietario o contar con autorización formal del titular del dominio.

## Reporte de Vulnerabilidades

Si descubres una posible vulnerabilidad de seguridad, por favor **no abras un issue público**. 

Envía un reporte detallado con los pasos de reproducción a:
* **Correo de Seguridad:** [castillo.karol96@gmail.com](mailto:castillo.karol96@gmail.com)
* **Contacto Directo:** Martin Castillo

Responderemos dentro de un plazo de 24 a 48 horas con el plan de remediación correspondiente.
