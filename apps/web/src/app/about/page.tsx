"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    Car, Bike, Package, Wallet, Ambulance, Store, Shield, Users,
    Globe, Heart, Zap, MapPin, Mail, Phone, ChevronDown, Building2,
} from "lucide-react";
import LocationIconOrange from "@/components/LocationIconOrange";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import { useLang } from "@/context/LanguageContext";
import { useState } from "react";

const faqs = {
    es: [
        { q: "¿Cómo funciona VeloZeety?", a: "VeloZeety es una app multi-servicios. Regístrate como cliente, conductor o emprendedor. Como cliente puedes pedir viajes en moto o carro, realizar delivery y pagar con tu billetera digital. Como conductor generas ingresos con tu vehículo. Como emprendedor abres tu tienda virtual y ofreces delivery integrado." },
        { q: "¿En qué ciudades opera VeloZeety?", a: "Actualmente operamos en San Cristóbal, Táchira, Venezuela, y estamos en expansión hacia otras ciudades del país. Consulta nuestra sección de Cobertura para detalles actualizados." },
        { q: "¿Cómo recargo mi billetera digital?", a: "Puedes recargar tu billetera con USDT (TRC-20/BEP-20), Bolívares vía pago móvil o transferencia bancaria, y con PayPal o Zinli. Ingresa a la sección Billetera dentro de la app para ver los datos de recarga." },
        { q: "¿Es seguro viajar con VeloZeety?", a: "Sí. Todos nuestros conductores pasan por un proceso de verificación de identidad y antecedentes. Además, cada viaje es rastreado en tiempo real y puedes compartir tu ubicación con tus contactos de confianza." },
        { q: "¿Cómo registro mi negocio en la plataforma?", a: "Regístrate con el rol de Emprendedor, completa el perfil de tu negocio, carga tu catálogo de productos y activa el delivery. Nuestro equipo revisará tu solicitud en menos de 48 horas." },
    ],
    en: [
        { q: "How does VeloZeety work?", a: "VeloZeety is a multi-service app. Sign up as a rider, driver, or entrepreneur. As a rider, you can request motorcycle or car rides, use delivery and pay with your digital wallet. As a driver, you earn income with your vehicle. As an entrepreneur, you open your virtual store with integrated delivery." },
        { q: "Which cities does VeloZeety operate in?", a: "We currently operate in San Cristóbal, Táchira, Venezuela, and are expanding to other cities across the country. Check our Coverage section for updated details." },
        { q: "How do I top up my digital wallet?", a: "You can top up your wallet with USDT (TRC-20/BEP-20), Venezuelan Bolívares via mobile payment or bank transfer, and with PayPal or Zinli. Go to the Wallet section in the app to see top-up details." },
        { q: "Is it safe to ride with VeloZeety?", a: "Yes. All our drivers go through an identity and background verification process. Each ride is tracked in real time and you can share your location with trusted contacts." },
        { q: "How do I register my business on the platform?", a: "Sign up with the Entrepreneur role, complete your business profile, upload your product catalog and enable delivery. Our team will review your application in less than 48 hours." },
    ],
};

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border border-[var(--velocity-border)] rounded-xl overflow-hidden">
            <button onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-[var(--velocity-text)] hover:bg-[var(--velocity-border)] transition">
                {q}
                <ChevronDown className={`w-5 h-5 text-[var(--velocity-muted)] flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
                <div className="px-6 pb-5 text-sm text-[var(--velocity-muted)] leading-relaxed border-t border-[var(--velocity-border)]">
                    <p className="pt-4">{a}</p>
                </div>
            )}
        </div>
    );
}

export default function AboutPage() {
    const { lang } = useLang();
    const faqList = faqs[lang];

    const services = lang === "es" ? [
        { Icon: Bike, title: "Viajes en Moto", desc: "Movilidad rápida y eficiente para trayectos cortos y medios. Ideal para evitar el tráfico.", color: "#F46E20" },
        { Icon: Car, title: "Viajes en Carro", desc: "Comodidad para grupos y familias. Conductores verificados con vehículos en óptimas condiciones.", color: "#F0B90B" },
        { Icon: Package, title: "Delivery Express", desc: "Envío de paquetes, pedidos de negocios y mandados al instante. Rastreo en tiempo real.", color: "#0EA5E9" },
        { Icon: Wallet, title: "Billetera Digital", desc: "Recarga, envía y recibe fondos en USDT, Bolívares, PayPal o Zinli. Sin comisiones ocultas.", color: "#22C55E" },
        { Icon: Ambulance, title: "Emergencias", desc: "Protocolo de emergencia médica integrado para asistir en situaciones críticas de forma inmediata.", color: "#EF4444" },
        { Icon: Store, title: "Tienda Virtual", desc: "Crea tu perfil de negocio, sube tu catálogo y ofrece delivery incluido a tus clientes.", color: "#A855F7" },
    ] : [
        { Icon: Bike, title: "Motorcycle Rides", desc: "Fast and efficient mobility for short and medium trips. Ideal to avoid traffic.", color: "#F46E20" },
        { Icon: Car, title: "Car Rides", desc: "Comfort for groups and families. Verified drivers with vehicles in optimal condition.", color: "#F0B90B" },
        { Icon: Package, title: "Express Delivery", desc: "Package shipping, business orders and errands instantly. Real-time tracking.", color: "#0EA5E9" },
        { Icon: Wallet, title: "Digital Wallet", desc: "Top up, send and receive funds in USDT, Bolívares, PayPal or Zinli. No hidden fees.", color: "#22C55E" },
        { Icon: Ambulance, title: "Emergency", desc: "Integrated medical emergency protocol to assist in critical situations immediately.", color: "#EF4444" },
        { Icon: Store, title: "Virtual Store", desc: "Create your business profile, upload your catalog and offer integrated delivery to customers.", color: "#A855F7" },
    ];

    const values = lang === "es" ? [
        { Icon: Shield, title: "Seguridad ante todo", desc: "Verificamos cada conductor y monitoreamos cada viaje para que siempre estés protegido." },
        { Icon: Zap, title: "Velocidad y eficiencia", desc: "Respuestas inmediatas y entregas express. Tu tiempo es valioso, lo tomamos en serio." },
        { Icon: Heart, title: "Comunidad primero", desc: "Impulsamos a emprendedores locales y conductores a crecer dentro de nuestra red." },
        { Icon: Globe, title: "Inclusión financiera", desc: "Billetera multi-divisa accesible para todos, con soporte para Bolívares y criptomonedas." },
    ] : [
        { Icon: Shield, title: "Safety first", desc: "We verify every driver and monitor every trip so you are always protected." },
        { Icon: Zap, title: "Speed & efficiency", desc: "Immediate responses and express delivery. Your time is valuable — we take that seriously." },
        { Icon: Heart, title: "Community first", desc: "We empower local entrepreneurs and drivers to grow within our network." },
        { Icon: Globe, title: "Financial inclusion", desc: "Multi-currency wallet accessible to everyone, with support for Bolívares and cryptocurrencies." },
    ];

    return (
        <div className="min-h-screen bg-[var(--velocity-bg)] text-[var(--velocity-text)]">

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-[var(--velocity-border)] bg-[var(--velocity-bg)]/90 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2">
                            <LocationIconOrange size={32} />
                            <span className="font-bold text-lg text-[var(--velocity-text)]">VeloZeety</span>
                        </Link>
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ThemeToggle />
                            <Link href="/login"
                                className="hidden sm:inline px-4 py-2 rounded-xl border border-[var(--velocity-border)] text-sm font-semibold text-[var(--velocity-muted)] hover:text-[var(--velocity-text)] hover:border-[#F46E20]/40 transition">
                                {lang === "es" ? "Iniciar sesión" : "Sign in"}
                            </Link>
                            <Link href="/register"
                                className="px-4 py-2 rounded-xl text-sm font-bold text-white shadow-lg shadow-[#F46E20]/20 transition"
                                style={{ backgroundColor: "#F46E20" }}>
                                {lang === "es" ? "Registrarse" : "Sign up"}
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative py-20 md:py-32 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#F46E20] opacity-[0.06] blur-[120px] pointer-events-none" />
                <div className="max-w-4xl mx-auto px-4 text-center relative">
                    <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#F46E20]/30 bg-[#F46E20]/10 text-[#F46E20] text-xs font-bold uppercase tracking-widest mb-6"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Building2 className="w-4 h-4" />
                        {lang === "es" ? "Documentación Oficial" : "Official Documentation"}
                    </motion.div>
                    <motion.h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        {lang === "es" ? "Sobre VeloZeety" : "About VeloZeety"}
                    </motion.h1>
                    <motion.p className="text-[var(--velocity-muted)] text-xl max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                        {lang === "es"
                            ? "La plataforma multi-servicios diseñada para impulsar la movilidad, el comercio y la inclusión financiera en Venezuela."
                            : "The multi-service platform designed to drive mobility, commerce and financial inclusion in Venezuela."}
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-[var(--velocity-surface)] border-y border-[var(--velocity-border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div className="p-8 rounded-2xl border border-[#F46E20]/20 bg-[#F46E20]/5"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <div className="w-12 h-12 rounded-xl bg-[#F46E20]/15 flex items-center justify-center mb-5">
                                <Zap className="w-6 h-6 text-[#F46E20]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{lang === "es" ? "Nuestra Misión" : "Our Mission"}</h2>
                            <p className="text-[var(--velocity-muted)] leading-relaxed">
                                {lang === "es"
                                    ? "Conectar a personas, conductores y negocios a través de una plataforma tecnológica confiable, segura y accesible. Facilitamos el transporte urbano, el comercio local y la gestión financiera digital para que cada venezolano pueda moverse, vender y crecer sin barreras."
                                    : "Connect people, drivers, and businesses through a reliable, secure, and accessible technology platform. We facilitate urban transportation, local commerce, and digital financial management so every Venezuelan can move, sell, and grow without barriers."}
                            </p>
                        </motion.div>
                        <motion.div className="p-8 rounded-2xl border border-[#F0B90B]/20 bg-[#F0B90B]/5"
                            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                            <div className="w-12 h-12 rounded-xl bg-[#F0B90B]/15 flex items-center justify-center mb-5">
                                <Globe className="w-6 h-6 text-[#F0B90B]" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4">{lang === "es" ? "Nuestra Visión" : "Our Vision"}</h2>
                            <p className="text-[var(--velocity-muted)] leading-relaxed">
                                {lang === "es"
                                    ? "Ser la plataforma de movilidad y servicios más confiable de Venezuela y expandirnos hacia Latinoamérica. Queremos que VeloZeety sea sinónimo de rapidez, confianza y oportunidad económica para millones de personas."
                                    : "To be the most reliable mobility and services platform in Venezuela and expand throughout Latin America. We want VeloZeety to be synonymous with speed, trust, and economic opportunity for millions of people."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-[var(--velocity-bg)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            {lang === "es" ? "Nuestros Servicios" : "Our Services"}
                        </h2>
                        <p className="text-[var(--velocity-muted)] text-lg max-w-2xl mx-auto">
                            {lang === "es"
                                ? "Una sola plataforma, múltiples soluciones. Desde transporte hasta billetera digital."
                                : "One single platform, multiple solutions. From transportation to digital wallet."}
                        </p>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map(({ Icon, title, desc, color }, i) => (
                            <motion.div key={i}
                                className="p-6 rounded-2xl border border-[var(--velocity-border)] bg-[var(--velocity-surface)] hover:border-[#F46E20]/30 transition velocity-card"
                                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                                <div className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center" style={{ backgroundColor: `${color}1A` }}>
                                    <Icon className="w-6 h-6" style={{ color }} />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{title}</h3>
                                <p className="text-[var(--velocity-muted)] text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-[var(--velocity-surface)] border-y border-[var(--velocity-border)]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        {lang === "es" ? "Nuestros Valores" : "Our Values"}
                    </h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ Icon, title, desc }, i) => (
                            <motion.div key={i} className="text-center p-6"
                                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                                <div className="w-14 h-14 rounded-2xl bg-[#F46E20]/10 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-7 h-7 text-[#F46E20]" />
                                </div>
                                <h3 className="font-bold text-lg mb-2">{title}</h3>
                                <p className="text-[var(--velocity-muted)] text-sm leading-relaxed">{desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Coverage */}
            <section className="py-16 bg-[var(--velocity-bg)]">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                        <MapPin className="w-8 h-8 text-[#F46E20]" />
                        {lang === "es" ? "Cobertura" : "Coverage"}
                    </h2>
                    <p className="text-[var(--velocity-muted)] mb-10 text-lg">
                        {lang === "es"
                            ? "Actualmente operamos en las siguientes ciudades de Venezuela, con expansión planificada."
                            : "We currently operate in the following Venezuelan cities, with planned expansion."}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                            { city: "San Cristóbal", state: "Táchira", active: true },
                            { city: "Caracas", state: "Distrito Capital", active: false },
                            { city: "Maracaibo", state: "Zulia", active: false },
                            { city: "Valencia", state: "Carabobo", active: false },
                            { city: "Barquisimeto", state: "Lara", active: false },
                            { city: "Mérida", state: "Mérida", active: false },
                        ].map(({ city, state, active }) => (
                            <div key={city} className={`p-4 rounded-xl border text-left transition ${active
                                    ? "border-[#F46E20]/50 bg-[#F46E20]/8 text-[var(--velocity-text)]"
                                    : "border-[var(--velocity-border)] bg-[var(--velocity-surface)] text-[var(--velocity-muted)]"
                                }`}>
                                <p className="font-bold">{city}</p>
                                <p className="text-xs">{state}</p>
                                <span className={`mt-2 inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${active ? "bg-[#F46E20] text-white" : "bg-[var(--velocity-border)] text-[var(--velocity-muted)]"
                                    }`}>
                                    {active ? (lang === "es" ? "Activo" : "Active") : (lang === "es" ? "Próximamente" : "Coming soon")}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 bg-[var(--velocity-surface)] border-y border-[var(--velocity-border)]">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        {lang === "es" ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
                    </h2>
                    <div className="space-y-3">
                        {faqList.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="py-16 bg-[var(--velocity-bg)]">
                <div className="max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
                        <Users className="w-8 h-8 text-[#F46E20]" />
                        {lang === "es" ? "Contáctanos" : "Contact Us"}
                    </h2>
                    <p className="text-[var(--velocity-muted)] mb-8">
                        {lang === "es" ? "¿Tienes preguntas? Nuestro equipo está disponible 24/7." : "Got questions? Our team is available 24/7."}
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                        {[
                            { Icon: Mail, label: "Email", value: "soporte@velozeety.com", href: "mailto:soporte@velozeety.com" },
                            { Icon: Phone, label: lang === "es" ? "Teléfono" : "Phone", value: "+58 414-XXX-XXXX", href: "tel:+58414XXXXXXX" },
                            { Icon: Globe, label: lang === "es" ? "Web" : "Website", value: "velozeety.com", href: "https://velozeety.com" },
                        ].map(({ Icon, label, value, href }) => (
                            <a key={label} href={href}
                                className="p-5 rounded-2xl border border-[var(--velocity-border)] bg-[var(--velocity-surface)] hover:border-[#F46E20]/40 transition text-center group velocity-card">
                                <div className="w-12 h-12 rounded-xl bg-[#F46E20]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#F46E20]/20 transition">
                                    <Icon className="w-5 h-5 text-[#F46E20]" />
                                </div>
                                <p className="text-xs text-[var(--velocity-muted)] mb-1 font-bold uppercase tracking-wide">{label}</p>
                                <p className="font-semibold text-sm text-[var(--velocity-text)] break-all">{value}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-[#0B0E11] relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(244,110,32,0.12),transparent_70%)]" />
                <div className="max-w-2xl mx-auto px-4 text-center relative">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                        {lang === "es" ? "¿Listo para comenzar?" : "Ready to get started?"}
                    </h2>
                    <p className="text-white/60 text-lg mb-8">
                        {lang === "es"
                            ? "Únete a miles de usuarios que ya confían en VeloZeety para sus viajes y pagos diarios."
                            : "Join thousands of users who already trust VeloZeety for their daily rides and payments."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register"
                            className="btn-vz-primary text-center text-sm">
                            {lang === "es" ? "Crear cuenta gratis" : "Create free account"}
                        </Link>
                        <Link href="/login"
                            className="py-3.5 px-6 rounded-xl font-bold border border-white/20 text-white hover:bg-white/10 transition text-sm text-center">
                            {lang === "es" ? "Iniciar sesión" : "Sign in"}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer minimal */}
            <footer className="py-8 bg-[#0B0E11] border-t border-white/10 text-center">
                <p className="text-sm text-white/30">
                    © {new Date().getFullYear()} VeloZeety C.A. —{" "}
                    <Link href="/privacy" className="hover:text-white/60 transition">{lang === "es" ? "Privacidad" : "Privacy"}</Link>
                    {" · "}
                    <Link href="/terms" className="hover:text-white/60 transition">{lang === "es" ? "Términos" : "Terms"}</Link>
                </p>
            </footer>
        </div>
    );
}
