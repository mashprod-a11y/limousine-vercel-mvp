export interface PrestationPricing {
  id: string;
  title: string;
  price: number;
  description: string;
  longDescription?: string;
  includes: string[];
  extras?: string[];
  iconName: string;
}

export const prestationPricing: PrestationPricing[] = [
  {
    id: "mariage",
    title: "Pack Mariage – Arrivée Prestige",
    price: 600,
    description: "Faites de votre arrivée à l'église un moment inoubliable.",
    longDescription:
      "Nous vous proposons un service de limousine avec chauffeur pour sublimer le plus beau jour de votre vie. Élégance, raffinement et discrétion pour une entrée remarquée devant vos proches. Basés à Vercel (25530), nous intervenons dans tout le Doubs.",
    includes: [
      "Arrivée des mariés en limousine avec chauffeur",
      "Décoration extérieure élégante (rubans blancs / option fleurs)",
      "Boisson de bienvenue à bord (champagne ou softs)",
      "Temps dédié pour photos devant l'église",
      "Dépose au lieu de réception",
    ],
    extras: [
      "Panneau \"Just Married\"",
      "Tour romantique après la cérémonie",
      "Transport des parents ou témoins",
      "Mise en scène spéciale pour surprise",
    ],
    iconName: "ring",
  },
  {
    id: "evg_evjf",
    title: "EVG / EVJF",
    price: 450,
    description: "Fête inoubliable entre amis, en grand style.",
    includes: [
      "Ambiance musicale embarquée",
      "Tournée libre",
      "Capacité groupe",
      "Chauffeur dédié",
    ],
    iconName: "party",
  },
  {
    id: "anniversaire_soiree",
    title: "Anniversaire / Soirée privée",
    price: 350,
    description: "Célébrez avec luxe, élégance et raffinement.",
    includes: [
      "Transport aller-retour",
      "Confort premium",
      "Discrétion assurée",
      "Horaires flexibles",
    ],
    iconName: "cake",
  },
  {
    id: "ceremonie_familiale",
    title: "Cérémonies familiales",
    price: 500,
    description: "Baptême, communion ou événement familial prestigieux.",
    includes: [
      "Ponctualité garantie",
      "Capacité famille",
      "Service personnalisé",
      "Décoration possible",
    ],
    iconName: "temple",
  },
  {
    id: "soiree_3_4h",
    title: "Forfait soirée (3 à 4h)",
    price: 800,
    description: "Mise à disposition VIP toute la soirée.",
    includes: [
      "Véhicule à disposition 3 à 4h",
      "Chauffeur dédié",
      "Itinéraire flexible",
      "Ambiance sonore",
    ],
    iconName: "moon",
  },
  {
    id: "sur_mesure",
    title: "Sur mesure",
    price: 500,
    description: "Nous concevons votre expérience personnalisée.",
    includes: [
      "Devis sur mesure",
      "Itinéraire à la carte",
      "Options personnalisables",
      "Contact dédié",
    ],
    iconName: "sparkles",
  },
];

/** Prestation spéciale Entreprises / Corporate */
export interface EntreprisePricing {
  id: string;
  title: string;
  priceFrom: number;
  description: string;
  examples: string[];
  includes: string[];
  iconName: string;
}

export const entreprisePricing: EntreprisePricing = {
  id: "entreprise",
  title: "Offre Entreprises",
  priceFrom: 500,
  description:
    "Une offre dédiée aux professionnels, entièrement personnalisable selon vos besoins corporate.",
  examples: [
    "Fête d'entreprise",
    "Soirée de fin d'année",
    "Séminaire",
    "Team building",
    "Transport clients VIP",
    "Lancement de produit",
  ],
  includes: [
    "Devis personnalisé",
    "Facturation entreprise",
    "Chauffeur en costume",
    "Flotte adaptée au groupe",
    "Coordination événementielle",
    "Contact dédié",
  ],
  iconName: "building",
};

/** Retourne le prix d'une prestation par son id */
export function getPrestationPrice(id: string): number {
  if (id === "entreprise") return entreprisePricing.priceFrom;
  return prestationPricing.find((p) => p.id === id)?.price ?? 500;
}

/** Calcule l'acompte (20% du prix) */
export function getDepositAmount(prestationId: string): number {
  const price = getPrestationPrice(prestationId);
  return Math.round(price * 0.2);
}
