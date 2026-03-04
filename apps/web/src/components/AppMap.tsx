"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DEFAULT_CENTER: [number, number] = [10.4806, -66.9036]; // Caracas
const DEFAULT_ZOOM = 12;

const GoogleMapView = dynamic(() => import("@/components/GoogleMapView"), { ssr: false });

function LeafletMap() {
  const [Mapped, setMapped] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    require("leaflet/dist/leaflet.css");
    const L = require("leaflet");
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
    import("react-leaflet").then((RL) => {
      const { MapContainer, TileLayer, Marker } = RL;
      setMapped(() => () => (
        <MapContainer center={DEFAULT_CENTER} zoom={DEFAULT_ZOOM} className="h-full w-full" zoomControl>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png"
          />
          <Marker position={DEFAULT_CENTER} />
        </MapContainer>
      ));
    });
  }, []);

  if (!Mapped) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
        <p className="text-slate-500 text-sm">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Mapped />
    </div>
  );
}

/** Si existe NEXT_PUBLIC_GOOGLE_MAPS_API_KEY usa Google Maps (calles, negocios, etc.). Si no, usa Leaflet + CartoDB. */
export default function AppMap() {
  const useGoogleMaps = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (useGoogleMaps) {
    return <GoogleMapView />;
  }

  return <LeafletMap />;
}
