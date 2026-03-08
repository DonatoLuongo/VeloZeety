"use client";

import { BRAND } from "@velocity/shared";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Car, Bike, Package, Ambulance, ChevronDown, ChevronLeft, ChevronRight, PhoneOff, PhoneCall, ShieldAlert, Bus, ShoppingBag, Eye, EyeOff, Building2, Wallet, Users, Globe, ArrowRight, CheckCircle2, Shield, Zap, HeadphonesIcon, TrendingUp, Cpu, Activity } from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

/* ─── Slide data ─── */
const SLIDES = [
  {
    tag_es: "Movilidad", tag_en: "Mobility",
    h_es: "Tu ciudad,\na tu velocidad", h_en: "Your city,\nat your speed",
    sub_es: "Pide un viaje en moto o carro en segundos. Conductores verificados, tarifa justa.",
    sub_en: "Book a motorcycle or car ride in seconds. Verified drivers, fair pricing.",
    cta_href: "/register?rol=cliente",
    cta_es: "Pedir viaje", cta_en: "Book a ride",
    accent: "#F46E20",
    Icon: Bike,
    bgLight: "#FFF7F2",
    bgDark: "#1a1208",
  },
  {
    tag_es: "Delivery", tag_en: "Delivery",
    h_es: "Envíos rápidos\ndoor to door", h_en: "Fast deliveries\ndoor to door",
    sub_es: "Mandaitos, fletes y paquetes en minutos. Rastrea en tiempo real.",
    sub_en: "Errands, freight, and packages in minutes. Real-time tracking.",
    cta_href: "/register",
    cta_es: "Enviar ahora", cta_en: "Send now",
    accent: "#059669",
    Icon: Package,
    bgLight: "#F0FDF9",
    bgDark: "#071510",
  },
  {
    tag_es: "Billetera Digital", tag_en: "Digital Wallet",
    h_es: "Paga con tu\nbilletera digital", h_en: "Pay with your\ndigital wallet",
    sub_es: "USDT, Bolívares, PayPal y más. Sin comisiones ocultas.",
    sub_en: "USDT, Bolívares, PayPal and more. No hidden fees.",
    cta_href: "/register",
    cta_es: "Ver billetera", cta_en: "View wallet",
    accent: "#F0B90B",
    Icon: Wallet,
    bgLight: "#FFFBEB",
    bgDark: "#17120a",
  },
];

