"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  History,
  Car,
  Settings,
  HelpCircle,
  ChevronRight,
  Star,
  Building2,
  Bike,
  BadgeCheck,
  LogOut,
  Heart,
  Users,
  MapPin,
  ShoppingCart,
  CreditCard,
} from "lucide-react";
import CarritosPanel from "@/components/perfil/CarritosPanel";
import FavoritosPanel from "@/components/perfil/FavoritosPanel";
import ReferidosPanel from "@/components/perfil/ReferidosPanel";
import HistorialPanel from "@/components/perfil/HistorialPanel";
import VehiculosPanel from "@/components/perfil/VehiculosPanel";
import ConfiguracionPanel from "@/components/perfil/ConfiguracionPanel";
import AyudaPanel from "@/components/perfil/AyudaPanel";
import MetodosPagoPanel from "@/components/perfil/MetodosPagoPanel";

type Rol = "cliente" | "conductor" | "emprendedor";

type SectionId = "inicio" | "carritos" | "favoritos" | "referidos" | "historial" | "vehiculos" | "configuracion" | "ayuda" | "metodos-pago";

export default function PerfilPage() {
  const router = useRouter();
  const [rol, setRol] = useState<Rol>("cliente");
  const [nombre, setNombre] = useState("Juan Pérez");
  const [email, setEmail] = useState("cliente@velocity.com");
  const [telefono, setTelefono] = useState("+58 424 123 4567");
  const [selectedSection, setSelectedSection] = useState<SectionId>("inicio");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("velocity_user");
      if (raw) {
        const data = JSON.parse(raw);
        if (data.rol) setRol(data.rol);
        if (data.fullName) setNombre(data.fullName);
        if (data.email) setEmail(data.email);
        if (data.phone) setTelefono(data.phone);
      }
    } catch (_) { }
  }, []);

  const rolLabel = rol === "conductor" ? "Conductor" : rol === "emprendedor" ? "Emprendedor" : "Cliente";
  const RolIcon = rol === "conductor" ? Bike : rol === "emprendedor" ? Building2 : User;

  const menuItems: { id: SectionId; href: string; Icon: typeof User; title: string; desc: string }[] = [
    { id: "carritos", href: "/app/perfil/carritos", Icon: ShoppingCart, title: "Carritos guardados", desc: "Tienda VeloCity · Productos guardados, elige y paga" },
    { id: "favoritos", href: "/app/perfil/favoritos", Icon: Heart, title: "Favorito", desc: "Conductores guardados como favoritos" },
    { id: "referidos", href: "/app/perfil/referidos", Icon: Users, title: "Referidos", desc: "Invita amigos y gana USD en tu wallet" },
    { id: "historial", href: "/app/perfil/historial", Icon: History, title: "Historial de viajes", desc: "Ver todos tus viajes" },
    ...((rol === "cliente" || rol === "conductor") ? [{ id: "vehiculos" as SectionId, href: "/app/perfil/vehiculos", Icon: Car, title: "Mis vehículos", desc: "Gestionar vehículos" }] : []),
    { id: "configuracion", href: "/app/perfil/configuracion", Icon: Settings, title: "Configuración", desc: "Preferencias y ajustes" },
    { id: "ayuda", href: "/help", Icon: HelpCircle, title: "Ayuda y soporte", desc: "Preguntas frecuentes y contacto" },
    { id: "metodos-pago", href: "/app/perfil/metodos-pago", Icon: CreditCard, title: "Métodos de pago", desc: "Pago Móvil, Transferencia, Wally, PayPal, Zinli" },
  ];

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col md:flex-row md:max-w-none">
      {/* En móvil: la tarjeta va arriba (order-1), el menú abajo (order-2). En escritorio: aside izquierda, main derecha. */}
      <aside className="order-2 md:order-none md:w-[340px] md:flex-shrink-0 md:border-r md:border-slate-200 md:bg-slate-50/50 p-4 md:p-5">
        <h1 className="text-xl md:text-lg font-bold text-slate-800 mb-1">Mi perfil</h1>
        <p className="text-slate-500 text-sm mb-4 md:mb-5">Cuenta verificada · Gestión centralizada</p>
        <h2 className="text-base font-bold mb-3 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
          Panel de cuenta
        </h2>
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedSection("inicio")}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${selectedSection === "inicio" ? "border-[#0EA5E9] bg-sky-50/80 shadow-sm" : "border-slate-200 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50"
              }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 flex-shrink-0">
              <User className="w-6 h-6 text-slate-600" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 text-sm">Resumen</p>
              <p className="text-xs text-slate-500 mt-0.5">Tu cuenta y accesos rápidos</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </button>
          {menuItems.map(({ id, href, Icon, title, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedSection(id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${selectedSection === id ? "border-[#0EA5E9] bg-sky-50/80 shadow-sm" : "border-slate-200 bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50"
                }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 flex-shrink-0">
                <Icon className="w-6 h-6 text-slate-600" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 text-sm">{title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </button>
          ))}
          <div className="md:hidden pt-2">
            <button
              type="button"
              onClick={() => { if (typeof window !== "undefined") { localStorage.removeItem("velocity_user"); router.push("/"); } }}
              className="w-full p-4 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 transition text-left"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-6 h-6 text-slate-600" />
              <div className="flex-1 text-left">
                <p className="font-semibold text-slate-800 text-sm">Cerrar sesión</p>
                <p className="text-xs text-slate-500">Salir de tu cuenta</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </nav>
      </aside>

      {/* Contenido principal: en móvil arriba (order-1), en escritorio a la derecha */}
      <main className="order-1 md:order-none flex-1 overflow-y-auto p-5 md:p-8 min-w-0">
        <div className="w-full max-w-4xl mx-auto">
          {selectedSection === "inicio" && (
            <>
              <motion.div
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="h-1 bg-sky-200" aria-hidden />
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-5 mb-5">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 bg-slate-100 border border-slate-200">
                      <RolIcon className="w-10 h-10 text-slate-700" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-2xl text-slate-900">{nombre}</p>
                      <p className="text-slate-500 text-base mt-0.5">{rolLabel}</p>
                      <div className="flex gap-2 mt-3">
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-white bg-slate-800 px-2.5 py-1 rounded-md">
                          <BadgeCheck className="w-4 h-4" /> Verificado premium
                        </span>
                        <select
                          value={rol}
                          onChange={(e) => {
                            const next = e.target.value as Rol;
                            setRol(next);
                            const user = JSON.parse(localStorage.getItem("velocity_user") || "{}");
                            localStorage.setItem("velocity_user", JSON.stringify({ ...user, rol: next }));
                            // Reload to apply changes across layout
                            window.location.reload();
                          }}
                          className="text-xs font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-sky-500/20"
                        >
                          <option value="cliente">Cliente</option>
                          <option value="conductor">Conductor</option>
                          <option value="emprendedor">Emprendedor</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 text-base mb-5">
                    Cuenta corporativa con acceso a servicios, billetera y soporte prioritario.
                  </p>
                  <div className="rounded-xl bg-stone-50 border border-stone-200 p-4 space-y-2 text-base">
                    <p className="flex items-center gap-2 text-slate-700"><Mail className="w-5 h-5 flex-shrink-0 text-slate-500" /> {email}</p>
                    <p className="flex items-center gap-2 text-slate-700"><Phone className="w-5 h-5 flex-shrink-0 text-slate-500" /> {telefono}</p>
                  </div>

                  {rol === "conductor" && (
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Información de conductor</p>
                      <ul className="text-base text-slate-600 space-y-1">
                        <li>Vehículo: Toyota Corolla · ABC-123</li>
                        <li>Viajes completados: 127</li>
                        <li>Disponibilidad: Activo</li>
                      </ul>
                    </div>
                  )}

                  {rol === "emprendedor" && (
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <p className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Información de emprendedor</p>
                      <p className="text-base text-slate-600">Tu negocio y catálogo se gestionan en la sección Empresa.</p>
                      <Link href="/app/empresa" className="inline-flex items-center gap-1 mt-2 text-base font-medium text-sky-600 hover:text-sky-700">
                        Ir a Mi empresa <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}

                  <div className="flex gap-8 mt-5 pt-5 border-t border-slate-100">
                    {(rol === "cliente" || rol === "conductor") && (
                      <>
                        <div>
                          <p className="text-3xl font-bold text-slate-900">15</p>
                          <p className="text-sm text-slate-500">Viajes</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-slate-900">2</p>
                          <p className="text-sm text-slate-500">Gratis</p>
                        </div>
                      </>
                    )}
                    <div className="flex items-baseline gap-1">
                      <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                      <p className="text-3xl font-bold text-slate-900">5.0</p>
                      <p className="text-sm text-slate-500 ml-1">Valoración</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Accesos rápidos</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/app" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0EA5E9]/10 text-slate-800 font-medium text-base flex items-center gap-2 transition">
                    <MapPin className="w-5 h-5" /> Viajar
                  </Link>
                  <Link href="/app" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0EA5E9]/10 text-slate-800 font-medium text-base flex items-center gap-2 transition">
                    Inicio
                  </Link>
                  <Link href="/app/billetera" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0EA5E9]/10 text-slate-800 font-medium text-base flex items-center gap-2 transition">
                    Billetera
                  </Link>
                  {rol === "emprendedor" && (
                    <Link href="/app/empresa" className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0EA5E9]/10 text-slate-800 font-medium text-base flex items-center gap-2 transition">
                      Mi empresa
                    </Link>
                  )}
                </div>
              </div>

              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={() => { if (typeof window !== "undefined") { localStorage.removeItem("velocity_user"); router.push("/"); } }}
                  className="w-full p-5 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white hover:bg-red-50 hover:border-red-200 transition text-left"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 text-slate-500" />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-slate-800 text-base">Cerrar sesión</p>
                    <p className="text-slate-500">Salir de tu cuenta</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </>
          )}

          {selectedSection === "carritos" && <CarritosPanel embedInDashboard />}
          {selectedSection === "favoritos" && <FavoritosPanel embedInDashboard />}
          {selectedSection === "referidos" && <ReferidosPanel embedInDashboard />}
          {selectedSection === "historial" && <HistorialPanel embedInDashboard />}
          {selectedSection === "vehiculos" && <VehiculosPanel embedInDashboard />}
          {selectedSection === "configuracion" && <ConfiguracionPanel embedInDashboard />}
          {selectedSection === "ayuda" && <AyudaPanel embedInDashboard />}
          {selectedSection === "metodos-pago" && <MetodosPagoPanel embedInDashboard />}
        </div>
      </main>
    </div>
  );
}
