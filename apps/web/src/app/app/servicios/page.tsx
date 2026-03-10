"use client";
// Force rebuild: Synchronize UI with latest Premium features

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
  Bus,
  CheckCircle2,
  Truck,
  Car,
  Bike,
  Sparkles,
  Star,
  Info,
  Store
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LocationIconOrange from "@/components/LocationIconOrange";

const CARRITO_KEY = "velocity_carrito_guardado";

const SERVICIOS_PREMIUM = [
  {
    id: "transporte-educativo",
    title: "Transporte Educativo",
    short: "Rutas escolares verificadas y seguras para tus hijos",
    Icon: Bus,
    tag: "Próximamente" as const,
    detail: "Servicio de transporte escolar con conductores verificados, unidades rastreadas por GPS en tiempo real y comunicación directa con los padres. Rutas fijas o personalizadas desde tu hogar hasta el colegio. Incluye seguro de pasajeros, cinturones de seguridad y aire acondicionado. Monitoreo en vivo desde la app para que los padres sepan exactamente dónde están sus hijos. Disponible para jardines de infancia, primaria y secundaria.",
    pricing: "Próximamente. Desde 40 USD/mes por ruta fija. Rutas personalizadas según distancia.",
    cta: "Solicitar pre-registro",
  },
  {
    id: "agua-potable",
    title: "Camión del agua potable",
    short: "Botellones a tu urbanización con horario establecido",
    Icon: Droplets,
    tag: "Próximamente" as const,
    detail: "Servicio de entrega de agua potable a domicilio en urbanizaciones, con horario fijo y flota verificada. Solicita desde la app la cantidad de botellones que necesites (1, 2, 3 o más); el camión pasa en la franja acordada. Pago mensual dentro de la aplicación: sin salir a la calle ni cargar bajo el sol. Incluye personal uniformado y estándares de calidad. Ideal para hogares y comunidades. Precio desde 15 USD/mes según plan y zona.",
    pricing: "Próximamente. Desde 15 USD/mes. Recargas según plan.",
    cta: "Solicitar pre-registro",
  },
  {
    id: "autolavado",
    title: "Autolavado Premium",
    short: "Lavado de vehículos en nuestro local",
    Icon: Sparkles,
    tag: "Nuevo" as const,
    detail: "Lavado profesional de motos y carros en las instalaciones VeloCity. Servicio exclusivo para particulares y flotas, con descuentos por plan. Incluye productos de alta gama (cera de carnauba, shampoo neutro) y atención rápida con sala de espera VIP.",
    pricing: "Motos desde $5 | Carros desde $8 | 4x4 desde $12",
    cta: "Reservar Cita de Lavado",
  },
  {
    id: "grua",
    title: "Servicio de Grúa 24/7",
    short: "Asistencia vial y remolque para todo tipo de vehículos",
    Icon: Truck,
    tag: "Nuevo" as const,
    detail: "Servicio de grúa profesional disponible las 24 horas del día. Contamos con grúas de plataforma y de gancho para motos, carros, camionetas y vehículos de carga pesada. Tiempo de respuesta optimizado según tu ubicación GPS. Personal capacitado para maniobras delicadas y traslados seguros.",
    pricing: "Desde 30 USD según distancia y tipo de vehículo.",
    cta: "Solicitar grúa ahora",
  },
];

