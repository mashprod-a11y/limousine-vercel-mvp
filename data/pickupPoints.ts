export interface PickupPoint {
  id: string;
  name: string;
  address: string;
  mapsUrl: string;
  instruction: string;
}

export const pickupPoints: PickupPoint[] = [
  {
    id: "gare-vercel",
    name: "Gare de Vercel",
    address: "Place de la Gare, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gare+de+Vercel",
    instruction: "Devant l'entrée principale, zone dépose-minute.",
  },
  {
    id: "place-mairie",
    name: "Place de la Mairie",
    address: "1 Place de la Mairie, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mairie+Vercel",
    instruction: "Sur le parking visiteurs.",
  },
  {
    id: "aerodrome-besancon",
    name: "Aérodrome de Besançon-La Vèze",
    address: "La Vèze, 25660",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Aérodrome+de+Besançon+La+Vèze",
    instruction: "Devant le terminal aviation d'affaires.",
  },
  {
    id: "centre-ville",
    name: "Centre-Ville (Église)",
    address: "Rue de l'Église, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Eglise+Vercel",
    instruction: "Arrêt minute face au parvis.",
  },
  {
    id: "valdahon-gare",
    name: "Gare de Valdahon",
    address: "Avenue de la Gare, 25800 Valdahon",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gare+de+Valdahon",
    instruction: "Prise en charge près de la zone taxi.",
  },
];
