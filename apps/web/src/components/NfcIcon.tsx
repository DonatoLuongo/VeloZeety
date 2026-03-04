/** Icono NFC estándar: tres curvas en forma de señal (símbolo internacional contactless) */
export default function NfcIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {/* Tres arcos concéntricos tipo señal contactless */}
      <path d="M4 20 Q12 20 12 12 Q12 4 20 4" />
      <path d="M6 20 Q12 20 12 15 Q12 10 18 10" />
      <path d="M8 20 Q12 20 12 17 Q12 14 16 14" />
    </svg>
  );
}
