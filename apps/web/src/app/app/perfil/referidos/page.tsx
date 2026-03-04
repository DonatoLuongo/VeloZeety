"use client";

import Link from "next/link";
import { Users, ChevronLeft, Copy, Wallet, Gift } from "lucide-react";
import { BRAND } from "@velocity/shared";
import { useState } from "react";

export default function ReferidosPage() {
  const [copied, setCopied] = useState(false);
  const codigoReferido = "VELO-JUAN2025";
  const linkReferido = `https://velocity.com/invite/${codigoReferido}`;

  const copyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(linkReferido);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <Link href="/app/perfil" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ChevronLeft className="w-4 h-4" /> Volver al perfil
      </Link>
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Referidos</h1>
      <p className="text-slate-500 text-sm mb-6">Invita amigos a VeloCity y gana USD en tu billetera por cada uno que se registre y complete un viaje.</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-100">
            <Gift className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800">Gana por cada referido</p>
            <p className="text-2xl font-bold text-slate-800" style={{ color: BRAND.colors.primary }}>2 USD</p>
            <p className="text-xs text-slate-500">Se acreditan a tu wallet cuando tu amigo complete su primer viaje.</p>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700 mb-2">Tu código de referido</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={codigoReferido}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 font-mono text-sm"
          />
          <button type="button" onClick={copyLink} className="px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium flex items-center gap-2 hover:bg-slate-50">
            <Copy className="w-4 h-4" /> {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <p className="text-sm font-medium text-slate-700 mt-4 mb-2">Comparte tu enlace</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={linkReferido}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 text-xs truncate"
          />
          <button type="button" onClick={copyLink} className="px-4 py-3 rounded-xl font-medium text-white flex items-center gap-2" style={{ backgroundColor: BRAND.colors.primary }}>
            <Copy className="w-4 h-4" /> Copiar
          </button>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 flex items-center gap-3">
        <Wallet className="w-8 h-8 text-slate-500" />
        <div>
          <p className="font-medium text-slate-800">Total ganado por referidos</p>
          <p className="text-sm text-slate-500">Los USD se suman a tu billetera VeloCity. Retira cuando quieras.</p>
        </div>
      </div>
    </div>
  );
}
