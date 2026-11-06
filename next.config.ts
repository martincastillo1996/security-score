import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Seguridad y Hardening de Producción */
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  /* Opciones de rendimiento existentes */
  cacheComponents: false,
  partialPrefetching: false,

  /* Rewrites y Redirecciones Canónicas */
  async rewrites() {
    return [
      {
        source: '/scanner',
        destination: '/defensati',
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/soluciones',
        destination: '/',
        permanent: true,
      },
      {
        source: '/casos',
        destination: '/',
        permanent: true,
      },
      {
        source: '/metodologia',
        destination: '/',
        permanent: true,
      },
      {
        source: '/liderazgo',
        destination: '/',
        permanent: true,
      },
    ];
  },

  /* Hardening perimetral de cabeceras HTTP */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "default-src 'self' https://checkout.culqi.com; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://checkout.culqi.com https://js.culqi.com; style-src 'self' 'unsafe-inline' https://checkout.culqi.com; img-src 'self' data: https: https://checkout.culqi.com; font-src 'self' data: https://checkout.culqi.com; connect-src 'self' https: https://api.culqi.com https://checkout.culqi.com; frame-src 'self' https://checkout.culqi.com; frame-ancestors 'none';",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;