"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import Link from "next/link";
import LocationIconOrange from "@/components/LocationIconOrange";
import {
  MapPin,
  Navigation,
  Car,
  Bike,
  Truck,
  Calendar,
  Zap,
  User,
  Wallet,
  Banknote,
  Smartphone,
  Building2,
  BadgeCheck,
  ShoppingBag,
  Package,
  ChevronRight,
  Users,
  Briefcase,
  Dog,
  Boxes,
} from "lucide-react";
import AppMap from "@/components/AppMap";
import MapPickerModal from "@/components/MapPickerModal";
import BcvWidget from "@/components/BcvWidget";
import { ZONAS_VELOCITY } from "@/lib/zonas-venezuela";

const NEGOCIOS_VERIFICADOS = [
  {
    id: "1",
    nombre: "Panadería Central",
    tipo: "Panadería",
    verified: true,
    descripcion: "Pan recién horneado, café y repostería. Atención en local y delivery.",
    direccion: "Av. Principal, Centro, Caracas",
    horario: "Lun–Sáb 6:00 – 20:00",
    delivery: true,
    logo: BRAND.logo,
    portada: "",
    productos: [{ nombre: "Pan integral", precio: "2.50" }, { nombre: "Café con leche", precio: "1.50" }, { nombre: "Croissant", precio: "1.80" }],
  },
  {
    id: "2",
    nombre: "Pizza & Más",
    tipo: "Comida rápida",
    verified: true,
    descripcion: "Pizzas, hamburguesas y ensaladas. Envío a domicilio en la zona.",
    direccion: "Calle 10, Los Jardines, Caracas",
    horario: "Todos los días 11:00 – 23:00",
    delivery: true,
    logo: BRAND.logo,
    portada: "",
    productos: [{ nombre: "Pizza familiar", precio: "12.00" }, { nombre: "Ensalada", precio: "4.00" }, { nombre: "Hamburguesa clásica", precio: "5.50" }],
  },
  {
    id: "3",
    nombre: "Sabor Criollo",
    tipo: "Comida rápida",
    verified: true,
    descripcion: "Comida venezolana: arepas, tequeños, empanadas. Solo negocios autorizados de comida.",
    direccion: "Av. Libertador, La California, Caracas",
    horario: "Lun–Dom 7:00 – 22:00",
    delivery: true,
    logo: BRAND.logo,
    portada: "",
    productos: [{ nombre: "Arepa con relleno", precio: "3.00" }, { nombre: "Tequeños (6 und)", precio: "4.50" }],
  },
];

const PARADAS_COMUNES = [
  { id: "terminal", name: "Terminal" },
  { id: "av-principal", name: "Av. Principal" },
  { id: "centro", name: "Centro" },
  { id: "plaza", name: "Plaza principal" },
];

type VehicleType = "moto" | "carro" | "4x4" | "flete";
type TripMode = "now" | "reserve";
type PaymentMethod = "efectivo" | "pago_movil" | "wallet";

