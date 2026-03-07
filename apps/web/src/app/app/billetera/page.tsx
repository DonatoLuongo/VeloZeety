"use client";

import { BRAND } from "@velocity/shared";
import { useState, useCallback, useEffect } from "react";
import {
  Wallet,
  Send,
  ArrowDownToLine,
  Copy,
  Shield,
  User,
  Smartphone,
  ArrowUpFromLine,
  Banknote,
  CreditCard,
} from "lucide-react";
import { useRouter } from "next/navigation";

type Tab = "principal" | "recargar" | "enviar" | "recibir" | "retiro" | "deposito";

// Datos de prueba (simulados cifrados/seguros)
const DATOS_RECARGA = {
  red: "Red VELO (BEP-20 / Binance Smart Chain)",
  wallet_cripto: "0x7a3f...9e2b",
  pago_movil: {
    banco: "Banco Nacional de Crédito",
    rif: "J-40123456-7",
    telefono: "0412-XXX-XXXX",
    cedula: "V-XX.XXX.XXX",
  },
  transferencia: {
    titular: "VELOCITY C.A.",
    cuenta: "0102-XXXX-XX-XXXXXX-X",
    rif: "J-40123456-7",
  },
};

export default function BilleteraPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("principal");
  const [copied, setCopied] = useState<string | null>(null);
  const [showBalance, setShowBalance] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userName, setUserName] = useState("Usuario VELO");
  const [userHandle, setUserHandle] = useState("@usuario_velo");

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem("velocity_user");
        if (raw) {
          const data = JSON.parse(raw);
          if (data.fullName) {
            setUserName(data.fullName);
            setUserHandle("@" + data.fullName.toLowerCase().replace(/\s+/g, "_"));
          }
        }
      }
    } catch (_) { }
  }, []);

  const handleTabChange = (newTab: Tab) => {
    setIsTransitioning(true);
    setTab(newTab);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-3 md:p-6 pb-24">
      <h1 className="text-2xl font-extrabold text-slate-800 dark:text-white mt-2 mb-1">Mi Billetera</h1>
      <p className="text-slate-500 text-xs mb-5">Gestione sus fondos y pagos con la economía VELO.</p>

      {/* ─── TAB: PRINCIPAL ─── */}
      {tab === "principal" && (
        <>
          {/* Dashboard Financiero Hero Card */}
          <div className="bg-slate-900/95 dark:bg-[#15191E] backdrop-blur-2xl rounded-[32px] p-6 mb-5 border border-slate-700/50 shadow-2xl transition-all relative overflow-hidden group">
            <div className="absolute top-[-40%] right-[-20%] w-[300px] h-[300px] bg-[#0EA5E9]/20 rounded-full blur-[80px] group-hover:bg-[#0EA5E9]/30 transition-all duration-700 pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[250px] h-[250px] bg-[#F46E20]/10 rounded-full blur-[70px] group-hover:bg-[#F46E20]/20 transition-all duration-700 pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="flex justify-between items-start mb-2 relative z-10">
              <p className="text-slate-400 text-xs font-bold tracking-wide uppercase">Balance Principal</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Alternar visibilidad de saldo"
              >
                {showBalance ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-baseline gap-1.5 mb-6 relative z-10">
              <span className="text-4xl md:text-5xl font-extrabold text-white tabular-nums tracking-tight">
                {showBalance ? "1,250.00" : "•••••••"}
              </span>
              <span className="text-[#F46E20] font-bold text-lg tracking-wide uppercase">Velo</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 relative z-10">
              {/* EUR */}
              <div className="flex items-center justify-between p-3 rounded-[20px] bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100/10 flex items-center justify-center text-lg shadow-inner shrink-0 leading-none">🇪🇺</div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Euros</p>
                    <p className="text-sm font-bold text-white tabular-nums">{showBalance ? "€ 100.00" : "••••"}</p>
                  </div>
                </div>
              </div>

              {/* USDT */}
              <div className="flex items-center justify-between p-3 rounded-[20px] bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#26A17B]/10 flex items-center justify-center shrink-0">
                    <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg?v=035" alt="Tether" className="w-5 h-5 opacity-90" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Tether TRC-20</p>
                    <p className="text-sm font-bold text-white tabular-nums">{showBalance ? "₮ 850.00" : "••••"}</p>
                  </div>
                </div>
              </div>

              {/* VES */}
              <div className="flex items-center justify-between p-3 rounded-[20px] bg-white/[0.03] border border-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100/10 flex items-center justify-center text-lg shadow-inner shrink-0 leading-none">🇻🇪</div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-0.5">Bolívar BCV</p>
                    <p className="text-sm font-bold text-white tabular-nums">{showBalance ? "Bs. 53,875.00" : "••••"}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/app/perfil/metodos-pago")}
              className="mt-5 w-full py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-[13px] font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              + Gestionar métodos de cobro
            </button>
          </div>

          {/* Acciones Rápidas */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            <button
              onClick={() => handleTabChange("enviar")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-[22px] bg-[#F46E20] text-white shadow-lg shadow-[#F46E20]/30 hover:scale-[1.02] active:scale-[0.95] transition-all"
            >
              <Send className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] font-bold">Enviar</span>
            </button>
            <button
              onClick={() => handleTabChange("recibir")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-[22px] bg-white dark:bg-[#1E2329] border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.95] transition-all shadow-sm"
            >
              <ArrowDownToLine className="w-5 h-5 mb-0.5 text-slate-500 dark:text-slate-400" />
              <span className="text-[11px] font-bold">Recibir</span>
            </button>
            <button
              onClick={() => handleTabChange("recargar")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-[22px] bg-white dark:bg-[#1E2329] border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.95] transition-all shadow-sm"
            >
              <ArrowUpFromLine className="w-5 h-5 mb-0.5 text-slate-500 dark:text-slate-400" />
              <span className="text-[11px] font-bold">Recargar</span>
            </button>
            <button
              onClick={() => handleTabChange("retiro")}
              className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-[22px] bg-white dark:bg-[#1E2329] border border-slate-100 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10 active:scale-[0.95] transition-all shadow-sm"
            >
              <Banknote className="w-5 h-5 mb-0.5 text-slate-500 dark:text-slate-400" />
              <span className="text-[11px] font-bold">Retirar</span>
            </button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Transacciones</h2>
            <button className="text-xs text-velocity-primary font-bold hover:underline">Ver todo</button>
          </div>

          <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-8 text-center transition-colors">
            <div className="w-16 h-16 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Aún no tienes movimientos registrados.</p>
          </div>
        </>
      )}

      {/* ─── TAB: RECARGAR ─── */}
      {tab === "recargar" && (
        <>
          <button type="button" onClick={() => handleTabChange("principal")} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4 flex items-center gap-1 transition-colors font-medium">
            ← Volver
          </button>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Recargar Billetera</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Usa uno de los métodos seguros para añadir fondos. Los datos están cifrados y son únicos por sesión.</p>

          {isTransitioning ? (
            <div className="space-y-4 animate-pulse">
              <div className="bg-slate-200 dark:bg-slate-700 h-24 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-32 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-48 rounded-xl w-full"></div>
            </div>
          ) : (
            <div className="space-y-3.5 animate-fade-in-up">
              <div className="bg-slate-50 dark:bg-white/[0.02] rounded-[24px] p-5 border border-slate-200 dark:border-white/5">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Red de la criptomoneda</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{DATOS_RECARGA.red}</p>
              </div>

              <div className="bg-white dark:bg-[#1E2329] rounded-[24px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-2.5 bg-slate-50/50 dark:bg-white/[0.02]">
                  <Shield className="w-4 h-4 text-[#0EA5E9]" />
                  <span className="font-bold text-[13px] text-slate-800 dark:text-white">Datos para depósito</span>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex justify-between items-center group">
                    <span className="text-[13px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">Dirección wallet</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-md">{DATOS_RECARGA.wallet_cripto}</code>
                      <button type="button" onClick={() => copyToClipboard(DATOS_RECARGA.wallet_cripto, "wallet")} className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-[#F46E20] transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E2329] rounded-[24px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm transition-colors mt-3.5">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 bg-slate-50/50 dark:bg-white/[0.02]">
                  <Smartphone className="w-4 h-4 text-[#F46E20]" />
                  <span className="font-bold text-[13px] text-slate-800 dark:text-white">Pago móvil (Venezuela)</span>
                </div>
                <ul className="p-5 space-y-3 text-[13px]">
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 font-medium">Banco</span><span className="font-semibold text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.banco}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 font-medium">RIF</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.rif}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 font-medium">Teléfono</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.telefono}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400 font-medium">Cédula</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.cedula}</span></li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#1E2329] rounded-[24px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm transition-colors mt-3.5">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 bg-slate-50/50 dark:bg-white/[0.02]">
                  <Banknote className="w-4 h-4 text-[#26A17B]" />
                  <span className="font-bold text-[13px] text-slate-800 dark:text-white">Transferencia Bancaria</span>
                </div>
                <ul className="p-5 space-y-3 text-[13px]">
                  <li className="flex justify-between items-center"><span className="text-slate-500 dark:text-slate-400 font-medium">Titular</span><span className="font-semibold text-slate-800 dark:text-white text-right">{DATOS_RECARGA.transferencia.titular}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500 dark:text-slate-400 font-medium">Cuenta</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.transferencia.cuenta}</span></li>
                  <li className="flex justify-between items-center"><span className="text-slate-500 dark:text-slate-400 font-medium">RIF</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.transferencia.rif}</span></li>
                </ul>
              </div>

              <div className="bg-white dark:bg-[#1E2329] rounded-[24px] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm transition-colors mt-3.5">
                <div className="px-5 py-4 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 bg-slate-50/50 dark:bg-white/[0.02]">
                  <CreditCard className="w-4 h-4 text-blue-500" />
                  <span className="font-bold text-[13px] text-slate-800 dark:text-white">Tarjeta Internacional</span>
                </div>
                <div className="p-5 space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Titular de Tarjeta</label>
                      <input type="text" placeholder="Como aparece en la tarjeta" className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-[13px] focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all font-medium placeholder:font-normal outline-none" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Número de Tarjeta</label>
                      <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-[13px] font-mono tracking-widest focus:ring-2 focus:ring-[#0EA5E9]/20 transition-all placeholder:font-normal outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">Fecha de Exp.</label>
                      <input type="text" placeholder="MM/AA" className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-[#0EA5E9]/20 font-medium placeholder:font-normal outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase tracking-wide">CVC</label>
                      <input type="password" placeholder="123" className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-[#0EA5E9]/20 font-medium placeholder:font-normal outline-none transition-all" />
                    </div>
                  </div>
                </div>
              </div>

              <button type="button" onClick={() => handleTabChange("principal")} className="mt-5 w-full py-4 rounded-[20px] font-bold text-white shadow-xl shadow-[#F46E20]/30 hover:scale-[1.01] active:scale-[0.98] transition-all bg-[#F46E20]">
                Confirmar Depósito
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: ENVIAR ─── */}
      {tab === "enviar" && (
        <>
          <button type="button" onClick={() => handleTabChange("principal")} className="text-[13px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4 flex items-center gap-1 font-semibold transition-colors">
            ← Volver
          </button>
          <h2 className="text-[22px] font-extrabold text-slate-800 dark:text-white mb-1.5">Enviar Fondos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-[13px] mb-6 font-medium">Envía al instante por ecosistema VELO Tokens.</p>

          {isTransitioning ? (
            <div className="bg-white dark:bg-[#1E2329] rounded-[28px] border border-slate-200 dark:border-white/5 p-6 space-y-5 animate-pulse">
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-12 rounded-xl w-full mt-4"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E2329] rounded-[28px] border border-slate-200 dark:border-white/5 p-6 space-y-5 shadow-sm animate-fade-in-up">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Destinatario (Usuario o QR)</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="@usuario o correo@ejemplo.com" className="w-full pl-11 pr-4 py-3.5 rounded-[20px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-[13px] focus:ring-2 focus:ring-[#F46E20]/20 outline-none transition-all font-medium placeholder:font-normal" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Monto VELO</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">V.</div>
                  <input type="text" inputMode="decimal" placeholder="0.00" className="w-full pl-9 pr-4 py-4 rounded-[20px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-xl font-extrabold focus:ring-2 focus:ring-[#F46E20]/20 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                </div>
              </div>
              <button type="button" className="w-full mt-2 py-4 rounded-[20px] font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-[#F46E20]/30 transition-all hover:scale-[1.01] active:scale-[0.98]" style={{ backgroundColor: BRAND.colors.primary }}>
                <Send className="w-4 h-4" />
                Enviar Token Automático
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: RETIRO ─── */}
      {tab === "retiro" && (
        <>
          <button type="button" onClick={() => handleTabChange("principal")} className="text-[13px] text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4 flex items-center gap-1 font-semibold transition-colors">
            ← Volver
          </button>
          <h2 className="text-[22px] font-extrabold text-slate-800 dark:text-white mb-1.5">Retirar Fondos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-[13px] mb-6 font-medium">Liquida VELO a Fiat en tus métodos guardados.</p>

          {isTransitioning ? (
            <div className="bg-white dark:bg-[#1E2329] rounded-[28px] border border-slate-200 dark:border-white/5 p-6 space-y-5 animate-pulse">
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-12 rounded-xl w-full mt-4"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1E2329] rounded-[28px] border border-slate-200 dark:border-white/5 p-6 space-y-5 shadow-sm animate-fade-in-up">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Monto a Liquíidar (VELO)</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">V.</div>
                  <input type="text" inputMode="decimal" placeholder="0.00" className="w-full pl-9 pr-4 py-4 rounded-[20px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-slate-800 dark:text-white text-xl font-extrabold focus:ring-2 focus:ring-[#F46E20]/20 outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Método de Destino</label>
                <select className="w-full px-4 py-3.5 rounded-[20px] border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-white/[0.02] text-slate-800 dark:text-white text-[13px] font-medium focus:ring-2 focus:ring-[#F46E20]/20 outline-none transition-all appearance-none cursor-pointer">
                  <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="">Selecciona un método preguardado...</option>
                  <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="pago-movil">Pago Móvil (BNC) - ****</option>
                  <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="transferencia">Transferencia a Empresa (BNC)</option>
                </select>
              </div>
              <button type="button" className="w-full mt-2 py-4 rounded-[20px] font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-[#0EA5E9]/30 transition-all hover:scale-[1.01] active:scale-[0.98] bg-[#0EA5E9]">
                <ArrowUpFromLine className="w-4 h-4" />
                Solicitar Liquidación
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: RECIBIR (modal) ─── */}
      {tab === "recibir" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => handleTabChange("principal")}>
          <div className="bg-white dark:bg-[#1E2329] rounded-[32px] border border-slate-200 dark:border-white/5 p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <p className="text-[13px] font-bold text-slate-700 dark:text-slate-300 mb-6 tracking-wide">Código QR de {userName}</p>
            <div className="inline-block p-4 bg-white rounded-[24px] border border-slate-200 shadow-sm mb-6">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`Velozeety - ${userName}`)}&format=svg`}
                alt={`Código QR de ${userName}`}
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Cuenta Velozeety Corp</p>
            <p className="font-mono font-bold text-[19px] text-[#F46E20] truncate px-3">{userHandle}</p>
            <button type="button" onClick={() => copyToClipboard(userHandle, "user")} className="mt-5 text-[13px] flex items-center justify-center gap-2 mx-auto text-slate-500 dark:text-slate-300 font-bold hover:scale-105 active:scale-95 transition-all bg-slate-100 dark:bg-white/5 py-2 px-4 rounded-full">
              <Copy className="w-4 h-4" />
              Copiar ID
            </button>
            <button type="button" onClick={() => handleTabChange("principal")} className="mt-8 w-full py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-[0.98]">
              Cerrar Tablero
            </button>
          </div>
        </div>
      )}{/* ─── INFO RETIROS (siempre visible) ─── */}
      <div className="mt-8 p-5 rounded-[24px] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 transition-colors">
        <h3 className="text-[13px] font-bold text-slate-800 dark:text-white mb-2">Términos Financieros</h3>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          La compra o recarga de VELO Tokens es el motor para utilizar los servicios ecosistema.
        </p>
        <ul className="mt-3.5 space-y-1.5 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
          <li className="flex gap-2"><span>•</span> <strong>Convertibilidad BCV:</strong> Tasa dinámica al día en bolívares.</li>
          <li className="flex gap-2"><span>•</span> <strong>Retiros:</strong> Liquidación BNC inmediata (+ 10 VELO).</li>
        </ul>
      </div>

      {
        copied && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-3 rounded-full bg-slate-800/90 backdrop-blur border border-white/20 text-white text-[13px] font-bold shadow-2xl animate-fade-in-up whitespace-nowrap z-[100]">
            ✓ ¡{copied} copiado!
          </div>
        )
      }
    </div >
  );
}
