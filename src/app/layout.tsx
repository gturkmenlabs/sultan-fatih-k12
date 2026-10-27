import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * DM Sans kendimiz barındırılır (OFL lisansı: fonts/LICENSE-DMSans-OFL.txt).
 * Google Fonts isteği yok → daha hızlı LCP, üçüncü taraf gizlilik sızıntısı
 * yok ve çevrimdışı/CI ortamlarında da deterministik build.
 */
const bumbleSans = localFont({
  src: [
    { path: "./fonts/dm-sans-400.ttf", weight: "400", style: "normal" },
    { path: "./fonts/dm-sans-500.ttf", weight: "500", style: "normal" },
    { path: "./fonts/dm-sans-600.ttf", weight: "600", style: "normal" },
    { path: "./fonts/dm-sans-700.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-dm-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const SITE_URL = "https://www.sultanfatih.k12.tr";
const SITE_NAME = "Sultan Fatih K.12";
const DESCRIPTION =
  "Özel Sultan Fatih Eğitim Kurumları — Fatih ve Beylikdüzü kampüslerinde anaokulu, ilkokul, ortaokul, anadolu ve fen lisesi eğitimi; LGS, YKS, robotik ve bilim olimpiyatları başarılarıyla.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sultan Fatih K.12 — Özel Sultan Fatih Eğitim Kurumları",
    template: "%s | Sultan Fatih K.12",
  },
  description: DESCRIPTION,
  keywords: [
    "Sultan Fatih Koleji",
    "özel okul İstanbul",
    "Fatih özel okul",
    "Beylikdüzü özel okul",
    "anaokulu",
    "ilkokul",
    "ortaokul",
    "fen lisesi",
    "anadolu lisesi",
    "LGS hazırlık",
    "YKS hazırlık",
    "robotik",
    "ön kayıt",
  ],
  category: "education",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "/",
    siteName: SITE_NAME,
    title: "Sultan Fatih K.12 — Özel Sultan Fatih Eğitim Kurumları",
    description: DESCRIPTION,
    images: [
      {
        url: "/sites/sultanfatih/hero/hero-01.jpg",
        alt: "Sultan Fatih Koleji başarıları",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sultan Fatih K.12 — Özel Sultan Fatih Eğitim Kurumları",
    description: DESCRIPTION,
    images: ["/sites/sultanfatih/hero/hero-01.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      {
        url: "/sites/sultanfatih/brand/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/sites/sultanfatih/brand/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  },
};

/**
 * Schema.org EducationalOrganization — okul web sitesi rehberinin
 * (school-website-design-v3 §4A) zorunlu SEO kapısı. Doğrulanmamış
 * sokak adresi/telefon uydurulmaz; yalnızca kampüs adları ve ilçe/şehir.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organizasyon`,
      name: "Özel Sultan Fatih Eğitim Kurumları",
      alternateName: "Sultan Fatih Koleji",
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/sites/sultanfatih/brand/logo.png`,
      description: DESCRIPTION,
      sameAs: [
        "https://www.facebook.com/sultanfatih",
        "https://twitter.com/sultanfatih",
        "https://www.instagram.com/sultanfatih",
        "https://www.youtube.com/sultanfatih",
      ],
      department: [
        {
          "@type": "School",
          name: "Sultan Fatih Koleji — Fatih Kampüsü",
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressRegion: "Fatih",
            addressCountry: "TR",
          },
        },
        {
          "@type": "School",
          name: "Sultan Fatih Koleji — Beylikdüzü Kampüsü",
          address: {
            "@type": "PostalAddress",
            addressLocality: "İstanbul",
            addressRegion: "Beylikdüzü",
            addressCountry: "TR",
          },
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#organizasyon` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${bumbleSans.variable} font-bumblesans bg-paper-white text-bumble-ink`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-buttons focus:bg-bumble-ink focus:px-5 focus:py-3 focus:text-body-sm focus:font-semibold focus:text-paper-white"
        >
          İçeriğe atla
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
