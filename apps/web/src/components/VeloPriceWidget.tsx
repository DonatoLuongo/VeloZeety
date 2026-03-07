"use client";

import { useState } from "react";
import { RefreshCw, ChevronDown, ChevronUp, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useVeloPrice } from "@/hooks/useRates";

function fmt(n: number, d = 2) {
    return n.toLocaleString("es-VE", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export default function VeloPriceWidget() {
    const { veloPrice, rates, loading, refreshManual } = useVeloPrice();
    const [expanded, setExpanded] = useState(false);

    const lastTime = rates
        ? new Date(rates.lastUpdate).toLocaleTimeString("es-VE", { hour: "2-digit", minute: "2-digit" })
        : null;

    return (
        <div className="w-full rounded-[18px] border border-slate-200 dark:border-white/8 bg-white dark:bg-[#1A1F27] shadow-sm overflow-hidden">
            {/* ── Header row — siempre visible ── */}
            <div className="flex items-center gap-2 px-3.5 py-2.5">
                {/* Icon + label */}
                <div className="flex items-center gap-1.5 flex-1 min-w-0">
                    <BarChart2 className="w-3.5 h-3.5 text-[#F46E20] shrink-0" />
                    <span className="text-[11px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate">
                        Tasa de cambio VELO
                    </span>
                    {/* live dot */}
                    <span className="relative flex h-2 w-2 shrink-0">
                        <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${loading ? "bg-amber-400" : "bg-emerald-400"}`} />
                        <span className={`relative inline-flex h-2 w-2 rounded-full ${loading ? "bg-amber-400" : "bg-emerald-400"}`} />
                    </span>
                </div>

                {/* Collapsed summary price */}
                {!expanded && veloPrice && (
                    <span className="text-[13px] font-extrabold text-slate-800 dark:text-white tabular-nums shrink-0">
                        Bs.&nbsp;{fmt(veloPrice.bs)}
                    </span>
                )}

                {/* Refresh */}
                <button
                    onClick={(e) => { e.stopPropagation(); refreshManual(); }}
                    disabled={loading}
                    title="Actualizar tasas"
                    className="p-1.5 rounded-full text-slate-400 hover:text-[#F46E20] transition-colors disabled:opacity-40 shrink-0"
                >
                    <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
                </button>

                {/* Expand / Collapse toggle */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors shrink-0"
                    title={expanded ? "Minimizar" : "Ver detalle"}
                >
                    {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
            </div>

            {/* ── Expanded body ── */}
            <AnimatePresence initial={false}>
                {expanded && (
                    <motion.div
                        key="body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="px-3.5 pb-3.5 border-t border-slate-100 dark:border-white/5 pt-3">
                            {/* Note */}
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mb-2.5 font-medium">
                                Referencia del precio de <strong className="text-[#F46E20]">1 VELO Token</strong> según el promedio de 3 fuentes × 1.65. No representa tu saldo.
                            </p>

                            {/* Main price */}
                            {veloPrice ? (
                                <>
                                    <div className="flex items-baseline gap-1.5 mb-2.5">
                                        <span className="text-[26px] font-extrabold text-slate-900 dark:text-white tabular-nums leading-none">
                                            {fmt(veloPrice.bs)}
                                        </span>
                                        <span className="text-sm font-bold text-[#F46E20]">Bs.</span>
                                        <span className="text-[10px] text-slate-400 ml-1 font-medium">1 VELO</span>
                                    </div>

                                    {/* EUR + USDT inline */}
                                    <div className="flex gap-2 mb-3">
                                        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[12px] px-3 py-2">
                                            <span className="text-base leading-none select-none">🇪🇺</span>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">EUR</p>
                                                <p className="text-[13px] font-extrabold text-slate-800 dark:text-white tabular-nums">
                                                    € {fmt(veloPrice.eur, 4)}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 rounded-[12px] px-3 py-2">
                                            <svg viewBox="0 0 2000 2000" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 shrink-0">
                                                <path d="M1000 0c552.285 0 1000 447.715 1000 1000s-447.715 1000-1000 1000S0 1552.285 0 1000 447.715 0 1000 0z" fill="#26a17b" />
                                                <path d="M1155.65 899.782v-112.98h284.453V615.547H561.026v171.255h283.324v112.98c-204.606 13.92-365.178 57.075-365.178 108.675 0 53.078 165.61 97.234 374.92 110.165v276.064h151.107V1218.66c205.733-13.308 368.175-57.08 368.175-109.435 0-51.583-160.038-94.755-364.054-108.67zM1004.85 1098c-157.065 0-291.564-28.718-316.516-65.71 23.367-34.904 150.31-62.77 304.576-65.438v129.58c3.962.196 7.952.28 11.94.28 4.252 0 8.5-.095 12.72-.28V966.85c159.262 2.502 289.475 30.73 313.565 66.216-25.594 36.31-158.75 64.934-314.285 64.934z" fill="#FFF" />
                                            </svg>
                                            <div>
                                                <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">USDT</p>
                                                <p className="text-[13px] font-extrabold text-slate-800 dark:text-white tabular-nums">
                                                    ₮ {fmt(veloPrice.usdt, 4)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Source rates footer */}
                                    {rates && (
                                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[9px] text-slate-400 dark:text-slate-600 font-medium">
                                            <span>BCV {fmt(rates.bcv)} Bs/USD</span>
                                            <span>EUR {fmt(rates.eur)} Bs/EUR</span>
                                            <span>USDT {fmt(rates.usdt)} Bs/USDT</span>
                                            {lastTime && <span className="ml-auto text-slate-300 dark:text-slate-600">Act. {lastTime}</span>}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="space-y-2">
                                    <div className="h-7 w-36 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-12 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
                                        <div className="flex-1 h-12 bg-slate-100 dark:bg-white/5 rounded-xl animate-pulse" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
