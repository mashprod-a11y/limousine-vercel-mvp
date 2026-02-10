export interface PrestationPricing {
  id: string;
  title: string;
  price: number;
  description: string;
  includes: string[];
  icon: string;
}

export const prestationPricing: PrestationPricing[] = [
  {
    id: "mariage",
    title: "Mariage",
    price: 600,
    description: "Sublimez votre jour J avec un transport d'exception.",
    includes: [
      "Décoration du véhicule",
      "Chauffeur en costume",
      "Itinéraire personnalisé",
      "Arrivée et départ cérémonie",
    ],
    icon: "💍",
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
    icon: "🎉",
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
    icon: "🎂",
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
    icon: "🏛",
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
    icon: "🌙",
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
    icon: "✨",
  },
];

/** Retourne le prix d'une prestation par son id */
export function getPrestationPrice(id: string): number {
  return prestationPricing.find((p) => p.id === id)?.price ?? 500;
}

/** Calcule l'acompte (10% du prix) */
export function getDepositAmount(prestationId: string): number {
  const price = getPrestationPrice(prestationId);
  return Math.round(price * 0.1);
}
