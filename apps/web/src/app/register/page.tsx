"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Car, Bike, Building2, Eye, EyeOff, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";

type MainRol = "cliente" | "conductor";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLang();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState<MainRol>("cliente");

  // Optional emprendedor section
  const [showEmprendedor, setShowEmprendedor] = useState(false);
  const [bizName, setBizName] = useState("");
  const [bizCategory, setBizCategory] = useState("");
  const [bizAddress, setBizAddress] = useState("");
  const [bizPhone, setBizPhone] = useState("");

  useEffect(() => {
    const r = searchParams.get("rol");
    if (r === "conductor") setRol("conductor");
    else setRol("cliente");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      email, fullName, phone, rol,
      emprendedor: showEmprendedor && bizName ? {
        bizName, bizCategory, bizAddress, bizPhone,
        status: "pending_verification",
      } : null,
    };
    if (typeof window !== "undefined") {
      localStorage.setItem("velocity_user", JSON.stringify(userData));
    }
    router.push("/app");
  };

  const INPUT = "w-full px-4 py-3 rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-bg)] text-[var(--velocity-text)] placeholder:text-[var(--velocity-muted)] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-sm";

  return (
    <div className="w-full max-w-md">
      {/* Tab row */}
      <div className="flex border-b border-[var(--velocity-border)] mb-8 relative z-20">
        <Link href="/login"
          className="pb-3 px-1 text-base font-medium text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition cursor-pointer relative z-50 pointer-events-auto block">
          {lang === "es" ? "Iniciar sesión" : "Sign in"}
        </Link>
        <Link href="/register"
          className="pb-3 px-1 text-base font-bold text-[var(--velocity-text)] border-b-2 border-[#F46E20] -mb-px ml-6">
          {lang === "es" ? "Registrarse" : "Sign up"}
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-[var(--velocity-text)] mb-1">
        {lang === "es" ? "Crear cuenta" : "Create account"}
      </h1>
      <p className="text-[var(--velocity-muted)] text-sm mb-7">
        {lang === "es" ? "¿Eres pasajero o conductor?" : "Are you a passenger or a driver?"}
      </p>

      {/* 2-role selector */}
      <div className="grid grid-cols-2 gap-3 mb-7">
        {([
          { id: "cliente" as const, label: lang === "es" ? "Viajero" : "Rider", desc: lang === "es" ? "Pedir viajes" : "Request rides", Icon: Car },
          { id: "conductor" as const, label: lang === "es" ? "Conductor" : "Driver", desc: lang === "es" ? "Ganar con tu vehículo" : "Earn with your vehicle", Icon: Bike },
        ] as const).map(({ id, label, desc, Icon }) => (
          <button key={id} type="button" onClick={() => setRol(id)}
            className={`flex flex-col items-center gap-2 py-4 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${rol === id
              ? "border-[#F46E20] bg-[#F46E20]/8 text-[var(--velocity-text)] shadow-md shadow-[#F46E20]/10"
              : "border-[var(--velocity-border)] text-[var(--velocity-muted)] hover:border-[#F46E20]/40"
              }`}>
            <Icon className={`w-6 h-6 ${rol === id ? "text-[#F46E20]" : ""}`} />
            <span className="font-bold">{label}</span>
            <span className="text-xs font-normal opacity-70">{desc}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fullName" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
            {lang === "es" ? "Nombre completo" : "Full name"}
          </label>
          <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
            placeholder="Juan Pérez" required className={INPUT} />
        </div>
        <div>
          <label htmlFor="reg-email" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
            {lang === "es" ? "Correo electrónico" : "Email"}
          </label>
          <input id="reg-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com" required className={INPUT} />
        </div>
        <div>
          <label htmlFor="reg-phone" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
            {lang === "es" ? "Teléfono" : "Phone"}
          </label>
          <input id="reg-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="+58 424 123 4567" className={INPUT} />
        </div>
        <div>
          <label htmlFor="reg-password" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
            {lang === "es" ? "Contraseña" : "Password"}
          </label>
          <div className="relative">
            <input id="reg-password" type={showPassword ? "text" : "password"} value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder={lang === "es" ? "Mínimo 8 caracteres" : "At least 8 characters"}
              required minLength={8} className={INPUT + " pr-11"} />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition flex items-center justify-center"
              aria-label={showPassword ? "Hide" : "Show"}>
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ─── Optional Emprendedor Section ─── */}
        <div className="pt-2">
          <button type="button" onClick={() => setShowEmprendedor(!showEmprendedor)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border-2 transition-all duration-200 ${showEmprendedor
              ? "border-[#F0B90B] bg-[#F0B90B]/8 text-[var(--velocity-text)]"
              : "border-[var(--velocity-border)] text-[var(--velocity-muted)] hover:border-[#F0B90B]/40"
              }`}>
            <div className="flex items-center gap-3">
              <Building2 className={`w-5 h-5 ${showEmprendedor ? "text-[#F0B90B]" : ""}`} />
              <div className="text-left">
                <p className="font-semibold text-sm">
                  {lang === "es" ? "¿Tienes un negocio? (Opcional)" : "Do you have a business? (Optional)"}
                </p>
                <p className="text-xs opacity-70">
                  {lang === "es" ? "Regístralo y empieza a vender con delivery" : "Register it and start selling with delivery"}
                </p>
              </div>
            </div>
            {showEmprendedor ? <ChevronUp className="w-5 h-5 text-[#F0B90B] flex-shrink-0" /> : <ChevronDown className="w-5 h-5 flex-shrink-0" />}
          </button>

          {showEmprendedor && (
            <div className="mt-3 space-y-3 p-4 rounded-lg border border-[#F0B90B]/30 bg-[#F0B90B]/5 animate-slide-up-soft">
              <p className="text-xs font-bold text-[#F0B90B] uppercase tracking-widest">
                {lang === "es" ? "Datos del negocio" : "Business details"}
              </p>
              <div>
                <label className="block text-xs font-semibold text-[var(--velocity-text)] mb-1.5">
                  {lang === "es" ? "Nombre del negocio" : "Business name"} *
                </label>
                <input type="text" value={bizName} onChange={(e) => setBizName(e.target.value)}
                  placeholder={lang === "es" ? "Ej. Pizzería Napoli" : "E.g. Napoli Pizza"}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--velocity-text)] mb-1.5">
                  {lang === "es" ? "Categoría" : "Category"}
                </label>
                <select value={bizCategory} onChange={(e) => setBizCategory(e.target.value)}
                  className={INPUT + " appearance-none"}>
                  <option value="">{lang === "es" ? "Selecciona..." : "Select..."}</option>
                  <option value="food">{lang === "es" ? "Comida y restaurantes" : "Food & restaurants"}</option>
                  <option value="store">{lang === "es" ? "Tienda y retail" : "Store & retail"}</option>
                  <option value="pharmacy">{lang === "es" ? "Farmacia / Salud" : "Pharmacy / Health"}</option>
                  <option value="tech">{lang === "es" ? "Tecnología" : "Technology"}</option>
                  <option value="other">{lang === "es" ? "Otro" : "Other"}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--velocity-text)] mb-1.5">
                  {lang === "es" ? "Dirección del negocio" : "Business address"}
                </label>
                <input type="text" value={bizAddress} onChange={(e) => setBizAddress(e.target.value)}
                  placeholder={lang === "es" ? "Av. Principal, Local 5..." : "123 Main St..."}
                  className={INPUT} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--velocity-text)] mb-1.5">
                  {lang === "es" ? "Teléfono del negocio" : "Business phone"}
                </label>
                <input type="tel" value={bizPhone} onChange={(e) => setBizPhone(e.target.value)}
                  placeholder="+58 424 000 0000" className={INPUT} />
              </div>
              <p className="text-[10px] text-[var(--velocity-muted)] leading-relaxed">
                ⏳ {lang === "es"
                  ? "Tu negocio pasará por un proceso de verificación. Lo activaremos en menos de 48 horas."
                  : "Your business will go through a verification process. We'll activate it within 48 hours."}
              </p>
            </div>
          )}
        </div>

        <button type="submit"
          className="w-full py-4 rounded-lg font-bold text-white text-base transition shadow-xl shadow-[#F46E20]/20"
          style={{ backgroundColor: "#F46E20" }}>
          {lang === "es" ? "Crear cuenta" : "Create account"}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[var(--velocity-border)] text-center">
        <p className="text-sm text-[var(--velocity-muted)]">
          {lang === "es" ? "¿Ya tienes cuenta?" : "Already have an account?"}{" "}
          <Link href="/login" className="font-bold text-[#F46E20] hover:underline">
            {lang === "es" ? "Iniciar sesión" : "Sign in"}
          </Link>
        </p>
      </div>
      <Link href="/" className="mt-4 block text-center text-sm text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition">
        ← {lang === "es" ? "Volver al inicio" : "Back to home"}
      </Link>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--velocity-bg)] transition-colors">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 md:px-8 py-4 pointer-events-none">
        <Link href="/" className="flex items-center gap-2.5 pointer-events-auto">
          <LocationIconOrange size={32} />
          <span className="font-bold text-base text-[var(--velocity-text)] lg:text-white mt-[3px]">VeloZeety</span>
        </Link>
        <nav className="flex items-center gap-3 text-sm text-[var(--velocity-muted)] pointer-events-auto">
          <ThemeToggle />
        </nav>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row min-h-screen">
        {/* Left decorative panel */}
        <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden bg-[#0B0E11]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F46E20] opacity-30 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#F0B90B] opacity-20 blur-[100px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative z-10 flex flex-col justify-center p-12 h-full w-full">

            <div>
              <p className="text-[#F46E20] text-xs font-bold uppercase tracking-[0.3em] mb-3">VeloZeety</p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Únete a la red
              </h2>
              <p className="text-white/60 text-base max-w-sm">
                Pide viajes, conduce y gestiona tu negocio desde una sola app. Sin complicaciones.
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {["🚗 Viajes rápidos", "💳 Billetera digital", "🛒 Delivery express", "🏪 Tu negocio"].map((pill) => (
                  <span key={pill} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/8 border border-white/10 text-white/70">{pill}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center"><p className="text-2xl font-bold text-white">10K+</p><p className="text-xs text-white/40">Viajes</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-white">500+</p><p className="text-xs text-white/40">Conductores</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-white">24/7</p><p className="text-xs text-white/40">Disponible</p></div>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 pt-24 lg:pt-10 relative z-20">
          <Suspense fallback={
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-[#F46E20] animate-spin" />
              <p className="text-[var(--velocity-muted)] text-sm">Cargando...</p>
            </div>
          }>
            <RegisterForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
