import type { Metadata } from "next";
import { Noto_Serif, Manrope, Mulish } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "HB Imports MX | Importador de Vinos en México - España, Argentina, USA",
  description: "HB Imports MX: importador y distribuidor oficial de vinos premium en México. Bodegas de Rioja, Ribera del Duero, Mendoza, California y más. Red nacional de distribuidores.",
  openGraph: {
    images: [
      {
        url: "https://hbimports.mx/og-white.jpg",
        width: 1200,
        height: 630,
        alt: "HB Imports México",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://hbimports.mx/og-white.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      translate="no"
      className={`light ${notoSerif.variable} ${manrope.variable} ${mulish.variable} antialiased`}
    >
      <head>
        <meta name="google" content="notranslate" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "HB Imports MX",
              "alternateName": "HB Imports",
              "url": "https://hbimports.mx",
              "logo": "https://hbimports.mx/logo.png",
              "description": "Importador y distribuidor de vinos premium en México",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MX"
              },
              "sameAs": [
                "URL_de_tu_Instagram",
                "URL_de_tu_Facebook",
                "URL_de_tu_LinkedIn"
              ]
            })
          }}
        />
      </head>
      <body className="font-body bg-background text-on-surface selection:bg-primary/20 selection:text-primary min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
