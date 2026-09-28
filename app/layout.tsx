import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartDrawer } from "@/components/cart/cart-drawer";

const display = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://perfumesyndicatebd.com"),
  title: {
    default: "Perfume Syndicate — Fragrance For Every Occasion",
    template: "%s | Perfume Syndicate",
  },
  description:
    "Discover a world of exquisite fragrances crafted with rare ingredients. Shop Perfume Syndicate's collection of premium eau de parfum, niche and signature scents.",
  openGraph: {
    title: "Perfume Syndicate — Fragrance For Every Occasion",
    description:
      "Discover a world of exquisite fragrances crafted with rare ingredients, made to leave a lasting impression.",
    url: "https://perfumesyndicatebd.com",
    siteName: "Perfume Syndicate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Perfume Syndicate — Fragrance For Every Occasion",
    description:
      "Discover a world of exquisite fragrances crafted with rare ingredients.",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}
