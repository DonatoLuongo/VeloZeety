"use client";

import Link from "next/link";
import { Heart, ChevronLeft, User, Star } from "lucide-react";

const FAVORITOS_MOCK = [
  { id: "1", nombre: "Carlos M.", valoracion: 4.9, viajes: 520, vehiculo: "Toyota Corolla" },
  { id: "2", nombre: "María L.", valoracion: 5.0, viajes: 312, vehiculo: "Honda XR 150" },
];

export default function FavoritosPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Link href="/app/perfil" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ChevronLeft className="w-4 h-4" /> Volver al perfil
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Favorito</h1>
      <p className="text-slate-500 text-sm mb-6">Conductores que guardaste para pedir viaje más rápido.</p>
      <div className="space-y-3">
        {FAVORITOS_MOCK.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-medium">Aún no tienes conductores favoritos</p>
            <p className="text-sm text-slate-500 mt-1">Después de un viaje puedes guardar al conductor como favorito.</p>
          </div>
        ) : (
          FAVORITOS_MOCK.map((c) => (
            <div key={c.id} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                <User className="w-6 h-6 text-sky-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800">{c.nombre}</p>
                <p className="text-sm text-slate-500">{c.vehiculo}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {c.valoracion} · {c.viajes} viajes
                </p>
              </div>
              <button type="button" className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200">
                Pedir viaje
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
