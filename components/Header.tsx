import Link from "next/link";
import { content } from "@/data/content";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-inkBlack/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter text-amberFlame">
          LIMO VERCEL
        </Link>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
          <Link href="#offres" className="hover:text-amberFlame transition-colors">
            Offres
          </Link>
          <Link href="#tarifs" className="hover:text-amberFlame transition-colors">
            Tarifs
          </Link>
          <Link href="#rdv" className="hover:text-amberFlame transition-colors">
            Points RDV
          </Link>
          <Link href="#faq" className="hover:text-amberFlame transition-colors">
            FAQ
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={`tel:${content.phone}`}
            className="hidden sm:block text-sm font-medium text-gray-300 hover:text-white"
          >
            Appeler
          </a>
          <a
            href={content.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm font-medium text-green-400 hover:text-green-300"
          >
            WhatsApp
          </a>
          <Link
            href="#reservation"
            className="bg-amberFlame text-inkBlack px-4 py-2 rounded-md text-sm font-bold hover:bg-orange transition-colors"
          >
            Réserver
          </Link>
        </div>
      </div>
    </header>
  );
}
