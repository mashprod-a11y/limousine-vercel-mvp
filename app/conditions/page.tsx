import Link from "next/link";

export default function Conditions() {
  return (
    <main className="min-h-screen bg-black py-20 px-4 text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm link-gold hover:underline mb-8">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Retour
        </Link>
        <h1 className="text-4xl font-bold text-white mb-8">Conditions Générales de Vente</h1>
        <div className="space-y-6 text-[var(--text-muted)]">
          <section>
            <h2 className="text-xl font-bold text-white mb-2">1. Réservation et Acompte</h2>
            <p>
              Toute réservation n'est confirmée qu'après versement d'un acompte de 10% du montant de la prestation.
              Le solde est dû le jour de la prestation ou selon devis.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Annulation</h2>
            <p>
              En cas d'annulation par le client plus de 72h avant la prestation, l'acompte est remboursé intégralement.
              Moins de 72h avant, l'acompte reste acquis à titre d'indemnité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Location Sans Chauffeur</h2>
            <p>La location sans chauffeur requiert :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Permis de conduire valide de plus de 5 ans.</li>
              <li>Âge minimum de 25 ans.</li>
              <li>Dépôt de caution (empreinte bancaire) avant la prise du véhicule.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Responsabilité</h2>
            <p>
              Le client est responsable des dégradations commises à l'intérieur du véhicule.
              Il est interdit de fumer à bord.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
