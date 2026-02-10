"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds the class `is-visible`
 * to every element with `data-reveal` once it scrolls into the viewport.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const entries = document.querySelectorAll("[data-reveal]");
    if (!entries.length) return;

    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((item) => {
          if (item.isIntersecting) {
            item.target.classList.add("is-visible");
            observer.unobserve(item.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    entries.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
