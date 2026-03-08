"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
    MapPin, Navigation, Car, Bike, Truck, Calendar, Zap,
    Wallet, Banknote, Smartphone, ArrowRight, ArrowLeft,
    X, CheckCircle2, Boxes, Users, Briefcase, Dog, Clock,
    Loader2,
} from "lucide-react";
import { BRAND } from "@velocity/shared";

// ── Types ──────────────────────────────────────────────────────────────
type VehicleType = "moto" | "carro" | "4x4" | "flete";
type TripMode = "now" | "reserve";
type PaymentMethod = "efectivo" | "pago_movil" | "wallet";

interface NominatimResult {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface TripData {
    pickup: string;
    dropoff: string;
    vehicle: VehicleType;
    mode: TripMode;
    reserveDate?: string;
    reserveTime?: string;
    payment: PaymentMethod;
}

interface Props {
    onClose: () => void;
    onConfirm: (data: TripData) => void;
}

// ── Nominatim autocomplete hook ─────────────────────────────────────────
function useAddressSearch() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<NominatimResult[]>([]);
    const [loading, setLoading] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (query.trim().length < 3) {
            setResults([]);
            return;
        }
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ve&limit=5&accept-language=es`;
                const res = await fetch(url, { headers: { "Accept-Language": "es" } });
                const data: NominatimResult[] = await res.json();
                setResults(data);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 320);
        return () => clearTimeout(timerRef.current);
    }, [query]);

    return { query, setQuery, results, loading, clearResults: () => setResults([]) };
}

// ── Address input with autocomplete ────────────────────────────────────
function AddressInput({
    value, onChange, placeholder, color = "#F46E20",
}: {
    value: string; onChange: (v: string) => void; placeholder: string; color?: string;
}) {
    const { query, setQuery, results, loading, clearResults } = useAddressSearch();
    const [open, setOpen] = useState(false);
    const wrapRef = useRef<HTMLDivElement>(null);

    // Sync external value → input (eg. GPS set)
    useEffect(() => {
        if (value !== query) setQuery(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        setOpen(results.length > 0);
    }, [results]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const pick = (r: NominatimResult) => {
        const short = r.display_name.split(",").slice(0, 3).join(",").trim();
        onChange(short);
        setQuery(short);
        clearResults();
        setOpen(false);
    };

    return (
        <div ref={wrapRef} className="relative">
            <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => { setQuery(e.target.value); onChange(e.target.value); }}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="w-full pl-10 pr-10 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-[#0EA5E9] transition-all text-[15px] shadow-sm"
                    style={{ "--tw-ring-color": color } as React.CSSProperties}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                    {loading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
                    {!loading && query && (
                        <button type="button" onClick={() => { onChange(""); setQuery(""); clearResults(); }} className="text-slate-400 hover:text-slate-600">
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
            {open && (
                <ul className="absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                    {results.map((r) => (
                        <li key={r.place_id}>
                            <button
                                type="button"
                                onMouseDown={() => pick(r)}
                                className="w-full text-left px-4 py-3 text-sm text-slate-700 dark:text-slate-200 hover:bg-[#0EA5E9]/10 flex items-start gap-2.5 transition-colors"
                            >
                                <MapPin className="w-3.5 h-3.5 text-[#F46E20] mt-0.5 shrink-0" />
                                <span className="line-clamp-2 leading-snug">
                                    {r.display_name.split(",").slice(0, 4).join(",")}
                                </span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

// ── GPS Button ──────────────────────────────────────────────────────────
function GpsButton({ onLocation }: { onLocation: (v: string) => void }) {
    const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

    const handleClick = () => {
        if (!navigator.geolocation) { setState("error"); return; }
        setState("loading");
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;
                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=es`
                    );
                    const data = await res.json();
                    const addr = data.display_name?.split(",").slice(0, 3).join(",") ?? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
                    onLocation(addr);
                    setState("done");
                } catch {
                    onLocation(`${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                    setState("done");
                }
            },
            () => setState("error"),
            { enableHighAccuracy: true, timeout: 12000 }
        );
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            disabled={state === "loading"}
            className={`w-full flex items-center justify-center gap-2.5 py-3 rounded-2xl border-2 font-semibold text-sm transition-all
        ${state === "done"
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                    : state === "error"
                        ? "border-red-300 bg-red-50 dark:bg-red-500/10 text-red-500"
                        : "border-[#0EA5E9] bg-[#0EA5E9]/8 dark:bg-[#0EA5E9]/10 text-slate-700 dark:text-slate-200 hover:bg-[#0EA5E9]/15"
                }
      `}
        >
            {state === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Obteniendo ubicación...</>
            ) : state === "done" ? (
                <><CheckCircle2 className="w-4 h-4" /> Ubicación obtenida ✓</>
            ) : state === "error" ? (
                <><Navigation className="w-4 h-4" /> No se pudo acceder al GPS</>
            ) : (
                <><Navigation className="w-4 h-4" /> Usar mi ubicación actual</>
            )}
        </button>
    );
}

// ── Progress bar ────────────────────────────────────────────────────────
function ProgressBar({ step, total = 4 }: { step: number; total?: number }) {
    return (
        <div className="flex gap-1.5 mb-1">
            {Array.from({ length: total }, (_, i) => (
                <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all duration-400 ${i < step ? "bg-[#F46E20]" : "bg-slate-200 dark:bg-slate-700"}`}
                />
            ))}
        </div>
    );
}

