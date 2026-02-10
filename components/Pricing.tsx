import { pricing } from "@/data/pricing";

export default function Pricing() {
  return (
    <section id="tarifs" className="py-20 bg-inkBlack relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Tarifs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Des tarifs transparents adaptés à chaque occasion.
            <br />
            <span className="text-sm italic text-gray-500">
              Le prix final dépend de la durée, de l’itinéraire et des options.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pricing.map((item, index) => (
            <div
              key={index}
              className="bg-[rgba(55,6,23,0.35)] border border-[rgba(255,186,8,0.18)] rounded-xl p-6 backdrop-blur-sm hover:border-amberFlame/50 transition-colors group"
            >
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amberFlame transition-colors">
                {item.title}
              </h3>
              <div className="text-2xl font-bold text-amberFlame mb-4">
                {item.priceRange}
              </div>
              <p className="text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
