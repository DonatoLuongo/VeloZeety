"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Wallet, Trash2 } from "lucide-react";

const CARRITO_KEY = "velocity_carrito_guardado";

type StoredItem = {
  product: { id: string; name: string; desc: string; price: number; off?: number; categoria?: string };
  qty: number;
};

type CarritosPanelProps = { embedInDashboard?: boolean };

export default function CarritosPanel({ embedInDashboard }: CarritosPanelProps) {
  const router = useRouter();
  const [items, setItems] = useState<StoredItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CARRITO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredItem[];
        if (Array.isArray(parsed)) {
          setItems(parsed);
          setSelected(new Set(parsed.map((i) => i.product.id)));
        }
      }
    } catch (_) {}
  }, []);

  const updateQty = (productId: string, delta: number) => {
    setItems((prev) => {
      const next = prev
        .map((it) =>
          it.product.id === productId ? { ...it, qty: Math.max(0, it.qty + delta) } : it
        )
        .filter((it) => it.qty > 0);
      if (typeof window !== "undefined") localStorage.setItem(CARRITO_KEY, JSON.stringify(next));
      return next;
    });
  };

  const toggleSelect = (productId: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  };

  const selectedItems = items.filter((it) => selected.has(it.product.id));
  const total = selectedItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      {!embedInDashboard && (
        <div className="flex items-center gap-3 mb-6">
          <Link href="/app/perfil" className="p-2 rounded-lg hover:bg-slate-100 text-slate-600" aria-label="Volver">
            ← Volver
          </Link>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Carritos guardados</h1>
            <p className="text-sm text-slate-500">Tienda VeloCity · Elige cantidades y paga con tu wallet</p>
          </div>
        </div>
      )}
      {items.length === 0 ? (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 text-center">
          <ShoppingCart className="w-14 h-14 text-slate-400 mx-auto mb-4" />
          <p className="font-semibold text-slate-700 text-lg">No tienes carritos guardados</p>
          <p className="text-slate-500 mt-1">Añade productos desde la tienda de accesorios.</p>
          <Link
            href="/app/servicios"
            className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium"
            style={{ backgroundColor: BRAND.colors.primary }}
          >
            Ir a la tienda →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((it) => (
              <div
                key={it.product.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center gap-4 shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleSelect(it.product.id)}
                  className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center ${
                    selected.has(it.product.id) ? "border-emerald-600 bg-emerald-600" : "border-slate-300"
                  }`}
                  aria-label={selected.has(it.product.id) ? "Quitar de la compra" : "Incluir en la compra"}
                >
                  {selected.has(it.product.id) && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 text-base">{it.product.name}</p>
                  <p className="text-slate-600 text-sm" style={{ color: BRAND.colors.primary }}>
                    ${it.product.price.toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQty(it.product.id, -1)}
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-semibold text-slate-800 text-base">{it.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(it.product.id, 1)}
                    className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => updateQty(it.product.id, -it.qty)}
                  className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                  aria-label="Eliminar"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sticky bottom-0">
            <p className="text-base text-slate-600 mb-1">{selectedItems.length} producto(s) seleccionado(s)</p>
            <p className="text-2xl font-bold text-slate-800">
              Total: <span style={{ color: BRAND.colors.primary }}>${total.toFixed(2)}</span>
            </p>
            <button
              type="button"
              onClick={() => router.push("/app/billetera")}
              className="mt-4 w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 text-base"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              <Wallet className="w-5 h-5" />
              Pagar con VELO (${total.toFixed(2)})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