export default function AppInicioPage() {
  const [vehicle, setVehicle] = useState<VehicleType>("moto");
  const [pickupType, setPickupType] = useState<"parada" | "ubicacion" | "direccion">("parada");
  const [pickupValue, setPickupValue] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [tripMode, setTripMode] = useState<TripMode>("now");
  const [reserveDate, setReserveDate] = useState("");
  const [reserveTime, setReserveTime] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => new Date().getMonth());
  const [calendarYear, setCalendarYear] = useState(() => new Date().getFullYear());
  const [payment, setPayment] = useState<PaymentMethod>("wallet");
  const [step, setStep] = useState<"select" | "confirm" | "driver">("select");
  const [showConductorProfile, setShowConductorProfile] = useState(false);
  const [negocioSeleccionado, setNegocioSeleccionado] = useState<typeof NEGOCIOS_VERIFICADOS[0] | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapPickerFor, setMapPickerFor] = useState<"pickup" | "dropoff" | null>(null);
  const [carrito, setCarrito] = useState<{ nombre: string; precio: string; cantidad: number }[]>([]);
  const [cantidades, setCantidades] = useState<Record<string, number>>({});

  return (
    <div className="min-h-full flex flex-col md:flex-row">
      {/* Mapa: Venezuela / ciudad actual */}
      <div className="flex-1 min-h-[280px] md:min-h-[calc(100vh-56px)] bg-slate-200 relative">
        <AppMap />
        <div className="absolute top-4 left-4 right-4 md:left-6 md:right-auto md:w-[400px] bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4 border border-slate-200/80 z-10">
          <div className="flex items-center gap-3 mb-3">
            <LocationIconOrange size={40} />
            <div>
              <p className="font-semibold text-slate-800">{BRAND.name}</p>
              <p className="text-xs text-slate-500">Tu viaje, tu ciudad</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho: Inicio (HOME) — Negocios + viajes */}
      <div className="md:w-[420px] bg-white dark:bg-slate-900 md:border-l md:border-slate-200 dark:border-slate-800 md:shadow-xl p-5 flex flex-col gap-5 overflow-y-auto velocity-no-scrollbar">
        {step === "select" && (
          <>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft">
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">Inicio</h1>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Tu panel principal</span>
            </div>
            <div className="animate-slide-up-soft animation-delay-100">
              <BcvWidget />
            </div>
            {/* Negocios verificados — clic abre perfil del negocio */}
            <section className="pb-4 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft animation-delay-200">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Negocios verificados
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Compra y paga con tu billetera. El pago va al emprendedor.</p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-500 mb-2 flex items-center gap-1 rounded-lg bg-amber-50/80 dark:bg-amber-900/20 px-2 py-1 border border-amber-100 dark:border-amber-900/30">Tasa BCV de referencia para tus pagos.</p>
              <div className="space-y-3 max-h-[280px] overflow-y-auto overflow-x-hidden velocity-no-scrollbar">
                {NEGOCIOS_VERIFICADOS.map((neg) => (
                  <div key={neg.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800 hover:border-[#0EA5E9]/30 transition velocity-card">
                    <button type="button" onClick={() => setNegocioSeleccionado(neg)} className="w-full text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-800 dark:text-slate-100 text-sm">{neg.nombre}</span>
                        {neg.verified && (
                          <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-500 text-xs">
                            <BadgeCheck className="w-3.5 h-3.5" /> Verificado
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {neg.productos.map((p, i) => (
                          <span key={i} className="text-xs px-2 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                            {p.nombre} · ${p.precio}
                          </span>
                        ))}
                      </div>
                    </button>
                    <button type="button" onClick={() => setNegocioSeleccionado(neg)} className="mt-2 w-full py-1.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 text-white" style={{ backgroundColor: BRAND.colors.primary }}>
                      <ShoppingBag className="w-3.5 h-3.5" /> Ver perfil y pagar con wallet
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Confianza */}
            <div className="flex items-center gap-2 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 animate-slide-up-soft animation-delay-300">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                <BadgeCheck className="w-4 h-4" />
              </span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Todos los conductores han sido verificados</p>
            </div>



            {/* ¿Qué necesitas hoy? — Viajes y Envíos (Mandaito) */}
            <section className="pb-4 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft animation-delay-400">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">¿Qué necesitas hoy?</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800/80 hover:border-[#0EA5E9]/30 transition velocity-card">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#0EA5E9]" /> Viajes
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Viaja rápido y seguro</p>
                  <p className="text-xs text-slate-600 dark:text-slate-500 mt-2">Usa el formulario de abajo ↓</p>
                </div>
                <Link href="/app/envios" className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 hover:border-[#0EA5E9]/40 hover:shadow-md transition velocity-card flex flex-col">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1 flex items-center gap-1.5">
                    <Package className="w-4 h-4" style={{ color: BRAND.colors.primary }} /> Envíos
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">Mandaito: envía un paquete</p>
                  <span className="text-xs font-medium mt-2 flex items-center gap-0.5" style={{ color: BRAND.colors.primary }}>
                    Enviar paquete <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </section>

            {negocioSeleccionado && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto velocity-no-scrollbar" onClick={() => { setNegocioSeleccionado(null); setCarrito([]); setCantidades({}); }}>
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200 dark:border-slate-800 my-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                  {/* Portada */}
                  <div className="h-28 bg-gradient-to-br from-[#0EA5E9]/30 to-slate-100 flex items-center justify-center">
                    {negocioSeleccionado.portada ? (
                      <img src={negocioSeleccionado.portada} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Building2 className="w-12 h-12 text-slate-400" />
                    )}
                  </div>
                  <div className="p-5 -mt-10 relative overflow-y-auto">
                    {/* Logo + nombre */}
                    <div className="flex items-end gap-3 mb-3">
                      <div className="w-16 h-16 rounded-xl border-2 border-white bg-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                        {negocioSeleccionado.logo === BRAND.logo ? (
                          <LocationIconOrange size={40} />
                        ) : negocioSeleccionado.logo ? (
                          <img src={negocioSeleccionado.logo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-8 h-8 text-slate-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pb-0.5">
                        <h3 className="font-bold text-slate-800 text-lg truncate">{negocioSeleccionado.nombre}</h3>
                        <p className="text-sm text-slate-500">{negocioSeleccionado.tipo}</p>
                        {negocioSeleccionado.verified && (
                          <span className="inline-flex items-center gap-1 text-emerald-600 text-xs font-medium mt-1">
                            <BadgeCheck className="w-3.5 h-3.5" /> Verificado · Solo comida
                          </span>
                        )}
                      </div>
                    </div>
                    {"descripcion" in negocioSeleccionado && negocioSeleccionado.descripcion && (
                      <p className="text-sm text-slate-600 mb-3">{negocioSeleccionado.descripcion}</p>
                    )}
                    <div className="space-y-2 mb-4 text-sm text-slate-600">
                      {"direccion" in negocioSeleccionado && negocioSeleccionado.direccion && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          {negocioSeleccionado.direccion}
                        </p>
                      )}
                      {"horario" in negocioSeleccionado && negocioSeleccionado.horario && (
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 flex-shrink-0 text-slate-400" />
                          {negocioSeleccionado.horario}
                        </p>
                      )}
                      {"delivery" in negocioSeleccionado && negocioSeleccionado.delivery && (
                        <p className="flex items-center gap-2">
                          <Package className="w-4 h-4 flex-shrink-0 text-emerald-500" />
                          Delivery / envío incluido
                        </p>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-2">Catálogo — Selecciona cantidad y añade al carrito</p>
                    <ul className="space-y-2 mb-4 max-h-44 overflow-y-auto">
                      {negocioSeleccionado.productos.map((p, i) => {
                        const key = `${negocioSeleccionado.id}-${p.nombre}`;
                        const q = cantidades[key] ?? 1;
                        return (
                          <li key={i} className="py-2 px-3 rounded-lg bg-slate-50 border border-slate-100 text-sm flex flex-wrap items-center gap-2">
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-slate-800">{p.nombre}</span>
                              <span className="ml-1 font-semibold" style={{ color: BRAND.colors.primary }}>${p.precio}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <button type="button" onClick={() => setCantidades((c) => ({ ...c, [key]: Math.max(1, (c[key] ?? 1) - 1) }))} className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium">−</button>
                              <span className="w-8 text-center font-medium text-slate-800">{q}</span>
                              <button type="button" onClick={() => setCantidades((c) => ({ ...c, [key]: (c[key] ?? 1) + 1 }))} className="w-7 h-7 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium">+</button>
                              <button type="button" onClick={() => setCarrito((prev) => [...prev, { nombre: p.nombre, precio: p.precio, cantidad: q }])} className="ml-1 px-2 py-1 rounded-lg text-xs font-medium text-white" style={{ backgroundColor: BRAND.colors.primary }}>Añadir</button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {carrito.length > 0 && (
                      <div className="mb-4 p-3 rounded-xl bg-slate-100 border border-slate-200">
                        <p className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1"><ShoppingBag className="w-4 h-4" /> Tu carrito ({carrito.length} {carrito.length === 1 ? "ítem" : "ítems"})</p>
                        <ul className="space-y-1 text-sm text-slate-600 mb-2 max-h-24 overflow-y-auto">
                          {carrito.map((item, i) => (
                            <li key={i} className="flex justify-between">
                              <span>{item.nombre} × {item.cantidad}</span>
                              <span className="font-medium">${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm font-bold text-slate-800 flex justify-between">
                          Total <span style={{ color: BRAND.colors.primary }}>${carrito.reduce((sum, i) => sum + parseFloat(i.precio) * i.cantidad, 0).toFixed(2)}</span>
                        </p>
                        <button type="button" onClick={() => setCarrito([])} className="mt-2 w-full py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-medium">Vaciar carrito</button>
                      </div>
                    )}
                    <button type="button" className="w-full py-2.5 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-2" style={{ backgroundColor: BRAND.colors.primary }} disabled={carrito.length === 0}>
                      <Wallet className="w-4 h-4" />
                      {carrito.length > 0 ? `Pagar con VELO ($${carrito.reduce((s, i) => s + parseFloat(i.precio) * i.cantidad, 0).toFixed(2)})` : "Pagar con VELO"}
                    </button>
                    <button type="button" onClick={() => { setNegocioSeleccionado(null); setCarrito([]); setCantidades({}); }} className="mt-2 w-full py-2 rounded-xl border border-slate-200 text-slate-700 text-sm font-medium">
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>
            )}

            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 pt-2">Pedir viaje</h2>
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">¿Dónde te recogemos?</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setPickupType("parada")}
                className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition ${pickupType === "parada" ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                Paradas
              </button>
              <button
                type="button"
                onClick={() => setPickupType("ubicacion")}
                className={`px-3 py-2 rounded-lg text-sm font-medium border-2 flex items-center gap-1 transition ${pickupType === "ubicacion" ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                <Navigation className="w-4 h-4" />
                Mi ubicación
              </button>
              <button
                type="button"
                onClick={() => setPickupType("direccion")}
                className={`px-3 py-2 rounded-lg text-sm font-medium border-2 transition ${pickupType === "direccion" ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                Dirección
              </button>
            </div>
            {pickupType === "parada" && (
              <div className="grid grid-cols-2 gap-2">
                {PARADAS_COMUNES.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPickupValue(p.name)}
                    className={`p-3 rounded-lg border-2 text-left text-sm font-medium transition ${pickupValue === p.name ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                  >
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {p.name}
                  </button>
                ))}
              </div>
            )}
            {pickupType === "ubicacion" && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator === "undefined" || !navigator.geolocation) {
                      setPickupValue("Tu navegador no soporta geolocalización.");
                      return;
                    }
                    setPickupValue("Obteniendo ubicación...");
                    navigator.geolocation.getCurrentPosition(
                      (pos) => {
                        const { latitude, longitude } = pos.coords;
                        setPickupValue(`Ubicación actual: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                      },
                      (err) => {
                        if (err.code === 1) setPickupValue("Permiso denegado. Activa la ubicación en tu dispositivo.");
                        else if (err.code === 2) setPickupValue("Ubicación no disponible. Revisa GPS/conexión.");
                        else setPickupValue("No se pudo obtener la ubicación. Revisa permisos.");
                      },
                      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
                    );
                  }}
                  className="w-full px-3 py-2.5 rounded-lg border-2 border-[#0EA5E9] bg-[#0EA5E9]/10 text-slate-800 dark:text-slate-100 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#0EA5E9]/20"
                >
                  <Navigation className="w-4 h-4" />
                  Obtener mi ubicación ahora
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (typeof navigator === "undefined" || !navigator.geolocation) {
                      setPickupValue("Tu navegador no soporta geolocalización.");
                      return;
                    }
                    setPickupValue("Compartiendo en tiempo real...");
                    const watchId = navigator.geolocation.watchPosition(
                      (pos) => {
                        const { latitude, longitude } = pos.coords;
                        setPickupValue(`En vivo: ${latitude.toFixed(5)}, ${longitude.toFixed(5)}`);
                      },
                      (err) => {
                        if (err.code === 1) setPickupValue("Permiso denegado para ubicación en tiempo real.");
                        else setPickupValue("No se pudo compartir en tiempo real.");
                        navigator.geolocation.clearWatch(watchId);
                      },
                      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                    );
                    (window as any).__velocityWatchId = watchId;
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <Navigation className="w-4 h-4" />
                  Compartir mi ubicación en tiempo real
                </button>
                {pickupValue && !pickupValue.startsWith("Obteniendo") && !pickupValue.startsWith("Compartiendo") && (
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">{pickupValue}</p>
                )}
              </div>
            )}
            {pickupType === "direccion" && (
              <div>
                <input
                  type="text"
                  placeholder="Escribe la dirección de recogida"
                  value={pickupValue}
                  onChange={(e) => setPickupValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-500 text-sm"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 mb-1">Zonas donde operamos:</p>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {ZONAS_VELOCITY.slice(0, 6).map((z) => (
                    <button
                      key={z.id}
                      type="button"
                      onClick={() => setPickupValue(z.nombre)}
                      className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-[#0EA5E9]/10 hover:border-[#0EA5E9]/40"
                    >
                      {z.nombre.split(" - ")[0] || z.nombre}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => { setMapPickerFor("pickup"); setShowMapPicker(true); }}
                  className="w-full py-2 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-medium flex items-center justify-center gap-2 hover:border-[#0EA5E9]/50 hover:bg-[#0EA5E9]/5"
                >
                  <MapPin className="w-4 h-4" />
                  Señalar ubicación en el mapa
                </button>
              </div>
            )}
            <div className="mt-2">
              <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">Destino</label>
              <input
                type="text"
                placeholder="¿A dónde vas?"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium placeholder:text-slate-500 text-sm"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ZONAS_VELOCITY.slice(0, 5).map((z) => (
                  <button
                    key={z.id}
                    type="button"
                    onClick={() => setDropoff(z.nombre)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-[#0EA5E9]/10"
                  >
                    {z.nombre.split(" - ")[0] || z.nombre}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => { setMapPickerFor("dropoff"); setShowMapPicker(true); }}
                  className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-[#0EA5E9]/10 flex items-center gap-1"
                >
                  <MapPin className="w-3 h-3" /> Mapa
                </button>
              </div>
            </div>

            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 pt-3">Tipo de vehículo</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Elige según pasajeros y equipaje. Solo negocios verificados.</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "moto" as const, Icon: Bike, label: "Moto", personas: "1", equipaje: "Ligero", extra: null },
                { id: "carro" as const, Icon: Car, label: "Carro", personas: "3", equipaje: "Moderado", extra: null },
                { id: "4x4" as const, Icon: Truck, label: "4x4", personas: "4", equipaje: "Amplio", extra: "Mascota permitida" },
                { id: "flete" as const, Icon: Boxes, label: "Flete", personas: "—", equipaje: "Cargas grandes", extra: "NPR" },
              ].map(({ id, Icon, label, personas, equipaje, extra }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setVehicle(id)}
                  className={`flex flex-col items-start gap-1.5 p-3 rounded-xl border-2 text-left transition ${vehicle === id ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100 shadow-sm" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                    }`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${vehicle === id ? "bg-[#0EA5E9]/20" : "bg-slate-100 dark:bg-slate-700"}`}>
                      <Icon className="w-5 h-5" strokeWidth={2} style={vehicle === id ? { color: "#0EA5E9" } : {}} />
                    </div>
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <span className="inline-flex items-center gap-0.5">
                      <Users className="w-3.5 h-3.5" /> {personas}
                    </span>
                    <span className="inline-flex items-center gap-0.5">
                      <Briefcase className="w-3.5 h-3.5" /> {equipaje}
                    </span>
                    {extra && (
                      <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-500">
                        {id === "4x4" ? <Dog className="w-3.5 h-3.5" /> : null}
                        {extra}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
            {vehicle === "flete" && (
              <p className="text-xs text-slate-500 dark:text-slate-400 rounded-lg bg-slate-50 dark:bg-slate-800 p-2 border border-slate-100 dark:border-slate-700 mt-2">
                Ideal para mudanza, viajes largos o cargar algo grande. Vehículos tipo NPR disponibles.
              </p>
            )}

            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 pt-3">¿Cuándo?</h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTripMode("now")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition ${tripMode === "now" ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-white" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                <Zap className="w-4 h-4" />
                Viajar ahora
              </button>
              <button
                type="button"
                onClick={() => setTripMode("reserve")}
                className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-medium text-sm transition ${tripMode === "reserve" ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
              >
                <Calendar className="w-4 h-4" />
                Reservar
              </button>
            </div>
            {tripMode === "reserve" && (
              <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 space-y-4 overflow-hidden mt-2">
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">Fecha</label>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200 capitalize">
                      {new Date(calendarYear, calendarMonth).toLocaleDateString("es", { month: "long", year: "numeric" })}
                    </span>
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (calendarMonth === 0) {
                            setCalendarMonth(11);
                            setCalendarYear((y) => y - 1);
                          } else setCalendarMonth((m) => m - 1);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
                        aria-label="Mes anterior"
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (calendarMonth === 11) {
                            setCalendarMonth(0);
                            setCalendarYear((y) => y + 1);
                          } else setCalendarMonth((m) => m + 1);
                        }}
                        className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
                        aria-label="Mes siguiente"
                      >
                        ›
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-0.5 text-center text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    {["L", "M", "X", "J", "V", "S", "D"].map((d) => (
                      <span key={d}>{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-0.5">
                    {(() => {
                      const first = new Date(calendarYear, calendarMonth, 1);
                      const startPad = (first.getDay() - 1 + 7) % 7;
                      const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const cells: (number | null)[] = [];
                      for (let i = 0; i < startPad; i++) cells.push(null);
                      for (let d = 1; d <= daysInMonth; d++) cells.push(d);
                      return cells.map((d, i) => {
                        if (d === null) return <span key={i} />;
                        const cellDate = new Date(calendarYear, calendarMonth, d);
                        const isPast = cellDate < today;
                        const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
                        const isSelected = reserveDate === dateStr;
                        return (
                          <button
                            key={i}
                            type="button"
                            disabled={isPast}
                            onClick={() => setReserveDate(dateStr)}
                            className={`flex items-center justify-center h-8 rounded-lg text-sm font-medium transition ${isPast ? "text-slate-300 dark:text-slate-600 cursor-not-allowed" : "text-slate-800 dark:text-slate-200 hover:bg-[#0EA5E9]/20"
                              } ${isSelected ? "bg-[#0EA5E9] !text-white hover:bg-[#0EA5E9]" : ""}`}
                          >
                            {d}
                          </button>
                        );
                      });
                    })()}
                  </div>
                </div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200 mt-3 mb-1">Hora</label>
                <select
                  value={reserveTime}
                  onChange={(e) => setReserveTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium text-sm"
                >
                  <option value="">Selecciona hora</option>
                  {Array.from({ length: 24 * 2 }, (_, i) => {
                    const h = Math.floor(i / 2);
                    const m = (i % 2) * 30;
                    const val = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
                    return (
                      <option key={val} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 pt-3">Método de pago</h2>
            <div className="space-y-2 mb-2">
              {[
                { id: "efectivo" as const, label: "Efectivo", Icon: Banknote },
                { id: "pago_movil" as const, label: "Pago móvil", Icon: Smartphone },
                { id: "wallet" as const, label: "Descontar de mi billetera", Icon: Wallet },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayment(id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 text-left text-sm font-medium transition ${payment === id ? "border-[#0EA5E9] bg-[#0EA5E9]/15 text-slate-800 dark:text-slate-100" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                    }`}
                >
                  <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  {label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setStep("confirm")}
              className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition hover:opacity-95"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              Solicitar viaje
            </button>
            <p className="text-xs text-slate-500 text-center">
              Al solicitar aceptas nuestros términos. Cobro según método elegido.
            </p>
          </>
        )}

        {step === "confirm" && (
          <>
            <p className="text-sm text-slate-600">Buscando conductor...</p>
            <button type="button" onClick={() => setStep("driver")} className="text-sm font-medium text-white py-2.5 px-4 rounded-xl" style={{ backgroundColor: BRAND.colors.primary }}>
              Simular conductor asignado
            </button>
            <button type="button" onClick={() => setStep("select")} className="text-sm text-slate-500">
              ← Cambiar datos
            </button>
          </>
        )}

        {step === "driver" && (() => {
          const vehicleLabels = { moto: "Moto", carro: "Carro", "4x4": "4x4", flete: "Flete" };
          const vehicleIcons = { moto: Bike, carro: Car, "4x4": Truck, flete: Boxes };
          const vehicleColors = { moto: "Negro", carro: "Blanco", "4x4": "Gris", flete: "Blanco" };
          const vehicleDetail = { moto: "Honda XR 150 · ABC-12D", carro: "Toyota Corolla · ABC-123", "4x4": "Toyota Fortuner · XYZ-456", flete: "NPR · Placa 789" };
          const VehicleIcon = vehicleIcons[vehicle];
          const tarifa = vehicle === "flete" ? "12.50" : vehicle === "4x4" ? "8.00" : vehicle === "carro" ? "6.50" : "4.25";
          return (
            <>
              <h2 className="text-base font-semibold text-slate-800">Conductor asignado</h2>
              <div className="rounded-xl border-2 border-slate-200 bg-white overflow-hidden shadow-sm">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200" title={`Referencia: ${vehicleLabels[vehicle]}`}>
                      <VehicleIcon className="w-7 h-7 text-slate-600" strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{vehicleLabels[vehicle]}</p>
                      <p className="text-xs text-slate-500">Vehículo seleccionado</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500">Tarifa estimada</p>
                    <p className="text-lg font-bold text-slate-800">${tarifa}</p>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white flex-shrink-0">
                    <User className="w-7 h-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-semibold text-slate-800">Carlos Mendoza</p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium">
                        <BadgeCheck className="w-3 h-3" /> Verificado
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 flex items-center gap-1 mt-0.5">
                      <span>⭐ 4.9</span>
                      <span>·</span>
                      <span>Más de 520 viajes</span>
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                      {vehicleDetail[vehicle]}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">Color: {vehicleColors[vehicle]}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">Llegada aprox. 3 min</p>
                  </div>
                </div>
                <div className="px-4 pb-4 flex gap-2">
                  <button type="button" onClick={() => setShowConductorProfile(true)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    Ver perfil
                  </button>
                  <button type="button" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white" style={{ backgroundColor: BRAND.colors.primary }}>
                    Llamar / Chat
                  </button>
                </div>
              </div>
              {showConductorProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setShowConductorProfile(false)}>
                  <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-5 border border-slate-200" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-semibold text-slate-800 mb-3">Perfil del conductor</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white">
                        <User className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">Carlos Mendoza</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-medium mt-1">Verificado</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600">{vehicleDetail[vehicle]}</p>
                    <p className="text-sm text-slate-500 mt-1">Color: {vehicleColors[vehicle]}</p>
                    <p className="text-sm text-slate-500 mt-1">⭐ 4.9 · Más de 520 viajes</p>
                    <p className="text-sm text-slate-500 mt-1">Tarifa estimada: ${tarifa}</p>
                    <button type="button" onClick={() => setShowConductorProfile(false)} className="mt-4 w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">Cerrar</button>
                  </div>
                </div>
              )}
              <p className="text-sm text-slate-600 mt-2">El conductor se dirige a tu punto de recogida. Puedes seguir su ubicación en el mapa.</p>
              <button type="button" onClick={() => setStep("select")} className="text-sm text-[#0EA5E9] font-medium mt-2">
                ← Nueva solicitud
              </button>
            </>
          );
        })()}

        <MapPickerModal
          open={showMapPicker}
          onClose={() => { setShowMapPicker(false); setMapPickerFor(null); }}
          onSelect={(address) => {
            if (mapPickerFor === "pickup") setPickupValue(address);
            if (mapPickerFor === "dropoff") setDropoff(address);
          }}
        />
      </div>
    </div>
  );
}
