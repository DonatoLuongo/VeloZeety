"use client";

import { useState, useEffect, useRef } from "react";
import { Navigation, Loader2, MapPin } from "lucide-react";

// --- Mock address suggestions (simulando una API de geocodificación) ---
export const MOCK_ADDRESSES: Record<string, string[]> = {
  "": [],
  "ca": ["Calle Bolívar, Centro, Caracas", "Calle Miranda, Los Palos Grandes, Caracas", "Calle Sucre, El Paraíso, Caracas", "Carretera Panamericana, San Antonio de Los Altos", "Cabudare, Av. Intercomunal, Lara"],
  "av": ["Av. Libertador, Chacao, Caracas", "Av. Francisco de Miranda, Caracas", "Av. Las Mercedes, Las Mercedes, Caracas", "Av. Bolívar, Valencia, Carabobo", "Av. Universidad, Los Chaguaramos, Caracas"],
  "ce": ["C.C. Sambil, Chacao, Caracas", "Centro Comercial Tolón, Las Mercedes", "Centro Empresarial La Hoyada, Caracas", "Centro Médico de Caracas, San Bernardino"],
  "ur": ["Urb. El Cafetal, Baruta, Caracas", "Urb. Santa Fe, Baruta, Caracas", "Urb. Los Samanes, Baruta, Caracas", "Urb. La Trinidad, Caracas"],
  "ma": ["Maracay, Centro, Aragua", "Maiquetía, Vargas", "Maracaibo, Centro, Zulia", "Manzanares, Baruta, Caracas"],
  "va": ["Valencia, Centro, Carabobo", "Valle Arriba, Baruta, Caracas", "Valle de la Pascua, Guárico"],
  "ba": ["Barquisimeto, Centro, Lara", "Baruta, Miranda", "Barcelona, Anzoátegui"],
  "ch": ["Chacao, Caracas", "Chacaíto, Caracas", "Charallave, Miranda"],
  "sa": ["San Antonio de Los Altos, Miranda", "Santa Rosalía, Caracas", "Sabana Grande, Caracas", "San Cristóbal, Táchira"],
  "lo": ["Los Palos Grandes, Caracas", "Los Chaguaramos, Caracas", "Los Teques, Miranda", "Los Dos Caminos, Caracas"],
  "el": ["El Hatillo, Miranda", "El Paraíso, Caracas", "El Cafetal, Baruta", "El Marqués, Caracas"],
  "la": ["Las Mercedes, Caracas", "La Trinidad, Caracas", "La Candelaria, Caracas", "La Urbina, Caracas"],
  "pu": ["Puerto Ordaz, Bolívar", "Puerto La Cruz, Anzoátegui", "Pueblo Nuevo, Barquisimeto"],
};

export function getAddressSuggestions(query: string): string[] {
  if (!query || query.length < 2) return [];
  const q = query.toLowerCase().trim();
  // Find matching prefix
  for (const prefix of Object.keys(MOCK_ADDRESSES).sort((a, b) => b.length - a.length)) {
    if (q.startsWith(prefix) && prefix.length > 0) {
      return MOCK_ADDRESSES[prefix].filter(a => a.toLowerCase().includes(q));
    }
  }
  // Fallback: search all addresses
  const all = Object.values(MOCK_ADDRESSES).flat();
  return all.filter(a => a.toLowerCase().includes(q)).slice(0, 5);
}

interface AddressInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  required?: boolean;
  className: string;
  showGeolocate?: boolean;
  onGeolocate?: () => void;
  isGeolocating?: boolean;
}

export default function AddressInput({ value, onChange, placeholder, required, className, showGeolocate, onGeolocate, isGeolocating }: AddressInputProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && value.length >= 2) {
      const results = getAddressSuggestions(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [value, isFocused]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full z-10">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        placeholder={placeholder}
        required={required}
        className={className}
        autoComplete="off"
      />
      {showGeolocate && (
        <button
          type="button"
          onClick={onGeolocate}
          disabled={isGeolocating}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
          title="Usar mi ubicación actual"
        >
          {isGeolocating ? (
            <Loader2 className="w-5 h-5 text-[#F46E20] animate-spin" />
          ) : (
            <Navigation className="w-5 h-5 text-slate-400 hover:text-[#F46E20] transition-colors" />
          )}
        </button>
      )}

      {/* Dropdown de sugerencias */}
      {showSuggestions && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              className="w-full text-left px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-slate-100 dark:border-white/5 last:border-b-0"
              onMouseDown={(e) => {
                e.preventDefault();
                onChange(s);
                setShowSuggestions(false);
              }}
            >
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span className="truncate">{s}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
