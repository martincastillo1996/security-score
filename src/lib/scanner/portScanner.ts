import * as net from 'net';

export interface PortCheckResult {
  port: number;
  service: string;
  isOpen: boolean;
  risk: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRÍTICO';
  description: string;
}

const CRITICAL_PORTS = [
  { port: 80, service: 'HTTP (Texto plano)', risk: 'MEDIO' as const, description: 'Debe forzar redirección estricta 301 hacia HTTPS.' },
  { port: 21, service: 'FTP', risk: 'CRÍTICO' as const, description: 'Protocolo de transferencia sin cifrar expuesto a la red pública.' },
  { port: 22, service: 'SSH', risk: 'ALTO' as const, description: 'Gestión de terminal remota expuesta a ataques de fuerza bruta.' },
  { port: 3306, service: 'MySQL Database', risk: 'CRÍTICO' as const, description: 'Motor de base de datos accesible de forma directa desde Internet.' },
  { port: 8080, service: 'HTTP-Proxy / Dev', risk: 'MEDIO' as const, description: 'Puerto alternativo de backend sin filtrado perimetral.' },
];

function checkPort(host: string, port: number, timeout = 600): Promise<boolean> {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let isConnected = false;

    socket.setTimeout(timeout);

    socket.on('connect', () => {
      isConnected = true;
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
  const checks = CRITICAL_PORTS.map(async (item) => {
    const isOpen = await checkPort(host, item.port);
    return {
      ...item,
      isOpen,
    };
  });

  return Promise.all(checks);
}