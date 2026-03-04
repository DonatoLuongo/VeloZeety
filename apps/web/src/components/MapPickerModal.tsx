"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { MapPin, X, Navigation } from "lucide-react";
import { ZONAS_VELOCITY, DEFAULT_MAP_CENTER } from "@/lib/zonas-venezuela";

const MapPickerMap = dynamic(() => import("@/components/MapPickerMap"), { ssr: false });

type MapPickerModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string, lat: number, lng: number) => void;
};

export default function MapPickerModal({ open, onClose, onSelect }: MapPickerModalProps) {
  const [coords, setCoords] = useState<[number, number]>(DEFAULT_MAP_CENTER);
  const lastCoordsRef = useRef<[number, number]>(DEFAULT_MAP_CENTER);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      const initial = DEFAULT_MAP_CENTER;
      setCoords(initial);
      lastCoordsRef.current = initial;
      setGpsError(null);
    }
  }, [open]);

  const handlePositionSelect = (lat: number, lng: number) => {
    const next: [number, number] = [lat, lng];
    setCoords(next);
    lastCoordsRef.current = next;
    setGpsError(null);
  };

  const handleUseMyLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGpsError("Tu navegador no soporta geolocalización.");
      return;
    }
    setGpsLoading(true);
    setGpsError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const next: [number, number] = [latitude, longitude];
        setCoords(next);
        lastCoordsRef.current = next;
        setGpsLoading(false);
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === 1) setGpsError("Permiso denegado. Activa la ubicación.");
        else if (err.code === 2) setGpsError("Ubicación no disponible. Revisa GPS/conexión.");
        else setGpsError("No se pudo obtener la ubicación.");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  if (!open) return null;

  const handleConfirm = () => {
    const [lat, lng] = lastCoordsRef.current;
    const zone = ZONAS_VELOCITY.find(
      (z) => Math.abs(z.center[0] - lat) < 0.5 && Math.abs(z.center[1] - lng) < 0.5
    );
    const label = zone ? zone.nombre : `Ubicación seleccionada (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    onSelect(label, lat, lng);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-white w-full sm:max-w-lg sm:rounded-2xl shadow-xl flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#0EA5E9]" />
            Señalar ubicación en el mapa
          </h3>
          <button type="button" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" aria-label="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="px-4 pb-2 text-xs text-slate-500">Toca el mapa para marcar o usa tu ubicación actual. Operamos en: Caracas, Valles del Tuy, Barquisimeto, Portuguesa, La Guaira, Guarenas, Guatire, Los Teques, Maracaibo.</p>
        <div className="px-4 pb-2">
          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={gpsLoading}
            className="w-full py-2 rounded-xl border-2 border-[#0EA5E9]/50 bg-[#0EA5E9]/10 text-slate-800 font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#0EA5E9]/20 transition"
          >
            <Navigation className="w-4 h-4" />
            {gpsLoading ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
          </button>
          {gpsError && <p className="text-xs text-red-600 mt-1">{gpsError}</p>}
        </div>
        <div className="flex-1 min-h-[240px] relative px-4 pb-4">
          <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-200">
            <MapPickerMap onPositionSelect={handlePositionSelect} controlledPosition={coords} />
          </div>
        </div>
        <div className="p-4 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 font-medium text-slate-700">
            Cancelar
          </button>
          <button type="button" onClick={handleConfirm} className="flex-1 py-2.5 rounded-xl font-medium text-white" style={{ backgroundColor: "#0EA5E9" }}>
            Usar esta ubicación
          </button>
        </div>
      </div>
    </div>
  );
}
