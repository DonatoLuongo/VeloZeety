"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
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
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Finanzas Corporativas</h1>
      <p className="text-slate-500 text-sm mb-6">Gestione su liquidez y pagos corporativos con máxima seguridad.</p>

      {/* ─── TAB: PRINCIPAL ─── */}
      {tab === "principal" && (
        <>
          {/* Dashboard Financiero Hero Card */}
          <div className="bg-[#1E293B] rounded-2xl p-8 mb-6 border border-slate-700 shadow-xl transition-colors relative overflow-hidden">
            <div className="absolute top-[-50%] right-[-10%] w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px]" />

            <div className="flex justify-between items-start mb-1 relative z-10">
              <p className="text-slate-400 text-sm font-medium">Balance Total Replicado</p>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Alternar visibilidad de saldo"
              >
                {showBalance ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                )}
              </button>
            </div>

            <div className="flex items-baseline gap-2 mb-6 relative z-10">
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
                {showBalance ? "$ 1,250.00" : "$ •••••••"}
              </span>
              <span className="text-slate-400 font-medium">USD</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm dark:bg-velocity-surface dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
                    <div className="font-bold text-slate-700 dark:text-slate-300 text-xs">EUR</div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Euros (EUR)</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white tabular-nums">{showBalance ? "100.00" : "••••"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm dark:bg-velocity-surface dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg">
                    <div className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">USDT</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Tether</p>
                      <span className="text-[9px] font-bold text-emerald-600/70 border border-emerald-200 bg-emerald-50 px-1 rounded">TRC-20</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800 dark:text-white tabular-nums">{showBalance ? "850.00" : "••••"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm dark:bg-velocity-surface dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <div className="font-bold text-blue-600 dark:text-blue-400 text-xs">USDC</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">USD Coin</p>
                      <span className="text-[9px] font-bold text-blue-600/70 border border-blue-200 bg-blue-50 px-1 rounded">ERC-20</span>
                    </div>
                    <p className="text-lg font-bold text-slate-800 dark:text-white tabular-nums">{showBalance ? "300.00" : "••••"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-100 shadow-sm dark:bg-velocity-surface dark:border-white/5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg">
                    <div className="font-bold text-red-600 dark:text-red-400 text-xs">VES</div>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Bolívares</p>
                    <p className="text-lg font-bold text-slate-800 dark:text-white tabular-nums">{showBalance ? "0.00" : "••••"}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => router.push("/app/perfil/metodos-pago")}
              className="mt-6 w-full py-3 px-4 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              + Gestionar métodos de cobro corporativos
            </button>
          </div>

          {/* Acciones Rápidas */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            <button
              onClick={() => handleTabChange("enviar")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-velocity-primary text-white shadow-lg shadow-velocity-primary/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Send className="w-5 h-5" />
              <span className="text-xs font-semibold">Enviar</span>
            </button>
            <button
              onClick={() => handleTabChange("recibir")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/5 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-medium"
            >
              <ArrowDownToLine className="w-5 h-5" />
              <span className="text-xs font-semibold">Recibir</span>
            </button>
            <button
              onClick={() => handleTabChange("recargar")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/5 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-medium"
            >
              <ArrowUpFromLine className="w-5 h-5" />
              <span className="text-xs font-semibold">Recargar</span>
            </button>
            <button
              onClick={() => handleTabChange("retiro")}
              className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/5 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-medium"
            >
              <Banknote className="w-5 h-5" />
              <span className="text-xs font-semibold">Retirar</span>
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
            <div className="space-y-4 animate-fade-in-up">
              <div className="bg-slate-50 dark:bg-white/5 rounded-xl p-4 border border-slate-200 dark:border-white/5">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Red de la criptomoneda</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{DATOS_RECARGA.red}</p>
              </div>

              <div className="bg-white dark:bg-velocity-surface rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 bg-slate-50/50 dark:bg-white/5">
                  <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold text-sm text-slate-800 dark:text-white">Datos para depósito</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center group">
                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Dirección wallet</span>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">{DATOS_RECARGA.wallet_cripto}</code>
                      <button type="button" onClick={() => copyToClipboard(DATOS_RECARGA.wallet_cripto, "wallet")} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
                        <Copy className="w-4 h-4 text-slate-400 group-hover:text-velocity-primary transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-velocity-surface rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm transition-colors">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center gap-2 bg-slate-50/50 dark:bg-white/5">
                  <Smartphone className="w-4 h-4 text-velocity-primary" />
                  <span className="font-bold text-sm text-slate-800 dark:text-white">Pago móvil (Venezuela)</span>
                </div>
                <ul className="p-4 space-y-3 text-sm">
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Banco</span><span className="font-semibold text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.banco}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">RIF</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.rif}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Teléfono</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.telefono}</span></li>
                  <li className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Cédula</span><span className="font-mono font-medium text-slate-800 dark:text-white">{DATOS_RECARGA.pago_movil.cedula}</span></li>
                </ul>
              </div>

              <button type="button" onClick={() => handleTabChange("principal")} className="mt-4 w-full py-4 rounded-xl font-bold text-white shadow-xl shadow-velocity-primary/40 hover:scale-[1.01] transition-all" style={{ backgroundColor: BRAND.colors.primary }}>
                Confirmar Depósito
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: ENVIAR ─── */}
      {tab === "enviar" && (
        <>
          <button type="button" onClick={() => handleTabChange("principal")} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4 flex items-center gap-1 font-medium">
            ← Volver
          </button>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Enviar Fondos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Envía instantáneamente a otros usuarios de {BRAND.name}.</p>

          {isTransitioning ? (
            <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-5 animate-pulse">
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-12 rounded-xl w-full mt-4"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-5 shadow-sm animate-fade-in-up">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Destinatario (ID o Correo)</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="text" placeholder="@usuario o correo@ejemplo.com" className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-velocity-primary/20 outline-none transition-all font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Monto a Enviar</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</div>
                  <input type="text" inputMode="decimal" placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white text-lg font-bold focus:ring-2 focus:ring-velocity-primary/20 outline-none transition-all" />
                </div>
              </div>
              <button type="button" className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-velocity-primary/40 transition-all hover:scale-[1.02]" style={{ backgroundColor: BRAND.colors.primary }}>
                <Send className="w-4 h-4" />
                Enviar Dinero
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: RETIRO ─── */}
      {tab === "retiro" && (
        <>
          <button type="button" onClick={() => handleTabChange("principal")} className="text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 mb-4 flex items-center gap-1 transition-colors font-medium">
            ← Volver
          </button>
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Retirar Fondos</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Retira tus ganancias o fondos excedentes a tus métodos guardados.</p>

          {isTransitioning ? (
            <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-5 animate-pulse">
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-16 rounded-xl w-full"></div>
              <div className="bg-slate-200 dark:bg-slate-700 h-12 rounded-xl w-full mt-4"></div>
            </div>
          ) : (
            <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/5 p-6 space-y-5 shadow-sm animate-fade-in-up">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Monto a Retirar</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</div>
                  <input type="text" inputMode="decimal" placeholder="0.00" className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white text-lg font-bold focus:ring-2 focus:ring-velocity-primary/20 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Método de Destino</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white text-sm font-medium focus:ring-2 focus:ring-velocity-primary/20 outline-none transition-all appearance-none cursor-pointer">
                  <option value="">Selecciona un método de pago</option>
                  <option value="pago-movil">Pago Móvil</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="wally">Wally</option>
                  <option value="paypal">PayPal</option>
                  <option value="zinli">Zinli</option>
                </select>
              </div>
              <button type="button" className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 shadow-xl shadow-velocity-primary/40 transition-all hover:scale-[1.02]" style={{ backgroundColor: BRAND.colors.primary }}>
                <ArrowUpFromLine className="w-4 h-4" />
                Solicitar Retiro
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── TAB: RECIBIR (modal) ─── */}
      {tab === "recibir" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => handleTabChange("principal")}>
          <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-8 max-w-sm w-full text-center shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4">Tu Código de Pago QR</p>
            <div className="inline-block p-4 bg-white rounded-2xl border-2 border-slate-100 dark:border-white/10 mb-5 shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent("@velocity_xxxx")}&format=svg`}
                alt="Código QR de tu ID"
                className="w-48 h-48 object-contain"
              />
            </div>
            <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-1">ID de Usuario</p>
            <p className="font-mono font-bold text-lg text-slate-800 dark:text-white">@velocity_xxxx</p>
            <button type="button" onClick={() => copyToClipboard("@velocity_xxxx", "user")} className="mt-4 text-sm flex items-center justify-center gap-2 mx-auto text-velocity-primary font-bold hover:scale-105 transition-all">
              <Copy className="w-4 h-4" />
              Copiar ID para compartir
            </button>
            <button type="button" onClick={() => handleTabChange("principal")} className="mt-6 w-full py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* ─── INFO RETIROS (siempre visible) ─── */}
      <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 transition-colors">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3">Información de Retiros</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Los fondos generados por servicios o ventas empresariales pueden ser liquidados diariamente.
        </p>
        <ul className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-400">
          <li className="flex gap-2"><span>•</span> <strong>Mínimo:</strong> 10 USD para liquidación inmediata vía Pago Móvil.</li>
          <li className="flex gap-2"><span>•</span> <strong>Corporativo:</strong> Transferencias ACH para montos mayores a 500 USD.</li>
        </ul>
      </div>

      {copied && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl bg-slate-900 border border-white/10 text-white text-sm font-bold shadow-2xl animate-bounce">
          ✓ ¡Copiado al portapapeles!
        </div>
      )}
    </div>
  );
}
