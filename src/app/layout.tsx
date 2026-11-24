import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import React from "react";
import "./globals.css";
import { LanguageProvider } from "@/context/language-context";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { HOSPITAL_CONTACT } from "@/data/hospital-data";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hopitallaquintinie.cm"),
  title: {
    default: "Hôpital Laquintinie de Douala — 95 ans au service de chaque vie",
    template: "%s · Hôpital Laquintinie de Douala",
  },
  description:
    "Hôpital public de référence à Douala depuis 1931 : plus de 30 services spécialisés, 207 médecins, prise de rendez-vous en ligne et urgences 24h/24.",
  alternates: {
    canonical: "https://hopitallaquintinie.cm/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/images/brand/logo-hl.webp",
    apple: "/images/brand/logo-hl.webp",
  },
  openGraph: {
    title: "Hôpital Laquintinie de Douala — 95 ans au service de chaque vie",
    description:
      "Hôpital public de référence au Cameroun : soins, enseignement et recherche depuis 1931.",
    url: "https://hopitallaquintinie.cm/",
    siteName: "Hôpital Laquintinie de Douala",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/images/brand/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Façade de l'Hôpital Laquintinie de Douala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LaquintinieCMR",
    title: "Hôpital Laquintinie de Douala — 95 ans au service de chaque vie",
    description:
      "Services médicaux, médecins, prise de rendez-vous en ligne et urgences 24h/24 à Douala.",
    images: ["/images/brand/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Hospital", "MedicalOrganization"],
        "@id": "https://hopitallaquintinie.cm/#hospital",
        name: HOSPITAL_CONTACT.name,
        url: "https://hopitallaquintinie.cm/",
        logo: "https://hopitallaquintinie.cm/images/brand/logo-hl.webp",
        image: "https://hopitallaquintinie.cm/images/brand/og-default.jpg",
        foundingDate: "1931",
        telephone: HOSPITAL_CONTACT.standardPhoneRaw,
        email: HOSPITAL_CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${HOSPITAL_CONTACT.address}, ${HOSPITAL_CONTACT.poBox}`,
          addressLocality: HOSPITAL_CONTACT.city,
          addressRegion: HOSPITAL_CONTACT.region,
          addressCountry: "CM",
        },
        openingHours: "Mo-Su 00:00-23:59",
        sameAs: [
          HOSPITAL_CONTACT.social.facebook,
          HOSPITAL_CONTACT.social.x,
          HOSPITAL_CONTACT.social.linkedin,
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://hopitallaquintinie.cm/#website",
        name: HOSPITAL_CONTACT.name,
        url: "https://hopitallaquintinie.cm/",
        inLanguage: ["fr-FR", "en-US"],
      },
    ],
  };

  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${cormorant.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-[#F8F7F4] text-[#0A1628] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* WCAG Bypass Block / Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#08162B] focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-2xl focus:outline-2 focus:outline-[#DFB860]"
        >
          Aller au contenu principal
        </a>

        <LanguageProvider>
          <SiteHeader />
          <main id="main-content" tabIndex={-1} className="w-full overflow-x-clip outline-none">
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
