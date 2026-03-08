"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import Link from "next/link";
import VerificationBadge from "@/components/VerificationBadge";
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
  ArrowRight,
  Users,
  Briefcase,
  Dog,
  Boxes,
  Copy,
  CheckCircle2,
} from "lucide-react";
import AppMap from "@/components/AppMap";
import MapPickerModal from "@/components/MapPickerModal";
import BcvWidget from "@/components/BcvWidget";
import TripWizard from "@/components/TripWizard";
import { t } from "@/lib/i18n";
import { useLang } from "@/context/LanguageContext";
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
  const { lang } = useLang();

  // Estados
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
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [negocioSeleccionado, setNegocioSeleccionado] = useState<typeof NEGOCIOS_VERIFICADOS[0] | null>(null);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [mapPickerFor, setMapPickerFor] = useState<"pickup" | "dropoff" | null>(null);
  const [carrito, setCarrito] = useState<{ nombre: string; precio: string; cantidad: number }[]>([]);
  const [wizardActive, setWizardActive] = useState(false);
  const [wizardTripData, setWizardTripData] = useState<any>(null);

  const updateCartItem = (p: { nombre: string; precio: string }, delta: number) => {
    setCarrito((prev) => {
      const existing = prev.find((item) => item.nombre === p.nombre);
      if (existing) {
        const newQty = existing.cantidad + delta;
        if (newQty <= 0) return prev.filter((item) => item.nombre !== p.nombre);
        return prev.map((item) => (item.nombre === p.nombre ? { ...item, cantidad: newQty } : item));
      } else if (delta > 0) {
        return [...prev, { nombre: p.nombre, precio: p.precio, cantidad: delta }];
      }
      return prev;
    });
  };

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
              <p className="text-xs text-slate-500">{t(lang, "footer_copy")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel derecho: Inicio (HOME) — Negocios + viajes */}
      <div className={`md:w-[420px] bg-white dark:bg-slate-900 md:border-l md:border-slate-200 dark:border-slate-800 md:shadow-xl p-5 flex flex-col gap-5 ${wizardActive ? "overflow-hidden" : "overflow-y-auto"} velocity-no-scrollbar`}>
        {/* ─── Wizard takes over the full panel when active ─── */}
        {wizardActive && (
          <div className="flex flex-col h-full min-h-0 animate-slide-up-soft">
            <TripWizard
              onClose={() => setWizardActive(false)}
              onConfirm={(data) => {
                setWizardTripData(data);
                setWizardActive(false);
                setStep("confirm");
              }}
            />
          </div>
        )}
        {!wizardActive && step === "select" && (
          <>
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft">
              <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100">{t(lang, "home_title")}</h1>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">{t(lang, "home_subtitle")}</span>
            </div>
            <div className="animate-slide-up-soft animation-delay-100">
              <BcvWidget />
            </div>
            {/* Negocios verificados — clic abre perfil del negocio */}
            <section className="pb-4 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft animation-delay-200">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {t(lang, "home_verified_biz")}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{t(lang, "home_verified_biz_desc")}</p>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-500 mb-2 flex items-center gap-1 rounded-lg bg-amber-50/80 dark:bg-amber-900/20 px-2 py-1 border border-amber-100 dark:border-amber-900/30">{t(lang, "home_bcv_ref")}</p>
              <div className="space-y-3 max-h-[280px] overflow-y-auto overflow-x-hidden velocity-no-scrollbar">
                {NEGOCIOS_VERIFICADOS.map((neg) => (
                  <div key={neg.id} className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800 hover:border-[#0EA5E9]/30 transition velocity-card">
                    <button type="button" onClick={() => setNegocioSeleccionado(neg)} className="w-full text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-800 dark:text-slate-100 text-sm">{neg.nombre}</span>
                        {neg.verified && (
                          <VerificationBadge role="emprendedor" type="standard" showText={true} />
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
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{t(lang, "home_verified_drivers")}</p>
            </div>



            {/* ¿Qué necesitas hoy? — Viajes y Envíos (Mandaito) */}
            <section className="pb-4 border-b border-slate-100 dark:border-slate-800 animate-slide-up-soft animation-delay-400">
              <h2 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-3">{t(lang, "home_what_need")}</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-3 bg-slate-50/50 dark:bg-slate-800/80 hover:border-[#0EA5E9]/30 transition velocity-card">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1 flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-[#0EA5E9]" /> {t(lang, "home_rides")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t(lang, "home_rides_desc")}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-500 mt-2">{t(lang, "home_rides_hint")}</p>
                </div>
                <Link href="/app/envios" className="rounded-xl border-2 border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 hover:border-[#0EA5E9]/40 hover:shadow-md transition velocity-card flex flex-col">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm mb-1 flex items-center gap-1.5">
                    <Package className="w-4 h-4" style={{ color: BRAND.colors.primary }} /> {t(lang, "nav_shipments")}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex-1">{t(lang, "home_shipments_desc")}</p>
                  <span className="text-xs font-medium mt-2 flex items-center gap-0.5" style={{ color: BRAND.colors.primary }}>
                    {t(lang, "home_send_pkg")} <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </section>

            {negocioSeleccionado && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto velocity-no-scrollbar" onClick={() => { setNegocioSeleccionado(null); setCarrito([]); }}>
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
                      <div className="w-16 h-16 rounded-xl border-2 border-white dark:border-slate-800 bg-white dark:bg-slate-800 shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
                        {negocioSeleccionado.logo === BRAND.logo ? (
                          <LocationIconOrange size={40} />
                        ) : negocioSeleccionado.logo ? (
                          <img src={negocioSeleccionado.logo} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <Building2 className="w-8 h-8 text-slate-500 dark:text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0 pb-0.5">
                        <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg truncate">{negocioSeleccionado.nombre}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{negocioSeleccionado.tipo}</p>
                        {negocioSeleccionado.verified && (
                          <VerificationBadge role="emprendedor" type="standard" className="mt-1" />
                        )}
                      </div>
                    </div>
                    {"descripcion" in negocioSeleccionado && negocioSeleccionado.descripcion && (
                      <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{negocioSeleccionado.descripcion}</p>
                    )}
                    <div className="space-y-2 mb-4 text-sm text-slate-600 dark:text-slate-300">
                      {"direccion" in negocioSeleccionado && negocioSeleccionado.direccion && (
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 flex-shrink-0 text-slate-400 dark:text-slate-500" />
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
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 mb-2">{t(lang, "biz_catalog")}</p>
                    <ul className="space-y-2 mb-4 max-h-44 overflow-y-auto velocity-no-scrollbar">
                      {negocioSeleccionado.productos.map((p: any, i: number) => {
                        const cartItem = carrito.find((item) => item.nombre === p.nombre);
                        const q = cartItem ? cartItem.cantidad : 0;
                        return (
                          <li key={i} className="py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-sm flex justify-between items-center gap-2 group hover:border-[#0EA5E9]/30 transition-colors">
                            <div className="flex-1 min-w-0">
                              <span className="font-semibold text-slate-800 dark:text-slate-100 block truncate">{p.nombre}</span>
                              <span className="font-extrabold" style={{ color: BRAND.colors.primary }}>${p.precio}</span>
                            </div>
                            <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 rounded-lg p-1 border border-slate-200 dark:border-slate-700 shadow-sm">
                              {q > 0 ? (
                                <>
                                  <button type="button" onClick={() => updateCartItem(p, -1)} className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center">−</button>
                                  <span className="w-6 text-center font-bold text-slate-800 dark:text-slate-100">{q}</span>
                                  <button type="button" onClick={() => updateCartItem(p, 1)} className="w-8 h-8 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center">+</button>
                                </>
                              ) : (
                                <button type="button" onClick={() => updateCartItem(p, 1)} className="px-4 py-1.5 h-8 rounded-md text-xs font-bold text-white shadow-sm flex items-center gap-1.5 hover:brightness-110 transition-all active:scale-95" style={{ backgroundColor: BRAND.colors.primary }}>
                                  {t(lang, "biz_add")}
                                </button>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    {carrito.length > 0 && (
                      <div className="mb-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center justify-between">
                          <span className="flex items-center gap-1.5"><ShoppingBag className="w-4 h-4 text-[#0EA5E9]" /> {t(lang, "biz_cart")}</span>
                          <span className="text-xs bg-[#0EA5E9]/10 text-[#0EA5E9] px-2 py-0.5 rounded-full">{carrito.length} {carrito.length === 1 ? t(lang, "biz_item") : t(lang, "biz_items")}</span>
                        </p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-3 max-h-32 overflow-y-auto velocity-no-scrollbar pr-1">
                          {carrito.map((item, i) => (
                            <li key={i} className="flex justify-between items-center group">
                              <span className="truncate pr-2 font-medium">{item.cantidad}x {item.nombre}</span>
                              <span className="font-bold text-slate-800 dark:text-slate-100 flex-shrink-0">${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200 dark:border-slate-700/50">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t(lang, "biz_total")}</span>
                          <span className="text-xl font-black text-[#0EA5E9]">${carrito.reduce((sum, i) => sum + parseFloat(i.precio) * i.cantidad, 0).toFixed(2)}</span>
                        </div>
                        <button type="button" onClick={() => setCarrito([])} className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors uppercase tracking-widest">{t(lang, "biz_empty_cart")}</button>
                      </div>
                    )}
                    <button type="button" className="w-full py-3.5 rounded-xl font-bold text-white text-sm flex items-center justify-center gap-2 shadow-lg shadow-velocity-primary/30 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none" style={{ backgroundColor: BRAND.colors.primary }} disabled={carrito.length === 0}>
                      <Wallet className="w-5 h-5" />
                      {carrito.length > 0 ? `${t(lang, "biz_pay_velo")} ($${carrito.reduce((s, i) => s + parseFloat(i.precio) * i.cantidad, 0).toFixed(2)})` : t(lang, "biz_cart_empty")}
                    </button>
                    <button type="button" onClick={() => { setNegocioSeleccionado(null); setCarrito([]); }} className="mt-3 w-full py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all active:scale-[0.98]">
                      {t(lang, "biz_close")}
                    </button>
                  </div>
                </div>
              </div>
            )}


            {/* ─── Trigger card — Pedir viaje ─── */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                type="button"
                onClick={() => setWizardActive(true)}
                className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-dashed border-[#F46E20]/50 dark:border-[#F46E20]/30 bg-[#F46E20]/5 hover:border-[#F46E20] hover:bg-[#F46E20]/10 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F46E20] flex items-center justify-center shadow-lg shadow-[#F46E20]/30 group-hover:scale-105 transition-transform shrink-0">
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-extrabold text-slate-800 dark:text-slate-100 text-[15px]">Pedir viaje</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Moto · Carro · 4×4 · Flete / Mudanza</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[#F46E20] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            </div>
          </>
        )}


        {!wizardActive && step === "confirm" && (
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
                      <VerificationBadge role="conductor" type="standard" />
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
                <div className="px-4 pb-4 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <button type="button" onClick={() => setShowConductorProfile(true)} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                      Ver perfil
                    </button>
                    <button type="button" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white shadow-md shadow-[#0EA5E9]/20 transition hover:opacity-90" style={{ backgroundColor: BRAND.colors.primary }}>
                      Llamar / Chat
                    </button>
                  </div>
                  {wizardTripData?.payment === "pago_movil" && (
                    <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] shadow-inner mb-2">
                      <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5 text-[#0EA5E9]" /> Datos Pago Móvil Conductor
                      </p>
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Banco</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">Banesco (0134)</span>
                        </div>
                        <div className="flex justify-between items-center text-xs group">
                          <span className="text-slate-500">Teléfono</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">04141234567</span>
                            <button title="Copiar Teléfono" type="button" onClick={() => { navigator.clipboard.writeText("04141234567"); alert("Teléfono copiado"); }} className="p-1 rounded-md text-slate-400 hover:text-[#0EA5E9] hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-xs group">
                          <span className="text-slate-500">Cédula</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-medium text-slate-800 dark:text-slate-200">V12345678</span>
                            <button title="Copiar Cédula" type="button" onClick={() => { navigator.clipboard.writeText("12345678"); alert("Cédula copiada"); }} className="p-1 rounded-md text-slate-400 hover:text-[#0EA5E9] hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <button type="button" onClick={() => setShowPaymentMethods(true)} className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800/80 border border-slate-800 dark:border-slate-700 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-slate-800 dark:hover:bg-slate-700 transition shadow-lg shrink-0 mt-1">
                    <Wallet className="w-4 h-4 text-emerald-400" /> Pagar Servicio (P2P)
                  </button>
                </div>
              </div>
              {showConductorProfile && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowConductorProfile(false)}>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-sm w-full p-5 border border-slate-200 dark:border-slate-800" onClick={(e) => e.stopPropagation()}>
                    <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Perfil del conductor</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-[#0EA5E9] flex items-center justify-center text-white">
                        <User className="w-7 h-7" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-white">Carlos Mendoza</p>
                        <VerificationBadge role="conductor" type="standard" />
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{vehicleDetail[vehicle]}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Color: {vehicleColors[vehicle]}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">⭐ 4.9 · Más de 520 viajes</p>
                    <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">Tarifa estimada: <strong className="text-slate-800 dark:text-white">${tarifa}</strong></p>
                    <button type="button" onClick={() => setShowConductorProfile(false)} className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition">Cerrar</button>
                  </div>
                </div>
              )}
              {showPaymentMethods && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowPaymentMethods(false)}>
                  <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 dark:border-slate-800 animate-scale-in" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-100 dark:border-slate-800/60 pb-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-500 border border-emerald-200 dark:border-emerald-800/30">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 dark:text-white text-lg">Pagar a Carlos</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Datos privados del conductor</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700/50">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-velocity-primary" />
                          Pago Móvil
                        </p>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center group">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Banco</span>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-slate-800 dark:text-slate-200">Banesco (0134)</span>
                              <button onClick={() => { navigator.clipboard.writeText("0134"); setCopied("banco"); setTimeout(() => setCopied(null), 2000); }} className="text-slate-400 hover:text-[#0EA5E9] transition-colors" title="Copiar código de banco">
                                {copied === "banco" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center group">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Teléfono</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold tracking-wide text-slate-800 dark:text-slate-200">0414-1234567</span>
                              <button onClick={() => { navigator.clipboard.writeText("04141234567"); setCopied("tlf"); setTimeout(() => setCopied(null), 2000); }} className="text-slate-400 hover:text-[#0EA5E9] transition-colors" title="Copiar teléfono">
                                {copied === "tlf" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between items-center group">
                            <span className="text-slate-500 dark:text-slate-400 font-medium">Cédula</span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-semibold tracking-wide text-slate-800 dark:text-slate-200">V-20123456</span>
                              <button onClick={() => { navigator.clipboard.writeText("20123456"); setCopied("ci"); setTimeout(() => setCopied(null), 2000); }} className="text-slate-400 hover:text-[#0EA5E9] transition-colors" title="Copiar cédula">
                                {copied === "ci" ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] font-medium text-center text-amber-700/80 dark:text-amber-500/80 mt-4 bg-amber-50/50 dark:bg-amber-900/10 p-2.5 rounded-lg border border-amber-100/50 dark:border-amber-900/20">
                      Copia los datos tocando el icono. Realiza el pago en tu banco e infórmale al conductor al abordar.
                    </p>

                    <button type="button" onClick={() => setShowPaymentMethods(false)} className="mt-4 w-full py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all active:scale-[0.98]">
                      Volver al viaje
                    </button>
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
