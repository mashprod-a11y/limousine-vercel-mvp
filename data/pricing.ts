export interface PrestationPricing {
  id: string;
  title: string;
  price: number;
  description: string;
  longDescription?: string;
  includes: string[];
  extras?: string[];
  perfectFor?: string[];
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
    title: "EVG / EVJF – Arrivez comme des stars",
    price: 450,
    description: "Un EVJF ou EVG, ça ne se fait pas à moitié.",
    longDescription:
      "Faites monter l'ambiance dès le départ avec une arrivée en limousine à Vercel et dans tout le Doubs. Musique, lumières, champagne… la soirée commence dès que vous montez à bord. Que ce soit pour surprendre la future mariée ou le futur marié, on s'occupe de créer un moment fun, élégant et inoubliable. Parce qu'un enterrement de vie, ça se fête en grand.",
    includes: [
      "Limousine avec chauffeur",
      "Boissons incluses (selon formule)",
      "Ambiance festive à bord",
      "Arrêt photos souvenir",
      "Dépose en centre-ville, restaurant ou soirée privée",
    ],
    iconName: "party",
  },
  {
    id: "anniversaire_soiree",
    title: "Anniversaire / Soirée privée",
    price: 350,
    description: "Ce soir, vous ne sortez pas… Vous arrivez.",
    longDescription:
      "La limousine s'arrête. Les regards se tournent. La musique résonne déjà à l'intérieur. La porte s'ouvre… et la fête commence avant même d'être arrivés.",
    includes: [
      "Aller-retour en limousine avec chauffeur",
      "Ambiance lumineuse et musicale à bord",
      "Boisson de bienvenue selon formule",
      "Confort premium",
      "Arrêt photo stylé",
      "Horaires flexibles pour profiter à fond",
    ],
    perfectFor: [
      "Anniversaire qui marque",
      "Soirée entre amis",
      "Surprise inoubliable",
      "Occasion à célébrer en grand",
    ],
    iconName: "cake",
  },
  {
    id: "ceremonie_familiale",
    title: "Cérémonies familiales",
    price: 500,
    description: "Un moment d'élégance pour toute la famille.",
    longDescription:
      "Baptême, communion, célébration importante… Certains moments méritent une arrivée à la hauteur de l'événement. Imaginez la limousine qui s'arrête devant l'église ou la salle de réception. La famille descend élégamment. Les photos immortalisent un instant unique. Une attention raffinée qui transforme une belle journée en souvenir inoubliable.",
    includes: [
      "Transport en limousine avec chauffeur professionnel",
      "Ponctualité garantie",
      "Capacité adaptée à la famille",
      "Service discret et soigné",
      "Décoration possible selon l'événement",
      "Temps dédié pour photos",
    ],
    iconName: "temple",
  },
  {
    id: "soiree_3_4h",
    title: "Forfait Soirée VIP – 3 à 4h",
    price: 800,
    description: "Ce soir, la limousine est à vous.",
    longDescription:
      "Pendant 3 à 4 heures, profitez d'une mise à disposition exclusive avec chauffeur dédié. Vous décidez du programme, du rythme, des arrêts… la soirée s'adapte à vous. Restaurant, bar, événement privé… vous arrivez et repartez en toute élégance, sans contrainte, sans attente. Liberté. Élégance. Exclusivité.",
    includes: [
      "Limousine mise à disposition pendant 3 à 4h",
      "Chauffeur professionnel et discret",
      "Itinéraire flexible selon vos envies",
      "Ambiance sonore à bord",
      "Confort premium",
      "Arrêts photos possibles",
    ],
    perfectFor: [
      "Soirée d'exception",
      "Groupe d'amis",
      "Événement professionnel",
      "Occasion spéciale à célébrer en grand",
    ],
    iconName: "moon",
  },
  {
    id: "sur_mesure",
    title: "Expérience Sur Mesure",
    price: 500,
    description: "Votre moment, votre règle.",
    longDescription:
      "Vous avez une idée précise ? Ou au contraire… vous voulez quelque chose d'unique que personne d'autre n'aura ? Nous concevons avec vous une expérience totalement personnalisée. Anniversaire surprise, demande particulière, événement confidentiel, expérience romantique ou professionnelle… Nous donnons vie à votre projet. Parce que certains moments ne rentrent pas dans un simple forfait.",
    includes: [
      "Devis entièrement adapté à votre demande",
      "Itinéraire à la carte",
      "Durée flexible",
      "Options personnalisables (boissons, décoration, surprise, arrêts spécifiques…)",
      "Contact dédié pour organiser chaque détail",
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
  longDescription: string;
  examples: string[];
  includes: string[];
  iconName: string;
}

export const entreprisePricing: EntreprisePricing = {
  id: "entreprise",
  title: "Offre Entreprises",
  priceFrom: 500,
  description:
    "Votre événement, notre limousine.",
  longDescription:
    "Événements corporate, soirées VIP, séminaires ou team building… nous vous accompagnons avec un service sur mesure et clé en main. Faites vivre à vos collaborateurs et clients une expérience élégante, flexible et mémorable.",
  examples: [
    "Fête d'entreprise",
    "Soirée de fin d'année",
    "Séminaire",
    "Team building",
    "Transport clients VIP",
    "Lancement de produit",
  ],
  includes: [
    "Chauffeur en costume",
    "Flotte adaptée à votre groupe",
    "Devis et facturation entreprise",
    "Contact dédié pour tout organiser",
    "Coordination complète de l'événement",
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
