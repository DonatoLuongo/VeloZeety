"use client";

import { useState, useEffect, useCallback } from "react";

type LocationState = "idle" | "asking" | "loading" | "ready" | "denied" | "error";

type FooterMapProps = {
  onLocation?: (city: string | null) => void;
};

export default function FooterMap({ onLocation }: FooterMapProps) {
  const [state, setState] = useState<LocationState>("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);

  const fetchCityName = useCallback(async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        { headers: { "Accept-Language": "es" } }
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.municipality ||
        data.address?.state ||
        data.address?.county ||
        data.address?.country;
      const name = city || "Tu ubicación";
      setCityName(name);
      onLocation?.(name);
    } catch {
      setCityName("Tu ubicación");
      onLocation?.("Tu ubicación");
    }
  }, [onLocation]);

  const askLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState("error");
      return;
    }
    setState("asking");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lng: longitude });
        setState("loading");
        fetchCityName(latitude, longitude).then(() => setState("ready"));
      },
      () => setState("denied"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [fetchCityName]);

  // Solo pedir ubicación cuando el usuario hace clic en "Permitir ubicación"

  const bbox = coords
    ? `${coords.lng - 0.02},${coords.lat - 0.02},${coords.lng + 0.02},${coords.lat + 0.02}`
    : "";
  const embedUrl =
    coords && state === "ready"
      ? `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`
      : "";

  return (
    <>
      {/* Mapa: pide permiso y muestra zona del usuario */}
      <div className="rounded-xl overflow-hidden border border-white/10 mb-10 h-48 sm:h-56 bg-slate-800">
        {state === "idle" ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-4 bg-slate-800/90">
            <p className="text-white/80 text-sm text-center">
              ¿Permitir ubicación para ver tu zona en el mapa?
            </p>
            <button
              type="button"
              onClick={askLocation}
              className="px-4 py-2 rounded-lg bg-white text-black font-medium text-sm hover:bg-white/90 transition"
            >
              Permitir ubicación
            </button>
          </div>
        ) : state === "asking" ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <span className="text-white/70 text-sm">Comprobando ubicación…</span>
          </div>
        ) : state === "loading" ? (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <span className="text-white/60 text-sm">Cargando mapa…</span>
          </div>
        ) : state === "denied" || state === "error" ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 bg-slate-800">
            <p className="text-white/60 text-sm text-center">
              {state === "denied"
                ? "Ubicación no permitida. Actívala para ver el mapa."
                : "No se pudo obtener la ubicación."}
            </p>
            <button
              type="button"
              onClick={() => { setState("idle"); setCoords(null); setCityName(null); }}
              className="text-sm text-white/80 underline hover:text-white"
            >
              Intentar de nuevo
            </button>
          </div>
        ) : embedUrl ? (
          <iframe
            title="Mapa con tu ubicación"
            src={embedUrl}
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
          />
        ) : null}
      </div>

      <p className="text-xs text-white/50 mb-6">
        <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:text-white/70">
          OpenStreetMap
        </a>
        {cityName && " · Zona mostrada según tu ubicación."}
      </p>
    </>
  );
}

export type { FooterMapProps };
