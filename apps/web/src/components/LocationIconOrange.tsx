"use client";

/**
 * Icono de ubicación naranja (pin con líneas de velocidad), sin texto.
 * Sustituye al logo completo en la app web.
 */
const ORANGE = "#F46E20";

export default function LocationIconOrange({
  className,
  size = 36,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 48"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      {/* Líneas de velocidad a la izquierda */}
      <path fill="none" stroke={ORANGE} strokeWidth="2" strokeLinecap="round" opacity="0.85" d="M6 24h9" />
      <path fill="none" stroke={ORANGE} strokeWidth="1.8" strokeLinecap="round" opacity="0.55" d="M4 20h7" />
      <path fill="none" stroke={ORANGE} strokeWidth="1.2" strokeLinecap="round" opacity="0.3" d="M2 16h5" />
      {/* Pin de ubicación (teardrop) */}
      <path
        fill={ORANGE}
        d="M20 2C11.16 2 4 9.16 4 18c0 10 16 28 16 28s16-18 16-28C36 9.16 28.84 2 20 2z"
      />
      <circle cx="20" cy="16" r="5" fill="white" />
    </svg>
  );
}
