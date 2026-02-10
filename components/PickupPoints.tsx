import { pickupPoints } from "@/data/pickupPoints";

export default function PickupPoints() {
  return (
    <section id="rdv" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-inkBlack to-nightBordeaux opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Points de Rendez-vous</h2>
          <p className="text-gray-400">
            Retrouvez nos chauffeurs aux points stratégiques de Vercel-Villedieu-le-Camp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pickupPoints.map((point) => (
            <div
              key={point.id}
              className="bg-inkBlack/50 border border-white/10 rounded-xl p-6 hover:border-orange/50 transition-colors"
            >
              <h3 className="text-lg font-bold text-white mb-2">{point.name}</h3>
              <p className="text-gray-400 text-sm mb-4 min-h-[40px]">{point.address}</p>
              <p className="text-xs text-gray-500 mb-6 italic">{point.instruction}</p>
              
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm font-medium text-orange hover:text-amberFlame transition-colors"
              >
                Ouvrir sur Maps →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
