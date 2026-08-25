import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { SmoothScroll } from "@/app/components/smooth-scroll";
import { SplashScreen } from "@/app/components/splash-screen";
import { Navbar } from "@/app/components/navbar";
import { Footer } from "@/app/components/footer";
import { CartProvider } from "@/app/context/cart-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Golin - Sewa Lapangan Mini Soccer",
  description:
    "Sewa lapangan mini soccer favoritmu, booking online cepat tanpa ribet.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
        <SplashScreen />
      </body>
    </html>
  );
}
