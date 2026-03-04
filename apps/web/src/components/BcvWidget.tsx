"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const BCV_API_BASE = "https://bcv-api.rafnixg.dev";

type RatePoint = { dollar: number; date: string };

export default function BcvWidget() {
  const [rate, setRate] = useState<number | null>(null);
  const [history, setHistory] = useState<RatePoint[]>([]);
  const [monthHistory, setMonthHistory] = useState<RatePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let cancelled = false;

    async function fetchBcv() {
      try {
        const historyRes = await fetch(`${BCV_API_BASE}/rates/history`).then((r) => (r.ok ? r.json() : null));
        const rateRes = await fetch(`${BCV_API_BASE}/rates/`).then((r) => (r.ok ? r.json() : null));

        if (cancelled) return;

        if (historyRes?.rates?.length) {
          const last7 = historyRes.rates.slice(0, 7).reverse();
          setHistory(last7);
          const last30 = historyRes.rates.slice(0, 30).reverse();
          setMonthHistory(last30);
          const currentRate = rateRes?.dollar != null ? Number(rateRes.dollar) : Number(historyRes.rates[0]?.dollar ?? 0);
          setRate(currentRate);
        } else if (rateRes?.dollar != null) {
          setRate(Number(rateRes.dollar));
        }
      } catch {
        if (!cancelled) {
          setError(true);
          setRate(396.37);
          const fallback: RatePoint[] = Array.from({ length: 14 }, (_, i) => ({
            date: new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            dollar: 396 + Math.random() * 4,
          }));
          setHistory(fallback.slice(-7));
          setMonthHistory(fallback);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBcv();
    return () => { cancelled = true; };
  }, []);

  const current = rate ?? 0;
  const chartData = monthHistory.length >= 2 ? monthHistory : history.length >= 2 ? history : [];
  const previous = chartData.length >= 2 ? chartData[0].dollar : current;
  const changePct = previous ? ((current - previous) / previous) * 100 : 0;
  const isUp = changePct >= 0;
  const chartValues = history.length ? history.map((r) => r.dollar) : [current];

  return (
    <motion.div
      className="w-full rounded-xl border-2 border-slate-200 bg-white p-3 shadow-sm"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-11 h-11 rounded-full bg-white border-2 border-black flex items-center justify-center">
            <span className="text-black font-bold text-xs tracking-tight">BCV</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wide text-slate-500 font-semibold">Tasa oficial USD/Bs.</p>
            {loading && <p className="text-sm font-bold text-slate-400 animate-pulse">Cargando...</p>}
            {error && <p className="text-xs text-slate-500">Fuente temporalmente no disponible</p>}
            <p className="text-lg font-bold text-slate-900 tabular-nums">
              Bs. {current.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">VELO alineado a la tasa BCV.</p>
            {history.length >= 2 && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex-1 h-6 min-w-[48px] flex items-end gap-0.5">
                  {chartValues.map((v, i) => {
                    const min = Math.min(...chartValues);
                    const max = Math.max(...chartValues) || 1;
                    const h = max > min ? ((v - min) / (max - min)) * 100 : 50;
                    return (
                      <div
                        key={i}
                        className="flex-1 min-w-[2px] rounded-sm"
                        style={{ height: `${Math.max(3, h)}%`, backgroundColor: isUp ? "#16a34a" : "#dc2626", opacity: 0.7 }}
                      />
                    );
                  })}
                </div>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isUp ? "text-emerald-600" : "text-red-600"}`}>
                  {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {changePct >= 0 ? "+" : ""}
                  {changePct.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
    </motion.div>
  );
}
