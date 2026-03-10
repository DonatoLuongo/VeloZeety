"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { Package, MapPin, User, Phone, FileText, ArrowRight, Truck, Bike, Car, Shield, Navigation, Loader2, X } from "lucide-react";

const VZ = "#F46E20"; // VeloZeety orange
const GREEN = "#059669"; // emerald-600 less bright

import AddressInput from "@/components/ui/AddressInput";

export default function EnviosPage() {
  const [tipoLogistica, setTipoLogistica] = useState<"mandaito" | "flete">("mandaito");
  const [vehiculo, setVehiculo] = useState<"moto" | "carro" | "camion">("moto");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreDestinatario, setNombreDestinatario] = useState("");
  const [telefonoDestinatario, setTelefonoDestinatario] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [isGeolocating, setIsGeolocating] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);

  const handleGeolocate = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Tu navegador no soporta geolocalización.");
      return;
    }
    setIsGeolocating(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Use OpenStreetMap Nominatim for reverse geocoding (free, no API key)
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            { headers: { "Accept-Language": "es" } }
          );
          const data = await res.json();
          if (data.display_name) {
            setOrigen(data.display_name.split(",").slice(0, 3).join(",").trim());
          } else {
            setOrigen(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        } catch {
          // Fallback to coordinates
          setOrigen(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        setIsGeolocating(false);
      },
      (error) => {
        setIsGeolocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGeoError("Permiso de ubicación denegado. Actívalo en tu navegador.");
            break;
          case error.POSITION_UNAVAILABLE:
            setGeoError("Tu ubicación no está disponible en este momento.");
            break;
          case error.TIMEOUT:
            setGeoError("Tiempo de espera agotado. Intenta de nuevo.");
            break;
          default:
            setGeoError("No se pudo obtener tu ubicación.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 animate-fade-in flex flex-col justify-center min-h-[70vh]">
        <Link href="/app" className="text-sm text-slate-500 hover:text-[#F46E20] dark:text-slate-400 mb-6 inline-flex items-center gap-1 transition-colors">
          ← Cancelar y volver
        </Link>
        <div className="bg-white dark:bg-[#1E2329] rounded-3xl border border-slate-200 dark:border-[#2B3139] p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="relative w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <div className={`absolute inset-0 border rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20 ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]' : 'border-blue-500'}`}></div>
            <div className={`absolute inset-3 border rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-40 ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]' : 'border-blue-500'}`}></div>
            <div className={`absolute inset-6 border rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-60 ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]' : 'border-blue-500'}`}></div>
            <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl ${tipoLogistica === 'mandaito' ? 'bg-[#F46E20] shadow-[#F46E20]/50' : 'bg-blue-600 shadow-blue-500/50'}`}>
              {vehiculo === "moto" ? <Bike className="w-8 h-8" /> : vehiculo === "carro" ? <Car className="w-8 h-8" /> : <Truck className="w-8 h-8" />}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Procesando Operación</h2>
          <div className="h-6 overflow-hidden mb-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">Contactando socios logísticos cercanos...</p>
          </div>
          <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl text-left border border-slate-100 dark:border-white/10 mx-auto max-w-sm">
            <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${tipoLogistica === 'mandaito' ? 'text-[#F46E20]' : 'text-blue-500'}`}>Resumen de Ruta</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-4">{tipoLogistica === "mandaito" ? "Mandaíto Ligero" : "Flete Pesado Corporativo"} ({vehiculo.toUpperCase()})</p>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-start gap-4 relative z-10">
                <div className={`w-5 h-5 rounded-full bg-white dark:bg-[#1E2329] border-4 shrink-0 mt-0.5 ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]' : 'border-blue-500'}`} />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{origen || "Ubicación actual"}</span>
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-5 h-5 rounded-full bg-white dark:bg-[#1E2329] border-4 border-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{destino || "Destino pendiente"}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-white/10">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2"><User className="w-3.5 h-3.5" /> {nombreDestinatario || "Sin nombre"}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const INPUT_CLASS = "w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] transition-all text-sm";
  const BLUE_INPUT_CLASS = "w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm";

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 animate-fade-in-up">
      <Link href="/app" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 inline-flex items-center gap-1 transition-colors">
        ← Volver al inicio
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2 tracking-tight flex items-center gap-3">
          <Package className={`w-8 h-8 ${tipoLogistica === 'mandaito' ? 'text-[#F46E20]' : 'text-blue-500'}`} /> 
          Logística Unificada
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona tus envíos ligeros o mudanzas pesadas desde un solo lugar, con rastreo en vivo y seguro integrado.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <button
          onClick={() => { setTipoLogistica("mandaito"); if (vehiculo === "camion") setVehiculo("moto"); }}
          className={`p-5 rounded-2xl border-2 text-left transition-all overflow-hidden relative group ${tipoLogistica === "mandaito" ? "border-[#F46E20] bg-[#F46E20]/5 shadow-sm" : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] hover:border-slate-300 dark:hover:border-white/20"}`}
        >
          {tipoLogistica === "mandaito" && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-[#F46E20]/20 to-transparent rounded-bl-full" />}
          <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${tipoLogistica === "mandaito" ? "bg-[#F46E20] text-white shadow-lg shadow-[#F46E20]/30" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"}`}>
            <Bike className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white text-lg leading-tight mb-1">Mandaíto</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Paquetes, comida y diligencias Express.</p>
        </button>

        <button
          onClick={() => { setTipoLogistica("flete"); setVehiculo("camion"); }}
          className={`p-5 rounded-2xl border-2 text-left transition-all overflow-hidden relative group ${tipoLogistica === "flete" ? "border-blue-500 bg-blue-500/5 shadow-sm" : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] hover:border-slate-300 dark:hover:border-white/20"}`}
        >
          {tipoLogistica === "flete" && <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-full" />}
          <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-colors ${tipoLogistica === "flete" ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30" : "bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"}`}>
            <Truck className="w-6 h-6" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white text-lg leading-tight mb-1">Flete Pesado</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Mudanzas, maquinaria y carga mayor.</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección Vehículo */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 1: Tipo de Vehículo</label>
          <div className="flex gap-3">
            {[
              { id: "moto", label: "Moto", Icon: Bike, mode: "mandaito" },
              { id: "carro", label: "Auto", Icon: Car, mode: "mandaito" },
              { id: "camion", label: "Camión", Icon: Truck, mode: "flete" },
            ].map((v) => {
              const isDisabled = (tipoLogistica === "mandaito" && v.mode !== "mandaito") || (tipoLogistica === "flete" && v.mode !== "flete");
              const isSelected = vehiculo === v.id;
              const colorClass = tipoLogistica === "flete" ? "border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400" : "border-[#F46E20] bg-[#F46E20]/10 text-[#F46E20]";

              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setVehiculo(v.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all h-28 ${isDisabled ? "opacity-30 cursor-not-allowed bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-transparent grayscale" : isSelected ? `${colorClass} shadow-md` : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                >
                  <v.Icon className="w-7 h-7" />
                  <span className="text-xs font-bold uppercase tracking-wider">{v.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Sección Ruta con Autocompletado y Geolocalización */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 2: Ruta del Envío</label>
          <div className="space-y-4 relative">
            <div className={`absolute left-5 top-[50px] bottom-[50px] w-0.5 border-l-2 border-dashed ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]/30' : 'border-blue-500/30'}`} />
            
            {/* Input Origen con Geolocalización + Autocompletado */}
            <div className="relative pl-12">
              <div className={`absolute left-3.5 top-5 w-4 h-4 rounded-full border-[4px] bg-white dark:bg-[#1E2329] z-10 ${tipoLogistica === 'mandaito' ? 'border-[#F46E20]' : 'border-blue-500'}`} />
              <AddressInput
                value={origen}
                onChange={setOrigen}
                placeholder="¿Dónde recogemos el paquete?"
                required
                className={`${tipoLogistica === 'mandaito' ? INPUT_CLASS : BLUE_INPUT_CLASS} pr-12`}
                showGeolocate
                onGeolocate={handleGeolocate}
                isGeolocating={isGeolocating}
              />
            </div>

            {/* Mensaje de error de geolocalización */}
            {geoError && (
              <div className="ml-12 flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
                <X className="w-3.5 h-3.5 shrink-0" />
                {geoError}
                <button type="button" onClick={() => setGeoError(null)} className="ml-auto text-red-400 hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Input Destino con Autocompletado */}
            <div className="relative pl-12">
              <div className="absolute left-3.5 top-5 w-4 h-4 rounded-full border-[4px] border-emerald-500 bg-white dark:bg-[#1E2329] z-10" />
              <AddressInput
                value={destino}
                onChange={setDestino}
                placeholder="¿Cuál es el destino final?"
                required
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm"
              />
            </div>
          </div>
        </section>

        {/* Sección Detalles */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 3: Detalles y Receptor</label>
          <div className="space-y-4">
            <div className="relative">
              <FileText className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Describe qué vas a enviar (Ej. 1 caja pequeña, documentos, ropa...)" rows={2} className={`w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all text-sm resize-none ${tipoLogistica === 'mandaito' ? 'focus:ring-[#F46E20]/20 focus:border-[#F46E20]' : 'focus:ring-blue-500/20 focus:border-blue-500'}`} />
            </div>

            {tipoLogistica === "flete" && (
              <div className="grid grid-cols-2 gap-4 animate-fade-in">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">KG</span>
                  <input type="number" placeholder="Peso est." className={BLUE_INPUT_CLASS + " pl-12"} />
                </div>
                <select className={BLUE_INPUT_CLASS + " appearance-none cursor-pointer"}>
                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">Sin ayudante</option>
                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">1 Ayudante de carga</option>
                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white">2 Ayudantes de carga</option>
                </select>
              </div>
            )}

            <div className="border border-slate-200 dark:border-[#2B3139] rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 dark:bg-white/[0.02] p-3 border-b border-slate-200 dark:border-[#2B3139]">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> Datos del Receptor</p>
              </div>
              <div className="flex flex-col sm:flex-row bg-white dark:bg-[#1E2329]">
                <input type="text" value={nombreDestinatario} onChange={(e) => setNombreDestinatario(e.target.value)} placeholder="Nombre o Empresa" required className="w-full sm:w-1/2 p-3.5 border-b sm:border-b-0 sm:border-r border-slate-200 dark:border-[#2B3139] bg-transparent text-sm font-medium focus:outline-none dark:text-white" />
                <input type="tel" value={telefonoDestinatario} onChange={(e) => setTelefonoDestinatario(e.target.value)} placeholder="Telf: +58 412..." required className="w-full sm:w-1/2 p-3.5 border-none bg-transparent text-sm font-medium focus:outline-none dark:text-white" />
              </div>
            </div>
          </div>
        </section>

        <button type="submit" className={`w-full py-5 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md ${tipoLogistica === 'mandaito' ? 'bg-[#F46E20] hover:bg-[#D95D1A]' : 'bg-blue-600 hover:bg-blue-700'}`}>
          Confirmar y Buscar Socio <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-500/5">
        <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-[13px] text-emerald-800 dark:text-emerald-400 font-medium leading-relaxed">
          <strong>Seguro de Carga Integrado.</strong> Todos nuestros viajes empresariales y despachos en Logística Unificada cuentan con póliza de seguro y seguimiento por GPS en vivo, brindado total garantía B2B y D2C.
        </p>
      </div>
    </div>
  );
}
