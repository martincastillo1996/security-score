'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'pt';

export interface Translations {
  nav: {
    pricing: string;
    architecture: string;
    realCases: string;
    engine: string;
  };
  hero: {
    badge: string;
    title1: string;
    title2: string;
    desc: string;
    placeholder: string;
    btnAudit: string;
    btnAnalyzing: string;
    samplePrompt: string;
  };
  howItWorks: {
    badge: string;
    title: string;
    freeTag: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    footerAlert: string;
    owaspTag: string;
  };
  reportCard: {
    targetAnalyzed: string;
    printBtn: string;
    shareBtn: string;
    copiedBtn: string;
    businessTab: string;
    techTab: string;
  };
  casesModal: {
    triggerBtn: string;
    badge: string;
    title: string;
    subtitle: string;
    chooseCountry: string;
    closeBtn: string;
  };
  pricing: {
    badge: string;
    title: string;
    desc: string;
    plan1Name: string;
    plan1Tag: string;
    plan1Desc: string;
    plan1Cta: string;
    plan2Name: string;
    plan2Tag: string;
    plan2Desc: string;
    plan2Cta: string;
    plan3Name: string;
    plan3Tag: string;
    plan3Desc: string;
    plan3Cta: string;
    guarantee: string;
    coordination: string;
  };
  donation: {
    button: string;
    title: string;
    desc: string;
  };
  aiBot: {
    title: string;
    status: string;
    consultBtn: string;
    faqTitle: string;
    optDirectWhatsApp: string;
    inputPlaceholder: string;
    legal: string;
  };
}

