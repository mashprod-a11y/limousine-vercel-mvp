import Link from "next/link";
import { content } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-inkBlack border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-amberFlame mb-2">LIMO VERCEL</h3>
            <p className="text-sm text-gray-400">
              Location de limousine et voitures de prestige.
              <br />
              {content.zone}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </Link>
            <Link href="/conditions" className="hover:text-white transition-colors">
              CGV
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} Limo Vercel. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
