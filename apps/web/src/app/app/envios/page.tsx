"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState } from "react";
import { Package, MapPin, User, Phone, FileText, ArrowRight, Truck, Bike, Car } from "lucide-react";

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
      <div className="max-w-2xl mx-auto p-4 md:p-6 animate-fade-in">
        <Link href="/app" className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 inline-flex items-center gap-1 transition-colors">
          ← Volver al inicio
        </Link>
        <div className="bg-white dark:bg-[#393E46] rounded-3xl border border-slate-200 dark:border-white/5 p-8 shadow-xl text-center">
          <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Solicitud de Logística Enviada</h2>
          <p className="text-slate-600 dark:text-slate-400 text-base mb-6">
            Un conductor de la red {BRAND.name} verá tu solicitud y la aceptará según el tipo de vehículo requerido. Te notificaremos al instante.
          </p>
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl text-left mb-8 border border-slate-100 dark:border-white/5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Detalles del Envío</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 italic">
              {tipoLogistica === "mandaito" ? "Mandaito" : "Flete Pesado"} ({vehiculo})
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-slate-500">
              <span className="font-medium bg-white dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">{origen || "Origen —"}</span>
              <ArrowRight className="w-3 h-3" />
              <span className="font-medium bg-white dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/10">{destino || "Destino —"}</span>
            </div>
          </div>
          <Link href="/app" className="w-full inline-block py-4 rounded-2xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]" style={{ backgroundColor: BRAND.colors.primary }}>
            Volver al inicio
          </Link>
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
          onClick={() => { setTipoLogistica("mandaito"); setVehiculo("moto"); }}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${tipoLogistica === "mandaito"
            ? "border-velocity-primary bg-sky-50 dark:bg-velocity-primary/10 shadow-md"
            : "border-slate-200 dark:border-white/5 bg-white dark:bg-[#393E46] hover:border-slate-300"}`}
        >
          <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${tipoLogistica === "mandaito" ? "bg-velocity-primary text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"}`}>
            <Bike className="w-5 h-5" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white">Mandaito</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Paquetes pequeños y diligencias rápidas.</p>
        </button>
        <button
          onClick={() => { setTipoLogistica("flete"); setVehiculo("camion"); }}
          className={`p-4 rounded-2xl border-2 text-left transition-all ${tipoLogistica === "flete"
            ? "border-amber-500 bg-amber-50 dark:bg-amber-500/10 shadow-md"
            : "border-slate-200 dark:border-white/5 bg-white dark:bg-[#393E46] hover:border-slate-300"}`}
        >
          <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${tipoLogistica === "flete" ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400"}`}>
            <Truck className="w-5 h-5" />
          </div>
          <p className="font-bold text-slate-800 dark:text-white">Flete Pesado</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Carga pesada, mudanzas o equipos grandes.</p>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-[#393E46] p-6 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
        {/* Selección de Vehículo */}
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Vehículo Requerido</label>
          <div className="flex gap-2">
            {[
              { id: "moto", label: "Moto", Icon: Bike },
              { id: "carro", label: "Carro / SUV", Icon: Car },
              { id: "camion", label: "Camión / Flete", Icon: Truck },
            ].map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVehiculo(v.id as any)}
                className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${vehiculo === v.id
                  ? "border-velocity-primary bg-velocity-primary/5 text-velocity-primary font-bold"
                  : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-white/5 hover:border-slate-300"}`}
              >
                <v.Icon className="w-5 h-5" />
                <span className="text-[11px] uppercase">{v.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5 focus-within:text-velocity-primary transition-colors">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Punto de Origen
            </label>
            <input
              type="text"
              value={origen}
              onChange={(e) => setOrigen(e.target.value)}
              placeholder="¿Dónde recogemos?"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-velocity-primary/10 focus:border-velocity-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-1.5 focus-within:text-emerald-500 transition-colors">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-3 h-3" /> Punto de Destino
            </label>
            <input
              type="text"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
              placeholder="¿Dónde entregamos?"
              required
              className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <FileText className="w-3 h-3" /> Detalles de la Carga
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Describe brevemente qué vamos a transportar..."
            rows={3}
            className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:ring-4 focus:ring-velocity-primary/10 focus:border-velocity-primary outline-none transition-all resize-none"
          />
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20">
          <p className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-widest mb-3">Información del Destinatario</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="text"
                value={nombreDestinatario}
                onChange={(e) => setNombreDestinatario(e.target.value)}
                placeholder="Nombre"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-amber-200 dark:border-white/10 text-slate-800 dark:text-white text-sm outline-none"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
              <input
                type="tel"
                value={telefonoDestinatario}
                onChange={(e) => setTelefonoDestinatario(e.target.value)}
                placeholder="Teléfono"
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-white/5 border border-amber-200 dark:border-white/10 text-slate-800 dark:text-white text-sm outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition shadow-xl hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
          style={{ backgroundColor: BRAND.colors.primary }}
        >
          Confirmar Solicitud de Logística
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 flex items-center gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10">
        <Shield className="w-5 h-5 text-emerald-500" />
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
          Todos tus envíos están protegidos por el seguro de carga VeloZeety. El costo final se basa en volumen y distancia recorrida.
        </p>
      </div>
    </div>
  );
}

import { Shield } from "lucide-react";