// ── Calendar ────────────────────────────────────────────────────────────
function MiniCalendar({ value, onChange }: { value: string; onChange: (d: string) => void }) {
    const now = new Date();
    const [month, setMonth] = useState(now.getMonth());
    const [year, setYear] = useState(now.getFullYear());

    const first = new Date(year, month, 1);
    const startPad = (first.getDay() - 1 + 7) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const cells: (number | null)[] = [];
    for (let i = 0; i < startPad; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);

    const prevMonth = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
    const nextMonth = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

    return (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-3">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-slate-800 dark:text-slate-200 capitalize">
                    {new Date(year, month).toLocaleDateString("es-VE", { month: "long", year: "numeric" })}
                </span>
                <div className="flex gap-1">
                    <button type="button" onClick={prevMonth} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">‹</button>
                    <button type="button" onClick={nextMonth} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm">›</button>
                </div>
            </div>
            <div className="grid grid-cols-7 text-center text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 gap-0.5">
                {["L", "M", "X", "J", "V", "S", "D"].map(d => <span key={d}>{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
                {cells.map((d, i) => {
                    if (d === null) return <span key={i} />;
                    const cellDate = new Date(year, month, d);
                    const isPast = cellDate < today;
                    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                    const isSel = value === dateStr;
                    return (
                        <button key={i} type="button" disabled={isPast} onClick={() => onChange(dateStr)}
                            className={`h-8 rounded-lg text-sm font-medium transition ${isPast ? "text-slate-300 dark:text-slate-600 cursor-not-allowed" : isSel ? "bg-[#F46E20] text-white font-bold" : "text-slate-800 dark:text-slate-200 hover:bg-[#0EA5E9]/15"}`}
                        >{d}</button>
                    );
                })}
            </div>
        </div>
    );
}

// ── Main Wizard ─────────────────────────────────────────────────────────
export default function TripWizard({ onClose, onConfirm }: Props) {
    const [step, setStep] = useState(1);
    const [pickup, setPickup] = useState("");
    const [dropoff, setDropoff] = useState("");
    const [vehicle, setVehicle] = useState<VehicleType>("moto");
    const [mode, setMode] = useState<TripMode>("now");
    const [reserveDate, setReserveDate] = useState("");
    const [reserveTime, setReserveTime] = useState("");
    const [payment, setPayment] = useState<PaymentMethod>("wallet");

    const canNext1 = pickup.trim().length >= 3 && dropoff.trim().length >= 3;
    const canNext3 = mode === "now" || (reserveDate !== "" && reserveTime !== "");
    const canConfirm = payment !== undefined;

    const VEHICLES = [
        { id: "moto" as const, Icon: Bike, label: "Moto", personas: "1 pax", equipaje: "Ligero", extra: null },
        { id: "carro" as const, Icon: Car, label: "Carro", personas: "3 pax", equipaje: "Moderado", extra: null },
        { id: "4x4" as const, Icon: Truck, label: "4×4", personas: "4 pax", equipaje: "Amplio", extra: "Mascotas OK" },
        { id: "flete" as const, Icon: Boxes, label: "Flete / Mudanza", personas: "–", equipaje: "Cargas grandes", extra: "Cotizar" },
    ];

    const PAYMENTS = [
        { id: "efectivo" as const, Icon: Banknote, label: "Efectivo (USD / Bs.)" },
        { id: "pago_movil" as const, Icon: Smartphone, label: "Pago Móvil" },
        { id: "wallet" as const, Icon: Wallet, label: "Wallet VELO" },
    ];

    const STEP_TITLES = ["", "¿Dónde te recogemos?", "Tipo de vehículo", "¿Cuándo viajás?", "Método de pago"];
    const STEP_SUBS = ["", "Escribe la dirección o usa tu ubicación GPS", "Elige según pasajeros y equipaje", "Viaja ahora o reserva para después", "Selecciona cómo vas a pagar"];

    const next = () => setStep(s => Math.min(s + 1, 4));
    const back = () => { if (step === 1) onClose(); else setStep(s => s - 1); };

    const handleConfirm = () => {
        onConfirm({ pickup, dropoff, vehicle, mode, reserveDate, reserveTime, payment });
    };

    return (
        <div className="flex flex-col h-full min-h-0">
            {/* ── Header ── */}
            <div className="px-1 pt-1 pb-3 shrink-0">
                <ProgressBar step={step} />
                <div className="flex items-start justify-between mt-3">
                    <div>
                        <p className="text-[10px] font-black text-[#F46E20] uppercase tracking-widest mb-0.5">
                            Paso {step} de 4
                        </p>
                        <h2 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                            {STEP_TITLES[step]}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{STEP_SUBS[step]}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 transition-colors shrink-0 mt-0.5"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* ── Step content ── */}
            <div className="flex-1 overflow-y-auto velocity-no-scrollbar pb-2">

                {/* STEP 1 — Pickup & Dropoff */}
                {step === 1 && (
                    <div className="space-y-4 animate-slide-up-soft">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-full bg-[#F46E20] flex items-center justify-center shrink-0">
                                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Punto de recogida</span>
                            </div>
                            <AddressInput
                                value={pickup}
                                onChange={setPickup}
                                placeholder="Escribe tu dirección de origen..."
                            />
                            <div className="mt-2">
                                <GpsButton onLocation={setPickup} />
                            </div>
                        </div>

                        {/* Connector line */}
                        <div className="flex items-center gap-2 px-3.5">
                            <div className="w-0.5 h-6 bg-gradient-to-b from-[#F46E20] to-[#0EA5E9] mx-3" />
                            <span className="text-xs text-slate-400 dark:text-slate-500">hacia</span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-7 h-7 rounded-full bg-[#0EA5E9] flex items-center justify-center shrink-0">
                                    <MapPin className="w-3.5 h-3.5 text-white" />
                                </div>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Destino</span>
                            </div>
                            <AddressInput
                                value={dropoff}
                                onChange={setDropoff}
                                placeholder="¿A dónde vas?"
                                color="#0EA5E9"
                            />
                        </div>
                    </div>
                )}

                {/* STEP 2 — Vehicle & Details */}
                {step === 2 && (
                    <div className="animate-slide-up-soft space-y-4">
                        <div className="grid grid-cols-2 gap-2.5">
                            {VEHICLES.map(({ id, Icon, label, personas, equipaje, extra }) => (
                                <button
                                    key={id}
                                    type="button"
                                    onClick={() => setVehicle(id)}
                                    className={`flex flex-col items-start gap-2 p-3.5 rounded-2xl border-2 text-left transition-all ${vehicle === id
                                            ? "border-[#F46E20] bg-[#F46E20]/8 dark:bg-[#F46E20]/12 shadow-md shadow-[#F46E20]/10"
                                            : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${vehicle === id ? "bg-[#F46E20]" : "bg-slate-100 dark:bg-slate-700"}`}>
                                        <Icon className={`w-5 h-5 ${vehicle === id ? "text-white" : "text-slate-600 dark:text-slate-300"}`} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold leading-tight ${vehicle === id ? "text-[#F46E20]" : "text-slate-800 dark:text-slate-100"}`}>{label}</p>
                                        <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                                            <span className="inline-flex items-center gap-0.5"><Users className="w-3 h-3" /> {personas}</span>
                                            <span className="inline-flex items-center gap-0.5"><Briefcase className="w-3 h-3" /> {equipaje}</span>
                                            {extra && <span className={`inline-flex items-center gap-0.5 font-medium ${id === "4x4" ? "text-emerald-600 dark:text-emerald-400" : "text-[#F46E20]"}`}>{id === "4x4" && <Dog className="w-3 h-3" />} {extra}</span>}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Detalles Dinámicos */}
                        {(vehicle === "carro" || vehicle === "4x4") && (
                            <div className="pt-2 animate-fade-in-up">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Detalles adicionales (Opcional)</label>
                                <textarea
                                    placeholder="¿Llevas equipaje extra, mascotas o cajas medianas?"
                                    className="w-full h-20 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:border-[#F46E20] focus:ring-1 focus:ring-[#F46E20] outline-none transition-all resize-none"
                                />
                                <div className="flex items-center gap-2 mt-2">
                                    <input type="checkbox" id="pets" className="w-4 h-4 rounded border-slate-300 text-[#F46E20] focus:ring-[#F46E20]" />
                                    <label htmlFor="pets" className="text-sm font-medium text-slate-700 dark:text-slate-300">Viajo con mascota</label>
                                </div>
                            </div>
                        )}
                        {vehicle === "flete" && (
                            <div className="pt-2 animate-fade-in-up">
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide">Especificaciones de carga</label>
                                <textarea
                                    placeholder="Detalla los objetos grandes a transportar (Ej: 1 nevera, 2 sofás). Dimensiones y peso aproximado."
                                    className="w-full h-24 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-800 dark:text-slate-100 focus:border-[#F46E20] focus:ring-1 focus:ring-[#F46E20] outline-none transition-all resize-none"
                                />
                                <p className="text-[10px] text-slate-500 mt-1.5 flex items-start gap-1">
                                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                    El conductor revisará la carga para confirmar la tarifa final o solicitar modificaciones si excede la capacidad.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 3 — When */}
                {step === 3 && (
                    <div className="space-y-3 animate-slide-up-soft">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setMode("now")}
                                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 font-bold text-sm transition-all ${mode === "now"
                                        ? "border-[#F46E20] bg-[#F46E20]/8 dark:bg-[#F46E20]/12 text-[#F46E20] shadow-md shadow-[#F46E20]/15"
                                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                                    }`}
                            >
                                <Zap className="w-6 h-6" />
                                Viajar ahora
                                <span className="text-[10px] font-normal text-slate-400">Conductor en ~3 min</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setMode("reserve")}
                                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border-2 font-bold text-sm transition-all ${mode === "reserve"
                                        ? "border-[#0EA5E9] bg-[#0EA5E9]/8 dark:bg-[#0EA5E9]/12 text-[#0EA5E9] shadow-md shadow-[#0EA5E9]/15"
                                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300"
                                    }`}
                            >
                                <Calendar className="w-6 h-6" />
                                Reservar
                                <span className="text-[10px] font-normal text-slate-400">Elige fecha y hora</span>
                            </button>
                        </div>

                        {mode === "reserve" && (
                            <div className="space-y-3 animate-slide-up-soft">
                                <MiniCalendar value={reserveDate} onChange={setReserveDate} />
                                <div className="relative">
                                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    <select
                                        value={reserveTime}
                                        onChange={(e) => setReserveTime(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 font-medium focus:border-[#0EA5E9] focus:outline-none transition-all text-[15px] appearance-none"
                                    >
                                        <option value="">Selecciona la hora</option>
                                        {Array.from({ length: 48 }, (_, i) => {
                                            const h = Math.floor(i / 2);
                                            const m = (i % 2) * 30;
                                            const val = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                                            return <option key={val} value={val}>{val}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* STEP 4 — Payment */}
                {step === 4 && (
                    <div className="space-y-2.5 animate-slide-up-soft">
                        {PAYMENTS.map(({ id, Icon, label }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setPayment(id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${payment === id
                                        ? "border-[#F46E20] bg-[#F46E20]/8 dark:bg-[#F46E20]/12 shadow-md shadow-[#F46E20]/10"
                                        : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300"
                                    }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${payment === id ? "bg-[#F46E20]" : "bg-slate-100 dark:bg-slate-700"}`}>
                                    <Icon className={`w-5 h-5 ${payment === id ? "text-white" : "text-slate-500 dark:text-slate-300"}`} />
                                </div>
                                <div className="flex-1">
                                    <p className={`font-bold text-sm ${payment === id ? "text-[#F46E20]" : "text-slate-800 dark:text-slate-100"}`}>{label}</p>
                                    {id === "wallet" && <p className="text-[11px] text-slate-400 mt-0.5">Descuento del 5% con VELO</p>}
                                    {id === "pago_movil" && <p className="text-[11px] text-slate-400 mt-0.5">Transferencia bancaria instantánea</p>}
                                    {id === "efectivo" && <p className="text-[11px] text-slate-400 mt-0.5">Paga al conductor al llegar</p>}
                                </div>
                                {payment === id && <CheckCircle2 className="w-5 h-5 text-[#F46E20] shrink-0" />}
                            </button>
                        ))}

                        {/* Summary */}
                        <div className="mt-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Resumen del viaje</p>
                            <div className="flex items-start gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-[#F46E20] mt-1.5 shrink-0" />
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">{pickup || "—"}</p>
                            </div>
                            <div className="w-0.5 h-3 bg-slate-200 dark:bg-slate-600 ml-[3px]" />
                            <div className="flex items-start gap-2.5">
                                <div className="w-2 h-2 rounded-full bg-[#0EA5E9] mt-1.5 shrink-0" />
                                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium leading-snug">{dropoff || "—"}</p>
                            </div>
                            <div className="flex items-center gap-3 pt-1 border-t border-slate-200 dark:border-slate-700">
                                <span className="text-xs text-slate-500">{vehicle.toUpperCase()}</span>
                                <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                                <span className="text-xs text-slate-500">{mode === "now" ? "Ahora" : `${reserveDate} ${reserveTime}`}</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ── Footer nav ── */}
            <div className="shrink-0 pt-3 space-y-2">
                {step < 4 ? (
                    <button
                        type="button"
                        onClick={next}
                        disabled={step === 1 ? !canNext1 : step === 3 ? !canNext3 : false}
                        className="w-full py-4 rounded-2xl font-bold text-white text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#F46E20]/20 transition-all active:scale-[0.98] disabled:opacity-40 disabled:shadow-none disabled:cursor-not-allowed"
                        style={{ backgroundColor: BRAND.colors.primary }}
                    >
                        Continuar <ArrowRight className="w-4 h-4" />
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={!canConfirm}
                        className="w-full py-4 rounded-2xl font-bold text-white text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-[#F46E20]/25 transition-all active:scale-[0.98]"
                        style={{ backgroundColor: BRAND.colors.primary }}
                    >
                        Solicitar viaje <ArrowRight className="w-4 h-4" />
                    </button>
                )}
                <button
                    type="button"
                    onClick={back}
                    className="w-full py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    {step === 1 ? "Cancelar" : "Atrás"}
                </button>
            </div>
        </div>
    );
}
