export default function Services() {
  const services = [
    "Mariage",
    "EVG / EVJF",
    "Anniversaire / Soirée privée",
    "Cérémonies familiales",
    "Forfait soirée (3–4h)",
    "Sur mesure",
  ];

  return (
    <section id="offres" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Nos Prestations</h2>
          <p className="text-gray-400">
            Une expérience de luxe adaptée à tous vos événements.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-inkBlack/40 border border-white/10 p-8 rounded-xl hover:bg-nightBordeaux/40 hover:border-amberFlame/30 transition-all cursor-default"
            >
              <div className="w-12 h-1 bg-amberFlame mb-6 group-hover:w-20 transition-all" />
              <h3 className="text-xl font-bold text-white mb-2">{service}</h3>
              <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                Service premium avec chauffeur qualifié et véhicule d'exception.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
