"use client";

import { useState } from "react";
import { ArrowLeft, Car, AlertCircle, FileText, ShieldCheck, ChevronRight, Plus, Bike, Truck, UploadCloud, Lock, Send } from "lucide-react";
import { getLevelForXP, canUnlock, VELO_LEVELS } from "@/lib/levels";

type VehiculosPanelProps = { embedInDashboard?: boolean };

export default function VehiculosPanel({ embedInDashboard }: VehiculosPanelProps) {
  const [adding, setAdding] = useState(false);
  const [tipo, setTipo] = useState<"Moto" | "Carro" | "4x4" | "Camión">("Carro");
  const [expandedVehiculo, setExpandedVehiculo] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [requestReason, setRequestReason] = useState("");
  const [requestSent, setRequestSent] = useState(false);

  // Mock: XP del usuario (mismo que en perfil)
  const userXP = 2350;
  const levelInfo = getLevelForXP(userXP);
  const userLevel = levelInfo.currentLevel.level;
  const canAddSecondVehicle = canUnlock(userLevel, "secondVehicle");
  const hasVehicle = true; // Mock: ya tiene 1 vehículo registrado
  const guepardoLevel = VELO_LEVELS.find(l => l.level === 7)!;

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-900 dark:text-white font-medium placeholder:text-slate-400 bg-white dark:bg-[#1E2329]";
  const selectClass = "w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] focus:ring-2 focus:ring-[#F46E20]/20 focus:border-[#F46E20] outline-none transition text-slate-900 dark:text-white font-medium bg-white dark:bg-[#1E2329] appearance-none cursor-pointer";
  const labelClass = "block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1.5";
  const optionClass = "bg-white dark:bg-[#1E2329] text-slate-900 dark:text-white";

  const renderUploadBox = (label: string, optional = false) => (
    <div className="border border-dashed border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-white/5 rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-white/10 transition relative overflow-hidden group min-h-[120px]">
      <input type="file" accept="image/*,.pdf" multiple className="absolute inset-0 opacity-0 cursor-pointer z-10" />
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <UploadCloud className="w-5 h-5 text-slate-400 dark:text-slate-500" />
      </div>
      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 px-1">{label}</span>
      {optional && <span className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">(Opcional)</span>}
    </div>
  );

  return (
    <div className={embedInDashboard ? "w-full animate-fade-in" : "max-w-2xl mx-auto p-4 md:p-6 animate-fade-in"}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {adding && (
            <button
              onClick={() => setAdding(false)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] hover:bg-slate-50 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
              aria-label="Volver Atrás"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{adding ? "Registrar Vehículo" : "Mis Vehículos"}</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Validación y control de flota activa.</p>
          </div>
        </div>
        {!adding && hasVehicle && (
          <div className="relative group/tooltip">
            {canAddSecondVehicle ? (
              <button
                onClick={() => setShowRequestModal(true)}
                className="px-5 py-2.5 bg-[#F46E20] text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-[#F46E20]/20 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Solicitar 2do Vehículo</span>
              </button>
            ) : (
              <>
                <button
                  disabled
                  className="px-4 py-2.5 bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-500 text-sm font-bold rounded-xl flex items-center gap-2 cursor-not-allowed border border-slate-200 dark:border-white/10"
                >
                  <Lock className="w-4 h-4" /> <span className="hidden sm:inline">Límite 1 Vehículo</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-72 p-3.5 bg-slate-800 dark:bg-slate-700 text-white text-xs rounded-xl shadow-xl opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10 hidden sm:block">
                  <p className="font-bold mb-1.5 flex items-center gap-1.5">
                    {guepardoLevel.emoji} Requiere Nivel {guepardoLevel.level} ({guepardoLevel.name})
                  </p>
                  <p className="text-white/70 leading-relaxed">
                    Tu nivel actual es <strong className="text-white">{levelInfo.currentLevel.emoji} {levelInfo.currentLevel.name} (Nv{userLevel})</strong>. 
                    Necesitas alcanzar {guepardoLevel.xpAccumulated.toLocaleString()} XP para desbloquear un 2do vehículo.
                  </p>
                  <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-[#E8A317]" style={{ width: `${Math.min(100, (userXP / guepardoLevel.xpAccumulated) * 100)}%` }} />
                  </div>
                  <p className="text-white/50 text-[10px] mt-1 tabular-nums">{userXP.toLocaleString()} / {guepardoLevel.xpAccumulated.toLocaleString()} XP</p>
                </div>
              </>
            )}
          </div>
        )}
        {!adding && !hasVehicle && (
          <button
            onClick={() => setAdding(true)}
            className="px-5 py-2.5 bg-[#F46E20] text-white text-sm font-bold rounded-xl hover:brightness-110 transition-all active:scale-[0.98] shadow-lg shadow-[#F46E20]/20 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Añadir Vehículo</span>
          </button>
        )}
      </div>

      {/* Modal de Solicitud de 2do Vehículo */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => { setShowRequestModal(false); setRequestSent(false); setRequestReason(""); }}>
          <div className="bg-white dark:bg-[#1E2329] rounded-2xl border border-slate-200 dark:border-[#2B3139] shadow-2xl w-full max-w-md overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="h-1.5 bg-[#E8A317]" />
            <div className="p-6">
              {requestSent ? (
                <div className="text-center py-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-emerald-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Solicitud Enviada</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Tu solicitud será revisada por el equipo de VeloZeety en las próximas 24-48 horas.</p>
                  <button onClick={() => { setShowRequestModal(false); setRequestSent(false); setRequestReason(""); }} className="px-6 py-2.5 bg-[#F46E20] text-white font-bold rounded-xl text-sm hover:brightness-110 transition">
                    Entendido
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: "#E8A31715", border: "2px solid #E8A31730" }}>
                      {guepardoLevel.emoji}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 dark:text-white">Solicitar 2do Vehículo</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Nivel {userLevel} ({levelInfo.currentLevel.name}) · Privilegio Guepardo</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">Motivo de la solicitud</label>
                    <textarea
                      value={requestReason}
                      onChange={(e) => setRequestReason(e.target.value)}
                      placeholder="Ej: Soy propietario de un camión y quiero ofrecer servicio de fletes los fines de semana..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#181C21] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#E8A317]/20 focus:border-[#E8A317] transition text-sm resize-none"
                    />
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 mb-4">
                    <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                      <strong>Nota:</strong> El segundo vehículo solo puede ser de tipo Camión/Flete. Se verificará documentación adicional (título de propiedad, seguro de carga).
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => { setShowRequestModal(false); setRequestReason(""); }} className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-[#2B3139] text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition">
                      Cancelar
                    </button>
                    <button
                      disabled={requestReason.trim().length < 20}
                      onClick={() => setRequestSent(true)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-[#E8A317] hover:brightness-110 transition shadow-lg shadow-[#E8A317]/20 flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" /> Enviar Solicitud
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {adding ? (
        <div className="bg-white dark:bg-[#1E2329] border border-slate-200 dark:border-[#2B3139] rounded-2xl p-6 shadow-sm overflow-hidden animate-fade-in-up transition-colors">
          <div className="p-4 mb-6 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400">Requisitos Legales Estrictos VeloZeety</h3>
              <p className="text-xs text-amber-700 dark:text-amber-400/80 mt-1 leading-relaxed">
                Para el ingreso y certificación de cualquier vehículo, es <strong>obligatorio</strong> adjuntar la documentación correcta. Documentos falsos resultarán en bloqueo permanente.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setAdding(false); }}>

            {/* Tabs de tipo de vehículo */}
            <div>
              <label className={labelClass}>Tipo de Vehículo</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {(["Moto", "Carro", "4x4", "Camión"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTipo(t)}
                    className={`flex flex-col items-center justify-center py-3 rounded-xl border-2 font-bold transition-colors ${tipo === t ? "border-[#F46E20] bg-[#F46E20]/10 text-[#F46E20]" : "border-slate-200 dark:border-[#2B3139] bg-white dark:bg-[#1E2329] text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                  >
                    {t === "Moto" && <Bike className="w-5 h-5 mb-1" />}
                    {(t === "Carro" || t === "4x4") && <Car className="w-5 h-5 mb-1" />}
                    {t === "Camión" && <Truck className="w-5 h-5 mb-1" />}
                    <span className="text-xs">{t}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Datos Comunes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Placa / Patente</label><input required type="text" placeholder="Ej. ABC-123" className={inputClass} /></div>
              <div><label className={labelClass}>Marca y Modelo</label><input required type="text" placeholder={`Ej. ${tipo === 'Moto' ? 'Empire Keeway' : 'Ford Cargo 815'}`} className={inputClass} /></div>
              <div><label className={labelClass}>Color</label><input required type="text" placeholder="Ej. Blanco" className={inputClass} /></div>
              <div><label className={labelClass}>Año</label><input required type="number" min="1990" max="2025" placeholder="Ej. 2018" className={inputClass} /></div>
              <div>
                <label className={labelClass}>Estado Mecánico/Estético</label>
                <select className={selectClass}>
                  <option className={optionClass}>Excelente</option>
                  <option className={optionClass}>Bueno</option>
                  <option className={optionClass}>Regular (Aceptable)</option>
                </select>
              </div>

              {/* Información Dinámica según Tipo */}
              {tipo === "Moto" && (
                <div><label className={labelClass}>Cilindrada (CC)</label><input type="text" placeholder="Ej. 150cc" className={inputClass} /></div>
              )}
              {tipo === "Carro" && (
                <div>
                  <label className={labelClass}>Capacidad Pasajeros</label>
                  <select className={selectClass}>
                    <option className={optionClass}>4 Asientos</option>
                  </select>
                </div>
              )}
              {tipo === "4x4" && (
                <div>
                  <label className={labelClass}>Capacidad Pasajeros</label>
                  <select className={selectClass}>
                    <option className={optionClass}>4 Asientos</option>
                    <option className={optionClass}>6 Asientos</option>
                  </select>
                </div>
              )}
              {tipo === "Camión" && (
                <div><label className={labelClass}>Capacidad Carga (Kg)</label><input type="text" placeholder="Ej. 3500 kg" className={inputClass} /></div>
              )}
            </div>

            <div className="border-t border-slate-100 dark:border-[#2B3139] pt-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#F46E20]" />
                Documentación del Titular
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {renderUploadBox("Cédula de Identidad (V/E)")}
                {renderUploadBox("RIF Vigente")}
                {renderUploadBox("Pasaporte", true)}
              </div>
            </div>

            <div className="border-t border-slate-100 dark:border-[#2B3139] pt-5">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#F46E20]" />
                Documentación del Vehículo
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {renderUploadBox("Carnet de Circulación")}
                {renderUploadBox("Seguro RCV")}
                {renderUploadBox("Foto de la Placa")}
                {renderUploadBox("Fotos Exteriores (4 vistas)")}
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-3">
              <button type="button" onClick={() => setAdding(false)} className="px-5 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2B3139] hover:bg-slate-50 dark:hover:bg-white/5 transition flex-1 md:flex-none order-2 md:order-1">
                Cancelar y Volver
              </button>
              <button type="submit" className="flex-1 px-5 py-3 rounded-xl font-bold text-white bg-[#F46E20] hover:brightness-110 shadow-lg shadow-[#F46E20]/20 transition active:scale-[0.98] order-1 md:order-2">
                Someter a Verificación Legal
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-4">
          <div 
            onClick={() => setExpandedVehiculo(expandedVehiculo === "1" ? null : "1")}
            className={`bg-white dark:bg-[#1E2329] border-2 ${expandedVehiculo === "1" ? "border-emerald-500" : "border-emerald-500/30 hover:border-emerald-500/50"} rounded-2xl shadow-sm transition-all cursor-pointer group overflow-hidden`}
          >
            <div className="p-5 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-500 group-hover:scale-105 transition-transform">
                <Car className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base md:text-lg">Toyota Yaris (2021)</h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/20 whitespace-nowrap">Aprobado</span>
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium tracking-tight">Placa: AD345FG · Color: Gris Plomo</p>
                <div className="flex items-center gap-4 mt-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 flex-wrap">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><ShieldCheck className="w-3.5 h-3.5" /> RCV Ok</span>
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400"><FileText className="w-3.5 h-3.5" /> Docs Ok</span>
                </div>
              </div>
              <button 
                className="p-2 md:p-3 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-all active:scale-90 group-hover:text-slate-800 dark:group-hover:text-white flex-shrink-0"
              >
                <ChevronRight className={`w-5 h-5 md:w-6 md:h-6 transition-transform ${expandedVehiculo === "1" ? "rotate-90" : ""}`} />
              </button>
            </div>

            {/* Detalles Expandidos */}
            {expandedVehiculo === "1" && (
              <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-white/5 animate-slide-down">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Información Detallada</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Tipo</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Carro</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Asientos</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">4 Asientos</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Estado Físico</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Excelente</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">Registro</p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">01/03/2026</p>
                  </div>
                  <div className="col-span-2 sm:col-span-3">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold mb-1.5">Documentos Adjuntos</p>
                    <div className="flex gap-2 text-xs font-bold text-sky-600 dark:text-sky-400 flex-wrap">
                      <span className="bg-sky-50 dark:bg-sky-500/10 px-2 py-1 justify-center rounded border border-sky-100 dark:border-sky-500/20 flex gap-1 items-center">
                        <FileText className="w-3 h-3" /> Carnet de Circulación
                      </span>
                      <span className="bg-sky-50 dark:bg-sky-500/10 px-2 py-1 rounded border border-sky-100 dark:border-sky-500/20 flex items-center gap-1">
                         <FileText className="w-3 h-3" /> Seguro RCV
                      </span>
                      <span className="bg-sky-50 dark:bg-sky-500/10 px-2 py-1 rounded border border-sky-100 dark:border-sky-500/20 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Placa y Fotos
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button className="px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    Eliminar Vehículo
                  </button>
                  <button className="px-4 py-2 text-xs font-bold text-[#F46E20] border border-[#F46E20] hover:bg-[#F46E20]/5 rounded-lg transition-colors">
                    Actualizar Seguro
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
