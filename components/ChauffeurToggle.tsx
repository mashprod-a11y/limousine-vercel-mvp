"use client";

import { useState } from "react";

const formules = ["À l'heure", "Demi-journée", "Journée", "Événement"];

export default function ChauffeurToggle() {
  const [mode, setMode] = useState<"avec" | "sans">("avec");

  return (
    <div className="surface-card rounded-3xl p-6 sm:p-8" data-reveal="up">
      <h2 className="text-2xl font-extrabold">Formules</h2>

      <div className="mt-5 flex flex-wrap gap-2">
        {formules.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--glass-border)] bg-white/5 px-5 py-2 text-sm backdrop-blur-sm"
          >
            {item}
          </span>
        ))}
      </div>

      {/* Chauffeur toggle */}
      <p className="mt-6 mb-3 text-sm font-medium text-[var(--text-muted)]">
        Mode de conduite
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setMode("avec")}
          className={`flex-1 rounded-2xl border p-5 text-left transition-all duration-300 ${
            mode === "avec"
              ? "border-[var(--gold)] bg-[var(--gold)]/10 ring-1 ring-[var(--gold)]/30 shadow-lg shadow-[var(--gold)]/5"
              : "border-[var(--glass-border)] bg-white/3 hover:border-[var(--gold)]/30 hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                mode === "avec"
                  ? "border-[var(--gold)] bg-[var(--gold)]"
                  : "border-[var(--glass-border)]"
              }`}
            >
              {mode === "avec" && (
                <span className="h-2 w-2 rounded-full bg-[var(--rich-mahogany)]" />
              )}
            </span>
            <span className="font-semibold">Avec chauffeur</span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-400 ease-out ${
              mode === "avec" ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-[var(--text-muted)]">
              Solution clé en main : chauffeur professionnel, confort total et
              ponctualité garantie.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setMode("sans")}
          className={`flex-1 rounded-2xl border p-5 text-left transition-all duration-300 ${
            mode === "sans"
              ? "border-[var(--gold)] bg-[var(--gold)]/10 ring-1 ring-[var(--gold)]/30 shadow-lg shadow-[var(--gold)]/5"
              : "border-[var(--glass-border)] bg-white/3 hover:border-[var(--gold)]/30 hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-300 ${
                mode === "sans"
                  ? "border-[var(--gold)] bg-[var(--gold)]"
                  : "border-[var(--glass-border)]"
              }`}
            >
              {mode === "sans" && (
                <span className="h-2 w-2 rounded-full bg-[var(--rich-mahogany)]" />
              )}
            </span>
            <span className="font-semibold">Sans chauffeur</span>
          </div>
          <div
            className={`overflow-hidden transition-all duration-400 ease-out ${
              mode === "sans" ? "mt-3 max-h-24 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-sm text-[var(--text-muted)]">
              Conduisez vous-même. Conditions spécifiques, caution et pièces
              justificatives requises.
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}
