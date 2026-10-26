import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SimulationProvider } from "@/context/simulation-context";
import { DemoBanner } from "@/components/layout/demo-banner";
import { AppHeader } from "@/components/layout/app-header";
import { BottomNavigation } from "@/components/layout/bottom-navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QR Demo Nepal — QR Scanning & Payment UI Simulator",
  description:
    "Mobile-first QR scanning and payment UI simulator for Nepal merchant QRs. For demonstration, UI prototyping, and development testing.",
  keywords: [
    "QR Demo Nepal",
    "Nepal QR",
    "Fonepay QR",
    "NEPALPAY QR",
    "eSewa QR",
    "Khalti QR",
    "Fintech UI Simulator",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans selection:bg-emerald-500 selection:text-white pb-20 sm:pb-8">
        <SimulationProvider>
          {/* Top Persistent Simulation Disclosure Banner */}
          <DemoBanner variant="top-bar" />

          {/* App Header */}
          <AppHeader />

          {/* Main App Content Area */}
          <main className="flex-1 w-full max-w-xl mx-auto px-4 py-4 sm:py-6">
            {children}
          </main>

          {/* Mobile Bottom Navigation Bar */}
          <BottomNavigation />
        </SimulationProvider>
      </body>
    </html>
  );
}
