"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Bike, Car, ArrowRight, MapPin, Navigation, Clock, DollarSign, Loader2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

// Leaflet map loaded dynamically to avoid SSR issues
const MapPickerMap = dynamic(() => import("@/components/MapPickerMap"), { ssr: false });

// Vehicle configuration
const VEHICLES = [
    { id: "moto", label: "Moto", desc: "Rápido y económico", Icon: Bike, basePrice: 1.5, perKm: 0.4, eta: "3-7 min" },
    { id: "car", label: "Carro", desc: "Cómodo y seguro", Icon: Car, basePrice: 2.5, perKm: 0.7, eta: "5-10 min" },
] as const;

type VehicleType = typeof VEHICLES[number]["id"];

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function TransportePage() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [vehicle, setVehicle] = useState<VehicleType>("moto");
    const [origin, setOrigin] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [destination, setDestination] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [pickingFor, setPickingFor] = useState<"origin" | "destination" | null>(null);

    // Auto-detect user location as origin
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setOrigin({
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                        address: "Mi ubicación actual",
                    });
                },
                () => {
                    setOrigin({ lat: 10.4806, lng: -66.9036, address: "Caracas, Venezuela" });
                }
            );
        }
    }, []);

    const selectedVehicle = VEHICLES.find((v) => v.id === vehicle)!;
    const distance = origin && destination ? haversineKm(origin.lat, origin.lng, destination.lat, destination.lng) : 0;
    const estimatedPrice = selectedVehicle.basePrice + distance * selectedVehicle.perKm;

    const handleRequestRide = async () => {
        if (!origin || !destination) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("velocity_token");
            const res = await fetch("http://localhost:3001/api/v1/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    serviceId: "transport",
                    originLat: origin.lat,
                    originLng: origin.lng,
                    originAddress: origin.address,
                    destLat: destination.lat,
                    destLng: destination.lng,
                    destAddress: destination.address,
                    vehicleType: vehicle,
                    price: estimatedPrice.toFixed(2),
                }),
            });
            if (res.ok) {
                setStep(3);
            } else {
                alert("Error al solicitar el viaje");
            }
        } catch {
            // Simulación local
            setStep(3);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-56px)] bg-white dark:bg-[#222831] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link href="/app" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition">
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </Link>
                    <h1 className="text-lg font-bold text-[#3F474A] dark:text-white">Solicitar viaje</h1>
                </div>
                <ThemeToggle />
            </div>

            <div className="max-w-2xl mx-auto p-4 md:p-6">
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= s ? "bg-[#F46E20]" : "bg-slate-200 dark:bg-white/10"}`} />
                    ))}
                </div>

                {/* Step 1: Select vehicle */}
                {step === 1 && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-white">¿En qué quieres viajar?</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">Elige tu tipo de vehículo</p>

                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {VEHICLES.map((v) => (
                                <button
                                    key={v.id}
                                    onClick={() => setVehicle(v.id)}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${vehicle === v.id
                                        ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/10 shadow-lg shadow-[#F46E20]/10"
                                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                                        }`}
                                >
                                    <v.Icon className={`w-8 h-8 mb-3 ${vehicle === v.id ? "text-[#F46E20]" : "text-slate-500 dark:text-slate-400"}`} />
                                    <p className="font-bold text-[#3F474A] dark:text-white">{v.label}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{v.desc}</p>
                                    <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400 dark:text-slate-500">
                                        <Clock className="w-3.5 h-3.5" />
                                        <span>{v.eta}</span>
                                        <span className="mx-1">·</span>
                                        <DollarSign className="w-3.5 h-3.5" />
                                        <span>Desde ${v.basePrice.toFixed(2)}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setStep(2)}
                            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] transition shadow-lg shadow-[#F46E20]/20 flex items-center justify-center gap-2"
                        >
                            Continuar <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 2: Set origin and destination */}
                {step === 2 && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-white">¿A dónde vas?</h2>

                        {/* Origin */}
                        <div
                            onClick={() => setPickingFor(pickingFor === "origin" ? null : "origin")}
                            className={`p-4 rounded-xl border bg-white dark:bg-white/5 cursor-pointer transition flex items-center gap-3 ${pickingFor === "origin" ? "border-[#F46E20] ring-2 ring-[#F46E20]/20" : "border-slate-200 dark:border-white/10 hover:border-[#F46E20]/40"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <Navigation className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Origen</p>
                                <p className="text-sm font-semibold text-[#3F474A] dark:text-white truncate">
                                    {origin?.address || "Toca para seleccionar en el mapa"}
                                </p>
                            </div>
                        </div>

                        {/* Inline map for origin */}
                        {pickingFor === "origin" && (
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-in" style={{ height: 350 }}>
                                <MapPickerMap
                                    onSelect={(lat: number, lng: number) => {
                                        setOrigin({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
                                        setPickingFor(null);
                                    }}
                                />
                            </div>
                        )}

                        {/* Destination */}
                        <div
                            onClick={() => setPickingFor(pickingFor === "destination" ? null : "destination")}
                            className={`p-4 rounded-xl border bg-white dark:bg-white/5 cursor-pointer transition flex items-center gap-3 ${pickingFor === "destination" ? "border-[#F46E20] ring-2 ring-[#F46E20]/20" : "border-slate-200 dark:border-white/10 hover:border-[#F46E20]/40"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Destino</p>
                                <p className="text-sm font-semibold text-[#3F474A] dark:text-white truncate">
                                    {destination?.address || "Toca para seleccionar en el mapa"}
                                </p>
                            </div>
                        </div>

                        {/* Inline map for destination */}
                        {pickingFor === "destination" && (
                            <div className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-scale-in" style={{ height: 350 }}>
                                <MapPickerMap
                                    onSelect={(lat: number, lng: number) => {
                                        setDestination({ lat, lng, address: `${lat.toFixed(4)}, ${lng.toFixed(4)}` });
                                        setPickingFor(null);
                                    }}
                                />
                            </div>
                        )}

                        {/* Quote summary */}
                        {origin && destination && (
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Distancia</span>
                                    <span className="font-semibold text-[#3F474A] dark:text-white">{distance.toFixed(1)} km</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Vehículo</span>
                                    <span className="font-semibold text-[#3F474A] dark:text-white capitalize">{vehicle}</span>
                                </div>
                                <div className="flex justify-between text-base pt-2 border-t border-slate-200 dark:border-white/10">
                                    <span className="font-bold text-[#3F474A] dark:text-white">Precio estimado</span>
                                    <span className="font-bold text-[#F46E20]">${estimatedPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500">Se descontará automáticamente de tu billetera VES</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                Atrás
                            </button>
                            <button
                                onClick={handleRequestRide}
                                disabled={!origin || !destination || loading}
                                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] disabled:opacity-50 transition shadow-lg shadow-[#F46E20]/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Solicitar viaje"}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Searching for driver */}
                {step === 3 && (
                    <div className="animate-fade-in-up text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F46E20]/10 flex items-center justify-center">
                            <Loader2 className="w-10 h-10 text-[#F46E20] animate-spin" />
                        </div>
                        <h2 className="text-2xl font-bold text-[#3F474A] dark:text-white mb-2">Buscando conductor...</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-2">Estamos encontrando un {vehicle === "moto" ? "motorizado" : "conductor"} cerca de ti</p>
                        <p className="text-sm text-slate-400 dark:text-slate-500">Tu ubicación se comparte en tiempo real para que el conductor te localice</p>

                        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-xs mx-auto">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-slate-500 dark:text-slate-400">Precio</span>
                                <span className="font-bold text-[#F46E20]">${estimatedPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Vehículo</span>
                                <span className="capitalize font-medium text-[#3F474A] dark:text-white">{vehicle}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => { setStep(1); setDestination(null); }}
                            className="mt-6 px-6 py-2.5 rounded-xl border border-red-200 dark:border-red-500/20 text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-500/5 transition"
                        >
                            Cancelar solicitud
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
