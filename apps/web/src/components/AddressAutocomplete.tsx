"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Loader2, Navigation } from "lucide-react";

// ─── Nominatim API (OpenStreetMap) — free, no API key needed ───

interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  address?: {
    road?: string;
    neighbourhood?: string;
    suburb?: string;
    city?: string;
    town?: string;
    state?: string;
    country?: string;
  };
}

async function searchAddresses(query: string, userCountry = "ve"): Promise<NominatimResult[]> {
  if (!query || query.length < 2) return [];
  try {
    const params = new URLSearchParams({
      q: query,
      format: "json",
      addressdetails: "1",
      limit: "6",
      countrycodes: userCountry,
      "accept-language": "es",
    });
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
      headers: { "User-Agent": "VeloZeety/1.0 (https://velozeety.com)" },
    });
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function formatAddress(result: NominatimResult): string {
  const a = result.address;
  if (!a) return result.display_name;
  const parts: string[] = [];
  if (a.road) parts.push(a.road);
  if (a.neighbourhood || a.suburb) parts.push(a.neighbourhood || a.suburb || "");
  if (a.city || a.town) parts.push(a.city || a.town || "");
  if (a.state) parts.push(a.state);
  return parts.filter(Boolean).join(", ") || result.display_name;
}

// ─── Component ───

export interface AddressAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  showGeolocate?: boolean;
  countryCode?: string;
}

export default function AddressAutocomplete({
  value,
  onChange,
  placeholder = "Buscar dirección...",
  required,
  className = "",
  showGeolocate = false,
  countryCode = "ve",
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<NominatimResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value || value.length < 2) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchAddresses(value, countryCode);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
      setIsSearching(false);
    }, 400); // 400ms debounce to respect Nominatim rate limits

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, countryCode]);

  // Close dropdown on outside clicks
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setIsGeolocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=es`,
            { headers: { "User-Agent": "VeloZeety/1.0" } }
          );
          const data = await res.json();
          if (data.display_name) {
            onChange(formatAddress(data));
          } else {
            onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        } catch {
          onChange(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        setIsGeolocating(false);
      },
      () => {
        setIsGeolocating(false);
        alert("No se pudo obtener tu ubicación. Verifica los permisos de tu navegador.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [onChange]);

  const selectSuggestion = (result: NominatimResult) => {
    onChange(formatAddress(result));
    setShowDropdown(false);
    setSuggestions([]);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setShowDropdown(true); }}
          placeholder={placeholder}
          required={required}
          className={className}
          style={showGeolocate ? { paddingRight: "3rem" } : undefined}
          autoComplete="off"
        />

        {/* Geolocation button (fixed inside input) */}
        {showGeolocate && (
          <div
            className="absolute right-[6px] top-[6px] bottom-[6px] flex items-center justify-center w-9 rounded-lg bg-[#F46E20]/10 hover:bg-[#F46E20]/20 cursor-pointer transition-colors z-20"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (!isGeolocating) handleGeolocate(); }}
            title="Usar mi ubicación actual"
          >
            {isGeolocating ? (
              <Loader2 className="w-[18px] h-[18px] text-[#F46E20] animate-spin" />
            ) : (
              <Navigation className="w-[18px] h-[18px] text-[#F46E20]" />
            )}
          </div>
        )}

        {/* Searching spinner */}
        {isSearching && !showGeolocate && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown de sugerencias reales */}
      {showDropdown && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-xl shadow-2xl z-50 overflow-hidden max-h-[260px] overflow-y-auto">
          {suggestions.map((s) => {
            const formatted = formatAddress(s);
            const cityState = [s.address?.city || s.address?.town, s.address?.state].filter(Boolean).join(", ");
            return (
              <button
                key={s.place_id}
                type="button"
                className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-start gap-3 border-b border-slate-100 dark:border-white/5 last:border-b-0"
                onMouseDown={(e) => { e.preventDefault(); selectSuggestion(s); }}
              >
                <MapPin className="w-4 h-4 text-[#F46E20] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-semibold truncate leading-tight">{formatted}</p>
                  {cityState && <p className="text-[11px] text-slate-400 mt-0.5 truncate">{cityState}</p>}
                </div>
              </button>
            );
          })}
          <div className="px-4 py-2 bg-slate-50 dark:bg-white/[0.02] border-t border-slate-100 dark:border-white/5">
            <p className="text-[10px] text-slate-400 font-medium">Resultados de OpenStreetMap</p>
          </div>
        </div>
      )}
    </div>
  );
}
