"use client";

import { useState } from "react";
import {
    Ambulance, Flame, Shield, Phone, MapPin, Clock, AlertTriangle,
    ChevronLeft, Heart, Stethoscope, Calendar, User, FileText,
    ChevronRight, Star, Search,
} from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

// ─── Emergency contacts ───
const EMERGENCY_LINES = [
    {
        id: "ambulance",
        label: "Ambulancia y Salud",
        desc: "Emergencia médica grave o traslado",
        Icon: Ambulance,
        phone: "171",
        color: "text-rose-500",
        bg: "bg-rose-100 dark:bg-rose-500/10",
        borderActive: "border-rose-500",
    },
    {
        id: "firefighters",
        label: "Bomberos y Rescate",
        desc: "Incendios o materiales peligrosos",
        Icon: Flame,
        phone: "171",
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-500/10",
        borderActive: "border-orange-500",
    },
    {
        id: "police",
        label: "Seguridad Ciudadana",
        desc: "Robos, altercados o accidentes",
        Icon: Shield,
        phone: "171",
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-500/10",
        borderActive: "border-blue-500",
    },
    {
        id: "infrastructure",
        label: "Falla de Infraestructura",
        desc: "Semáforos, cables, agua o electricidad",
        Icon: AlertTriangle,
        phone: "0800-FALLAS",
        color: "text-amber-500",
        bg: "bg-amber-100 dark:bg-amber-500/10",
        borderActive: "border-amber-500",
    },
];

// ─── Clinics and paramedics ───
const CLINICS = [
    { id: "1", name: "Clínica Santa Sofía", specialty: "General / Trauma", rating: 4.8, distance: "1.2 km", address: "Av. Principal, El Cafetal", available: true },
    { id: "2", name: "Centro Médico Docente La Trinidad", specialty: "Urgencias 24h", rating: 4.9, distance: "2.8 km", address: "Calle La Trinidad", available: true },
    { id: "3", name: "Hospital de Clínicas Caracas", specialty: "Emergencias / UCI", rating: 4.7, distance: "5.1 km", address: "San Bernardino", available: true },
    { id: "4", name: "Paramédicos VeloCity", specialty: "Atención vial en moto", rating: 4.6, distance: "0.8 km", address: "Unidad móvil", available: true },
];

// ─── Medical profile fields ───
const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

type TabView = "emergency" | "clinics" | "profile";

