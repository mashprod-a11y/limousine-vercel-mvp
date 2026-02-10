"use client";

import { entreprisePricing } from "@/data/pricing";
import { IconBuilding } from "@/components/Icons";

export default function EntrepriseSection() {
  return (
    <section id="entreprise" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div
        className="surface-card overflow-hidden rounded-2xl"
        data-reveal="up"
      >
        <div className="grid lg:grid-cols-2">
          {/* Left – Info */}
          <div className="p-6 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--gold)]/15 text-[var(--gold)]">
                <IconBuilding className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-2xl font-extrabold">{entreprisePricing.title}</h2>
                <p className="text-xs text-[var(--text-muted)]">Solution dédiée aux professionnels</p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {entreprisePricing.description}
            </p>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Exemples d'événements
              </p>
              <div className="flex flex-wrap gap-2">
                {entreprisePricing.examples.map((ex) => (
                  <span
                    key={ex}
                    className="rounded-full border border-[var(--glass-border)] bg-white/[0.03] px-3 py-1 text-sm text-[var(--text-primary)]"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Inclus dans l'offre
              </p>
              <div className="grid gap-1.5 sm:grid-cols-2">
                {entreprisePricing.includes.map((inc) => (
                  <div key={inc} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <svg className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {inc}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#reservation"
                className="btn-primary rounded-full px-6 py-3 text-sm font-semibold transition"
              >
                Demander un devis
              </a>
              <p className="text-sm text-[var(--text-muted)]">
                À partir de <span className="font-bold text-[var(--gold)]">{entreprisePricing.priceFrom} €</span>
              </p>
            </div>
          </div>

          {/* Right – Visual gradient accent */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/5 via-transparent to-[var(--brown-red)]/10" />
            <div className="flex h-full flex-col items-center justify-center p-10">
              <IconBuilding className="h-24 w-24 text-[var(--gold)]/20" />
              <p className="mt-6 text-center text-lg font-bold text-white/80">
                Une offre sur mesure<br />pour votre entreprise
              </p>
              <p className="mt-2 text-center text-sm text-[var(--text-muted)]">
                Devis personnalisé · Facturation entreprise
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
