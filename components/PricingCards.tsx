"use client";

import { useState } from "react";

interface PricingItem {
  title: string;
  priceRange: string;
  description: string;
  includes: string[];
}

const pricingData: PricingItem[] = [
  {
    title: "Mariage",
    priceRange: "400 – 800 €",
    description: "Le grand jour en toute sérénité.",
    includes: ["Décoration véhicule", "Chauffeur en costume", "Itinéraire sur mesure"],
  },
  {
    title: "EVG / EVJF",
    priceRange: "300 – 600 €",
    description: "Une dernière fête inoubliable.",
    includes: ["Ambiance musicale", "Tournée libre", "Capacité groupe"],
  },
  {
    title: "Anniversaire / Soirée privée",
    priceRange: "250 – 500 €",
    description: "Célébrez avec style et luxe.",
    includes: ["Transport aller-retour", "Confort premium", "Discrétion"],
  },
  {
    title: "Cérémonies familiales",
    priceRange: "350 – 700 €",
    description: "Baptême, communion, événements.",
    includes: ["Ponctualité garantie", "Capacité famille", "Service personnalisé"],
  },
  {
    title: "Soirée 3 à 4h",
    priceRange: "600 – 1 000 €",
    description: "Transport VIP toute la soirée.",
    includes: ["Mise à disposition", "Chauffeur dédié", "Itinéraire flexible"],
  },
];

export default function PricingCards() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-stagger>
      {pricingData.map((item, idx) => {
        const isHovered = hoveredIdx === idx;
        return (
          <article
            key={item.title}
            className={`surface-card relative overflow-hidden rounded-3xl p-6 transition-all duration-400 cursor-default ${
              isHovered
                ? "scale-[1.03] ring-1 ring-[var(--gold)]/40"
                : "hover:scale-[1.01]"
            }`}
            data-reveal="up"
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Gold top bar on hover */}
            <div
              className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent transition-all duration-500 ${
                isHovered ? "w-full opacity-100" : "w-0 opacity-0"
              }`}
            />

            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p
              className={`mt-2 text-3xl font-extrabold transition-colors duration-300 ${
                isHovered ? "text-[var(--gold)]" : "text-white"
              }`}
            >
              {item.priceRange}
            </p>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {item.description}
            </p>

            {/* Expanded details on hover */}
            <div
              className={`overflow-hidden transition-all duration-400 ease-out ${
                isHovered ? "mt-4 max-h-48 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="accent-line mb-3" />
              <ul className="space-y-1.5">
                {item.includes.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-center gap-2 text-sm text-[var(--text-muted)]"
                  >
                    <span className="h-1 w-1 rounded-full bg-[var(--gold)]" />
                    {inc}
                  </li>
                ))}
              </ul>
              <a
                href="#reservation"
                className="mt-4 inline-flex rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 px-4 py-2 text-xs font-semibold text-[var(--gold)] transition hover:bg-[var(--gold)]/20"
              >
                Réserver
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}
