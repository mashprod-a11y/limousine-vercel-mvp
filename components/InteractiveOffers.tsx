"use client";

import { useState } from "react";
import { prestationPricing } from "@/data/pricing";
import PrestationIcon from "@/components/PrestationIcon";

export default function InteractiveOffers() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-reveal="up">
      {prestationPricing.map((offer) => {
        const isOpen = selectedId === offer.id;
        const hasExtras = offer.extras && offer.extras.length > 0;
        return (
          <div
            key={offer.id}
            className={`surface-card rounded-2xl p-6 text-left cursor-pointer transition-shadow duration-300 ${
              isOpen ? "ring-1 ring-[var(--gold)]/50" : "hover:ring-1 hover:ring-[var(--glass-border)]"
            }`}
            onClick={() => setSelectedId(isOpen ? null : offer.id)}
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                  isOpen ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"
                }`}
              >
                <PrestationIcon name={offer.iconName} className="h-5 w-5" />
              </span>
              <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? "text-[var(--gold)]" : "text-white"}`}>
                {offer.price} €
              </span>
            </div>

            <h3 className={`mt-4 text-lg font-semibold transition-colors duration-300 ${isOpen ? "text-[var(--gold)]" : ""}`}>
              {offer.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{offer.description}</p>

            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? "800px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pt-4">
                {/* Long description if available */}
                {offer.longDescription && (
                  <p className="mb-4 text-xs leading-relaxed text-[var(--text-muted)]">
                    {offer.longDescription}
                  </p>
                )}

                <div className="accent-line mb-3" />
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                  Inclus dans la prestation
                </p>
                <ul className="space-y-1.5">
                  {offer.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                      <svg className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>

                {/* Extras / Options */}
                {hasExtras && (
                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Options personnalisables
                    </p>
                    <ul className="space-y-1.5">
                      {offer.extras!.map((ext) => (
                        <li key={ext} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                          <svg className="h-3.5 w-3.5 shrink-0 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          {ext}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href="#reservation"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/8 px-4 py-2 text-xs font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)]/15"
                  onClick={(e) => e.stopPropagation()}
                >
                  Réserver · {offer.price} €
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
