// Registro único y fuente de verdad de proyectos para el Hub de Neuronal Gravity
export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  targetAudience: string;
  description: string;
  entryPrice: string;
  href: string;
  status: 'active';
  features: string[];
}

export const projectsRegistry: ProjectItem[] = [
  {
    id: 'defensati',
    title: 'DEFENSA TI',
    badge: 'Primer Proyecto Activo',
    targetAudience: 'Para empresas y negocios en el Perú con presencia web que necesitan blindar su reputación y cumplir con estándares de ciberseguridad.',
    description: 'Auditoría externa no intrusiva y blindaje perimetral para sitios web corporativos y comercio electrónico.',
    entryPrice: 'Desde S/ 65',
    href: '/defensati',
    status: 'active',
    features: [
      'Diagnóstico de cabeceras, SSL y vulnerabilidades visibles',
      'Planes fijos de auditoría y endurecimiento técnico en Soles',
      'Servicio especializado de limpieza de sitios hackeados',
      'Escáner público de código abierto sin almacenamiento invasivo',
    ],
  },
];
