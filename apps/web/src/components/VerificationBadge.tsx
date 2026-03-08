"use client";

import { BadgeCheck } from "lucide-react";

export type VerificationType = "standard" | "premium";
export type UserRole = "cliente" | "conductor" | "emprendedor";

interface VerificationBadgeProps {
  type?: VerificationType;
  role?: UserRole;
  className?: string;
  showText?: boolean;
}

export default function VerificationBadge({
  type = "standard",
  role = "cliente",
  className = "",
  showText = true,
}: VerificationBadgeProps) {
  // Configuración de colores según requerimientos
  // Cliente Verificado: Azul
  // Conductor Verificado: Verde
  // Verificado Premium (Todos): Naranja
  
  let colorClass = "";
  let text = type === "premium" ? "Verificado premium" : "Verificado";

  if (type === "premium") {
    // Premium es naranja para todos
    colorClass = "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-500/30";
  } else {
    // Estándar depende del rol
    if (role === "conductor") {
      colorClass = "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30";
    } else {
      // Cliente y Emprendedor usan azul
      colorClass = "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-500/30";
    }
  }

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-bold tracking-tight ${colorClass} ${className}`} style={{ fontSize: '10px' }}>
      <BadgeCheck className="w-3.5 h-3.5 shrink-0" />
      {showText && text}
    </span>
  );
}
