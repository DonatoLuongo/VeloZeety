"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import { Copy, Wallet, Gift } from "lucide-react";

type ReferidosPanelProps = { embedInDashboard?: boolean };

export default function ReferidosPanel({ embedInDashboard }: ReferidosPanelProps) {
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
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Referidos</h2>
      <p className="text-slate-500 text-base mb-6">Invita amigos a VeloCity y gana USD en tu billetera por cada uno que se registre y complete un viaje.</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-100">
            <Gift className="w-7 h-7 text-emerald-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 text-lg">Gana por cada referido</p>
            <p className="text-2xl font-bold" style={{ color: BRAND.colors.primary }}>2 USD</p>
            <p className="text-sm text-slate-500">Se acreditan a tu wallet cuando tu amigo complete su primer viaje.</p>
          </div>
        </div>
        <p className="text-sm font-medium text-slate-700 mb-2">Tu código de referido</p>
        <div className="flex gap-2 mb-4">
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
        <p className="text-sm font-medium text-slate-700 mb-2">Comparte tu enlace</p>
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

      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-center gap-4">
        <Wallet className="w-10 h-10 text-slate-500" />
        <div>
          <p className="font-semibold text-slate-800 text-base">Total ganado por referidos</p>
          <p className="text-sm text-slate-500">Los USD se suman a tu billetera VeloCity. Retira cuando quieras.</p>
        </div>
      </div>
    </div>
  );
}
