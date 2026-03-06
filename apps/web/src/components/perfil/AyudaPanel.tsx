"use client";

import { Mail, MessageCircle, FileText } from "lucide-react";

type AyudaPanelProps = { embedInDashboard?: boolean };

export default function AyudaPanel({ embedInDashboard }: AyudaPanelProps) {
  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Ayuda y soporte</h2>
      <p className="text-slate-500 dark:text-slate-400 text-base mb-6">Preguntas frecuentes y contacto</p>

      <div className="space-y-4 mb-6">
        <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-start gap-4 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white text-base">Preguntas frecuentes</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Cómo pedir viajes, envíos, billetera y métodos de pago.</p>
          </div>
        </div>
        <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-start gap-4 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            <Mail className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white text-base">Contacto por email</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">soporte@velocity.com</p>
          </div>
        </div>
        <div className="bg-white dark:bg-velocity-surface rounded-2xl border border-slate-200 dark:border-white/10 p-5 flex items-start gap-4 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-6 h-6 text-slate-600 dark:text-slate-300" />
          </div>
          <div>
            <p className="font-semibold text-slate-800 dark:text-white text-base">Chat en la app</p>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Atención en tiempo real desde Billetera o Perfil.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
