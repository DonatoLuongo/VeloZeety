"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Package, User, Building2, LayoutGrid, AlertTriangle, Menu, X, Settings } from "lucide-react";
import { BRAND } from "@velocity/shared";
import ExitButton from "@/components/ExitButton";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

const navBase = [
  { href: "/app", key: "nav_home", Icon: Home, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/envios", key: "nav_shipments", Icon: Package, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/billetera", key: "nav_wallet", Icon: Wallet, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/servicios", key: "nav_services", Icon: LayoutGrid, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/emergencia", key: "nav_emergency", Icon: AlertTriangle, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/empresa", key: "nav_company", Icon: Building2, roles: ["emprendedor", "cliente", "conductor"] },
  { href: "/app/perfil", key: "nav_profile", Icon: User, roles: ["cliente", "conductor", "emprendedor"] },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { lang } = useLang();
  const [rol, setRol] = useState<string>("cliente");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = JSON.parse(localStorage.getItem("velocity_user") || "{}");
    if (user.rol) setRol(user.rol);
  }, []);

  // Cierra el menú al navegar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const nav = navBase.filter(item => item.roles.includes(rol));

  // Neo-Bank Bottom Nav (Solo 3 botones principales)
  const bottomNavItems = nav.slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-velocity-bg transition-colors">

      {/* ─── HEADER DESKTOP ─── */}
      <header className="hidden md:flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1E2329] border-b border-slate-200 dark:border-[#2B3139] shadow-sm dark:shadow-none transition-colors z-30">
        <div className="flex-1 flex items-center">
          <Link href="/app" className="flex items-center gap-2 w-max">
            <LocationIconOrange size={32} />
            <span className="font-semibold text-lg text-slate-800 dark:text-white">VeloZeety</span>
          </Link>
        </div>

        <nav className="flex-1 flex justify-center items-center gap-1">
          {nav.map(({ href, key, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${pathname === href
                ? "bg-[#F46E20] text-white shadow-sm shadow-[#F46E20]/30"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {t(lang, key as any)}
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <div className="ml-2 pl-2 border-l border-slate-200 dark:border-[#2B3139]">
            <ExitButton href="/" />
          </div>
        </div>
      </header>

      {/* ─── HEADER MOBILE (Mínimo, Navbar superior) ─── */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white/95 dark:bg-[#1E2329]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#2B3139] z-30 sticky top-0 transition-colors">
        <Link href="/app" className="flex items-center gap-2">
          <LocationIconOrange size={28} />
          <span className="font-semibold text-lg text-slate-800 dark:text-white">VeloZeety</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 -mr-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 rounded-full transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 pb-[72px] md:pb-0 relative">{children}</main>

      {/* ─── BOTTOM NAV MOBILE (Estilo PayPal) ─── */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around py-2 px-2 bg-white/95 dark:bg-[#1E2329]/95 backdrop-blur-md border-t border-slate-200 dark:border-[#2B3139] shadow-[0_-4px_15px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_15px_rgba(0,0,0,0.3)] transition-colors z-40">
        {bottomNavItems.map(({ href, key, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl min-w-[72px] transition-all duration-200 ${pathname === href
              ? "text-[#F46E20] font-bold bg-[#F46E20]/10 dark:bg-[#F46E20]/20 scale-105"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              }`}
          >
            <Icon className="w-6 h-6" strokeWidth={pathname === href ? 2.5 : 2} />
            <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">{t(lang, key as any)}</span>
          </Link>
        ))}
        {/* Disparador Drawer (Más Opciones) */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-1 py-1.5 px-4 rounded-xl min-w-[72px] text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all duration-200 active:scale-95"
        >
          <Menu className="w-6 h-6" strokeWidth={2} />
          <span className="text-[10px] sm:text-[11px] leading-tight mt-0.5">{t(lang, "nav_more")}</span>
        </button>
      </nav>

      {/* ─── SIDEBAR / DRAWER MOBILE (Menú Expandido Corporativo) ─── */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-slate-900/60 dark:bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Panel Lateral Animado */}
          <div className="relative w-4/5 max-w-[320px] h-full bg-white dark:bg-[#1E2329] shadow-2xl flex flex-col animate-slide-in flex-shrink-0 border-r border-slate-200 dark:border-[#2B3139]">

            {/* Cabecera / Perfil Mínimo */}
            <div className="p-5 border-b border-slate-100 dark:border-[#2B3139] bg-slate-50 dark:bg-[#171A1E]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#F46E20] text-white flex items-center justify-center font-bold text-xl ring-2 ring-white dark:ring-[#1E2329] shadow-sm">
                  {rol.substring(0, 1).toUpperCase()}
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-500 dark:text-slate-400 bg-slate-200/50 dark:bg-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/20 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">{t(lang, "nav_profile")} VeloZeety</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 capitalize flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> {lang === "es" ? "Cuenta de" : "Account type"} {rol}
              </p>
            </div>

            {/* Opciones Principales de Navegación */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
              {nav.map(({ href, key, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all ${pathname === href
                    ? "bg-[#F46E20] text-white shadow-md shadow-[#F46E20]/20"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {t(lang, key as any)}
                </Link>
              ))}
            </div>

            {/* ─── Configuración, Idioma y Sistema ─── */}
            <div className="p-4 border-t border-slate-100 dark:border-[#2B3139]">
              <div className="flex items-center gap-2 mb-3 px-2">
                <Settings className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{lang === "es" ? "Ajustes & Sistema" : "Settings & System"}</span>
              </div>

              <div className="flex items-center justify-between px-2 py-2 mb-1">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Idioma</span>
                <LanguageToggle />
              </div>

              <div className="flex items-center justify-between px-2 py-2 mb-4">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Tema Visual</span>
                <ThemeToggle />
              </div>

              {/* Redes Sociales Rápidas */}
              <div className="flex items-center justify-center gap-4 mb-4 opacity-70">
                <a href="https://x.com/VZeety" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-[#F46E20] dark:text-slate-400 dark:hover:text-white transition">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="https://www.instagram.com/velozeety/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-[#F46E20] dark:text-slate-400 dark:hover:text-white transition">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                </a>
              </div>

              <ExitButton href="/" />
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
        .animate-slide-in { animation: slide-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
}
