"use client";

import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useRates } from "@/hooks/useRates";

export default function BcvWidget() {
  const { rates, loading, error, refreshManual } = useRates();

  const current = rates?.bcv ?? 43.31;
  const isUp = true; // Se mantiene dummy history o estática dado que DolarAPI no provee historial fácilmente
  const mockHistory = Array.from({ length: 7 }, (_, i) => current - 0.5 + (i * 0.05) + Math.random() * 0.1);
  const changePct = 0.12;

  return (
    <motion.div
      className="w-full rounded-[20px] border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.02] backdrop-blur-md p-3.5 shadow-sm transition-colors relative group"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={refreshManual}
        disabled={loading}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors opacity-0 group-hover:opacity-100 disabled:opacity-50"
        title="Actualizar tasa BCV"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
      </button>

      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-11 h-11 rounded-full bg-slate-50 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 flex items-center justify-center">
          <span className="text-slate-800 dark:text-white font-black text-[10px] tracking-tight">BCV</span>
        </div>
        <div className="flex-1 min-w-0 pr-6">
          <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mb-0.5">Tasa oficial USD/Bs.</p>
          {loading && !rates && <p className="text-xs font-bold text-slate-400 animate-pulse">Cargando...</p>}
          {error && !rates && <p className="text-[10px] text-slate-500">Fuente no disponible</p>}
          <p className="text-lg font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
            Bs. {current.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </p>
          <p className="text-[9px] text-[#F46E20] mt-0.5 font-bold uppercase tracking-wider">
            1 VELO = Bs. {current.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
          </p>

          <div className="mt-2.5 flex items-center gap-2">
            <div className="flex-1 h-5 min-w-[48px] flex items-end gap-[3px]">
              {mockHistory.map((v, i) => {
                const min = Math.min(...mockHistory);
                const max = Math.max(...mockHistory) || 1;
                const h = max > min ? ((v - min) / (max - min)) * 100 : 50;
                return (
                  <div
                    key={i}
                    className="flex-1 min-w-[2px] rounded-[1px]"
                    style={{ height: `${Math.max(3, h)}%`, backgroundColor: isUp ? "#16a34a" : "#dc2626", opacity: 0.7 }}
                  />
                );
              })}
            </div>
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold ${isUp ? "text-emerald-500" : "text-red-500"}`}>
              {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              +{changePct}%
            </span>
          </div>
        </div>
      </div>
      {rates && (
        <p className="text-[8px] text-slate-400 dark:text-slate-500 text-right mt-2 mr-1">
          Actualizado: {new Date(rates.lastUpdate).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </motion.div>
  );
}