const translations: Record<Language, Translations> = {
  es: {
    nav: {
      pricing: 'Planes & Tarifas',
      architecture: 'Arquitectura',
      realCases: 'Casos Reales',
      engine: 'OWASP Core',
    },
    hero: {
      badge: 'Security Score Pro • Zero-Downtime Socket Audit',
      title1: 'Auditoría Perimetral.',
      title2: 'Defensiva y Precisa.',
      desc: 'Análisis determinista no intrusivo de cabeceras de transporte HTTP, certificados SSL/TLS, exposición de sockets TCP y parches generados por IA.',
      placeholder: 'https://tudominio.com',
      btnAudit: 'Auditar',
      btnAnalyzing: 'Analizando...',
      samplePrompt: '¿Quieres probar?',
    },
    howItWorks: {
      badge: '¿Qué es y cómo funciona DEFENSA TI?',
      title: 'Protección perimetral automática para comercios y páginas web',
      freeTag: '100% Gratuito • Sin instalación',
      step1Title: 'Escribe tu página web',
      step1Desc: 'Ingresa tu dominio (ejemplo: tudominio.com). No requerimos claves ni accesos a tus servidores.',
      step2Title: 'Diagnóstico en 1 segundo',
      step2Desc: 'Analizamos candados SSL, directivas anti-clonación y puertos de datos de forma pasiva y segura.',
      step3Title: 'Asegura ventas y cobros',
      step3Desc: 'Recibe la orden de trabajo para tu programador o solicita el blindaje en Cloudflare para Grado A+.',
      footerAlert: 'Evita rechazos en Mercado Pago, Niubiz, Stripe y pantallas rojas de "Sitio no seguro".',
      owaspTag: 'Resultados certificados bajo estándares OWASP',
    },
    reportCard: {
      targetAnalyzed: 'Objetivo Analizado',
      printBtn: 'Descargar Dictamen PDF',
      shareBtn: 'Compartir Auditoría',
      copiedBtn: '¡Enlace Copiado!',
      businessTab: 'Vista de Negocio (Directores / Dueños)',
      techTab: 'Vista Técnica (SysAdmin / Dev)',
    },
    casesModal: {
      triggerBtn: 'Casos reales: Cómo clonan páginas y estafan a negocios en Latam',
      badge: 'Reportes Reales Documentados • Actualizado 2026',
      title: 'Casos de verdad en negocios de la región (Últimos meses)',
      subtitle: 'Mira cómo operan los atacantes y cómo las empresas resolvieron el problema de inmediato.',
      chooseCountry: 'Selecciona tu país para ver estadísticas e incidentes reales:',
      closeBtn: 'Cerrar y Revisar mi Web',
    },
    pricing: {
      badge: 'Tarifas Transparentes • Puesta a Punto Express',
      title: 'Planes accesibles para dejar tu sitio en Grado A+',
      desc: 'Precios fijos sin sorpresas. Cobro en Soles para Perú (Yape / Plin / BCP) y en USD para Sudamérica y el mundo (Tarjeta / PayPal / Transferencia bancaria local).',
      plan1Name: 'Reporte Ejecutivo',
      plan1Tag: 'Para tu programador',
      plan1Desc: 'Dictamen técnico formal y orden de trabajo para que tu equipo o programador aplique las correcciones.',
      plan1Cta: 'Solicitar Reporte',
      plan2Name: 'Blindaje Express A+',
      plan2Tag: 'El más solicitado en Latam',
      plan2Desc: 'Hacemos todo por ti. Dejamos tu sitio en Grado A+ sin tocar el código interno de tu página.',
      plan2Cta: 'Quiero Blindar mi Web',
      plan3Name: 'Blindaje & Pasarelas',
      plan3Tag: 'E-commerce & Empresas',
      plan3Desc: 'Para tiendas y empresas con pasarelas activas (Mercado Pago, Niubiz, Stripe) que buscan cero rechazos.',
      plan3Cta: 'Contratar Plan E-commerce',
      guarantee: 'Garantía: Si no sube a Grado A+, no pagas nada',
      coordination: 'Coordinación directa por WhatsApp personal',
    },
    donation: {
      button: 'Apoyar (Donar)',
      title: 'Invítale un café a Martín ☕',
      desc: 'DEFENSA TI es una herramienta gratuita para proteger negocios en Latam. Tu apoyo ayuda a mantener los servidores y motores de IA activos.',
    },
    aiBot: {
      title: 'Neuronal Gravity AI',
      status: 'Asesor Estratégico de IA • Online',
      consultBtn: 'Consultar con',
      faqTitle: 'Preguntas frecuentes sobre soluciones de IA:',
      optDirectWhatsApp: 'No quiero escribir, prefiero coordinar directo por WhatsApp',
      inputPlaceholder: 'Pregúntale a Neuronal Gravity AI...',
      legal: 'Asesoría estratégica en inteligencia artificial y ciberseguridad.',
    },
  },
  en: {
    nav: {
      pricing: 'Plans & Pricing',
      architecture: 'Architecture',
      realCases: 'Real Incidents',
      engine: 'OWASP Core',
    },
    hero: {
      badge: 'Security Score Pro • Zero-Downtime Socket Audit',
      title1: 'Perimeter Audit.',
      title2: 'Defensive & Precise.',
      desc: 'Non-intrusive deterministic analysis of HTTP transport headers, SSL/TLS certificates, TCP socket exposure, and AI-assisted remediation.',
      placeholder: 'https://yourdomain.com',
      btnAudit: 'Audit Now',
      btnAnalyzing: 'Analyzing...',
      samplePrompt: 'Want to try a demo?',
    },
    howItWorks: {
      badge: 'What is DEFENSA TI and how does it work?',
      title: 'Automated perimeter protection for web businesses & stores',
      freeTag: '100% Free • No installation needed',
      step1Title: 'Enter your website',
      step1Desc: 'Type your domain (e.g., yourdomain.com). No credentials or server access required.',
      step2Title: 'Diagnostic in 1 second',
      step2Desc: 'We evaluate SSL locks, anti-cloning directives, and exposed ports passively and safely.',
      step3Title: 'Secure sales & checkout',
      step3Desc: 'Get a work order for your developer or request Cloudflare hardening to achieve Grade A+.',
      footerAlert: 'Prevent transaction declines on Stripe/PayPal and browser "Not Secure" red warnings.',
      owaspTag: 'Certified results following OWASP compliance',
    },
    reportCard: {
      targetAnalyzed: 'Analyzed Target',
      printBtn: 'Download PDF Report',
      shareBtn: 'Share Audit',
      copiedBtn: 'Link Copied!',
      businessTab: 'Business View (Executive / Owner)',
      techTab: 'Technical View (SysAdmin / Dev)',
    },
    casesModal: {
      triggerBtn: 'Real cases: How websites are cloned & businesses scammed',
      badge: 'Documented Real Incidents • Updated 2026',
      title: 'True cases across commercial businesses (Recent months)',
      subtitle: 'See how attackers operate and how businesses remediated issues immediately.',
      chooseCountry: 'Select a country to review real stats and incidents:',
      closeBtn: 'Close & Audit My Website',
    },
    pricing: {
      badge: 'Transparent Pricing • Express Hardening',
      title: 'Accessible plans to bring your website to Grade A+',
      desc: 'Fixed pricing with zero surprises. Payments in USD globally (Credit Card / PayPal / Bank Transfer) and Soles for Peru.',
      plan1Name: 'Executive Report',
      plan1Tag: 'For your developer',
      plan1Desc: 'Official forensic technical brief and work order for your internal developer to apply.',
      plan1Cta: 'Get Executive Report',
      plan2Name: 'Express A+ Hardening',
      plan2Tag: 'Most requested',
      plan2Desc: 'We do everything for you. We elevate your website to Grade A+ without touching internal code.',
      plan2Cta: 'Harden My Website',
      plan3Name: 'Shield & Payment Gateways',
      plan3Tag: 'E-commerce & Enterprise',
      plan3Desc: 'For businesses with active payment gateways (Stripe, Mercado Pago) aiming for zero fraud flags.',
      plan3Cta: 'Get E-commerce Shield',
      guarantee: 'Guarantee: If your website does not hit Grade A+, you pay nothing',
      coordination: 'Direct coordination via personal WhatsApp',
    },
    donation: {
      button: 'Support (Donate)',
      title: 'Buy Martin a Coffee ☕',
      desc: 'DEFENSA TI is a free tool to protect digital businesses. Your support keeps servers and AI inference engines online.',
    },
    aiBot: {
      title: 'Neuronal Gravity AI',
      status: 'AI Business Advisor • Online',
      consultBtn: 'Consult with',
      faqTitle: 'Frequently Asked Questions:',
      optDirectWhatsApp: 'I prefer not to type, connect directly via WhatsApp',
      inputPlaceholder: 'Ask Neuronal Gravity AI anything...',
      legal: 'Strategic advice on AI business solutions and cybersecurity.',
    },
  },
  pt: {
    nav: {
      pricing: 'Planos & Tarifas',
      architecture: 'Arquitetura',
      realCases: 'Casos Reais',
      engine: 'OWASP Core',
    },
    hero: {
      badge: 'Security Score Pro • Auditoria de Sockets Sem Parada',
      title1: 'Auditoria Perimetral.',
      title2: 'Defensiva e Precisa.',
      desc: 'Análise determinística não intrusiva de cabeçalhos HTTP, certificados SSL/TLS, portas TCP e remediações geradas por IA.',
      placeholder: 'https://seusite.com',
      btnAudit: 'Auditar',
      btnAnalyzing: 'Analisando...',
      samplePrompt: 'Quer testar um exemplo?',
    },
    howItWorks: {
      badge: 'O que é e como funciona o DEFENSA TI?',
      title: 'Proteção perimetral automática para comércios e sites',
      freeTag: '100% Gratuito • Sem instalação',
      step1Title: 'Digite o endereço do seu site',
      step1Desc: 'Insira o seu domínio (exemplo: seusite.com). Não solicitamos senhas nem acessos ao servidor.',
      step2Title: 'Diagnóstico em 1 segundo',
      step2Desc: 'Analisamos certificados SSL, regras anti-clonagem e portas de dados de forma passiva e segura.',
      step3Title: 'Proteja vendas e pagamentos',
      step3Desc: 'Receba a ordem técnica para o programador ou solicite blindagem via Cloudflare para Nota A+.',
      footerAlert: 'Evite recusas no Stripe, Mercado Pago e avisos vermelhos de "Site Não Seguro".',
      owaspTag: 'Resultados certificados sob as diretrizes OWASP',
    },
    reportCard: {
      targetAnalyzed: 'Alvo Analisado',
      printBtn: 'Baixar Relatório PDF',
      shareBtn: 'Compartilhar Auditoria',
      copiedBtn: 'Link Copiado!',
      businessTab: 'Visão de Negócios (Diretoria / Donos)',
      techTab: 'Visão Técnica (SysAdmin / Dev)',
    },
    casesModal: {
      triggerBtn: 'Casos reais: Como clonam sites e fraudam empresas na América Latina',
      badge: 'Incidentes Reais Documentados • Atualizado 2026',
      title: 'Casos verídicos em comércios da região (Últimos meses)',
      subtitle: 'Veja como os invasores operam e como as empresas resolveram as falhas imediatamente.',
      chooseCountry: 'Escolha um país para ver estatísticas e incidentes reais:',
      closeBtn: 'Fechar e Auditar Meu Site',
    },
    pricing: {
      badge: 'Preços Transparentes • Blindagem Express',
      title: 'Planos acessíveis para elevar seu site à Nota A+',
      desc: 'Preços fixos sem surpresas. Cobrança em Dólares (USD) para todo o mundo ou Soles para o Peru.',
      plan1Name: 'Relatório Executivo',
      plan1Tag: 'Para o seu programador',
      plan1Desc: 'Laudo técnico forense e lista de tarefas para sua equipe aplicar as correções.',
      plan1Cta: 'Solicitar Relatório',
      plan2Name: 'Blindagem Express A+',
      plan2Tag: 'Mais solicitado',
      plan2Desc: 'Fazemos tudo por você. Deixamos seu site em Grau A+ sem alterar o código interno.',
      plan2Cta: 'Quero Blindar Meu Site',
      plan3Name: 'Blindagem & Gateways',
      plan3Tag: 'E-commerce & Empresas',
      plan3Desc: 'Para lojas com gateways de pagamento (Mercado Pago, Stripe) que buscam zero fraudes.',
      plan3Cta: 'Contratar Plano E-commerce',
      guarantee: 'Garantia: Se o site não alcançar Grau A+, você não paga nada',
      coordination: 'Atendimento direto via WhatsApp pessoal',
    },
    donation: {
      button: 'Apoiar (Doar)',
      title: 'Pague um café para o Martín ☕',
      desc: 'DEFENSA TI é uma ferramenta gratuita para proteger negócios. Sua doação mantém servidores e motores de IA ativos.',
    },
    aiBot: {
      title: 'Neuronal Gravity AI',
      status: 'Consultor Estratégico de IA • Online',
      consultBtn: 'Consultar com',
      faqTitle: 'Perguntas frequentes:',
      optDirectWhatsApp: 'Não quero digitar, prefiro coordenar direto pelo WhatsApp',
      inputPlaceholder: 'Pergunte ao Neuronal Gravity AI...',
      legal: 'Assessoria estratégica em inteligência artificial e ciberdefesa.',
    },
  },
};

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextType>({
  language: 'es',
  setLanguage: () => {},
  t: translations.es,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('es');

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const saved = localStorage.getItem('defensati_lang') as Language;
        if (saved && ['es', 'en', 'pt'].includes(saved)) {
          setLanguageState(saved);
          return;
        }
        const browserLang = navigator.language?.toLowerCase() || '';
        if (browserLang.startsWith('en')) {
          setLanguageState('en');
        } else if (browserLang.startsWith('pt')) {
          setLanguageState('pt');
        } else {
          setLanguageState('es');
        }
      } catch {
        // Fallback a español
      }
    });
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('defensati_lang', lang);
    } catch {
      // Ignorar
    }
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
