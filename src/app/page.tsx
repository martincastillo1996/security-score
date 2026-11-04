'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import NeuralBackground from '@/components/NeuralBackground';
import Apple3DGlobe from '@/components/Apple3DGlobe';
import LanguageSelector from '@/components/LanguageSelector';
import AiConsultantWidget from '@/components/AiConsultantWidget';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { useI18n } from '@/lib/i18n/I18nContext';
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Bot,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Code2,
  PhoneCall,
  Sparkles,
  BarChart3,
  FileCheck,
  Building2,
  ShoppingCart,
  Stethoscope,
  Truck,
  Users,
  Clock,
  Briefcase
} from 'lucide-react';

export default function NeuronalGravityHomePage() {
  const { language } = useI18n();
  const [selectedIndustry, setSelectedIndustry] = useState<number>(0);

  const content = {
    es: {
      nav: {
        solutions: 'Soluciones de Negocio',
        methodology: 'Cómo Trabajamos',
        industries: 'Casos por Industria',
        defensaTi: 'DEFENSA TI',
        about: 'Liderazgo',
        contactBtn: 'Cotizar Proyecto de IA',
      },
      hero: {
        badge: 'NEURONALGRAVITY.COM • INTELIGENCIA ARTIFICIAL APLICADA A NEGOCIOS',
        title1: 'Impulsa tu Empresa con',
        title2: 'Soluciones de Negocio con Inteligencia Artificial.',
        desc: 'Diseñamos e implementamos agentes autónomos, automatizaciones operativas inteligentes y ciberdefensa perimetral que multiplican las ventas, eliminan costos manuales y aceleran las decisiones estratégicas de tu negocio.',
        ctaPrimary: 'Agendar Asesoría de Negocio con IA',
        ctaSecondary: 'Ver Soluciones de Negocio',
        scannerCallout: '¿Buscas auditar la seguridad de tu página web?',
        scannerLinkText: 'Probar gratis DEFENSA TI →',
        stats: [
          { value: '+300%', label: 'Capacidad de Atención', desc: 'Agentes conversacionales 24/7 en WhatsApp y web' },
          { value: '-65%', label: 'Costos Operativos', desc: 'Automatización de tareas repetitivas y documentos' },
          { value: '< 30 Días', label: 'Tiempo a Producción', desc: 'De la idea a un sistema de IA funcionando en tu empresa' },
          { value: '100% ROI', label: 'Orientado a Resultados', desc: 'Soluciones con retorno financiero y métricas claras' },
        ],
      },
      solutions: {
        badge: 'Servicios & Capacidades',
        title: 'Soluciones de IA Diseñadas para Generar Rentabilidad',
        desc: 'No hacemos experimentos teóricos. Construimos herramientas prácticas de inteligencia artificial que se integran directamente a tus flujos de trabajo actuales.',
        items: [
          {
            icon: Bot,
            badge: 'Conversión & Ventas',
            title: 'Agentes Autónomos de Ventas y Atención 24/7',
            desc: 'Asistentes de IA integrados a WhatsApp, CRM y tu tienda online. Califican clientes potenciales, responden consultas complejas al instante, envían cotizaciones y cierran ventas a cualquier hora del día sin intervención humana.',
            bullets: [
              'Integración nativa con WhatsApp Business API, Instagram y páginas web',
              'Conexión a tu catálogo de productos, inventario en vivo y políticas de venta',
              'Derivación inteligente a asesores humanos solo cuando se requiere',
            ],
            color: 'from-blue-500/20 to-sky-500/20 border-sky-500/40 text-sky-400',
          },
          {
            icon: FileCheck,
            badge: 'Eficiencia Operativa',
            title: 'Procesamiento Inteligente de Documentos & Facturación',
            desc: 'Elimina el trabajo manual de digitar y conciliar papeles. Agentes de visión e IA leen, extraen y validan facturas, contratos legales, órdenes de compra y documentos de identidad directamente a tus bases de datos o ERP.',
            bullets: [
              'Extracción de datos no estructurados en segundos con 99.5% de precisión',
              'Validación automática contra normativas fiscales y listas de verificación',
              'Ahorro de cientos de horas de digitadores y personal administrativo',
            ],
            color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400',
          },
          {
            icon: BarChart3,
            badge: 'Decisiones Estratégicas',
            title: 'Analítica Predictiva & Dashboards Ejecutivos con IA',
            desc: 'Transforma tus datos dispersos en decisiones claras. Modelos de IA analizan tu historial de ventas para anticipar la demanda, predecir fuga de clientes y permitir consultas directas en lenguaje natural a los directores de la empresa.',
            bullets: [
              'Pregúntale a tus datos: "¿Cuáles fueron los productos más rentables este mes?"',
              'Predicción de inventario para evitar quiebres de stock o sobrecostos de almacén',
              'Detección temprana de clientes insatisfechos antes de que se vayan a la competencia',
            ],
            color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
          },
          {
            icon: ShieldCheck,
            badge: 'Confianza Digital & Transacciones',
            title: 'DEFENSA TI — Ciberseguridad Perimetral para Empresas',
            desc: 'Protegemos tu reputación y tus ventas online. Nuestro motor perimetral audita candados SSL, pasarelas de pago (Mercado Pago, Stripe, Niubiz) y previene clonaciones o ataques para que tu negocio opere con Grado A+ de confianza.',
            bullets: [
              'Auditoría no invasiva instantánea y sin tocar credenciales ni servidores',
              'Evita bloqueos de bancos y alertas rojas de "Sitio no seguro"',
              'Generación automática de órdenes de trabajo para tus programadores',
            ],
            action: { text: 'Abrir Escáner DEFENSA TI', href: '/scanner' },
            color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
          },
          {
            icon: Code2,
            badge: 'Desarrollo a Medida',
            title: 'Software e IA Personalizada para tu Industria',
            desc: 'Si tu empresa tiene procesos específicos o requiere una plataforma propietaria, desarrollamos software a medida integrando los modelos de lenguaje más avanzados (Google Gemini, OpenAI, Claude) bajo infraestructura en la nube escalable.',
            bullets: [
              'Arquitectura moderna con Next.js, APIs de alta velocidad y bases de datos seguras',
              'Modelos ajustados a la terminología y protocolos exclusivos de tu empresa',
              'Propiedad intelectual 100% de tu negocio, sin ataduras a plataformas de terceros',
            ],
            color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
          },
          {
            icon: Users,
            badge: 'Consultoría & Adopción',
            title: 'Consultoría de Transformación con IA & Capacitación',
            desc: 'Acompañamos a tu equipo directivo y operativo para identificar dónde la IA genera el mayor impacto financiero, capacitando a tus líderes para adoptar estas herramientas sin fricción ni curvas prolongadas de aprendizaje.',
            bullets: [
              'Auditoría de procesos internos para detectar cuellos de botella automatizables',
              'Diseño de hoja de ruta tecnológica con priorización por retorno de inversión',
              'Talleres prácticos para que tu personal use IA como un multiplicador de productividad',
            ],
            color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-400',
          },
        ],
      },
      methodology: {
        badge: 'Metodología Probada',
        title: 'Cómo Llevamos la IA a tu Negocio en 4 Pasos',
        desc: 'Un proceso estructurado, ágil y transparente centrado en maximizar el retorno de inversión desde el primer mes.',
        steps: [
          {
            num: '01',
            title: 'Diagnóstico de Oportunidad',
            desc: 'Analizamos tus procesos actuales, sistemas y cuellos de botella para cuantificar horas perdidas y definir el caso de uso con mayor impacto económico.',
          },
          {
            num: '02',
            title: 'Prototipo Rápido en 7 Días',
            desc: 'Construimos una prueba de concepto funcional con tus datos para validar la precisión, velocidad y aceptación antes de realizar una inversión mayor.',
          },
          {
            num: '03',
            title: 'Integración a tus Sistemas',
            desc: 'Conectamos el agente o modelo a tu WhatsApp, CRM, ERP o pasarela de pago existente de forma segura y sin interrumpir tus operaciones diarias.',
          },
          {
            num: '04',
            title: 'Despliegue & Monitoreo de ROI',
            desc: 'Lanzamos a producción con métricas en vivo. Medimos conversión, ahorro de tiempo y optimizamos continuamente el modelo para mantener Grado A+.',
          },
        ],
      },
      industries: {
        badge: 'Casos Reales por Sector',
        title: 'Impacto Comprobado en Diversas Industrias',
        desc: 'Conoce cómo empresas de diferentes sectores aplican nuestras soluciones de negocio con IA para liderar su mercado.',
        items: [
          {
            icon: ShoppingCart,
            name: 'Comercio & E-commerce',
            title: 'Ventas 24/7 y Blindaje Antifraude',
            desc: 'Asistentes de ventas que recomiendan productos, resuelven dudas sobre envíos y recuperan carritos abandonados por WhatsApp, combinados con la auditoría de DEFENSA TI para proteger transacciones.',
            result: '+42% en ventas nocturnas y fines de semana',
          },
          {
            icon: Building2,
            name: 'B2B & Servicios Corporativos',
            title: 'Calificación de Prospectos & Cotizaciones',
            desc: 'Agentes que dialogan con leads que llegan por campañas, evalúan el presupuesto y necesidades del cliente, y programan reuniones directamente en la agenda de tu equipo comercial.',
            result: 'Tiempo de respuesta a leads reducido de 4 horas a 15 segundos',
          },
          {
            icon: Stethoscope,
            name: 'Salud & Clínicas',
            title: 'Agendamiento Inteligente & Triaje',
            desc: 'Sistemas que gestionan citas de pacientes, envían recordatorios interactivos, reprograman turnos automáticamente y responden dudas sobre preparación para exámenes médicos.',
            result: '-70% en ausentismo a citas médicas programadas',
          },
          {
            icon: Truck,
            name: 'Logística & Distribución',
            title: 'Procesamiento de Guías & Soporte',
            desc: 'Lectura automática de guías de remisión mediante visión artificial y atención instantánea a clientes sobre el estado en vivo de sus despachos.',
            result: '80% de consultas de seguimiento resueltas sin operador humano',
          },
        ],
      },
      founder: {
        badge: 'Fundador & Consultor Principal',
        title: 'Martin Castillo',
        role: 'Arquitecto de Soluciones de Negocio con IA & Especialista en Ciberdefensa',
        desc: 'Fundador de Neuronal Gravity. Ayudo a dueños de negocios, directores y fundadores en Latinoamérica y el mundo a transformar procesos manuales lentos en sistemas inteligentes que operan 24/7 con alta rentabilidad y seguridad blindada.',
        quote: '"La inteligencia artificial no debe ser un adorno tecnológico ni un gasto inflado: debe ser una palanca directa que multiplique las utilidades de tu empresa y libere a tu equipo de tareas mecánicas."',
        whatsappCta: 'Consultar mi Caso por WhatsApp (+1 785 643-3991)',
        linkedinCta: 'Perfil en LinkedIn',
        githubCta: 'Repositorios Open Source en GitHub',
      },
      ctaFinal: {
        title: '¿Tienes un proceso en tu empresa que te quita tiempo y dinero?',
        desc: 'Cuéntanos qué desafío enfrenta tu negocio hoy. Te presentamos una propuesta de solución con IA práctica, viable y con retorno de inversión estimado en menos de 48 horas.',
        btnWhatsApp: 'Hablar con Martin Castillo por WhatsApp',
        btnDefensa: 'Probar el Escáner DEFENSA TI Gratis',
      },
      footer: {
        tagline: 'Neuronal Gravity • Soluciones de Negocio con Inteligencia Artificial & Ciberdefensa',
        copy: '© 2026 Neuronal Gravity (neuronalgravity.com). Todos los derechos reservados.',
        disclaimer: 'Las soluciones de IA se desarrollan a medida bajo acuerdos de confidencialidad y estándares rigurosos de protección de datos.',
      },
    },
    en: {
      nav: {
        solutions: 'AI Business Solutions',
        methodology: 'Our Process',
        industries: 'Industry Use Cases',
        defensaTi: 'DEFENSA TI',
        about: 'Leadership',
        contactBtn: 'Request AI Quote',
      },
      hero: {
        badge: 'NEURONALGRAVITY.COM • APPLIED AI FOR ENTERPRISE & BUSINESS',
        title1: 'Accelerate Your Company with',
        title2: 'Practical AI Solutions Built for Business Growth.',
        desc: 'We architect and deploy autonomous agents, intelligent workflow automation, and perimeter cyber defense that multiply sales conversions, slash manual operational overhead, and speed up strategic decisions.',
        ctaPrimary: 'Book an AI Business Consultation',
        ctaSecondary: 'Explore Business Solutions',
        scannerCallout: 'Looking to audit your website security perimeter?',
        scannerLinkText: 'Test DEFENSA TI for free →',
        stats: [
          { value: '+300%', label: 'Support & Sales Bandwidth', desc: '24/7 conversational agents across WhatsApp and web' },
          { value: '-65%', label: 'Operational Costs', desc: 'Automation of repetitive administrative and data workflows' },
          { value: '< 30 Days', label: 'Time to Production', desc: 'From initial discovery to a deployed, revenue-generating system' },
          { value: '100% ROI', label: 'Results-Oriented', desc: 'Engineered with transparent metrics and business payback' },
        ],
      },
      solutions: {
        badge: 'Services & Capabilities',
        title: 'AI Solutions Engineered to Drive Real Profitability',
        desc: 'We build pragmatic, production-grade artificial intelligence systems that plug directly into your current business workflows.',
        items: [
          {
            icon: Bot,
            badge: 'Conversion & Revenue',
            title: '24/7 Autonomous Sales & Support Agents',
            desc: 'AI agents connected to WhatsApp, CRM, and your online catalog. They qualify inbound leads, answer complex buyer queries instantly, send customized quotes, and close deals around the clock.',
            bullets: [
              'Native integration with WhatsApp Business API, Instagram, and web apps',
              'Connected to live product catalogs, pricing rules, and inventory',
              'Seamless human-in-the-loop handoff whenever specialized handling is required',
            ],
            color: 'from-blue-500/20 to-sky-500/20 border-sky-500/40 text-sky-400',
          },
          {
            icon: FileCheck,
            badge: 'Operational Efficiency',
            title: 'Intelligent Document & Invoice Processing',
            desc: 'Eliminate manual data entry. Multimodal vision and LLM agents parse, extract, and reconcile invoices, legal contracts, purchase orders, and ID documents directly into your ERP or database.',
            bullets: [
              'Unstructured data extraction in seconds with 99.5% accuracy',
              'Automated compliance checks against tax regulations and custom checklists',
              'Save hundreds of monthly administrative hours',
            ],
            color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400',
          },
          {
            icon: BarChart3,
            badge: 'Strategic Intelligence',
            title: 'Predictive Analytics & Executive AI Dashboards',
            desc: 'Turn fragmented spreadsheets into actionable strategic insights. AI models analyze sales history to anticipate customer churn, forecast demand, and allow natural-language executive queries.',
            bullets: [
              'Ask your business data: "Which product category drove the highest net margin this quarter?"',
              'Demand forecasting to prevent stockouts and inventory holding costs',
              'Early churn detection before high-value customers migrate to competitors',
            ],
            color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
          },
          {
            icon: ShieldCheck,
            badge: 'Digital Trust & Transactions',
            title: 'DEFENSA TI — Perimeter Cybersecurity for Digital Brands',
            desc: 'Shield your customer transactions and business reputation. Our non-intrusive perimeter engine audits SSL certificates, checkout gateways (Stripe, Mercado Pago), and guards against website cloning.',
            bullets: [
              'Instant non-invasive audit requiring zero server access or credentials',
              'Prevent red "Not Secure" browser warnings and checkout rejections',
              'Downloadable step-by-step engineering work orders for dev teams',
            ],
            action: { text: 'Launch DEFENSA TI Scanner', href: '/scanner' },
            color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
          },
          {
            icon: Code2,
            badge: 'Custom Engineering',
            title: 'Bespoke Software & Custom AI Development',
            desc: 'For proprietary enterprise workflows, we build bespoke platforms powered by frontier LLMs (Google Gemini, OpenAI, Claude) on hardened, scalable cloud infrastructure.',
            bullets: [
              'Modern stack with Next.js, high-speed APIs, and compliant relational databases',
              'Fine-tuned models tailored to your industry terminology and internal guidelines',
              '100% intellectual property ownership with zero vendor lock-in',
            ],
            color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
          },
          {
            icon: Users,
            badge: 'Adoption & Strategy',
            title: 'AI Transformation Advisory & Team Enablement',
            desc: 'We guide leadership and operating teams through practical AI adoption: identifying high-ROI use cases, eliminating friction, and training key personnel to multiply daily output.',
            bullets: [
              'Deep-dive process audit to pinpoint high-cost automatable bottlenecks',
              'Clear technological roadmap prioritized by financial return',
              'Hands-on workshops empowering staff to leverage AI as a force multiplier',
            ],
            color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-400',
          },
        ],
      },
      methodology: {
        badge: 'Battle-Tested Framework',
        title: 'How We Deploy AI Into Your Business in 4 Steps',
        desc: 'A structured, transparent roadmap focused on proving and delivering measurable ROI from month one.',
        steps: [
          {
            num: '01',
            title: 'Opportunity Audit',
            desc: 'We inspect your current workflows and software to quantify lost hours and isolate the single highest-value AI opportunity.',
          },
          {
            num: '02',
            title: '7-Day Working Prototype',
            desc: 'We build a functional proof-of-concept using your real workflow data to confirm accuracy, speed, and viability before major capital commitment.',
          },
          {
            num: '03',
            title: 'Seamless System Integration',
            desc: 'We safely hook the AI agent into your WhatsApp, CRM, ERP, or payment gateway without disrupting daily commercial operations.',
          },
          {
            num: '04',
            title: 'Rollout & ROI Tracking',
            desc: 'Live deployment with continuous performance tracking. We monitor conversion rate, hours saved, and continuously tune the models.',
          },
        ],
      },
      industries: {
        badge: 'Industry Verticals',
        title: 'Proven Business Impact Across Key Sectors',
        desc: 'Explore how forward-looking companies leverage our applied AI business solutions to pull ahead in their markets.',
        items: [
          {
            icon: ShoppingCart,
            name: 'Commerce & Retail',
            title: '24/7 Autonomous Sales & Anti-Fraud Shield',
            desc: 'AI sales reps that recommend items, answer shipping FAQs, and recover abandoned carts over WhatsApp, paired with DEFENSA TI transaction security.',
            result: '+42% in after-hours and weekend sales conversions',
          },
          {
            icon: Building2,
            name: 'B2B & Enterprise Services',
            title: 'Lead Qualification & Automated Quoting',
            desc: 'Conversational agents that engage inbound marketing leads, evaluate project budget and timeline, and book meetings directly into your sales team calendars.',
            result: 'Lead response latency reduced from 4 hours down to 15 seconds',
          },
          {
            icon: Stethoscope,
            name: 'Healthcare & Clinics',
            title: 'Smart Appointment Scheduling & Intake',
            desc: 'Automated booking and patient confirmation systems that reduce no-shows and handle routine pre-exam instructions.',
            result: '-70% reduction in missed clinical appointments',
          },
          {
            icon: Truck,
            name: 'Logistics & Supply Chain',
            title: 'Waybill Extraction & Real-Time Tracking',
            desc: 'Computer vision OCR for rapid receipt and manifest digitization with automated shipment milestone updates sent directly to customers.',
            result: '80% of routine shipment tracking inquiries handled autonomously',
          },
        ],
      },
      founder: {
        badge: 'Founder & Principal Consultant',
        title: 'Martin Castillo',
        role: 'AI Business Solutions Architect & Cybersecurity Specialist',
        desc: 'Founder of Neuronal Gravity. I partner with business owners, CTOs, and founders across the Americas and globally to transform cumbersome manual operations into intelligent, 24/7 automated engines with hardened security.',
        quote: '"Artificial intelligence should not be a decorative tech demo: it must be a direct profit driver that expands gross margins and frees talented people from repetitive friction."',
        whatsappCta: 'Discuss My Business Case on WhatsApp (+1 785 643-3991)',
        linkedinCta: 'LinkedIn Profile',
        githubCta: 'Open Source GitHub Projects',
      },
      ctaFinal: {
        title: 'Is there an operational bottleneck draining your team’s time and revenue?',
        desc: 'Tell us about the challenge your company is facing. We will deliver a pragmatic, high-ROI AI solution architecture in under 48 hours.',
        btnWhatsApp: 'Chat with Martin Castillo on WhatsApp',
        btnDefensa: 'Test DEFENSA TI Perimeter Audit for Free',
      },
      footer: {
        tagline: 'Neuronal Gravity • Applied AI Business Solutions & Cyber Defense',
        copy: '© 2026 Neuronal Gravity (neuronalgravity.com). All rights reserved.',
        disclaimer: 'Enterprise AI solutions are engineered under strict NDAs and rigorous data privacy standards.',
      },
    },
    pt: {
      nav: {
        solutions: 'Soluções de Negócio',
        methodology: 'Como Trabalhamos',
        industries: 'Casos por Setor',
        defensaTi: 'DEFENSA TI',
        about: 'Liderança',
        contactBtn: 'Solicitar Orçamento de IA',
      },
      hero: {
        badge: 'NEURONALGRAVITY.COM • INTELIGÊNCIA ARTIFICIAL APLICADA A NEGÓCIOS',
        title1: 'Impulsione sua Empresa com',
        title2: 'Soluções de Negócio com Inteligência Artificial.',
        desc: 'Projetamos e implementamos agentes autônomos, automações de processos e cibersegurança perimetral que multiplicam vendas, reduzem custos operacionais e aceleram decisões estratégicas.',
        ctaPrimary: 'Agendar Consultoria de IA para Negócios',
        ctaSecondary: 'Ver Soluções de Negócio',
        scannerCallout: 'Deseja auditar a segurança perimetral do seu site?',
        scannerLinkText: 'Testar DEFENSA TI grátis →',
        stats: [
          { value: '+300%', label: 'Capacidade de Atendimento', desc: 'Agentes 24/7 no WhatsApp e no site' },
          { value: '-65%', label: 'Custos Operacionais', desc: 'Automação de tarefas repetitivas e documentos' },
          { value: '< 30 Dias', label: 'Tempo até Produção', desc: 'Da ideia ao sistema de IA em operação' },
          { value: '100% ROI', label: 'Focado em Retorno', desc: 'Soluções com métricas de negócio e lucro' },
        ],
      },
      solutions: {
        badge: 'Serviços & Capacidades',
        title: 'Soluções de IA Feitas para Gerar Lucro Real',
        desc: 'Construímos ferramentas práticas de IA que se integram aos fluxos de trabalho da sua empresa.',
        items: [
          {
            icon: Bot,
            badge: 'Vendas & Conversão',
            title: 'Agentes Autônomos de Vendas e Atendimento 24/7',
            desc: 'Assistentes de IA integrados ao WhatsApp e CRM para qualificar leads, enviar propostas e fechar vendas 24 horas por dia.',
            bullets: [
              'Integração nativa com WhatsApp Business e Instagram',
              'Conectado ao catálogo de produtos e estoques em tempo real',
              'Transição suave para consultores humanos quando necessário',
            ],
            color: 'from-blue-500/20 to-sky-500/20 border-sky-500/40 text-sky-400',
          },
          {
            icon: FileCheck,
            badge: 'Eficiência Operacional',
            title: 'Processamento Inteligente de Documentos e Faturas',
            desc: 'Elimine digitação manual. Agentes de visão leem e validam notas fiscais e contratos diretamente no seu ERP.',
            bullets: [
              'Extração precisa de dados em segundos com 99.5% de acurácia',
              'Validação automática de conformidade',
              'Economia de centenas de horas administrativas',
            ],
            color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400',
          },
          {
            icon: BarChart3,
            badge: 'Inteligência Estratégica',
            title: 'Análise Preditiva e Dashboards Executivos de IA',
            desc: 'Previsão de demanda, detecção antecipada de churn de clientes e consultas diretas em linguagem natural.',
            bullets: [
              'Pergunte aos seus dados sobre margem e produtos mais vendidos',
              'Previsão de estoque para evitar rupturas',
              'Retenção inteligente de clientes em risco',
            ],
            color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
          },
          {
            icon: ShieldCheck,
            badge: 'Segurança & Transações',
            title: 'DEFENSA TI — Cibersegurança Perimetral para Empresas',
            desc: 'Blindagem de checkout, auditoria de certificados SSL e proteção contra clonagem de páginas e fraudes.',
            bullets: [
              'Diagnóstico não intrusivo sem tocar nos servidores',
              'Evita bloqueios em gateways de pagamento e telas vermelhas de alerta',
              'Ordens técnicas claras para a equipe de desenvolvimento',
            ],
            action: { text: 'Abrir Scanner DEFENSA TI', href: '/scanner' },
            color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
          },
          {
            icon: Code2,
            badge: 'Desenvolvimento Sob Medida',
            title: 'Software e IA Personalizada para sua Empresa',
            desc: 'Plataformas customizadas integrando modelos de linguagem avançados (Gemini, Claude, OpenAI) na nuvem.',
            bullets: [
              'Arquitetura veloz com Next.js e bancos de dados protegidos',
              'Modelos adaptados à linguagem e regras da sua empresa',
              'Propriedade intelectual 100% sua',
            ],
            color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
          },
          {
            icon: Users,
            badge: 'Consultoria & Adoção',
            title: 'Consultoria de Transformação com IA e Treinamento',
            desc: 'Capacitamos líderes e equipes operacionais para adotar a IA e multiplicar a produtividade diária.',
            bullets: [
              'Mapeamento de gargalos manuais caros',
              'Roteiro tecnológico com foco em retorno sobre o investimento',
              'Workshops práticos para uso imediato',
            ],
            color: 'from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-400',
          },
        ],
      },
      methodology: {
        badge: 'Metodologia Validada',
        title: 'Como Implementamos IA no seu Negócio em 4 Etapas',
        desc: 'Um processo rápido e transparente focado em gerar retorno financeiro desde o primeiro mês.',
        steps: [
          {
            num: '01',
            title: 'Diagnóstico de Oportunidade',
            desc: 'Identificamos os gargalos mais custosos e definimos o caso de uso de maior impacto financeiro.',
          },
          {
            num: '02',
            title: 'Protótipo em 7 Dias',
            desc: 'Construímos um piloto funcional com seus dados reais para validação rápida.',
          },
          {
            num: '03',
            title: 'Integração aos seus Sistemas',
            desc: 'Conectamos ao seu WhatsApp, CRM ou ERP de forma segura e sem parar a operação.',
          },
          {
            num: '04',
            title: 'Lançamento & Medição de ROI',
            desc: 'Entramos em produção com métricas claras de economia de tempo e aumento de receita.',
          },
        ],
      },
      industries: {
        badge: 'Setores Atendidos',
        title: 'Impacto Real em Diferentes Mercados',
        desc: 'Veja como empresas de vários ramos utilizam nossas soluções de IA para acelerar.',
        items: [
          {
            icon: ShoppingCart,
            name: 'Varejo & E-commerce',
            title: 'Vendas 24/7 e Blindagem Antifraude',
            desc: 'Assistentes de vendas pelo WhatsApp e proteção com DEFENSA TI.',
            result: '+42% em conversões fora do horário comercial',
          },
          {
            icon: Building2,
            name: 'Serviços B2B',
            title: 'Qualificação de Leads e Propostas Rápidas',
            desc: 'Qualificação imediata de leads e agendamento automático de reuniões.',
            result: 'Tempo de resposta reduzido de 4 horas para 15 segundos',
          },
          {
            icon: Stethoscope,
            name: 'Saúde & Clínicas',
            title: 'Agendamento e Confirmação de Consultas',
            desc: 'Redução drástica de faltas com lembretes interativos e triagem inteligente.',
            result: '-70% de absenteísmo em consultas médicas',
          },
          {
            icon: Truck,
            name: 'Logística',
            title: 'Processamento de Documentos e Rastreio',
            desc: 'Extração automática de notas e respostas instantâneas de status.',
            result: '80% de dúvidas resolvidas sem intervenção humana',
          },
        ],
      },
      founder: {
        badge: 'Fundador & Consultor',
        title: 'Martin Castillo',
        role: 'Arquiteto de Soluções de Negócio com IA & Especialista em Cibersegurança',
        desc: 'Fundador da Neuronal Gravity. Ajudo empresas a transformar processos lentos em sistemas automatizados inteligentes e seguros.',
        quote: '"A inteligência artificial deve ser uma alavanca direta para aumentar os lucros e liberar tempo das equipes."',
        whatsappCta: 'Falar pelo WhatsApp (+1 785 643-3991)',
        linkedinCta: 'Perfil no LinkedIn',
        githubCta: 'Projetos no GitHub',
      },
      ctaFinal: {
        title: 'Tem um processo na sua empresa que consome tempo e recursos?',
        desc: 'Conte-nos o seu desafio. Apresentamos uma proposta de solução com IA em menos de 48 horas.',
        btnWhatsApp: 'Conversar com Martin Castillo no WhatsApp',
        btnDefensa: 'Testar Scanner DEFENSA TI Grátis',
      },
      footer: {
        tagline: 'Neuronal Gravity • Soluções de Negócio com Inteligência Artificial & Ciberdefensa',
        copy: '© 2026 Neuronal Gravity (neuronalgravity.com). Todos os direitos reservados.',
        disclaimer: 'Soluções desenvolvidas sob estritos acordos de confidencialidade e segurança de dados.',
      },
    },
  }[language] || {
    // Fallback ES
    nav: {
      solutions: 'Soluciones de Negocio',
      methodology: 'Cómo Trabajamos',
      industries: 'Casos por Industria',
      defensaTi: 'DEFENSA TI',
      about: 'Liderazgo',
      contactBtn: 'Cotizar Proyecto de IA',
    },
    hero: {
      badge: 'NEURONALGRAVITY.COM • INTELIGENCIA ARTIFICIAL APLICADA A NEGOCIOS',
      title1: 'Impulsa tu Empresa con',
      title2: 'Soluciones de Negocio con Inteligencia Artificial.',
      desc: 'Diseñamos e implementamos agentes autónomos, automatizaciones operativas inteligentes y ciberdefensa perimetral que multiplican las ventas y reducen costos.',
      ctaPrimary: 'Agendar Asesoría de Negocio con IA',
      ctaSecondary: 'Ver Soluciones de Negocio',
      scannerCallout: '¿Buscas auditar la seguridad de tu página web?',
      scannerLinkText: 'Probar gratis DEFENSA TI →',
      stats: [
        { value: '+300%', label: 'Capacidad de Atención', desc: 'Agentes 24/7 en WhatsApp y web' },
        { value: '-65%', label: 'Costos Operativos', desc: 'Automatización de tareas repetitivas' },
        { value: '< 30 Días', label: 'Tiempo a Producción', desc: 'De la idea a un sistema funcionando' },
        { value: '100% ROI', label: 'Orientado a Resultados', desc: 'Soluciones con retorno medible' },
      ],
    },
    solutions: {
      badge: 'Servicios & Capacidades',
      title: 'Soluciones de IA Diseñadas para Generar Rentabilidad',
      desc: 'Herramientas prácticas que se integran a tus flujos de trabajo.',
      items: [],
    },
    methodology: {
      badge: 'Metodología',
      title: 'Cómo Llevamos la IA a tu Negocio en 4 Pasos',
      desc: 'Proceso ágil y transparente.',
      steps: [],
    },
    industries: {
      badge: 'Casos Reales',
      title: 'Impacto Comprobado en Diversas Industrias',
      desc: 'Soluciones aplicadas en diferentes sectores.',
      items: [],
    },
    founder: {
      badge: 'Fundador & Consultor',
      title: 'Martin Castillo',
      role: 'Arquitecto de Soluciones de Negocio con IA',
      desc: 'Fundador de Neuronal Gravity.',
      quote: '"La IA debe multiplicar las utilidades de tu empresa."',
      whatsappCta: 'Consultar por WhatsApp (+1 785 643-3991)',
      linkedinCta: 'LinkedIn',
      githubCta: 'GitHub',
    },
    ctaFinal: {
      title: '¿Tienes un proceso que te quita tiempo y dinero?',
      desc: 'Hablemos hoy sobre cómo automatizarlo con IA.',
      btnWhatsApp: 'Hablar por WhatsApp',
      btnDefensa: 'Probar DEFENSA TI',
    },
    footer: {
      tagline: 'Neuronal Gravity • Soluciones de Negocio con IA',
      copy: '© 2026 Neuronal Gravity',
      disclaimer: 'Soluciones bajo confidencialidad.',
    },
  };

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#f5f5f7] selection:bg-[#0071e3] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Fondo Interactivo Neuronal (+20% visibilidad de nodos) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-65">
        <NeuralBackground />
        <div className="absolute inset-0 bg-radial from-transparent via-[#000000]/35 to-[#000000]/75" />
      </div>

      {/* Iluminación Ambiental */}
      <div className="pointer-events-none fixed inset-0 z-0 flex justify-center">
        <div 
          className="absolute rounded-full bg-linear-to-b from-[#0071e3]/20 via-[#7928ca]/15 to-transparent"
          style={{ top: '-180px', height: '700px', width: '950px', filter: 'blur(170px)' }} 
        />
        <div 
          className="absolute rounded-full bg-[#38bdf8]/10"
          style={{ top: '800px', height: '550px', width: '750px', filter: 'blur(190px)' }} 
        />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Barra Superior con Notificación y Acceso Rápido a DEFENSA TI */}
        <div className="bg-linear-to-r from-[#0071e3]/20 via-[#38bdf8]/10 to-[#7928ca]/20 border-b border-white/10 py-2 px-4 text-center text-xs text-neutral-300">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
              {content.hero.scannerCallout}
            </span>
            <Link
              href="/scanner"
              className="font-bold text-[#38bdf8] hover:text-white underline decoration-[#38bdf8]/50 hover:decoration-white transition-colors"
            >
              {content.hero.scannerLinkText}
            </Link>
          </div>
        </div>

        {/* Barra de Navegación Glassmorphism */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#000000]/85 backdrop-blur-2xl transition-all">
          <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
            
            {/* Logo Neuronal Gravity */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative h-10 w-10 rounded-2xl bg-linear-to-br from-[#0071e3] via-[#7928ca] to-[#38bdf8] p-[1.5px] shadow-[0_0_20px_rgba(0,113,227,0.4)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all">
                <div className="h-full w-full rounded-[14px] bg-[#000000] flex items-center justify-center">
                  <Brain className="w-5 h-5 text-[#38bdf8] group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base tracking-tight text-white leading-none">
                    NEURONAL GRAVITY
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#38bdf8]">
                    AI BIZ
                  </span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  neuronalgravity.com
                </span>
              </div>
            </Link>

            {/* Menú de Navegación de Negocio */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-neutral-300">
              <a href="#soluciones" className="hover:text-white transition-colors duration-200">
                {content.nav.solutions}
              </a>
              <a href="#metodologia" className="hover:text-white transition-colors duration-200">
                {content.nav.methodology}
              </a>
              <a href="#industrias" className="hover:text-white transition-colors duration-200">
                {content.nav.industries}
              </a>
              <Link 
                href="/scanner" 
                className="flex items-center gap-1.5 text-[#38bdf8] hover:text-white transition-colors duration-200"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
                <span>{content.nav.defensaTi}</span>
              </Link>
              <a href="#liderazgo" className="hover:text-white transition-colors duration-200">
                {content.nav.about}
              </a>
            </nav>

            {/* Acciones */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20deseo%20agendar%20una%20reuni%C3%B3n%20para%20evaluar%20soluciones%20de%20IA%20para%20mi%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(16,185,129,0.35)] active:scale-95 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{content.nav.contactBtn}</span>
              </a>

              <LanguageSelector />
            </div>
          </div>
        </header>

        {/* HERO SECTION DE NEGOCIO */}
        <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24 space-y-32 flex-1 w-full">
          
          <section className="text-center space-y-8 max-w-4xl mx-auto pt-4 relative">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-blue-500/15 via-purple-500/15 to-emerald-500/15 border border-[#38bdf8]/40 text-[#38bdf8] text-xs font-bold tracking-wide shadow-[0_0_25px_rgba(56,189,248,0.25)]">
              <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] animate-pulse" />
              <span>{content.hero.badge}</span>
            </div>

            {/* Titular Principal */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-[-0.04em] text-white leading-[1.06]">
              {content.hero.title1}{' '}
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-[#38bdf8] via-[#818cf8] to-[#34d399]">
                {content.hero.title2}
              </span>
            </h1>

            {/* Bajada */}
            <p className="text-base sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl mx-auto">
              {content.hero.desc}
            </p>

            {/* Botones de Acción de Negocio */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20quiero%20agendar%20una%20asesor%C3%ADa%20de%20IA%20para%20mi%20negocio%20a%20trav%C3%A9s%20de%20neuronalgravity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-linear-to-r from-[#0071e3] to-[#38bdf8] hover:opacity-95 text-white font-bold text-sm shadow-[0_0_35px_rgba(0,113,227,0.45)] active:scale-98 transition-all"
              >
                <TrendingUp className="w-4 h-4" />
                <span>{content.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#soluciones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <Briefcase className="w-4 h-4 text-[#38bdf8]" />
                <span>{content.hero.ctaSecondary}</span>
              </a>
            </div>

            {/* Tarjeta rápida de DEFENSA TI en el Hero */}
            <div className="pt-6">
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-3.5 px-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl text-xs text-neutral-300">
                <div className="flex items-center gap-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                  <span>¿Tienes e-commerce o portal corporativo?</span>
                </div>
                <div className="h-4 w-px bg-white/10 hidden sm:block" />
                <Link
                  href="/scanner"
                  className="font-bold text-[#38bdf8] hover:text-white flex items-center gap-1 transition-colors"
                >
                  Auditar pasarela de pago y seguridad gratis
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>

          {/* MÉTRICAS DE IMPACTO Y ROI DE NEGOCIO */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.hero.stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-6 bg-linear-to-b from-white/[0.05] to-white/[0.01] border border-white/10 backdrop-blur-xl shadow-lg hover:border-[#38bdf8]/40 transition-all text-left group"
              >
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-white via-[#38bdf8] to-emerald-400 group-hover:scale-105 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="font-semibold text-sm text-white mt-2">
                  {stat.label}
                </div>
                <div className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  {stat.desc}
                </div>
              </div>
            ))}
          </section>

          {/* SOLUCIONES DE NEGOCIO CON IA (CORE CATALOG) */}
          <section id="soluciones" className="space-y-12">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-[#38bdf8] text-xs font-semibold">
                <Brain className="w-3.5 h-3.5" />
                <span>{content.solutions.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {content.solutions.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400">
                {content.solutions.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {content.solutions.items.map((sol, index) => {
                const IconComponent = sol.icon;
                return (
                  <div
                    key={index}
                    className="relative rounded-3xl p-7 bg-linear-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/25 shadow-xl flex flex-col justify-between space-y-6 transition-all group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className={`h-11 w-11 rounded-2xl bg-linear-to-br ${sol.color} border flex items-center justify-center shadow-inner`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-neutral-300">
                          {sol.badge}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white tracking-tight leading-snug">
                        {sol.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                        {sol.desc}
                      </p>

                      <div className="space-y-2 pt-2 border-t border-white/5">
                        {sol.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs text-neutral-400">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      {sol.action ? (
                        <Link
                          href={sol.action.href}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0071e3]/20 hover:bg-[#0071e3]/30 border border-[#0071e3]/40 text-[#38bdf8] font-semibold text-xs transition-all"
                        >
                          <ShieldCheck className="w-4 h-4" />
                          <span>{sol.action.text}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <a
                          href={`https://wa.me/17856433991?text=${encodeURIComponent(`Hola Martin, me interesa cotizar para mi empresa: ${sol.title}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs transition-all group-hover:border-[#38bdf8]/40"
                        >
                          <span>Consultar esta Solución</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* METODOLOGÍA DE 4 PASOS */}
          <section id="metodologia" className="space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-400 text-xs font-semibold">
                <Clock className="w-3.5 h-3.5" />
                <span>{content.methodology.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                {content.methodology.title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-400">
                {content.methodology.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.methodology.steps.map((st, i) => (
                <div
                  key={i}
                  className="relative rounded-3xl p-6 bg-linear-to-b from-white/[0.04] to-transparent border border-white/10 space-y-4 text-left"
                >
                  <div className="text-3xl font-black font-mono text-[#38bdf8]/60">
                    {st.num}
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {st.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CASOS DE USO POR INDUSTRIA */}
          <section id="industrias" className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#0c1220] via-[#070b14] to-[#020408] border border-white/10 space-y-10">
            <div className="text-left space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[#38bdf8] text-xs font-semibold">
                <Zap className="w-3.5 h-3.5" />
                <span>{content.industries.badge}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {content.industries.title}
              </h2>
              <p className="text-sm text-neutral-300 max-w-2xl">
                {content.industries.desc}
              </p>
            </div>

            {/* Pestañas de Industria */}
            <div className="flex flex-wrap gap-2.5 border-b border-white/10 pb-4">
              {content.industries.items.map((ind, idx) => {
                const IndIcon = ind.icon;
                const isActive = selectedIndustry === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedIndustry(idx)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#0071e3] text-white shadow-[0_0_15px_rgba(0,113,227,0.5)]'
                        : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IndIcon className="w-4 h-4" />
                    <span>{ind.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Contenido de la Industria Seleccionada */}
            {content.industries.items[selectedIndustry] && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-2">
                <div className="md:col-span-8 space-y-4 text-left">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#38bdf8]">
                    {content.industries.items[selectedIndustry].name}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {content.industries.items[selectedIndustry].title}
                  </h3>
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {content.industries.items[selectedIndustry].desc}
                  </p>
                </div>

                <div className="md:col-span-4 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-left space-y-2">
                  <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Impacto Estimado</span>
                  </div>
                  <div className="text-lg sm:text-xl font-extrabold text-white">
                    {content.industries.items[selectedIndustry].result}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* GLOBO 3D Y RED GLOBAL DE INFRAESTRUCTURA DE IA */}
          <section className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#080d1a] via-[#05070e] to-[#010204] border border-[#0071e3]/30 overflow-hidden space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-[#38bdf8] text-xs font-semibold">
                  <Brain className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Infraestructura Segura de IA en la Nube</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Despliegues con Baja Latencia y Soberanía de Datos
                </h2>

                <p className="text-sm text-neutral-300 leading-relaxed">
                  Tus agentes y modelos se ejecutan en servidores perimetrales de alta velocidad con cifrado TLS 1.3 de extremo a extremo, cumpliendo con estrictas directivas de confidencialidad para proteger la información confidencial de tu empresa y tus clientes.
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300">
                    <div className="font-bold text-white">Cifrado Militar</div>
                    <div className="text-neutral-400 text-[11px] mt-0.5">TLS 1.3 & Zero-Data-Leak</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-neutral-300">
                    <div className="font-bold text-white">Edge Latency</div>
                    <div className="text-neutral-400 text-[11px] mt-0.5">&lt; 30ms en Latam & US</div>
                  </div>
                </div>
              </div>

              {/* Globo 3D Cobe */}
              <div className="lg:col-span-6 flex justify-center items-center relative">
                <div className="relative w-full max-w-[420px] aspect-square rounded-full flex items-center justify-center">
                  <Apple3DGlobe lat={-12.0464} lon={-77.0428} />
                </div>
              </div>
            </div>
          </section>

          {/* LIDERAZGO & CONSULTOR PRINCIPAL */}
          <section id="liderazgo" className="relative rounded-3xl p-8 sm:p-12 bg-linear-to-b from-[#0a0f1d] via-[#05070f] to-[#000000] border border-white/10 space-y-8 text-left">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/20 text-[#38bdf8] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{content.founder.badge}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {content.founder.title}
              </h2>
              <div className="text-sm font-semibold text-[#38bdf8]">
                {content.founder.role}
              </div>

              <p className="text-sm sm:text-base text-neutral-300 max-w-3xl leading-relaxed">
                {content.founder.desc}
              </p>
            </div>

            <blockquote className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border-l-4 border-emerald-400 border-y border-r border-white/5 text-sm sm:text-base italic text-neutral-300">
              {content.founder.quote}
            </blockquote>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20deseo%20agendar%20una%20reuni%C3%B3n%20para%20evaluar%20soluciones%20de%20IA%20para%20mi%20empresa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-semibold text-xs sm:text-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{content.founder.whatsappCta}</span>
              </a>

              <a
                href="https://www.linkedin.com/in/karol-martin-castillo-rojas-17a496168/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0077b5]/15 hover:bg-[#0077b5]/25 border border-[#0077b5]/40 text-[#38bdf8] font-semibold text-xs sm:text-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{content.founder.linkedinCta}</span>
              </a>

              <a
                href="https://github.com/martincastillo1996/security-score"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>{content.founder.githubCta}</span>
              </a>
            </div>
          </section>

          {/* CALL TO ACTION FINAL DE NEGOCIO */}
          <section className="text-center space-y-6 py-12 rounded-3xl bg-linear-to-b from-[#0071e3]/20 via-[#7928ca]/10 to-transparent border border-white/10 p-8 sm:p-12">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto">
              {content.ctaFinal.title}
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 max-w-xl mx-auto leading-relaxed">
              {content.ctaFinal.desc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/17856433991?text=Hola%20Martin,%20quiero%20cotizar%20una%20soluci%C3%B3n%20de%20IA%20para%20mi%20empresa%20a%20trav%C3%A9s%20de%20neuronalgravity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-white font-bold text-sm sm:text-base shadow-[0_0_40px_rgba(16,185,129,0.45)] transition-all"
              >
                <MessageSquare className="w-5 h-5" />
                <span>{content.ctaFinal.btnWhatsApp}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                href="/scanner"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                <span>{content.ctaFinal.btnDefensa}</span>
              </Link>
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="border-t border-white/10 bg-[#000000] py-12 mt-20 relative z-10 text-neutral-400 text-xs">
          <div className="max-w-6xl mx-auto px-6 space-y-8">
            
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-linear-to-br from-[#0071e3] to-[#7928ca] p-[1px]">
                  <div className="h-full w-full rounded-[11px] bg-black flex items-center justify-center">
                    <Brain className="w-4 h-4 text-[#38bdf8]" />
                  </div>
                </div>
                <div>
                  <span className="font-bold text-white text-sm">NEURONAL GRAVITY</span>
                  <p className="text-[11px] text-neutral-400">neuronalgravity.com</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-400">
                <a href="#soluciones" className="hover:text-white transition-colors">Soluciones de Negocio</a>
                <a href="#metodologia" className="hover:text-white transition-colors">Metodología</a>
                <a href="#industrias" className="hover:text-white transition-colors">Casos por Industria</a>
                <Link href="/scanner" className="hover:text-white transition-colors">DEFENSA TI</Link>
                <a href="https://wa.me/17856433991" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WhatsApp Directo</a>
              </div>
            </div>

            <div className="space-y-2 text-center max-w-3xl mx-auto">
              <p className="font-medium text-white">
                {content.footer.copy}
              </p>
              <p className="text-[11px] text-neutral-400">
                {content.footer.tagline} &bull; Liderado por Martin Castillo
              </p>
              <p className="text-[10px] text-neutral-500 leading-relaxed pt-2">
                {content.footer.disclaimer}
              </p>
            </div>
          </div>
        </footer>

        {/* Asistente Flotante de IA de Neuronal Gravity */}
        <AiConsultantWidget />

        {/* Botón Flotante de WhatsApp para Contacto Directo */}
        <FloatingWhatsAppButton />

      </div>
    </div>
  );
}
