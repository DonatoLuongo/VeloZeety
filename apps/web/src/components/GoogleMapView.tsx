"use client";

import { useCallback, useRef } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const DEFAULT_CENTER = { lat: 10.4806, lng: -66.9036 }; // Caracas
const DEFAULT_ZOOM = 12;
const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

export default function GoogleMapView() {
  const mapRef = useRef<google.maps.Map | null>(null);

  const apiKey = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || " ",
    id: "velocity-google-map",
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
        <p className="text-slate-600 text-sm text-center px-4">Error al cargar el mapa. Comprueba tu API key de Google Maps.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-200">
        <p className="text-slate-500 text-sm">Cargando mapa...</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        onLoad={onLoad}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          styles: undefined,
        }}
      >
        <Marker position={DEFAULT_CENTER} title="VeloCity" />
      </GoogleMap>
    </div>
  );
}