const PRODUCTOS_TIENDA = [
  { id: "1", name: "Casco integral premium", desc: "Alta calidad, certificación DOT. Diseño VeloCity.", price: 89.99, off: 15, categoria: "motos" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "2", name: "Espejo retrovisor deportivo", desc: "Para motos y carros.", price: 24.99, off: 0, categoria: "todos" as const, tienda: { nombre: "Repuestos Goyo", oficial: false } },
  { id: "3", name: "Funda de asiento impermeable", desc: "Protección para moto y carro. Varios colores.", price: 34.99, off: 10, categoria: "todos" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "4", name: "Portaequipaje moto", desc: "Soporte trasero resistente. Fácil instalación.", price: 45.99, off: 0, categoria: "motos" as const, tienda: { nombre: "Bikers VIP", oficial: false } },
  { id: "5", name: "Kit de herramientas compacto", desc: "Llaves, destornilladores y más. Estuche rígido.", price: 29.99, off: 20, categoria: "todos" as const, tienda: { nombre: "FerreMotor", oficial: false } },
  { id: "6", name: "Cubre volante deportivo", desc: "Cuero sintético. Mejor agarre y estilo.", price: 19.99, off: 0, categoria: "carros" as const, tienda: { nombre: "AutoEstilo Center", oficial: false } },
  { id: "7", name: "Organizador para maletero", desc: "Cajas y redes. Mantén el orden en el carro.", price: 39.99, off: 5, categoria: "carros" as const, tienda: { nombre: "AutoEstilo Center", oficial: false } },
  { id: "8", name: "Guantes de moto todo tiempo", desc: "Protección y comodidad. Tallas S a XXL.", price: 42.99, off: 0, categoria: "motos" as const, tienda: { nombre: "Bikers VIP", oficial: false } },
  { id: "9", name: "Cargador dual USB para auto", desc: "12V. Incluye indicador LED.", price: 14.99, off: 15, categoria: "carros" as const, tienda: { nombre: "Repuestos Goyo", oficial: false } },
  { id: "10", name: "Chaqueta reflectante VeloCity", desc: "Alta visibilidad. Tallas disponibles.", price: 59.99, off: 10, categoria: "motos" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "11", name: "Cable de remolque pesado", desc: "Para camión tipo NPR y cargas. Alta resistencia.", price: 49.99, off: 0, categoria: "camiones" as const, tienda: { nombre: "FerreMotor", oficial: false } },
  { id: "12", name: "Lona de carga reforzada", desc: "Cubierta para caja de camión. Impermeable.", price: 79.99, off: 10, categoria: "camiones" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "13", name: "Eslingas y correas de amarre", desc: "Juego 4 piezas. Para flete y mudanza.", price: 34.99, off: 0, categoria: "camiones" as const, tienda: { nombre: "FerreMotor", oficial: false } },
  { id: "14", name: "Luz trasera LED para caja", desc: "Instalación en camión de carga. Antigüedad.", price: 28.99, off: 5, categoria: "camiones" as const, tienda: { nombre: "Repuestos Goyo", oficial: false } },
  { id: "15", name: "Retrovisor ampliado camión", desc: "Campo de visión amplio. Montaje lateral.", price: 42.99, off: 0, categoria: "camiones" as const, tienda: { nombre: "Repuestos Goyo", oficial: false } },
  { id: "16", name: "Barra de tiro y enganche", desc: "Para remolques. Uso en pickup y camión.", price: 95.99, off: 0, categoria: "camiones" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "17", name: "Soportes para botellón agua", desc: "Portabotellones para cabina. 2 unidades.", price: 18.99, off: 0, categoria: "camiones" as const, tienda: { nombre: "Centro 4x4 y Camiones", oficial: false } },
  { id: "18", name: "Sistema de sujeción carga", desc: "Rieles y anclajes para caja tipo NPR.", price: 68.99, off: 8, categoria: "camiones" as const, tienda: { nombre: "Centro 4x4 y Camiones", oficial: false } },
  { id: "19", name: "Cubierta todoterreno 4x4", desc: "Neumático todo terreno. Varias medidas.", price: 129.99, off: 12, categoria: "4x4" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "20", name: "Winche eléctrico 4x4", desc: "Para recuperación y remolque. 2500 kg.", price: 189.99, off: 0, categoria: "4x4" as const, tienda: { nombre: "Centro 4x4 y Camiones", oficial: false } },
  { id: "21", name: "Barra portaequipaje techo", desc: "Barras de techo para pickup y 4x4.", price: 89.99, off: 5, categoria: "4x4" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "22", name: "Protector de cárter", desc: "Protección inferior para motor 4x4.", price: 74.99, off: 0, categoria: "4x4" as const, tienda: { nombre: "Centro 4x4 y Camiones", oficial: false } },
  { id: "23", name: "Kit rescate y tracción", desc: "Palas, cables y accesorios emergencia.", price: 55.99, off: 10, categoria: "4x4" as const, tienda: { nombre: "Tienda VeloCity", oficial: true } },
  { id: "24", name: "Faro auxiliar LED", desc: "Luz adicional para camión o pickup.", price: 38.99, off: 0, categoria: "todos" as const, tienda: { nombre: "Repuestos Goyo", oficial: false } },
];

