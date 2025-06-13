import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/seo-config";
import Analytics from "@/components/Analytics";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Marketing Digital & IA en Colombia`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.creator }],
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@techflowai",
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "tu-codigo-de-verificacion-google", // Reemplazar con tu código real
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CO" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1991EB" />
        <meta name="geo.region" content="CO-ANT" />
        <meta name="geo.placename" content="Medellín" />
        <meta name="geo.position" content="6.2442;-75.5812" />
        <meta name="ICBM" content="6.2442, -75.5812" />
      </head>
      <body className="font-sans antialiased">
        {/* Esquema de datos estructurados para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              logo: `${siteConfig.url}/logo.png`,
              sameAs: [
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.linkedin,
                siteConfig.links.twitter,
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Medellín",
                addressRegion: "Antioquia",
                addressCountry: "CO",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "sales",
                availableLanguage: ["Spanish", "English"],
              },
            }),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}