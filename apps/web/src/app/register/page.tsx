"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BRAND } from "@velocity/shared";
import { User, Bike, Building2, Eye, EyeOff } from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";

type Rol = "cliente" | "conductor" | "emprendedor";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState<Rol>("cliente");

  useEffect(() => {
    const r = searchParams.get("rol");
    if (r === "emprendedor" || r === "conductor" || r === "cliente") setRol(r);
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.setItem("velocity_user", JSON.stringify({ email, fullName, phone, rol }));
    }
    if (rol === "emprendedor") router.push("/app/empresa");
    else router.push("/app");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Panel izquierdo: visual corporativo */}
      <div className="hidden md:flex md:w-[42%] relative overflow-hidden bg-gradient-to-br from-[#3F474A] via-[#2f3538] to-[#1a1d1f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_20%,rgba(244,110,32,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(91,164,212,0.12),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F46E20]/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#5BA4D4]/10 blur-2xl" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">VeloCity</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Crea tu cuenta
          </h2>
          <p className="text-white/70 text-base max-w-sm">
            Viajes, conducir o tu negocio: una sola app. Elige cómo quieres usar VeloCity.
          </p>
        </div>
      </div>

      {/* Panel derecho: formulario */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-2.5">
            <LocationIconOrange size={36} />
            <span className="font-bold text-lg text-[#3F474A]">Cuenta VeloCity</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm text-slate-500">
            <Link href="/" className="hover:text-[#3F474A] transition">¿Necesitas ayuda?</Link>
            <Link href="/" className="hover:text-[#3F474A] transition">Idioma</Link>
          </nav>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 md:p-10 overflow-y-auto">
          <div className="w-full max-w-md">
            <div className="flex border-b border-slate-200 mb-8">
              <Link
                href="/login"
                className="pb-3 px-1 text-base font-medium text-slate-400 hover:text-slate-600 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="pb-3 px-1 text-base font-semibold text-[#3F474A] border-b-2 border-[#F46E20] -mb-px ml-6"
              >
                Registrarse
              </Link>
            </div>

            <h1 className="text-xl font-bold text-[#3F474A] mb-1">Crear cuenta</h1>
            <p className="text-slate-500 text-sm mb-6">Cliente, conductor o emprendedor</p>

            <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: "cliente" as const, label: "Cliente", Icon: User },
                { id: "conductor" as const, label: "Conductor", Icon: Bike },
                { id: "emprendedor" as const, label: "Emprendedor", Icon: Building2 },
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRol(id)}
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition ${
                    rol === id
                      ? "border-[#F46E20] bg-[#F46E20]/5 text-[#3F474A]"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#3F474A] mb-1.5">
                  Nombre completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Juan Pérez"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#3F474A] placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3F474A] mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#3F474A] placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#3F474A] mb-1.5">
                  Teléfono
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+58 424 123 4567"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-[#3F474A] placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#3F474A] mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    required
                    minLength={8}
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 text-[#3F474A] placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-[#3F474A] hover:bg-slate-100 transition"
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] transition shadow-lg shadow-[#F46E20]/20"
              >
                {rol === "emprendedor" ? "Crear cuenta y registrar empresa" : "Registrarse"}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-center text-sm text-slate-500">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="font-semibold text-[#F46E20] hover:underline">
                  Iniciar sesión
                </Link>
              </p>
            </div>

            <Link href="/" className="mt-6 block text-center text-sm text-slate-500 hover:text-[#3F474A] transition">
              ← Volver al inicio
            </Link>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-400 border-t border-slate-100">
          VeloCity. Tu ciudad en movimiento.
        </footer>
      </div>
    </div>
  );
}
