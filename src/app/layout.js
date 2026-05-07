import { Open_Sans, Playfair_Display, Rajdhani } from "next/font/google";
import "@/assets/css/font-icons.css";
import "@/assets/css/plugins.css";
import "./globals.css";
import "@/assets/css/responsive.css";
import Script from "next/script";
import { Suspense } from "react";
import ProductProvider from "@/providers/ProductContext";

const open_sans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--ltn__body-font",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--ltn__heading-font",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata = {
  title: "Broccoli - Organic Food React Template",
  description: "Broccoli - Organic Food React Template",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${rajdhani.variable} ${open_sans.variable} ${playfair.variable}`}
    >
      <body className={open_sans.className}>

        {/* ✅ Scripts moved outside Suspense, at the body level */}
        <Script src="/plugins.js" strategy="lazyOnload" />
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
          strategy="lazyOnload" // ✅ Explicit strategy instead of bare `async`
        />

        {/* ✅ Provider wraps children so all pages can access product context */}
        <ProductProvider>
          <Suspense fallback={<div></div>}>
            {children}
          </Suspense>
        </ProductProvider>

      </body>
    </html>
  );
}
