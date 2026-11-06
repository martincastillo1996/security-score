// Configuración oficial y única fuente de verdad para Neuronal Gravity y DEFENSA TI
export const siteConfig = {
  name: 'Neuronal Gravity',
  title: 'Neuronal Gravity | Soluciones tecnológicas listas para usar',
  description: 'Soluciones tecnológicas listas para usar. Primer proyecto: DEFENSA TI, blindaje perimetral y ciberseguridad para empresas en el Perú.',
  url: 'https://neuronalgravity.com',
  ogImage: '/martin-castillo-preview.jpg',
  
  // Contacto Oficial
  contact: {
    whatsappNumber: '+17856433991',
    whatsappFormatted: '+1 (785) 643-3991',
    whatsappLink: 'https://wa.me/17856433991',
    email: 'contacto@neuronalgravity.com',
    hours: 'Lunes a Sábado, 9:00 a 20:00 (Hora Perú)',
  },

  // Datos Fiscales y Legales
  business: {
    brandName: 'DEFENSA TI',
    owner: 'Martín Castillo',
    ruc: '10704877850',
    receiptNotice: 'Comprobante de pago disponible',
    locationNotice: '[PENDIENTE: Ubicación confirmada]',
    githubRepo: 'https://github.com/martincastillo1996/security-score',
  },

  // Precios y Planes Oficiales DEFENSA TI (100% en Soles)
  pricing: {
    currency: 'PEN',
    currencySymbol: 'S/',
    plans: [
      {
        id: 'auditoria',
        name: 'Auditoría',
        price: 65,
        priceDisplay: 'S/ 65',
        deliveryTime: '48 horas',
        paymentTerms: '100% adelantado',
        description: 'Diagnóstico exhaustivo de cabeceras, SSL, versiones y exposición pública con informe técnico.',
        features: [
          'Diagnóstico externo no intrusivo (SSL, cabeceras, plugins visibles)',
          'Informe técnico ejecutivo en 48 horas con prioridades claras',
          'Detección de configuraciones riesgosas y malas prácticas',
          'Recomendaciones de mitigación paso a paso',
        ],
        guarantee: false,
      },
      {
        id: 'esencial',
        name: 'Esencial',
        price: 165,
        priceDisplay: 'S/ 165',
        deliveryTime: '3 a 5 días hábiles',
        paymentTerms: '100% adelantado',
        description: 'Correcciones de configuración (cabeceras, SSL, WordPress y plugins actualizados, accesos y contraseñas) + informe.',
        features: [
          'Todo lo incluido en la Auditoría',
          'Implementación de cabeceras de seguridad estrictas (HSTS, CSP, etc.)',
          'Actualización segura de CMS (WordPress), temas y plugins',
          'Endurecimiento de accesos administrativos y políticas de contraseñas',
          'Informe de cierre detallado con cambios ejecutados',
        ],
        guarantee: false,
      },
      {
        id: 'blindaje-total',
        name: 'Blindaje Total',
        price: 335,
        priceDisplay: 'S/ 335',
        deliveryTime: '5 a 7 días hábiles',
        paymentTerms: '50% al empezar y 50% al entregar',
        description: 'Todo lo anterior + re-medición técnica independiente. NO incluye limpieza de malware.',
        features: [
          'Todo lo incluido en el plan Esencial',
          'Configuración avanzada de WAF perimetral y bloqueo de ataques comunes',
          'Re-medición y verificación de nota tras implementación',
          'Soporte técnico directo durante el periodo de entrega',
          'Garantía: Si no mejoramos tu calificación (subir al menos un grado), te devolvemos el pago',
        ],
        guarantee: true,
        guaranteeText: 'Si no mejoramos tu calificación al menos un grado, te devolvemos el pago.',
      },
    ],
    incidentCleanup: {
      id: 'limpieza',
      name: 'Limpieza de Sitio Hackeado',
      priceFrom: 500,
      priceDisplay: 'Desde S/ 500',
      note: 'Tras diagnóstico previo de alcance y daños.',
      description: 'Desinfección de malware, eliminación de redirecciones no deseadas, puertas traseras (backdoors) y restauración limpia del servicio.',
    },
  },
} as const;
