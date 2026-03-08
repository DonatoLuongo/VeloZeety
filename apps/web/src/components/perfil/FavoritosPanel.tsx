"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, User, Star } from "lucide-react";

const FAVORITOS_MOCK = [
  { id: "1", nombre: "Carlos M.", valoracion: 4.9, viajes: 520, vehiculo: "Toyota Corolla" },
  { id: "2", nombre: "María L.", valoracion: 5.0, viajes: 312, vehiculo: "Honda XR 150" },
  { id: "3", nombre: "Eduardo F.", valoracion: 4.8, viajes: 145, vehiculo: "Ford Fiesta" },
  { id: "4", nombre: "Ana R.", valoracion: 4.9, viajes: 890, vehiculo: "Chevrolet Spark" },
  { id: "5", nombre: "Miguel T.", valoracion: 5.0, viajes: 430, vehiculo: "Bera SBR" },
  { id: "6", nombre: "Laura V.", valoracion: 4.7, viajes: 89, vehiculo: "Toyota Yaris" },
  { id: "7", nombre: "José P.", valoracion: 4.9, viajes: 650, vehiculo: "Empire TX" },
  { id: "8", nombre: "Sofía G.", valoracion: 5.0, viajes: 210, vehiculo: "Hyundai Elantra" },
  { id: "9", nombre: "Daniel C.", valoracion: 4.8, viajes: 340, vehiculo: "Toyota Hilux" },
  { id: "10", nombre: "Valeria N.", valoracion: 4.9, viajes: 180, vehiculo: "Kia Rio" },
];

type FavoritosPanelProps = { embedInDashboard?: boolean };

export default function FavoritosPanel({ embedInDashboard }: FavoritosPanelProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredFavoritos = FAVORITOS_MOCK.filter(fav => 
    fav.nombre.toLowerCase().includes(search.toLowerCase()) || 
    fav.vehiculo.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredFavoritos.length / itemsPerPage);
  const paginatedFavoritos = filteredFavoritos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-4xl mx-auto p-4 md:p-6 animate-fade-in"}>
      {!embedInDashboard && (
        <Link href="/app/perfil" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4 transition-colors">
          ← Volver al perfil
        </Link>
      )}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Mis Favoritos
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Conductores guardados para pedir viaje rápidamente.</p>
        </div>
        <div className="w-full md:w-64">
          <input 
            type="text" 
            placeholder="Buscar por nombre o vehículo..." 
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full px-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500/20"
          />
        </div>
      </div>

      <div className="space-y-4">
        {paginatedFavoritos.length === 0 ? (
          <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-10 text-center transition-colors">
            <Heart className="w-14 h-14 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">
              {search ? "No se encontraron conductores" : "Aún no tienes conductores favoritos"}
            </p>
            {!search && <p className="text-slate-500 dark:text-slate-400 mt-1">Después de un viaje puedes guardar al conductor como favorito.</p>}
          </div>
        ) : (
          paginatedFavoritos.map((c) => (
            <div key={c.id} className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-5 flex items-center gap-5 transition-colors shadow-sm hover:border-slate-300 dark:hover:border-white/20">
              <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-slate-400 dark:text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-white text-lg">{c.nombre}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-tight mt-0.5">{c.vehiculo}</p>
                <div className="flex items-center gap-1.5 mt-2 transition-colors">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{c.valoracion}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">· {c.viajes} viajes</span>
                </div>
              </div>
              <button type="button" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#F46E20] text-white hover:brightness-110 shadow-lg shadow-[#F46E20]/20 transition-all active:scale-95 shrink-0">
                Pedir viaje
              </button>
            </div>
          ))
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
