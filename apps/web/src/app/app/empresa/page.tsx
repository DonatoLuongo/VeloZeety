"use client";

import { BRAND } from "@velocity/shared";
import { useState } from "react";
import {
  Building2,
  Truck,
  Package,
  Plus,
  BadgeCheck,
  ChevronRight,
  ChevronLeft,
  MapPin,
  Phone,
  FileText,
  Clock,
  Globe,
  Image as ImageIcon,
  LayoutDashboard,
  CreditCard,
  Receipt,
  Send,
} from "lucide-react";
import VerificationBadge from "@/components/VerificationBadge";


const STEPS = ["Datos básicos", "Contacto y legal", "Servicios", "Catálogo"] as const;

export default function MiEmpresaPage() {
  const [step, setStep] = useState(0);
  const [registrada, setRegistrada] = useState(false);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<"restaurante" | "tienda" | "comida_rapida" | "panaderia" | "farmacia" | "otro">("restaurante");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailEmpresa, setEmailEmpresa] = useState("");
  const [rif, setRif] = useState("");
  const [horarioAtencion, setHorarioAtencion] = useState("");
  const [sitioWeb, setSitioWeb] = useState("");
  const [delivery, setDelivery] = useState(true);
  const [catalogo, setCatalogo] = useState(true);
  const [productos, setProductos] = useState<{ id: string; nombre: string; precio: string; desc: string; categoria: string }[]>([
    { id: "1", nombre: "", precio: "", desc: "", categoria: "general" },
  ]);
  const verified = false;

  const addProducto = () => {
    setProductos((prev) => [...prev, { id: String(prev.length + 1), nombre: "", precio: "", desc: "", categoria: "general" }]);
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else setRegistrada(true);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  if (registrada) {
    return (
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-56px)] md:min-h-[calc(100vh-56px)]">
        {/* Columna izquierda: servicios / panel de control (solo en web) */}
        <aside className="md:w-72 md:min-h-full md:border-r md:border-slate-200 md:bg-slate-50/50 p-4 flex-shrink-0">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4 flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Panel de control
          </h2>
          <nav className="space-y-2">
            <button type="button" className="w-full rounded-xl border border-slate-200 p-4 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 transition text-left flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 text-sm">Métodos de pago</p>
                <p className="text-xs text-slate-500 mt-0.5">Pago móvil, transferencia, cuenta bancaria.</p>
              </div>
            </button>
            <button type="button" className="w-full rounded-xl border border-slate-200 p-4 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 transition text-left flex items-start gap-3">
              <Receipt className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 text-sm">Facturación</p>
                <p className="text-xs text-slate-500 mt-0.5">Facturas y control de ingresos.</p>
              </div>
            </button>
            <button type="button" className="w-full rounded-xl border border-slate-200 p-4 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 transition text-left flex items-start gap-3">
              <Send className="w-6 h-6 text-slate-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-800 text-sm">Envíos y delivery</p>
                <p className="text-xs text-slate-500 mt-0.5">Pedidos y estado de envíos.</p>
              </div>
            </button>
          </nav>
        </aside>

        {/* Columna derecha: datos de la empresa, contacto, catálogo */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Mi empresa</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Gestiona tu negocio. Dashboard, pagos, facturación y envíos.</p>

            <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] overflow-hidden shadow-sm mb-6 transition-colors">
              <div className="p-5 border-b border-slate-100 dark:border-[#2B3139] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                    <Building2 className="w-7 h-7 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-slate-800 dark:text-white">{nombre || "Mi negocio"}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{tipo.replace("_", " ")}</p>
                  </div>
                </div>
                {verified && <VerificationBadge role="emprendedor" type="standard" />}
              </div>
              {descripcion && (
                <div className="px-5 py-3 border-b border-slate-100">
                  <p className="text-sm text-slate-600">{descripcion}</p>
                </div>
              )}
              <div className="p-5 space-y-2 text-sm text-slate-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 flex-shrink-0 text-slate-400" /> {direccion || "—"}{ciudad ? `, ${ciudad}` : ""}</p>
                <p className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0 text-slate-400" /> {telefono || "—"}</p>
                {emailEmpresa && <p className="flex items-center gap-2"><span className="text-slate-400">Email</span> {emailEmpresa}</p>}
                {horarioAtencion && <p className="flex items-center gap-2"><Clock className="w-4 h-4 flex-shrink-0 text-slate-400" /> {horarioAtencion}</p>}
                {sitioWeb && <p className="flex items-center gap-2"><Globe className="w-4 h-4 flex-shrink-0 text-slate-400" /> {sitioWeb}</p>}
              </div>
              <div className="px-5 pb-5 flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  <Truck className="w-3.5 h-3.5" /> Delivery {delivery ? "activo" : "inactivo"}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                  <Package className="w-3.5 h-3.5" /> Catálogo {catalogo ? "activo" : "inactivo"}
                </span>
              </div>
            </div>

            {catalogo && productos.some((p) => p.nombre) && (
              <section>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">Catálogo / Menú</h2>
                <div className="space-y-3">
                  {productos.filter((p) => p.nombre).map((p) => (
                    <div key={p.id} className="bg-white dark:bg-[#1E2329] rounded-xl border border-slate-200 dark:border-[#2B3139] p-4 transition-colors">
                      <p className="font-medium text-slate-800 dark:text-white">{p.nombre}</p>
                      {p.desc && <p className="text-sm text-slate-500 dark:text-slate-400">{p.desc}</p>}
                      <p className="text-sm font-semibold mt-1" style={{ color: BRAND.colors.primary }}>${p.precio || "0"}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-6 text-sm text-slate-500">
              La insignia <strong>Verificado</strong> la asignan los administradores. Tu empresa será visible para clientes una vez revisada.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-900 dark:text-white font-semibold placeholder:text-slate-500 dark:placeholder:text-slate-400 bg-white dark:bg-[#1E2329]";
  const labelClass = "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5";
  const selectClass = "w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-800 dark:text-white font-semibold bg-white dark:bg-[#1E2329] appearance-none cursor-pointer";

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-6 transition-colors">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Registrar mi empresa</h1>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Completa los pasos para que tu negocio esté visible y los clientes puedan comprar y pedir delivery.
      </p>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[#0EA5E9]" : "bg-slate-200"}`}
            aria-hidden
          />
        ))}
      </div>
      <p className="text-sm font-medium text-slate-600 mb-6">{STEPS[step]}</p>

      <form onSubmit={handleNext} className="space-y-5">
        {step === 0 && (
          <>
            <div>
              <label className={labelClass}>Nombre de la empresa</label>
              <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej. Panadería Central" required className={inputClass} style={{ color: "#0f172a" }} />
            </div>
            <div>
              <label className={labelClass}>Tipo de negocio</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} className={selectClass}>
                <option value="restaurante" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Restaurante</option>
                <option value="tienda" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Tienda</option>
                <option value="comida_rapida" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Comida rápida</option>
                <option value="panaderia" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Panadería</option>
                <option value="farmacia" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Farmacia</option>
                <option value="otro" className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-medium">Otro</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Descripción (opcional)</label>
              <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} placeholder="Qué ofreces, especialidades..." rows={3} className={inputClass} />
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-2`}><ImageIcon className="w-4 h-4" /> Logo o imagen (próximamente)</label>
              <div className="w-full h-24 rounded-xl border-2 border-dashed border-slate-200 dark:border-[#2B3139] flex items-center justify-center text-slate-400 text-sm bg-slate-50 dark:bg-white/5 transition-colors">
                Subir imagen
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className={labelClass}>Dirección del local</label>
              <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Calle, número, referencia" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Ciudad / Zona</label>
              <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ej. Caracas, Centro" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Teléfono de contacto</label>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="+58 424 123 4567" required className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Correo de la empresa</label>
              <input type="email" value={emailEmpresa} onChange={(e) => setEmailEmpresa(e.target.value)} placeholder="contacto@tunegocio.com" className={inputClass} />
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-2`}><FileText className="w-4 h-4" /> RIF (opcional)</label>
              <input type="text" value={rif} onChange={(e) => setRif(e.target.value)} placeholder="J-40123456-7" className={inputClass} />
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-2`}><Clock className="w-4 h-4" /> Horario de atención</label>
              <input type="text" value={horarioAtencion} onChange={(e) => setHorarioAtencion(e.target.value)} placeholder="Ej. Lun-Sáb 8:00 - 20:00" className={inputClass} />
            </div>
            <div>
              <label className={`${labelClass} flex items-center gap-2`}><Globe className="w-4 h-4" /> Sitio web (opcional)</label>
              <input type="url" value={sitioWeb} onChange={(e) => setSitioWeb(e.target.value)} placeholder="https://..." className={inputClass} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Activa los servicios que ofreces. El pago por delivery se gestiona desde la app.</p>
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-[#2B3139] hover:border-[#F46E20]/30 dark:hover:border-[#F46E20]/30 cursor-pointer transition-colors bg-white dark:bg-[#1E2329]">
              <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 w-5 h-5 text-[#F46E20] focus:ring-[#F46E20]" />
              <Truck className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Ofrecer delivery</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Nuestra flota lleva los pedidos a tus clientes.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-xl border-2 border-slate-200 dark:border-[#2B3139] hover:border-[#F46E20]/30 dark:hover:border-[#F46E20]/30 cursor-pointer transition-colors bg-white dark:bg-[#1E2329]">
              <input type="checkbox" checked={catalogo} onChange={(e) => setCatalogo(e.target.checked)} className="rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 w-5 h-5 text-[#F46E20] focus:ring-[#F46E20]" />
              <Package className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              <div>
                <p className="font-medium text-slate-800 dark:text-white">Catálogo / menú</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Productos o platos que los clientes pueden ver y pedir.</p>
              </div>
            </label>
          </>
        )}

        {step === 3 && catalogo && (
          <>
            <p className="text-slate-600 dark:text-slate-400 text-sm">Añade productos o platos. Los clientes pagarán con su billetera y tú recibirás el pago (retiro desde 10 USD).</p>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Productos o platos</label>
              <button type="button" onClick={addProducto} className="text-sm font-medium flex items-center gap-1" style={{ color: BRAND.colors.primary }}>
                <Plus className="w-4 h-4" /> Añadir
              </button>
            </div>
            {productos.map((p, i) => (
              <div key={p.id} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-[#2B3139] space-y-2">
                <input type="text" placeholder="Nombre del producto o plato" value={p.nombre} onChange={(e) => setProductos((prev) => prev.map((x, j) => (j === i ? { ...x, nombre: e.target.value } : x)))} className={`${inputClass}`} />
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Precio (USD)" value={p.precio} onChange={(e) => setProductos((prev) => prev.map((x, j) => (j === i ? { ...x, precio: e.target.value } : x)))} className={`${inputClass}`} />
                  <input type="text" placeholder="Categoría" value={p.categoria} onChange={(e) => setProductos((prev) => prev.map((x, j) => (j === i ? { ...x, categoria: e.target.value } : x)))} className={`${inputClass}`} />
                </div>
                <input type="text" placeholder="Descripción breve" value={p.desc} onChange={(e) => setProductos((prev) => prev.map((x, j) => (j === i ? { ...x, desc: e.target.value } : x)))} className={`${inputClass}`} />
              </div>
            ))}
          </>
        )}

        <div className="flex gap-3 pt-4">
          {step > 0 && (
            <button type="button" onClick={handleBack} className="px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Atrás
            </button>
          )}
          <button type="submit" className="flex-1 py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition shadow-lg" style={{ backgroundColor: BRAND.colors.primary }}>
            {step < STEPS.length - 1 ? "Siguiente" : "Registrar empresa"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
        Tras la revisión, los administradores pueden asignar la insignia <strong className="dark:text-white">Verificado</strong>. Los pagos se depositan en tu wallet; retiro desde 10 USD por pago móvil o transferencia.
      </p>
    </div>
  );
}
