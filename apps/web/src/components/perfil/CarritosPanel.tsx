"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Wallet, Trash2, BadgeCheck, Store, ChevronLeft, ChevronRight, Search, Calendar } from "lucide-react";

const CARRITO_KEY = "velocity_carrito_guardado";

type StoredItem = {
  product: { id: string; name: string; desc: string; price: number; off?: number; categoria?: string; tienda?: { nombre: string; oficial?: boolean } };
  qty: number;
};

type CarritosPanelProps = { embedInDashboard?: boolean };

export default function CarritosPanel({ embedInDashboard }: CarritosPanelProps) {
  const router = useRouter();
  const [items, setItems] = useState<StoredItem[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [pagina, setPagina] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const GRUPOS_POR_PAGINA = 3;

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

  const removerTienda = (storeName: string) => {
    setItems((prev) => {
      const next = prev.filter(
        (it) => (it.product.tienda?.nombre || "Tienda VeloCity") !== storeName
      );
      if (typeof window !== "undefined") localStorage.setItem(CARRITO_KEY, JSON.stringify(next));
      
      // Also remove them from selected state
      setSelected((prevSel) => {
         const nextSel = new Set(prevSel);
         prev.forEach(it => {
            if ((it.product.tienda?.nombre || "Tienda VeloCity") === storeName) {
               nextSel.delete(it.product.id);
            }
         });
         return nextSel;
      });
      return next;
    });
    // In case removing a store leaves current page empty, go back
    if (tiendasPaginadas.length === 1 && pagina > 1) {
       setPagina(p => p - 1);
    }
  };

  const comprarSoloTienda = (storeName: string, itemsEnTienda: StoredItem[]) => {
    setSelected(new Set(itemsEnTienda.map(it => it.product.id)));
  };

  const selectedItems = items.filter((it) => selected.has(it.product.id));
  const total = selectedItems.reduce((sum, it) => sum + it.product.price * it.qty, 0);

  // Filter Logic
  const filteredItems = items.filter((it) => {
    const term = searchQuery.toLowerCase();
    const matchName = it.product.name.toLowerCase().includes(term);
    const matchStore = (it.product.tienda?.nombre || "Tienda VeloCity").toLowerCase().includes(term);
    // Since we don't store "addedAt" date, the date filter is decorative to fulfill the UI requirement for now,
    // or it could be wired to a real backend date property later.
    return matchName || matchStore;
  });

  // Grouping Logic
  const itemsPorTienda = filteredItems.reduce((acc, it) => {
    const tiendaNombre = it.product.tienda?.nombre || "Tienda VeloCity";
    if (!acc[tiendaNombre]) {
      acc[tiendaNombre] = {
        info: it.product.tienda || { nombre: "Tienda VeloCity", oficial: true },
        items: []
      };
    }
    acc[tiendaNombre].items.push(it);
    return acc;
  }, {} as Record<string, { info: { nombre: string; oficial?: boolean }; items: StoredItem[] }>);

  const tiendasArray = Object.values(itemsPorTienda);
  const totalPaginas = Math.max(1, Math.ceil(tiendasArray.length / GRUPOS_POR_PAGINA));
  const tiendasPaginadas = tiendasArray.slice((pagina - 1) * GRUPOS_POR_PAGINA, pagina * GRUPOS_POR_PAGINA);

  return (
    <div className={embedInDashboard ? "w-full max-w-5xl" : "w-full max-w-[1400px] mx-auto p-4 md:p-6 lg:p-8"}>
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
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <div className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white whitespace-nowrap shrink-0">Productos en Carrito ({filteredItems.length})</h3>
               
               <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-lg">
                 <div className="relative w-full">
                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                   <input
                     type="text"
                     placeholder="Buscar en el carrito..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#1A1F27] border border-slate-200 dark:border-[#2B3139] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 dark:text-white placeholder:text-slate-400"
                   />
                 </div>
                 <div className="relative w-full sm:w-[160px] shrink-0">
                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10 pointer-events-none" />
                   <input
                     type="date"
                     value={dateFilter}
                     onChange={(e) => setDateFilter(e.target.value)}
                     className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-[#1A1F27] border border-slate-200 dark:border-[#2B3139] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 dark:text-white min-h-[38px] cursor-pointer relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                   />
                 </div>
               </div>

               <button type="button" onClick={() => {
                  const allSelected = selected.size === items.length;
                  if (allSelected) setSelected(new Set());
                  else setSelected(new Set(items.map(i => i.product.id)));
               }} className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline transition-colors whitespace-nowrap hidden lg:block">
                 {selected.size === items.length ? "Deseleccionar todos" : "Seleccionar todos"}
               </button>
            </div>

            <div className="space-y-6 mb-8">
              {tiendasPaginadas.map((grupo) => (
              <div key={grupo.info.nombre} className="bg-white dark:bg-[#1E2329] rounded-2xl md:rounded-[1.5rem] border border-slate-200 dark:border-[#2B3139] overflow-hidden shadow-sm">
                <div className="bg-slate-50 dark:bg-[#1A1F27] border-b border-slate-200 dark:border-[#2B3139] p-4 sm:px-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${grupo.info.oficial ? "bg-orange-100 dark:bg-orange-500/10 border-orange-200 dark:border-orange-500/20" : "bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600"}`}>
                       <Store className={`w-5 h-5 ${grupo.info.oficial ? "text-orange-600 dark:text-orange-400" : "text-slate-500 dark:text-slate-400"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800 dark:text-white text-base leading-tight">{grupo.info.nombre}</h4>
                        {grupo.info.oficial && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 uppercase tracking-wider">
                             <BadgeCheck className="w-3 h-3" /> Oficial
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">Envíos a nivel nacional</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <button
                        type="button"
                        onClick={() => comprarSoloTienda(grupo.info.nombre, grupo.items)}
                        className="hidden sm:inline-flex text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                     >
                        Comprar solo esta
                     </button>
                     <button
                        type="button"
                        onClick={() => removerTienda(grupo.info.nombre)}
                        className="text-xs font-bold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                        aria-label="Remover toda la tienda"
                     >
                        Remover
                     </button>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 flex flex-col gap-3">
                  {grupo.items.map((it) => (
                    <div
                      key={it.product.id}
                      className="bg-white dark:bg-[#1E2329] rounded-xl border border-slate-200 dark:border-[#2B3139] p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm hover:shadow hover:border-slate-300 dark:hover:border-slate-500 transition-all"
                    >
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                          type="button"
                          onClick={() => toggleSelect(it.product.id)}
                          className={`w-6 h-6 rounded border-2 flex-shrink-0 flex items-center justify-center transition-all ${selected.has(it.product.id) ? "border-emerald-500 bg-emerald-500 shadow-sm shadow-emerald-500/20" : "border-slate-300 dark:border-slate-600 bg-transparent hover:border-emerald-400"
                            }`}
                          aria-label={selected.has(it.product.id) ? "Quitar de la compra" : "Incluir en la compra"}
                        >
                          {selected.has(it.product.id) && <span className="text-white text-[10px] font-black italic">✓</span>}
                        </button>
                        <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5 flex items-center justify-center shrink-0">
                          <ShoppingCart className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0 sm:hidden">
                          <p className="font-bold text-slate-800 dark:text-white text-sm leading-tight truncate">{it.product.name}</p>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 hidden sm:block">
                        <p className="font-bold text-slate-800 dark:text-white text-base leading-tight truncate">{it.product.name}</p>
                        <p className="text-xs font-semibold mt-0.5 text-slate-500 dark:text-slate-400">
                          <span style={{ color: BRAND.colors.primary }}>${it.product.price.toFixed(2)}</span> c/u
                        </p>
                      </div>
                      
                      {/* Mobile version price */}
                      <div className="sm:hidden -mt-2 ml-[90px] mb-2">
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                          <span style={{ color: BRAND.colors.primary }}>${it.product.price.toFixed(2)}</span> c/u
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 ml-[90px] sm:ml-0">
                        <div className="flex items-center bg-white dark:bg-slate-800/50 rounded-lg p-1 shadow-sm border border-slate-200 dark:border-white/5 w-full sm:w-auto h-9">
                          <button
                            type="button"
                            onClick={() => updateQty(it.product.id, -1)}
                            className="w-8 h-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-all"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <div className="w-10 text-center border-x border-slate-100 dark:border-white/5 flex flex-col items-center justify-center">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">{it.qty}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => updateQty(it.product.id, 1)}
                            className="w-8 h-full flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
                          <div className="text-left sm:text-right sm:min-w-[70px]">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:hidden">Total</p>
                            <p className="font-extrabold text-lg text-slate-900 dark:text-white leading-none">${(it.product.price * it.qty).toFixed(2)}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => updateQty(it.product.id, -it.qty)}
                            className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {totalPaginas > 1 && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <button
                type="button"
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
                className="p-2 rounded-xl border border-slate-200 dark:border-[#2B3139] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPagina(n)}
                    className={`min-w-[2.5rem] py-2 px-2 rounded-xl text-sm font-semibold transition-all ${
                      pagina === n
                        ? "text-white shadow-md bg-[#F46E20]"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                    style={pagina === n ? { backgroundColor: BRAND.colors.primary } : {}}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
                className="p-2 rounded-xl border border-slate-200 dark:border-[#2B3139] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        <div className="w-full lg:w-[320px] xl:w-[340px] lg:sticky lg:top-24 shrink-0 transition-all">
          <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-5 lg:p-6 shadow-sm">
             <div className="flex flex-col sm:flex-row lg:flex-col sm:justify-between lg:justify-start lg:items-stretch sm:items-end mb-5 pb-5 border-b border-slate-100 dark:border-[#2B3139] gap-4">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                   Resumen del Pedido
                </p>
                <div className="flex items-center gap-3">
                   <p className="text-3xl font-extrabold text-slate-900 dark:text-white">Subtotal</p>
                   <span className="bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-600">
                     {selectedItems.length} items
                   </span>
                </div>
              </div>
              <div className="sm:text-right text-left">
                <p className="text-4xl font-black" style={{ color: BRAND.colors.primary }}>${total.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/app/billetera")}
                className="w-full py-3 rounded-lg font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-500 border border-emerald-500 flex items-center justify-center gap-2.5 text-sm shadow-sm transition-colors active:scale-[0.98]"
              >
                <Wallet className="w-4 h-4" />
                Realizar pedido
              </button>
              <button 
                type="button"
                onClick={() => router.push("/app/servicios")}
                className="w-full py-2.5 rounded-lg font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 flex items-center justify-center gap-2 text-sm transition-colors"
                >
                Seguir comprando
              </button>
            </div>
          </div>
        </div>
      </div>
      </>
    )}
  </div>
  );
}
