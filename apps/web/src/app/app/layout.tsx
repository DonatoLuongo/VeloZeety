"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Package, User, Building2, LayoutGrid, AlertTriangle, Instagram } from "lucide-react";
import { BRAND } from "@velocity/shared";
import ExitButton from "@/components/ExitButton";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";

import { useEffect, useState } from "react";

const navBase = [
  { href: "/app", label: "Inicio", Icon: Home, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/envios", label: "Envíos", Icon: Package, roles: ["cliente", "conductor"] },
  { href: "/app/billetera", label: "Billetera", Icon: Wallet, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/servicios", label: "Servicios", Icon: LayoutGrid, roles: ["cliente", "conductor"] },
  { href: "/app/emergencia", label: "Emergencia", Icon: AlertTriangle, roles: ["cliente", "conductor"] },
  { href: "/app/empresa", label: "Empresa", Icon: Building2, roles: ["emprendedor"] },
  { href: "/app/perfil", label: "Perfil", Icon: User, roles: ["cliente", "conductor", "emprendedor"] },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [rol, setRol] = useState<string>("cliente");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const user = JSON.parse(localStorage.getItem("velocity_user") || "{}");
    if (user.rol) setRol(user.rol);
  }, []);

  const nav = navBase.filter(item => item.roles.includes(rol));

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-velocity-bg transition-colors">
      <header className="hidden md:flex items-center justify-between px-4 py-3 bg-white dark:bg-velocity-surface border-b border-slate-200 dark:border-velocity-border shadow-sm dark:shadow-none transition-colors">
        <Link href="/app" className="flex items-center gap-2">
          <LocationIconOrange size={32} />
          <span className="font-semibold text-lg text-slate-800 dark:text-white">VeloZeety</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${pathname === href
                ? "bg-[#F46E20] text-white shadow-sm shadow-[#F46E20]/30"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#2B3139]"
                }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-velocity-border" />
          <ThemeToggle />
          <div className="flex items-center gap-1.5 ml-4">
            <a
              href="https://x.com/VZeety"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-black dark:hover:text-white transition-all active:scale-90"
              title="Siguenos en X (Twitter)"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/velozeety/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 transition-all active:scale-90 mt-[1px] group/insta"
              title="Síguenos en Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 transition-all group-hover/insta:scale-110" aria-hidden="true">
                <defs>
                  <linearGradient id="insta_grad" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#405DE6" />
                    <stop offset="25%" stopColor="#833AB4" />
                    <stop offset="50%" stopColor="#E1306C" />
                    <stop offset="75%" stopColor="#F56040" />
                    <stop offset="100%" stopColor="#FCAF45" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#insta_grad)"
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.247 2.242 1.308 3.607.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.365-.333 2.633-1.308 3.608-.975.975-2.242 1.247-3.607 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.365-.062-2.633-.332-3.608-1.308-.975-.975-1.247-2.242-1.308-3.607-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.247 3.607-1.308 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.28.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.948-.197-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4.162 4.162 0 110-8.324A4.162 4.162 0 0112 16zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>
          </div>
        </nav>
        <ExitButton href="/" />
      </header>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around py-2 px-2 bg-white dark:bg-velocity-surface border-t border-slate-200 dark:border-velocity-border shadow-lg dark:shadow-none transition-colors">
        {nav.slice(0, 4).map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg min-w-[64px] ${pathname === href
              ? "text-[#F46E20] font-medium"
              : "text-slate-500 dark:text-slate-400"
              }`}
          >
            <Icon className="w-6 h-6" strokeWidth={2} />
            <span className="text-xs">{label}</span>
          </Link>
        ))}
        {/* Mobile Theme Toggle */}
        <div className="flex flex-col items-center gap-1 min-w-[64px]">
          <ThemeToggle />
          <span className="text-xs text-slate-500">Tema</span>
        </div>
      </nav>
    </div>
  );
}
