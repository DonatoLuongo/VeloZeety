"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useJsApiLoader, GoogleMap, OverlayView } from "@react-google-maps/api";
import { env } from "../env.mjs";

const DEFAULT_CENTER = { lat: 10.4806, lng: -66.9036 };
const DEFAULT_ZOOM = 14;
const MAP_CONTAINER_STYLE = { width: "100%", height: "100%" };

interface DriverMarker {
  id: string;
  lat: number;
  lng: number;
  vehicleType: string;
  fullName?: string;
}

// Iconos SVG de Nivel Premium (Basados en las imágenes proporcionadas)
const getSvgIcon = (type: string) => {
  const isMoto = type === "moto";
  const isCar = type === "car";

  let pathContent = "";
  if (isMoto) {
    // Moto con Rayo (Lightning Express)
    pathContent = `
      <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM9 16l1.5-6h7l1.5 6H9z" fill="#F97316"/>
      <path d="M12 2l-2 5h4l-2 5" stroke="#F97316" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="12" cy="5" r="5" fill="#F97316" fill-opacity="0.1"/>
      <path d="M11 3l-1.5 3h3l-1.5 3" stroke="white" stroke-width="1.2" fill="none"/>
    `;
  } else if (isCar) {
    // Auto Moderno
    pathContent = `
      <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" fill="#F97316"/>
    `;
  } else {
    // Camión con Cronómetro (Educational/Freight)
    pathContent = `
      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm12 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="#F97316"/>
      <circle cx="18" cy="5" r="4" fill="white" stroke="#F97316" stroke-width="1.5"/>
      <path d="M18 3v2.5h1.5" stroke="#F97316" stroke-width="1" fill="none"/>
    `;
  }

  const svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40">
    <circle cx="12" cy="12" r="11" fill="white" fill-opacity="0.9" stroke="#F97316" stroke-width="1.5" shadow="0 2px 4px rgba(0,0,0,0.2)"/>
    ${pathContent}
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgStr)}`;
};

export default function GoogleMapView() {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [drivers, setDrivers] = useState<DriverMarker[]>([]);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);

  const apiKey = typeof process !== "undefined" ? env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "" : "";
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey || " ",
    id: "velocity-google-map",
    mapIds: ["VELOCITY_MAP_ID_1"],
  });

  // Geolocalización
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserPos(DEFAULT_CENTER),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // WebSockets para Rastreo
  useEffect(() => {
    const wsUrl = typeof process !== "undefined" ? ((process.env as any).NEXT_PUBLIC_WS_URL || "") : "";

    if (!wsUrl) {
      setDrivers([
        { id: "d1", lat: 10.482, lng: -66.905, vehicleType: "moto", fullName: "Carlos M." },
        { id: "d2", lat: 10.478, lng: -66.901, vehicleType: "car", fullName: "María G." },
        { id: "d3", lat: 10.484, lng: -66.908, vehicleType: "camion", fullName: "José R." },
      ]);
      return;
    }

    try {
      const ws = new WebSocket(wsUrl);
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "driver_locations") {
            setDrivers(data.drivers);
          }
        } catch { }
      };

      ws.onerror = () => {
        setDrivers([
          { id: "d1", lat: 10.482, lng: -66.905, vehicleType: "moto", fullName: "Carlos M." },
          { id: "d2", lat: 10.478, lng: -66.901, vehicleType: "car", fullName: "María G." },
          { id: "d3", lat: 10.484, lng: -66.908, vehicleType: "camion", fullName: "José R." },
        ]);
      };
      return () => ws.close();
    } catch {
      setDrivers([
        { id: "d1", lat: 10.482, lng: -66.905, vehicleType: "moto" },
        { id: "d2", lat: 10.478, lng: -66.901, vehicleType: "car" },
      ]);
    }
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  if (loadError) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1E293B]">
        <p className="text-white text-sm">Error cargando capa cartográfica.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[#1E293B]">
        <div className="w-8 h-8 border-2 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const center = userPos || DEFAULT_CENTER;

  return (
    <div className="absolute inset-0 z-0 bg-[#E2E8F0]">
      <GoogleMap
        mapContainerStyle={MAP_CONTAINER_STYLE}
        center={center}
        zoom={DEFAULT_ZOOM}
        onLoad={onLoad}
        options={{
          mapId: "VELOCITY_MAP_ID_1",
          zoomControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
            { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
            { featureType: "administrative.land_parcel", elementType: "labels.text.fill", stylers: [{ color: "#bdbdbd" }] },
            { featureType: "poi", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
            { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "poi.park", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
            { featureType: "poi.park", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
            { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
            { featureType: "road.arterial", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
            { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#dadada" }] },
            { featureType: "road.highway", elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
            { featureType: "road.local", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
            { featureType: "transit.line", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
            { featureType: "transit.station", elementType: "geometry", stylers: [{ color: "#eeeeee" }] },
            { featureType: "water", elementType: "geometry", stylers: [{ color: "#c9c9c9" }] },
            { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#9e9e9e" }] },
          ],
        }}
      >
        {/* OverlayView para el usuario */}
        {userPos && (
          <OverlayView
            position={userPos}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ transform: "translate(-10px, -10px)", width: 20, height: 20 }} title="Tu ubicación">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                <circle cx="12" cy="12" r="10" fill="#2563EB" stroke="white" strokeWidth="3" />
                <circle cx="12" cy="12" r="18" fill="none" stroke="#2563EB" strokeWidth="2" strokeOpacity="0.4" className="animate-ping" style={{ transformOrigin: 'center' }} />
              </svg>
            </div>
          </OverlayView>
        )}

        {/* OverlayView optimizado con transiciones CSS para evitar el teletransporte brusco */}
        {drivers.map((d) => (
          <OverlayView
            key={d.id}
            position={{ lat: d.lat, lng: d.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div
              style={{
                transform: "translate(-20px, -20px)",
                width: 40,
                height: 40,
                cursor: "pointer",
                transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)" /* Transición fluida clave */
              }}
              title={d.fullName || "Socio Logístico"}
              className="hover:scale-110 active:scale-95 drop-shadow-md z-10"
            >
              <img src={getSvgIcon(d.vehicleType)} alt={d.fullName || "Socio"} width={40} height={40} className="w-full h-full object-contain pointer-events-none" />
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  );
}
