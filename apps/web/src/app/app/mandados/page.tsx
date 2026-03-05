"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
    Package, Truck, ShoppingBag, ArrowRight, MapPin, Navigation,
    DollarSign, Loader2, ChevronLeft, Scale, Ruler, Clock, Info,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const MapPickerMap = dynamic(() => import("@/components/MapPickerMap"), { ssr: false });

// Service types: mandados (small goods) vs fletes (large cargo)
const SERVICE_TYPES = [
    {
        id: "mandado",
        label: "Mandado",
        desc: "Recoger y entregar artículos pequeños",
        Icon: ShoppingBag,
        examples: "Comida, documentos, medicinas, compras",
        vehicleDefault: "moto",
        maxWeight: 10, // kg
    },
    {
        id: "flete",
        label: "Flete",
        desc: "Mudanzas y cargas pesadas",
        Icon: Truck,
        examples: "Muebles, electrodomésticos, materiales",
        vehicleDefault: "truck_350",
        maxWeight: 3500, // kg
    },
] as const;

type ServiceType = typeof SERVICE_TYPES[number]["id"];

const FREIGHT_VEHICLES = [
    { id: "truck_350", label: "Camión 350", capacity: "Hasta 1.5 ton", pricePerKm: 1.2, base: 5 },
    { id: "truck_npr", label: "Camión NPR", capacity: "Hasta 3.5 ton", pricePerKm: 2.0, base: 10 },
] as const;

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function MandadosPage() {
    const [serviceType, setServiceType] = useState<ServiceType>("mandado");
    const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
    const [freightVehicle, setFreightVehicle] = useState<string>("truck_350");
    const [description, setDescription] = useState("");
    const [weight, setWeight] = useState("");
    const [origin, setOrigin] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [destination, setDestination] = useState<{ lat: number; lng: number; address: string } | null>(null);
    const [pickingFor, setPickingFor] = useState<"origin" | "destination" | null>(null);
    const [loading, setLoading] = useState(false);

    const distance = origin && destination ? haversineKm(origin.lat, origin.lng, destination.lat, destination.lng) : 0;

    // Pricing logic
    const calculatePrice = () => {
        if (serviceType === "mandado") {
            const base = 2.0;
            const perKm = 0.5;
            return base + distance * perKm;
        }
        const vehicle = FREIGHT_VEHICLES.find((v) => v.id === freightVehicle)!;
        const weightSurcharge = Number(weight) > 500 ? (Number(weight) - 500) * 0.005 : 0;
        return vehicle.base + distance * vehicle.pricePerKm + weightSurcharge;
    };

    const estimatedPrice = calculatePrice();

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("velocity_token");
            await fetch("http://localhost:3001/requests", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    serviceId: serviceType,
                    originLat: origin?.lat,
                    originLng: origin?.lng,
                    originAddress: origin?.address,
                    destLat: destination?.lat,
                    destLng: destination?.lng,
                    destAddress: destination?.address,
                    freightDetails: serviceType === "flete" ? { vehicleType: freightVehicle, weight: Number(weight), description } : undefined,
                    description: serviceType === "mandado" ? description : undefined,
                    price: estimatedPrice.toFixed(2),
                }),
            });
            setStep(4);
        } catch {
            setStep(4);
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
                    <h1 className="text-lg font-bold text-[#3F474A] dark:text-white">Mandados y Fletes</h1>
                </div>
                <ThemeToggle />
            </div>

            <div className="max-w-2xl mx-auto p-4 md:p-6">
                {/* Progress */}
                <div className="flex items-center gap-2 mb-6">
                    {[1, 2, 3, 4].map((s) => (
                        <div key={s} className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${step >= s ? "bg-[#F46E20]" : "bg-slate-200 dark:bg-white/10"}`} />
                    ))}
                </div>

                {/* Step 1: Service type */}
                {step === 1 && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-white">¿Qué necesitas?</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">La app detecta automáticamente si es un mandado o un flete</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                            {SERVICE_TYPES.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setServiceType(s.id)}
                                    className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${serviceType === s.id
                                        ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/10 shadow-lg shadow-[#F46E20]/10"
                                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                                        }`}
                                >
                                    <s.Icon className={`w-8 h-8 mb-3 ${serviceType === s.id ? "text-[#F46E20]" : "text-slate-500 dark:text-slate-400"}`} />
                                    <p className="font-bold text-[#3F474A] dark:text-white">{s.label}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{s.desc}</p>
                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
                                        <Info className="w-3.5 h-3.5" /> {s.examples}
                                    </p>
                                </button>
                            ))}
                        </div>

                        {/* Freight vehicle selector */}
                        {serviceType === "flete" && (
                            <div className="mt-4 space-y-3">
                                <p className="text-sm font-semibold text-[#3F474A] dark:text-white">Tipo de camión</p>
                                {FREIGHT_VEHICLES.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setFreightVehicle(v.id)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition flex items-center gap-4 ${freightVehicle === v.id
                                            ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/10"
                                            : "border-slate-200 dark:border-white/10"
                                            }`}
                                    >
                                        <Truck className={`w-6 h-6 ${freightVehicle === v.id ? "text-[#F46E20]" : "text-slate-400"}`} />
                                        <div>
                                            <p className="font-semibold text-[#3F474A] dark:text-white">{v.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{v.capacity} · Desde ${v.base}/viaje</p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        <button
                            onClick={() => setStep(2)}
                            className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] transition shadow-lg shadow-[#F46E20]/20 flex items-center justify-center gap-2"
                        >
                            Continuar <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {/* Step 2: Details */}
                {step === 2 && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-white">Detalles del {serviceType === "mandado" ? "mandado" : "flete"}</h2>

                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-slate-200 mb-1.5">
                                {serviceType === "mandado" ? "¿Qué necesitas que hagamos?" : "Descripción de la carga"}
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={serviceType === "mandado" ? "Ej: Recoger un paquete en la farmacia y traerlo a mi casa" : "Ej: 2 sofás, 1 nevera, 3 cajas medianas"}
                                rows={3}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#3F474A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition resize-none"
                            />
                        </div>

                        {serviceType === "flete" && (
                            <div>
                                <label className="block text-sm font-medium text-[#3F474A] dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                                    <Scale className="w-4 h-4" /> Peso aproximado (kg)
                                </label>
                                <input
                                    type="number"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    placeholder="Ej: 150"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#3F474A] dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                                />
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep(1)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                Atrás
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!description.trim()}
                                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] disabled:opacity-50 transition shadow-lg shadow-[#F46E20]/20 flex items-center justify-center gap-2"
                            >
                                Continuar <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Origin & Destination + Quote */}
                {step === 3 && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-white">Ruta del {serviceType === "mandado" ? "mandado" : "flete"}</h2>

                        <div
                            onClick={() => setPickingFor(pickingFor === "origin" ? null : "origin")}
                            className={`p-4 rounded-xl border bg-white dark:bg-white/5 cursor-pointer transition flex items-center gap-3 ${pickingFor === "origin" ? "border-[#F46E20] ring-2 ring-[#F46E20]/20" : "border-slate-200 dark:border-white/10 hover:border-[#F46E20]/40"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-500/10 flex items-center justify-center flex-shrink-0">
                                <Navigation className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Recoger en</p>
                                <p className="text-sm font-semibold text-[#3F474A] dark:text-white truncate">{origin?.address || "Toca para seleccionar en el mapa"}</p>
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

                        <div
                            onClick={() => setPickingFor(pickingFor === "destination" ? null : "destination")}
                            className={`p-4 rounded-xl border bg-white dark:bg-white/5 cursor-pointer transition flex items-center gap-3 ${pickingFor === "destination" ? "border-[#F46E20] ring-2 ring-[#F46E20]/20" : "border-slate-200 dark:border-white/10 hover:border-[#F46E20]/40"
                                }`}
                        >
                            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-5 h-5 text-red-500" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Entregar en</p>
                                <p className="text-sm font-semibold text-[#3F474A] dark:text-white truncate">{destination?.address || "Toca para seleccionar en el mapa"}</p>
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

                        {origin && destination && (
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Tipo</span>
                                    <span className="font-semibold text-[#3F474A] dark:text-white capitalize">{serviceType === "mandado" ? "Mandado" : `Flete (${FREIGHT_VEHICLES.find(v => v.id === freightVehicle)?.label})`}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500 dark:text-slate-400">Distancia</span>
                                    <span className="font-semibold text-[#3F474A] dark:text-white">{distance.toFixed(1)} km</span>
                                </div>
                                {serviceType === "flete" && weight && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 dark:text-slate-400">Peso</span>
                                        <span className="font-semibold text-[#3F474A] dark:text-white">{weight} kg</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-base pt-2 border-t border-slate-200 dark:border-white/10">
                                    <span className="font-bold text-[#3F474A] dark:text-white">Precio estimado</span>
                                    <span className="font-bold text-[#F46E20]">${estimatedPrice.toFixed(2)}</span>
                                </div>
                                <p className="text-xs text-slate-400 dark:text-slate-500">Se descontará automáticamente de tu billetera</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={() => setStep(2)} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                                Atrás
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!origin || !destination || loading}
                                className="flex-1 py-3 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] disabled:opacity-50 transition shadow-lg shadow-[#F46E20]/20 flex items-center justify-center gap-2"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Solicitar ${serviceType}`}
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Searching */}
                {step === 4 && (
                    <div className="animate-fade-in-up text-center py-12">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#F46E20]/10 flex items-center justify-center">
                            {serviceType === "mandado"
                                ? <ShoppingBag className="w-10 h-10 text-[#F46E20]" />
                                : <Loader2 className="w-10 h-10 text-[#F46E20] animate-spin" />
                            }
                        </div>
                        <h2 className="text-2xl font-bold text-[#3F474A] dark:text-white mb-2">
                            {serviceType === "mandado" ? "¡Mandado solicitado!" : "Buscando transportista..."}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-2">
                            {serviceType === "mandado"
                                ? "Un motorizado cercano recogerá tu encargo pronto"
                                : "Estamos encontrando un camión disponible para tu flete"
                            }
                        </p>

                        <div className="mt-8 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 max-w-xs mx-auto text-left space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Precio</span>
                                <span className="font-bold text-[#F46E20]">${estimatedPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-500 dark:text-slate-400">Distancia</span>
                                <span className="font-medium text-[#3F474A] dark:text-white">{distance.toFixed(1)} km</span>
                            </div>
                            {description && (
                                <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-white/10">
                                    "{description}"
                                </p>
                            )}
                        </div>

                        <button
                            onClick={() => { setStep(1); setOrigin(null); setDestination(null); setDescription(""); setWeight(""); }}
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
