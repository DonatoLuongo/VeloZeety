"use client";

import Link from "next/link";
import { Heart, User, Star } from "lucide-react";

const FAVORITOS_MOCK = [
  { id: "1", nombre: "Carlos M.", valoracion: 4.9, viajes: 520, vehiculo: "Toyota Corolla" },
  { id: "2", nombre: "María L.", valoracion: 5.0, viajes: 312, vehiculo: "Honda XR 150" },
];

type FavoritosPanelProps = { embedInDashboard?: boolean };

export default function FavoritosPanel({ embedInDashboard }: FavoritosPanelProps) {
  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      {!embedInDashboard && (
        <Link href="/app/perfil" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
          ← Volver al perfil
        </Link>
      )}
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Favorito</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-6">Conductores que guardaste para pedir viaje más rápido.</p>
      <div className="space-y-4">
        {FAVORITOS_MOCK.length === 0 ? (
          <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-10 text-center transition-colors">
            <Heart className="w-14 h-14 text-slate-200 dark:text-slate-600 mx-auto mb-4" />
            <p className="text-slate-600 dark:text-slate-300 font-semibold text-lg">Aún no tienes conductores favoritos</p>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Después de un viaje puedes guardar al conductor como favorito.</p>
          </div>
        ) : (
          FAVORITOS_MOCK.map((c) => (
            <div key={c.id} className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-center gap-5 transition-colors">
              <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-sky-600 dark:text-sky-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-white text-lg">{c.nombre}</p>
                <p className="text-slate-500 dark:text-slate-400 text-base leading-tight mt-0.5">{c.vehiculo}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mt-2 uppercase tracking-wider">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {c.valoracion} · {c.viajes} viajes
                </p>
              </div>
              <button type="button" className="px-5 py-3 rounded-xl text-sm font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm">
                Pedir viaje
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
