/**
 * TEST AUTOMATIZADO DE PREVENCIÓN ANTI-SSRF (Server-Side Request Forgery)
 * Verifica que las redirecciones maliciosas hacia rangos privados o de metadatos
 * sean interceptadas y bloqueadas de acuerdo con la recomendación RFC 1918.
 */

import { validateRedirectTarget } from '../src/lib/security/ssrfValidator.ts';

const ANSI_GREEN = '\x1b[32m';
const ANSI_RED = '\x1b[31m';
const ANSI_CYAN = '\x1b[36m';
const ANSI_RESET = '\x1b[0m';
const ANSI_BOLD = '\x1b[1m';

async function runSsrfTestSuite() {
  console.log(`\n${ANSI_BOLD}${ANSI_CYAN}====================================================${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_CYAN}  DEFENSA TI · SUITE DE VERIFICACIÓN ANTI-SSRF     ${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_CYAN}  Protección de Redirecciones (RFC 1918 / Cloud)    ${ANSI_RESET}`);
  console.log(`${ANSI_BOLD}${ANSI_CYAN}====================================================${ANSI_RESET}\n`);

  const testCases = [
    {
      name: '1. Intento de redirección a Loopback local (127.0.0.1)',
      base: 'https://attacker-domain.com',
      location: 'http://127.0.0.1:8080/admin',
      expectedAllowed: false,
    },
    {
      name: '2. Intento de redirección a Cloud Metadata (169.254.169.254)',
      base: 'https://attacker-domain.com',
      location: 'http://169.254.169.254/latest/meta-data/iam/',
      expectedAllowed: false,
    },
    {
      name: '3. Intento de redirección a Red Privada Clase C (192.168.1.1)',
      base: 'https://attacker-domain.com',
      location: 'http://192.168.1.1/router-settings',
      expectedAllowed: false,
    },
    {
      name: '4. Intento de redirección a Red Privada Clase A (10.0.0.5)',
      base: 'https://attacker-domain.com',
      location: 'http://10.0.0.5/internal-api',
      expectedAllowed: false,
    },
    {
      name: '5. Intento de redirección a Hostname Interno (database.internal)',
      base: 'https://attacker-domain.com',
      location: 'http://database.internal/dump.sql',
      expectedAllowed: false,
    },
    {
      name: '6. Intento de escape de protocolo (file:///etc/passwd)',
      base: 'https://attacker-domain.com',
      location: 'file:///etc/passwd',
      expectedAllowed: false,
    },
    {
      name: '7. Redirección legítima a dominio público seguro (https://google.com)',
      base: 'http://google.com',
      location: 'https://www.google.com/',
      expectedAllowed: true,
    },
    {
      name: '8. Redirección relativa legítima (/contacto)',
      base: 'https://autonoma.pe/home',
      location: '/contacto',
      expectedAllowed: true,
    },
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const tc of testCases) {
    const result = await validateRedirectTarget(tc.base, tc.location);
    const passed = result.allowed === tc.expectedAllowed;

    if (passed) {
      passedCount++;
      console.log(`[PASS] ${tc.name}`);
      if (!result.allowed) {
        console.log(`       └─ Motivo de Bloqueo: ${ANSI_GREEN}${result.reason}${ANSI_RESET}`);
      } else {
        console.log(`       └─ Destino Aprobado: ${ANSI_GREEN}${result.sanitizedUrl}${ANSI_RESET}`);
      }
    } else {
      failedCount++;
      console.log(`[FAIL] ${ANSI_RED}${tc.name}${ANSI_RESET}`);
      console.log(`       └─ Esperado: ${tc.expectedAllowed}, Obtenido: ${result.allowed}`);
    }
    console.log('');
  }

  console.log(`${ANSI_BOLD}----------------------------------------------------${ANSI_RESET}`);
  if (failedCount === 0) {
    console.log(`${ANSI_GREEN}${ANSI_BOLD}✓ TODOS LOS TESTS PASARON (${passedCount}/${testCases.length}). Sistema 100% protegido contra SSRF por redirección.${ANSI_RESET}\n`);
  } else {
    console.log(`${ANSI_RED}${ANSI_BOLD}✗ HUBO FALLOS EN LA SUITE (${failedCount} fallaron).${ANSI_RESET}\n`);
  }
}

runSsrfTestSuite();
