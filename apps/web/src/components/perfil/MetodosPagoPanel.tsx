"use client";

import { useState } from "react";
import { BRAND } from "@velocity/shared";
import { Smartphone, Building2, Wallet, CreditCard, Plus, CheckCircle2 } from "lucide-react";

const METODOS = [
  { id: "pago-movil", name: "Pago Móvil", Icon: Smartphone, desc: "Venezuela" },
  { id: "transferencia", name: "Transferencia bancaria", Icon: Building2, desc: "Cuenta en bolívares o USD" },
  { id: "wally", name: "Wally", Icon: Wallet, desc: "Billetera digital" },
  { id: "paypal", name: "PayPal", Icon: CreditCard, desc: "Retiros internacionales" },
  { id: "zinli", name: "Zinli", Icon: CreditCard, desc: "Billetera y tarjeta virtual" },
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
          return (
            <div
              key={m.id}
              className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0">
                  <m.Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-base">{m.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{m.desc}</p>
                </div>
                {!isAdded && activeForm !== m.id && (
                  <button
                    type="button"
                    onClick={() => setActiveForm(m.id)}
                    className="px-4 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-1.5 transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: BRAND.colors.primary }}
                  >
                    <Plus className="w-4 h-4" /> Agregar
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
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Banco</label>
                          <select className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100">
                            <option value="">Selecciona un banco</option>
                            <option value="0102">Banco de Venezuela (0102)</option>
                            <option value="0104">Venezolano de Crédito (0104)</option>
                            <option value="0105">Mercantil (0105)</option>
                            <option value="0108">Provincial (0108)</option>
                            <option value="0134">Banesco (0134)</option>
                            <option value="0191">BNC (0191)</option>
                            <option value="0156">100% Banco (0156)</option>
                            <option value="0114">Bancaribe (0114)</option>
                            <option value="0172">Bancamiga (0172)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Teléfono</label>
                          <input type="tel" placeholder="04141234567" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cédula o RIF</label>
                          <div className="flex gap-2">
                            <select className="px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100">
                              <option value="V">V</option>
                              <option value="E">E</option>
                              <option value="J">J</option>
                              <option value="P">P</option>
                            </select>
                            <input type="text" placeholder="12345678" className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
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
                    {(m.id === "wally" || m.id === "paypal" || m.id === "zinli") && (
                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Correo electrónico asociado a {m.name}</label>
                        <input type="email" placeholder="tucorreo@ejemplo.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-white/20 bg-white dark:bg-velocity-bg text-sm text-slate-800 dark:text-slate-100" />
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
