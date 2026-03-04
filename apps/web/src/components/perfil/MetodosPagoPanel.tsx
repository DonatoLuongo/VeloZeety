"use client";

import { BRAND } from "@velocity/shared";
import { Smartphone, Building2, Wallet, CreditCard, Plus } from "lucide-react";

const METODOS = [
  { id: "pago-movil", name: "Pago Móvil", Icon: Smartphone, desc: "Venezuela" },
  { id: "transferencia", name: "Transferencia bancaria", Icon: Building2, desc: "Cuenta en bolívares o USD" },
  { id: "wally", name: "Wally", Icon: Wallet, desc: "Billetera digital" },
  { id: "paypal", name: "PayPal", Icon: CreditCard, desc: "Retiros internacionales" },
  { id: "zinli", name: "Zinli", Icon: CreditCard, desc: "Billetera y tarjeta virtual" },
];

type MetodosPagoPanelProps = { embedInDashboard?: boolean };

export default function MetodosPagoPanel({ embedInDashboard }: MetodosPagoPanelProps) {
  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 mb-1">Métodos de pago</h2>
      <p className="text-slate-500 text-base mb-4">Agrega cuentas para retiros y depósitos USD / Bs.</p>

      <p className="text-sm text-slate-600 mb-5">
        Vincula tus métodos para retirar VELO a Bs. o USD desde tu billetera. Los datos se guardan de forma segura.
      </p>

      <div className="space-y-4 mb-6">
        {METODOS.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
              <m.Icon className="w-6 h-6 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-base">{m.name}</p>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </div>
            <button
              type="button"
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-white flex items-center gap-1.5"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              <Plus className="w-4 h-4" /> Agregar
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-600">
        <p className="font-semibold text-slate-800 mb-1">Retiros desde la billetera</p>
        <p>En Billetera → Retiro podrás enviar USD o Bs. a la cuenta que elijas de esta lista. Mínimo según método.</p>
      </div>
    </div>
  );
}
