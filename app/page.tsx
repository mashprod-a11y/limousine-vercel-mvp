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
    <div className="flex h-[380px] items-center justify-center rounded-2xl border border-[var(--glass-border)] bg-black">
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
        "Un acompte de 10% est réglé en ligne par carte bancaire via Stripe. Le solde est à régler le jour de la prestation.",
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
    <main className="min-h-screen text-[var(--text-primary)] selection:bg-[var(--gold)] selection:text-black">
      <ScrollReveal />

      {/* ==================== HEADER ==================== */}
      <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-bold tracking-wide text-[var(--gold)] sm:text-lg">
            {content.siteName}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
            <a href="#offres" className="hover:text-[var(--gold)] transition-colors">Prestations</a>
            <a href="#tarifs" className="hover:text-[var(--gold)] transition-colors">Tarifs</a>
            <a href="#rdv" className="hover:text-[var(--gold)] transition-colors">Points RDV</a>
            <a href="#reservation" className="hover:text-[var(--gold)] transition-colors">Réserver</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${content.phone}`} className="hidden text-sm link-gold sm:inline">
              Appeler
            </a>
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/5 px-3 py-1 text-sm text-[var(--gold)] sm:inline hover:bg-[var(--gold)]/10 transition"
            >
              WhatsApp
            </a>
            <a href="#reservation" className="btn-primary rounded-full px-5 py-2 text-sm font-semibold transition">
              Réserver
            </a>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-20">
        {/* Animated background orbs */}
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[var(--brown-red)]/8 blur-[160px] pulse-glow" />
        <div className="absolute right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[var(--dark-wine)]/10 blur-[180px] pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute left-1/2 bottom-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[var(--gold)]/4 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center" data-reveal="left">
            <span className="mb-5 inline-flex w-fit rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-1.5 text-sm tracking-wide text-[var(--gold)]">
              📍 Vercel-Villedieu-le-Camp
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Location de
              <br />
              <span className="shimmer-text">limousine de prestige</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[var(--text-muted)]">
              Service haut de gamme à Vercel-Villedieu-le-Camp et ses alentours.
              Avec ou sans chauffeur, pour tous vos événements.
            </p>

            <ul className="mt-6 space-y-2.5">
              {[
                "Acompte en ligne, confirmation rapide",
                "Chauffeur professionnel ou location libre",
                "Prestations événementielles sur mesure",
              ].map((txt) => (
                <li key={txt} className="flex items-center gap-2.5 text-sm text-[var(--text-muted)]">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)]/10">
                    <svg className="h-3 w-3 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  {txt}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reservation" className="btn-primary rounded-full px-8 py-3.5 text-sm font-semibold transition">
                Réserver maintenant
              </a>
              <a href="#tarifs" className="btn-secondary rounded-full px-8 py-3.5 text-sm font-semibold transition">
                Voir les tarifs
              </a>
            </div>
          </div>

          {/* Hero image with float animation */}
          <div className="relative" data-reveal="right">
            <div className="hero-float surface-card relative h-[420px] overflow-hidden rounded-2xl sm:h-[500px]">
              <Image
                src="https://images.pexels.com/photos/9151813/pexels-photo-9151813.jpeg"
                alt="Limousine de prestige à Vercel-Villedieu-le-Camp"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
                  Vercel-Villedieu-le-Camp
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  Élégance et confort
                </p>
              </div>
            </div>
            {/* Decorative glow behind card */}
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[var(--gold)]/5 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ==================== BANDEAU VALEUR ==================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal="up">
        <div className="surface-card grid gap-4 rounded-2xl p-5 sm:grid-cols-4 text-center">
          {[
            { icon: "📍", label: "Vercel-Villedieu-le-Camp et alentours" },
            { icon: "🚗", label: "Avec ou sans chauffeur" },
            { icon: "⚡", label: "Confirmation rapide" },
            { icon: "💎", label: "Service haut de gamme" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 py-2">
              <span className="text-xl">{item.icon}</span>
              <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PRESTATIONS ==================== */}
      <section id="offres" className="mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Nos prestations</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Sélectionnez une prestation pour découvrir le détail et le tarif.
          </p>
        </div>
        <InteractiveOffers />
      </section>

      {/* ==================== TARIFS ==================== */}
      <section id="tarifs" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Nos tarifs</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Prix fixes par prestation. Acompte de 10% à la réservation, solde le jour J.
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
          <h2 className="text-3xl font-extrabold sm:text-4xl">Points de rendez-vous</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Retrouvez-nous à l'un de nos points de prise en charge.
          </p>
        </div>
        <div className="mb-8" data-reveal="scale">
          <PickupMap points={mapPoints} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          {pickupPoints.map((point) => (
            <article
              key={point.id}
              className="surface-card rounded-2xl p-5 transition-all duration-300 hover:ring-1 hover:ring-[var(--glass-border)]"
              data-reveal="up"
            >
              <h3 className="text-base font-semibold">{point.name}</h3>
              <p className="mt-1 text-sm text-[var(--text-muted)]">{point.address}</p>
              <p className="mt-2 text-xs text-[var(--text-muted)]">{point.instruction}</p>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium link-gold hover:underline"
              >
                Ouvrir sur Maps →
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== RÉSERVATION ==================== */}
      <ReservationSection />

      {/* ==================== FAQ (après réservation) ==================== */}
      <section id="faq" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Questions fréquentes</h2>
        </div>
        <div className="space-y-3" data-stagger>
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="surface-card group rounded-2xl transition-all duration-300"
              data-reveal="up"
            >
              <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-base font-semibold">
                {item.question}
                <svg
                  className="faq-arrow ml-3 h-5 w-5 shrink-0 text-[var(--gold)]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-5 pb-4">
                <p className="text-sm leading-relaxed text-[var(--text-muted)]">{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="border-t border-[var(--glass-border)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-[var(--text-muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>{content.siteName} · {content.zone}</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="link-gold hover:underline">Mentions légales</Link>
            <Link href="/confidentialite" className="link-gold hover:underline">Confidentialité</Link>
            <Link href="/conditions" className="link-gold hover:underline">Conditions</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
