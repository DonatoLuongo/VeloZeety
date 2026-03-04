"use client";

import Link from "next/link";
import { LogOut } from "lucide-react";

/** Botón Salir: más cuadrado, verde oscuro, serio, animación mínima */
export default function ExitButton({ href = "/" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-medium transition-all duration-200 hover:scale-[0.98] active:scale-[0.97]"
      aria-label="Salir"
    >
      <LogOut className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
      <span>Salir</span>
    </Link>
  );
}
