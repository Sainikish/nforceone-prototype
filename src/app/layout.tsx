import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { AIChatAssistant } from "@/components/assistant/AIChatAssistant";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { TrackListener } from "@/components/ui/TrackListener";
import { site } from "@/content/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.positioningLine}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name}: ${site.positioningLine}`,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/nforceone-logo.webp`,
  email: site.email,
  description: site.description,
  sameAs: site.social.map((s) => s.href),
  contactPoint: site.offices.map((o) => ({
    "@type": "ContactPoint",
    telephone: o.phone.href.replace("tel:", ""),
    contactType: "sales",
    areaServed: o.lines[2],
    email: site.email,
  })),
  address: site.offices.map((o) => ({
    "@type": "PostalAddress",
    streetAddress: o.lines[0],
    addressLocality: o.lines[1],
    addressCountry: o.lines[2],
  })),
};

const GA = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <AIChatAssistant />
        <RevealObserver />
        <TrackListener />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd).replace(/</g, "\u003c") }}
        />
        {GA && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
