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
      <h2 className="text-xl font-bold text-slate-800 mb-1">Favorito</h2>
      <p className="text-slate-500 text-base mb-6">Conductores que guardaste para pedir viaje más rápido.</p>
      <div className="space-y-4">
        {FAVORITOS_MOCK.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <Heart className="w-14 h-14 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-semibold text-lg">Aún no tienes conductores favoritos</p>
            <p className="text-slate-500 mt-1">Después de un viaje puedes guardar al conductor como favorito.</p>
          </div>
        ) : (
          FAVORITOS_MOCK.map((c) => (
            <div key={c.id} className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                <User className="w-7 h-7 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-lg">{c.nombre}</p>
                <p className="text-slate-500 text-base">{c.vehiculo}</p>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" /> {c.valoracion} · {c.viajes} viajes
                </p>
              </div>
              <button type="button" className="px-5 py-2.5 rounded-xl text-base font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">
                Pedir viaje
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
