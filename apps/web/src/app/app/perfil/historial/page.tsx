export default function HistorialPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Historial de viajes</h1>
      <p className="text-slate-500 text-sm mb-6">Ver todos tus viajes</p>
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
        No hay viajes aún. Cuando pidas tu primer viaje, aparecerá aquí.
      </div>
    </div>
  );
}
