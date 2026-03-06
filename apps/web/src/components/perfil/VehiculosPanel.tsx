"use client";

import { useState } from "react";
import { Car, AlertCircle, FileText, Camera, ShieldCheck, ChevronRight, Plus } from "lucide-react";

type VehiculosPanelProps = { embedInDashboard?: boolean };

export default function VehiculosPanel({ embedInDashboard }: VehiculosPanelProps) {
  const [adding, setAdding] = useState(false);

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
        <div className="bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-white/10 rounded-2xl p-6 shadow-sm animate-fade-in">

          {/* Alerta Institucional de Requisitos Legales */}
          <div className="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-300">Requisitos Legales Estrictos VeloZeety</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 leading-relaxed">
                Para el ingreso y certificación de cualquier vehículo en nuestra flota (Mandaíto o Flete), es <strong>obligatorio</strong> adjuntar la siguiente documentación. Cuentas con documentos falsos serán bloqueadas permanentemente por seguridad.
              </p>
              <ul className="mt-3 space-y-2 text-xs text-amber-800 dark:text-amber-300">
                <li className="flex items-center gap-2 font-medium"><ShieldCheck className="w-3.5 h-3.5" /> Carnet de Circulación a nombre del titular.</li>
                <li className="flex items-center gap-2 font-medium"><FileText className="w-3.5 h-3.5" /> RCV (Responsabilidad Civil de Vehículos) Vigente.</li>
                <li className="flex items-center gap-2 font-medium"><Camera className="w-3.5 h-3.5" /> 4 Fotografías nítidas (Frontal, Trasera, Laterales).</li>
              </ul>
            </div>
          </div>

          <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); setAdding(false); }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Placa / Patente</label>
                <input required type="text" placeholder="Ej. ABC-123" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Marca y Modelo</label>
                <input required type="text" placeholder="Ej. Ford Cargo 815" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:border-[#2563EB]" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Tipo</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none appearance-none">
                  <option>Moto (Mandaíto)</option>
                  <option>Automóvil / SUV</option>
                  <option>Camión / Flete</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Año</label>
                <input required type="number" min="1990" max="2025" placeholder="Ej. 2018" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:border-[#2563EB]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5">Color</label>
                <input required type="text" placeholder="Ej. Blanco" className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-900 dark:text-white outline-none focus:border-[#2563EB]" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-white/10 flex gap-3">
              <button type="button" onClick={() => setAdding(false)} className="px-5 py-2.5 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition">
                Cancelar
              </button>
              <button type="submit" className="flex-1 px-5 py-2.5 rounded-xl font-bold text-white bg-[#2563EB] hover:bg-blue-700 transition">
                Someter a Verificación Legal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Vehículo Activo Dummy */}
          <div className="bg-white dark:bg-[#1E293B] border-2 border-[#10B981]/30 rounded-2xl p-5 shadow-sm flex items-start gap-4 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-[#10B981]">
              <Car className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Toyota Yaris (2021)</h3>
                <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/20">Aprobado</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Placa: AD345FG · Color: Gris Plomo</p>
              <div className="flex items-center gap-5 mt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="w-4 h-4" /> RCV Vigente</span>
                <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> Documentación Ok</span>
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
