"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bike, Eye, EyeOff } from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

type Rol = "cliente" | "conductor";

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState<Rol>("cliente");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("velocity_token", data.access_token);
        localStorage.setItem("velocity_user", JSON.stringify(data.user));
        router.push("/app");
      } else {
        alert(data.message || "Error al iniciar sesión");
      }
    } catch {
      localStorage.setItem("velocity_user", JSON.stringify({ email, rol }));
      router.push("/app");
    } finally {
      setLoading(false);
    }
  };

  const INPUT = "w-full px-4 py-3 rounded-lg border border-[var(--velocity-border)] bg-[var(--velocity-surface)] text-[var(--velocity-text)] placeholder:text-[var(--velocity-muted)] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-sm";

  return (
    <div className="min-h-screen flex flex-col bg-[var(--velocity-bg)] transition-colors duration-300">

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-[60] flex items-center justify-between px-4 md:px-8 py-4 pointer-events-none">
        <Link href="/" className="flex items-center gap-2 pointer-events-auto">
          <LocationIconOrange size={30} className="flex-shrink-0" />
          <span className="font-bold text-base text-[var(--velocity-text)] lg:text-white leading-none mt-[3px]">{t(lang, "login_account_label")}</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm text-[var(--velocity-muted)] pointer-events-auto">
          <LanguageToggle />
          <ThemeToggle />
          <Link href="/about" className="px-3 py-2 rounded-lg hover:text-[var(--velocity-text)] transition text-sm">
            {t(lang, "login_help")}
          </Link>
        </nav>
      </header>

      {/* Main layout */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-screen">

        {/* Left Decorative Panel */}
        <div className="hidden lg:flex lg:w-[44%] relative overflow-hidden bg-[#0B0E11]">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#F46E20] opacity-30 blur-[100px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-[#F0B90B] opacity-20 blur-[100px]" />
          </div>
          <div className="absolute inset-0 opacity-[0.05] z-0 pointer-events-none"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          <div className="relative z-10 flex flex-col justify-center p-12 h-full w-full">

            <div>
              <p className="text-[#F46E20] text-xs font-bold uppercase tracking-[0.3em] mb-3">
                {t(lang, "login_panel_tag")}
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                {t(lang, "login_panel_title")}
              </h2>
              <p className="text-white/60 text-base max-w-sm">
                {t(lang, "login_panel_desc")}
              </p>
              <div className="flex flex-wrap gap-2 mt-8">
                {(lang === "es"
                  ? ["🚗 Viajes en moto y carro", "💳 Billetera digital", "🛒 Delivery express", "🏪 Negocios"]
                  : ["🚗 Moto & car rides", "💳 Digital wallet", "🛒 Express delivery", "🏪 Business"]
                ).map((pill) => (
                  <span key={pill} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/8 border border-white/10 text-white/70">{pill}</span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-center"><p className="text-2xl font-bold text-white">10K+</p><p className="text-xs text-white/40">{lang === "es" ? "Viajes" : "Trips"}</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-white">500+</p><p className="text-xs text-white/40">{lang === "es" ? "Conductores" : "Drivers"}</p></div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center"><p className="text-2xl font-bold text-white">24/7</p><p className="text-xs text-white/40">{lang === "es" ? "Disponible" : "Available"}</p></div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-10 pt-24 lg:pt-10 bg-[var(--velocity-bg)] relative z-20">
          <div className="w-full max-w-md">

            {/* Tabs */}
            <div className="flex border-b border-[var(--velocity-border)] mb-8 relative z-20">
              <span className="pb-3 px-1 text-base font-bold text-[var(--velocity-text)] border-b-2 border-[#F46E20] -mb-px">
                {t(lang, "login_title")}
              </span>
              <Link href="/register"
                className="pb-3 px-1 text-base font-medium text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] ml-6 transition cursor-pointer relative z-50 pointer-events-auto block">
                {t(lang, "login_register_link")}
              </Link>
            </div>

            <h1 className="text-2xl font-bold text-[var(--velocity-text)] mb-1">{t(lang, "login_title")}</h1>
            <p className="text-[var(--velocity-muted)] text-sm mb-7">{t(lang, "login_subtitle")}</p>

            {/* 2-role selector (no Emprendedor) */}
            <div className="grid grid-cols-2 gap-3 mb-7">
              {([
                { id: "cliente" as const, labelKey: "login_role_client" as const, Icon: User },
                { id: "conductor" as const, labelKey: "login_role_driver" as const, Icon: Bike },
              ]).map(({ id, labelKey, Icon }) => (
                <button key={id} type="button" onClick={() => setRol(id)}
                  className={`flex flex-col items-center gap-1.5 py-3.5 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${rol === id
                    ? "border-[#F46E20] bg-[#F46E20]/8 text-[var(--velocity-text)] shadow-md shadow-[#F46E20]/10"
                    : "border-[var(--velocity-border)] text-[var(--velocity-muted)] hover:border-[#F46E20]/30"
                    }`}>
                  <Icon className={`w-5 h-5 ${rol === id ? "text-[#F46E20]" : ""}`} />
                  {t(lang, labelKey)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
                  {t(lang, "login_email_label")}
                </label>
                <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder={t(lang, "login_email_placeholder")} required className={INPUT} />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-[var(--velocity-text)] mb-1.5">
                  {t(lang, "login_pass_label")}
                </label>
                <div className="relative">
                  <input id="login-password" type={showPassword ? "text" : "password"} value={password}
                    onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required
                    className={INPUT + " pr-12"} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition flex items-center justify-center"
                    aria-label={showPassword ? "Ocultar" : "Ver"}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Link href="/" className="text-sm font-semibold text-[#F46E20] hover:underline">
                  {t(lang, "login_forgot")}
                </Link>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 rounded-lg font-bold text-white text-base disabled:opacity-50 transition shadow-lg shadow-[#F46E20]/20"
                style={{ backgroundColor: "#F46E20" }}>
                {loading ? t(lang, "login_loading") : t(lang, "login_submit")}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-[var(--velocity-border)] text-center">
              <p className="text-sm text-[var(--velocity-muted)]">
                {t(lang, "login_no_account")}{" "}
                <Link href="/register" className="font-bold text-[#F46E20] hover:underline">
                  {t(lang, "login_signup")}
                </Link>
              </p>
            </div>

            <Link href="/" className="mt-4 block text-center text-sm text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] transition">
              {t(lang, "login_back")}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
