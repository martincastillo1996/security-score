import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Neuronal Gravity | Applied AI, Cyber Defense & Open Source Ecosystem",
  description: "Ecosistema matriz de tecnología avanzada: Auditoría perimetral y ciberseguridad (DEFENSA TI), Inteligencia Artificial Aplicada e infraestructura Open Source.",
  metadataBase: new URL("https://neuronalgravity.com"),
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
        </I18nProvider>
      </body>
    </html>
  );
}
