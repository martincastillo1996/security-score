import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nContext";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import DonationModal from "@/components/DonationModal";
import AiConsultantWidget from "@/components/AiConsultantWidget";

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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col bg-black text-[#f5f5f7]">
        <I18nProvider>
          {children}
          <AiConsultantWidget />
          <DonationModal />
          <CookieConsentBanner />
        </I18nProvider>
      </body>
    </html>
  );
}
