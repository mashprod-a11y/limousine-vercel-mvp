"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";

type ReservationFormState = {
  prestation: string;
  formule: string;
  chauffeur: "avec" | "sans";
  dateMode: "date_unique" | "plage";
  dateStart: string;
  dateEnd: string;
  heureApprox: string;
  pickupPointId: string;
  fullName: string;
  phone: string;
  email: string;
  passengers: string;
  notes: string;
  acceptConditions: boolean;
};

const prestationOptions = [
  { value: "mariage", label: "Mariage" },
  { value: "evg_evjf", label: "EVG / EVJF" },
  { value: "anniversaire_soiree", label: "Anniversaire / soirée privée" },
  { value: "ceremonie_familiale", label: "Cérémonies familiales" },
  { value: "soiree_3_4h", label: "Forfait soirée (3–4h)" },
  { value: "sur_mesure", label: "Sur mesure" },
];

const formuleOptions = [
  { value: "heure", label: "À l'heure" },
  { value: "demi_journee", label: "Demi-journée" },
  { value: "journee", label: "Journée" },
  { value: "evenement", label: "Événement" },
];

const defaultState: ReservationFormState = {
  prestation: "mariage",
  formule: "heure",
  chauffeur: "avec",
  dateMode: "date_unique",
  dateStart: "",
  dateEnd: "",
  heureApprox: "",
  pickupPointId: pickupPoints[0]?.id ?? "",
  fullName: "",
  phone: "",
  email: "",
  passengers: "",
  notes: "",
  acceptConditions: false,
};

function toReadableDate(value: string): string {
  if (!value) return "Date à définir";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" }).format(date);
}

