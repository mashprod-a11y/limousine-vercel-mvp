export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
  instruction: string;
  lat: number;
  lng: number;
}

export const pickupPoints: PickupPoint[] = [
  {
    id: "chateau-cafe",
    name: "Le Château – Café Vercel",
    address: "12 Rue de la Fontaine, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=12+Rue+de+la+Fontaine+25530+Vercel",
    instruction: "Siège principal Vercel Prestige, face à l'église Sainte-Agathe.",
    lat: 47.1816,
    lng: 6.3935,
  },
  {
    id: "rituel-vercel",
    name: "Le Rituel Lounge Bar Vercel",
    address: "6 Rue de Lanchy, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=6+Rue+de+Lanchy+25530+Vercel",
    instruction: "Prise en charge devant l'établissement.",
    lat: 47.1813,
    lng: 6.3945,
  },
  {
    id: "rituel-valdahon",
    name: "Le Rituel – Bar & Music – Valdahon",
    address: "8 Rue de la Gare, 25800 Valdahon",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=8+Rue+de+la+Gare+25800+Valdahon",
    instruction: "Prise en charge devant l'établissement.",
    lat: 47.1508,
    lng: 6.3347,
  },
];
