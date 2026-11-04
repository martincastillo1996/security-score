# Reglas de Trabajo y Preferencias de Martín Castillo (DEFENSA TI)

## 1. Modo de Comunicación y Aprendizaje
- **Explicación Visual y Pedagógica Primero:** Antes de hacer cambios complejos, explica con diagramas, comparativas visuales o esquemas ASCII / Mermaid qué se va a hacer y por qué. Martín está aprendiendo y el objetivo es que entienda la lógica de fondo.
- **Consultar Dudas Antes de Gastar Tokens:** Si hay más de una forma de resolver un requerimiento (diseño, velocidad, arquitectura), detente y haz preguntas de opción múltiple con gráficos/bocetos previos.

## 2. Regla de Oro de Despliegue (Local vs. Producción)
- **Cero Push Directo a Producción:** Ningún cambio se sube a GitHub ni a Vercel sin que Martín lo haya revisado y aprobado en su navegador local (`http://localhost:3000`).
- **Confirmación Explícita:** Solo se ejecuta `git push origin main` cuando Martín escriba explícitamente **"go"**, **"subelo"** o **"publicalo"**.

## 3. Estándar de Diseño y Calidad Visual (Apple Aesthetic)
- **Paleta Oficial:** Fondo oscuro espacial `#000000` / `#0f0f11`, tarjetas en grafito sólido `#161618` con bordes sutiles `border-white/10`. Acentos en Azul Pro Apple `#0071e3` / `#2997ff`.
- **Alto Contraste y Cero Transparencias Raras:** El texto de información clave siempre debe tener fondo sólido para que no se mezcle ni se pierda con partículas o animaciones.
- **Textos Completos:** Los dominios y rutas nunca deben cortarse con `truncate` agresivo; usar `break-all` o envoltura limpia.

## 4. Contexto Legal y Comercial (Perú)
- Todas las auditorías y mensajes de privacidad deben contemplar la **Ley Peruana N° 29733 (Protección de Datos Personales)** y las directivas de la ANPDP.
- Los llamados a la acción comerciales siempre van conectados a la consultoría por WhatsApp (`+1 785 643-3991`).

## 5. Cero Errores Técnicos
- Mantener siempre **0 errores de TypeScript** (`npx tsc --noEmit`) y **0 errores de ESLint** (`npm run lint`).
- Las pruebas de seguridad SSRF (`npm run test:ssrf`) deben pasar al 100%.

## 6. Consistencia Absoluta de Marca, Logos, Formas y Paleta Visual (ESTRICTO)
- **Cero Rediseños Arbitrarios:** NUNCA cambiar, rehacer ni alterar los logotipos, isotipos, formas, componentes ya validados ni la paleta de colores establecida. La identidad de marca debe ser predecible, sólida y respetada al 100% en cada iteración para poder escalar con estabilidad.
- **Identidad Oficial Fijada:**
  * **Nombre de Marca:** Neuronal Gravity (`neuronalgravity.com`) & DEFENSA TI.
  * **Logo Oficial Neuronal Gravity:** Contenedor redondeado con gradiente azul `#0071e3` / morado `#7928ca` y núcleo neural en cian `#38bdf8`.
  * **Logo Oficial DEFENSA TI:** Escudo `ShieldCheck` en contenedor Apple Glass de titanio oscuro.
  * **Paleta Oficial Inmutable:** Negro puro `#000000`, grafito `#0c0d10`, azul eléctrico `#0071e3` / `#2997ff`, cian neón `#38bdf8`, y verde esmeralda `#25D366` / `#30d158` (para WhatsApp y estados activos).
- **Enfoque de Crecimiento:** Toda nueva funcionalidad o mejora debe sumarse sobre la base visual existente, sin alterar lo que ya está construido ni forzar cambios de diseño.

## 7. Previsualización y Aprobación Obligatoria Antes de Cambios Visuales o Producción (ESTRICTO)
- **Previsualización Obligatoria Primero:** Ante cualquier cambio de diseño, layout, estilos o cualquier ajuste que haga que la página se vea diferente, el asistente DEBE presentar primero una previsualización detallada (estructura visual, contenido y aspecto exacto) antes de darlo por definitivo.
- **Pregunta de Aprobación Explícita:** Siempre se debe consultar directamente a Martín: *"¿Está bien así o qué le cambiamos antes de que salga a producción?"*.
- **Formato de Aprobación Tipo Pop-up:** La consulta de aprobación final o confirmación de despliegue DEBE emitirse siempre a través de la tarjeta interactiva de selección (herramienta `ask_question`), para que Martín pueda revisar las opciones y dar el **"Go"** con un solo clic como un pop-up.
- **Cero Modificaciones Visuales Sorpresa:** Ningún cambio visual se consolida ni se prepara para producción sin la confirmación y visto bueno explícito de Martín sobre el resultado visible.
