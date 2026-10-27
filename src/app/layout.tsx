import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const bumbleSans = DM_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Sultan Fatih K.12 — Özel Sultan Fatih Eğitim Kurumları",
  description:
    "Sultan Fatih Koleji; Fatih ve Beylikdüzü'nde anaokulu, ilkokul, ortaokul ve lise eğitiminde LGS, YKS, robotik ve uluslararası başarılarıyla bien özel okul.",
  icons: {
    icon: [
      {
        url: "/sites/sultanfatih/brand/favicon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${bumbleSans.variable} font-bumblesans bg-paper-white text-bumble-ink`}>
        {children}
      </body>
    </html>
  );
}
