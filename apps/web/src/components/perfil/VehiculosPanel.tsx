"use client";

type VehiculosPanelProps = { embedInDashboard?: boolean };

export default function VehiculosPanel({ embedInDashboard }: VehiculosPanelProps) {
  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Mis vehículos</h2>
      <p className="text-slate-500 text-base mb-6">Gestionar vehículos (conductores)</p>
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-base">
        No tienes vehículos registrados. Si eres conductor, podrás añadirlos aquí.
      </div>
    </div>
  );
}
