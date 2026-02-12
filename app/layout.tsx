import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vercel Prestige | Maison de transport d'exception dans le Doubs",
  description:
    "Vercel Prestige réinvente le transport de luxe à Vercel-Villedieu-le-Camp : limousine avec ou sans chauffeur, prestations événementielles et service signature.",
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
