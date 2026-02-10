import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReservationSection from "@/components/ReservationSection";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveOffers from "@/components/InteractiveOffers";
import PricingCards from "@/components/PricingCards";
import ChauffeurToggle from "@/components/ChauffeurToggle";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";

const PickupMap = dynamic(() => import("@/components/PickupMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[380px] items-center justify-center rounded-3xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)]">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--gold)] border-t-transparent" />
    </div>
  ),
});

export default function Home() {
  const faqItems = [
    {
      question: "Comment réserver ?",
      answer:
        "Sélectionnez votre prestation, renseignez la date et vos coordonnées, puis payez l'acompte en ligne. Notre équipe vous confirme la disponibilité rapidement.",
    },
    {
      question: "Comment fonctionne le paiement ?",
      answer:
        "Un acompte est réglé en ligne par carte bancaire via Stripe. Le solde est à régler le jour de la prestation.",
    },
    {
      question: "Quand sommes-nous confirmés ?",
      answer:
        "Après réception de l'acompte et validation manuelle de votre demande par notre équipe.",
    },
    {
      question: "Annulation et remboursement",
      answer:
        "Les conditions d'annulation et de remboursement sont détaillées dans nos conditions de réservation.",
    },
    {
      question: "Location sans chauffeur : conditions",
      answer:
        "Le dossier est étudié au cas par cas. Pièces justificatives et caution sont requises.",
    },
    {
      question: "Quelle zone desservez-vous ?",
      answer:
        "Vercel-Villedieu-le-Camp et ses alentours, incluant Valdahon, Besançon et les communes environnantes.",
    },
  ];

  const mapPoints = pickupPoints.map((p) => ({
    name: p.name,
    address: p.address,
    lat: p.lat,
    lng: p.lng,
  }));

  return (
    <main className="min-h-screen text-[var(--text-primary)] selection:bg-[var(--gold)] selection:text-[var(--rich-mahogany)]">
      <ScrollReveal />

      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] backdrop-blur-xl" style={{ background: "rgba(37, 9, 2, 0.88)" }}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-bold tracking-wide text-[var(--gold)] sm:text-lg">
            {content.siteName}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
            <a href="#offres" className="hover:text-[var(--gold)] transition-colors">Prestations</a>
            <a href="#tarifs" className="hover:text-[var(--gold)] transition-colors">Tarifs</a>
            <a href="#rdv" className="hover:text-[var(--gold)] transition-colors">Points RDV</a>
            <a href="#faq" className="hover:text-[var(--gold)] transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${content.phone}`}
              className="hidden text-sm link-gold sm:inline"
            >
              Appeler
            </a>
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-3 py-1 text-sm text-[var(--gold)] backdrop-blur-md sm:inline hover:bg-[var(--gold)]/12 transition"
            >
              WhatsApp
            </a>
            <a
              href="#reservation"
              className="btn-primary rounded-full px-5 py-2 text-sm font-semibold transition"
            >
              Réserver
            </a>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        <div className="absolute -left-32 top-20 h-80 w-80 rounded-full bg-[var(--brown-red)]/15 blur-[120px]" />
        <div className="absolute -right-24 top-0 h-96 w-96 rounded-full bg-[var(--dark-wine)]/20 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-20">
          <div className="flex flex-col justify-center" data-reveal="left">
            <span className="mb-5 inline-flex w-fit rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/5 px-4 py-1.5 text-sm tracking-wide text-[var(--gold)] backdrop-blur-sm">
              Limousine à Vercel-Villedieu-le-Camp
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">
              Location de limousine
              <br />
              <span className="bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] bg-clip-text text-transparent">
                et voiture de prestige
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-[var(--text-muted)]">
              Service haut de gamme à Vercel-Villedieu-le-Camp et ses alentours.
              Avec ou sans chauffeur, pour tous vos événements.
            </p>

            <ul className="mt-6 space-y-2.5 text-[var(--text-muted)]">
              {[
                "Acompte en ligne, confirmation rapide",
                "Chauffeur professionnel ou location libre",
                "Prestations événementielles sur mesure",
              ].map((txt) => (
                <li key={txt} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--gold)]" />
                  {txt}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reservation"
                className="btn-primary rounded-full px-7 py-3.5 text-sm font-semibold transition"
              >
                Réserver maintenant
              </a>
              <a
                href="#tarifs"
                className="btn-secondary rounded-full px-7 py-3.5 text-sm font-semibold transition"
              >
                Voir les tarifs
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="surface-card relative h-[430px] overflow-hidden rounded-3xl sm:h-[520px]" data-reveal="right">
            <Image
              src="https://images.pexels.com/photos/9151813/pexels-photo-9151813.jpeg"
              alt="Limousine de prestige à Vercel-Villedieu-le-Camp"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--rich-mahogany)] via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm font-medium text-[var(--gold)]">
                Vercel-Villedieu-le-Camp
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                Élégance et confort
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== BANDEAU VALEUR ==================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal="up">
        <div className="surface-card grid gap-4 rounded-3xl p-6 sm:grid-cols-4 text-center">
          {[
            { icon: "📍", label: "Vercel-Villedieu-le-Camp et alentours" },
            { icon: "🚗", label: "Avec ou sans chauffeur" },
            { icon: "⚡", label: "Confirmation rapide" },
            { icon: "💎", label: "Service haut de gamme" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 py-2">
              <span className="text-2xl">{item.icon}</span>
              <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PRESTATIONS ==================== */}
      <section id="offres" className="mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Nos prestations</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Cliquez sur une prestation pour découvrir les détails.
          </p>
        </div>
        <InteractiveOffers />
      </section>

      {/* ==================== TARIFS ==================== */}
      <section id="tarifs" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Tarifs indicatifs</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Le prix final dépend de la durée, de l'itinéraire et des options choisies.
            Survolez un tarif pour plus de détails.
          </p>
        </div>
        <PricingCards />
      </section>

      {/* ==================== FORMULES + CHAUFFEUR ==================== */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <ChauffeurToggle />
      </section>

      {/* ==================== POINTS DE RDV + MAP ==================== */}
      <section id="rdv" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Points de rendez-vous
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Retrouvez-nous à l'un de nos points de prise en charge.
          </p>
        </div>

        {/* Map */}
        <div className="mb-8" data-reveal="scale">
          <PickupMap points={mapPoints} />
        </div>

        {/* Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {pickupPoints.map((point) => (
            <article
              key={point.id}
              className="surface-card rounded-3xl p-6 transition-all duration-300 hover:ring-1 hover:ring-[var(--gold)]/30 hover:scale-[1.01]"
              data-reveal="up"
            >
              <h3 className="text-lg font-semibold">{point.name}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">{point.address}</p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">{point.instruction}</p>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium link-gold hover:underline"
              >
                Ouvrir sur Maps →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Questions fréquentes</h2>
        </div>
        <div className="space-y-3" data-stagger>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="surface-card rounded-3xl p-5 transition-all duration-300 hover:ring-1 hover:ring-[var(--gold)]/20"
              data-reveal="up"
            >
              <summary className="cursor-pointer list-none text-base font-semibold">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-[var(--text-muted)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ==================== RÉSERVATION ==================== */}
      <ReservationSection />

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[var(--glass-border)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-[var(--text-muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            {content.siteName} · {content.zone}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="link-gold hover:underline">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="link-gold hover:underline">
              Confidentialité
            </Link>
            <Link href="/conditions" className="link-gold hover:underline">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
