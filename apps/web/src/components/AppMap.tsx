"use client";

import { useEffect, useState, useRef } from "react";

const DEFAULT_CENTER: [number, number] = [10.4806, -66.9036]; // Caracas
const DEFAULT_ZOOM = 14;

interface DriverMarker {
  id: string;
  lat: number;
  lng: number;
  vehicleType: string; // moto | car | truck_350 | truck_npr
  fullName?: string;
}

function LeafletRealtimeMap() {
  const [Mapped, setMapped] = useState<React.ComponentType<any> | null>(null);
  const [drivers, setDrivers] = useState<DriverMarker[]>([]);
  const [userPos, setUserPos] = useState<[number, number] | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // 1. Obtener ubicación del usuario
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => setUserPos(DEFAULT_CENTER),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // 2. Conectar WebSocket para recibir ubicaciones de conductores
  useEffect(() => {
    try {
      const ws = new WebSocket("ws://localhost:3001/tracking");
      wsRef.current = ws;

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "driver_locations") {
            setDrivers(data.drivers);
          }
        } catch { }
      };

      ws.onerror = () => {
        // Simular conductores cercanos cuando no hay backend WS
        setDrivers([
          { id: "d1", lat: 10.482, lng: -66.905, vehicleType: "moto", fullName: "Carlos M." },
          { id: "d2", lat: 10.478, lng: -66.901, vehicleType: "car", fullName: "María G." },
          { id: "d3", lat: 10.484, lng: -66.908, vehicleType: "moto", fullName: "José R." },
          { id: "d4", lat: 10.476, lng: -66.897, vehicleType: "truck_350", fullName: "Pedro L." },
        ]);
      };

      return () => ws.close();
    } catch {
      // Fallback sin WebSocket
      setDrivers([
        { id: "d1", lat: 10.482, lng: -66.905, vehicleType: "moto", fullName: "Carlos M." },
        { id: "d2", lat: 10.478, lng: -66.901, vehicleType: "car", fullName: "María G." },
        { id: "d3", lat: 10.484, lng: -66.908, vehicleType: "moto", fullName: "José R." },
      ]);
    }
  }, []);

  // 3. Cargar Leaflet dinámicamente
  useEffect(() => {
    if (typeof window === "undefined") return;
    require("leaflet/dist/leaflet.css");
    const L = require("leaflet");
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    // Icono personalizado para conductores
    const createIcon = (type: string) => {
      const emoji = type === "moto" ? "🏍️" : type === "car" ? "🚗" : "🚛";
      return L.divIcon({
        html: `<div style="font-size:24px;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3))">${emoji}</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15],
        className: "",
      });
    };

    const userIcon = L.divIcon({
      html: `<div style="width:14px;height:14px;border-radius:50%;background:#F46E20;border:3px solid white;box-shadow:0 0 12px rgba(244,110,32,0.5)"></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
      className: "",
    });

    import("react-leaflet").then((RL) => {
      const { MapContainer, TileLayer, Marker, Popup } = RL;
      const center = userPos || DEFAULT_CENTER;

      setMapped(() => () => (
        <MapContainer center={center} zoom={DEFAULT_ZOOM} className="h-full w-full rounded-2xl" zoomControl={false}>
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {/* Marcador del usuario */}
          {userPos && (
            <Marker position={userPos} icon={userIcon}>
              <Popup>
                <span className="font-semibold text-[#F46E20]">Tu ubicación</span>
              </Popup>
            </Marker>
          )}
          {/* Marcadores de conductores */}
          {drivers.map((d) => (
            <Marker key={d.id} position={[d.lat, d.lng]} icon={createIcon(d.vehicleType)}>
              <Popup>
                <div className="text-sm">
                  <p className="font-bold">{d.fullName || "Conductor"}</p>
                  <p className="text-slate-500 capitalize">{d.vehicleType}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ));
    });
  }, [drivers, userPos]);

  if (!Mapped) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-[#222831] rounded-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#F46E20] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0">
      <Mapped />
    </div>
  );
}

export default function AppMap() {
  return <LeafletRealtimeMap />;
}
