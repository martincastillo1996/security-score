import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";
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
  title: "DEFENSA TI | Auditoría y Blindaje de Seguridad Web para Negocios",
  description: "Auditamos la seguridad de tu página web y corregimos cada punto débil para proteger tus ventas y clientes. Diagnóstico independiente, blindaje técnico y garantía por escrito.",
  metadataBase: new URL("https://neuronalgravity.com"),
  openGraph: {
    title: "DEFENSA TI | Blindaje y Seguridad Web para Negocios",
    description: "Auditamos la seguridad de tu página web y corregimos cada punto débil. Auditoría desde S/ 65 y Blindaje Total con garantía de mejora por escrito.",
    url: "https://neuronalgravity.com",
    siteName: "DEFENSA TI • Neuronal Gravity",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEFENSA TI | Blindaje y Seguridad Web para Negocios",
    description: "Auditoría de seguridad y blindaje técnico para sitios web comerciales. Garantía de mejora por escrito.",
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
      "name": "DEFENSA TI (Neuronal Gravity)",
      "url": "https://neuronalgravity.com",
      "logo": "https://neuronalgravity.com/martin-castillo.png",
      "description": "Auditoría técnica independiente y blindaje de seguridad para sitios web de negocios en Perú.",
      "founder": {
        "@type": "Person",
        "name": "Martin Castillo",
        "jobTitle": "Especialista en Seguridad Web & Fundador",
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
        "availableLanguage": ["Spanish"]
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://neuronalgravity.com/#service",
      "name": "DEFENSA TI",
      "url": "https://neuronalgravity.com",
      "provider": {
        "@id": "https://neuronalgravity.com/#organization"
      },
      "serviceType": "Auditoría de Seguridad Web y Blindaje Técnico",
      "areaServed": ["PE"]
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
          <CookieConsentBanner />
          <FloatingWhatsAppButton />
        </I18nProvider>
      </body>
    </html>
  );
}