export default function ReservationSection() {
  const [form, setForm] = useState<ReservationFormState>(defaultState);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPickup = useMemo(
    () => pickupPoints.find((point) => point.id === form.pickupPointId),
    [form.pickupPointId],
  );

  const selectedPrestation = useMemo(
    () => prestationOptions.find((option) => option.value === form.prestation)?.label ?? form.prestation,
    [form.prestation],
  );

  const selectedFormule = useMemo(
    () => formuleOptions.find((option) => option.value === form.formule)?.label ?? form.formule,
    [form.formule],
  );

  const summaryDate =
    form.dateMode === "plage"
      ? `${toReadableDate(form.dateStart)} → ${toReadableDate(form.dateEnd)}`
      : toReadableDate(form.dateStart);

  const canSubmit =
    form.acceptConditions &&
    form.fullName.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.dateStart.trim().length > 0 &&
    !isSubmitting;

  const setValue = <K extends keyof ReservationFormState>(field: K, value: ReservationFormState[K]) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!form.fullName.trim()) return "Le nom complet est obligatoire.";
    if (!form.phone.trim()) return "Le téléphone est obligatoire.";
    if (!form.email.trim()) return "L'email est obligatoire.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Veuillez saisir un email valide.";
    if (!form.dateStart) return "La date de début est obligatoire.";

    if (form.dateMode === "plage") {
      if (!form.dateEnd) return "La date de fin est obligatoire pour une plage.";
      if (form.dateEnd < form.dateStart) return "La date de fin doit être supérieure ou égale à la date de début.";
    }

    if (!form.acceptConditions) return "Vous devez accepter les conditions avant de payer l'acompte.";
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Le service de paiement est indisponible.");
      }

      const payload = (await response.json()) as { url?: string };

      if (!payload.url) {
        throw new Error("Session de paiement invalide.");
      }

      window.location.href = payload.url;
    } catch (_error) {
      setErrorMessage("Impossible de lancer le paiement. Merci de réessayer dans un instant.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-2 inline-flex rounded-full border border-[var(--glass-border)] bg-white/5 backdrop-blur-sm px-3 py-1 text-sm text-[var(--text-muted)]">
              Acompte en ligne — Confirmation rapide
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Réservation</h2>
            <p className="mt-2 max-w-2xl text-[var(--text-muted)]">
              La disponibilité est confirmée après validation de votre demande.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="surface-card rounded-3xl p-4 sm:p-6 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
            <div className="space-y-8">
              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Prestation</span>
                  <select
                    name="prestation"
                    value={form.prestation}
                    onChange={(event) => setValue("prestation", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                  >
                    {prestationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Formule</span>
                  <select
                    name="formule"
                    value={form.formule}
                    onChange={(event) => setValue("formule", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                  >
                    {formuleOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <fieldset className="space-y-2 text-sm">
                <legend className="mb-2 text-[var(--text-muted)]">Chauffeur</legend>
                <div className="flex flex-wrap gap-4">
                  <label className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2">
                    <input
                      type="radio"
                      name="chauffeur"
                      checked={form.chauffeur === "avec"}
                      onChange={() => setValue("chauffeur", "avec")}
                    />
                    <span>Avec chauffeur</span>
                  </label>
                  <label className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2">
                    <input
                      type="radio"
                      name="chauffeur"
                      checked={form.chauffeur === "sans"}
                      onChange={() => setValue("chauffeur", "sans")}
                    />
                    <span>Sans chauffeur</span>
                  </label>
                </div>
                {form.chauffeur === "sans" && (
                  <p className="text-xs text-[var(--text-muted)]">Conditions & caution selon dossier.</p>
                )}
              </fieldset>

              <div className="grid gap-4 md:grid-cols-2">
                <fieldset className="space-y-2 text-sm">
                  <legend className="mb-2 text-[var(--text-muted)]">Mode de date</legend>
                  <div className="flex flex-wrap gap-4">
                    <label className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2">
                      <input
                        type="radio"
                        name="dateMode"
                        checked={form.dateMode === "date_unique"}
                        onChange={() => setValue("dateMode", "date_unique")}
                      />
                      <span>Date unique</span>
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-full border border-[var(--glass-border)] px-4 py-2">
                      <input
                        type="radio"
                        name="dateMode"
                        checked={form.dateMode === "plage"}
                        onChange={() => setValue("dateMode", "plage")}
                      />
                      <span>Plage</span>
                    </label>
                  </div>
                </fieldset>

                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Heure approximative</span>
                  <input
                    name="heureApprox"
                    value={form.heureApprox}
                    onChange={(event) => setValue("heureApprox", event.target.value)}
                    placeholder="Ex: 20h, soirée, après-midi"
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Date début</span>
                  <input
                    type="date"
                    name="dateStart"
                    value={form.dateStart}
                    onChange={(event) => setValue("dateStart", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Date fin (si plage)</span>
                  <input
                    type="date"
                    name="dateEnd"
                    value={form.dateEnd}
                    onChange={(event) => setValue("dateEnd", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                    required={form.dateMode === "plage"}
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="text-[var(--text-muted)]">Point de rendez-vous</span>
                <select
                  name="pickupPointId"
                  value={form.pickupPointId}
                  onChange={(event) => setValue("pickupPointId", event.target.value)}
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                >
                  {pickupPoints.map((point) => (
                    <option key={point.id} value={point.id}>
                      {point.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Nom complet</span>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={(event) => setValue("fullName", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Téléphone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={(event) => setValue("phone", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                    required
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={(event) => setValue("email", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                    required
                  />
                </label>
                <label className="space-y-2 text-sm">
                  <span className="text-[var(--text-muted)]">Passagers (optionnel)</span>
                  <input
                    type="number"
                    min={1}
                    name="passengers"
                    value={form.passengers}
                    onChange={(event) => setValue("passengers", event.target.value)}
                    className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                  />
                </label>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="text-[var(--text-muted)]">Notes (optionnel)</span>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={(event) => setValue("notes", event.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-[var(--glass-border)] bg-[var(--rich-mahogany)] px-4 py-3 text-white"
                />
              </label>
            </div>

            <aside className="space-y-4">
              <div className="surface-muted sticky top-24 rounded-2xl p-4 md:p-5">
                <p className="text-sm font-medium text-[var(--text-muted)]">Résumé</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full border border-[var(--glass-border)] px-3 py-1">{selectedPrestation}</span>
                  <span className="rounded-full border border-[var(--glass-border)] px-3 py-1">{selectedFormule}</span>
                  <span className="rounded-full border border-[var(--glass-border)] px-3 py-1">{summaryDate}</span>
                  <span className="rounded-full border border-[var(--glass-border)] px-3 py-1">
                    {selectedPickup?.name ?? "RDV à définir"}
                  </span>
                </div>

                <div className="my-4 accent-line" />

                <p className="text-sm text-[var(--text-muted)]">Acompte fixe</p>
                <p className="text-2xl font-semibold text-white">{content.depositAmount}€</p>

                <p className="mt-3 text-xs text-[var(--text-muted)]">
                  Acompte remboursable selon conditions.{" "}
                  <Link href="/conditions" className="text-[var(--brown-red)] underline-offset-2 hover:underline">
                    Voir les conditions
                  </Link>
                </p>
              </div>

              <label className="inline-flex items-start gap-2 text-sm text-[var(--text-muted)]">
                <input
                  type="checkbox"
                  name="acceptConditions"
                  checked={form.acceptConditions}
                  onChange={(event) => setValue("acceptConditions", event.target.checked)}
                  className="mt-1"
                />
                <span>J'accepte les conditions de réservation.</span>
              </label>

              {errorMessage && (
                <p className="rounded-xl border border-red-400/40 bg-red-900/25 px-3 py-2 text-sm text-red-100">
                  {errorMessage}
                </p>
              )}

              <div className="sticky bottom-3 z-20 rounded-2xl bg-[var(--rich-mahogany)] p-2 sm:p-0 md:static md:bg-transparent md:p-0">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="btn-primary w-full rounded-xl px-4 py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Redirection..." : "Payer l'acompte"}
                </button>
              </div>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
}
