"use client";

import { useLang } from "@/context/LanguageContext";

// SVG flag components for cross-platform compatibility (Windows can't render emoji flags)
function SpainFlag({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className} width="20" height="15" aria-hidden>
      <rect width="640" height="480" fill="#AA151B"/>
      <rect width="640" height="240" y="120" fill="#F1BF00"/>
    </svg>
  );
}

function USFlag({ className = "" }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" className={className} width="20" height="15" aria-hidden>
      <rect width="640" height="480" fill="#fff"/>
      <g fill="#B22234">
        <rect width="640" height="37"/>
        <rect width="640" height="37" y="74"/>
        <rect width="640" height="37" y="148"/>
        <rect width="640" height="37" y="222"/>
        <rect width="640" height="37" y="296"/>
        <rect width="640" height="37" y="370"/>
        <rect width="640" height="37" y="444"/>
      </g>
      <rect width="260" height="260" fill="#3C3B6E"/>
    </svg>
  );
}

export default function LanguageToggle() {
    const { lang, setLang } = useLang();

    return (
        <button
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-300 text-sm font-semibold text-slate-600 dark:text-slate-300"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
        >
            <span className="leading-none select-none flex items-center">
                {lang === "es" ? <SpainFlag /> : <USFlag />}
            </span>
            <span className="uppercase tracking-wide text-xs font-bold">
                {lang === "es" ? "ES" : "EN"}
            </span>
        </button>
    );
}
