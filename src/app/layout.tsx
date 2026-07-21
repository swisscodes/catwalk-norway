import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Radiant Horizon Foundation | Ending Child Marriage & Empowering Girls",
  description: "Radiant Horizon Foundation is a global NGO dedicated to protecting young girls from child marriage, promoting education, and advocating for equal legal rights.",
  keywords: "child marriage, ngo, girls education, human rights, child protection, philanthropy, non-profit",
  openGraph: {
    title: "Radiant Horizon Foundation | Ending Child Marriage",
    description: "Empowering girls and protecting them from child marriage through education, legal advocacy, and safe sanctuaries.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfair.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>
        <Navigation />
        <main style={{ flexGrow: 1, position: "relative" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
