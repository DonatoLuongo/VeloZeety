"use client";

import { BRAND } from "@velocity/shared";
import { useState, useEffect } from "react";
import {
  Trash2,
  Leaf,
  Droplets,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Calendar,
  FileText,
  Plus,
  Minus,
  BadgeCheck,
  Clock,
  Search,
  ShoppingCart,
  Wallet,
  PhoneCall,
  Ambulance,
  Flame,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import LocationIconOrange from "@/components/LocationIconOrange";

const CARRITO_KEY = "velocity_carrito_guardado";

const SERVICIOS_PREMIUM = [
  {
    id: "emergencia",
    title: "Emergencias y Salud",
    short: "Ambulancia, auxilio médico vial y organismos del Estado",
    Icon: ShieldAlert,
    tag: "Nuevo" as "Nuevo" | "Aproximadamente" | "Futuro servicio" | undefined,
    detail: "Acceso inmediato a servicios de rescate y salud. Solicita ambulancias privadas parientes de VeloCity, auxilio médico vial (paramédicos), bomberos o policía. También permite reportar fallas de infraestructura pública (semáforos, cables) directamente a los organismos competentes. Tu seguridad es nuestra prioridad.",
    pricing: "Servicios públicos sin costo. Servicios privados según proveedor.",
    cta: "Solicitar asistencia ahora",
  },
  {
    id: "agua-potable",
    title: "Camión del agua potable",
    short: "Botellones a tu urbanización con horario establecido",
    Icon: Droplets,
    tag: "Nuevo" as const,
    detail: "Servicio de entrega de agua potable a domicilio en urbanizaciones, con horario fijo y flota verificada. Solicita desde la app la cantidad de botellones que necesites (1, 2, 3 o más); el camión pasa en la franja acordada. Pago mensual dentro de la aplicación: sin salir a la calle ni cargar bajo el sol. Incluye personal uniformado y estándares de calidad. Ideal para hogares y comunidades. Precio desde 15 USD/mes según plan y zona.",
    pricing: "Desde 15 USD/mes. Recargas según plan. Pago en app.",
    cta: "Solicitar servicio de agua",
  },
  {
    id: "autolavado",
    title: "Autolavado",
    short: "Lavado de vehículos en nuestro local",
    Icon: Droplets,
    tag: undefined as undefined,
    detail: "Lavado profesional de motos y carros en las instalaciones VeloCity. Dirección del local indicada en la app. Servicio para particulares y flotas, con descuentos por plan. Incluye productos de calidad y atención rápida.",
    pricing: "Moto desde 5 USD, carro desde 8 USD. Descuentos para flota.",
    cta: "Ver ubicación del local",
  },
];

const PRODUCTOS_TIENDA = [
  { id: "1", name: "Casco integral premium", desc: "Alta calidad, certificación DOT. Diseño VeloCity.", price: 89.99, off: 15, categoria: "motos" as const },
  { id: "2", name: "Espejo retrovisor deportivo", desc: "Para motos y carros.", price: 24.99, off: 0, categoria: "todos" as const },
  { id: "3", name: "Funda de asiento impermeable", desc: "Protección para moto y carro. Varios colores.", price: 34.99, off: 10, categoria: "todos" as const },
  { id: "4", name: "Portaequipaje moto", desc: "Soporte trasero resistente. Fácil instalación.", price: 45.99, off: 0, categoria: "motos" as const },
  { id: "5", name: "Kit de herramientas compacto", desc: "Llaves, destornilladores y más. Estuche rígido.", price: 29.99, off: 20, categoria: "todos" as const },
  { id: "6", name: "Cubre volante deportivo", desc: "Cuero sintético. Mejor agarre y estilo.", price: 19.99, off: 0, categoria: "carros" as const },
  { id: "7", name: "Organizador para maletero", desc: "Cajas y redes. Mantén el orden en el carro.", price: 39.99, off: 5, categoria: "carros" as const },
  { id: "8", name: "Guantes de moto todo tiempo", desc: "Protección y comodidad. Tallas S a XXL.", price: 42.99, off: 0, categoria: "motos" as const },
  { id: "9", name: "Cargador dual USB para auto", desc: "12V. Incluye indicador LED.", price: 14.99, off: 15, categoria: "carros" as const },
  { id: "10", name: "Chaqueta reflectante VeloCity", desc: "Alta visibilidad. Tallas disponibles.", price: 59.99, off: 10, categoria: "motos" as const },
  { id: "11", name: "Cable de remolque pesado", desc: "Para camión tipo NPR y cargas. Alta resistencia.", price: 49.99, off: 0, categoria: "camiones" as const },
  { id: "12", name: "Lona de carga reforzada", desc: "Cubierta para caja de camión. Impermeable.", price: 79.99, off: 10, categoria: "camiones" as const },
  { id: "13", name: "Eslingas y correas de amarre", desc: "Juego 4 piezas. Para flete y mudanza.", price: 34.99, off: 0, categoria: "camiones" as const },
  { id: "14", name: "Luz trasera LED para caja", desc: "Instalación en camión de carga. Antigüedad.", price: 28.99, off: 5, categoria: "camiones" as const },
  { id: "15", name: "Retrovisor ampliado camión", desc: "Campo de visión amplio. Montaje lateral.", price: 42.99, off: 0, categoria: "camiones" as const },
  { id: "16", name: "Barra de tiro y enganche", desc: "Para remolques. Uso en pickup y camión.", price: 95.99, off: 0, categoria: "camiones" as const },
  { id: "17", name: "Soportes para botellón agua", desc: "Portabotellones para cabina. 2 unidades.", price: 18.99, off: 0, categoria: "camiones" as const },
  { id: "18", name: "Sistema de sujeción carga", desc: "Rieles y anclajes para caja tipo NPR.", price: 68.99, off: 8, categoria: "camiones" as const },
  { id: "19", name: "Cubierta todoterreno 4x4", desc: "Neumático todo terreno. Varias medidas.", price: 129.99, off: 12, categoria: "4x4" as const },
  { id: "20", name: "Winche eléctrico 4x4", desc: "Para recuperación y remolque. 2500 kg.", price: 189.99, off: 0, categoria: "4x4" as const },
  { id: "21", name: "Barra portaequipaje techo", desc: "Barras de techo para pickup y 4x4.", price: 89.99, off: 5, categoria: "4x4" as const },
  { id: "22", name: "Protector de cárter", desc: "Protección inferior para motor 4x4.", price: 74.99, off: 0, categoria: "4x4" as const },
  { id: "23", name: "Kit rescate y tracción", desc: "Palas, cables y accesorios emergencia.", price: 55.99, off: 10, categoria: "4x4" as const },
  { id: "24", name: "Faro auxiliar LED", desc: "Luz adicional para camión o pickup.", price: 38.99, off: 0, categoria: "todos" as const },
];

const POR_PAGINA = 4;
const CATEGORIAS_TIENDA = ["todos", "motos", "carros", "camiones", "4x4"] as const;

type ProductItem = (typeof PRODUCTOS_TIENDA)[number];

/* Datos del negocio Tienda VeloCity para el modal */
const NEGOCIO_TIENDA = {
  nombre: "Tienda VeloCity",
  descripcion: "Accesorios oficiales para motos, carros, camiones y 4x4. Calidad certificada y envíos a todo el país.",
  direccion: "Av. Principal, Zona Industrial, Caracas",
  horario: "Lun–Dom 8:00 – 20:00",
  pago: "Billetera VELO, efectivo en tienda",
};

function NegocioModal({
  productoInicial,
  onClose,
  carrito,
  persistCarrito,
}: {
  productoInicial: ProductItem;
  onClose: () => void;
  carrito: { product: ProductItem; qty: number }[];
  persistCarrito: (next: { product: ProductItem; qty: number }[]) => void;
}) {
  const [cantidad, setCantidad] = useState(1);

  const addToCart = () => {
    const existing = carrito.find((c) => c.product.id === productoInicial.id);
    const next = existing
      ? carrito.map((c) => (c.product.id === productoInicial.id ? { ...c, qty: c.qty + cantidad } : c))
      : [...carrito, { product: productoInicial, qty: cantidad }];
    persistCarrito(next);
    setCantidad(1);
  };

  const total = carrito.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full overflow-hidden border border-slate-200 my-4 max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="h-28 bg-gradient-to-br from-[#F46E20]/20 to-slate-100 flex items-center justify-center flex-shrink-0">
          <LocationIconOrange size={48} />
        </div>
        <div className="p-5 -mt-8 relative overflow-y-auto flex-1">
          <div className="flex items-end gap-3 mb-3">
            <div className="w-16 h-16 rounded-xl border-2 border-white bg-white shadow-md flex items-center justify-center overflow-hidden flex-shrink-0">
              <LocationIconOrange size={40} />
            </div>
            <div className="flex-1 min-w-0 pb-0.5">
              <h3 className="font-bold text-slate-800 text-lg">Tienda VeloCity</h3>
              <p className="text-sm text-slate-500">Accesorios</p>
              <span className="inline-flex items-center gap-1 text-amber-700 text-xs font-medium mt-1 px-2 py-0.5 rounded-md bg-amber-100 border border-amber-200">
                <BadgeCheck className="w-3.5 h-3.5" /> Verificado premium
              </span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-3">{NEGOCIO_TIENDA.descripcion}</p>
          <div className="space-y-2 mb-4 text-sm text-slate-600">
            <p className="flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" /> {NEGOCIO_TIENDA.direccion}</p>
            <p className="flex items-center gap-2"><Clock className="w-4 h-4 flex-shrink-0 text-slate-400" /> {NEGOCIO_TIENDA.horario}</p>
            <p className="flex items-center gap-2"><Wallet className="w-4 h-4 flex-shrink-0 text-slate-400" /> {NEGOCIO_TIENDA.pago}</p>
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-2">Producto</p>
          <div className="py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 mb-4">
            <p className="font-medium text-slate-800">{productoInicial.name}</p>
            <p className="text-sm text-slate-500 mt-0.5">{productoInicial.desc}</p>
            <p className="text-base font-bold mt-2" style={{ color: BRAND.colors.primary }}>${productoInicial.price.toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setCantidad((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium">−</button>
                <span className="w-10 text-center font-medium text-slate-800">{cantidad}</span>
                <button type="button" onClick={() => setCantidad((q) => q + 1)} className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-600 font-medium">+</button>
              </div>
              <button type="button" onClick={addToCart} className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all">Añadir al carrito</button>
            </div>
          </div>
          {carrito.length > 0 && (
            <div className="mb-4 p-3 rounded-xl bg-slate-100 border border-slate-200">
              <p className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-1"><ShoppingCart className="w-4 h-4" /> Tu carrito ({carrito.length} {carrito.length === 1 ? "ítem" : "ítems"})</p>
              <ul className="space-y-1 text-sm text-slate-600 mb-2 max-h-24 overflow-y-auto">
                {carrito.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.product.name} × {item.qty}</span>
                    <span className="font-medium">${(item.product.price * item.qty).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm font-bold text-slate-800 flex justify-between">
                Total <span style={{ color: BRAND.colors.primary }}>${total.toFixed(2)}</span>
              </p>
              <button type="button" onClick={() => persistCarrito([])} className="mt-2 w-full py-1.5 rounded-lg border border-slate-300 text-slate-600 text-xs font-medium">Vaciar carrito</button>
            </div>
          )}
          <button type="button" className="w-full py-2.5 rounded-xl font-medium text-white text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform" style={{ backgroundColor: BRAND.colors.primary }} disabled={carrito.length === 0}>
            <Wallet className="w-4 h-4" />
            {carrito.length > 0 ? `Pagar con VELO ($${total.toFixed(2)})` : "Pagar con VELO"}
          </button>
          <button type="button" onClick={onClose} className="mt-2 w-full py-2 rounded-xl border border-slate-200 bg-white text-emerald-600 text-sm font-medium hover:bg-emerald-50 active:scale-[0.98] transition-all">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

type PanelVista = "tienda" | (typeof SERVICIOS_PREMIUM)[number]["id"];

export default function ServiciosPage() {
  const [panelVista, setPanelVista] = useState<PanelVista>("tienda");
  const [filter, setFilter] = useState<typeof CATEGORIAS_TIENDA[number]>("todos");
  const [pagina, setPagina] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductItem | null>(null);
  const [searchTienda, setSearchTienda] = useState("");
  const [carrito, setCarrito] = useState<{ product: ProductItem; qty: number }[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(CARRITO_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) setCarrito(parsed);
    } catch (_) { }
  }, []);

  const persistCarrito = (next: { product: ProductItem; qty: number }[]) => {
    setCarrito(next);
    if (typeof window !== "undefined") localStorage.setItem(CARRITO_KEY, JSON.stringify(next));
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col md:flex-row md:max-w-none">
      {/* Columna izquierda: panel de control (dashboard) */}
      <div className="md:w-[340px] md:flex-shrink-0 md:border-r md:border-slate-200 md:bg-slate-50/50 p-4 md:p-5">
        <h1 className="text-xl md:text-lg font-bold text-slate-800 mb-1">Servicios</h1>
        <p className="text-slate-500 text-sm mb-4 md:mb-5">Servicios premium y tienda. Pago con billetera VeloCity.</p>
        <h2 className="text-base font-bold mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Panel de control
        </h2>
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setPanelVista("tienda")}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${panelVista === "tienda" ? "border-[#0EA5E9] bg-sky-50/80 shadow-sm" : "border-slate-200 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50"
              }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100">
              <ShoppingBag className="w-6 h-6 text-slate-600" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm">Tienda de accesorios</p>
              <p className="text-xs text-slate-500 mt-0.5">Productos, carrito y pago con wallet</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </button>
          {SERVICIOS_PREMIUM.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPanelVista(s.id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${panelVista === s.id ? "border-[#0EA5E9] bg-sky-50/80 shadow-sm" : "border-slate-200 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50"
                }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100">
                <s.Icon className="w-6 h-6 text-slate-600" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-slate-800 text-sm">{s.title}</p>
                  {s.tag === "Nuevo" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-sky-100 text-sky-700 border border-sky-200">
                      Nuevo
                    </span>
                  )}
                  {s.tag === "Aproximadamente" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      Aproximadamente
                    </span>
                  )}
                  {s.tag === "Futuro servicio" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-violet-100 text-violet-700 border border-violet-200">
                      Aprox. / Futuro servicio
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{s.short}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </button>
          ))}
        </nav>
      </div>

      {/* Columna derecha: contenido según selección (dashboard) */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 min-w-0">
        {panelVista === "tienda" ? (
          <section className="w-full max-w-5xl mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Tienda de accesorios</h2>
            <p className="text-slate-500 text-base mb-2">
              Pago con tu billetera VeloCity. El monto se descuenta de tu saldo al confirmar.
            </p>
            <p className="text-xs text-amber-700/80 mb-4 rounded-lg bg-amber-50/80 px-3 py-1.5 border border-amber-100 inline-block">Tasa BCV de referencia para tus pagos.</p>

            <div className="mb-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchTienda}
                  onChange={(e) => { setSearchTienda(e.target.value); setPagina(1); }}
                  className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300"
                  aria-label="Buscar en la tienda"
                />
              </div>
            </div>

            {carrito.length > 0 && (
              <Link
                href="/app/perfil/carritos"
                className="mb-4 flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-sky-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-800">Carrito guardado</p>
                  <p className="text-sm text-slate-500">{carrito.length} producto(s) · Ver y pagar</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400" />
              </Link>
            )}

            <div className="flex flex-wrap gap-3 mb-5">
              {CATEGORIAS_TIENDA.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setFilter(f); setPagina(1); }}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize ${filter === f ? "text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  style={filter === f ? { backgroundColor: BRAND.colors.primary } : {}}
                >
                  {f === "4x4" ? "4x4 / Pickup" : f}
                </button>
              ))}
            </div>
            {(() => {
              const porCategoria = filter === "todos" ? PRODUCTOS_TIENDA : PRODUCTOS_TIENDA.filter((p) => p.categoria === filter);
              const filtrados = !searchTienda.trim()
                ? porCategoria
                : porCategoria.filter(
                  (p) =>
                    p.name.toLowerCase().includes(searchTienda.toLowerCase().trim()) ||
                    p.desc.toLowerCase().includes(searchTienda.toLowerCase().trim())
                );
              const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
              const desde = (pagina - 1) * POR_PAGINA;
              const productosPagina = filtrados.slice(desde, desde + POR_PAGINA);
              return (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {productosPagina.map((p) => (
                      <div key={p.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-5 shadow-sm velocity-card">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <ShoppingBag className="w-10 h-10 text-slate-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 text-base">{p.name}</p>
                          <p className="text-sm text-slate-500 line-clamp-2 mt-0.5">{p.desc}</p>
                          <p className="text-lg font-bold mt-2" style={{ color: BRAND.colors.primary }}>
                            ${p.price.toFixed(2)}
                            {p.off > 0 && <span className="text-green-600 text-sm font-normal ml-1">{p.off}% OFF</span>}
                          </p>
                          <button
                            type="button"
                            onClick={() => setProductoSeleccionado(p)}
                            className="mt-3 px-4 py-2 rounded-xl text-sm font-medium text-white"
                            style={{ backgroundColor: BRAND.colors.primary }}
                          >
                            Ver perfil y comprar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal: solo el producto seleccionado */}
                  {productoSeleccionado && (
                    <NegocioModal
                      productoInicial={productoSeleccionado}
                      onClose={() => setProductoSeleccionado(null)}
                      carrito={carrito}
                      persistCarrito={persistCarrito}
                    />
                  )}
                  {totalPaginas > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setPagina((n) => Math.max(1, n - 1))}
                        disabled={pagina === 1}
                        className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700"
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
                            className={`min-w-[2rem] py-1.5 px-2 rounded-lg text-sm font-medium transition ${pagina === n ? "text-white" : "text-slate-600 hover:bg-slate-100"
                              }`}
                            style={pagina === n ? { backgroundColor: BRAND.colors.primary } : {}}
                          >
                            {n}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setPagina((n) => Math.min(totalPaginas, n + 1))}
                        disabled={pagina === totalPaginas}
                        className="p-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700"
                        aria-label="Página siguiente"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </section>
        ) : (() => {
          const s = SERVICIOS_PREMIUM.find((x) => x.id === panelVista);
          if (!s) return null;
          return (
            <section className="w-full max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-100 flex-shrink-0">
                      <s.Icon className="w-8 h-8 text-slate-600" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800">{s.title}</h2>
                      {s.tag && (
                        <span className={`inline-block mt-1 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${s.tag === "Nuevo" ? "bg-sky-100 text-sky-700 border border-sky-200" :
                          s.tag === "Aproximadamente" ? "bg-amber-100 text-amber-800 border border-amber-200" :
                            "bg-violet-100 text-violet-700 border border-violet-200"
                          }`}>
                          {s.tag === "Futuro servicio" ? "Aprox. / Futuro servicio" : s.tag}
                        </span>
                      )}
                      <p className="text-slate-500 mt-2">{s.short}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">{s.detail}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-2 mb-6">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {s.pricing}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      if (s.id === "emergencia") {
                        window.location.href = "/app/emergencia";
                      }
                    }}
                    className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 text-base"
                    style={{ backgroundColor: BRAND.colors.primary }}
                  >
                    {s.id === "emergencia" && <PhoneCall className="w-5 h-5" />}
                    {s.id === "autolavado" && <MapPin className="w-5 h-5" />}
                    {s.id === "jardineria" && <Calendar className="w-5 h-5" />}
                    {(s.id === "agua-potable" || s.id === "aceo") && <Calendar className="w-5 h-5" />}
                    {s.cta}
                  </button>
                </div>
              </div>
            </section>
          );
        })()}
      </main>
    </div>
  );
}
