import Link from "next/link";
import { content } from "@/data/content";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-inkBlack py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-amberFlame hover:underline mb-8 inline-block">← Retour</Link>
        <h1 className="text-4xl font-bold text-white mb-8">Mentions Légales</h1>
        <div className="prose prose-invert">
          <p>
            Éditeur du site : Limo Vercel<br />
            Adresse : {content.zone}<br />
            Email : {content.email}<br />
            Téléphone : {content.phone}
          </p>
          <p>
            Hébergement : Vercel Inc.<br />
            440 N Barranca Ave #4133<br />
            Covina, CA 91723
          </p>
        </div>
      </div>
    </main>
  );
}
