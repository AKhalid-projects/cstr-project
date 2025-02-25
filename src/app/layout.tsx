import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProcessDynX",
  description: "Interactive Process Control System Simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen pt-16 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
