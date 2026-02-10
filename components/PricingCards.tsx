"use client";

import { useState, useRef, useEffect } from "react";
import { prestationPricing, getDepositAmount } from "@/data/pricing";
import PrestationIcon from "@/components/PrestationIcon";

export default function PricingCards() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
      {prestationPricing.map((item, idx) => (
        <PricingCard
          key={item.id}
          item={item}
          isActive={selectedIdx === idx}
          onToggle={() => setSelectedIdx(selectedIdx === idx ? null : idx)}
        />
      ))}
    </div>
  );
}

function PricingCard({
  item,
  isActive,
  onToggle,
}: {
  item: (typeof prestationPricing)[number];
  isActive: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const deposit = getDepositAmount(item.id);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [isActive]);

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={`surface-card relative cursor-pointer rounded-2xl p-6 transition-all duration-300 ${
        isActive
          ? "ring-1 ring-[var(--gold)]/50"
          : "hover:ring-1 hover:ring-[var(--glass-border)]"
      }`}
      data-reveal="up"
    >
      <div className={`absolute top-0 left-4 right-4 h-px transition-all duration-500 ${isActive ? "bg-[var(--gold)]/60" : "bg-transparent"}`} />

      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-300 ${isActive ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"}`}>
          <PrestationIcon name={item.iconName} className="h-4 w-4" />
        </span>
        <h3 className="text-lg font-semibold">{item.title}</h3>
      </div>

      <p className={`mt-3 text-3xl font-extrabold transition-colors duration-300 ${isActive ? "text-[var(--gold)]" : "text-white"}`}>
        {item.price} €
      </p>
      <p className="mt-1 text-xs text-[var(--text-muted)]">
        Acompte : {deposit} € (10%)
      </p>

      <p className="mt-3 text-sm text-[var(--text-muted)]">{item.description}</p>

      <div
        style={{ maxHeight: isActive ? `${height}px` : "0px" }}
        className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? "mt-4 opacity-100" : "opacity-0"}`}
      >
        <div ref={contentRef}>
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
}
