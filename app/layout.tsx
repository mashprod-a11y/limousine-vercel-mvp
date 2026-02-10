import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Location Limousine Vercel-Villedieu-le-Camp",
  description: "Location de limousine et voiture de prestige avec ou sans chauffeur à Vercel-Villedieu-le-Camp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
