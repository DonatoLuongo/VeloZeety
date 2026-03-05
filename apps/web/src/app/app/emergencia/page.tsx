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
        label: "Ambulancia",
        desc: "Emergencia médica, accidente o malestar grave",
        Icon: Ambulance,
        phone: "171",
        color: "text-red-500",
        bg: "bg-red-100 dark:bg-red-500/10",
        borderActive: "border-red-500",
    },
    {
        id: "firefighters",
        label: "Bomberos",
        desc: "Incendios, rescates, materiales peligrosos",
        Icon: Flame,
        phone: "171",
        color: "text-orange-500",
        bg: "bg-orange-100 dark:bg-orange-500/10",
        borderActive: "border-orange-500",
    },
    {
        id: "police",
        label: "Policía",
        desc: "Seguridad ciudadana, robos, accidents viales",
        Icon: Shield,
        phone: "171",
        color: "text-blue-500",
        bg: "bg-blue-100 dark:bg-blue-500/10",
        borderActive: "border-blue-500",
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
        <div className="min-h-[calc(100vh-56px)] bg-white dark:bg-[#222831] transition-colors">
            {/* Header */}
            <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                    <Link href="/app" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition">
                        <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-[#EEEEEE]" />
                    </Link>
                    <h1 className="text-lg font-bold text-[#3F474A] dark:text-[#EEEEEE]">Emergencias y Salud</h1>
                </div>
                <ThemeToggle />
            </div>

            <div className="max-w-3xl mx-auto p-4 md:p-6">
                {/* Tab bar */}
                <div className="flex gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#393E46] mb-6">
                    {[
                        { id: "emergency" as const, label: "Emergencia", Icon: AlertTriangle },
                        { id: "clinics" as const, label: "Clínicas", Icon: Stethoscope },
                        { id: "profile" as const, label: "Ficha médica", Icon: Heart },
                    ].map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`flex-1 py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition ${tab === t.id
                                    ? "bg-white dark:bg-[#222831] text-[#3F474A] dark:text-[#EEEEEE] shadow-sm"
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
                    <div className="animate-fade-in-up space-y-4">
                        {/* Alert banner */}
                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/10 flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-red-700 dark:text-red-400">¿Tienes una emergencia?</p>
                                <p className="text-xs text-red-600 dark:text-red-300/70 mt-0.5">Selecciona el tipo de emergencia y llama directamente. Tu ubicación GPS se comparte con el operador.</p>
                            </div>
                        </div>

                        {/* Emergency lines */}
                        <div className="space-y-3">
                            {EMERGENCY_LINES.map((line) => (
                                <div key={line.id}>
                                    <button
                                        onClick={() => setSelectedLine(selectedLine === line.id ? null : line.id)}
                                        className={`w-full p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-4 ${selectedLine === line.id
                                                ? `${line.borderActive} bg-white dark:bg-[#393E46] shadow-lg`
                                                : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                                            }`}
                                    >
                                        <div className={`w-12 h-12 rounded-xl ${line.bg} flex items-center justify-center flex-shrink-0`}>
                                            <line.Icon className={`w-6 h-6 ${line.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-[#3F474A] dark:text-[#EEEEEE]">{line.label}</p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400">{line.desc}</p>
                                        </div>
                                        <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform ${selectedLine === line.id ? "rotate-90" : ""}`} />
                                    </button>

                                    {/* Expanded: call + details */}
                                    {selectedLine === line.id && (
                                        <div className="mt-2 ml-4 p-4 rounded-xl bg-slate-50 dark:bg-[#393E46]/50 border border-slate-200 dark:border-white/5 animate-fade-in-up space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <Phone className="w-4 h-4" /> Línea directa: <span className="font-bold">{line.phone}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <MapPin className="w-4 h-4" /> Se enviará tu ubicación GPS automáticamente
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                                                <Clock className="w-4 h-4" /> Disponible 24 horas
                                            </div>
                                            <a
                                                href={`tel:${line.phone}`}
                                                className="w-full py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition shadow-lg shadow-red-500/20 flex items-center justify-center gap-2"
                                            >
                                                <Phone className="w-5 h-5" /> Llamar al {line.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Quick SOS button */}
                        <a
                            href="tel:911"
                            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition shadow-xl shadow-red-500/30 flex items-center justify-center gap-3 text-lg mt-6"
                        >
                            <Phone className="w-6 h-6" /> SOS — Llamar al 911
                        </a>
                    </div>
                )}

                {/* ─── TAB: Clinics ─── */}
                {tab === "clinics" && (
                    <div className="animate-fade-in-up space-y-4">
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-[#EEEEEE]">Clínicas y paramédicos</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Centros de salud cercanos verificados por VeloZeety</p>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                                type="search"
                                placeholder="Buscar clínica o especialidad..."
                                value={searchClinic}
                                onChange={(e) => setSearchClinic(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] text-[#3F474A] dark:text-[#EEEEEE] placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Clinic cards */}
                        <div className="space-y-3">
                            {filteredClinics.map((clinic) => (
                                <div key={clinic.id} className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] hover:shadow-md transition">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <p className="font-bold text-[#3F474A] dark:text-[#EEEEEE]">{clinic.name}</p>
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
                                        <a href="tel:0212-1234567" className="py-2.5 px-4 rounded-xl text-sm font-medium border border-slate-200 dark:border-white/10 text-slate-600 dark:text-[#EEEEEE] hover:bg-slate-50 dark:hover:bg-white/5 transition flex items-center gap-1.5">
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
                        <h2 className="text-xl font-bold text-[#3F474A] dark:text-[#EEEEEE]">Ficha médica rápida</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Esta información se comparte con paramédicos en caso de emergencia
                        </p>

                        {/* Blood type */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-[#EEEEEE] mb-1.5 flex items-center gap-1.5">
                                <Heart className="w-4 h-4 text-red-500" /> Tipo de sangre
                            </label>
                            <div className="flex flex-wrap gap-2">
                                {BLOOD_TYPES.map((bt) => (
                                    <button
                                        key={bt}
                                        onClick={() => setBloodType(bt)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${bloodType === bt
                                                ? "bg-[var(--velocity-primary)] text-white"
                                                : "bg-slate-100 dark:bg-[#393E46] text-slate-600 dark:text-[#EEEEEE] hover:bg-slate-200 dark:hover:bg-white/10"
                                            }`}
                                    >
                                        {bt}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Allergies */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-[#EEEEEE] mb-1.5">Alergias</label>
                            <input
                                type="text"
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                                placeholder="Ej: Penicilina, mariscos, polen"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] text-[#3F474A] dark:text-[#EEEEEE] placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Medications */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-[#EEEEEE] mb-1.5">Medicamentos actuales</label>
                            <input
                                type="text"
                                value={medications}
                                onChange={(e) => setMedications(e.target.value)}
                                placeholder="Ej: Losartán 50mg, Metformina"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] text-[#3F474A] dark:text-[#EEEEEE] placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
                            />
                        </div>

                        {/* Conditions */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-[#EEEEEE] mb-1.5">Condiciones preexistentes</label>
                            <textarea
                                value={conditions}
                                onChange={(e) => setConditions(e.target.value)}
                                placeholder="Ej: Diabetes tipo 2, hipertensión"
                                rows={2}
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] text-[#3F474A] dark:text-[#EEEEEE] placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition resize-none"
                            />
                        </div>

                        {/* Emergency contact */}
                        <div>
                            <label className="block text-sm font-medium text-[#3F474A] dark:text-[#EEEEEE] mb-1.5 flex items-center gap-1.5">
                                <User className="w-4 h-4" /> Contacto de emergencia
                            </label>
                            <input
                                type="tel"
                                value={emergencyContact}
                                onChange={(e) => setEmergencyContact(e.target.value)}
                                placeholder="Ej: 0414-1234567 (Mamá)"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#393E46] text-[#3F474A] dark:text-[#EEEEEE] placeholder:text-slate-400 focus:ring-2 focus:ring-[var(--velocity-primary)]/20 focus:border-[var(--velocity-primary)] outline-none transition"
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
