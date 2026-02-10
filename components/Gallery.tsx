export default function Gallery() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Notre Flotte</h2>
          <p className="text-gray-400">Le luxe sous toutes ses formes.</p>
        </div>
        
        {/* Placeholder de galerie futuriste */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[500px]">
          <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-nightBordeaux group">
             <div className="absolute inset-0 bg-gradient-to-t from-inkBlack to-transparent opacity-60" />
             <div className="absolute bottom-6 left-6 text-white font-bold text-xl">Limousine Executive</div>
             {/* Ici on mettrait une <Image /> Next.js */}
             <div className="w-full h-full bg-white/5 animate-pulse" />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-nightBordeaux group">
             <div className="w-full h-full bg-white/5" />
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-nightBordeaux group">
             <div className="w-full h-full bg-white/5" />
          </div>
          <div className="col-span-2 relative rounded-2xl overflow-hidden bg-nightBordeaux group">
             <div className="w-full h-full bg-white/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
