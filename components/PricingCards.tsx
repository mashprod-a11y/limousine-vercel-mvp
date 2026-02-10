"use client";

import { useState } from "react";
import { prestationPricing, getDepositAmount } from "@/data/pricing";

export default function PricingCards() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
      {prestationPricing.map((item, idx) => {
        const isActive = selectedIdx === idx;
        const deposit = getDepositAmount(item.id);
        return (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedIdx(isActive ? null : idx)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedIdx(isActive ? null : idx);
              }
            }}
            className={`surface-card relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
              isActive
                ? "ring-1 ring-[var(--gold)]/50"
                : "hover:ring-1 hover:ring-[var(--glass-border)]"
            }`}
            data-reveal="up"
          >
            {/* Top accent */}
            <div className={`absolute top-0 left-4 right-4 h-px transition-all duration-500 ${isActive ? "bg-[var(--gold)]/60" : "bg-transparent"}`} />

            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <h3 className="text-lg font-semibold">{item.title}</h3>
            </div>

            <p className={`mt-3 text-3xl font-extrabold transition-colors duration-300 ${isActive ? "text-[var(--gold)]" : "text-white"}`}>
              {item.price} €
            </p>
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Acompte : {deposit} € (10%)
            </p>

            <p className="mt-3 text-sm text-[var(--text-muted)]">{item.description}</p>

            {/* Expanded */}
            <div className={`grid transition-all duration-500 ease-out ${isActive ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden">
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
