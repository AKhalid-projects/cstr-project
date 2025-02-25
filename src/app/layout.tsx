import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CSTR System Simulation",
  description: "Advanced CSTR system simulation for industrial processes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
