import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBar from "@/components/layout/MobileBar";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Animations from "@/components/ui/Animations";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import { site } from "@/lib/site";

const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space", weight: ["400", "500", "600", "700"], display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ARM-CORT | Corte, dobra e montagem de aço em Confins, MG",
    template: "%s | ARM-CORT",
  },
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "ARM-CORT",
    images: [{ url: "/media/patio.jpg", width: 1441, height: 1921, alt: "Pátio da ARM-CORT com bobinas de aço e caminhão carregado" }],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#empresa`,
  name: "ARM-CORT",
  legalName: site.razaoSocial,
  description: site.descricao,
  url: site.url,
  telephone: "+55-31-3686-6058",
  email: site.email,
  image: `${site.url}/media/patio.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  sameAs: [site.instagram, site.facebook],
  paymentAccepted: "Cartão de crédito, cartão de débito",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${space.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <MobileBar />
        <Animations />
      </body>
    </html>
  );
}
