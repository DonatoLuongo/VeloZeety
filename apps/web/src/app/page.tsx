"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Car, Bike, Building2, ChevronDown, Store, UtensilsCrossed, Coffee, ShoppingBag, Pill, ChefHat } from "lucide-react";
import { motion } from "framer-motion";
import CascoVelocity from "@/components/CascoVelocity";
import LocationIconOrange from "@/components/LocationIconOrange";

const NEGOCIOS_CARRUSEL = [
  { name: "Panadería Central", Icon: UtensilsCrossed },
  { name: "Pizza & Más", Icon: ChefHat },
  { name: "Mini Market", Icon: Store },
  { name: "Café del Centro", Icon: Coffee },
  { name: "Farmacia San José", Icon: Pill },
  { name: "Restaurante La Vía", Icon: UtensilsCrossed },
];
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
  );
}
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  );
}
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  );
}
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  );
}

function RegisterDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function close(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const options = [
    { href: "/register?rol=cliente", label: "Viajes", desc: "Pedir viajes", Icon: Car },
    { href: "/register?rol=conductor", label: "Conducir", desc: "Ganar con tu vehículo", Icon: Bike },
    { href: "/register?rol=emprendedor", label: "Emprendedor", desc: "Tu negocio y delivery", Icon: Building2 },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-black hover:bg-white/95 transition flex items-center gap-2"
      >
        Registrarse
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white shadow-xl border border-gray-100 py-2 z-50 text-black">
          {options.map(({ href, label, desc, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition"
              onClick={() => setOpen(false)}
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Icon className="w-5 h-5 text-gray-700" />
              </div>
              <div>
                <p className="font-semibold text-sm">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

const QR_DOWNLOAD_URL = "https://velocity.app/download";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header: se difumina al bajar (estilo Stripe) */}
      <header
        className={`sticky top-0 z-50 border-b border-white/10 transition-all duration-300 ${
          scrolled ? "bg-black/85 backdrop-blur-md" : "bg-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <LocationIconOrange size={36} className="flex-shrink-0" />
              <span className="font-semibold text-lg hidden sm:inline">
                {BRAND.name}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/ride"
                className="text-sm font-medium text-white/90 hover:text-white"
              >
                Viajes
              </Link>
              <Link
                href="/driver"
                className="text-sm font-medium text-white/70 hover:text-white"
              >
                Conducir
              </Link>
              <Link
                href="/business"
                className="text-sm font-medium text-white/70 hover:text-white"
              >
                Empresas
              </Link>
              <Link
                href="/more"
                className="text-sm font-medium text-white/70 hover:text-white"
              >
                Más
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium text-white/90 hover:text-white">
                Iniciar sesión
              </Link>
              <Link href="/app" className="text-sm font-medium text-white/80 hover:text-white hidden sm:inline">
                Entrar a la app
              </Link>
              <RegisterDropdown />
            </div>
          </div>
        </div>
      </header>

      {/* Hero: título + card (animación tecnológica) */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-20">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-2 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Ve a donde quieras con VeloCity
        </motion.h1>
        <motion.p
          className="text-white/70 text-center text-lg mb-10 max-w-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          Moto o carro, en el momento. Paga con tu wallet, gana viajes gratis.
        </motion.p>

        {/* Card tipo Uber: origen, destino, CTA */}
        <motion.div
          className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden text-black animate-float"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="flex flex-col sm:flex-row sm:divide-x sm:divide-gray-200">
            <div className="flex-1 p-4 sm:p-5">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Recogida
              </label>
              <input
                type="text"
                placeholder="¿Dónde estás?"
                className="w-full text-base font-medium placeholder:text-gray-400 focus:outline-none bg-transparent"
                readOnly
              />
            </div>
            <div className="flex-1 p-4 sm:p-5 border-t sm:border-t-0 border-gray-100">
              <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                Destino
              </label>
              <input
                type="text"
                placeholder="¿A dónde vas?"
                className="w-full text-base font-medium placeholder:text-gray-400 focus:outline-none bg-transparent"
                readOnly
              />
            </div>
          </div>
          <div className="px-4 sm:px-5 pb-5 flex flex-col sm:flex-row gap-3">
            <Link
              href="/ride"
              className="flex-1 py-3.5 px-4 rounded-lg font-semibold text-center text-white transition hover:opacity-95"
              style={{ backgroundColor: BRAND.colors.primary }}
            >
              Ver precios
            </Link>
            <Link
              href="/ride"
              className="flex-1 py-3.5 px-4 rounded-lg font-semibold text-center bg-black text-white border border-gray-300 hover:bg-gray-900 transition"
            >
              Pedir viaje ahora
            </Link>
          </div>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/login" className="underline hover:text-white/80">
            Inicia sesión
          </Link>{" "}
          para ver tu actividad reciente
        </motion.p>
      </section>

      {/* Carrusel automático: negocios con iconos (estilo Stripe) */}
      <section className="py-10 border-y border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white/60 text-sm mb-6">Negocios en VeloCity</p>
          <div className="relative">
            <div className="flex animate-carousel gap-8 w-max">
              {[...NEGOCIOS_CARRUSEL, ...NEGOCIOS_CARRUSEL].map((item, i) => (
                <div key={i} className="flex-shrink-0 flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/90 font-medium text-sm whitespace-nowrap">
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                    <item.Icon className="w-4 h-4 text-[#0EA5E9]" />
                  </div>
                  {item.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Conduce cuando quieras */}
      <section className="py-16 md:py-24 bg-white text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Conduce cuando quieras, gana lo que necesites
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Gana dinero con tu moto o tu carro. Horario flexible, pagos semanales y beneficios en la tienda VeloCity.
              </p>
              <Link
                href="/driver"
                className="inline-block py-3.5 px-6 rounded-lg font-semibold text-white transition hover:opacity-95"
                style={{ backgroundColor: BRAND.colors.primary }}
              >
                Comenzar a conducir
              </Link>
              <p className="mt-4 text-sm text-gray-500">
                <Link href="/driver/login" className="underline">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </p>
            </motion.div>
            <motion.div className="rounded-2xl bg-gray-100 border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.45 }}>
              <div>
                <h3 className="font-bold text-xl text-black mb-1">Conducir</h3>
                <p className="text-gray-600 text-sm mb-4">Gana con tu moto o carro. Horario flexible, pagos semanales y beneficios.</p>
                <Link href="/driver" className="inline-block py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-black hover:bg-gray-50 transition">
                  Detalles
                </Link>
              </div>
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                <Car className="w-12 h-12 text-gray-500" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección: Para empresas - mockup app profesional */}
      <section className="py-16 md:py-24 bg-gray-50 text-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="order-2 md:order-1 rounded-2xl bg-gray-100 border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="font-bold text-xl text-black mb-1">Para empresas</h3>
                <p className="text-gray-600 text-sm mb-4">Tu negocio en la app: tienda virtual, catálogo y delivery con nuestra flota.</p>
                <Link href="/business" className="inline-block py-2.5 px-4 rounded-lg text-sm font-medium border border-gray-300 bg-white text-black hover:bg-gray-50 transition">
                  Detalles
                </Link>
              </div>
              <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-white border border-gray-200 flex items-center justify-center">
                <Building2 className="w-12 h-12 text-gray-500" />
              </div>
            </motion.div>
            <motion.div className="order-1 md:order-2" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                VeloCity para tu empresa
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                ¿Tienes un negocio, tienda o comida rápida? Crea tu perfil de empresa en la app, abre tu tienda con catálogo y ofrece <strong>delivery incluido</strong>. Nuestras motos y carros son de la misma empresa: entregas rápidas y confiables para tus clientes.
              </p>
              <ul className="text-gray-600 mb-8 space-y-2">
                <li>• Perfil de negocio y tienda virtual</li>
                <li>• Delivery con nuestra flota (moto o carro)</li>
                <li>• Reportes y facturación centralizada</li>
              </ul>
              <Link
                href="/business"
                className="inline-block py-3.5 px-6 rounded-lg font-semibold bg-black text-white hover:bg-gray-800 transition"
              >
                Más información
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Uniformes: estilo referencia — marco gris oscuro, área blanca, prendas con líneas naranja/azul */}
      <section className="py-16 md:py-24 bg-slate-100 text-[#3F474A] animate-fade-in-up">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#3F474A]">
            Uniformes
          </h2>
          <p className="text-slate-600 text-center text-lg mb-10 max-w-2xl mx-auto">
            Equipamiento oficial. Gris carbón y negro con líneas naranja y azul. Logo en pecho.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Chaqueta con capucha — referencia imagen */}
            <div className="rounded-2xl overflow-hidden bg-[#3F474A] p-2 shadow-lg">
              <div className="rounded-xl bg-white aspect-[3/4] flex items-center justify-center p-4">
                <img
                  src="/images/uniformes/chaqueta-capucha.png"
                  alt="Chaqueta con capucha VeloCity"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-white text-sm">Chaqueta con capucha</h3>
                <p className="text-white/70 text-xs mt-0.5">Capucha y puños naranja · Líneas geométricas</p>
              </div>
            </div>
            {/* Chaqueta dos tonos */}
            <div className="rounded-2xl overflow-hidden bg-[#3F474A] p-2 shadow-lg">
              <div className="rounded-xl bg-white aspect-[3/4] flex items-center justify-center p-4">
                <img
                  src="/images/uniformes/chaqueta-dos-tonos.png"
                  alt="Chaqueta dos tonos VeloCity"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-white text-sm">Chaqueta dos tonos</h3>
                <p className="text-white/70 text-xs mt-0.5">Gris y negro · Cierre naranja</p>
              </div>
            </div>
            {/* Polo — mismo estilo de card */}
            <div className="rounded-2xl overflow-hidden bg-[#3F474A] p-2 shadow-lg">
              <div className="rounded-xl bg-white aspect-[3/4] flex items-center justify-center p-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-5" style={{ background: "linear-gradient(135deg, #F46E20 0%, #5BA4D4 100%)" }} />
                <div className="w-full h-full rounded-lg border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
                  <span className="text-xs font-medium text-slate-500">Polo oficial</span>
                  <span className="text-[10px] mt-1">Cuello y puños naranja</span>
                </div>
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-white text-sm">Polo oficial</h3>
                <p className="text-white/70 text-xs mt-0.5">Cuello y puños naranja · Logo en pecho</p>
              </div>
            </div>
            {/* Playera + Casco en una card o casco solo */}
            <div className="rounded-2xl overflow-hidden bg-[#3F474A] p-2 shadow-lg">
              <div className="rounded-xl bg-white aspect-[3/4] flex items-center justify-center p-4">
                <CascoVelocity width={140} height={140} />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-white text-sm">Casco integral</h3>
                <p className="text-white/70 text-xs mt-0.5">Gris carbón · Bandas naranja y azul</p>
              </div>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link href="/store" className="text-sm font-semibold inline-flex items-center gap-1 hover:opacity-90 transition" style={{ color: BRAND.colors.primary }}>
              Ver tienda →
            </Link>
          </p>
        </div>
      </section>

      {/* Cómo usar la aplicación: imagen, animación y estructura profesional */}
      <section className="py-16 md:py-24 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--velocity-primary)]/10 via-transparent to-transparent pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            Cómo usar la aplicación
          </motion.h2>
          <motion.p
            className="text-white/70 text-center text-lg mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            Viajes, billetera, negocios y más en un solo lugar. Así puedes sacarle partido.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: 1, title: "Pide un viaje", text: "Elige origen, destino y tipo de vehículo. Paga con efectivo, pago móvil o tu billetera." },
              { step: 2, title: "Compra en negocios", text: "Explora negocios verificados, elige productos y paga con tu billetera. El emprendedor recibe el pago." },
              { step: 3, title: "Billetera y NFC", text: "Recarga, envía y recibe VELO. Paga con NFC desde tu móvil en comercios o a otras cuentas." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-[var(--velocity-primary)]/30 hover:bg-white/[0.07] transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[var(--velocity-primary)]/20 flex items-center justify-center mb-4 font-bold text-[var(--velocity-primary)]">{item.step}</div>
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Descarga la app: QR con modal para escanear */}
      <section className="py-16 md:py-24 bg-gray-100 text-black animate-fade-in-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Todo es más fácil en la app
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto">
            Una sola app: pide viajes, conduce, paga con tu wallet y sigue todo en tiempo real. Pasajeros y conductores en la misma aplicación.
          </p>
          <div className="max-w-md mx-auto bg-white rounded-2xl p-6 flex items-center gap-6 shadow-sm">
            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="flex-shrink-0 rounded-lg border border-gray-200 p-1 hover:border-[#0EA5E9]/50 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/30"
              aria-label="Ver código QR en grande"
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(QR_DOWNLOAD_URL)}`}
                alt="QR Descargar VeloCity"
                className="w-32 h-32 rounded-lg bg-white"
              />
            </button>
            <div className="text-left flex-1">
              <p className="font-semibold text-xl">Descarga VeloCity</p>
              <p className="text-sm text-gray-500 mt-1">Escanear para descargar</p>
              <p className="text-sm text-gray-600 mt-3">Una app para viajes, conducir, empresas y más.</p>
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="mt-2 text-sm font-medium text-[#0EA5E9] hover:underline"
              >
                Ver QR en grande →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal QR grande para escanear */}
      {showQrModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowQrModal(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Código QR para descargar la app"
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold text-lg text-center text-slate-800 mb-4">Escanear para descargar VeloCity</p>
            <div className="flex justify-center p-4 bg-gray-50 rounded-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(QR_DOWNLOAD_URL)}`}
                alt="Código QR descarga app"
                className="w-64 h-64 rounded-lg"
              />
            </div>
            <p className="text-sm text-slate-500 text-center mt-2">Abre la cámara de tu móvil y apunta al código</p>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-4 w-full py-2.5 rounded-xl font-medium bg-slate-200 text-slate-800 hover:bg-slate-300 transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Footer: logo título de la empresa, tamaño destacado */}
      <footer className="bg-black text-white pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 mb-10">
            <div className="flex flex-col items-start">
              <Link href="/" className="group" aria-label={BRAND.name}>
                <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{BRAND.name}</span>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div>
                <h4 className="font-semibold text-sm mb-4">Empresa</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link href="/about" className="hover:text-white">Nosotros</Link></li>
                  <li><Link href="/offerings" className="hover:text-white">Servicios</Link></li>
                  <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
                  <li><Link href="/careers" className="hover:text-white">Empleos</Link></li>
                  <li><Link href="/help" className="hover:text-white">Ayuda</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4">Productos</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link href="/app" className="hover:text-white">Viajes</Link></li>
                  <li><Link href="/driver" className="hover:text-white">Conducir</Link></li>
                  <li><Link href="/business" className="hover:text-white">VeloCity para empresas</Link></li>
                  <li><Link href="/app/servicios" className="hover:text-white">Tienda y servicios</Link></li>
                  <li><Link href="/app/servicios" className="hover:text-white">ACEO</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4">Ciudad</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link href="/cities" className="hover:text-white">Cobertura</Link></li>
                  <li><Link href="/stops" className="hover:text-white">Paradas</Link></li>
                  <li><Link href="/safety" className="hover:text-white">Seguridad</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-4">Viajes</h4>
                <ul className="space-y-3 text-sm text-white/70">
                  <li><Link href="/app" className="hover:text-white">Reservar</Link></li>
                  <li><Link href="/app" className="hover:text-white">Terminal</Link></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition" aria-label="Facebook">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition" aria-label="X">
                <XIcon className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition" aria-label="Instagram">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition" aria-label="LinkedIn">
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#" className="inline-block hover:opacity-90 transition-opacity" aria-label="Google Play">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-11 w-auto" />
              </a>
              <a href="#" className="inline-block hover:opacity-90 transition-opacity" aria-label="App Store">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-11 w-auto" />
              </a>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm text-white/50">
            <p>© {new Date().getFullYear()} VeloCity. {BRAND.tagline}.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/70">Privacidad</Link>
              <Link href="/accessibility" className="hover:text-white/70">Accesibilidad</Link>
              <Link href="/terms" className="hover:text-white/70">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
