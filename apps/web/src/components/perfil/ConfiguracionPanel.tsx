"use client";

import { useState, useEffect } from "react";
import {
  Upload,
  CheckCircle2,
  X,
  ShieldCheck,
  FileImage,
  FileDigit,
  User,
  Mail,
  Phone,
  Bell,
  UploadCloud,
  AlertTriangle,
  Trash2
} from "lucide-react";
import { BRAND } from "@velocity/shared";

type ConfiguracionPanelProps = { embedInDashboard?: boolean };
type Rol = "cliente" | "conductor" | "emprendedor";

export default function ConfiguracionPanel({ embedInDashboard }: ConfiguracionPanelProps) {
  const [rol, setRol] = useState<Rol>("cliente");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [notificaciones, setNotificaciones] = useState(true);

  const [documentos, setDocumentos] = useState<Record<string, {name: string, type: string, size: string}>>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem("velocity_user");
        if (raw) {
          const data = JSON.parse(raw);
          if (data.rol) setRol(data.rol);
          if (data.fullName) {
            const parts = data.fullName.split(" ");
            setNombre(parts[0] || "");
            setApellido(parts.slice(1).join(" ") || "");
          }
          if (data.email) setCorreo(data.email);
          if (data.phone) setTelefono(data.phone);
        }
      } catch (_) {}
    }
  }, []);

  const getRequisitos = () => {
    const base = [
      { id: "cedula", name: "Cédula de Identidad (V/E)", req: true },
      { id: "pasaporte", name: "Pasaporte", req: false }
    ];
    if (rol === "emprendedor") {
      return [...base, { id: "titulo_basico", name: "Título de Propiedad (Vehículo)", req: true }];
    }
    if (rol === "conductor") {
      return [
        ...base,
        { id: "titulo_vehiculo", name: "Título de Propiedad (Vehículos)", req: true },
        { id: "licencia", name: "Licencia de Conducir (2da, 3era o 5ta)", req: true },
        { id: "rcv", name: "Certificado Médico (RCV)", req: true }
      ];
    }
    return base; // cliente
  };

  const handleFileUpload = (reqId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDocumentos(prev => ({
        ...prev,
        [reqId]: {
          name: file.name,
          type: file.type,
          size: (file.size / 1024 / 1024).toFixed(2) + " MB"
        }
      }));
    }
  };

  const removeDocument = (reqId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newDocs = { ...documentos };
    delete newDocs[reqId];
    setDocumentos(newDocs);
  };

  const handleDeleteAccount = () => {
    if (!deleteReason.trim()) {
      alert("Por favor, indícanos el motivo por el que deseas eliminar tu cuenta.");
      return;
    }
    alert("Tu solicitud de eliminación permanente ha sido enviada al equipo de soporte. Te contactaremos en breve para finalizar el proceso.");
    setShowDeleteModal(false);
  };

  const renderUploadBox = (req: {id: string, name: string, req: boolean}) => {
    const hasFile = documentos[req.id];

    return (
      <div key={req.id} className={`border ${hasFile ? 'border-emerald-500 bg-emerald-50/10' : 'border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-white/5'} rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition relative overflow-hidden group min-h-[140px]`}>
        <input type="file" accept="image/*,.pdf" onChange={(e) => handleFileUpload(req.id, e)} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
        
        {hasFile ? (
          <>
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center mb-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            </div>
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 max-w-[120px] truncate">{hasFile.name}</p>
            <p className="text-[10px] text-emerald-600/70">{hasFile.size}</p>
            <button onClick={(e) => removeDocument(req.id, e)} className="absolute top-2 right-2 p-1 bg-red-100 rounded text-red-500 hover:bg-red-200 z-20">
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <UploadCloud className="w-5 h-5 text-slate-400 dark:text-slate-500" />
            </div>
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 px-1">{req.name}</span>
            <span className={`text-[10px] uppercase font-bold tracking-wider mt-1.5 ${req.req ? 'text-[#F46E20]' : 'text-slate-400'}`}>
              {req.req ? 'Obligatorio' : '(Opcional)'}
            </span>
          </>
        )}
      </div>
    );
  };

  const INPUT = "w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1E2329] text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-sm font-medium";

  return (
    <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-4xl mx-auto p-4 md:p-6 animate-fade-in"}>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Configuración</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Gestiona tus datos personales y documentación legal (Rol: {rol}).</p>
      </header>

      <div className="space-y-6">
        {/* Ajustes Básicos */}
        <section className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">Datos Personales</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-1">Nombre(s) Registrado</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej. Juan Carlos" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-1">Apellido(s) Registrado</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Ej. Pérez" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-1">Correo Electrónico Principal</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="correo@ejemplo.com" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-1">Número de Teléfono Movi/Fijo</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input type="tel" value={telefono} onChange={e => setTelefono(e.target.value)} placeholder="+58 412 000 0000" className={INPUT} />
              </div>
            </div>
          </div>
        </section>

        {/* Notificaciones */}
        <section className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-[#F46E20]" /> Preferencias
          </h3>
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-[#2B3139]">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-white">Notificaciones Push</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Recibir alertas de servicios en tiempo real</p>
            </div>
            <button 
              type="button"
              onClick={() => setNotificaciones(!notificaciones)}
              className={`w-12 h-6 rounded-full relative p-1 transition-colors ${notificaciones ? "bg-[#F46E20]" : "bg-slate-300 dark:bg-slate-600"}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm transition-all ${notificaciones ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </section>

        {/* Sección de Documentación Separada */}
        <section className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] p-6 shadow-sm border-t-4 border-t-sky-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Documentación Legal</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Por favor, adjunta los siguientes requerimientos asociados a tu rol.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {getRequisitos().map(req => renderUploadBox(req))}
          </div>
        </section>

        <button
          className="w-full py-4 rounded-xl font-bold text-white shadow-lg shadow-[#F46E20]/20 transition-all active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2"
          style={{ backgroundColor: BRAND.colors.primary }}
          onClick={() => {
            if (typeof window !== "undefined") {
              const u = JSON.parse(localStorage.getItem("velocity_user") || "{}");
              u.fullName = `${nombre} ${apellido}`;
              u.email = correo;
              u.phone = telefono;
              localStorage.setItem("velocity_user", JSON.stringify(u));
              alert("Configuración y documentos guardados con éxito.");
            }
          }}
        >
          <CheckCircle2 className="w-5 h-5" /> Guardar Todos los Cambios
        </button>

        {/* ELIMINAR CUENTA (ZONA DE PELIGRO) */}
        <section className="mt-12 border-t border-slate-200 dark:border-[#2B3139] pt-8">
          <h3 className="font-bold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" /> Zona de Peligro
          </h3>
          <div className="bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm md:text-base">Eliminar mi cuenta permanentemente</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-md">Una vez elimines tu cuenta, no hay vuelta atrás. Perderás tus viajes, referidos, saldo de billetera, y configuración.</p>
            </div>
            <button 
              onClick={() => setShowDeleteModal(true)}
              className="px-5 py-2.5 rounded-xl border-2 border-red-200 dark:border-red-500/30 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-100 dark:hover:bg-red-500/10 transition-colors whitespace-nowrap"
            >
              Eliminar cuenta
            </button>
          </div>
        </section>
      </div>

      {/* Modal de Eliminación Sensible */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in text-left">
          <div className="bg-white dark:bg-[#1E2329] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-scale-up border border-slate-200 dark:border-[#2B3139]">
            <div className="p-6 md:p-8">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8 text-red-600 dark:text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 text-center">¿Estás absolutamente seguro?</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm text-center mb-6 leading-relaxed">
                Esta acción elimina tus datos financieros, balances, billetera y acceso. Esta acción es <strong>irreversible</strong>.
              </p>

              <div className="mb-6">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-2">Ayúdanos a mejorar: ¿Por qué nos dejas?</label>
                <textarea 
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                  placeholder="Explica brevemente por qué deseas cerrar tu cuenta..."
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-slate-50 dark:bg-white/5 text-slate-800 dark:text-white text-sm outline-none focus:border-red-500 min-h-[100px] resize-none"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition-colors text-sm shadow-lg shadow-red-500/20"
                >
                  Sí, eliminar para siempre
                </button>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="w-full py-3.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold transition-colors text-sm"
                >
                  Cancelar, me quedo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