/* ─── Register dropdown (landing only) ─── */
function RegisterDropdown({ lang }: { lang: "es" | "en" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition hover:opacity-90"
        style={{ backgroundColor: "#F46E20" }}>
        {lang === "es" ? "Registrarse" : "Sign up"}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-[var(--velocity-surface)] shadow-2xl border border-[var(--velocity-border)] py-2 z-50">
          {[
            { href: "/register?rol=cliente", Icon: Car, es: "Viajar", en: "Ride", des: lang === "es" ? "Pedir viajes" : "Request rides" },
            { href: "/register?rol=conductor", Icon: Bike, es: "Conducir", en: "Drive", des: lang === "es" ? "Ganar con tu vehículo" : "Earn with your vehicle" },
          ].map(({ href, Icon, es, en, des }) => (
            <Link key={href} href={href} className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--velocity-border)] transition" onClick={() => setOpen(false)}>
              <div className="w-8 h-8 rounded-lg bg-[#F46E20]/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-[#F46E20]" />
              </div>
              <div>
                <p className="font-bold text-sm text-[var(--velocity-text)]">{lang === "es" ? es : en}</p>
                <p className="text-xs text-[var(--velocity-muted)]">{des}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Hero Carousel — Xiaomi style ─── */
function HeroCarousel({ lang, dark }: { lang: "es" | "en"; dark: boolean }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const slide = SLIDES[idx];

  const go = (dir: number) => {
    if (fading) return;
    setFading(true);
    setTimeout(() => {
      setIdx((i) => (i + dir + SLIDES.length) % SLIDES.length);
      setFading(false);
    }, 200);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 5500);
    return () => clearInterval(t);
  }, [idx, fading]);

  const bg = dark ? slide.bgDark : slide.bgLight;

  return (
    <section
      className="relative w-full h-[480px] md:h-[540px] overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: bg }}>

      {/* Content */}
      <div className={`absolute inset-0 flex items-center transition-opacity duration-200 ${fading ? "opacity-0" : "opacity-100"}`}>
        <div className="max-w-7xl mx-auto px-8 md:px-20 w-full flex items-center justify-between">

          {/* Left text */}
          <div className="max-w-[50%]">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5 border"
              style={{ color: slide.accent, borderColor: `${slide.accent}40`, backgroundColor: `${slide.accent}10` }}>
              {lang === "es" ? slide.tag_es : slide.tag_en}
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.05] mb-4 whitespace-pre-line"
              style={{ color: dark ? "#EAECEF" : "#1E2329" }}>
              {lang === "es" ? slide.h_es : slide.h_en}
            </h1>
            <p className="text-base mb-8 max-w-sm" style={{ color: dark ? "rgba(255,255,255,0.5)" : "#848E9C" }}>
              {lang === "es" ? slide.sub_es : slide.sub_en}
            </p>
            <Link href={slide.cta_href}
              className="inline-block px-7 py-3 rounded-lg font-bold text-white text-sm transition hover:opacity-90"
              style={{ backgroundColor: slide.accent }}>
              {lang === "es" ? slide.cta_es : slide.cta_en}
            </Link>
          </div>

          {/* Right: image placeholder */}
          <div className="hidden md:flex items-center justify-center w-[42%] h-80 rounded-2xl relative overflow-hidden"
            style={{ backgroundColor: `${slide.accent}0d`, border: `1px dashed ${slide.accent}30` }}>
            <slide.Icon className="w-44 h-44 opacity-20" style={{ color: slide.accent }} />
            <span className="absolute bottom-4 text-xs font-medium" style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}>
              {lang === "es" ? "[ Espacio para imagen ]" : "[ Image placeholder ]"}
            </span>
          </div>
        </div>
      </div>

      {/* Prev/Next arrows */}
      <button onClick={() => go(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border transition hover:scale-110"
        style={{ borderColor: `${slide.accent}30`, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)", backgroundColor: "transparent" }}>
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={() => go(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full border transition hover:scale-110"
        style={{ borderColor: `${slide.accent}30`, color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.3)", backgroundColor: "transparent" }}>
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button key={i} onClick={() => { setFading(true); setTimeout(() => { setIdx(i); setFading(false); }, 200); }}
            className="h-0.5 rounded-full transition-all duration-300"
            style={{ width: i === idx ? 28 : 12, backgroundColor: i === idx ? slide.accent : (dark ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.2)") }} />
        ))}
      </div>
    </section>
  );
}

/* ─── Services data ─── */
const SERVICES = [
  { Icon: Bike, color: "#F46E20", title_es: "Viajes en Moto", title_en: "Motorcycle Rides", sub_es: "Rápido, sin atascos", sub_en: "Fast, no traffic", href: "/register?rol=cliente" },
  { Icon: Car, color: "#F0B90B", title_es: "Viajes en Carro", title_en: "Car Rides", sub_es: "Comodidad para todos", sub_en: "Comfort for all", href: "/register?rol=cliente" },
  { Icon: Package, color: "#0EA5E9", title_es: "Delivery Express", title_en: "Express Delivery", sub_es: "Paquetes en minutos", sub_en: "Packages in minutes", href: "/register?rol=cliente" },
  { Icon: Wallet, color: "#22C55E", title_es: "Billetera Digital", title_en: "Digital Wallet", sub_es: "USDT · Bs · PayPal", sub_en: "USDT · Bs · PayPal", href: "/register?rol=cliente" },
  { Icon: Ambulance, color: "#EF4444", title_es: "Emergencias", title_en: "Emergency", sub_es: "Protocolo médico", sub_en: "Medical protocol", href: "/register?rol=cliente" },
  { Icon: Building2, color: "#A855F7", title_es: "Tu Negocio", title_en: "Your Business", sub_es: "Tienda + delivery", sub_en: "Store + delivery", href: "/register?rol=emprendedor" },
];

/* ─── Business feature cards (Xiaomi product highlight) ─── */
const BIZ_FEATURES = [
  { Icon: Building2, color: "#F46E20", title_es: "Perfil de Empresa", title_en: "Business Profile", sub_es: "Crea tu página y catálogo de productos", sub_en: "Create your page and product catalog" },
  { Icon: Package, color: "#0EA5E9", title_es: "Delivery Integrado", title_en: "Integrated Delivery", sub_es: "Nuestra flota entrega tus pedidos", sub_en: "Our fleet delivers your orders" },
  { Icon: Wallet, color: "#22C55E", title_es: "Reportes y Pagos", title_en: "Reports & Payments", sub_es: "Facturación centralizada y pagos digitales", sub_en: "Centralized billing and digital payments" },
  { Icon: Globe, color: "#F0B90B", title_es: "Mayor Alcance", title_en: "Wider Reach", sub_es: "Llega a más clientes con la app", sub_en: "Reach more customers through the app" },
];

/* ─── Social icons ─── */
function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="p-2 rounded-lg text-[#848E9C] hover:text-white hover:bg-white/5 transition" aria-label={label}>
      {children}
    </a>
  );
}
function FbIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>; }
function XIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 transition-colors group-hover:text-white dark:group-hover:text-white"> <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /> </svg>; }
function IgIcon() { return <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>; }

/* ═══════════════════════════════════════ */
/*  PAGE                                   */
/* ═══════════════════════════════════════ */
export default function Home() {
  const { lang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    // detect theme from document class
    const observe = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    observe.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    setDark(document.documentElement.classList.contains("dark"));
    return () => { window.removeEventListener("scroll", onScroll); observe.disconnect(); };
  }, []);

  const stats = [
    { value: "10K+", label_es: "Viajes completados", label_en: "Completed rides", Icon: TrendingUp },
    { value: "500+", label_es: "Conductores activos", label_en: "Active drivers", Icon: Bike },
    { value: "200+", label_es: "Negocios registrados", label_en: "Registered businesses", Icon: Building2 },
    { value: "24/7", label_es: "Disponibilidad", label_en: "Availability", Icon: Globe },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--velocity-bg)] text-[var(--velocity-text)]">

      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled
        ? "bg-[var(--velocity-bg)]/80 backdrop-blur-md shadow-sm border-b border-[var(--velocity-border)]"
        : "bg-transparent border-b border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2">
            <LocationIconOrange size={28} className="flex-shrink-0" />
            <span className="font-bold text-base text-[var(--velocity-text)] leading-none hidden sm:inline">VeloZeety</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {[
              [lang === "es" ? "Viajes" : "Rides", "/register?rol=cliente"],
              [lang === "es" ? "Conducir" : "Drive", "/register?rol=conductor"],
              [lang === "es" ? "Empresas" : "Business", "/register?rol=emprendedor"],
              [lang === "es" ? "Nosotros" : "About", "/about"],
            ].map(([label, href]) => (
              <Link key={href} href={href}
                className="text-sm font-medium text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/login"
              className="hidden sm:inline text-sm font-semibold text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition px-3 py-1.5 rounded-lg hover:bg-[var(--velocity-border)] cursor-pointer relative z-20">
              {lang === "es" ? "Iniciar sesión" : "Sign in"}
            </Link>
            <RegisterDropdown lang={lang} />
          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-14" />

      {/* ─── HERO CAROUSEL ─── */}
      <HeroCarousel lang={lang} dark={dark} />

      {/* ─── STATS ─── */}
      <section className="border-y border-[var(--velocity-border)] bg-[var(--velocity-surface)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--velocity-border)]">
            {stats.map(({ value, label_es, label_en, Icon }, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <div className="w-9 h-9 rounded-lg bg-[#F46E20]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#F46E20]" />
                </div>
                <div>
                  <p className="text-lg font-black text-[var(--velocity-text)]">{value}</p>
                  <p className="text-[11px] text-[var(--velocity-muted)] font-medium">{lang === "es" ? label_es : label_en}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PARTNERS MARQUEE ─── */}
      <section className="py-10 border-b border-[var(--velocity-border)] bg-[var(--velocity-surface)] overflow-hidden flex items-center gap-12 whitespace-nowrap hidden sm:flex">
        <div className="flex gap-16 items-center animate-scroll shrink-0 pl-12">
          {[
            { icon: Building2, name: "SuperMarket+" },
            { icon: ShoppingBag, name: "ModaExpress" },
            { icon: Bus, name: "Transporte Nacional" },
            { icon: Shield, name: "Seguros Andes" },
            { icon: Cpu, name: "ElectroTec" },
            { icon: TrendingUp, name: "Finanzas Capital" },
            { icon: Activity, name: "Clinica Salud" },
            // Repeat for smooth loop effect
            { icon: Building2, name: "SuperMarket+" },
            { icon: ShoppingBag, name: "ModaExpress" },
            { icon: Bus, name: "Transporte Nacional" },
            { icon: Shield, name: "Seguros Andes" },
          ].map((partner, i) => (
            <div key={i} className="flex items-center gap-3 text-[var(--velocity-muted)] hover:text-[#F46E20] transition-colors cursor-pointer group">
              <partner.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg tracking-tight">{partner.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICES GRID ─── */}
      <section className="py-16 bg-[var(--velocity-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-bold text-[#F46E20] uppercase tracking-widest mb-1">
                {lang === "es" ? "Nuestros servicios" : "Our services"}
              </p>
              <h2 className="text-2xl md:text-3xl font-black text-[var(--velocity-text)]">
                {lang === "es" ? "Todo en una sola app" : "Everything in one app"}
              </h2>
            </div>
            <Link href="/register?rol=cliente" className="text-sm font-bold text-[#F46E20] hover:underline flex items-center gap-1">
              {lang === "es" ? "Ver todos" : "See all"} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 2 large cards */}
          <div className="grid md:grid-cols-2 gap-3 mb-3">
            {SERVICES.slice(0, 2).map(({ Icon, color, title_es, title_en, sub_es, sub_en, href }, i) => (
              <Link key={i} href={href}
                className="group relative rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-surface)] p-7 overflow-hidden flex items-start justify-between hover:border-[#F46E20]/30 transition">
                <div className="z-10">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${color}18` }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <h3 className="text-lg font-black text-[var(--velocity-text)] mb-1">{lang === "es" ? title_es : title_en}</h3>
                  <p className="text-sm text-[var(--velocity-muted)] mb-4">{lang === "es" ? sub_es : sub_en}</p>
                  <span className="text-sm font-bold flex items-center gap-1 transition-colors" style={{ color }}>
                    {lang === "es" ? "Empezar" : "Get started"} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                {/* Large icon placeholder (right side) */}
                <div className="hidden md:flex items-center justify-center w-28 h-24 rounded-lg ml-4 flex-shrink-0"
                  style={{ backgroundColor: `${color}0a`, border: `1px dashed ${color}25` }}>
                  <Icon className="w-14 h-14 opacity-15" style={{ color }} />
                </div>
              </Link>
            ))}
          </div>

          {/* 4 smaller cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SERVICES.slice(2).map(({ Icon, color, title_es, title_en, sub_es, sub_en, href }, i) => (
              <Link key={i} href={href}
                className="group rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-surface)] p-5 hover:border-[#F46E20]/30 transition">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${color}18` }}>
                  <Icon className="w-4 h-4" style={{ color }} />
                </div>
                <h3 className="font-black text-sm text-[var(--velocity-text)] mb-0.5">{lang === "es" ? title_es : title_en}</h3>
                <p className="text-xs text-[var(--velocity-muted)]">{lang === "es" ? sub_es : sub_en}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DRIVER FEATURE ─── */}
      <section className="border-t border-[var(--velocity-border)] bg-[var(--velocity-surface)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <p className="text-xs font-bold text-[#F46E20] uppercase tracking-widest mb-3">
                {lang === "es" ? "Para conductores" : "For drivers"}
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-[var(--velocity-text)] mb-4 leading-tight">
                {lang === "es" ? "Conduce cuando quieras,\ngana lo que necesitas" : "Drive when you want,\nearn what you need"}
              </h2>
              <p className="text-[var(--velocity-muted)] mb-7 max-w-sm">
                {lang === "es"
                  ? "Horario 100% flexible. Pagos semanales. Soporte 24/7."
                  : "100% flexible schedule. Weekly payments. 24/7 support."}
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {(lang === "es"
                  ? ["✓ Sin mínimo de horas", "✓ Pagos semanales", "✓ Seguro"]
                  : ["✓ No minimum hours", "✓ Weekly payments", "✓ Insurance"]
                ).map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full text-xs font-semibold border border-[var(--velocity-border)] text-[var(--velocity-muted)]">{item}</span>
                ))}
              </div>
              <Link href="/register?rol=conductor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white text-sm transition hover:opacity-90"
                style={{ backgroundColor: "#F46E20" }}>
                {lang === "es" ? "Comenzar a conducir" : "Start driving"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Image placeholder */}
            <div className="rounded-lg border border-dashed border-[var(--velocity-border)] flex items-center justify-center h-64 relative overflow-hidden bg-[var(--velocity-bg)]">
              <Car className="w-24 h-24 text-[#F46E20] opacity-15" />
              <span className="absolute bottom-4 text-xs text-[var(--velocity-muted)]">
                {lang === "es" ? "[ Imagen del conductor ]" : "[ Driver image ]"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BUSINESS — Xiaomi "featured products" style ─── */}
      <section className="py-16 bg-[var(--velocity-bg)] border-t border-[var(--velocity-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-bold text-[#F0B90B] uppercase tracking-widest mb-1">
              {lang === "es" ? "Para emprendedores" : "For entrepreneurs"}
            </p>
            <div className="flex items-end justify-between">
              <h2 className="text-2xl md:text-3xl font-black text-[var(--velocity-text)]">
                {lang === "es" ? "VeloZeety para tu empresa" : "VeloZeety for your business"}
              </h2>
              <Link href="/register?rol=emprendedor" className="text-sm font-bold text-[#F0B90B] hover:underline flex items-center gap-1">
                {lang === "es" ? "Más info" : "Learn more"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Hero card + 4 features (Xiaomi product-highlight style) */}
          <div className="grid lg:grid-cols-5 gap-3">
            {/* Main promo card */}
            <div className="lg:col-span-2 rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-surface)] p-7 flex flex-col justify-between relative overflow-hidden min-h-[260px]">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10"
                style={{ background: "#F0B90B", transform: "translate(30%,-30%)" }} />
              <div>
                <div className="w-10 h-10 rounded-lg bg-[#F0B90B]/15 flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 text-[#F0B90B]" />
                </div>
                <h3 className="font-black text-xl text-[var(--velocity-text)] mb-2">
                  {lang === "es" ? "Abre tu tienda hoy" : "Open your store today"}
                </h3>
                <p className="text-sm text-[var(--velocity-muted)]">
                  {lang === "es"
                    ? "Crea tu perfil de negocio, sube tu catálogo y empieza a vender con delivery integrado."
                    : "Create your business profile, upload your catalog and start selling with integrated delivery."}
                </p>
              </div>
              <Link href="/register"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold transition" style={{ color: "#F0B90B" }}>
                {lang === "es" ? "Registrar mi negocio" : "Register my business"} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* 4 feature cards */}
            <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3">
              {BIZ_FEATURES.map(({ Icon, color, title_es, title_en, sub_es, sub_en }, i) => (
                <div key={i} className="rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-surface)] p-5 hover:border-[#F0B90B]/30 transition">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: `${color}15` }}>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <h4 className="font-black text-sm text-[var(--velocity-text)] mb-1">{lang === "es" ? title_es : title_en}</h4>
                  <p className="text-xs text-[var(--velocity-muted)]">{lang === "es" ? sub_es : sub_en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP — animated and alive ─── */}
      <section className="py-20 bg-[var(--velocity-surface)] relative overflow-hidden">
        {/* Subtle background glows */}
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#F46E20]/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-[var(--velocity-text)] mb-4 tracking-tight">
              {lang === "es" ? "Seguridad y soporte en cada kilómetro" : "Safety and support in every mile"}
            </h2>
            <p className="text-[var(--velocity-muted)] max-w-2xl mx-auto text-lg">
              {lang === "es"
                ? "Diseñamos un ecosistema donde viajas y pagas con absoluta tranquilidad."
                : "We designed an ecosystem where you travel and pay with absolute peace of mind."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Shield, label_es: "Conductores verificados", label_en: "Verified drivers", desc_es: "Auditoría de antecedentes, ID y validación facial cruzada para cada conductor en la plataforma.", desc_en: "Background audit, ID and cross-facial validation for every driver." },
              { Icon: Wallet, label_es: "Pagos blindados", label_en: "Shielded payments", desc_es: "Tus fondos en USDT o Fiat están protegidos por encriptación bancaria de última generación.", desc_en: "Your USDT or Fiat funds are protected by next-gen bank encryption." },
              { Icon: HeadphonesIcon, label_es: "Soporte inmediato", label_en: "Immediate support", desc_es: "Agentes en vivo 24/7 dispuestos a resolver cualquier inconveniente con tu viaje o billetera.", desc_en: "Live agents 24/7 ready to solve any issue with your ride or wallet." },
              { Icon: Zap, label_es: "Infraestructura ágil", label_en: "Agile infrastructure", desc_es: "Asignación inteligente de tu viaje o delivery al socio más cercano para ahorrar tiempo valioso.", desc_en: "Smart assignment of your ride to the closest partner to save time." },
            ].map(({ Icon, label_es, label_en, desc_es, desc_en }, i) => (
              <div key={i} className="group bg-[var(--velocity-bg)] p-8 rounded-2xl border border-[var(--velocity-border)] hover:border-[#F46E20]/30 hover:shadow-2xl hover:shadow-[#F46E20]/10 hover:-translate-y-2 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[var(--velocity-surface)] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Icon className="w-7 h-7 text-[#F46E20]" />
                </div>
                <h3 className="font-black text-xl text-[var(--velocity-text)] mb-3">{lang === "es" ? label_es : label_en}</h3>
                <p className="text-sm text-[var(--velocity-muted)] leading-relaxed">{lang === "es" ? desc_es : desc_en}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── APP DOWNLOAD ─── */}
      <section className="py-16 bg-[var(--velocity-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-[var(--velocity-border)] bg-[#0B0E11] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#F46E20] text-xs font-bold uppercase tracking-widest mb-2">
                {lang === "es" ? "Disponible ahora" : "Available now"}
              </p>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-3">
                {lang === "es" ? "Todo más fácil en la app" : "Everything easier in the app"}
              </h2>
              <p className="text-white/50 max-w-sm">
                {lang === "es" ? "Pide viajes, paga con tu wallet y sigue todo en tiempo real." : "Request rides, pay with your wallet and track everything in real time."}
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-2 bg-white rounded-lg">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent("https://velozeety.com/download")}&color=F46E20`}
                  alt="QR VeloZeety" className="w-28 h-28 rounded" />
              </div>
              <div className="flex gap-2">
                <a href="#" className="hover:opacity-80 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-9 w-auto" /></a>
                <a href="#" className="hover:opacity-80 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-9 w-auto" /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER — Restored, enterprise style ─── */}
      <footer className="bg-[#0B0E11] text-[#EAECEF] pt-14 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 mb-12">
            {/* Brand + description */}
            <div className="max-w-xs">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <LocationIconOrange size={30} />
                <span className="text-xl font-black text-white">VeloZeety</span>
              </Link>
              <p className="text-sm text-[#848E9C] leading-relaxed">
                {lang === "es"
                  ? "La plataforma multi-servicios que mueve tu ciudad. Transporte, delivery, billetera digital y mucho más."
                  : "The multi-service platform that moves your city. Transport, delivery, digital wallet and much more."}
              </p>
              <div className="flex gap-1 mt-5">
                <SocialIcon href="https://x.com/VZeety" label="X"><XIcon /></SocialIcon>
                <SocialIcon href="https://instagram.com/velozeety" label="Instagram"><IgIcon /></SocialIcon>
                <SocialIcon href="https://linkedin.com/company/velozeety" label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg></SocialIcon>
              </div>
            </div>

            {/* Link columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              {[
                {
                  title: lang === "es" ? "Empresa" : "Company", links: [
                    [lang === "es" ? "Nosotros" : "About", "/about"],
                    [lang === "es" ? "Blog" : "Blog", "/blog"],
                    [lang === "es" ? "Empleos" : "Careers", "/careers"],
                    [lang === "es" ? "Ayuda" : "Help", "/help"],
                  ]
                },
                {
                  title: lang === "es" ? "Productos" : "Products", links: [
                    [lang === "es" ? "Viajes" : "Trips", "/register?rol=cliente"],
                    [lang === "es" ? "Conducir" : "Drive", "/register?rol=conductor"],
                    [lang === "es" ? "VeloZeety Empresas" : "VeloZeety Business", "/register?rol=emprendedor"],
                    [lang === "es" ? "Tienda y servicios" : "Store & services", "/register?rol=cliente"],
                  ]
                },
                {
                  title: lang === "es" ? "Ciudad" : "City", links: [
                    [lang === "es" ? "Cobertura" : "Coverage", "/cities"],
                    [lang === "es" ? "Paradas" : "Stops", "/stops"],
                    [lang === "es" ? "Seguridad" : "Safety", "/safety"],
                  ]
                },
                {
                  title: lang === "es" ? "Viajes" : "Rides", links: [
                    [lang === "es" ? "Reservar" : "Reserve", "/register?rol=cliente"],
                    [lang === "es" ? "Terminal" : "Terminal", "/register?rol=cliente"],
                    [lang === "es" ? "Privacidad" : "Privacy", "/privacy"],
                    [lang === "es" ? "Términos" : "Terms", "/terms"],
                  ]
                },
              ].map(({ title, links }) => (
                <div key={title}>
                  <h4 className="font-bold text-sm mb-4 text-white">{title}</h4>
                  <ul className="space-y-2.5">
                    {links.map(([label, href]) => (
                      <li key={href}><Link href={href} className="text-sm text-[#848E9C] hover:text-white transition">{label}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/8">
            <div className="flex gap-1 items-center">

            </div>
            <div className="flex gap-2">
              <a href="#" className="hover:opacity-80 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 w-auto" /></a>
              <a href="#" className="hover:opacity-80 transition"><img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 w-auto" /></a>
            </div>
          </div>
          <p className="mt-5 text-xs text-[#848E9C] text-center md:text-left">
            © {new Date().getFullYear()} VeloZeety C.A. — {lang === "es" ? "Tu ciudad en movimiento" : "Your city in motion"}.
            {" "}<Link href="/privacy" className="hover:text-white transition">{lang === "es" ? "Privacidad" : "Privacy"}</Link>
            {" · "}<Link href="/terms" className="hover:text-white transition">{lang === "es" ? "Términos" : "Terms"}</Link>
            {" · "}<Link href="/accessibility" className="hover:text-white transition">{lang === "es" ? "Accesibilidad" : "Accessibility"}</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
