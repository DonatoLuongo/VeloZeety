"use client";

import { useState } from "react";
import { History, Search, Calendar, MapPin, Bike, Car, Truck, ChevronRight } from "lucide-react";

// Mock data de viajes completados
const VIAJES_MOCK = [
  { id: "TR-001", fecha: "2026-03-08", tipo: "Moto", origen: "Centro Comercial Sambil", destino: "Barrio Obrero", monto: 2.50, estado: "completado" },
  { id: "TR-002", fecha: "2026-03-07", tipo: "Carro", origen: "Terminal de Pasajeros", destino: "Pueblo Nuevo", monto: 4.00, estado: "completado" },
  { id: "TR-003", fecha: "2026-03-05", tipo: "4x4", origen: "Paramillo", destino: "Santa Teresa", monto: 6.50, estado: "completado" },
  { id: "TR-004", fecha: "2026-03-02", tipo: "Carro", origen: "La Concordia", destino: "Universidad del Táchira", monto: 3.50, estado: "completado" },
  { id: "TR-005", fecha: "2026-02-28", tipo: "Moto", origen: "Plaza Bolivar", destino: "Barrio Sucre", monto: 1.50, estado: "completado" },
  { id: "TR-006", fecha: "2026-02-25", tipo: "Moto", origen: "UNET", destino: "Sambil", monto: 2.00, estado: "completado" },
  { id: "TR-007", fecha: "2026-02-20", tipo: "Camión", origen: "Zona Industrial", destino: "Mercado Pequeños Comerciantes", monto: 15.00, estado: "completado" },
  { id: "TR-008", fecha: "2026-02-15", tipo: "Carro", origen: "Las Lomas", destino: "Centro", monto: 4.50, estado: "completado" },
  { id: "TR-009", fecha: "2026-02-10", tipo: "4x4", origen: "Tariba", destino: "San Cristobal", monto: 7.00, estado: "completado" },
  { id: "TR-010", fecha: "2026-02-05", tipo: "Carro", origen: "Hospital Central", destino: "Barrio Obrero", monto: 3.00, estado: "completado" },
];

type HistorialPanelProps = { embedInDashboard?: boolean };

export default function HistorialPanel({ embedInDashboard }: HistorialPanelProps) {
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredViajes = VIAJES_MOCK.filter(viaje => {
    const matchSearch = viaje.origen.toLowerCase().includes(search.toLowerCase()) || 
                        viaje.destino.toLowerCase().includes(search.toLowerCase()) ||
                        viaje.id.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateFilter ? viaje.fecha === dateFilter : true;
    return matchSearch && matchDate;
  });

  const totalPages = Math.ceil(filteredViajes.length / itemsPerPage);
  const paginatedViajes = filteredViajes.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const getTypeIcon = (tipo: string) => {
    switch (tipo) {
      case "Moto": return <Bike className="w-5 h-5 text-sky-500" />;
      case "Carro": return <Car className="w-5 h-5 text-emerald-500" />;
      case "4x4": return <Car className="w-5 h-5 text-amber-500" />;
      case "Camión": return <Truck className="w-5 h-5 text-purple-500" />;
      default: return <Car className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-4xl mx-auto p-4 md:p-6 animate-fade-in"}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
            <History className="w-5 h-5 text-[#F46E20]" /> Historial de Viajes
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Resumen de todos tus servicios tomados.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Buscar origen, destino o ID..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white outline-none focus:border-[#F46E20] focus:ring-1 focus:ring-[#F46E20]/20"
            />
          </div>
          <div className="relative md:w-40">
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
              className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white outline-none focus:border-[#F46E20] focus:ring-1 focus:ring-[#F46E20]/20"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] shadow-sm overflow-hidden">
        {paginatedViajes.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
              <History className="w-8 h-8 text-slate-300 dark:text-slate-600" />
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-semibold">
              {search || dateFilter ? "No se encontraron viajes con esos filtros" : "No has realizado ningún viaje aún."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-[#2B3139]/50">
            {paginatedViajes.map((viaje) => (
              <li key={viaje.id} className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex flex-1 gap-4 items-center overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0">
                    {getTypeIcon(viaje.tipo)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{viaje.origen}</p>
                      <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                      <p className="font-bold text-slate-800 dark:text-white text-sm truncate">{viaje.destino}</p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">{viaje.id}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(viaje.fecha + "T00:00:00").toLocaleDateString('es-VE', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span className="capitalize hidden sm:inline-block">· {viaje.tipo}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex w-full sm:w-auto items-center justify-between sm:flex-col sm:items-end sm:justify-center border-t border-slate-100 dark:border-white/5 sm:border-0 pt-3 sm:pt-0">
                  <p className="font-black text-slate-800 dark:text-white text-lg">{viaje.monto.toFixed(2)} <span className="text-xs text-[#F46E20] font-bold">VELO</span></p>
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20">
                    {viaje.estado}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center text-sm px-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">
            Página {page} de {totalPages}
          </span>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-600 dark:text-slate-300 disabled:opacity-50 transition-colors font-medium hover:bg-slate-50 dark:hover:bg-white/5"
            >
              Anterior
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-600 dark:text-slate-300 disabled:opacity-50 transition-colors font-medium hover:bg-slate-50 dark:hover:bg-white/5"
            >
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
