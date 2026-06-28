import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import ThreeBackground from "@/components/ui/ThreeBackground";
import QuizModal from "@/components/quiz/QuizModal";
import AIChatbot from "@/components/chat/AIChatbot";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VisuaLab | Premium AI Automation & Shopify Development Agency",
  description: "Automate your entire business workflows, reclaim 20+ hours a week, and scale Shopify stores with VisuaLab's cutting-edge AI agency solutions.",
  metadataBase: new URL("https://visualab.uk"),
  openGraph: {
    title: "VisuaLab | AI Automation & Shopify Development",
    description: "Scale your e-commerce operations, automate business tasks, and save costs up to 60%.",
    url: "https://visualab.uk",
    siteName: "VisuaLab AI",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VisuaLab | AI Automation",
    description: "Automate manual admin tasks and scale with Shopify development solutions.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-KRMXGGM64Q";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-navy text-foreground selection:bg-brand-amber/30 selection:text-white">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}');
          `}
        </Script>
        <AppProvider>
          {/* Global Interactive Canvas Particles */}
          <ThreeBackground />

          {/* Custom Cursor Overlay */}
          <CustomCursor />

          {/* Main Navigation Header */}
          <Header />

          {/* Core Content Layer */}
          <main className="flex flex-col flex-1 w-full relative z-10">
            {children}
          </main>

          {/* Footer details */}
          <Footer />

          {/* Assessment Quiz Global Modal Overlay */}
          <QuizModal />

          {/* Active AI Chatbot overlay */}
          <AIChatbot />
        </AppProvider>
        <Analytics />
      </body>
    </html>
  );
}
