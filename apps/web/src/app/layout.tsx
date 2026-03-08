import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/context/LanguageContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "VeloZeety — Tu ciudad en movimiento | Transporte, Delivery y Wallet Digital",
  description:
    "VeloZeety es la plataforma multi-servicios de Venezuela: pide viajes en moto o carro, realiza mandados, envíos express, recarga tu billetera digital (USDT, Bolívares, PayPal) y gestiona tu negocio. Disponible 24/7.",
  keywords: [
    "VeloZeety",
    "transporte Venezuela",
    "delivery Venezuela",
    "pago móvil Venezuela",
    "wallet digital Venezuela",
    "moto taxi Venezuela",
    "taxi Venezuela",
    "USDT Venezuela",
    "viajes app Venezuela",
    "emprendedores Venezuela",
  ],
  authors: [{ name: "VeloZeety", url: "https://velozeety.com" }],
  creator: "VeloZeety",
  publisher: "VeloZeety C.A.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: "https://velozeety.com",
    siteName: "VeloZeety",
    title: "VeloZeety — Tu ciudad en movimiento",
    description:
      "Plataforma multi-servicios: transporte, delivery, billetera digital y negocio en una sola app.",
    images: [
      {
        url: "https://velozeety.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "VeloZeety — Tu ciudad en movimiento",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@VeloZeety",
    creator: "@VeloZeety",
    title: "VeloZeety — Tu ciudad en movimiento",
    description:
      "Pide viajes, paga con tu wallet y mueve tu negocio con VeloZeety.",
    images: ["https://velozeety.com/og-image.png"],
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VeloZeety",
  alternateName: "VeloCity",
  url: "https://velozeety.com",
  logo: "https://velozeety.com/logo.png",
  description:
    "VeloZeety es la plataforma multi-servicios de Venezuela. Ofrecemos transporte en moto y carro, delivery express, billetera digital con soporte USDT y Bolívares, y herramientas para emprendedores.",
  foundingDate: "2024",
  foundingLocation: "Venezuela",
  areaServed: "Venezuela",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    email: "soporte@velozeety.com",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://facebook.com/velozeety",
    "https://instagram.com/velozeety",
    "https://twitter.com/velozeety",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${outfit.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
        {/* Twemoji CDN — emojis consistentes en Windows/Mac/Linux */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/@twemoji/api@latest/dist/twemoji.min.js';
                s.crossOrigin = 'anonymous';
                s.onload = function() {
                  if (typeof twemoji !== 'undefined') {
                    twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
                    var observer = new MutationObserver(function() {
                      twemoji.parse(document.body, { folder: 'svg', ext: '.svg' });
                    });
                    observer.observe(document.body, { childList: true, subtree: true });
                  }
                };
                document.head.appendChild(s);
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              img.emoji {
                height: 1em;
                width: 1em;
                margin: 0 .05em 0 .1em;
                vertical-align: -0.1em;
                display: inline;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-[var(--velocity-bg)] text-[var(--velocity-text)] antialiased font-sans transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