export default function EmergenciaPage() {
    const [tab, setTab] = useState<TabView>("emergency");
    const [selectedLine, setSelectedLine] = useState<string | null>(null);
    const [searchClinic, setSearchClinic] = useState("");

    // Medical profile state
    const [bloodType, setBloodType] = useState("");
    const [allergies, setAllergies] = useState("");
    const [medications, setMedications] = useState("");
    const [conditions, setConditions] = useState("");
    const [emergencyContact, setEmergencyContact] = useState("");
    const [profileSaved, setProfileSaved] = useState(false);

    const filteredClinics = searchClinic.trim()
        ? CLINICS.filter((c) => c.name.toLowerCase().includes(searchClinic.toLowerCase()) || c.specialty.toLowerCase().includes(searchClinic.toLowerCase()))
        : CLINICS;

    const handleSaveProfile = () => {
        // TODO: persist to backend
        localStorage.setItem("velocity_medical_profile", JSON.stringify({ bloodType, allergies, medications, conditions, emergencyContact }));
        setProfileSaved(true);
        setTimeout(() => setProfileSaved(false), 3000);
    };

    return (
        <div className="min-h-[calc(100vh-56px)] bg-white dark:bg-velocity-bg transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link href="/app" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition">
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-velocity-text" />
                    </Link>
                    <h1 className="text-lg font-bold text-[#3F474A] dark:text-velocity-text">Emergencias y Salud</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto p-4 md:p-6">
                {/* Tab bar */}
                <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-velocity-surface mb-6">
                    {[
                        { id: "emergency" as const, label: "Emergencia", Icon: AlertTriangle },
                        { id: "clinics" as const, label: "Clínicas", Icon: Stethoscope },
                        { id: "profile" as const, label: "Ficha médica", Icon: Heart },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition ${tab === t.id
                                ? "bg-white dark:bg-velocity-bg text-[#3F474A] dark:text-velocity-text shadow-sm"
                                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-[#EEEEEE]"
                                }`}
                        >
                            <t.Icon className="w-4 h-4" />
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* ─── TAB: Emergency ─── */}
                {tab === "emergency" && (
                    <div className="animate-fade-in-up space-y-6">
                        {/* Header de Seguridad */}
                        <div className="p-5 rounded-2xl bg-white dark:bg-velocity-surface border border-slate-200 dark:border-white/5 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1">Centro de Respuesta Corporativa</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                    Todas las comunicaciones activan su geolocalización en tiempo real y son monitoreadas por el equipo de seguridad operativa de VeloZeety.
                                </p>
                            </div>
                        </div>

                        {/* Pilares de Emergencia */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Asistencia Médica */}
                            <button className="text-left group flex flex-col items-center sm:items-start p-6 rounded-2xl bg-white dark:bg-velocity-surface border-2 border-slate-100 hover:border-rose-500/50 dark:border-slate-800 dark:hover:border-rose-500/50 transition-all shadow-sm">
                                <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mb-4 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                                    <Ambulance className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1 text-center sm:text-left w-full">Asistencia Médica</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left mb-4">
                                    Paramédicos y traslado en ambulancia para emergencias de salud inmediatas.
                                </p>
                                <a
                                    href="tel:171"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full mt-auto py-3 rounded-xl border border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors text-center text-sm flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" /> Activar Protocolo Médico
                                </a>
                            </button>

                            {/* Reporte Vial */}
                            <button className="text-left group flex flex-col items-center sm:items-start p-6 rounded-2xl bg-white dark:bg-velocity-surface border-2 border-slate-100 hover:border-amber-500/50 dark:border-slate-800 dark:hover:border-amber-500/50 transition-all shadow-sm">
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                                    <AlertTriangle className="w-7 h-7" />
                                </div>
                                <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1 text-center sm:text-left w-full">Incidente en Vía</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left mb-4">
                                    Accidentes de tránsito, seguridad física o fallas mecánicas severas.
                                </p>
                                <a
                                    href="tel:171"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full mt-auto py-3 rounded-xl border border-amber-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 font-bold hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors text-center text-sm flex items-center justify-center gap-2"
                                >
                                    <Phone className="w-4 h-4" /> Reportar a Seguridad
                                </a>
                            </button>
                        </div>

                        {/* Acción Secundaria: Soporte Estándar */}
                        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-white/5">
                            <a
                                href="tel:0800-VELOCITY"
                                className="w-full py-4 rounded-xl border-2 border-[#2563EB]/20 dark:border-[#2563EB]/40 bg-transparent text-[#2563EB] dark:text-[#60A5FA] font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2 text-sm"
                            >
                                <Phone className="w-4 h-4" /> Llamada de Soporte Estándar
                            </a>
                            <p className="text-[11px] text-center text-slate-400 mt-3 px-4">
                                Utilice la línea de soporte para incidencias menores con envíos, conductores o la aplicación.
                            </p>
                        </div>
                    </div>
                )}

                {/* ─── TAB: Clinics ─── */}
                {tab === "clinics" && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-velocity-text">Clínicas y paramédicos</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Centros de salud cercanos verificados por VeloZeety</p>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="search"
                                placeholder="Buscar clínica o especialidad..."
                                value={searchClinic}
                                onChange={(e) => setSearchClinic(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-[#3F474A] dark:text-velocity-text placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Clinic cards */}
                        <div className="space-y-3">
                            {filteredClinics.map((clinic) => (
                                <div key={clinic.id} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface hover:shadow-md transition">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-[#3F474A] dark:text-velocity-text">{clinic.name}</p>
                                                {clinic.available && (
                                                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
                                                        Disponible
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{clinic.specialty}</p>
                                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 dark:text-slate-500">
                                                <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" /> {clinic.rating}</span>
                                                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {clinic.distance}</span>
                                            </div>
                                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{clinic.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-[var(--velocity-primary)] hover:opacity-90 transition flex items-center justify-center gap-1.5">
                                            <Calendar className="w-4 h-4" /> Agendar cita
                                        </button>
                                        <a href="tel:0212-1234567" className="py-2.5 px-4 rounded-xl text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-velocity-text hover:bg-slate-50 dark:hover:bg-white/5 transition flex items-center gap-1.5">
                                            <Phone className="w-4 h-4" /> Llamar
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ─── TAB: Medical Profile ─── */}
                {tab === "profile" && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-velocity-text">Ficha médica rápida</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Esta información se comparte con paramédicos en caso de emergencia
                        </p>

                        {/* Blood type */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-velocity-text mb-1.5 flex items-center gap-1.5">
                                <Heart className="w-4 h-4 text-red-500" /> Tipo de sangre
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {BLOOD_TYPES.map((bt) => (
                                    <button
                                        key={bt}
                                        onClick={() => setBloodType(bt)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${bloodType === bt
                                            ? "bg-[var(--velocity-primary)] text-white"
                                            : "bg-slate-100 dark:bg-velocity-surface text-slate-600 dark:text-velocity-text hover:bg-slate-200 dark:hover:bg-white/10"
                                            }`}
                                    >
                                        {bt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Allergies */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-velocity-text mb-1.5">Alergias</label>
                            <input
                                type="text"
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                                placeholder="Ej: Penicilina, mariscos, polen"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-[#3F474A] dark:text-velocity-text placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Medications */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-velocity-text mb-1.5">Medicamentos actuales</label>
                            <input
                                type="text"
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                                placeholder="Ej: Losartán 50mg, Metformina"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-[#3F474A] dark:text-velocity-text placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Conditions */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-velocity-text mb-1.5">Condiciones preexistentes</label>
                            <textarea
                                value={conditions}
                                onChange={(e) => setConditions(e.target.value)}
                                placeholder="Ej: Diabetes tipo 2, hipertensión"
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-[#3F474A] dark:text-velocity-text placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition resize-none"
                            />
                        </div>

                        {/* Emergency contact */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-velocity-text mb-1.5 flex items-center gap-1.5">
                                <User className="w-4 h-4" /> Contacto de emergencia
                            </label>
                            <input
                                type="tel"
                                value={emergencyContact}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                                placeholder="Ej: 0414-1234567 (Mamá)"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface text-[#3F474A] dark:text-velocity-text placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Save */}
                        <button
                            onClick={handleSaveProfile}
                            className="w-full py-3.5 rounded-xl font-semibold text-white bg-[var(--velocity-primary)] hover:opacity-90 transition shadow-lg shadow-[var(--velocity-primary)]/20 flex items-center justify-center gap-2"
                        >
                            <FileText className="w-5 h-5" />
                            {profileSaved ? "✓ Guardado" : "Guardar ficha médica"}
                        </button>

                        <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
                            Esta información es confidencial y solo se comparte con servicios de emergencia
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
