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
  Zap,
  Shield,
  Bell,
  Camera,
  Edit3,
  Trash2,
} from "lucide-react";
import VerificationBadge from "@/components/VerificationBadge";
import CarritosPanel from "@/components/perfil/CarritosPanel";
import FavoritosPanel from "@/components/perfil/FavoritosPanel";
import ReferidosPanel from "@/components/perfil/ReferidosPanel";
import HistorialPanel from "@/components/perfil/HistorialPanel";
import VehiculosPanel from "@/components/perfil/VehiculosPanel";
import ConfiguracionPanel from "@/components/perfil/ConfiguracionPanel";
import AyudaPanel from "@/components/perfil/AyudaPanel";
import MetodosPagoPanel from "@/components/perfil/MetodosPagoPanel";
import EmpresaPanel from "@/components/perfil/EmpresaPanel";
import NivelBadge from "@/components/perfil/NivelBadge";
import { getLevelForXP } from "@/lib/levels";

type Rol = "cliente" | "conductor" | "emprendedor";

type SectionId = "inicio" | "carritos" | "favoritos" | "referidos" | "historial" | "vehiculos" | "configuracion" | "ayuda" | "metodos-pago" | "empresa";

export default function PerfilPage() {
  const router = useRouter();
  const [rol, setRol] = useState<Rol>("cliente");
  const [nombre, setNombre] = useState("Juan Pérez");
  const [email, setEmail] = useState("cliente@velocity.com");
  const [telefono, setTelefono] = useState("+58 424 123 4567");
  const [selectedSection, setSelectedSection] = useState<SectionId>("inicio");
  const [userXP] = useState(3500); // Mock: XP actual del usuario (Nivel 3 - Tortuga, badge Viajero Constante desbloqueada)

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
    ...((rol === "conductor") ? [{ id: "vehiculos" as SectionId, href: "/app/perfil/vehiculos", Icon: Car, title: "Mis vehículos", desc: "Gestionar vehículos" }] : []),
    ...((rol === "emprendedor") ? [{ id: "empresa" as SectionId, href: "/app/perfil/empresa", Icon: Building2, title: "Mi Empresa", desc: "Gestión de perfil y negocio" }] : []),
    { id: "configuracion", href: "/app/perfil/configuracion", Icon: Settings, title: "Configuración", desc: "Preferencias y ajustes" },
    { id: "ayuda", href: "/help", Icon: HelpCircle, title: "Ayuda y soporte", desc: "Preguntas frecuentes y contacto" },
    { id: "metodos-pago", href: "/app/perfil/metodos-pago", Icon: CreditCard, title: "Métodos de pago", desc: "Pago Móvil, Transferencia, Wally, PayPal, Zinli" },
  ];

  return (
    <div className="min-h-[calc(100vh-56px)] flex flex-col md:flex-row md:max-w-none">
      {/* En móvil: la tarjeta va arriba (order-1), el menú abajo (order-2). En escritorio: aside izquierda, main derecha. */}
      <aside className="order-2 md:order-none md:w-[340px] md:flex-shrink-0 md:border-r md:border-slate-200 dark:border-white/5 md:bg-slate-50/50 dark:md:bg-velocity-bg p-4 md:p-5">
        <h1 className="text-xl md:text-lg font-bold text-slate-800 dark:text-white mb-1">Mi perfil</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 md:mb-5">Cuenta verificada · Gestión centralizada</p>
        <h2 className="text-base font-bold mb-3 text-slate-700 dark:text-slate-300">
          Panel de cuenta
        </h2>
        <nav className="space-y-2">
          <button
            type="button"
            onClick={() => setSelectedSection("inicio")}
            className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${selectedSection === "inicio" ? "border-[#0EA5E9] bg-sky-50/80 dark:bg-[#0EA5E9]/10 shadow-sm" : "border-slate-200 dark:border-transparent dark:bg-transparent bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 dark:hover:bg-white/5"
              }`}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 flex-shrink-0">
              <User className="w-6 h-6 text-slate-600 dark:text-slate-300" strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-800 dark:text-white text-sm">Resumen</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tu cuenta y accesos rápidos</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
          </button>
          {menuItems.map(({ id, href, Icon, title, desc }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSelectedSection(id)}
              className={`w-full p-4 flex items-center gap-4 rounded-2xl border text-left transition ${selectedSection === id ? "border-[#0EA5E9] bg-sky-50/80 dark:bg-[#0EA5E9]/10 shadow-sm" : "border-slate-200 dark:border-transparent dark:bg-transparent bg-white hover:border-[#0EA5E9]/30 hover:bg-sky-50/50 dark:hover:bg-white/5"
                }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 flex-shrink-0">
                <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-800 dark:text-white text-sm">{title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
            </button>
          ))}
          <div className="md:hidden pt-2">
            <button
              type="button"
              onClick={() => { if (typeof window !== "undefined") { localStorage.removeItem("velocity_user"); router.push("/"); } }}
              className="w-full p-4 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-transparent dark:bg-transparent bg-white hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 transition-all text-left"
              aria-label="Cerrar sesión"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 flex-shrink-0">
                <LogOut className="w-6 h-6 text-slate-600 dark:text-red-400" />
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-slate-800 dark:text-white text-sm">Cerrar sesión</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Salir de tu cuenta de forma segura</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0" />
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
                className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-sm mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <div className="h-1 bg-sky-200" aria-hidden />
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-[18px] flex items-center justify-center flex-shrink-0 bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10">
                      <RolIcon className="w-8 h-8 text-slate-700 dark:text-slate-300" strokeWidth={2} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-xl md:text-2xl text-slate-900 dark:text-white leading-tight truncate">{nombre}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1.5 font-medium">
                        <BadgeCheck className={`w-4 h-4 ${
                          (rol === "cliente" ? "standard" : "premium") === "premium" 
                            ? "text-orange-500" 
                            : rol === "conductor" 
                              ? "text-emerald-500" 
                              : "text-blue-500"
                        }`} /> {rolLabel}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mt-2.5">
                        <VerificationBadge role={rol as any} type={rol === "cliente" ? "standard" : "premium"} className="mb-1" />
                        {(() => {
                          const lvlInfo = getLevelForXP(userXP);
                          const lvl = lvlInfo.currentLevel;
                          return (
                            <span
                              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white px-2 py-1 rounded-md tracking-wide shadow-sm"
                              style={{ backgroundColor: lvl.color }}
                            >
                              <span className="text-xs">{lvl.emoji}</span> Nv. {lvl.level} {lvl.name}
                            </span>
                          );
                        })()}
                        <div className="relative">
                          <select
                            value={rol}
                            onChange={(e) => {
                              const next = e.target.value as Rol;
                              setRol(next);
                              const user = JSON.parse(localStorage.getItem("velocity_user") || "{}");
                              localStorage.setItem("velocity_user", JSON.stringify({ ...user, rol: next }));
                            }}
                            className="text-[11px] font-bold uppercase tracking-wider bg-white dark:bg-[#1E2329] dark:text-white border border-slate-200 dark:border-white/20 rounded-md py-1 items-center px-2 pr-6 outline-none hover:bg-slate-50 dark:hover:bg-white/5 transition-colors appearance-none cursor-pointer shadow-sm"
                          >
                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="cliente">Cliente</option>
                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="conductor">Conductor</option>
                            <option className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white" value="emprendedor">Emprendedor</option>
                          </select>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none rotate-90" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[13px] md:text-sm mb-5 leading-relaxed">
                    Cuenta corporativa con acceso a servicios, billetera y soporte prioritario.
                  </p>
                  <div className="rounded-[18px] bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-4 space-y-2.5 text-[13px] md:text-sm">
                    <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><Mail className="w-4 h-4 flex-shrink-0 text-slate-400" /> <span className="truncate">{email}</span></p>
                    <p className="flex items-center gap-3 text-slate-700 dark:text-slate-300"><Phone className="w-4 h-4 flex-shrink-0 text-slate-400" /> {telefono}</p>
                  </div>

                  {rol === "conductor" && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2.5">Información de conductor</p>
                      <ul className="text-[13px] md:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                        <li className="flex items-center gap-2">
                          <Car className="w-4 h-4 text-slate-400" /> Vehículo: Toyota Corolla · ABC-123
                        </li>
                        <li className="flex items-center gap-2">
                          <History className="w-4 h-4 text-slate-400" /> Viajes completados: 127
                        </li>
                        <li className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                          <BadgeCheck className="w-4 h-4" /> Disponibilidad: Activo
                        </li>
                      </ul>
                    </div>
                  )}

                  {rol === "emprendedor" && (
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Información de emprendedor</p>
                      <p className="text-[13px] text-slate-600 dark:text-slate-300">Tu negocio y catálogo se gestionan en la sección Empresa.</p>
                      <button onClick={() => setSelectedSection("empresa")} className="inline-flex items-center gap-1 mt-2 text-[13px] font-bold text-[#F46E20] hover:text-[#D95D1A] transition-colors">
                        Ir a Mi empresa <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex gap-8 mt-5 pt-5 border-t border-slate-100 dark:border-white/5">
                    {(rol === "cliente" || rol === "conductor") && (
                      <>
                        <div>
                          <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">15</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Viajes</p>
                        </div>
                        <div>
                          <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">2</p>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Gratis</p>
                        </div>
                      </>
                    )}
                    <div className="flex items-baseline gap-1.5">
                      <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                      <p className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">5.0</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1 mt-0.5">Puntos</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-6 shadow-sm mb-6">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Accesos rápidos</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/app" className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-velocity-primary/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95">
                    <MapPin className="w-5 h-5" /> Viajar ahora
                  </Link>
                  <Link href="/app/billetera" className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-velocity-primary/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95">
                    <CreditCard className="w-5 h-5" /> Mi Billetera
                  </Link>
                  {rol === "conductor" && (
                    <button onClick={() => setSelectedSection("vehiculos")} className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-velocity-primary/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95">
                      <Car className="w-5 h-5" /> Gestionar vehículos
                    </button>
                  )}
                  {rol === "emprendedor" && (
                    <button onClick={() => setSelectedSection("empresa")} className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-velocity-primary/10 text-slate-800 dark:text-white font-semibold text-sm flex items-center gap-2 transition-all active:scale-95">
                      <Building2 className="w-5 h-5" /> Panel Empresa
                    </button>
                  )}
                </div>
              </div>

              {/* Sistema de Niveles */}
              <div className="mb-6">
                <NivelBadge totalXP={userXP} rol={rol} />
              </div>

              <div className="hidden md:block">
                <button
                  type="button"
                  onClick={() => { if (typeof window !== "undefined") { localStorage.removeItem("velocity_user"); router.push("/"); } }}
                  className="w-full p-5 flex items-center gap-4 rounded-2xl border border-slate-200 dark:border-transparent bg-white dark:bg-transparent hover:bg-red-50 dark:hover:bg-red-500/10 hover:border-red-200 transition-all text-left shadow-sm group"
                  aria-label="Cerrar sesión"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-white/10 flex-shrink-0 group-hover:bg-red-100 dark:group-hover:bg-red-500/20 transition-colors">
                    <LogOut className="w-6 h-6 text-slate-500 dark:text-red-400 group-hover:text-red-600" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-bold text-slate-800 dark:text-white text-base">Cerrar sesión</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Finalizar tu sesión actual</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </>
          )}

          {selectedSection === "carritos" && <CarritosPanel embedInDashboard />}
          {selectedSection === "favoritos" && <FavoritosPanel embedInDashboard />}
          {selectedSection === "referidos" && <ReferidosPanel embedInDashboard />}
          {selectedSection === "historial" && <HistorialPanel embedInDashboard />}
          {selectedSection === "vehiculos" && <VehiculosPanel embedInDashboard />}
          {selectedSection === "empresa" && <EmpresaPanel embedInDashboard />}
          {selectedSection === "configuracion" && <ConfiguracionPanel embedInDashboard />}
          {selectedSection === "ayuda" && <AyudaPanel embedInDashboard />}
          {selectedSection === "metodos-pago" && <MetodosPagoPanel embedInDashboard />}
        </div>
      </main>
    </div>
  );
}
