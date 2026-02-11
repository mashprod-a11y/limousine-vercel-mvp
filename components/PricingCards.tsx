"use client";

import { useState } from "react";
import { prestationPricing, getDepositAmount } from "@/data/pricing";
import PrestationIcon from "@/components/PrestationIcon";

export default function PricingCards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-reveal="up">
      {prestationPricing.map((item) => {
        const isOpen = selectedId === item.id;
        const deposit = getDepositAmount(item.id);
        const hasExtras = item.extras && item.extras.length > 0;
        const hasPerfectFor = item.perfectFor && item.perfectFor.length > 0;
        return (
          <div
            key={item.id}
            className={`surface-card relative rounded-2xl p-6 cursor-pointer transition-shadow duration-300 ${
              isOpen ? "ring-1 ring-[var(--gold)]/50" : "hover:ring-1 hover:ring-[var(--glass-border)]"
            }`}
            onClick={() => setSelectedId(isOpen ? null : item.id)}
          >
            <div className={`absolute top-0 left-4 right-4 h-px transition-all duration-500 ${isOpen ? "bg-[var(--gold)]/60" : "bg-transparent"}`} />

            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${isOpen ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"}`}>
                <PrestationIcon name={item.iconName} className="h-4 w-4" />
              </span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            <p className={`mt-3 text-3xl font-extrabold transition-colors duration-300 ${isOpen ? "text-[var(--gold)]" : "text-white"}`}>
              {item.price} €
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Acompte : {deposit} € (20%)
            </p>

            <p className="mt-3 text-sm text-[var(--text-muted)]">{item.description}</p>

            {/* Hint to click */}
            <div className={`mt-3 flex items-center gap-1.5 text-xs transition-all duration-300 ${isOpen ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>
              <svg className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-180" : "animate-pulse"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
              <span>{isOpen ? "Réduire" : "Voir le détail"}</span>
            </div>

            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out"
              style={{
                maxHeight: isOpen ? "1000px" : "0px",
                opacity: isOpen ? 1 : 0,
              }}
            >
              <div className="pt-4">
                {item.longDescription && (
                  <p className="mb-3 text-xs leading-relaxed text-[var(--text-muted)] italic">
                    {item.longDescription}
                  </p>
                )}

                <div className="accent-line mb-3" />
                <ul className="space-y-1.5">
                  {item.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                      <svg className="h-3.5 w-3.5 shrink-0 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {inc}
                    </li>
                  ))}
                </ul>

                {hasExtras && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Options</p>
                    <ul className="space-y-1.5">
                      {item.extras!.map((ext) => (
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

                {hasPerfectFor && (
                  <div className="mt-3">
                    <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">Parfait pour</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.perfectFor!.map((pf) => (
                        <span
                          key={pf}
                          className="rounded-full border border-[var(--gold)]/20 bg-[var(--gold)]/5 px-2.5 py-0.5 text-[10px] font-medium text-[var(--gold)]"
                        >
                          {pf}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <a
                  href="#reservation"
                  className="mt-4 inline-flex rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/8 px-4 py-2 text-xs font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)]/15"
                  onClick={(e) => e.stopPropagation()}
                >
                  Réserver · Acompte {deposit} €
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
