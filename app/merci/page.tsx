import Link from "next/link";

export default function MerciPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="min-h-screen bg-inkBlack flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[rgba(55,6,23,0.35)] border border-amberFlame/30 rounded-2xl p-8 text-center backdrop-blur-md">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 text-3xl">
          ✓
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Paiement Reçu</h1>
        <p className="text-gray-300 mb-8">
          Merci pour votre réservation. Votre acompte a bien été enregistré.
          <br /><br />
          Nous allons vérifier la disponibilité et vous contacter très rapidement pour confirmer les détails.
        </p>
        
        {searchParams.session_id && (
           <p className="text-xs text-gray-600 mb-6">Réf: {searchParams.session_id.slice(-8)}</p>
        )}

        <Link
          href="/"
          className="inline-block bg-amberFlame text-inkBlack font-bold px-6 py-3 rounded-lg hover:bg-orange transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
