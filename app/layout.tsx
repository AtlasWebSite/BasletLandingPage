import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F7F8FC",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "StudyFlow — Flashcards, mapas mentais e testes em um só lugar",
  description: "Transforme conteúdo em aprendizado que fica. Flashcards, mapas mentais e testes reunidos em uma experiência simples e visual para organizar seus estudos e acompanhar sua evolução.",
  metadataBase: new URL("https://use-studyflow.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "StudyFlow — Seu estudo, finalmente em fluxo",
    description: "Organize seus estudos e acompanhe sua evolução com flashcards, mapas mentais e testes em um só ambiente.",
    url: "https://use-studyflow.vercel.app",
    siteName: "StudyFlow",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyFlow — Flashcards, mapas mentais e testes",
    description: "Organize seus estudos e acompanhe sua evolução com flashcards, mapas mentais e testes em um só ambiente.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "StudyFlow",
    "operatingSystem": "Web, Mobile",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "BRL"
    },
    "description": "Plataforma de estudos com flashcards, mapas mentais, testes e acompanhamento de progresso."
  };

  return (
    <html lang="pt-BR" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased bg-background text-text-main min-h-screen overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}