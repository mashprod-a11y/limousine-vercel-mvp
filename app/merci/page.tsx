import Link from "next/link";

export default function MerciPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4 text-[var(--text-primary)]">
      <div className="max-w-md w-full surface-card rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[var(--gold)]/15">
          <svg className="h-8 w-8 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Paiement Reçu</h1>
        <p className="text-[var(--text-muted)] mb-8">
          Merci pour votre réservation. Votre acompte a bien été enregistré.
          <br /><br />
          Nous allons vérifier la disponibilité et vous contacter très rapidement pour confirmer les détails.
        </p>

        {searchParams.session_id && (
          <p className="text-xs text-[var(--text-muted)] mb-6">Réf: {searchParams.session_id.slice(-8)}</p>
        )}

        <Link
          href="/"
          className="btn-primary inline-block rounded-full px-6 py-3 font-semibold transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
}
