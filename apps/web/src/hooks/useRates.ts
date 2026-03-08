"use client";

import { useState, useEffect } from "react";

// Hook para obtener y cachear las tasas de moneda por 5 minutos
export type Rates = {
    bcv: number;
    usdt: number;
    eur: number;
    lastUpdate: number;
};

export type VeloPrice = {
    bs: number;    // Precio de 1 VELO en Bolívares
    eur: number;   // Precio de 1 VELO en Euros
    usdt: number;  // Precio de 1 VELO en USDT
};

const CACHE_MINUTES = 5;
// Factor de markup sobre el promedio de las 3 tasas → precio VELO
const VELO_MARKUP = 1.65; // 65% sobre el promedio

/** Calcula el precio de 1 VELO a partir de las 3 tasas de referencia */
export function computeVeloPrice(rates: Rates): VeloPrice {
    // Promedio moderado de las 3 fuentes
    const avg = (rates.bcv + rates.eur + rates.usdt) / 3;
    const veloBs = avg * VELO_MARKUP;
    return {
        bs: veloBs,
        eur: veloBs / rates.eur,
        usdt: veloBs / rates.usdt,
    };
}

export function useRates() {
    const [rates, setRates] = useState<Rates | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const fetchRates = async (force = false) => {
        try {
            if (!force) {
                const cached = localStorage.getItem("velocity_rates");
                if (cached) {
                    const parsed: Rates = JSON.parse(cached);
                    const diffMins = (Date.now() - parsed.lastUpdate) / 1000 / 60;
                    if (diffMins < CACHE_MINUTES) {
                        setRates(parsed);
                        setLoading(false);
                        return;
                    }
                }
            }

            setLoading(true);
            setError(false);

            // Fetch ExchangeRate-API for VES (BCV) and EUR
            // This API gives true updated realtime standard values (e.g. 433.17)
            const erApi = await fetch("https://api.exchangerate-api.com/v4/latest/USD")
                .then((r) => r.json())
                .catch(() => null);

            // Fetch DolarAPI for USDT (paralelo)
            const dolApi = await fetch("https://ve.dolarapi.com/v1/dolares")
                .then((r) => r.json())
                .catch(() => []);

            let bcvRate = 433.16; // fallback 2026
            let usdtRate = 618.00;
            let eurRate = 501.72;

            if (erApi && erApi.rates) {
                if (erApi.rates.VES) bcvRate = erApi.rates.VES;
                if (erApi.rates.EUR) eurRate = bcvRate / erApi.rates.EUR;
            } else {
                const oficialRaw = dolApi.find((d: any) => d.fuente === "oficial")?.promedio;
                if (oficialRaw) bcvRate = oficialRaw;
            }

            const paraleloRaw = dolApi.find((d: any) => d.fuente === "paralelo")?.promedio;
            if (paraleloRaw) usdtRate = paraleloRaw;

            const newRates: Rates = {
                bcv: Math.max(bcvRate, 43.10),
                usdt: Math.max(usdtRate, 50.00),
                eur: Math.max(eurRate, 45.00),
                lastUpdate: Date.now(),
            };

            localStorage.setItem("velocity_rates", JSON.stringify(newRates));
            setRates(newRates);

        } catch (err) {
            console.error("Error al obtener tasas:", err);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
        const interval = setInterval(() => fetchRates(), CACHE_MINUTES * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const refreshManual = () => fetchRates(true);

    return { rates, loading, error, refreshManual };
}

/** Hook de conveniencia: devuelve el precio VELO calculado en tiempo real */
export function useVeloPrice() {
    const { rates, loading, error, refreshManual } = useRates();
    const veloPrice = rates ? computeVeloPrice(rates) : null;
    return { veloPrice, rates, loading, error, refreshManual };
}

