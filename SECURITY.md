# Política de Seguridad de DEFENSA TI

La seguridad es el núcleo fundamental de este proyecto. Agradecemos la colaboración de la comunidad y de investigadores de seguridad para mantener segura la plataforma.

## Versiones Soportadas

| Versión | Soportada          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Vectores Defensivos Implementados

* **Hardening Anti-SSRF:** Bloqueo estricto de subredes privadas RFC 1918 (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`), Loopback (`127.0.0.0/8`, `::1`) y Cloud Metadata (`169.254.169.254`).
* **Inspección de Redirecciones:** Validación de cabeceras `Location` en saltos HTTP para impedir técnicas de desvío (*slipping*) o DNS Rebinding hacia hosts internos.
* **Sondeo No Intrusivo:** Cero pruebas de inyección o denegación de servicio. Todas las pruebas operan bajo el modelo pasivo RFC / OWASP.

## Reporte de Vulnerabilidades

Si descubres una posible vulnerabilidad de seguridad, por favor **no abras un issue público**. 

Envía un reporte detallado con los pasos de reproducción a:
* **Correo de Seguridad:** [castillo.karol96@gmail.com](mailto:castillo.karol96@gmail.com)
* **Contacto Directo:** Martin Castillo

Responderemos dentro de un plazo de 24 a 48 horas con el plan de remediación correspondiente.
