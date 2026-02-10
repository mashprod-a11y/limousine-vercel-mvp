"use client";

import { useEffect } from "react";

/**
 * Observes all elements with `data-reveal` attribute.
 * Supports: data-reveal="up" | "down" | "left" | "right" | "scale" | "fade"
 * Staggers children inside `[data-stagger]` containers automatically via CSS.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-reveal]");
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
