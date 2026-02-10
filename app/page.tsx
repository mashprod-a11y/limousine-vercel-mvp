import Image from "next/image";
import Link from "next/link";
import ReservationSection from "@/components/ReservationSection";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";
import { pricing } from "@/data/pricing";

export default function Home() {
  const offers = [
    "Mariage",
    "EVG / EVJF",
    "Anniversaire / soirée privée",
    "Cérémonies familiales",
    "Forfait soirée (3–4h)",
    "Sur mesure",
  ];

  const formules = ["À l'heure", "Demi-journée", "Journée", "Événement"];

  const gallery = [
    "Limousine Executive",
    "Berline Prestige",
    "SUV Élégance",
    "Pack Cérémonie",
    "Ambiance VIP",
    "Entrée événement",
  ];

  const faqItems = [
    {
      question: "Comment réserver ?",
      answer:
        "Sélectionnez votre prestation, renseignez la date et vos coordonnées, puis payez l'acompte en ligne.",
    },
    {
      question: "Paiement",
      answer: "Acompte en ligne par carte via Stripe.",
    },
    {
      question: "Quand sommes-nous confirmés ?",
      answer: "Après paiement de l'acompte et validation manuelle de votre demande par notre équipe.",
    },
    {
      question: "Annulation / acompte",
      answer: "Le détail est défini dans nos conditions de réservation.",
    },
    {
      question: "Sans chauffeur : caution / documents",
      answer: "Le dossier est étudié au cas par cas, avec pièces justificatives et caution.",
    },
    {
      question: "Zone desservie",
      answer: "Vercel-Villedieu-le-Camp et alentours.",
    },
  ];

  return (
    <main className="min-h-screen text-white selection:bg-[#ffba08] selection:text-[#03071e]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#03071e]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-base font-semibold tracking-wide text-[#ffba08] sm:text-lg">
            {content.siteName}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[rgba(247,247,247,0.72)] md:flex">
            <a href="#offres" className="hover:text-white">
              Offres
            </a>
            <a href="#tarifs" className="hover:text-white">
              Tarifs
            </a>
            <a href="#rdv" className="hover:text-white">
              RDV
            </a>
            <a href="#faq" className="hover:text-white">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a href={`tel:${content.phone}`} className="hidden text-sm text-[rgba(247,247,247,0.72)] sm:inline hover:text-white">
              Appeler
            </a>
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[#faa307]/45 px-3 py-1 text-sm text-[#faa307] sm:inline"
            >
              WhatsApp
            </a>
            <a href="#reservation" className="btn-primary rounded-full px-4 py-2 text-sm font-semibold">
              Réserver
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-12 sm:pt-16">
        <div className="absolute -left-20 top-10 h-60 w-60 rounded-full bg-[#f48c06]/20 blur-3xl" />
        <div className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-[#ffba08]/20 blur-3xl" />

        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8">
          <div className="pt-8 sm:pt-12">
            <p className="mb-4 inline-flex rounded-full border border-[rgba(255,186,8,0.35)] bg-[rgba(255,186,8,0.08)] px-3 py-1 text-sm text-[#F7F7F7]">
              Acompte en ligne — Confirmation rapide
            </p>

            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Location limousine <br />
              <span className="text-[#ffba08]">voiture de prestige</span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-[rgba(247,247,247,0.72)]">
              Vercel-Villedieu-le-Camp & alentours — Avec ou sans chauffeur
            </p>

            <ul className="mt-6 space-y-2 text-[rgba(247,247,247,0.72)]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f48c06]" />
                Acompte en ligne
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f48c06]" />
                Confirmation rapide
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#f48c06]" />
                Prestations événementielles
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#reservation" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">
                Réserver
              </a>
              <a href="#tarifs" className="btn-secondary rounded-full px-6 py-3 text-sm font-semibold">
                Voir les tarifs
              </a>
            </div>
          </div>

          <div className="surface-card relative h-[430px] overflow-hidden rounded-3xl p-4 sm:h-[500px] sm:p-5">
            <div className="mb-4 grid grid-cols-[1fr_1fr_1fr_auto] gap-2 rounded-xl border border-white/10 bg-[#03071e]/70 p-2 text-xs sm:text-sm">
              <div className="rounded-lg border border-white/10 px-3 py-2 text-[rgba(247,247,247,0.72)]">Location</div>
              <div className="rounded-lg border border-white/10 px-3 py-2 text-[rgba(247,247,247,0.72)]">Pick Up Date</div>
              <div className="rounded-lg border border-white/10 px-3 py-2 text-[rgba(247,247,247,0.72)]">Return Date</div>
              <div className="btn-primary flex items-center rounded-lg px-4 py-2 font-semibold">Search</div>
            </div>

            <div className="relative h-[290px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#050a22] sm:h-[350px]">
              <Image
                src="/limo-hero.svg"
                alt="Visual limousine premium"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="surface-card grid gap-5 rounded-2xl p-5 text-center sm:grid-cols-5 sm:p-6">
          <div>
            <p className="text-3xl font-semibold text-[#ffba08]">150+</p>
            <p className="text-sm text-[rgba(247,247,247,0.72)]">Luxury Cars in Our Fleet</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#ffba08]">8000+</p>
            <p className="text-sm text-[rgba(247,247,247,0.72)]">Satisfied Clients</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#ffba08]">200+</p>
            <p className="text-sm text-[rgba(247,247,247,0.72)]">Corporate Partnerships</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#ffba08]">10+ Years</p>
            <p className="text-sm text-[rgba(247,247,247,0.72)]">Premium Service</p>
          </div>
          <div>
            <p className="text-3xl font-semibold text-[#ffba08]">4.9</p>
            <p className="text-sm text-[rgba(247,247,247,0.72)]">Customer Rating</p>
          </div>
        </div>
      </section>

      <section id="offres" className="mx-auto max-w-6xl px-4 pb-8 pt-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Step Into the World of Luxury</h2>
          <p className="mt-2 text-[rgba(247,247,247,0.72)]">
            Prestations haut de gamme pour chaque moment important.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer) => (
            <article key={offer} className="surface-card rounded-2xl p-5">
              <div className="mb-4 h-1 w-14 bg-[#f48c06]" />
              <h3 className="text-xl font-medium">{offer}</h3>
              <p className="mt-2 text-sm text-[rgba(247,247,247,0.72)]">
                Service premium, ponctualité et expérience chauffeur.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section id="tarifs" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Tarifs</h2>
          <p className="mt-2 text-[rgba(247,247,247,0.72)]">
            Le prix final dépend de la durée, de l’itinéraire et des options.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricing.map((item) => (
            <article key={item.title} className="surface-card rounded-2xl p-5">
              <h3 className="text-lg font-medium">{item.title}</h3>
              <p className="mt-2 text-2xl font-semibold text-[#ffba08]">{item.priceRange}</p>
              <p className="mt-2 text-sm text-[rgba(247,247,247,0.72)]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="surface-card rounded-2xl p-5 sm:p-6">
          <h2 className="text-2xl font-semibold">Formules</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {formules.map((item) => (
              <span key={item} className="rounded-full border border-white/20 px-4 py-2 text-sm">
                {item}
              </span>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[#faa307]/45 bg-[rgba(250,163,7,0.08)] p-4 text-sm">
              <p className="font-medium">Avec chauffeur</p>
              <p className="mt-1 text-[rgba(247,247,247,0.72)]">Solution clé en main, confort total.</p>
            </div>
            <div className="rounded-xl border border-white/15 bg-[#040a1e] p-4 text-sm">
              <p className="font-medium">Sans chauffeur</p>
              <p className="mt-1 text-[rgba(247,247,247,0.72)]">Conditions & caution selon dossier.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="rdv" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Points de rendez-vous</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pickupPoints.map((point) => (
            <article key={point.id} className="surface-card rounded-2xl p-5">
              <h3 className="text-lg font-medium">{point.name}</h3>
              <p className="mt-2 text-sm text-[rgba(247,247,247,0.72)]">{point.address}</p>
              <p className="mt-3 text-xs text-[rgba(247,247,247,0.72)]">{point.instruction}</p>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-[#faa307] hover:underline"
              >
                Ouvrir sur Maps
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">Galerie</h2>
          <p className="mt-2 text-[rgba(247,247,247,0.72)]">Aperçu visuel de nos ambiances et véhicules.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((title) => (
            <article key={title} className="surface-card overflow-hidden rounded-2xl">
              <div className="relative h-52">
                <Image
                  src="/gallery-placeholder.svg"
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <p className="px-4 py-3 text-sm text-[rgba(247,247,247,0.9)]">{title}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-semibold sm:text-4xl">FAQ</h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item) => (
            <details key={item.question} className="surface-card rounded-2xl p-4">
              <summary className="cursor-pointer list-none text-base font-medium">{item.question}</summary>
              <p className="mt-3 text-sm text-[rgba(247,247,247,0.72)]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <ReservationSection />

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm text-[rgba(247,247,247,0.72)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            {content.siteName} — {content.zone}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link href="/confidentialite" className="hover:text-white">
              Confidentialité
            </Link>
            <Link href="/conditions" className="hover:text-white">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
