"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { content } from "@/data/content";
import { pickupPoints } from "@/data/pickupPoints";
import { prestationPricing, entreprisePricing } from "@/data/pricing";
import PrestationIcon from "@/components/PrestationIcon";

const allPrestations = [
  ...prestationPricing.map((p) => ({ id: p.id, title: p.title, price: p.price, iconName: p.iconName, description: p.description })),
  { id: entreprisePricing.id, title: entreprisePricing.title, price: entreprisePricing.priceFrom, iconName: entreprisePricing.iconName, description: entreprisePricing.description },
];

type PaymentMode = "acompte" | "total";

type ReservationFormState = {
  prestation: string;
  formule: string;
  chauffeur: "avec" | "sans";
  chauffeurHours: string;
  dateStart: string;
  heureApprox: string;
  pickupPointId: string;
  fullName: string;
  phone: string;
  email: string;
  passengers: string;
  notes: string;
  acceptConditions: boolean;
};

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
  chauffeurHours: "1",
  dateStart: "",
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
  if (!value) return "À définir";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "long", year: "numeric" }).format(date);
}

const CHAUFFEUR_HOURLY_RATE = 50;

export default function ReservationSection() {
  const [form, setForm] = useState<ReservationFormState>(defaultState);
  const [step, setStep] = useState(1);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("acompte");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPricing = useMemo(
    () => allPrestations.find((p) => p.id === form.prestation),
    [form.prestation],
  );

  const basePrice = selectedPricing?.price ?? 500;
  const chauffeurHours = form.chauffeur === "avec" ? Math.max(1, Number(form.chauffeurHours) || 1) : 0;
  const chauffeurExtra = chauffeurHours * CHAUFFEUR_HOURLY_RATE;
  const subtotalPrice = basePrice + chauffeurExtra;
  const fullPaymentDiscount = Math.round(subtotalPrice * 0.1);
  const acomptePreview = Math.round(subtotalPrice * 0.2);
  const totalPrice = paymentMode === "total" ? subtotalPrice - fullPaymentDiscount : subtotalPrice;
  const depositAmount = paymentMode === "total" ? totalPrice : Math.round(totalPrice * 0.2);
  const amountToPay = paymentMode === "total" ? totalPrice : depositAmount;
  const remainingBalance = paymentMode === "total" ? 0 : totalPrice - depositAmount;

  const selectedPickup = useMemo(
    () => pickupPoints.find((p) => p.id === form.pickupPointId),
    [form.pickupPointId],
  );

  const selectedFormuleLabel = useMemo(
    () => formuleOptions.find((o) => o.value === form.formule)?.label ?? form.formule,
    [form.formule],
  );

  const summaryDate = toReadableDate(form.dateStart);

  const canGoStep2 = form.prestation && form.formule && form.dateStart;
  const canSubmit =
    form.acceptConditions &&
    form.fullName.trim().length > 0 &&
    form.phone.trim().length > 0 &&
    form.email.trim().length > 0 &&
    form.dateStart.trim().length > 0 &&
    !isSubmitting;

  const setValue = <K extends keyof ReservationFormState>(field: K, value: ReservationFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = (): string | null => {
    if (!form.fullName.trim()) return "Le nom complet est obligatoire.";
    if (!form.phone.trim()) return "Le téléphone est obligatoire.";
    if (!form.email.trim()) return "L'email est obligatoire.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Veuillez saisir un email valide.";
    if (!form.dateStart) return "La date est obligatoire.";
    if (form.chauffeur === "avec" && (!form.chauffeurHours || Number(form.chauffeurHours) < 1)) {
      return "Veuillez indiquer le nombre d'heures chauffeur (minimum 1h).";
    }
    if (!form.acceptConditions) return "Vous devez accepter les conditions.";
    return null;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    const err = validateForm();
    if (err) { setErrorMessage(err); return; }
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          chauffeurHours,
          chauffeurExtra,
          totalPrice,
          depositAmount: amountToPay,
          paymentMode,
          prestationLabel: selectedPricing?.title,
        }),
      });

      if (!response.ok) throw new Error("Service indisponible.");
      const payload = (await response.json()) as { url?: string };
      if (!payload.url) throw new Error("Session invalide.");
      window.location.href = payload.url;
    } catch {
      setErrorMessage("Impossible de lancer le paiement. Réessayez dans un instant.");
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservation" className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center" data-reveal="up">
          <span className="mb-3 inline-flex rounded-full border border-[var(--gold)]/25 bg-[var(--gold)]/5 px-4 py-1.5 text-sm text-[var(--gold)]">
            Paiement sécurisé · Confirmation rapide
          </span>
          <h2 className="text-3xl font-extrabold sm:text-4xl">Réservation</h2>
          <p className="mx-auto mt-2 max-w-lg text-[var(--text-muted)]">
            Configurez votre prestation et payez en toute sécurité.
          </p>
        </div>

        {/* Progress steps */}
        <div className="mb-8 flex items-center justify-center gap-0" data-reveal="up">
          {["Prestation", "Informations", "Paiement"].map((label, i) => {
            const stepNum = i + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <div key={label} className="flex items-center">
                {i > 0 && <div className={`h-px w-8 sm:w-16 transition-colors duration-300 ${isDone ? "bg-[var(--gold)]" : "bg-[var(--glass-border)]"}`} />}
                <button
                  type="button"
                  onClick={() => { if (isDone || isActive) setStep(stepNum); }}
                  className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-[var(--gold)] text-black"
                      : isDone
                      ? "bg-[var(--gold)]/15 text-[var(--gold)]"
                      : "bg-white/5 text-[var(--text-muted)]"
                  }`}
                >
                  <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                    isActive ? "bg-black/20 text-white" : isDone ? "bg-[var(--gold)]/30" : "bg-white/10"
                  }`}>
                    {isDone ? (
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : stepNum}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <div className="surface-card rounded-2xl p-5 sm:p-7">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                      Choisissez votre prestation
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {allPrestations.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setValue("prestation", p.id)}
                          className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                            form.prestation === p.id
                              ? "border-[var(--gold)] bg-[var(--gold)]/8 ring-1 ring-[var(--gold)]/30"
                              : "border-[var(--glass-border)] bg-white/[0.02] hover:border-[var(--gold)]/30"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${form.prestation === p.id ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"}`}>
                              <PrestationIcon name={p.iconName} className="h-4 w-4" />
                            </span>
                            <span className={`text-sm font-bold ${form.prestation === p.id ? "text-[var(--gold)]" : "text-white"}`}>
                              {p.id === "entreprise" ? `dès ${p.price}` : p.price} €
                            </span>
                          </div>
                          <p className="mt-2 text-sm font-semibold">{p.title}</p>
                          <p className="mt-0.5 text-xs text-[var(--text-muted)]">{p.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Formule</label>
                      <select value={form.formule} onChange={(e) => setValue("formule", e.target.value)} className="input-field">
                        {formuleOptions.map((o) => (<option key={o.value} value={o.value}>{o.label}</option>))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Mode de conduite</label>
                      <div className="flex rounded-lg border border-[var(--glass-border)] p-0.5">
                        {(["avec", "sans"] as const).map((m) => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setValue("chauffeur", m)}
                            className={`flex-1 rounded-md py-2.5 text-xs font-semibold transition-all duration-200 ${
                              form.chauffeur === m
                                ? "bg-[var(--gold)] text-black"
                                : "text-[var(--text-muted)] hover:text-white"
                            }`}
                          >
                            {m === "avec" ? "Avec chauffeur" : "Sans chauffeur"}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {form.chauffeur === "avec" && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Heures chauffeur</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          max={24}
                          value={form.chauffeurHours}
                          onChange={(e) => setValue("chauffeurHours", e.target.value)}
                          className="input-field max-w-[180px]"
                        />
                        <span className="text-xs font-semibold text-[var(--gold)]">50 € / heure</span>
                      </div>
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Date</label>
                      <input type="date" value={form.dateStart} onChange={(e) => setValue("dateStart", e.target.value)} className="input-field" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Heure approximative</label>
                      <input value={form.heureApprox} onChange={(e) => setValue("heureApprox", e.target.value)} placeholder="Ex: 20h, après-midi" className="input-field" />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={!canGoStep2}
                      onClick={() => setStep(2)}
                      className="btn-primary rounded-full px-8 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continuer
                      <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Vos informations</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Nom complet *</label>
                      <input value={form.fullName} onChange={(e) => setValue("fullName", e.target.value)} className="input-field" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Téléphone *</label>
                      <input value={form.phone} onChange={(e) => setValue("phone", e.target.value)} className="input-field" required />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Email *</label>
                      <input type="email" value={form.email} onChange={(e) => setValue("email", e.target.value)} className="input-field" required />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-[var(--text-muted)]">Nombre de passagers</label>
                      <input type="number" min={1} value={form.passengers} onChange={(e) => setValue("passengers", e.target.value)} className="input-field" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-muted)]">Point de rendez-vous</label>
                    <select value={form.pickupPointId} onChange={(e) => setValue("pickupPointId", e.target.value)} className="input-field">
                      {pickupPoints.map((p) => (<option key={p.id} value={p.id}>{p.name}</option>))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--text-muted)]">Notes complémentaires</label>
                    <textarea value={form.notes} onChange={(e) => setValue("notes", e.target.value)} rows={3} className="input-field" placeholder="Demandes particulières, itinéraire souhaité..." />
                  </div>
                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={() => { if (form.fullName && form.phone && form.email) setStep(3); else setErrorMessage("Remplissez les champs obligatoires."); }}
                      className="btn-primary rounded-full px-8 py-3 text-sm font-semibold"
                    >
                      Continuer
                      <svg className="ml-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Vérifiez et confirmez</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      { label: "Prestation", value: selectedPricing?.title },
                      { label: "Formule", value: selectedFormuleLabel },
                      {
                        label: "Chauffeur",
                        value:
                          form.chauffeur === "avec"
                            ? `Avec chauffeur (${chauffeurHours}h)`
                            : "Sans chauffeur",
                      },
                      {
                        label: "Supplément chauffeur",
                        value: form.chauffeur === "avec" ? `+${chauffeurExtra} €` : "0 €",
                      },
                      { label: "Date", value: summaryDate },
                      { label: "Heure", value: form.heureApprox || "Non précisée" },
                      { label: "Point RDV", value: selectedPickup?.name },
                      { label: "Nom", value: form.fullName },
                      { label: "Contact", value: form.email },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-[var(--glass-border)] bg-white/[0.02] p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">{item.label}</p>
                        <p className="mt-0.5 text-sm font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Payment mode choice */}
                  <div>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Mode de paiement</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode("acompte")}
                        className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                          paymentMode === "acompte"
                            ? "border-[var(--gold)] bg-[var(--gold)]/8 ring-1 ring-[var(--gold)]/30"
                            : "border-[var(--glass-border)] bg-white/[0.02] hover:border-[var(--gold)]/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${paymentMode === "acompte" ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"}`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </span>
                          <div>
                            <p className="text-sm font-semibold">Acompte 20%</p>
                            <p className="text-xs text-[var(--text-muted)]">Payez {acomptePreview} € maintenant, le solde le jour J</p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMode("total")}
                        className={`relative rounded-xl border p-4 text-left transition-all duration-200 ${
                          paymentMode === "total"
                            ? "border-[var(--gold)] bg-[var(--gold)]/8 ring-1 ring-[var(--gold)]/30"
                            : "border-[var(--glass-border)] bg-white/[0.02] hover:border-[var(--gold)]/30"
                        }`}
                      >
                        {/* Badge promo */}
                        <span className="absolute -top-2.5 right-3 rounded-full bg-green-500 px-2.5 py-0.5 text-[10px] font-bold text-white">
                          -10% de rabais
                        </span>
                        <div className="flex items-center gap-3">
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${paymentMode === "total" ? "bg-[var(--gold)]/15 text-[var(--gold)]" : "bg-white/5 text-[var(--text-muted)]"}`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                          </span>
                          <div>
                            <p className="text-sm font-semibold">Paiement total</p>
                            <p className="text-xs text-[var(--text-muted)]">
                              <span className="line-through opacity-60">{subtotalPrice} €</span>{" "}
                              <span className="font-bold text-green-400">{subtotalPrice - fullPaymentDiscount} €</span>
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 rounded-xl border border-[var(--glass-border)] bg-white/[0.02] p-4 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.acceptConditions}
                      onChange={(e) => setValue("acceptConditions", e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-[var(--glass-border)] accent-[var(--gold)]"
                    />
                    <span className="text-sm text-[var(--text-muted)]">
                      J&apos;accepte les{" "}
                      <Link href="/conditions" className="link-gold underline-offset-2 hover:underline">conditions de réservation</Link>.
                    </span>
                  </label>

                  {errorMessage && (
                    <p className="rounded-xl border border-red-400/30 bg-red-900/20 px-4 py-2.5 text-sm text-red-200">{errorMessage}</p>
                  )}

                  <div className="flex justify-between">
                    <button type="button" onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-[var(--text-muted)] hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="btn-primary rounded-full px-8 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {isSubmitting
                        ? "Redirection vers le paiement..."
                        : paymentMode === "total"
                        ? `Payer ${amountToPay} € (rabais -10%)`
                        : `Payer l'acompte de ${amountToPay} €`}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar summary */}
            <aside>
              <div className="surface-card sticky top-24 rounded-2xl p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Récapitulatif</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--gold)]/15 text-[var(--gold)]">
                        <PrestationIcon name={selectedPricing?.iconName ?? "sparkles"} className="h-4 w-4" />
                      </span>
                      <span className="text-sm font-semibold">{selectedPricing?.title}</span>
                    </div>
                    <span className="text-sm font-bold text-white">{subtotalPrice} €</span>
                  </div>
                  <div className="space-y-1 text-xs text-[var(--text-muted)]">
                    <div className="flex justify-between"><span>Formule</span><span>{selectedFormuleLabel}</span></div>
                    <div className="flex justify-between"><span>Chauffeur</span><span>{form.chauffeur === "avec" ? "Oui" : "Non"}</span></div>
                    {form.chauffeur === "avec" && (
                      <>
                        <div className="flex justify-between"><span>Heures chauffeur</span><span>{chauffeurHours} h</span></div>
                        <div className="flex justify-between"><span>Supplément chauffeur</span><span>+{chauffeurExtra} €</span></div>
                      </>
                    )}
                    <div className="flex justify-between"><span>Date</span><span>{summaryDate}</span></div>
                  </div>
                </div>
                <div className="my-4 accent-line" />

                {/* Payment details only shown at step 3 */}
                {step < 3 ? (
                  <div className="text-center py-2">
                    <p className="text-xs text-[var(--text-muted)]">
                      Le détail du paiement sera affiché à l&apos;étape 3.
                    </p>
                    <p className="mt-1 text-[11px] text-[var(--gold)]">
                      Acompte 20% ou paiement total (-10%)
                    </p>
                  </div>
                ) : paymentMode === "total" ? (
                  <>
                    <div className="flex items-center gap-2 rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-2 mb-3">
                      <svg className="h-4 w-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-xs font-semibold text-green-400">Rabais de {fullPaymentDiscount} € appliqué</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Total à payer</p>
                        <p className="text-2xl font-extrabold text-[var(--gold)]">{totalPrice} €</p>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] line-through">{subtotalPrice} €</p>
                    </div>
                    <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                      Paiement unique. Rien à régler le jour J.{" "}
                      <Link href="/conditions" className="link-gold underline-offset-2 hover:underline">Conditions</Link>
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-[var(--text-muted)]">Acompte (20%)</p>
                        <p className="text-2xl font-extrabold text-[var(--gold)]">{depositAmount} €</p>
                      </div>
                      <p className="text-xs text-[var(--text-muted)]">sur {totalPrice} €</p>
                    </div>
                    <p className="mt-3 text-[11px] text-[var(--text-muted)]">
                      Le solde de {remainingBalance} € est à régler le jour de la prestation.{" "}
                      <Link href="/conditions" className="link-gold underline-offset-2 hover:underline">Conditions</Link>
                    </p>
                  </>
                )}
              </div>
            </aside>
          </div>
        </form>
      </div>
    </section>
  );
}