const POR_PAGINA = 4;
const CATEGORIAS_TIENDA = ["todos", "motos", "carros", "camiones", "4x4"] as const;

type ProductItem = (typeof PRODUCTOS_TIENDA)[number];

/* Mocks para Autolavado */
const VEHICULOS_USUARIO = [
  { id: "v1", tipo: "carro" as const, marca: "Toyota Yaris", placa: "AD345FG", color: "Gris" },
  { id: "v2", tipo: "moto" as const, marca: "Honda XR 150", placa: "AA11BB", color: "Rojo" },
];

const PAQUETES_LAVADO = {
  moto: [
    { id: "m_basico", nombre: "Lavado Básico", desc: "Agua, shampoo y secado rápido", precio: 5 },
    { id: "m_premium", nombre: "Lavado Premium", desc: "Incluye desengrasante, cera y silicón", precio: 8 },
  ],
  carro: [
    { id: "c_basico", nombre: "Lavado Básico", desc: "Carrocería, aspirado simple", precio: 8 },
    { id: "c_completo", nombre: "Lavado Completo", desc: "Aspirado profundo, tablero, encerado", precio: 12 },
    { id: "c_vip", nombre: "Lavado VIP", desc: "Completo + lavado de motor y chasis", precio: 20 },
  ],
  "4x4": [
    { id: "x_basico", nombre: "Lavado Básico", desc: "Carrocería, aspirado simple", precio: 12 },
    { id: "x_completo", nombre: "Lavado Completo", desc: "Especial para barro, aspirado, encerado", precio: 18 },
    { id: "x_vip", nombre: "Lavado VIP", desc: "Completo + lavado de chasis y motor 4x4", precio: 30 },
  ],
};

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl overflow-y-auto transition-all animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-velocity-surface rounded-2xl md:rounded-[2rem] shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 dark:border-white/10 my-4 max-h-[90vh] flex flex-col transition-all active:scale-[0.99]" onClick={(e) => e.stopPropagation()}>
        <div className="h-40 bg-gradient-to-br from-slate-800 to-slate-900 border-b border-white/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <LocationIconOrange size={64} />
          
          {productoInicial.tienda?.oficial !== false && (
            <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
               <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
               <span className="text-[11px] font-bold text-white uppercase tracking-wider">Tienda Oficial Certificada</span>
            </div>
          )}
        </div>
        <div className="p-6 md:p-8 -mt-12 relative overflow-y-auto flex-1 bg-white dark:bg-velocity-surface sm:rounded-tl-2xl sm:rounded-tr-2xl">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 mb-6">
            <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-[#1E2329] bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform hover:scale-105 z-10 relative mt-[-2rem] sm:mt-0">
              {productoInicial.tienda?.oficial !== false ? <LocationIconOrange size={40} /> : <Store className="w-10 h-10 text-slate-400" />}
            </div>
            <div className="flex-1 min-w-0 pb-1">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-2xl leading-tight mb-1">{productoInicial.tienda?.nombre || "Tienda VeloCity"}</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{productoInicial.tienda?.oficial !== false ? "Departamento de Accesorios y Repuestos" : "Vendedor Independiente"}</p>
            </div>
            <div className="sm:ml-auto">
               <span className="inline-flex items-center gap-1.5 text-slate-700 dark:text-slate-300 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                 {productoInicial.tienda?.oficial !== false ? (
                   <><BadgeCheck className="w-4 h-4 text-emerald-500" /> Verificado Premium</>
                 ) : (
                   <><Store className="w-4 h-4 text-slate-400" /> Tienda Local</>
                 )}
               </span>
            </div>
          </div>

          <p className="text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed mb-6 border-l-4 border-slate-200 dark:border-slate-700 pl-4">{NEGOCIO_TIENDA.descripcion}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center shrink-0">
                 <MapPin className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Dirección</p>
                 <p className="text-[13px] text-slate-800 dark:text-slate-200 font-medium">{NEGOCIO_TIENDA.direccion}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
              <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center shrink-0">
                 <Clock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              </div>
              <div>
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Horario de Atención</p>
                 <p className="text-[13px] text-slate-800 dark:text-slate-200 font-medium">{NEGOCIO_TIENDA.horario}</p>
              </div>
            </div>
          </div>

          {/* Checkout Action Area (More Enterprise) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 mb-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4 border-b border-slate-100 dark:border-slate-700 pb-5">
              <div className="flex-1">
                <p className="inline-block px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-300 uppercase tracking-widest mb-2">Detalles del Artículo</p>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-xl leading-tight mb-1">{productoInicial.name}</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700/50">
                    <Info className="w-4 h-4 inline-block mr-1.5 -mt-0.5 text-slate-400"/>
                    {productoInicial.desc}
                </p>
              </div>
              <div className="sm:text-right shrink-0">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Precio Unitario</p>
                <p className="text-3xl font-black" style={{ color: BRAND.colors.primary }}>${productoInicial.price.toFixed(2)}</p>
                {productoInicial.off ? (
                   <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold rounded border border-green-200 dark:border-green-500/30">
                     Ahorras {productoInicial.off}%
                   </span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center bg-slate-50 dark:bg-slate-900 rounded-xl p-1.5 shadow-inner border border-slate-200 dark:border-slate-700 w-full sm:w-auto">
                <button type="button" onClick={() => setCantidad((q) => Math.max(1, q - 1))} className="w-12 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-transparent shadow-sm hover:border-slate-200 dark:hover:border-slate-600">
                   <Minus className="w-4 h-4"/>
                </button>
                <div className="w-16 flex flex-col items-center justify-center border-l border-r border-slate-200 dark:border-slate-700 mx-1">
                   <span className="text-[10px] font-bold text-slate-400 uppercase">Cant</span>
                   <span className="font-black text-slate-900 dark:text-white">{cantidad}</span>
                </div>
                <button type="button" onClick={() => setCantidad((q) => q + 1)} className="w-12 h-10 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-lg transition-all border border-transparent shadow-sm hover:border-slate-200 dark:hover:border-slate-600">
                   <Plus className="w-4 h-4"/>
                </button>
              </div>
              
              <button
                type="button"
                onClick={addToCart}
                className="flex-1 w-full py-4 rounded-xl font-bold text-[15px] text-white shadow-[0_8px_16px_-4px_rgba(244,110,32,0.3)] transition-all active:scale-[0.98] hover:opacity-90 flex items-center justify-center gap-2"
                style={{ backgroundColor: BRAND.colors.primary }}
              >
                <ShoppingCart className="w-5 h-5"/>
                Añadir al Pedido Actual
              </button>
            </div>
          </div>

          {carrito.length > 0 && (
            <div className="mb-6 animate-slide-up-soft">
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <ShoppingCart className="w-3.5 h-3.5" /> Tu pedido ({carrito.length})
              </p>
              <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                {carrito.map((item, i) => (
                  <div key={i} className="flex justify-between text-xs font-medium">
                    <span className="text-slate-600 dark:text-slate-300">{item.product.name} <span className="text-slate-400">×{item.qty}</span></span>
                    <span className="text-slate-900 dark:text-white">${(item.product.price * item.qty).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Total Carrito</span>
                <span className="text-lg font-black" style={{ color: BRAND.colors.primary }}>${total.toFixed(2)}</span>
              </div>
              <button type="button" onClick={() => persistCarrito([])} className="mt-4 w-full py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 transition-all">Vaciar pedido actual</button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="flex-1 py-3.5 rounded-xl font-black text-slate-900 bg-emerald-400 hover:bg-emerald-300 border border-emerald-500 border-b-4 flex items-center justify-center gap-2 text-[15px] shadow-sm transition-all active:translate-y-1 active:border-b-0 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={carrito.length === 0}
              onClick={() => {
                 onClose();
                 // Optionally router.push('/app/billetera') 
              }}
            >
              <Wallet className="w-5 h-5" />
              {carrito.length > 0 ? `Pagar Orden ($${total.toFixed(2)})` : "Carrito Vacío"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type PanelVista = "tienda" | (typeof SERVICIOS_PREMIUM)[number]["id"];

export default function ServiciosPage() {
  const router = useRouter();
  const [panelVista, setPanelVista] = useState<PanelVista>("tienda");
  const [filter, setFilter] = useState<typeof CATEGORIAS_TIENDA[number]>("todos");
  const [pagina, setPagina] = useState(1);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductItem | null>(null);
  const [searchTienda, setSearchTienda] = useState("");
  const [carrito, setCarrito] = useState<{ product: ProductItem; qty: number }[]>([]);
  const [showSubscription, setShowSubscription] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [aguaQuantityType, setAguaQuantityType] = useState("2");
  const [aguaQuantityCustom, setAguaQuantityCustom] = useState("");

  /* Estados para Autolavado */
  const [lavadoVehiculoId, setLavadoVehiculoId] = useState<string>("v1");
  const [lavadoTipoManual, setLavadoTipoManual] = useState<"moto" | "carro" | "4x4">("carro");
  const [lavadoPaqueteId, setLavadoPaqueteId] = useState<string>("");
  const [lavadoFecha, setLavadoFecha] = useState<string>("");
  const [lavadoHora, setLavadoHora] = useState<string>("09:00");

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
      <div className="md:w-[340px] md:flex-shrink-0 md:border-r md:border-slate-200 dark:border-white/5 md:bg-slate-50/50 dark:bg-velocity-bg p-4 md:p-5">
        <h1 className="text-xl md:text-lg font-bold text-slate-800 dark:text-white mb-1">Servicios</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 md:mb-5">Servicios premium y tienda. Pago con billetera VeloCity.</p>
        <h2 className="text-base font-bold mb-3 text-slate-700 dark:text-slate-300">
          Panel de control
        </h2>
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setPanelVista("tienda")}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${panelVista === "tienda" ? "border-[#0EA5E9] bg-sky-50/80 dark:bg-[#0EA5E9]/10 shadow-sm" : "border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 dark:hover:bg-white/5"
              }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10">
              <ShoppingBag className="w-6 h-6 text-slate-600 dark:text-slate-300" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 dark:text-white text-sm">Tienda de accesorios</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Productos, carrito y pago con wallet</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </button>
          {SERVICIOS_PREMIUM.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setPanelVista(s.id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${panelVista === s.id ? "border-[#0EA5E9] bg-sky-50/80 dark:bg-[#0EA5E9]/10 shadow-sm" : "border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 dark:hover:bg-white/5"
                }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10">
                <s.Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-slate-800 dark:text-white text-sm">{s.title}</p>
                  {s.tag === "Nuevo" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                      Nuevo
                    </span>
                  )}
                  {s.tag === "Próximamente" && (
                    <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                      Próximamente
                    </span>
                  )}
                  {String(s.tag) === "Aproximadamente" && (
                    <span className="flex items-center gap-1 text-[10px] bg-sky-50 dark:bg-sky-500/10 text-[#0EA5E9] dark:text-sky-400 px-2 py-0.5 rounded-full font-bold border border-sky-100 dark:border-sky-500/20">
                      <Clock className="w-3 h-3" /> {s.tag}
                    </span>
                  )}
                  {String(s.tag) === "Futuro servicio" && (
                    <span className="flex items-center gap-1 text-[10px] bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold border border-slate-200 dark:border-white/10">
                      <Star className="w-3 h-3" /> {s.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{s.short}</p>
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
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mb-2">Tienda de accesorios</h2>
            <p className="text-slate-500 dark:text-slate-400 text-base mb-2">
              Pago con tu billetera VeloCity. El monto se descuenta de tu saldo al confirmar.
            </p>
            <p className="text-xs text-amber-700/80 dark:text-amber-400 mb-4 rounded-lg bg-amber-50/80 dark:bg-amber-500/10 px-3 py-1.5 border border-amber-100 dark:border-amber-500/20 inline-block">Tasa BCV de referencia para tus pagos.</p>

            <div className="mb-5">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
                <input
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchTienda}
                  onChange={(e) => { setSearchTienda(e.target.value); setPagina(1); }}
                  className="w-full pl-12 pr-5 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-slate-800 dark:text-white text-base placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-white/20 focus:border-slate-300 dark:focus:border-white/20 transition-colors"
                  aria-label="Buscar en la tienda"
                />
              </div>
            </div>

            {carrito.length > 0 && (
              <Link
                href="/app/perfil/carritos"
                className="mb-4 flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-500/20 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-slate-800 dark:text-white text-base leading-tight">Carrito guardado</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-normal">{carrito.length} producto(s) · Ver y pagar</p>
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
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all ${filter === f ? "text-white shadow-md scale-[1.02]" : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20 active:scale-95"
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
                      <div key={p.id} className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 flex gap-5 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-500 transition-all">
                        <div className="w-20 h-20 rounded-xl bg-slate-100 dark:bg-[#1A1F27] border border-transparent dark:border-[#2B3139] flex items-center justify-center flex-shrink-0 transition-colors">
                          <ShoppingBag className="w-10 h-10 text-slate-500 dark:text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1.5 text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                             {p.tienda?.oficial !== false ? <BadgeCheck className="w-3.5 h-3.5 text-emerald-500" /> : <Store className="w-3.5 h-3.5 text-slate-400" />}
                             <span className="truncate">{p.tienda?.nombre || "Tienda VeloCity"}</span>
                          </div>
                          <p className="font-semibold text-slate-800 dark:text-white text-base leading-tight">{p.name}</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">{p.desc}</p>
                          <p className="text-lg font-bold mt-2.5 flex items-center gap-2" style={{ color: BRAND.colors.primary }}>
                            ${p.price.toFixed(2)}
                            {p.off > 0 && <span className="text-green-600 dark:text-green-400 text-sm font-normal px-2 py-0.5 rounded bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20">{p.off}% OFF</span>}
                          </p>
                          <button
                            type="button"
                            onClick={() => setProductoSeleccionado(p)}
                            className="mt-4 w-full sm:w-auto px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
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
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
                        aria-label="Página anterior"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex items-center gap-1.5 px-2">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setPagina(n)}
                            className={`min-w-[2.5rem] py-2 px-2 rounded-xl text-sm font-semibold transition-all ${pagina === n ? "text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
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
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-white/10 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300 transition-colors"
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
              <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm">
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-5 mb-5">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-100 dark:bg-white/10 flex-shrink-0">
                      <s.Icon className="w-8 h-8 text-slate-600 dark:text-slate-300" strokeWidth={2} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{s.title}</h2>
                      {s.tag && (
                        <span className={`inline-block mt-1 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded ${
                          String(s.tag) === "Nuevo" ? "bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30" :
                          String(s.tag) === "Próximamente" ? "bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30" :
                          String(s.tag) === "Aproximadamente" ? "bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30" :
                            "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-500/30"
                          }`}>
                          {String(s.tag) === "Futuro servicio" ? "Aprox. / Futuro servicio" : s.tag}
                        </span>
                      )}
                      <p className="text-slate-500 dark:text-slate-400 mt-2">{s.short}</p>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-4">{s.detail}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-6">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {s.pricing}
                  </p>
                    <button
                      type="button"
                      onClick={() => setShowSubscription(s.id)}
                      className="w-full py-3 rounded-xl font-medium text-white flex items-center justify-center gap-2 text-base"
                      style={{ backgroundColor: BRAND.colors.primary }}
                    >
                      {s.id === "transporte-educativo" && <Bus className="w-5 h-5" />}
                      {s.id === "autolavado" && <MapPin className="w-5 h-5" />}
                      {(s.id === "agua-potable") && <Calendar className="w-5 h-5" />}
                      {s.cta}
                    </button>
                </div>
              </div>

              {/* Modal de Suscripción / Registro */}
              {showSubscription === s.id && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowSubscription(null)}>
                  <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-6 md:p-8 max-w-xl w-full shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Suscribirse a {s.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">{s.pricing}</p>

                    <div className="space-y-4 mb-6">
                      {/* Campos comunes */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nombre completo</label>
                        <input type="text" placeholder="Tu nombre" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Teléfono de contacto</label>
                        <input type="tel" placeholder="04141234567" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                      </div>

                      {/* Campos específicos por servicio */}
                      {s.id === "transporte-educativo" && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Nombre del estudiante</label>
                            <input type="text" placeholder="Nombre del niño/a" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Colegio / Institución</label>
                            <input type="text" placeholder="Nombre del colegio" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dirección de recogida</label>
                            <input type="text" placeholder="Av. Principal, Urbanización..." className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Grado / Nivel</label>
                            <select className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100">
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="">Selecciona</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="jardin">Jardín de infancia</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="primaria">Primaria</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="secundaria">Secundaria</option>
                            </select>
                          </div>
                        </>
                      )}

                      {s.id === "agua-potable" && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Dirección de entrega</label>
                            <input type="text" placeholder="Urbanización, calle, casa/apto" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Cantidad de botellones/mes</label>
                            <select
                              value={aguaQuantityType}
                              onChange={(e) => setAguaQuantityType(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 mb-2"
                            >
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="2">2 botellones</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="4">4 botellones</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="6">6 botellones</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="8">8 botellones</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="custom">Más (especificar)</option>
                            </select>
                            {aguaQuantityType === "custom" && (
                              <input
                                type="number"
                                value={aguaQuantityCustom}
                                onChange={(e) => setAguaQuantityCustom(e.target.value)}
                                placeholder="Indica la cantidad"
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20"
                              />
                            )}
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Horario preferido</label>
                            <select className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100">
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="manana">Mañana (8:00 - 12:00)</option>
                              <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white" value="tarde">Tarde (12:00 - 17:00)</option>
                            </select>
                          </div>
                        </>
                      )}

                      {s.id === "autolavado" && (() => {
                        const esManual = lavadoVehiculoId === "manual";
                        const vehiculoSeleccionado = VEHICULOS_USUARIO.find(v => v.id === lavadoVehiculoId);
                        const tipoParaPaquetes = esManual ? lavadoTipoManual : (vehiculoSeleccionado?.tipo || "carro");
                        const paquetes = PAQUETES_LAVADO[tipoParaPaquetes as keyof typeof PAQUETES_LAVADO] || PAQUETES_LAVADO.carro;

                        // Auto-seleccionar primer paquete si cambia el tipo
                        if (!paquetes.find(p => p.id === lavadoPaqueteId)) {
                           if (paquetes.length > 0 && lavadoPaqueteId !== paquetes[0].id) {
                               setTimeout(() => setLavadoPaqueteId(paquetes[0].id), 0);
                           }
                        }

                        const paqueteSeleccionado = paquetes.find(p => p.id === lavadoPaqueteId) || paquetes[0];

                        return (
                        <>
                          <div>
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Car className="w-4 h-4" /> Selecciona tu Vehículo
                            </label>
                            <div className="grid grid-cols-1 gap-2 mb-4">
                              {VEHICULOS_USUARIO.map(v => (
                                <div
                                  key={v.id}
                                  onClick={() => setLavadoVehiculoId(v.id)}
                                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${lavadoVehiculoId === v.id ? 'border-[#F46E20] bg-[#F46E20]/5' : 'border-slate-200 dark:border-white/10 hover:border-[#F46E20]/50 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                >
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lavadoVehiculoId === v.id ? 'bg-[#F46E20]/20 text-[#F46E20]' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                    {v.tipo === 'moto' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-800 dark:text-white text-sm">{v.marca}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{v.placa} • {v.color}</p>
                                  </div>
                                  <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${lavadoVehiculoId === v.id ? 'border-[#F46E20]' : 'border-slate-300 dark:border-slate-600'}`}>
                                    {lavadoVehiculoId === v.id && <div className="w-2 h-2 rounded-full bg-[#F46E20]" />}
                                  </div>
                                </div>
                              ))}

                              <div
                                onClick={() => setLavadoVehiculoId("manual")}
                                className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${lavadoVehiculoId === "manual" ? 'border-[#F46E20] bg-[#F46E20]/5' : 'border-slate-200 dark:border-white/10 hover:border-[#F46E20]/50 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                              >
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${lavadoVehiculoId === "manual" ? 'bg-[#F46E20]/20 text-[#F46E20]' : 'bg-slate-100 dark:bg-white/10 text-slate-500'}`}>
                                  <Plus className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-800 dark:text-white text-sm">Otro vehículo</p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Ingresar manualmente</p>
                                </div>
                                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${lavadoVehiculoId === "manual" ? 'border-[#F46E20]' : 'border-slate-300 dark:border-slate-600'}`}>
                                  {lavadoVehiculoId === "manual" && <div className="w-2 h-2 rounded-full bg-[#F46E20]" />}
                                </div>
                              </div>
                            </div>
                          </div>

                          {esManual && (
                            <div className="grid grid-cols-2 gap-3 mb-5 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 animate-fade-in-up">
                              <div className="col-span-2">
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tipo de vehículo</label>
                                <select
                                  value={lavadoTipoManual}
                                  onChange={(e) => setLavadoTipoManual(e.target.value as any)}
                                  className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20]"
                                >
                                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="moto">Moto</option>
                                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="carro">Carro Sedán / Hatchback</option>
                                  <option className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100" value="4x4">Camioneta / 4x4</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Placa</label>
                                <input type="text" placeholder="ABC-123" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20]" />
                              </div>
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Marca/Modelo</label>
                                <input type="text" placeholder="Ej: Aveo" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20]" />
                              </div>
                            </div>
                          )}

                          <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                              <Sparkles className="w-4 h-4" /> Paquete de Lavado
                            </label>
                            <div className="space-y-2">
                              {paquetes.map(p => (
                                <div
                                  key={p.id}
                                  onClick={() => setLavadoPaqueteId(p.id)}
                                  className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${lavadoPaqueteId === p.id ? 'border-sky-500 bg-sky-50 dark:bg-sky-500/10' : 'border-slate-200 dark:border-white/10 hover:border-sky-300'}`}
                                >
                                  <div>
                                    <p className={`font-bold text-sm ${lavadoPaqueteId === p.id ? 'text-sky-700 dark:text-sky-400' : 'text-slate-800 dark:text-white'}`}>{p.nombre}</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className={`font-black text-lg ${lavadoPaqueteId === p.id ? 'text-sky-700 dark:text-sky-400' : 'text-slate-800 dark:text-white'}`}>${p.precio}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 mb-2">
                            <div>
                              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Fecha
                              </label>
                              <input
                                type="date"
                                value={lavadoFecha}
                                onChange={(e) => setLavadoFecha(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20]"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4" /> Hora (Aprox)
                              </label>
                              <select
                                value={lavadoHora}
                                onChange={(e) => setLavadoHora(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20]"
                              >
                                <option value="08:00">08:00 AM</option>
                                <option value="09:00">09:00 AM</option>
                                <option value="10:00">10:00 AM</option>
                                <option value="11:00">11:00 AM</option>
                                <option value="13:00">01:00 PM</option>
                                <option value="14:00">02:00 PM</option>
                                <option value="15:00">03:00 PM</option>
                                <option value="16:00">04:00 PM</option>
                              </select>
                            </div>
                          </div>

                          {paqueteSeleccionado && (
                            <div className="mt-4 p-4 rounded-xl bg-[#F46E20]/10 border border-[#F46E20]/20 flex justify-between items-center">
                              <div>
                                <p className="text-xs font-bold text-[#F46E20] uppercase tracking-wide">Total a Pagar</p>
                                <p className="text-[10px] text-[#F46E20]/80">Pago en local o Billetera</p>
                              </div>
                              <p className="text-2xl font-black text-[#F46E20]">${paqueteSeleccionado.precio.toFixed(2)}</p>
                            </div>
                          )}
                        </>
                      )})()}

                      {s.id === "grua" && (
                        <>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Tipo de vehículo a remolcar</label>
                            <select className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100">
                              <option value="moto">Moto</option>
                              <option value="carro">Carro sedán / Hatchback</option>
                              <option value="camioneta">Camioneta / SUV / 4x4</option>
                              <option value="pesado">Camión / Carga pesada</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Ubicación exacta de la falla</label>
                            <input type="text" placeholder="Ej: Autopista Prados del Este, salida Concresa" className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-sky-500/20" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Motivo del servicio</label>
                            <select className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-sm text-slate-800 dark:text-slate-100">
                              <option value="accidente">Accidente</option>
                              <option value="falla-mecanica">Falla mecánica</option>
                              <option value="neumatico">Neumático / Caucho</option>
                              <option value="bateria">Bateria / Eléctrico</option>
                              <option value="otro">Otro</option>
                            </select>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowSubscription(null)}
                        className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-white/5 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowSubscription(null);
                          setSubscribed((prev) => ({ ...prev, [s.id]: true }));
                        }}
                        className="flex-1 py-3 rounded-xl font-medium text-white text-sm transition hover:opacity-90"
                        style={{ backgroundColor: BRAND.colors.primary }}
                      >
                        Confirmar suscripción
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmación de suscripción */}
              {subscribed[s.id] && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">¡Suscripción registrada! Un asesor de VeloZeety se comunicará contigo pronto.</p>
                </div>
              )}
            </section>
          );
        })()}
      </main>
    </div>
  );
}

