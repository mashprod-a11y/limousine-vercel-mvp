import Link from "next/link";

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-black py-20 px-4 text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm link-gold hover:underline mb-8">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Retour
        </Link>
        <h1 className="text-4xl font-bold text-white mb-8">Politique de Confidentialité</h1>
        <div className="space-y-4 text-[var(--text-muted)]">
          <p>
            Les informations recueillies via le formulaire de réservation (nom, email, téléphone) sont enregistrées dans un fichier informatisé par Vercel Prestige pour la gestion des réservations.
          </p>
          <p>
            Elles sont conservées pendant la durée nécessaire à la prestation et ne sont jamais transmises à des tiers sans votre accord.
          </p>
          <p>
            Conformément à la loi « informatique et libertés », vous pouvez exercer votre droit d'accès aux données vous concernant et les faire rectifier en nous contactant.
          </p>
        </div>
      </div>
    </main>
  );
}
