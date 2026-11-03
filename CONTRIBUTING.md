# Guía de Contribución a DEFENSA TI

¡Gracias por tu interés en contribuir a **DEFENSA TI**! Este proyecto busca democratizar la ciberseguridad defensiva y hacerla comprensible para ingenieros y dueños de negocios.

## Cómo empezar

1. Haz un Fork del repositorio.
2. Clona tu bifurcación:
   ```bash
   git clone https://github.com/TU_USUARIO/defensati.git
   cd defensati
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Crea una rama para tu feature o corrección:
   ```bash
   git checkout -b feature/nueva-directiva-owasp
   ```

## Estándares de Calidad Obligatorios

Antes de enviar un Pull Request, asegúrate de que todos los tests pasen limpios:

```bash
# 1. Comprobar linteo estricto (0 errores, 0 warnings)
npm run lint

# 2. Verificar tipos de TypeScript
npx tsc --noEmit

# 3. Correr suite de seguridad Anti-SSRF
npm run test:ssrf
```

## Convención de Commits

Seguimos la convención de [Conventional Commits](https://www.conventionalcommits.org/):
* `feat:` Nuevas características o detectores de seguridad.
* `fix:` Corrección de bugs o falsos positivos.
* `docs:` Cambios en documentación o README.
* `refactor:` Mejoras de rendimiento sin alterar la funcionalidad.
* `test:` Adición de casos de prueba.
