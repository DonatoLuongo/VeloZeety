"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState } from "react";
import { Package, MapPin, User, Phone, FileText, ArrowRight } from "lucide-react";

export default function EnviosPage() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreDestinatario, setNombreDestinatario] = useState("");
  const [telefonoDestinatario, setTelefonoDestinatario] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div className="max-w-lg mx-auto p-4 md:p-6">
        <Link href="/app" className="text-sm text-slate-500 hover:text-slate-700 mb-4 inline-flex items-center gap-1">
          ← Volver al inicio
        </Link>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-7 h-7 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Solicitud de envío enviada</h2>
          <p className="text-slate-600 text-sm mb-4">
            Un conductor verá tu solicitud y aceptará el envío. Te notificaremos cuando alguien tome tu mandaito.
          </p>
          <p className="text-xs text-slate-500">Origen: {origen || "—"} → Destino: {destino || "—"}</p>
          <Link href="/app" className="mt-6 inline-block py-2.5 px-5 rounded-xl font-medium text-white" style={{ backgroundColor: BRAND.colors.primary }}>
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-4 md:p-6">
      <Link href="/app" className="text-sm text-slate-500 hover:text-slate-700 mb-4 inline-flex items-center gap-1">
        ← Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Envío (Mandaito)</h1>
      <p className="text-slate-500 text-sm mb-6">
        Envía un paquete a un destino y una persona lo recibe. Un conductor llevará tu envío de forma segura.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            Origen (donde se recoge el paquete)
          </label>
          <input
            type="text"
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            placeholder="Dirección o punto de recogida"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium placeholder:text-slate-500 bg-white focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-slate-500" />
            Destino (donde lo recibe la persona)
          </label>
          <input
            type="text"
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            placeholder="Dirección de entrega"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium placeholder:text-slate-500 bg-white focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            Descripción del paquete (opcional)
          </label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Ej. Documentos, llaves, pequeño paquete..."
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium placeholder:text-slate-500 bg-white focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-2">
            <User className="w-4 h-4 text-slate-500" />
            Nombre del destinatario
          </label>
          <input
            type="text"
            value={nombreDestinatario}
            onChange={(e) => setNombreDestinatario(e.target.value)}
            placeholder="Quién recibe el paquete"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium placeholder:text-slate-500 bg-white focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-800 mb-1.5 flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-500" />
            Teléfono del destinatario
          </label>
          <input
            type="tel"
            value={telefonoDestinatario}
            onChange={(e) => setTelefonoDestinatario(e.target.value)}
            placeholder="+58 424 123 4567"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 font-medium placeholder:text-slate-500 bg-white focus:ring-2 focus:ring-[#0EA5E9]/20 focus:border-[#0EA5E9] outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition shadow-lg"
          style={{ backgroundColor: BRAND.colors.primary }}
        >
          Solicitar envío (Mandaito)
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <p className="mt-4 text-xs text-slate-500 text-center">
        El costo del envío se calculará según la distancia. Puedes pagar con efectivo, pago móvil o VELO.
      </p>
    </div>
  );
}
