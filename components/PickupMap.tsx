"use client";

import { useEffect, useRef, useState } from "react";

interface MapPoint {
  name: string;
  address: string;
  lat: number;
  lng: number;
}

declare global {
  interface Window {
    L: any;
  }
}

export default function PickupMap({ points }: { points: MapPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.crossOrigin = "";
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.crossOrigin = "";
    script.onload = () => {
      if (!containerRef.current || !window.L) return;

      const L = window.L;

      // Centre between all points
      const avgLat = points.reduce((s, p) => s + p.lat, 0) / points.length;
      const avgLng = points.reduce((s, p) => s + p.lng, 0) / points.length;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
      }).setView([avgLat, avgLng], 11);

      // Dark-themed tiles
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
          maxZoom: 18,
        }
      ).addTo(map);

      // Custom gold marker icon
      const goldIcon = L.divIcon({
        className: "",
        html: `<div style="width:28px;height:28px;background:#d4af37;border:3px solid #250902;border-radius:50%;box-shadow:0 0 12px rgba(212,175,55,0.5);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:#250902;border-radius:50%;"></div></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
        popupAnchor: [0, -16],
      });

      points.forEach((point) => {
        L.marker([point.lat, point.lng], { icon: goldIcon })
          .addTo(map)
          .bindPopup(
            `<div style="font-family:system-ui;"><strong style="color:#250902;">${point.name}</strong><br/><span style="color:#555;font-size:12px;">${point.address}</span></div>`
          );
      });

      mapInstanceRef.current = map;
      setLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [points]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--glass-border)]">
      {!loaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[var(--rich-mahogany)]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--gold)] border-t-transparent" />
        </div>
      )}
      <div
        ref={containerRef}
        className="h-[380px] w-full sm:h-[420px]"
        style={{ background: "#1a0a04" }}
      />
    </div>
  );
}
