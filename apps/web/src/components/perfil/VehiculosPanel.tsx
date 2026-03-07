"use client";

import { useState } from "react";
import { Car, AlertCircle, FileText, Camera, ShieldCheck, ChevronRight, Plus, Bike, Truck, UploadCloud } from "lucide-react";

type VehiculosPanelProps = { embedInDashboard?: boolean };

export default function VehiculosPanel({ embedInDashboard }: VehiculosPanelProps) {
  const [adding, setAdding] = useState(false);
  const [tipo, setTipo] = useState<"Moto" | "Carro" | "4x4" | "Camión">("Carro");

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-900 dark:text-white font-medium placeholder:text-slate-400 bg-white dark:bg-[#1E2329]";
  const selectClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-900 dark:text-white font-medium bg-white dark:bg-[#1E2329] appearance-none cursor-pointer";
  const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5";
  const optionClass = "bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white";

  const renderUploadBox = (label: string, optional = false) => (
    <div className="border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition">
      <UploadCloud className="w-6 h-6 text-slate-400 dark:text-slate-500 mb-2" />
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{label}</span>
      {optional && <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">(Opcional)</span>}
    </div>
  );

  return (
    <div className={embedInDashboard ? "w-full" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Mis Vehículos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Validación y control de flota activa.</p>
        </div>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className="px-5 py-2.5 bg-velocity-primary text-white text-sm font-black rounded-2xl hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-velocity-primary/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Registrar Vehículo
          </button>
        )}
      </div>

      {adding ? (
        <div className="bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm overflow-hidden animate-fade-in-up transition-colors">
          <div className="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400">Requisitos Legales Estrictos VeloZeety</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 leading-relaxed">
                Para el ingreso y certificación de cualquier vehículo, es <strong>obligatorio</strong> adjuntar la documentación correcta. Documentos falsos resultarán en bloqueo permanente.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setAdding(false); }}>

            {/* Tabs de tipo de vehículo */}
            <div>
              <label className={labelClass}>Tipo de Vehículo</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["Moto", "Carro", "4x4", "Camión"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 font-bold transition-colors ${tipo === t ? "border-[#F46E20] bg-[#F46E20]/10 text-[#F46E20]" : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                  >
                    {t === "Moto" && <Bike className="w-5 h-5 mb-1" />}
                    {(t === "Carro" || t === "4x4") && <Car className="w-5 h-5 mb-1" />}
                    {t === "Camión" && <Truck className="w-5 h-5 mb-1" />}
                    <span className="text-xs">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Datos Comunes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Placa / Patente</label><input required type="text" placeholder="Ej. ABC-123" className={inputClass} /></div>
              <div><label className={labelClass}>Marca y Modelo</label><input required type="text" placeholder={`Ej. ${tipo === 'Moto' ? 'Empire Keeway' : 'Ford Cargo 815'}`} className={inputClass} /></div>
              <div><label className={labelClass}>Color</label><input required type="text" placeholder="Ej. Blanco" className={inputClass} /></div>
              <div><label className={labelClass}>Año</label><input required type="number" min="1990" max="2025" placeholder="Ej. 2018" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Estado Mécánico/Estético</label>
                <select className={selectClass}>
                  <option className={optionClass}>Excelente</option>
                  <option className={optionClass}>Bueno</option>
                  <option className={optionClass}>Regular (Aceptable)</option>
                </select>
              </div>

              {/* Información Dinámica según Tipo */}
              {tipo === "Moto" && (
                <div><label className={labelClass}>Cilindrada (CC)</label><input type="text" placeholder="Ej. 150cc" className={inputClass} /></div>
              )}
              {(tipo === "Carro" || tipo === "4x4") && (
                <div>
                  <label className={labelClass}>Capacidad Pasajeros</label>
                  <select className={selectClass}>
                    <option className={optionClass}>4 Asientos</option>
                    <option className={optionClass}>5 Asientos</option>
                    <option className={optionClass}>7 Asientos</option>
                  </select>
                </div>
              )}
              {tipo === "Camión" && (
                <div><label className={labelClass}>Capacidad Carga (Kg)</label><input type="text" placeholder="Ej. 3500 kg" className={inputClass} /></div>
              )}
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Documentación del Titular</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {renderUploadBox("Cédula de Identidad (V/E)")}
                {renderUploadBox("RIF Vigente")}
                {renderUploadBox("Pasaporte", true)}
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-white/5 pt-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Documentación del Vehículo</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {renderUploadBox("Carnet de Circulación")}
                {renderUploadBox("Seguro RCV")}
                {renderUploadBox("Foto de la Placa")}
                {renderUploadBox("Fotos Exteriores (4)")}
              </div>
            </div>

            <div className="pt-6 flex gap-3">
              <button type="button" onClick={() => setAdding(false)} className="px-5 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition">
                Cancelar
              </button>
              <button type="submit" className="flex-1 px-5 py-3 rounded-xl font-bold text-white bg-velocity-primary hover:brightness-110 shadow-lg shadow-velocity-primary/20 transition active:scale-[0.98]">
                Someter a Verificación Legal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white dark:bg-velocity-surface border-2 border-[#10B981]/30 rounded-2xl p-5 shadow-sm flex items-start gap-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-[#10B981]">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Toyota Yaris (2021)</h3>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/20">Aprobado</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Placa: AD345FG · Color: Gris Plomo</p>
              <div className="flex items-center gap-4 mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex-wrap">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> RCV Ok</span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><FileText className="w-3.5 h-3.5" /> CI / RIF Ok</span>
              </div>
            </div>
            <button className="p-3 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-2xl transition-all active:scale-90">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
