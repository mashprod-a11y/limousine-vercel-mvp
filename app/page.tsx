import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import ReservationSection from "@/components/ReservationSection";
import ScrollReveal from "@/components/ScrollReveal";
import InteractiveOffers from "@/components/InteractiveOffers";
import PricingCards from "@/components/PricingCards";
import ChauffeurToggle from "@/components/ChauffeurToggle";
import EntrepriseSection from "@/components/EntrepriseSection";
import HeroSlideshow from "@/components/HeroSlideshow";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";
import {
  IconMapPin,
  IconCar,
  IconZap,
  IconDiamond,
  IconPhone,
  IconMessageCircle,
  IconShield,
} from "@/components/Icons";

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
          <Link href="/" className="text-base font-bold uppercase tracking-widest text-[var(--gold)] sm:text-lg">
            Vercel Prestige
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "#offres", label: "Prestations" },
              { href: "#tarifs", label: "Tarifs" },
              { href: "#entreprise", label: "Entreprises" },
              { href: "#rdv", label: "Nos lieux" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm text-[var(--text-muted)] transition-all duration-200 hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${content.phone}`}
              className="hidden items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/[0.03] px-3.5 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--gold)]/30 hover:text-white sm:inline-flex"
            >
              <IconPhone className="h-3.5 w-3.5" />
              Appeler
            </a>
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-[var(--glass-border)] bg-white/[0.03] px-3.5 py-2 text-sm text-[var(--text-muted)] transition hover:border-[var(--gold)]/30 hover:text-white sm:inline-flex"
            >
              <IconMessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>
            <a href="#reservation" className="btn-primary rounded-full px-5 py-2 text-sm font-semibold transition">
              Réserver
            </a>
          </div>
        </div>
      </header>

      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Animated background orbs */}
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[var(--brown-red)]/8 blur-[160px] pulse-glow" />
        <div className="absolute right-[-10%] top-[-5%] h-[500px] w-[500px] rounded-full bg-[var(--dark-wine)]/10 blur-[180px] pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute left-1/2 bottom-0 h-64 w-[600px] -translate-x-1/2 rounded-full bg-[var(--gold)]/4 blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="flex flex-col justify-center" data-reveal="left">
            <span className="mb-5 inline-flex w-fit items-center gap-1.5 rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-4 py-1.5 text-sm tracking-wide text-[var(--gold)]">
              <IconMapPin className="h-3.5 w-3.5" />
              Vercel-Villedieu-le-Camp
            </span>

            <h1 className="text-balance text-4xl font-extrabold uppercase leading-[1.06] tracking-tight sm:text-5xl md:text-6xl">
              Vercel
              <br />
              <span className="shimmer-text">Prestige</span>
            </h1>

            <p className="mt-4 text-lg font-light italic text-[var(--gold)]">
              {content.tagline}
            </p>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-[var(--text-muted)]">
              Transport en limousine et location de véhicules haut de gamme,
              avec ou sans chauffeur, pour une expérience exclusive et personnalisée.
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

          {/* Hero slideshow with Ken Burns */}
          <div className="relative" data-reveal="right">
            <div className="surface-card relative h-[420px] overflow-hidden rounded-2xl sm:h-[500px]">
              <HeroSlideshow />
            </div>
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[var(--gold)]/5 blur-2xl" />
          </div>
        </div>
      </section>

      {/* ==================== BANDEAU VALEUR ==================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal="up">
        <div className="surface-card grid gap-4 rounded-2xl p-5 sm:grid-cols-4 text-center">
          {[
            { Icon: IconMapPin, label: "Vercel-Villedieu-le-Camp et alentours" },
            { Icon: IconCar, label: "Avec ou sans chauffeur" },
            { Icon: IconZap, label: "Confirmation rapide" },
            { Icon: IconDiamond, label: "Service haut de gamme" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 py-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--gold)]/10 text-[var(--gold)]">
                <item.Icon className="h-4.5 w-4.5" />
              </span>
              <p className="text-xs text-[var(--text-muted)]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== ABOUT / IMPLANTATIONS ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div data-reveal="left">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Notre histoire</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Vercel Prestige</h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--text-muted)]">
              Implantée dans un site stratégique et élégant, Rue du Château,
              en plein c&oelig;ur de la place principale de Vercel, face à l'église Sainte-Agathe,
              Vercel Prestige déploie son savoir-faire dans toute la région,
              en partenariat avec des lieux emblématiques et des pôles événementiels sélectionnés.
            </p>
            <p className="mt-6 text-sm italic text-[var(--gold)]">
              Quand chaque déplacement devient une signature.
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">{content.founders}</p>
          </div>

          {/* Image 2 placement */}
          <div className="relative" data-reveal="right">
            <div className="surface-card relative h-[350px] overflow-hidden rounded-2xl sm:h-[400px]">
              <Image
                src="/images/image2.jpg"
                alt="Vercel Prestige – Nos implantations"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ==================== PRESTATIONS ==================== */}
      <section id="offres" className="mx-auto max-w-7xl px-4 pb-8 pt-14 sm:px-6 lg:px-8">
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

      {/* ==================== OFFRE ENTREPRISES ==================== */}
      <EntrepriseSection />

      {/* ==================== FORMULES + CHAUFFEUR ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ChauffeurToggle />
      </section>

      {/* ==================== NOS IMPLANTATIONS / POINTS RDV + MAP ==================== */}
      <section id="rdv" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal="up">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Nos implantations</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Retrouvez Vercel Prestige dans nos lieux partenaires.
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
              <div className="flex items-center gap-2 mb-2">
                <IconMapPin className="h-4 w-4 text-[var(--gold)]" />
                <h3 className="text-base font-semibold">{point.name}</h3>
              </div>
              <p className="text-sm text-[var(--text-muted)]">{point.address}</p>
              <p className="mt-2 text-xs text-[var(--text-muted)]">{point.instruction}</p>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium link-gold hover:underline"
              >
                Ouvrir sur Maps
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" /></svg>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ==================== IMAGE 3 – FULL WIDTH VISUAL BREAK ==================== */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" data-reveal="scale">
        <div className="surface-card relative h-[280px] overflow-hidden rounded-2xl sm:h-[360px]">
          <Image
            src="/images/image3.jpg"
            alt="Vercel Prestige – Expérience premium"
            fill
            sizes="100vw"
            quality={90}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">Vercel Prestige</p>
            <p className="mt-1 text-2xl font-bold text-white sm:text-3xl">
              Quand chaque déplacement<br />devient une signature.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== RÉSERVATION ==================== */}
      <ReservationSection />

      {/* ==================== FAQ ==================== */}
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-base font-bold uppercase tracking-widest text-[var(--gold)]">Vercel Prestige</p>
              <p className="mt-1 text-sm italic text-[var(--text-muted)]">{content.tagline}</p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">{content.founders}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <Link href="/mentions-legales" className="link-gold hover:underline">Mentions légales</Link>
              <Link href="/confidentialite" className="link-gold hover:underline">Confidentialité</Link>
              <Link href="/conditions" className="link-gold hover:underline">Conditions</Link>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-1 text-xs text-[var(--text-muted)]">
            <IconShield className="h-3.5 w-3.5 text-[var(--gold)]" />
            <span>Paiement sécurisé par Stripe</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
