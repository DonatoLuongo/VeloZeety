"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Package, User, Building2, LayoutGrid, AlertTriangle, Instagram, Twitter } from "lucide-react";
import { BRAND } from "@velocity/shared";
import ExitButton from "@/components/ExitButton";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";

import { useEffect, useState } from "react";

const navBase = [
  { href: "/app", label: "Inicio", Icon: Home, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/envios", label: "Envíos", Icon: Package, roles: ["cliente", "conductor"] },
  { href: "/app/billetera", label: "Billetera", Icon: Wallet, roles: ["cliente", "conductor", "emprendedor"] },
  { href: "/app/servicios", label: "Servicios", Icon: LayoutGrid, roles: ["cliente"] },
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
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#222831] transition-colors">
      <header className="hidden md:flex items-center justify-between px-4 py-3 bg-white dark:bg-[#393E46] border-b border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
        <Link href="/app" className="flex items-center gap-2">
          <LocationIconOrange size={32} />
          <span className="font-semibold text-lg text-slate-800 dark:text-white">{BRAND.name}</span>
        </Link>
        <nav className="flex items-center gap-1">
          {nav.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${pathname === href
                ? "bg-velocity-primary text-white"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
            >
              <Icon className="w-4 h-4" strokeWidth={2} />
              {label}
            </Link>
          ))}
          <div className="mx-2 h-6 w-px bg-slate-200 dark:bg-white/10" />
          <ThemeToggle />
          <div className="flex items-center gap-2 ml-4">
            <a href="https://x.com/VZeety" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-velocity-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/velozeety/" target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 hover:text-velocity-primary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </nav>
        <ExitButton href="/" />
      </header>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around py-2 px-2 bg-white dark:bg-[#393E46] border-t border-slate-200 dark:border-white/5 shadow-lg dark:shadow-none transition-colors">
        {nav.slice(0, 4).map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg min-w-[64px] ${pathname === href
              ? "text-velocity-primary font-medium"
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
