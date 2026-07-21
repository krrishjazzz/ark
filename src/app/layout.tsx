import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { BRAND } from "@/lib/constants";
import {
  GoogleTagManager,
} from "@/components/analytics/GoogleTagManager";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arkresin.art"),
  title: {
    default: `${BRAND.name} — ${BRAND.fullName}`,
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "resin art",
    "automotive art",
    "luxury wall art",
    "handcrafted resin",
    "supercar art",
    "limited edition art",
    "ARK",
    "Aesthetic Resin Kreations",
  ],
  authors: [{ name: BRAND.fullName }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: BRAND.fullName,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: BRAND.description,
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
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-background text-foreground antialiased">
        <GoogleTagManager />
        {children}
      </body>
    </html>
  );
}
