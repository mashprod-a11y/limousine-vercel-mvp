import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
       {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amberFlame/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
          Location Limousine <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amberFlame to-orange">
            Voiture de Prestige
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Vercel-Villedieu-le-Camp & alentours — Avec ou sans chauffeur.
          <br />
          L'excellence pour vos événements.
        </p>

        <ul className="flex flex-wrap justify-center gap-4 mb-10 text-sm font-medium text-gray-400">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amberFlame" />
            Acompte en ligne
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amberFlame" />
            Confirmation rapide
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amberFlame" />
            Prestations événementielles
          </li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#reservation"
            className="w-full sm:w-auto px-8 py-3 bg-amberFlame text-inkBlack font-bold rounded-lg hover:bg-orange transition-colors"
          >
            Réserver maintenant
          </Link>
          <Link
            href="#tarifs"
            className="w-full sm:w-auto px-8 py-3 border border-orange text-orange font-bold rounded-lg hover:bg-orange/10 transition-colors"
          >
            Voir les tarifs
          </Link>
        </div>
      </div>
    </section>
  );
}
