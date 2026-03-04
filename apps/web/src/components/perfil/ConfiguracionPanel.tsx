"use client";

type ConfiguracionPanelProps = { embedInDashboard?: boolean };

export default function ConfiguracionPanel({ embedInDashboard }: ConfiguracionPanelProps) {
  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Configuración</h2>
      <p className="text-slate-500 text-base mb-6">Preferencias y ajustes</p>
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-500 text-base">
        Opciones de configuración (notificaciones, idioma, privacidad) próximamente.
      </div>
    </div>
  );
}
