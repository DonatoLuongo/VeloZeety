/** Solo la "V" del logo, sin fondo, para usar sobre fondos oscuros (color adaptativo) */
export default function LogoV({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M32 68 L60 32 L88 68 L72 68 L72 88 L48 88 L48 68 Z" />
    </svg>
  );
}
