import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import AiConsultantWidget from "@/components/AiConsultantWidget";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuronal Gravity | Soluciones de Negocio con Inteligencia Artificial & Ciberdefensa",
  description: "Diseñamos e implementamos agentes autónomos en WhatsApp 24/7, automatización operativa inteligente y ciberdefensa perimetral con DEFENSA TI.",
  metadataBase: new URL("https://neuronalgravity.com"),
  openGraph: {
    title: "Neuronal Gravity | Soluciones de Negocio con Inteligencia Artificial",
    description: "Multiplica tus ventas y reduce costos operativos con agentes de IA y ciberdefensa perimetral sin tocar tu infraestructura.",
    url: "https://neuronalgravity.com",
    siteName: "Neuronal Gravity",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neuronal Gravity | Soluciones de Negocio con IA",
    description: "Agentes autónomos de ventas en WhatsApp 24/7 y ciberdefensa perimetral para empresas.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#000000",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://neuronalgravity.com/#organization",
      "name": "Neuronal Gravity",
      "url": "https://neuronalgravity.com",
      "logo": "https://neuronalgravity.com/martin-castillo.png",
      "description": "Soluciones de Inteligencia Artificial Aplicada a Negocios, Automatización Operativa y Ciberdefensa Perimetral con DEFENSA TI.",
      "founder": {
        "@type": "Person",
        "name": "Martin Castillo",
        "jobTitle": "Consultor Principal & Fundador",
        "url": "https://www.tiktok.com/@k_martin_castillo96",
      },
      "sameAs": [
        "https://www.tiktok.com/@k_martin_castillo96",
        "https://github.com/martincastillo1996/security-score"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+51-987-010-380",
        "contactType": "customer service",
        "availableLanguage": ["Spanish", "English"]
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://neuronalgravity.com/#service",
      "name": "DEFENSA TI & AI Solutions",
      "url": "https://neuronalgravity.com/defensati",
      "provider": {
        "@id": "https://neuronalgravity.com/#organization"
      },
      "serviceType": "Cybersecurity and Artificial Intelligence Consulting",
      "areaServed": ["PE", "Latam", "Worldwide"]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-[#f5f5f7]">
        <I18nProvider>
          {children}
          <AiConsultantWidget />
          <CookieConsentBanner />
          <FloatingWhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}
