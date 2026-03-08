"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import { Copy, Wallet, Gift, Users, CheckCircle2, ChevronRight, Clock } from "lucide-react";

type ReferidosPanelProps = { embedInDashboard?: boolean };

// Mock data para el historial
const HISTORIAL_REFERIDOS = [
  { id: 1, name: "María P.", date: "08 Mar 2026", status: "completado", reward: 1.20 },
  { id: 2, name: "Carlos J.", date: "05 Mar 2026", status: "completado", reward: 1.20 },
  { id: 3, name: "Luis F.", date: "28 Feb 2026", status: "completado", reward: 1.20 },
  { id: 4, name: "Ana R.", date: "15 Feb 2026", status: "completado", reward: 1.20 },
  { id: 5, name: "José M.", date: "10 Feb 2026", status: "completado", reward: 1.20 },
  { id: 6, name: "Laura T.", date: "05 Feb 2026", status: "completado", reward: 0.70 },
  { id: 7, name: "Pedro S.", date: "02 Feb 2026", status: "pendiente", reward: 0.00 },
  { id: 8, name: "Miguel A.", date: "01 Feb 2026", status: "pendiente", reward: 0.00 },
  { id: 9, name: "Sofia G.", date: "25 Jan 2026", status: "pendiente", reward: 0.00 },
  { id: 10, name: "Daniela V.", date: "20 Jan 2026", status: "pendiente", reward: 0.00 },
];

export default function ReferidosPanel({ embedInDashboard }: ReferidosPanelProps) {
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const codigoReferido = "VELO-JUAN2025";
  const linkReferido = `https://velocity.com/invite/${codigoReferido}`;

  const copyLink = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(linkReferido);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const referidosCompletados = HISTORIAL_REFERIDOS.filter(r => r.status === "completado").length;
  const faltanBono = Math.max(0, 5 - referidosCompletados);
  const totalGanado = HISTORIAL_REFERIDOS.reduce((acc, curr) => acc + curr.reward, 0);

  const filteredReferidos = HISTORIAL_REFERIDOS.filter(ref => {
    const matchSearch = ref.name.toLowerCase().includes(search.toLowerCase());
    const matchDate = dateFilter ? ref.date.toLowerCase().includes(dateFilter.toLowerCase()) : true; // Simplificado para la demostración
    return matchSearch && matchDate;
  });

  const totalPages = Math.ceil(filteredReferidos.length / itemsPerPage);
  const paginatedReferidos = filteredReferidos.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-3xl mx-auto p-4 md:p-6 animate-fade-in"}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
        <Users className="w-5 h-5 text-[#F46E20]" /> Mis Referidos
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Gana <strong className="text-[#F46E20]">6 VELO (USD)</strong> al invitar a tus primeros 5 amigos. Luego, recibe <strong className="text-emerald-500">0.70 VELO</strong> por cada referido adicional que complete su primer viaje.
      </p>

      {/* Tarjetas Superiores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#F46E20]/10 rounded-full blur-2xl" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#F46E20]/10">
              <Gift className="w-6 h-6 text-[#F46E20]" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-white text-base">Programa de Bonos</p>
              {faltanBono > 0 ? (
                <p className="text-xs text-slate-500 font-medium">Faltan {faltanBono} para ganar 6 VELO</p>
              ) : (
                <p className="text-xs text-emerald-500 font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Bono de bienvenida completado</p>
              )}
            </div>
          </div>
          
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 mb-2 overflow-hidden">
            <div className="bg-[#F46E20] h-2.5 rounded-full" style={{ width: `${Math.min(100, (referidosCompletados / 5) * 100)}%` }}></div>
          </div>
          <p className="text-[10px] text-right font-bold text-slate-400 truncate">{referidosCompletados} de 5 amigos</p>
        </div>

        <div className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-5 shadow-sm flex items-center gap-5 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center border border-emerald-100 dark:border-emerald-500/20 shrink-0">
            <Wallet className="w-6 h-6 text-emerald-500" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">Ganancias Acumuladas</p>
            <p className="text-2xl font-black text-slate-800 dark:text-white tabular-nums flex items-end gap-1">
              {totalGanado.toFixed(2)} <span className="text-sm text-emerald-500 pb-1">VELO</span>
            </p>
          </div>
        </div>
      </div>

      {/* Area de enlace de invitación */}
      <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-5 shadow-sm mb-6">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3">Tu Enlace y Código de Invitación</p>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              readOnly
              value={linkReferido}
              className="w-full pl-4 pr-24 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 font-medium text-sm outline-none truncate"
            />
            <button 
              type="button" 
              onClick={copyLink} 
              className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#F46E20] hover:bg-[#d95d1a] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Copy className="w-3.5 h-3.5" /> {copied ? "Copiado" : "Copiar"}
            </button>
          </div>
          <div className="w-full md:w-32">
            <input
              type="text"
              readOnly
              value={codigoReferido}
              className="w-full px-4 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-transparent text-slate-800 dark:text-white font-mono font-bold text-center text-sm outline-none"
            />
          </div>
        </div>
      </div>

      {/* Historial de Referidos */}
      <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-[#1A1F27] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide">Historial de Invitaciones</h3>
          <div className="flex gap-2 w-full md:w-auto">
            <input 
              type="text" 
              placeholder="Buscar nombre..." 
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full md:w-40 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-[#F46E20]"
            />
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
              className="w-full md:w-36 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 outline-none focus:border-[#F46E20]"
            />
          </div>
        </div>
        
        {paginatedReferidos.length === 0 ? (
          <div className="p-8 text-center text-slate-500">No se encontraron invitaciones.</div>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-white/5">
            {paginatedReferidos.map((ref) => (
              <li key={ref.id} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 font-bold shrink-0">
                    {ref.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-white text-sm">{ref.name}</p>
                    <p className="text-xs text-slate-400">{ref.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  {ref.status === "completado" ? (
                    <>
                      <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">+{ref.reward.toFixed(2)} VELO</p>
                      <p className="text-[10px] text-emerald-600/70 font-semibold uppercase flex items-center gap-1 justify-end"><CheckCircle2 className="w-3 h-3" /> Acreditado</p>
                    </>
                  ) : (
                    <>
                      <p className="font-bold text-slate-400 text-sm">0.00 VELO</p>
                      <p className="text-[10px] text-amber-500 font-semibold uppercase flex items-center gap-1 justify-end"><Clock className="w-3 h-3" /> En espera</p>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
        
        {/* Paginación */}
        {totalPages > 1 && (
          <div className="px-5 py-3 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-transparent flex justify-between items-center text-sm">
            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">
              Página {page} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button 
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 transition-colors"
              >
                Anterior
              </button>
              <button 
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 disabled:opacity-50 transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
