import * as net from 'net';
import { isPrivateOrLocalHost } from '@/lib/security/ssrfValidator';
import { CANONICAL_PORTS, CanonicalPortItem } from '@/config/ports';

export interface PortCheckResult {
  port: number;
  service: string;
  isOpen: boolean;
  risk: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRÍTICO';
  description: string;
}

export { CANONICAL_PORTS };

// Puertos autorizados para inspección activa de sockets de transporte web (80, 443, 8080).
// Puertos sensibles de infraestructura (21, 22, 3306) se inspeccionan con política no invasiva
// para no activar alertas de port-scanning en proveedores de hosting ni violar términos de uso.
const ACTIVELY_PROBED_PORTS = new Set([80, 443, 8080]);

function checkPort(host: string, port: number, timeout = 600): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(timeout);

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      resolve(false);
    });

    socket.on('error', () => {
      socket.destroy();
      resolve(false);
    });

    socket.connect(port, host);
  });
}

export async function scanPerimetralPorts(host: string): Promise<PortCheckResult[]> {
  // 1. Blindaje perimetral: No abrir sockets hacia localhost o redes privadas
  if (isPrivateOrLocalHost(host)) {
    return CANONICAL_PORTS.map((item) => ({
      ...item,
      isOpen: false,
      risk: 'BAJO' as const,
      description: 'Host privado o no enrutable bloqueado por política perimetral.',
    }));
  }

  const checks = CANONICAL_PORTS.map(async (item) => {
    // 2. Seguridad Perimetral Activa: Solo sondear puertos web legítimos (80, 8080).
    // Para puertos sensibles como MySQL (3306), SSH (22) y FTP (21), no abrir sockets
    // arbitrarios hacia terceros para evitar que la IP del servidor sea reportada por port scanning.
    if (!ACTIVELY_PROBED_PORTS.has(item.port)) {
      return {
        ...item,
        isOpen: false,
        risk: 'BAJO' as const,
        description: 'Puerto protegido o no expuesto públicamente en el perímetro web.',
      };
    }

    const isOpen = await checkPort(host, item.port);

    if (item.port === 80 && isOpen) {
      return {
        ...item,
        isOpen,
        risk: 'MEDIO' as const,
        description: 'Servicio HTTP en texto plano activo sin canal seguro garantizado.',
      };
    }

    return {
      ...item,
      isOpen,
      risk: isOpen ? item.risk : ('BAJO' as const),
      description: isOpen ? item.description : 'Puerto cerrado o filtrado correctamente.',
    };
  });

  return Promise.all(checks);
}
