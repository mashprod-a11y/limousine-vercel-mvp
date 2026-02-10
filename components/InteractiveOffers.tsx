"use client";

import { useState } from "react";

interface Offer {
  title: string;
  desc: string;
  details: string;
  icon: string;
}

const offers: Offer[] = [
  {
    title: "Mariage",
    desc: "Sublimez votre jour J avec un transport d'exception.",
    details:
      "Arrivée en limousine, décoration intérieure, chauffeur en costume. Nous rendons votre cérémonie inoubliable.",
    icon: "❤",
  },
  {
    title: "EVG / EVJF",
    desc: "Fête inoubliable entre amis, en grand style.",
    details:
      "Tournée des bars, transfert discothèque, ambiance sonore embarquée. La soirée commence dès la montée à bord.",
    icon: "🎉",
  },
  {
    title: "Anniversaire / Soirée privée",
    desc: "Célébrez avec luxe, élégance et raffinement.",
    details:
      "Un moment unique pour marquer le coup. Transport privé, confort absolu et discrétion assurée.",
    icon: "🎂",
  },
  {
    title: "Cérémonies familiales",
    desc: "Baptême, communion ou événement familial prestigieux.",
    details:
      "Ajoutez une touche d'élégance à vos cérémonies. Capacité adaptée à votre groupe familial.",
    icon: "🏛",
  },
  {
    title: "Forfait soirée (3 à 4h)",
    desc: "Transport VIP de A à Z pour votre soirée.",
    details:
      "Mise à disposition du véhicule et du chauffeur pendant toute la durée de votre événement nocturne.",
    icon: "🌙",
  },
  {
    title: "Sur mesure",
    desc: "Nous concevons votre expérience personnalisée.",
    details:
      "Un besoin spécifique ? Contactez-nous pour un devis adapté à votre projet, sans engagement.",
    icon: "✨",
  },
];

export default function InteractiveOffers() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      {offers.map((offer, idx) => {
        const isOpen = expandedIdx === idx;
        return (
          <button
            key={offer.title}
            type="button"
            onClick={() => setExpandedIdx(isOpen ? null : idx)}
            className={`surface-card group cursor-pointer rounded-3xl p-6 text-left transition-all duration-300 ${
              isOpen
                ? "ring-2 ring-[var(--gold)]/60 scale-[1.02]"
                : "hover:ring-1 hover:ring-[var(--gold)]/30 hover:scale-[1.01]"
            }`}
            data-reveal="up"
          >
            <span
              className={`mb-3 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all duration-300 ${
                isOpen
                  ? "bg-[var(--gold)]/20 shadow-lg shadow-[var(--gold)]/10"
                  : "bg-[var(--brown-red)]/12 group-hover:bg-[var(--gold)]/12"
              }`}
            >
              {offer.icon}
            </span>
            <h3
              className={`text-xl font-semibold transition-colors duration-300 ${
                isOpen ? "text-[var(--gold)]" : ""
              }`}
            >
              {offer.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              {offer.desc}
            </p>

            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                isOpen ? "mt-3 max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="accent-line mb-3" />
              <p className="text-sm text-[var(--text-primary)]">
                {offer.details}
              </p>
              <span className="mt-3 inline-flex text-xs font-semibold text-[var(--gold)]">
                Réserver cette prestation →
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
