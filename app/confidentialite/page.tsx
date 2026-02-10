import Link from "next/link";

export default function Confidentialite() {
  return (
    <main className="min-h-screen bg-inkBlack py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-amberFlame hover:underline mb-8 inline-block">← Retour</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Politique de Confidentialité</h1>
        <div className="prose prose-invert text-gray-300 space-y-4">
          <p>
            Les informations recueillies via le formulaire de réservation (nom, email, téléphone) sont enregistrées dans un fichier informatisé par Limo Vercel pour la gestion des réservations.
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
