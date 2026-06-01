import { Open_Sans, Playfair_Display, Rajdhani } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";

import "./globals.css";

import StructuredData from "@/components/seo/StructuredData";
import {
  brandName,
  buildMetadataImages,
  defaultDescription,
  defaultOgImage,
  getLocalBusinessSchema,
  getOrganizationSchema,
  getSiteUrl,
  getWebsiteSchema,
  mergeKeywords,
} from "@/libs/seo";
import ProductProvider from "@/providers/ProductContext";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--ltn__body-font",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--ltn__heading-font",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  preload: false,
  variable: "--font-playfair",
});

export const metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default:
      "Orbitto International | Fruit Powder, Spices, Honey & Ingredient Exporter",
    template: "%s | Orbitto International",
  },
  description: defaultDescription,
  applicationName: brandName,
  referrer: "origin-when-cross-origin",
  keywords: mergeKeywords([
    "international food exporter",
    "spray dried fruit powder manufacturer",
    "export quality ingredients",
  ]),
  authors: [{ name: brandName }],
  creator: brandName,
  publisher: brandName,
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "hi-IN": "/hi",
      "gu-IN": "/gu",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: brandName,
    title:
      "Orbitto International | Fruit Powder, Spices, Honey & Ingredient Exporter",
    description: defaultDescription,
    images: buildMetadataImages(defaultOgImage, brandName),
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Orbitto International | Fruit Powder, Spices, Honey & Ingredient Exporter",
    description: defaultDescription,
    images: buildMetadataImages(defaultOgImage, brandName).map(
      (image) => image.url
    ),
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="en" href={`${getSiteUrl()}/`} />
        <link rel="alternate" hrefLang="hi" href={`${getSiteUrl()}/hi`} />
        <link rel="alternate" hrefLang="gu" href={`${getSiteUrl()}/gu`} />
        <link rel="alternate" hrefLang="x-default" href={`${getSiteUrl()}/`} />
        <link
          id="defer-plugins-css"
          rel="preload"
          href="/css/plugins.css"
          as="style"
        />
        <link
          id="defer-font-icons-css"
          rel="preload"
          href="/css/font-icons.css"
          as="style"
        />
        <link
          id="defer-responsive-css"
          rel="preload"
          href="/css/responsive.css"
          as="style"
        />
        <noscript>
          <link rel="stylesheet" href="/css/plugins.css" />
          <link rel="stylesheet" href="/css/font-icons.css" />
          <link rel="stylesheet" href="/css/responsive.css" />
        </noscript>
      </head>
      <body className={open_sans.className}>
        <Script id="defer-non-critical-css" strategy="afterInteractive">
          {`(function () {
            var ids = ["defer-plugins-css", "defer-font-icons-css", "defer-responsive-css"];
            ids.forEach(function (id) {
              var link = document.getElementById(id);
              if (link) link.rel = "stylesheet";
            });
          })();`}
        </Script>
        <StructuredData id="orbitto-organization-schema" data={getOrganizationSchema()} />
        <StructuredData id="orbitto-website-schema" data={getWebsiteSchema()} />
        <StructuredData id="orbitto-local-business-schema" data={getLocalBusinessSchema()} />
        {mapsApiKey ? (
          <Script
            src={`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&loading=async`}
            strategy="lazyOnload"
          />
        ) : null}

        <ProductProvider>
          <Suspense fallback={<div></div>}>{children}</Suspense>
        </ProductProvider>
      </body>
    </html>
  );
}
