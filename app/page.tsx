import Image from "next/image";
import Link from "next/link";
import ReservationSection from "@/components/ReservationSection";
import ScrollReveal from "@/components/ScrollReveal";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";
import { pricing } from "@/data/pricing";

export default function Home() {
  const offers = [
    {
      title: "Mariage",
      desc: "Sublimez votre jour J avec un transport d'exception.",
      icon: "\u2764",
    },
    {
      title: "EVG / EVJF",
      desc: "Fete inoubliable entre amis, en grand style.",
      icon: "\u{1F389}",
    },
    {
      title: "Anniversaire / Soiree privee",
      desc: "Celebrez avec luxe, elegance et raffinement.",
      icon: "\u{1F382}",
    },
    {
      title: "Ceremonies familiales",
      desc: "Bapteme, communion ou evenement familial prestigieux.",
      icon: "\u{1F3DB}",
    },
    {
      title: "Forfait soiree (3-4h)",
      desc: "Transport VIP de A a Z pour votre soiree.",
      icon: "\u{1F319}",
    },
    {
      title: "Sur mesure",
      desc: "Nous concevons votre experience personnalisee.",
      icon: "\u2728",
    },
  ];

  const stats = [
    { value: "150+", label: "Vehicules haut de gamme" },
    { value: "8 000+", label: "Clients satisfaits" },
    { value: "200+", label: "Partenariats entreprises" },
    { value: "10+", label: "Annees d'experience" },
    { value: "4.9", label: "Note moyenne client" },
  ];

  const formules = [
    "A l'heure",
    "Demi-journee",
    "Journee",
    "Evenement",
  ];

  const gallery = [
    "Limousine Executive",
    "Berline Prestige",
    "SUV Elegance",
    "Pack Ceremonie",
    "Ambiance VIP",
    "Entree evenement",
  ];

  const faqItems = [
    {
      question: "Comment reserver ?",
      answer:
        "Selectionnez votre prestation, renseignez la date et vos coordonnees, puis payez l'acompte en ligne.",
    },
    {
      question: "Paiement",
      answer: "Acompte en ligne par carte via Stripe.",
    },
    {
      question: "Quand sommes-nous confirmes ?",
      answer:
        "Apres paiement de l'acompte et validation manuelle de votre demande par notre equipe.",
    },
    {
      question: "Annulation / acompte",
      answer:
        "Le detail est defini dans nos conditions de reservation.",
    },
    {
      question: "Sans chauffeur : caution / documents",
      answer:
        "Le dossier est etudie au cas par cas, avec pieces justificatives et caution.",
    },
    {
      question: "Zone desservie",
      answer: "Vercel-Villedieu-le-Camp et alentours.",
    },
  ];

  return (
    <main className="min-h-screen text-[var(--text-primary)] selection:bg-[var(--brown-red)] selection:text-white">
      <ScrollReveal />

      {/* ===================== HEADER ===================== */}
      <header className="sticky top-0 z-50 border-b border-[var(--glass-border)] bg-[var(--rich-mahogany)]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-base font-bold tracking-wide text-white sm:text-lg"
          >
            {content.siteName}
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-[var(--text-muted)] md:flex">
            <a href="#offres" className="hover:text-white transition-colors">
              Offres
            </a>
            <a href="#tarifs" className="hover:text-white transition-colors">
              Tarifs
            </a>
            <a href="#rdv" className="hover:text-white transition-colors">
              Points RDV
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`tel:${content.phone}`}
              className="hidden text-sm text-[var(--text-muted)] hover:text-white sm:inline transition-colors"
            >
              Appeler
            </a>
            <a
              href={content.whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden rounded-full border border-[var(--glass-border)] bg-white/5 px-3 py-1 text-sm text-[var(--text-primary)] backdrop-blur-md sm:inline hover:bg-white/10 transition"
            >
              WhatsApp
            </a>
            <a
              href="#reservation"
              className="btn-primary rounded-full px-5 py-2 text-sm font-semibold transition"
            >
              Reserver
            </a>
          </div>
        </div>
      </header>

      {/* ===================== HERO ===================== */}
      <section className="relative overflow-hidden">
        {/* Background orbs */}
        <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-[var(--brown-red)]/20 blur-[100px]" />
        <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-[var(--dark-wine)]/25 blur-[120px]" />

        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 pb-10 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:pt-16">
          <div className="flex flex-col justify-center" data-reveal>
            <span className="mb-4 inline-flex w-fit rounded-full border border-[var(--glass-border)] bg-white/5 px-4 py-1.5 text-sm tracking-wide text-[var(--text-muted)] backdrop-blur-sm">
              Acompte en ligne &mdash; Confirmation rapide
            </span>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] sm:text-5xl md:text-6xl">
              Location limousine
              <br />
              <span className="bg-gradient-to-r from-[var(--brown-red)] to-[var(--dark-wine)] bg-clip-text text-transparent">
                voiture de prestige
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-lg text-[var(--text-muted)]">
              Vercel-Villedieu-le-Camp & alentours &mdash; Avec ou sans
              chauffeur
            </p>

            <ul className="mt-6 space-y-2 text-[var(--text-muted)]">
              {["Acompte en ligne", "Confirmation rapide", "Prestations evenementielles"].map(
                (txt) => (
                  <li key={txt} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brown-red)]" />
                    {txt}
                  </li>
                )
              )}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#reservation"
                className="btn-primary rounded-full px-7 py-3 text-sm font-semibold transition"
              >
                Reserver maintenant
              </a>
              <a
                href="#tarifs"
                className="btn-secondary rounded-full px-7 py-3 text-sm font-semibold transition"
              >
                Voir les tarifs
              </a>
            </div>
          </div>

          {/* Hero image bento card */}
          <div
            className="surface-card relative h-[430px] overflow-hidden rounded-3xl sm:h-[500px]"
            data-reveal
          >
            <Image
              src="https://images.pexels.com/photos/9151813/pexels-photo-9151813.jpeg"
              alt="Limousine de prestige"
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
              priority
            />
            {/* Glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--rich-mahogany)]/90 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-sm font-medium text-[var(--text-muted)]">
                Vehicule d'exception
              </p>
              <p className="mt-1 text-2xl font-bold text-white">
                Elegance & Confort
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STATS BENTO ===================== */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" data-reveal>
        <div className="surface-card grid gap-5 rounded-3xl p-6 text-center sm:grid-cols-5">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-white">{s.value}</p>
              <p className="text-sm text-[var(--text-muted)]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== OFFRES BENTO GRID ===================== */}
      <section
        id="offres"
        className="mx-auto max-w-7xl px-4 pb-8 pt-20 sm:px-6 lg:px-8"
      >
        <div className="mb-10" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Nos prestations
          </h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Prestations haut de gamme pour chaque moment important.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, idx) => (
            <article
              key={offer.title}
              className="surface-card group rounded-3xl p-6 transition-transform hover:scale-[1.02]"
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--brown-red)]/15 text-2xl backdrop-blur-sm">
                {offer.icon}
              </span>
              <h3 className="text-xl font-semibold">{offer.title}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {offer.desc}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== TARIFS ===================== */}
      <section
        id="tarifs"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-10" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Tarifs</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Le prix final depend de la duree, de l'itineraire et des options.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricing.map((item, idx) => (
            <article
              key={item.title}
              className="surface-card rounded-3xl p-6 transition-transform hover:scale-[1.02]"
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-3xl font-extrabold text-white">
                {item.priceRange}
              </p>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== FORMULES ===================== */}
      <section
        className="mx-auto max-w-7xl px-4 pb-8 sm:px-6 lg:px-8"
        data-reveal
      >
        <div className="surface-card rounded-3xl p-6 sm:p-8">
          <h2 className="text-2xl font-extrabold">Formules</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {formules.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--glass-border)] bg-white/5 px-5 py-2 text-sm backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[var(--brown-red)]/30 bg-[var(--brown-red)]/10 p-5 text-sm backdrop-blur-sm">
              <p className="font-semibold">Avec chauffeur</p>
              <p className="mt-1 text-[var(--text-muted)]">
                Solution cle en main, confort total.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--glass-border)] bg-white/5 p-5 text-sm backdrop-blur-sm">
              <p className="font-semibold">Sans chauffeur</p>
              <p className="mt-1 text-[var(--text-muted)]">
                Conditions & caution selon dossier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== POINTS RDV ===================== */}
      <section
        id="rdv"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-10" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Points de rendez-vous
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pickupPoints.map((point, idx) => (
            <article
              key={point.id}
              className="surface-card rounded-3xl p-6 transition-transform hover:scale-[1.02]"
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <h3 className="text-lg font-semibold">{point.name}</h3>
              <p className="mt-2 text-sm text-[var(--text-muted)]">
                {point.address}
              </p>
              <p className="mt-3 text-xs text-[var(--text-muted)]">
                {point.instruction}
              </p>
              <a
                href={point.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-[var(--brown-red)] hover:underline"
              >
                Ouvrir sur Maps
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== GALERIE ===================== */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-10" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Galerie</h2>
          <p className="mt-2 text-[var(--text-muted)]">
            Apercu visuel de nos ambiances et vehicules.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((title, idx) => (
            <article
              key={title}
              className="surface-card group overflow-hidden rounded-3xl transition-transform hover:scale-[1.02]"
              data-reveal
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="relative h-52">
                <Image
                  src="/gallery-placeholder.svg"
                  alt={title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <p className="px-5 py-4 text-sm">{title}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section
        id="faq"
        className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-10" data-reveal>
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Questions frequentes
          </h2>
        </div>
        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <details
              key={item.question}
              className="surface-card rounded-3xl p-5 transition-transform hover:scale-[1.005]"
              data-reveal
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <summary className="cursor-pointer list-none text-base font-semibold">
                {item.question}
              </summary>
              <p className="mt-3 text-sm text-[var(--text-muted)]">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ===================== RESERVATION ===================== */}
      <ReservationSection />

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-[var(--glass-border)] py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-[var(--text-muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>
            {content.siteName} &mdash; {content.zone}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions legales
            </Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">
              Confidentialite
            </Link>
            <Link href="/conditions" className="hover:text-white transition-colors">
              Conditions
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
