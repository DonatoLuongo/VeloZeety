"use client";

import { useState, useCallback, useRef } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/lib/zonas-venezuela";
import { env } from "../env.mjs";

const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

export default function MapPickerMap({
  onPositionSelect,
  onSelect,
  controlledPosition,
}: {
  onPositionSelect?: (lat: number, lng: number) => void;
  onSelect?: (lat: number, lng: number) => void;
  controlledPosition?: [number, number] | null;
}) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<[number, number] | null>(null);

  const handleSelect = onPositionSelect || onSelect;
  const currentPosition = controlledPosition ?? selectedPoint;

  const apiKey = typeof process !== "undefined" ? env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" : "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || " ",
    id: "velocity-google-map-picker",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setSelectedPoint([lat, lng]);
      if (handleSelect) handleSelect(lat, lng);
    }
  };

  const confirmSelection = () => {
    if (selectedPoint && handleSelect) {
      handleSelect(selectedPoint[0], selectedPoint[1]);
    }
  };

  if (loadError) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-200">
        <p className="text-slate-600 text-sm text-center px-4">Error al cargar el mapa. Verifica tu API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-slate-100 dark:bg-[#222831]">
        <p className="text-slate-500 text-sm">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex-1 relative">
        <GoogleMap
          mapContainerStyle={MAP_CONTAINER_STYLE}
          center={currentPosition ? { lat: currentPosition[0], lng: currentPosition[1] } : { lat: DEFAULT_MAP_CENTER[0], lng: DEFAULT_MAP_CENTER[1] }}
          zoom={DEFAULT_MAP_ZOOM}
          onLoad={onLoad}
          onClick={handleMapClick}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          }}
        >
          {currentPosition && (
            <Marker position={{ lat: currentPosition[0], lng: currentPosition[1] }} />
          )}
        </GoogleMap>
      </div>

      {/* Confirm button */}
      <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] z-10 relative">
        {currentPosition ? (
          <div className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
              📍 {currentPosition[0].toFixed(4)}, {currentPosition[1].toFixed(4)}
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
