"use client";

import { useState } from "react";

const formules = ["À l'heure", "Demi-journée", "Journée", "Événement"];

interface Feature {
  label: string;
  avec: boolean | string;
  sans: boolean | string;
}

const features: Feature[] = [
  { label: "Chauffeur professionnel", avec: true, sans: false },
  { label: "Véhicule de prestige", avec: true, sans: true },
  { label: "Décoration possible", avec: true, sans: false },
  { label: "Itinéraire personnalisé", avec: true, sans: "Libre" },
  { label: "Ambiance musicale", avec: true, sans: true },
  { label: "Assurance incluse", avec: true, sans: "Caution requise" },
  { label: "Ponctualité garantie", avec: true, sans: "Selon client" },
  { label: "Pièces justificatives", avec: false, sans: true },
  { label: "Caution obligatoire", avec: false, sans: true },
];

export default function ChauffeurToggle() {
  const [mode, setMode] = useState<"avec" | "sans">("avec");

  return (
    <div className="surface-card rounded-2xl p-6 sm:p-8" data-reveal="up">
      <h2 className="text-2xl font-extrabold">Formules et options</h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {formules.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--glass-border)] bg-white/4 px-4 py-1.5 text-sm"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Toggle buttons */}
      <div className="mt-8 flex rounded-xl border border-[var(--glass-border)] p-1">
        <button
          type="button"
          onClick={() => setMode("avec")}
          className={`flex-1 rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
            mode === "avec"
              ? "bg-[var(--gold)] text-black shadow-lg"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
        >
          Avec chauffeur
        </button>
        <button
          type="button"
          onClick={() => setMode("sans")}
          className={`flex-1 rounded-lg py-3 text-sm font-semibold transition-all duration-300 ${
            mode === "sans"
              ? "bg-[var(--gold)] text-black shadow-lg"
              : "text-[var(--text-muted)] hover:text-white"
          }`}
        >
          Sans chauffeur
        </button>
      </div>

      {/* Comparison table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-[var(--glass-border)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--glass-border)] bg-white/3">
              <th className="px-4 py-3 text-left font-medium text-[var(--text-muted)]">Caractéristique</th>
              <th className={`px-4 py-3 text-center font-medium transition-colors duration-300 ${mode === "avec" ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>
                Avec chauffeur
              </th>
              <th className={`px-4 py-3 text-center font-medium transition-colors duration-300 ${mode === "sans" ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>
                Sans chauffeur
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((f, i) => (
              <tr key={f.label} className={`border-b border-[var(--glass-border)] transition-colors duration-200 ${i % 2 === 0 ? "bg-white/[0.02]" : ""}`}>
                <td className="px-4 py-3 text-[var(--text-primary)]">{f.label}</td>
                <td className="px-4 py-3 text-center">
                  {renderCell(f.avec, mode === "avec")}
                </td>
                <td className="px-4 py-3 text-center">
                  {renderCell(f.sans, mode === "sans")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className={`mt-4 rounded-xl border p-4 transition-all duration-300 ${
        mode === "avec"
          ? "border-[var(--gold)]/30 bg-[var(--gold)]/5"
          : "border-[var(--glass-border)] bg-white/3"
      }`}>
        <p className="text-sm font-semibold">
          {mode === "avec" ? (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              Recommandé
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-[var(--gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" /></svg>
              Conditions spécifiques
            </span>
          )}
        </p>
        <p className="mt-1 text-sm text-[var(--text-muted)]">
          {mode === "avec"
            ? "Service clé en main : votre chauffeur s'occupe de tout. Confort et sérénité garantis."
            : "Vous conduisez vous-même. Caution, pièces justificatives et conditions spécifiques s'appliquent."}
        </p>
      </div>
    </div>
  );
}

function renderCell(value: boolean | string, isHighlighted: boolean) {
  if (value === true) {
    return (
      <span className={`inline-flex items-center justify-center transition-colors duration-300 ${isHighlighted ? "text-[var(--gold)]" : "text-green-400/70"}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center text-[var(--text-muted)]/40">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </span>
    );
  }
  return <span className={`text-xs ${isHighlighted ? "text-[var(--gold)]" : "text-[var(--text-muted)]"}`}>{value}</span>;
}
