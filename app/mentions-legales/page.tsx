import Link from "next/link";
import { content } from "@/data/content";

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-black py-20 px-4 text-[var(--text-primary)]">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1 text-sm link-gold hover:underline mb-8">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Retour
        </Link>
        <h1 className="text-4xl font-bold text-white mb-8">Mentions Légales</h1>
        <div className="space-y-4 text-[var(--text-muted)]">
          <p>
            Éditeur du site : Vercel Prestige<br />
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
