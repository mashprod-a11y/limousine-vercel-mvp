"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const slides = [
  { src: "/images/image1.jpg", alt: "Vercel Prestige – Limousine de prestige" },
  { src: "/images/image2.jpg", alt: "Vercel Prestige – Nos implantations" },
  { src: "/images/image3.jpg", alt: "Vercel Prestige – Expérience premium" },
];

const INTERVAL = 4000;

export default function HeroSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, INTERVAL);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (idx: number) => {
    setActiveIndex(idx);
    startTimer();
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
      {/* All images always mounted, Ken Burns runs continuously, only opacity toggles */}
      {slides.map((slide, idx) => (
        <div
          key={slide.src}
          className="absolute inset-0"
          style={{
            opacity: idx === activeIndex ? 1 : 0,
            transition: "opacity 1.2s ease-in-out",
            zIndex: idx === activeIndex ? 1 : 0,
          }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            className={`object-cover ken-burns-${idx}`}
            priority={idx === 0}
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/20 to-transparent" />

      {/* Bottom text */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--gold)]">
          Rue du Château, Vercel
        </p>
        <p className="mt-1 text-xl font-bold text-white">
          Élégance et confort
        </p>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex gap-1.5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => goTo(idx)}
            className={`h-1 rounded-full transition-all duration-300 ${
              idx === activeIndex ? "w-6 bg-[var(--gold)]" : "w-1.5 bg-white/30"
            }`}
            aria-label={`Image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
