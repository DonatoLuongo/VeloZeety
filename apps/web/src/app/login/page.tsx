"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Bike, Building2, Eye, EyeOff } from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";

type Rol = "cliente" | "conductor" | "emprendedor";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rol, setRol] = useState<Rol>("cliente");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/auth/login", {
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
      // Fallback local (sin servidor)
      localStorage.setItem("velocity_user", JSON.stringify({ email, rol }));
      router.push("/app");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-[#222831] transition-colors duration-300">
      {/* Panel izquierdo: visual corporativo */}
      <div className="hidden md:flex md:w-[42%] relative overflow-hidden bg-gradient-to-br from-[#3F474A] via-[#2f3538] to-[#1a1d1f] dark:from-[#0a0c10] dark:via-[#12151a] dark:to-[#393E46]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_20%_20%,rgba(244,110,32,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_80%,rgba(91,164,212,0.12),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#F46E20]/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-[#5BA4D4]/10 blur-2xl animate-pulse-slow" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-white">
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-2">VeloZeety</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            Tu ciudad en movimiento
          </h2>
          <p className="text-white/70 text-base max-w-sm">
            Gestiona viajes, billetera y negocio desde un solo lugar. Cliente, conductor o emprendedor.
          </p>
        </div>
      </div>

      {/* Panel derecho: formulario */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-100 dark:border-white/5">
          <Link href="/" className="flex items-center gap-2.5">
            <LocationIconOrange size={36} />
            <span className="font-bold text-lg text-[#3F474A] dark:text-white">Cuenta VeloZeety</span>
          </Link>
          <nav className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <ThemeToggle />
            <Link href="/" className="hover:text-[#3F474A] dark:hover:text-white transition">¿Ayuda?</Link>
          </nav>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 md:p-10">
          <div className="w-full max-w-md animate-fade-in-up">
            <div className="flex border-b border-slate-200 dark:border-white/10 mb-8">
              <Link
                href="/login"
                className="pb-3 px-1 text-base font-semibold text-[#3F474A] dark:text-white border-b-2 border-[#F46E20] -mb-px"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/register"
                className="pb-3 px-1 text-base font-medium text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 ml-6 transition"
              >
                Registrarse
              </Link>
            </div>

            <h1 className="text-xl font-bold text-[#3F474A] dark:text-white mb-1">Iniciar sesión</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">Elige el tipo de cuenta e ingresa tus datos</p>

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
                  className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${rol === id
                    ? "border-[#F46E20] bg-[#F46E20]/5 dark:bg-[#F46E20]/10 text-[#3F474A] dark:text-white shadow-lg shadow-[#F46E20]/10"
                    : "border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#3F474A] dark:text-slate-200 mb-1.5">
                  Correo o teléfono
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#3F474A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#3F474A] dark:text-slate-200 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 pr-11 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-[#3F474A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-[#3F474A] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition"
                    aria-label={showPassword ? "Ocultar contraseña" : "Ver contraseña"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white bg-[#F46E20] hover:bg-[#e36318] disabled:opacity-50 transition shadow-lg shadow-[#F46E20]/20 dark:shadow-[#F46E20]/10"
              >
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm font-medium text-[#F46E20] hover:underline">
                ¿Olvidaste la contraseña?
              </Link>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
              <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                ¿No tienes cuenta?{" "}
                <Link href="/register" className="font-semibold text-[#F46E20] hover:underline">
                  Regístrate
                </Link>
              </p>
            </div>

            <Link href="/" className="mt-6 block text-center text-sm text-slate-500 dark:text-slate-400 hover:text-[#3F474A] dark:hover:text-white transition">
              ← Volver al inicio
            </Link>
          </div>
        </main>

        <footer className="py-4 text-center text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-white/5">
          VeloZeety. Tu ciudad en movimiento.
        </footer>
      </div>
    </div>
  );
}
