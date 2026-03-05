"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/zonas-venezuela";

function LocationMarker({
  onPosition,
  controlledPosition,
}: {
  onPosition: (lat: number, lng: number) => void;
  controlledPosition?: [number, number] | null;
}) {
  const [internalPosition, setInternalPosition] = useState<[number, number] | null>(DEFAULT_MAP_CENTER);
  const position = controlledPosition ?? internalPosition;
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const next: [number, number] = [lat, lng];
      setInternalPosition(next);
      onPosition(lat, lng);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function MapPickerMap({
  onPositionSelect,
  onSelect,
  controlledPosition,
}: {
  onPositionSelect?: (lat: number, lng: number) => void;
  onSelect?: (lat: number, lng: number) => void;
  controlledPosition?: [number, number] | null;
}) {
  const [ready, setReady] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>(null);

  // Support both prop names
  const handleSelect = onPositionSelect || onSelect;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const L = require("leaflet");
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
    setReady(true);
  }, []);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPoint([lat, lng]);
  };

  const confirmSelection = () => {
    if (selectedPoint && handleSelect) {
      handleSelect(selectedPoint[0], selectedPoint[1]);
    }
  };

  if (!ready) return <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-[#222831] text-slate-500 text-sm">Cargando mapa...</div>;

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative">
        <MapContainer
          center={DEFAULT_MAP_CENTER}
          zoom={DEFAULT_MAP_ZOOM}
          className="h-full w-full"
          zoomControl
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker onPosition={handleMapClick} controlledPosition={controlledPosition ?? selectedPoint} />
        </MapContainer>
      </div>

      {/* Confirm button */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46]">
        {selectedPoint ? (
          <div className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              📍 {selectedPoint[0].toFixed(4)}, {selectedPoint[1].toFixed(4)}
            </p>
            <button
              onClick={confirmSelection}
              className="w-full py-3 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] transition shadow-lg shadow-[#F46E20]/20"
            >
              Confirmar ubicación
            </button>
          </div>
        ) : (
          <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-2">
            Toca el mapa para seleccionar un punto
          </p>
        )}
      </div>
    </div>
  );
}
