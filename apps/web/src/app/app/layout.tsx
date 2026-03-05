"use client";

import "leaflet/dist/leaflet.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Package, User, Building2, LayoutGrid, AlertTriangle } from "lucide-react";
import { BRAND } from "@velocity/shared";
import ExitButton from "@/components/ExitButton";
import LocationIconOrange from "@/components/LocationIconOrange";

const nav = [
  { href: "/app", label: "Inicio", Icon: Home },
  { href: "/app/envios", label: "Envíos", Icon: Package },
  { href: "/app/billetera", label: "Billetera", Icon: Wallet },
  { href: "/app/servicios", label: "Servicios", Icon: LayoutGrid },
  { href: "/app/emergencia", label: "Emergencia", Icon: AlertTriangle },
  { href: "/app/empresa", label: "Empresa", Icon: Building2 },
  { href: "/app/perfil", label: "Perfil", Icon: User },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#222831] transition-colors">
      <header className="hidden md:flex items-center justify-between px-4 py-3 bg-white dark:bg-[#393E46] border-b border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none transition-colors">
        <Link href="/app" className="flex items-center gap-2">
          <LocationIconOrange size={32} />
          <span className="font-semibold text-lg text-slate-800 dark:text-white">{BRAND.name}</span>
        </Link>
        <nav className="flex gap-1">
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
        </nav>
        <ExitButton href="/" />
      </header>

      <main className="flex-1 pb-20 md:pb-0">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 md:hidden flex items-center justify-around py-2 px-2 bg-white dark:bg-[#393E46] border-t border-slate-200 dark:border-white/5 shadow-lg dark:shadow-none transition-colors">
        {nav.map(({ href, label, Icon }) => (
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
      </nav>
    </div>
  );
}
