"use client";

import { useState, useCallback } from "react";
import { ArrowRight, Truck, Bike, Car, Shield, X, MapPin, Wrench, AlertTriangle, Battery, Key } from "lucide-react";
import AddressInput from "@/components/ui/AddressInput";
import { GruaIcon } from "@/components/ui/GruaIcon";
import Link from "next/link";

type VehiculoType = "moto" | "carro" | "camioneta" | "pesado";
type FallaType = "choque" | "falla_motor" | "caucho" | "bateria" | "llaves" | "otro";

const FALLAS: { id: FallaType; label: string; icon: any }[] = [
  { id: "choque", label: "Choque / Colisión", icon: AlertTriangle },
  { id: "falla_motor", label: "Falla Mecánica", icon: Wrench },
  { id: "caucho", label: "Caucho Espichado", icon: MapPin }, // Usaremos MapPin provisionalmente o un icono acorde
  { id: "bateria", label: "Batería / Eléctrico", icon: Battery },
  { id: "llaves", label: "Llaves Perdidas", icon: Key },
];

export default function GruaWizard({ onBack }: { onBack: () => void }) {
  const [vehiculo, setVehiculo] = useState<VehiculoType>("carro");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [falla, setFalla] = useState<FallaType>("falla_motor");
  const [notas, setNotas] = useState("");
  const [enviado, setEnviado] = useState(false);
  
  // Geolocation
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
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`, {
            headers: { "Accept-Language": "es" }
          });
          const data = await res.json();
          if (data.display_name) {
            setOrigen(data.display_name.split(",").slice(0, 3).join(",").trim());
          } else {
            setOrigen(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          }
        } catch {
          setOrigen(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        }
        setIsGeolocating(false);
      },
      (error) => {
        setIsGeolocating(false);
        setGeoError("No se pudo obtener tu ubicación automática.");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  const INPUT_CLASS = "w-full px-4 py-3.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] transition-all text-sm";

  if (enviado) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-6 animate-fade-in flex flex-col justify-center min-h-[70vh]">
        <button onClick={onBack} className="text-sm text-slate-500 hover:text-[#F46E20] dark:text-slate-400 mb-6 inline-flex items-center gap-1 transition-colors tracking-wide">
          ← Cancelar y volver a Servicios
        </button>
        <div className="bg-white dark:bg-[#1E2329] rounded-3xl border border-slate-200 dark:border-[#2B3139] p-8 md:p-12 shadow-2xl text-center relative overflow-hidden">
          <div className="relative w-32 h-32 flex items-center justify-center mx-auto mb-8">
            <div className={`absolute inset-0 border border-[#F46E20] rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-20`}></div>
            <div className={`absolute inset-3 border border-[#F46E20] rounded-full animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s] opacity-40`}></div>
            <div className={`absolute inset-6 border border-[#F46E20] rounded-full animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1s] opacity-60`}></div>
            <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-xl bg-[#F46E20] shadow-[#F46E20]/50`}>
               <GruaIcon className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 tracking-tight">Solicitando Unidad de Rescate</h2>
          <div className="h-6 overflow-hidden mb-8">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">Contactando a las grúas más cercanas...</p>
          </div>
          <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl text-left border border-slate-100 dark:border-white/10 mx-auto max-w-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#F46E20] mb-3">Resumen de Asistencia</p>
            <p className="text-sm text-slate-700 dark:text-slate-300 font-bold mb-4">Remolcar {vehiculo.toUpperCase()} | Motivo: {FALLAS.find(f => f.id === falla)?.label}</p>
            <div className="flex flex-col gap-4 relative">
              <div className="absolute left-[9px] top-3 bottom-3 w-0.5 bg-slate-200 dark:bg-slate-700" />
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-5 h-5 rounded-full bg-white dark:bg-[#1E2329] border-4 border-[#F46E20] shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{origen || "Posición GPS"}</span>
              </div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-5 h-5 rounded-full bg-white dark:bg-[#1E2329] border-4 border-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{destino || "Destino pendiente"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-6 animate-fade-in-up">
      <button onClick={onBack} className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 mb-6 inline-flex items-center gap-1 transition-colors tracking-wide">
        ← Volver a Servicios
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-[#F46E20] mb-2 tracking-tight flex items-center gap-3">
          <GruaIcon className="w-8 h-8 text-[#F46E20]" /> 
          Asistencia de Grúa 24/7
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Rescate y traslado profesional para tu vehículo en cualquier momento, con monitoreo GPS en vivo.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Paso 1 */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 1: ¿Qué tipo de vehículo vamos a trasladar?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "moto", label: "Moto", icon: Bike },
              { id: "carro", label: "Auto", icon: Car },
              { id: "camioneta", label: "Camioneta", icon: Truck },
              { id: "pesado", label: "Pesado", icon: Truck },
            ].map((v) => {
              const isSelected = vehiculo === v.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVehiculo(v.id as VehiculoType)}
                  className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all h-28 ${isSelected ? "border-[#F46E20] bg-[#F46E20]/10 text-[#F46E20] shadow-md" : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                >
                  <v.icon className="w-7 h-7" />
                  <span className="text-xs font-bold uppercase tracking-wider">{v.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Paso 2 */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
          <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 2: Coordenadas de Asistencia</label>
          <div className="space-y-4 relative">
            <div className="absolute left-5 top-[50px] bottom-[50px] w-0.5 border-l-2 border-dashed border-[#F46E20]/30" />
            
            <div className="relative pl-12">
              <div className="absolute left-3.5 top-5 w-4 h-4 rounded-full border-[4px] border-[#F46E20] bg-white dark:bg-[#1E2329] z-10" />
              <AddressInput
                value={origen}
                onChange={setOrigen}
                placeholder="¿Dónde te quedaste accidentado?"
                required
                className={`${INPUT_CLASS} pr-12`}
                showGeolocate
                onGeolocate={handleGeolocate}
                isGeolocating={isGeolocating}
              />
            </div>

            {geoError && (
              <div className="ml-12 flex items-center gap-2 text-xs text-red-500 font-medium bg-red-50 dark:bg-red-500/10 px-3 py-2 rounded-lg">
                <X className="w-3.5 h-3.5 shrink-0" />
                {geoError}
                <button type="button" onClick={() => setGeoError(null)} className="ml-auto text-red-400 hover:text-red-600">
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="relative pl-12">
              <div className="absolute left-3.5 top-5 w-4 h-4 rounded-full border-[4px] border-emerald-500 bg-white dark:bg-[#1E2329] z-10" />
              <AddressInput
                value={destino}
                onChange={setDestino}
                placeholder="¿A dónde llevamos el vehículo (Taller, Casa...)?"
                required
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </section>

        {/* Paso 3 */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm">
           <label className="block text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Paso 3: Diagnóstico Previo</label>
           
           <div className="space-y-5">
              <div>
                 <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">¿Por qué necesitas la grúa?</p>
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                   {FALLAS.map((f) => {
                     const isSelected = falla === f.id;
                     return (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setFalla(f.id)}
                          className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition-all ${isSelected ? "border-[#F46E20] bg-[#F46E20]/10 text-[#F46E20]" : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                        >
                           <f.icon className="w-4 h-4" />
                           {f.label}
                        </button>
                     )
                   })}
                 </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Detalles Adicionales del Rescate (Opcional)</p>
                <textarea 
                  value={notas} 
                  onChange={(e) => setNotas(e.target.value)} 
                  placeholder="Ej: Estoy atrapado en un sótano 2, el carro no frena, la dirección está bloqueada, etc." 
                  rows={2} 
                  className={`${INPUT_CLASS} resize-none`} 
                />
              </div>
           </div>
        </section>

        <button type="submit" className="w-full py-5 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-[#F46E20]/20 bg-[#F46E20] hover:bg-[#D95D1A]">
          Confirmar y Asignar Grúa <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <div className="mt-8 flex items-start gap-4 p-5 rounded-2xl border border-[#F46E20]/20 bg-[#F46E20]/5">
        <Shield className="w-6 h-6 text-[#F46E20] shrink-0 mt-0.5" />
        <p className="text-[13px] text-[#F46E20] dark:text-[#F46E20] font-medium leading-relaxed">
          <strong>Traslados Seguros.</strong> Todas nuestras grúas son auditadas y cuentan con seguros de carga y manipulación para tu vehículo. Podrás rastrear el recorrido en tiempo real hasta su destino.
        </p>
      </div>
    </div>
  );
}
