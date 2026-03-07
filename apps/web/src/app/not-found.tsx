"use client";

import Link from "next/link";
import { ChevronLeft, ShieldAlert } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-[var(--velocity-bg)] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 animate-fade-in-up">
                {/* Icon & 404 Text */}
                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <h1 className="text-8xl md:text-9xl font-black text-[var(--velocity-surface)] drop-shadow-sm select-none"
                            style={{ WebkitTextStroke: "2px var(--velocity-border)" }}>
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <ShieldAlert className="w-20 h-20 text-[#F46E20]" />
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[var(--velocity-text)] mb-3">
                        Ruta no encontrada
                    </h2>
                    <p className="text-[var(--velocity-muted)] text-sm mb-8">
                        Parece que te has desviado del camino. La página que buscas no existe o fue movida temporalmente.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                    <Link href="/" className="w-full py-3.5 rounded-xl font-bold text-white transition hover:opacity-90 flex items-center justify-center gap-2"
                        style={{ backgroundColor: "#F46E20" }}>
                        <ChevronLeft className="w-5 h-5" />
                        Volver al Inicio
                    </Link>
                    <a href="mailto:support@velozeety.com" className="w-full py-3 rounded-xl border border-[var(--velocity-border)] text-sm font-medium text-[var(--velocity-text)] transition hover:bg-[var(--velocity-surface)]">
                        Contactar soporte
                    </a>
                </div>

                {/* Footer info */}
                <p className="text-xs text-[var(--velocity-muted)] mt-12 opacity-60">
                    VeloZeety © {new Date().getFullYear()} — Seguridad Inquebrantable
                </p>
            </div>
        </div>
    );
}
