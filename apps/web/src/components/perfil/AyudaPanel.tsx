"use client";

import { useState } from "react";
import { Mail, MessageCircle, FileText, ChevronDown } from "lucide-react";

type AyudaPanelProps = { embedInDashboard?: boolean };

const FAQS = [
  {
    faq: "¿Cómo funciona VeloZeety?",
    ans: "VeloZeety es una app multi-servicios. Regístrate como cliente, conductor o emprendedor. Como cliente puedes pedir viajes en moto o carro, realizar delivery y pagar con tu billetera digital. Como conductor generas ingresos con tu vehículo. Como emprendedor abres tu tienda virtual y ofreces delivery integrado."
  },
  {
    faq: "¿En qué ciudades opera VeloZeety?",
    ans: "Actualmente operamos en la ciudad de San Cristóbal y zonas aledañas del estado Táchira, con planes de expansión a nivel nacional."
  },
  {
    faq: "¿Cómo recargo mi billetera digital?",
    ans: "Puedes recargar a través de Pago Móvil, transferencias bancarias nacionales o usando plataformas internacionales como Binance (P2P) y PayPal directamente desde la app."
  },
  {
    faq: "¿Es seguro viajar con VeloZeety?",
    ans: "Sí, todos nuestros conductores pasan por un riguroso proceso de verificación de identidad, documentos del vehículo y antecedentes para garantizar tu seguridad. Además, puedes compartir tu viaje en tiempo real."
  },
  {
    faq: "¿Cómo registro mi negocio en la plataforma?",
    ans: "Regístrate en la app, al momento de elegir tu rol selecciona 'Emprendedor'. Si ya tienes cuenta, ve a Configuración, cambia tu rol y completa los datos de tu empresa en el nuevo módulo que aparecerá en tu perfil."
  }
];

export default function AyudaPanel({ embedInDashboard }: AyudaPanelProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6 animate-fade-in"}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Ayuda y soporte</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-8">Preguntas frecuentes y central de contacto.</p>

      {/* Título Preguntas Frecuentes */}
      <h3 className="text-xl md:text-2xl font-black text-slate-800 dark:text-white text-center mb-6">
        Preguntas Frecuentes
      </h3>

      {/* Acordeón de FAQs */}
      <div className="space-y-3 mb-10">
        {FAQS.map((item, index) => (
          <div 
            key={index} 
            className="bg-transparent border border-slate-200 dark:border-[#2B3139] rounded-[18px] overflow-hidden transition-all duration-300"
          >
            <button
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-white/[0.02]"
            >
              <span className="font-bold text-sm md:text-base text-slate-800 dark:text-white pr-4">
                {item.faq}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-slate-400 transition-transform duration-300 flex-shrink-0 ${openFaq === index ? "rotate-180" : ""}`} 
              />
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out ${openFaq === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
            >
              <div className="px-5 pb-5 pt-1 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-[#2B3139] mx-5 mt-1">
                {item.ans}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">¿Aún necesitas ayuda? Contáctanos</h3>

      <div className="space-y-4 mb-6">
        <a 
          href="mailto:soporte@velocity.com"
          className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-5 flex items-start gap-4 transition-colors hover:border-slate-300 dark:hover:border-white/20 group cursor-pointer block shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <Mail className="w-6 h-6 text-slate-600 dark:text-slate-500" />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-base">Contacto por correo</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">soporte@velozeety.com</p>
          </div>
        </a>
        
        <a 
          href="https://wa.me/584120000000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white dark:bg-[#1E2329] rounded-2xl border-2 border-emerald-500/30 p-5 flex items-start gap-4 transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-500/5 hover:border-emerald-500/50 group cursor-pointer block shadow-sm"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            <MessageCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-500" />
          </div>
          <div>
            <p className="font-bold text-slate-800 dark:text-white text-base">Chat Asistido por WhatsApp</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5 leading-tight">Atención interactiva de Lunes a Domingo de 8AM a 9PM.</p>
          </div>
        </a>
      </div>
    </div>
  );
}
