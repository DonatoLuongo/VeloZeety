"use client";

/**
 * Casco VeloCity con la paleta oficial: gris carbón (#3F474A), naranja (#F46E20) y acento azul (#5BA4D4).
 * Diseño empresarial y profesional para la sección de equipamiento.
 */
export default function CascoVelocity({
  className,
  width = 200,
  height = 200,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  const primary = "#F46E20";
  const dark = "#3F474A";
  const accent = "#5BA4D4";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      width={width}
      height={height}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="casco-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={dark} />
          <stop offset="100%" stopColor="#2a2f31" />
        </linearGradient>
        <linearGradient id="casco-reflejo" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {/* Casco: forma principal */}
      <path
        fill="url(#casco-base)"
        d="M40 75 Q50 45 100 40 Q150 45 160 75 L165 130 Q168 165 100 170 Q32 165 35 130 Z"
      />
      {/* Reflejo superior */}
      <path
        fill="url(#casco-reflejo)"
        d="M55 70 Q100 55 145 70 L140 115 Q100 125 60 115 Z"
      />
      {/* Línea geométrica naranja (frontal) */}
      <path
        fill="none"
        stroke={primary}
        strokeWidth="5"
        strokeLinecap="round"
        d="M70 85 L100 78 L130 85"
      />
      {/* Bandas laterales naranja */}
      <path
        fill="none"
        stroke={primary}
        strokeWidth="4"
        strokeLinecap="round"
        d="M55 95 Q100 90 145 95"
      />
      <path
        fill="none"
        stroke={primary}
        strokeWidth="3"
        strokeLinecap="round"
        d="M60 115 Q100 108 140 115"
      />
      {/* Acento azul: línea inferior */}
      <path
        fill="none"
        stroke={accent}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.9"
        d="M45 125 Q100 118 155 125"
      />
      {/* Visor (área oscura) */}
      <path
        fill={dark}
        fillOpacity="0.85"
        d="M75 82 L125 82 L128 105 Q100 112 72 105 Z"
      />
      {/* Logo / marca frontal simplificada (pin naranja) */}
      <circle cx="100" cy="92" r="6" fill={primary} />
      <path
        fill={primary}
        d="M100 72 L104 88 L100 100 L96 88 Z"
      />
    </svg>
  );
}
