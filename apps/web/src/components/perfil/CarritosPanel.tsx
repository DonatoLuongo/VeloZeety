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
    } catch (_) { }
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
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Carritos guardados</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Tienda VeloCity · Elige productos y paga sin recargas</p>
          </div>
        </div>
      )}
      {items.length === 0 ? (
        <div className="bg-slate-50 dark:bg-white/5 rounded-[2.5rem] border border-slate-200 dark:border-white/10 p-12 text-center transition-colors">
          <ShoppingCart className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-5" />
          <p className="font-bold text-slate-700 dark:text-white text-xl">Tu carrito está vacío</p>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm max-w-[240px] mx-auto">Explora nuestra tienda de accesorios y guarda tus favoritos aquí.</p>
          <Link
            href="/app/servicios"
            className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-white text-sm font-black shadow-lg shadow-velocity-primary/20 transition-all active:scale-95 hover:brightness-110"
            style={{ backgroundColor: BRAND.colors.primary }}
          >
            Explorar Tienda <ShoppingCart className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map((it) => (
              <div
                key={it.product.id}
                className="bg-white dark:bg-[#393E46] rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-center gap-4 shadow-sm transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleSelect(it.product.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected.has(it.product.id) ? "border-emerald-600 bg-emerald-600 shadow-md shadow-emerald-500/20" : "border-slate-300 dark:border-slate-700 bg-transparent"
                    }`}
                  aria-label={selected.has(it.product.id) ? "Quitar de la compra" : "Incluir en la compra"}
                >
                  {selected.has(it.product.id) && <span className="text-white text-[10px] font-black italic">✓</span>}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-slate-800 dark:text-white text-base leading-tight">{it.product.name}</p>
                  <p className="text-xs font-bold mt-1" style={{ color: BRAND.colors.primary }}>
                    ${it.product.price.toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQty(it.product.id, -1)}
                    className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-black text-slate-900 dark:text-white text-base">{it.qty}</span>
                  <button
                    type="button"
                    onClick={() => updateQty(it.product.id, 1)}
                    className="w-10 h-10 rounded-xl border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
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
          <div className="bg-white dark:bg-[#1E293B] rounded-[2.5rem] border-2 border-slate-100 dark:border-white/5 p-6 shadow-2xl sticky bottom-4 transition-all">
            <div className="flex justify-between items-end mb-5">
              <div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1">{selectedItems.length} items seleccionados</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">Subtotal</p>
              </div>
              <p className="text-3xl font-black" style={{ color: BRAND.colors.primary }}>${total.toFixed(2)}</p>
            </div>
            <button
              type="button"
              onClick={() => router.push("/app/billetera")}
              className="w-full py-4.5 rounded-2xl font-black text-white flex items-center justify-center gap-3 text-base shadow-xl transition-all active:scale-[0.98] hover:brightness-110"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              <Wallet className="w-6 h-6" />
              Pagar con Billetera (${total.toFixed(2)})
            </button>
          </div>
        </>
      )}
    </div>
  );
}
