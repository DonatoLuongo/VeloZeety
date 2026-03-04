"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { ChevronLeft, Smartphone, Building2, Wallet, CreditCard, Plus } from "lucide-react";

const METODOS = [
  { id: "pago-movil", name: "Pago Móvil", Icon: Smartphone, desc: "Venezuela" },
  { id: "transferencia", name: "Transferencia bancaria", Icon: Building2, desc: "Cuenta en bolívares o USD" },
  { id: "wally", name: "Wally", Icon: Wallet, desc: "Billetera digital" },
  { id: "paypal", name: "PayPal", Icon: CreditCard, desc: "Retiros internacionales" },
  { id: "zinli", name: "Zinli", Icon: CreditCard, desc: "Billetera y tarjeta virtual" },
];

export default function MetodosPagoPage() {
  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/app/perfil" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Volver">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-slate-800">Métodos de pago</h1>
          <p className="text-sm text-slate-500">Agrega cuentas para retiros y depósitos USD / Bs.</p>
        </div>
      </div>

      <p className="text-sm text-slate-600 mb-4">
        Vincula tus métodos para retirar VELO a Bs. o USD desde tu billetera. Los datos se guardan de forma segura.
      </p>

      <div className="space-y-2 mb-6">
        {METODOS.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <m.Icon className="w-6 h-6 text-slate-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800">{m.name}</p>
              <p className="text-sm text-slate-500">{m.desc}</p>
            </div>
            <button
              type="button"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white flex items-center gap-1.5"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              <Plus className="w-4 h-4" /> Agregar
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
        <p className="font-medium text-slate-800 mb-1">Retiros desde la billetera</p>
        <p>En Billetera → Retiro podrás enviar USD o Bs. a la cuenta que elijas de esta lista. Mínimo según método.</p>
      </div>
    </div>
  );
}
