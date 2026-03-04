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
  controlledPosition,
}: {
  onPositionSelect: (lat: number, lng: number) => void;
  controlledPosition?: [number, number] | null;
}) {
  const [ready, setReady] = useState(false);

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

  if (!ready) return <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-500 text-sm">Cargando mapa...</div>;

  return (
    <MapContainer
      center={DEFAULT_MAP_CENTER}
      zoom={DEFAULT_MAP_ZOOM}
      className="h-full w-full rounded-xl"
      zoomControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onPosition={onPositionSelect} controlledPosition={controlledPosition} />
    </MapContainer>
  );
}
