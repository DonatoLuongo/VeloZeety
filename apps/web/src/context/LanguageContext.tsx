"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Lang = "es" | "en";

interface LanguageContextType {
    lang: Lang;
    setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextType>({
    lang: "es",
    setLang: () => { },
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<Lang>("es");

    useEffect(() => {
        const saved = localStorage.getItem("vz_lang") as Lang;
        if (saved === "en" || saved === "es") setLangState(saved);
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("vz_lang", l);
        document.documentElement.lang = l;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLang() {
    return useContext(LanguageContext);
}
