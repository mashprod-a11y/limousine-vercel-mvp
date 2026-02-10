"use client";

import { useState } from "react";
import { pickupPoints } from "@/data/pickupPoints";
import { content } from "@/data/content";

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Validation basique
    if (data.dateMode === "plage" && data.dateEnd < data.dateStart) {
      setError("La date de fin doit être après la date de début.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de la session de paiement.");
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="reservation" className="py-20 bg-inkBlack relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[rgba(55,6,23,0.35)] border border-[rgba(255,186,8,0.18)] rounded-2xl p-6 md:p-10 backdrop-blur-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-white mb-4">Réserver votre Limousine</h2>
            <p className="text-gray-400">
              Acompte de {content.depositAmount}€ requis pour bloquer la date.
              <br />
              <span className="text-sm text-amberFlame">Confirmation rapide après paiement.</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Choix de la prestation */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">1. Votre besoin</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Type d'événement</label>
                  <select
                    name="prestation"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  >
                    <option value="mariage">Mariage</option>
                    <option value="evg_evjf">EVG / EVJF</option>
                    <option value="anniversaire_soiree">Anniversaire / Soirée privée</option>
                    <option value="ceremonie_familiale">Cérémonie familiale</option>
                    <option value="soiree_3_4h">Forfait Soirée (3–4h)</option>
                    <option value="sur_mesure">Sur mesure</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Formule</label>
                  <select
                    name="formule"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  >
                    <option value="heure">À l'heure</option>
                    <option value="demi_journee">Demi-journée</option>
                    <option value="journee">Journée complète</option>
                    <option value="evenement">Forfait Événement</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-6 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="chauffeur" value="avec" defaultChecked className="text-amberFlame focus:ring-amberFlame" />
                  <span className="text-gray-300">Avec chauffeur</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="chauffeur" value="sans" className="text-amberFlame focus:ring-amberFlame" />
                  <span className="text-gray-300">Sans chauffeur *</span>
                </label>
              </div>
              <p className="text-xs text-gray-500 italic">* Conditions & caution spécifiques.</p>
            </div>

            {/* 2. Dates et Heure */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">2. Date & Heure</h3>
              
              <div className="flex gap-6 mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="dateMode" value="date_unique" defaultChecked className="text-amberFlame focus:ring-amberFlame" />
                  <span className="text-gray-300">Date unique</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="dateMode" value="plage" className="text-amberFlame focus:ring-amberFlame" />
                  <span className="text-gray-300">Plusieurs jours</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date début</label>
                  <input
                    type="date"
                    name="dateStart"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Date fin (si plage)</label>
                  <input
                    type="date"
                    name="dateEnd"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Heure approx.</label>
                  <input
                    type="text"
                    name="heureApprox"
                    placeholder="Ex: 20h00"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Point de RDV */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">3. Point de Rendez-vous</h3>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Lieu de prise en charge</label>
                <select
                  name="pickupPointId"
                  className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                  required
                >
                  {pickupPoints.map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.name} — {point.address}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">4. Vos coordonnées</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nom complet</label>
                  <input
                    type="text"
                    name="fullName"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Téléphone</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nombre de passagers</label>
                  <input
                    type="number"
                    name="passengers"
                    min="1"
                    className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Notes / Demandes spéciales</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full bg-inkBlack border border-white/20 rounded-lg px-4 py-2.5 text-white focus:border-amberFlame focus:ring-1 focus:ring-amberFlame outline-none"
                ></textarea>
              </div>
            </div>

            {/* Consentement & Action */}
            <div className="pt-4 border-t border-white/10">
              <label className="flex items-start gap-3 cursor-pointer mb-6">
                <input
                  type="checkbox"
                  name="acceptConditions"
                  required
                  className="mt-1 text-amberFlame focus:ring-amberFlame rounded bg-inkBlack border-white/20"
                />
                <span className="text-sm text-gray-400">
                  J'accepte les conditions de réservation et je comprends que l'acompte de {content.depositAmount}€ est requis pour valider ma demande.
                </span>
              </label>

              {error && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500/50 rounded text-red-200 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amberFlame text-inkBlack font-bold text-lg py-4 rounded-lg hover:bg-orange transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,186,8,0.3)] hover:shadow-[0_0_30px_rgba(255,186,8,0.5)]"
              >
                {loading ? "Redirection vers le paiement..." : `Payer l'acompte de ${content.depositAmount}€`}
              </button>
              
              <p className="text-center text-xs text-gray-500 mt-4">
                Paiement sécurisé via Stripe. Aucune donnée bancaire n'est stockée sur ce site.
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
