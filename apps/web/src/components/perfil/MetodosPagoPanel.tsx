"use client";

import { useState } from "react";
import { BRAND } from "@velocity/shared";
import { Smartphone, Building2, Wallet, CreditCard, Plus, CheckCircle2 } from "lucide-react";

const PayPalLogo = () => (
  <svg viewBox="0 0 24 24" className="w-7 h-7" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.076 21.337H2.47a1.103 1.103 0 0 1-1.077-1.3l2.854-18.19A1.103 1.103 0 0 1 5.324 1h8.63c3.042 0 4.965.525 5.926 1.62.961 1.096 1.144 2.8.55 5.1-.643 2.5-2.015 4.39-4.12 5.672-2.103 1.282-4.904 1.923-8.402 1.923h-1.286a1.103 1.103 0 0 0-1.077.935l-1.469 5.087z" fill="#003087" />
    <path d="M11.64 23.337H7.034a1.103 1.103 0 0 1-1.077-1.3L8.81 3.847a1.103 1.103 0 0 1 1.077-.91h8.63c3.042 0 4.965.525 5.926 1.62.961 1.096 1.144 2.8.55 5.1-.643 2.5-2.015 4.39-4.12 5.672-2.103 1.282-4.904 1.923-8.402 1.923h-1.286a1.103 1.103 0 0 0-1.077.935l-1.469 5.087z" fill="#009CDE" />
    <path d="M12.926 17.62c2.103-1.282 3.475-3.172 4.118-5.672.594-2.3-.41-4.004-1.37-5.1-.962-1.095-2.885-1.62-5.927-1.62H8.81l-3.328 20.25h4.606l1.469-5.087a1.103 1.103 0 0 1 1.077-.935h.292z" fill="#012169" opacity="0.1" />
  </svg>
);

const WallyLogo = () => (
  <svg viewBox="0 0 100 100" className="w-8 h-8">
    <path fill="#F46E20" d="M22,45 L37,30 L52,45 L37,60 Z" />
    <path fill="#F46E20" d="M41,64 L56,49 L71,64 L56,79 Z" opacity="0.85" />
    <path fill="#F46E20" d="M60,45 L75,30 L90,45 L75,60 Z" />
  </svg>
);

const ZinliLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8">
    <rect width="24" height="24" rx="6" fill="#5F35B6" />
    <path d="M6 7h12l-9 8h9v2H6l9-8H6V7z" fill="#00D094" />
    <path d="M10.5 12.5l3-2.5" stroke="#5F35B6" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const METODOS = [
  { id: "pago-movil", name: "Pago Móvil", Icon: Smartphone, desc: "Venezuela" },
  { id: "transferencia", name: "Transferencia bancaria", Icon: Building2, desc: "Cuenta en bolívares o USD" },
  { id: "paypal", name: "PayPal", Icon: PayPalLogo, desc: "Retiros internacionales" },
  { id: "wally", name: "Wally Panama", Icon: WallyLogo, desc: "Billetera digital internacional", comingSoon: true },
  { id: "zinli", name: "Zinli", Icon: ZinliLogo, desc: "Billetera digital P2P", comingSoon: true }
];

type MetodosPagoPanelProps = { embedInDashboard?: boolean };

export default function MetodosPagoPanel({ embedInDashboard }: MetodosPagoPanelProps) {
  const [agregados, setAgregados] = useState<Record<string, boolean>>({});
  const [activeForm, setActiveForm] = useState<string | null>(null);

  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">Métodos de pago</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-4">Agrega cuentas para retiros y depósitos USD / Bs.</p>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
        Vincula tus métodos para retirar VELO a Bs. o USD desde tu billetera. Los datos se guardan de forma segura.
      </p>

      <div className="space-y-4 mb-6">
        {METODOS.map((m) => {
          const isAdded = agregados[m.id];
          const isComingSoon = m.comingSoon;
          return (
            <div
              key={m.id}
              className={`bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm transition-opacity ${isComingSoon ? "opacity-75" : ""}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 overflow-hidden">
                   <m.Icon className={typeof m.Icon === 'function' ? "" : "w-6 h-6 text-slate-600 dark:text-slate-300"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-base flex items-center gap-2">
                    {m.name}
                    {isComingSoon && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        Próximamente
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
                </div>
                {!isAdded && activeForm !== m.id && !isComingSoon && (
                  <button
                    type="button"
                    onClick={() => setActiveForm(m.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-1.5 transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: BRAND.colors.primary }}
                  >
                    <Plus className="w-4 h-4" /> Agregar
                  </button>
                )}
                {isComingSoon && (
                  <button
                    disabled
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-white/5 cursor-not-allowed"
                  >
                    Próximamente
                  </button>
                )}
                {isAdded && (
                  <span className="px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Agregado
                  </span>
                )}
              </div>

              {/* Formulario Desplegable */}
              {activeForm === m.id && !isAdded && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10 animate-slide-up-soft">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                    {m.id === "pago-movil" && (
                      <>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Banco</label>
                          <select className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-sm text-slate-800 dark:text-white outline-none focus:border-[#F46E20] appearance-none cursor-pointer">
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="">Selecciona un banco</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0102">Banco de Venezuela (0102)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0104">Venezolano de Crédito (0104)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0105">Mercantil (0105)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0108">Provincial (0108)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0134">Banesco (0134)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0191">BNC (0191)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0156">100% Banco (0156)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0114">Bancaribe (0114)</option>
                            <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="0172">Bancamiga (0172)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                          <input type="tel" placeholder="04141234567" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-sm text-slate-800 dark:text-white outline-none focus:border-[#F46E20]" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cédula o RIF</label>
                          <div className="flex gap-2">
                            <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-sm text-slate-800 dark:text-white outline-none focus:border-[#F46E20]">
                              <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="V">V</option>
                              <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="E">E</option>
                              <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="J">J</option>
                              <option className="bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white" value="P">P</option>
                            </select>
                            <input type="text" placeholder="12345678" className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-sm text-slate-800 dark:text-white outline-none focus:border-[#F46E20]" />
                          </div>
                        </div>
                      </>
                    )}
                    {m.id === "transferencia" && (
                      <>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Banco</label>
                          <input type="text" placeholder="Ej. Banesco o BofA" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Número de cuenta</label>
                          <input type="text" placeholder="0134..." className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Titular (Nombre completo)</label>
                          <input type="text" placeholder="Nombre completo" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
                        </div>
                      </>
                    )}
                    {(m.id === "paypal") && (
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Correo electrónico asociado a {m.name}</label>
                        <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-sm text-slate-800 dark:text-white outline-none focus:border-[#F46E20]" />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveForm(null)}
                      className="px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-white/20 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/10"
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAgregados((prev) => ({ ...prev, [m.id]: true }));
                        setActiveForm(null);
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-medium text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: BRAND.colors.primary }}
                    >
                      Guardar {m.name}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-slate-50 dark:bg-velocity-surface border border-slate-200 dark:border-white/10 p-5 text-sm text-slate-600 dark:text-slate-400 mt-6">
        <p className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Retiros desde la billetera</p>
        <p>En Billetera → Retiro podrás enviar USD o Bs. a la cuenta que elijas de esta lista. Mínimo según método.</p>
      </div>
    </div>
  );
}
