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
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Referidos</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-6">Invita amigos a VeloCity y gana USD en tu billetera por cada uno que se registre y complete un viaje.</p>

      <div className="bg-white dark:bg-[#393E46] rounded-2xl border border-slate-200 dark:border-white/10 p-6 mb-6 transition-colors">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-100 dark:bg-emerald-500/10">
            <Gift className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white text-lg">Gana por cada referido</p>
            <p className="text-2xl font-black" style={{ color: BRAND.colors.primary }}>2 USD</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Se acreditan a tu wallet cuando tu amigo complete su primer viaje.</p>
          </div>
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Tu código de referido</p>
        <div className="flex gap-2 mb-5">
          <input
            type="text"
            readOnly
            value={codigoReferido}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white font-mono text-sm outline-none"
          />
          <button type="button" onClick={copyLink} className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm">
            <Copy className="w-4 h-4" /> {copied ? "Copiado" : "Copiar"}
          </button>
        </div>
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Comparte tu enlace</p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={linkReferido}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 text-xs truncate outline-none"
          />
          <button type="button" onClick={copyLink} className="px-5 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-velocity-primary/20" style={{ backgroundColor: BRAND.colors.primary }}>
            <Copy className="w-4 h-4" /> Copiar
          </button>
        </div>
      </div>

      <div className="bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 p-6 flex items-center gap-5 transition-colors">
        <div className="w-14 h-14 rounded-xl bg-white dark:bg-[#393E46] flex items-center justify-center border border-slate-100 dark:border-white/5">
          <Wallet className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <div>
          <p className="font-bold text-slate-800 dark:text-white text-base">Total ganado por referidos</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Los USD se suman a tu billetera VeloCity en tiempo real.</p>
        </div>
      </div>
    </div>
  );
}
