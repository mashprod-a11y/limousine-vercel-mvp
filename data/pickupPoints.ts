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
    id: "gare-vercel",
    name: "Gare de Vercel",
    address: "Place de la Gare, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gare+de+Vercel",
    instruction: "Devant l'entrée principale, zone dépose-minute.",
    lat: 47.1813,
    lng: 6.3945,
  },
  {
    id: "place-mairie",
    name: "Place de la Mairie",
    address: "1 Place de la Mairie, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mairie+Vercel",
    instruction: "Sur le parking visiteurs.",
    lat: 47.1816,
    lng: 6.3939,
  },
  {
    id: "aerodrome-besancon",
    name: "Aérodrome de Besançon-La Vèze",
    address: "La Vèze, 25660",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=A%C3%A9rodrome+de+Besan%C3%A7on+La+V%C3%A8ze",
    instruction: "Devant le terminal aviation d'affaires.",
    lat: 47.2067,
    lng: 5.9892,
  },
  {
    id: "centre-ville",
    name: "Centre-Ville (Église)",
    address: "Rue de l'Église, 25530 Vercel-Villedieu-le-Camp",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Eglise+Vercel",
    instruction: "Arrêt minute face au parvis.",
    lat: 47.1815,
    lng: 6.3935,
  },
  {
    id: "valdahon-gare",
    name: "Gare de Valdahon",
    address: "Avenue de la Gare, 25800 Valdahon",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gare+de+Valdahon",
    instruction: "Prise en charge près de la zone taxi.",
    lat: 47.1508,
    lng: 6.3347,
  },
];
