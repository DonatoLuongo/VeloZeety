import React from "react";

export function GruaIcon({
  size = 24,
  className = "",
  strokeWidth = 2,
  ...props
}: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Ruedas */}
      <circle cx="6" cy="17" r="2" />
      <circle cx="17" cy="17" r="2" />
      
      {/* Chasis Central */}
      <path d="M8 17h7" />
      
      {/* Cabina y Plataforma */}
      <path d="M19 17h2v-5l-2-4h-4v6H2v3h2" />
      
      {/* Ventana de Cabina */}
      <path d="M15 12h6" />
      
      {/* Torre de la grúa */}
      <path d="M12 14V5" />
      
      {/* Brazo de la grúa */}
      <path d="M12 5L4 3" />
      
      {/* Cable bajando */}
      <path d="M4 3v5" />
      
      {/* Gancho */}
      <path d="M3 8a1 1 0 0 0 2 0" />
    </svg>
  );
}
