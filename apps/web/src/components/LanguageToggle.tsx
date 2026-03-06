"use client";

import { useLang } from "@/context/LanguageContext";

export default function LanguageToggle() {
    const { lang, setLang } = useLang();

    return (
        <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 text-sm font-semibold text-slate-600 dark:text-slate-300"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        >
            <span className="text-base leading-none select-none">
                {lang === "es" ? "🇪🇸" : "🇺🇸"}
            </span>
            <span className="uppercase tracking-wide text-xs font-bold">
                {lang === "es" ? "ES" : "EN"}
            </span>
        </button>
    );
}
