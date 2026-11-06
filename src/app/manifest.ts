import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Neuronal Gravity | Soluciones de Negocio con IA',
    short_name: 'Neuronal Gravity',
    description: 'Agentes de IA en WhatsApp 24/7, automatización operativa y ciberdefensa perimetral DEFENSA TI.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/martin-castillo-preview.jpg',
        sizes: '192x192',
        type: 'image/jpeg',
      },
    ],
  };
}
