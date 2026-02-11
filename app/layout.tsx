import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercel Prestige – Location Limousine & Véhicules de Prestige",
  description: "L'art du transport de prestige. Location de limousine et véhicules haut de gamme avec ou sans chauffeur à Vercel-Villedieu-le-Camp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
