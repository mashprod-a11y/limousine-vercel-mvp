"use client";

import { useState } from "react";
import { prestationPricing } from "@/data/pricing";
import PrestationIcon from "@/components/PrestationIcon";

export default function InteractiveOffers() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      {prestationPricing.map((offer, idx) => {
        const isSelected = selectedIdx === idx;
        return (
          <div
            key={offer.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedIdx(isSelected ? null : idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIdx(isSelected ? null : idx);
              }
            }}
            className={`surface-card cursor-pointer rounded-2xl p-6 text-left transition-all duration-300 ${
              isSelected
                ? "ring-1 ring-[var(--gold)]/50 bg-[rgba(212,175,55,0.04)]"
                : "hover:ring-1 hover:ring-[var(--glass-border)]"
            }`}
            data-reveal="up"
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300 ${
                  isSelected ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"
                }`}
              >
                <PrestationIcon name={offer.iconName} className="h-5 w-5" />
              </span>
              <span className={`text-lg font-bold transition-colors duration-300 ${isSelected ? "text-[var(--gold)]" : "text-white"}`}>
                {offer.price} €
              </span>
            </div>

            <h3 className={`mt-4 text-lg font-semibold transition-colors duration-300 ${isSelected ? "text-[var(--gold)]" : ""}`}>
              {offer.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--text-muted)]">{offer.description}</p>

            <div
              className={`grid transition-all duration-500 ease-out ${
                isSelected ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
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
