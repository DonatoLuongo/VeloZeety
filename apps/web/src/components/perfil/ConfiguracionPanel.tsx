"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  CheckCircle2,
  X,
  ShieldCheck,
  FileImage,
  FileDigit
} from "lucide-react";
import { BRAND } from "@velocity/shared";

type ConfiguracionPanelProps = { embedInDashboard?: boolean };

export default function ConfiguracionPanel({ embedInDashboard }: ConfiguracionPanelProps) {
  const [files, setFiles] = useState<{ name: string; type: string; size: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        type: f.type,
        size: (f.size / 1024 / 1024).toFixed(2) + " MB"
      }));
      setFiles(prev => [...prev, ...newFiles]);

      // Simular subida
      setUploading(true);
      setTimeout(() => setUploading(false), 1500);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={embedInDashboard ? "w-full max-w-4xl" : "max-w-2xl mx-auto p-4 md:p-6"}>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Configuración</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona tus preferencias de seguridad y documentación oficial.</p>
      </header>

      <div className="space-y-6">
        {/* Sección de Documentación */}
        <section className="bg-white dark:bg-[#393E46] rounded-3xl border border-slate-200 dark:border-white/5 p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-velocity-primary/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-velocity-primary" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">Documentación Legal</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Archivos para verificación de identidad y propiedad</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10 flex flex-col items-center justify-center text-center group hover:bg-slate-100 dark:hover:bg-white/10 transition-all relative">
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                multiple
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-white/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-slate-500 dark:text-slate-400" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Subir Documentos</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">PDF, JPG o PNG (Máx 10MB)</p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 dark:bg-sky-500/5 border border-sky-100 dark:border-sky-500/20">
              <h4 className="text-xs font-black text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-3">Requisitos</h4>
              <ul className="space-y-2">
                {[
                  "Cédula de Identidad / RIF",
                  "Título de Propiedad (Vehículos)",
                  "Licencia de Conducir vigente",
                  "Certificado Médico"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lista de archivos subidos */}
          {files.length > 0 && (
            <div className="space-y-3 animate-slide-up-soft">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Archivos en cola</h4>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    {file.type.includes("pdf") ? (
                      <div className="w-8 h-8 rounded-lg bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
                        <FileDigit className="w-4 h-4 text-red-500" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center">
                        <FileImage className="w-4 h-4 text-blue-500" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-white truncate max-w-[150px] md:max-w-xs">{file.name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">{file.size} • {file.type.split("/")[1]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {uploading && index === files.length - 1 ? (
                      <div className="w-4 h-4 border-2 border-velocity-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/20 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Notificaciones (Simulado) */}
        <section className="bg-white dark:bg-[#393E46] rounded-3xl border border-slate-200 dark:border-white/5 p-6 md:p-8 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Preferencias</h3>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Notificaciones Push</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Recibir alertas de servicios en tiempo real</p>
            </div>
            <div className="w-12 h-6 bg-velocity-primary rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 shadow-sm" />
            </div>
          </div>
        </section>

        <button
          className="w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-[0.98] hover:brightness-110"
          style={{ backgroundColor: BRAND.colors.primary }}
        >
          Guardar Cambios
        </button>
      </div>
    </div>
  );
}
