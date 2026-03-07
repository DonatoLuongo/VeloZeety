"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState } from "react";
import { Package, MapPin, User, Phone, FileText, ArrowRight, Truck, Bike, Car, Shield } from "lucide-react";

const VZ = "#F46E20"; // VeloZeety orange
const GREEN = "#059669"; // emerald-600 less bright

export default function EnviosPage() {
  const [tipoLogistica, setTipoLogistica] = useState<"mandaito" | "flete">("mandaito");
  const [vehiculo, setVehiculo] = useState<"moto" | "carro" | "camion">("moto");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreDestinatario, setNombreDestinatario] = useState("");
  const [telefonoDestinatario, setTelefonoDestinatario] = useState("");
  const [enviado, setEnviado] = useState(false);

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
        <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-8 md:p-12 shadow-xl text-center relative overflow-hidden">

          <div className="relative w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <div className="absolute inset-0 border border-[#F46E20] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20"></div>
            <div className="absolute inset-3 border border-[#F46E20] rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-40"></div>
            <div className="absolute inset-6 border border-[#F46E20] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-60"></div>

            <div className="absolute inset-0 rounded-full overflow-hidden opacity-50">
              <div className="w-1/2 h-full bg-gradient-to-r from-transparent to-[#F46E20]/40 origin-right animate-[spin_3s_linear_infinite]" />
            </div>

            <div className="relative z-10 w-14 h-14 rounded-full bg-[#F46E20] flex items-center justify-center shadow-[0_0_30px_rgba(244,110,32,0.5)]">
              {vehiculo === "moto" ? <Bike className="w-6 h-6 text-white" /> : vehiculo === "carro" ? <Car className="w-6 h-6 text-white" /> : <Truck className="w-6 h-6 text-white" />}
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Procesando Operación</h2>
          <div className="h-6 overflow-hidden mb-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">
              Contactando socios conductores cercanos...
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-velocity-border p-5 rounded-2xl text-left border border-slate-100 dark:border-white/5 mx-auto max-w-sm">
            <p className="text-[10px] font-bold text-[#F46E20] uppercase tracking-widest mb-3">Resumen de Ruta</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mb-3">
              {tipoLogistica === "mandaito" ? "Mandaíto Ligero" : "Flete Pesado Corporativo"} ({vehiculo.toUpperCase()})
            </p>
            <div className="flex flex-col gap-3 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-4 h-4 rounded-full bg-white dark:bg-velocity-surface border-4 border-[#F46E20] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{origen || "Buscando coordenadas..."}</span>
              </div>
              <div className="flex items-start gap-3 relative z-10">
                <div className="w-4 h-4 rounded-full bg-white dark:bg-velocity-surface border-4 border-[#059669] shrink-0 mt-0.5" />
                <span className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">{destino || "Buscando coordenadas..."}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Link href="/app" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 inline-flex items-center gap-1 transition-colors">
        ← Volver al inicio
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Logística Unificada</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Gestiona tus mandaitos, fletes y servicios de carga desde un solo lugar.
        </p>
      </div>

      {/* Selector de Tipo de Servicio */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <button
          onClick={() => { setTipoLogistica("mandaito"); if (vehiculo === "camion") setVehiculo("moto"); }}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${tipoLogistica === "mandaito"
            ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/10 shadow-sm"
            : "border-slate-200 dark:border-white/5 bg-white dark:bg-velocity-surface hover:border-slate-300 dark:hover:border-white/10"}`}
        >
          <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${tipoLogistica === "mandaito" ? "bg-[#F46E20] text-white shadow-md shadow-[#F46E20]/20" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"}`}>
            <Bike className="w-5 h-5" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white">Mandaíto</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Paquetes pequeños y diligencias rápidas.</p>
        </button>
        <button
          onClick={() => { setTipoLogistica("flete"); setVehiculo("camion"); }}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${tipoLogistica === "flete"
            ? "border-[#059669] bg-[#059669]/5 dark:bg-[#059669]/10 shadow-sm"
            : "border-slate-200 dark:border-white/5 bg-white dark:bg-velocity-surface hover:border-slate-300 dark:hover:border-white/10"}`}
        >
          <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${tipoLogistica === "flete" ? "bg-[#059669] text-white shadow-md shadow-[#059669]/20" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"}`}>
            <Truck className="w-5 h-5" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white">Flete Pesado</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Carga pesada, mudanzas o equipos grandes.</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-velocity-surface p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        {/* Selección de Vehículo */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Vehículo Requerido</label>
          <div className="flex gap-2">
            {[
              { id: "moto", label: "Moto", Icon: Bike, mode: "mandaito" },
              { id: "carro", label: "Automóvil", Icon: Car, mode: "mandaito" },
              { id: "camion", label: "Camión de Carga", Icon: Truck, mode: "flete" },
            ].map((v) => {
              const isDisabled = (tipoLogistica === "mandaito" && v.mode !== "mandaito") ||
                (tipoLogistica === "flete" && v.mode !== "flete");
              const isSelected = vehiculo === v.id;

              return (
                <button
                  key={v.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => setVehiculo(v.id as any)}
                  className={`flex-1 flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all h-24
                    ${isDisabled
                      ? "opacity-40 cursor-not-allowed bg-slate-100 border-slate-200 dark:bg-white/5 dark:border-white/5 grayscale"
                      : isSelected && v.mode === "mandaito"
                        ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/15 text-[#F46E20] font-bold shadow-sm"
                        : isSelected && v.mode === "flete"
                          ? "border-[#059669] bg-[#059669]/5 dark:bg-[#059669]/15 text-[#059669] font-bold shadow-sm"
                          : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-velocity-surface hover:border-slate-300 dark:hover:border-white/20 hover:scale-[1.02]"
                    }`}
                >
                  <v.Icon className="w-6 h-6" />
                  <span className="text-[11px] uppercase text-center leading-tight">{v.label}</span>
                </button>
              );
            })}
          </div>
          {tipoLogistica === "mandaito" && (
            <p className="text-[10px] text-slate-400 font-medium mt-2 text-center">Camión no disponible para diligencias ligeras (Mandaíto).</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 focus-within:text-[#F46E20] transition-colors">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Pickup (Origen)
            </label>
            <input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="Ej. Centro Financiero..."
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5 focus-within:text-[#059669] transition-colors">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Dropoff (Destino)
            </label>
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="Dirección de entrega"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500/20 focus:border-[#059669] outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-3 h-3" /> Guía de Despacho (Descripción)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Documentos, mercancía seca, repuestos..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition-all resize-none"
          />
        </div>

        {tipoLogistica === "flete" && (
          <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 animate-fade-in">
            <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-3">Parámetros de Carga</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase text-emerald-600/70 dark:text-emerald-400/70 font-bold mb-1">Peso Estimado (KG)</label>
                <input type="number" placeholder="Ej. 1500" className="w-full px-3 py-2 rounded-lg bg-white dark:bg-velocity-surface border border-emerald-200 dark:border-emerald-500/30 text-sm outline-none" />
              </div>
              <div>
                <label className="block text-[10px] uppercase text-emerald-600/70 dark:text-emerald-400/70 font-bold mb-1">Asistencia</label>
                <select className="w-full px-3 py-2 rounded-lg bg-white dark:bg-velocity-surface border border-emerald-200 dark:border-emerald-500/30 text-sm outline-none appearance-none">
                  <option>Sin ayudante</option>
                  <option>1 Ayudante (+ fee)</option>
                  <option>2 Ayudantes (+ fee)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-velocity-border border border-slate-200 dark:border-white/10">
          <p className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-widest mb-3">Receptor</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={nombreDestinatario}
                onChange={(e) => setNombreDestinatario(e.target.value)}
                placeholder="Nombre completo"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={telefonoDestinatario}
                onChange={(e) => setTelefonoDestinatario(e.target.value)}
                placeholder="+58 414 0000000"
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition shadow-xl shadow-[#F46E20]/25 hover:scale-[1.01] active:scale-[0.99]"
          style={{ backgroundColor: VZ }}
        >
          Confirmar y Buscar Socio Logístico
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
        <Shield className="w-5 h-5 text-slate-400 mt-0.5" />
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Operación B2B asegurada. Toda la mercancía recibe cobertura parcial automática mediante nuestra póliza corporativa. El costo técnico se tarifará por volumen (CBM) y kilometraje real.
        </p>
      </div>
    </div>
  );
}
