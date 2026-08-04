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
  title: "StudyFlow — Dobre o seu desempenho em 14 dias",
  description:
    "Organize seus estudos com flashcards, mapas mentais, testes e acompanhamento de progresso em um único ambiente.",
  metadataBase: new URL("https://use-studyflow.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Dobre o seu desempenho em 14 dias com StudyFlow",
    description:
      "Flashcards, mapas mentais, testes e acompanhamento de progresso em um único ambiente de estudos.",
    url: "https://use-studyflow.vercel.app",
    siteName: "StudyFlow",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dobre o seu desempenho em 14 dias com StudyFlow",
    description:
      "Organize seus estudos com flashcards, mapas mentais, testes e acompanhamento de progresso.",
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
    name: "StudyFlow",
    url: "https://use-studyflow.vercel.app",
    operatingSystem: "Web, Mobile",
    applicationCategory: "EducationalApplication",
    offers: {
      "@type": "Offer",
      price: "11.90",
      priceCurrency: "BRL",
      url: "https://app-usestudyflow.vercel.app/",
      availability: "https://schema.org/InStock",
    },
    description:
      "Plataforma de estudos com flashcards, mapas mentais, testes e acompanhamento de progresso.",
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
