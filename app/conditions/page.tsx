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
            <h2 className="text-xl font-bold text-white mb-2">1. Réservation et Paiement</h2>
            <p>
              Toute réservation n&apos;est confirmée qu&apos;après paiement en ligne. Deux options sont proposées :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Acompte de 10%</strong> du montant de la prestation. Le solde est dû le jour de la prestation ou selon devis.</li>
              <li><strong className="text-white">Paiement total</strong> de la prestation, avec un <strong className="text-green-400">rabais immédiat de 10%</strong> sur le prix affiché.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">2. Programme de fidélité</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Après <strong className="text-white">5 réservations</strong>, le client bénéficie de <strong className="text-[var(--gold)]">50% de réduction</strong> sur son 6e trajet.</li>
              <li>Après <strong className="text-white">10 réservations</strong>, le <strong className="text-purple-400">11e trajet est entièrement offert</strong>.</li>
              <li>Ces avantages sont automatiques et cumulables.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">3. Annulation</h2>
            <p>
              En cas d&apos;annulation par le client plus de 72h avant la prestation, le montant versé est remboursé intégralement.
              Moins de 72h avant, le montant versé reste acquis à titre d&apos;indemnité.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">4. Location Sans Chauffeur</h2>
            <p>La location sans chauffeur requiert :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Permis de conduire valide de plus de 5 ans.</li>
              <li>Âge minimum de 25 ans.</li>
              <li>Dépôt de caution (empreinte bancaire) avant la prise du véhicule.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-2">5. Responsabilité</h2>
            <p>
              Le client est responsable des dégradations commises à l&apos;intérieur du véhicule.
              Il est interdit de fumer à bord.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
