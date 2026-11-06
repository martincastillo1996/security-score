/**
 * Matriz Canónica Oficial de Puertos de DEFENSA TI (Única fuente de verdad)
 * Sincronizada entre el motor perimetral, la API, la interfaz web y la documentación.
 * Este archivo no contiene dependencias de Node.js (net/dns) para ser seguro en cliente y servidor.
 */

export interface CanonicalPortItem {
  port: number;
  service: string;
  shortName: string;
  risk: 'BAJO' | 'MEDIO' | 'ALTO' | 'CRÍTICO';
  description: string;
}

export const CANONICAL_PORTS: CanonicalPortItem[] = [
  { port: 80, service: 'HTTP (Texto plano)', shortName: 'HTTP', risk: 'MEDIO', description: 'Debe forzar redirección estricta 301 hacia HTTPS.' },
  { port: 443, service: 'HTTPS (TLS Cifrado)', shortName: 'HTTPS', risk: 'BAJO', description: 'Canal de transporte cifrado estándar para la web.' },
  { port: 8080, service: 'HTTP-Alt / Dev', shortName: 'HTTP-Alt', risk: 'MEDIO', description: 'Puerto alternativo de backend sin filtrado perimetral.' },
  { port: 21, service: 'FTP', shortName: 'FTP', risk: 'CRÍTICO', description: 'Protocolo de transferencia sin cifrar expuesto a la red pública.' },
  { port: 22, service: 'SSH', shortName: 'SSH', risk: 'ALTO', description: 'Gestión de terminal remota expuesta a ataques de fuerza bruta.' },
  { port: 3306, service: 'MySQL Database', shortName: 'MySQL', risk: 'CRÍTICO', description: 'Motor de base de datos accesible de forma directa desde Internet.' },
];
