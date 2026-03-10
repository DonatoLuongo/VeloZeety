"use client";

import { getLevelForXP, getUnlockForRole, VELO_LEVELS, VeloLevel, UserRole } from "@/lib/levels";
import { ChevronRight, Lock, HelpCircle, ChevronLeft, MessageCircleQuestion, Check, Zap, ChevronDown, ChevronUp, Shield } from "lucide-react";
import { useState, useEffect } from "react";

interface NivelBadgeProps {
  totalXP: number;
  rol?: UserRole;
}

export default function NivelBadge({ totalXP, rol = "cliente" }: NivelBadgeProps) {
  const info = getLevelForXP(totalXP);
  const { currentLevel, nextLevel, xpNeededForNext, isMaxLevel } = info;
  
  const [showModal, setShowModal] = useState(false);
  const [viewedLevelIndex, setViewedLevelIndex] = useState(currentLevel.level - 1);
  const viewedLevel = VELO_LEVELS[viewedLevelIndex];

  const [selectedBadge, setSelectedBadge] = useState<VeloLevel | null>(null);
  const [showAllHistory, setShowAllHistory] = useState(false);

  const THEMATIC_ELEMENTS: Record<number, string[]> = {
    1: ['🍃', '🌿', '🌱', '🌼', '🐌'],
    2: ['🌳', '🌿', '🪵', '🪴', '🦥'],
    3: ['🌴', '🪨', '🐢', '🍃', '🌊'],
    4: ['🌵', '☀️', '🪨', '🦎', '🦂'],
    5: ['🌳', '☀️', '🌾', '🐘', '🌅'],
    6: ['🌾', '💨', '🐎', '🐴', '🌻'],
    7: ['🌾', '⚡', '💨', '🐆', '🐾'],
    8: ['☁️', '💨', '🌤️', '🦅', '🌪️'],
  };

  useEffect(() => {
    if (showModal) {
      setViewedLevelIndex(currentLevel.level - 1);
      setShowAllHistory(false);
    }
  }, [showModal, currentLevel.level]);

  const handleNextLevel = () => {
    if (viewedLevelIndex < VELO_LEVELS.length - 1) setViewedLevelIndex(prev => prev + 1);
  };
  
  const handlePrevLevel = () => {
    if (viewedLevelIndex > 0) setViewedLevelIndex(prev => prev - 1);
  };

  const isViewedLevelUnlocked = totalXP >= viewedLevel.xpAccumulated;

  const allMovements = [
    {date: "14 mar", action: "Sumaste", detail: "Viaje completado", xp: "+35 XP"},
    {date: "12 mar", action: "Sumaste", detail: "Viaje completado", xp: "+35 XP"},
    {date: "10 mar", action: "Sumaste", detail: "Racha semanal", xp: "+80 XP"},
    {date: "05 mar", action: "Sumaste", detail: "Referido exitoso", xp: "+25 XP"},
    {date: "01 mar", action: "Sumaste", detail: "Primer viaje del mes", xp: "+40 XP"},
    {date: "28 feb", action: "Sumaste", detail: "Viaje completado", xp: "+35 XP"},
    {date: "26 feb", action: "Sumaste", detail: "Documento aprobado", xp: "+60 XP"},
    {date: "20 feb", action: "Sumaste", detail: "Racha mensual", xp: "+400 XP"},
  ];

  const displayedMovements = showAllHistory ? allMovements : allMovements.slice(0, 4);

  const rolLabel = rol === "conductor" ? "Conductor" : rol === "emprendedor" ? "Emprendedor" : "Cliente";

  return (
    <>
      {/* ─── Tarjeta Perfil (Estilo Cashea Animada) ─── */}
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="w-full bg-white dark:bg-velocity-surface rounded-3xl p-5 md:p-6 shadow-sm border border-slate-100 dark:border-white/10 flex items-center justify-between hover:shadow-md transition-all group overflow-hidden relative"
      >
        {/* Animated background glow */}
        <div 
           className="absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-20 rounded-full group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
           style={{ backgroundColor: currentLevel.color }}
        />

        <div className="flex flex-col items-start gap-1 relative z-10">
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            Nivel {currentLevel.level} 
          </h3>
          <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
            Tienes {totalXP.toLocaleString()} 
            <Zap className="w-4 h-4 animate-pulse" style={{color: currentLevel.color}} fill={currentLevel.color} />
          </p>
        </div>
        
        <div className="flex items-center gap-3 relative z-10">
           <div 
             className="px-5 py-3 rounded-2xl font-bold text-sm transition-transform group-hover:scale-105 group-active:scale-95 shadow-sm"
             style={{ backgroundColor: `${currentLevel.color}15`, color: currentLevel.color }}
           >
             VeloZeety Más
           </div>
           
           {/* Animal floating icon */}
           <div className="w-12 h-12 rounded-full flex items-center justify-center text-3xl hidden sm:flex shrink-0 animate-bounce"
                style={{ backgroundColor: `${currentLevel.color}10`, border: `2px solid ${currentLevel.color}20` }}>
             {currentLevel.emoji}
           </div>
        </div>
      </button>

      {/* ─── Modal Amplio (Estilo Cashea) ─── */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end justify-center animate-fade-in sm:p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full sm:max-w-2xl sm:rounded-[36px] rounded-t-[36px] shadow-2xl flex flex-col h-[92vh] sm:h-auto sm:max-h-[90vh] overflow-hidden relative transition-colors duration-500"
            onClick={(e) => e.stopPropagation()}
            style={{ backgroundColor: isViewedLevelUnlocked ? viewedLevel.color : '#64748b' }}
          >
            {/* Header Colored Area */}
            <div className="relative pt-6 px-6 pb-12 sm:pt-10 sm:px-10 sm:pb-16 transition-colors duration-500 shrink-0">
              
              {/* === THEME BACKGROUND === */}
              <div className="absolute inset-0 overflow-hidden sm:rounded-tl-[36px] sm:rounded-tr-[36px] rounded-t-[36px] pointer-events-none">
                <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
                   {THEMATIC_ELEMENTS[viewedLevel.level]?.map((emoji, i) => (
                      <div 
                        key={i} 
                        className="absolute text-5xl sm:text-7xl opacity-40 animate-pulse"
                        style={{
                          top: `${[10, 60, 20, 70, 40][i % 5]}%`,
                          left: `${[15, 80, 70, 20, 40][i % 5]}%`,
                          transform: `rotate(${[-15, 25, 10, -30, 45][i % 5]}deg) scale(${[0.8, 1.2, 0.9, 1.1, 1][i % 5]})`,
                          transition: 'all 0.5s ease-in-out'
                        }}
                      >
                        {emoji}
                      </div>
                   ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/30 pointer-events-none mix-blend-overlay" />
              </div>

              <div className="relative z-10 flex items-center justify-between mb-6 sm:mb-10">
                 <button 
                   onClick={() => setShowModal(false)}
                   className="p-1.5 -ml-1.5 rounded-full hover:bg-black/10 text-white transition-colors"
                 >
                    <ChevronLeft className="w-6 h-6" />
                 </button>
                 <span className="text-white/90 text-[13px] font-bold tracking-wide flex items-center gap-2">
                    Club VeloZeety Más
                    {!isViewedLevelUnlocked && <Lock className="w-3.5 h-3.5" />}
                 </span>
                 <button className="p-1.5 -mr-1.5 rounded-full hover:bg-black/10 text-white transition-colors">
                    <MessageCircleQuestion className="w-5 h-5" />
                 </button>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="text-left">
                    <h2 className="text-[34px] sm:text-[40px] font-extrabold text-white leading-none mb-1 shadow-black/20 text-shadow-sm">
                        Nivel {viewedLevel.level}
                    </h2>
                    <p className="text-white/90 text-[17px] sm:text-xl font-medium capitalize flex items-center gap-2 drop-shadow-sm">
                        {viewedLevel.name}
                        {viewedLevel.level === currentLevel.level && (
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-900 shadow-sm">Actual</span>
                        )}
                    </p>
                </div>
                <div className={`w-[84px] h-[84px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center text-[40px] sm:text-[50px] shadow-lg shrink-0 border-4 border-white/10 ${viewedLevel.level === currentLevel.level ? 'animate-bounce' : ''}`}
                     style={{backgroundColor: `#00000025`, backdropFilter: 'blur(4px)'}}>
                    {viewedLevel.emoji}
                </div>
              </div>

              {/* Interactive Carousel Arrows (Top placement) */}
              <div className="relative z-10 flex justify-between items-center mt-8 sm:mt-10 px-0">
                  <button 
                    onClick={handlePrevLevel}
                    disabled={viewedLevelIndex === 0}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 text-white hover:bg-black/30 hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-md shadow-sm border border-white/10"
                    aria-label="Nivel anterior"
                  >
                    <ChevronLeft className="w-6 h-6 -ml-0.5"/>
                  </button>

                  {viewedLevel.level === currentLevel.level ? (
                      <span className="text-[13px] sm:text-[14px] font-bold text-white flex items-center gap-2 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full shadow-sm border border-white/10">
                         Estás aquí <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(7ade80,0.6)]"></span>
                      </span>
                  ) : (
                      <span className="text-[12px] sm:text-[13px] font-bold text-white/90 px-4 py-2 bg-black/20 backdrop-blur-md rounded-full shadow-sm border border-white/10">
                         Nivel {viewedLevel.level} de {VELO_LEVELS.length}
                      </span>
                  )}

                  <button 
                    onClick={handleNextLevel}
                    disabled={viewedLevelIndex === VELO_LEVELS.length - 1}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 text-white hover:bg-black/30 hover:scale-105 transition-all disabled:opacity-0 disabled:pointer-events-none backdrop-blur-md shadow-sm border border-white/10"
                    aria-label="Siguiente nivel"
                  >
                    <ChevronRight className="w-6 h-6 -mr-0.5"/>
                  </button>
              </div>

              {/* Interactive Carousel Dots */}
              <div className="absolute -bottom-3 right-8 flex gap-1.5 bg-white dark:bg-[#1E2329] py-2 px-3 rounded-full shadow-xl z-20 border border-slate-100 dark:border-[#2B3139]">
                 {VELO_LEVELS.map((l, i) => (
                    <button 
                       key={i} 
                       onClick={() => setViewedLevelIndex(i)}
                       className={`h-2 rounded-full transition-all duration-300 ${i === viewedLevelIndex ? 'w-6' : 'w-2'} ${l.level <= currentLevel.level ? 'bg-slate-800 dark:bg-white' : 'bg-slate-300 dark:bg-slate-600'}`} 
                       aria-label={`Ver nivel ${l.level}`}
                    />
                 ))}
              </div>
            </div>

            {/* Bottom White Area (Scrollable Content) */}
            <div className="bg-white dark:bg-velocity-bg sm:rounded-b-[36px] rounded-t-[32px] p-6 sm:p-10 flex-1 overflow-y-auto w-full -mt-8 relative z-0 hide-scrollbar">
              
              {/* Progreso Card */}
              {(viewedLevel.level === currentLevel.level || viewedLevel.level === currentLevel.level + 1) ? (
                  <div className="mb-10 animate-fade-in-up">
                      <h3 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                        Próximo nivel
                      </h3>
                      <p className="text-[15px] text-slate-500 mb-5">
                        {isMaxLevel ? "¡Has alcanzado el nivel máximo!" : `Para alcanzar el Nivel ${nextLevel?.level}, necesitas:`}
                      </p>
                      
                      {!isMaxLevel && (
                        <div className="bg-white dark:bg-velocity-surface rounded-[24px] p-6 border border-slate-200 dark:border-white/10 flex items-center justify-between relative shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]">
                            <div className="flex flex-col items-center flex-1 text-center">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center mb-3">
                                  <Zap className="w-5 h-5" style={{color: currentLevel.color}} />
                                </div>
                                <span className="text-[22px] font-black text-slate-800 dark:text-white mb-0.5">{totalXP.toLocaleString()}</span>
                                <span className="text-[13px] font-semibold text-slate-500">XP actuales</span>
                            </div>
                            
                            <div className="w-px h-16 bg-slate-200 dark:bg-white/10 mx-2 relative z-10 flex items-center justify-center">
                                <span className="bg-white dark:bg-velocity-surface px-2 text-xs font-bold text-slate-400">→</span>
                            </div>

                            <div className="flex flex-col items-center flex-1 text-center">
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{backgroundColor: `${currentLevel.color}20`, color: currentLevel.color}}>
                                  <span className="font-black text-sm">Nv{nextLevel?.level}</span>
                                </div>
                                <span className="text-[22px] font-black text-slate-800 dark:text-white mb-0.5">{xpNeededForNext.toLocaleString()}</span>
                                <span className="text-[13px] font-semibold text-slate-500">XP meta</span>
                            </div>
                        </div>
                      )}
                  </div>
              ) : (
                  <div className="mb-8 p-5 rounded-[24px] border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02]">
                      <p className="text-center text-sm font-semibold text-slate-500">
                          {isViewedLevelUnlocked 
                              ? `Ya superaste el Nivel ${viewedLevel.level}. ¡Sigue así!`
                              : `Necesitas alcanzar ${viewedLevel.xpAccumulated.toLocaleString()} XP para llegar aquí.`}
                      </p>
                  </div>
              )}

              {/* Beneficios del nivel que se está viendo — por ROL */}
              <h3 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 mt-2">
                    Beneficio del Nivel {viewedLevel.level}
              </h3>
              <p className="text-sm text-slate-500 mb-4">Para tu perfil: <span className="font-bold text-slate-700 dark:text-slate-300">{rolLabel}</span></p>
              <div className="grid grid-cols-1 gap-4 mb-6">
                 {getUnlockForRole(viewedLevel, rol) !== "Acceso básico a la plataforma" ? (
                    <div className="p-5 rounded-[24px] border border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface shadow-sm">
                        <p className="text-[13px] font-bold text-slate-500 uppercase tracking-wide mb-3">Ventaja Principal</p>
                        <p className="font-extrabold text-xl text-slate-800 dark:text-white mb-3">{getUnlockForRole(viewedLevel, rol)}</p>
                        
                        {isViewedLevelUnlocked ? (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                                <Check className="w-3.5 h-3.5" strokeWidth={3} />
                                <span className="text-xs font-bold">Activo para ti</span>
                            </div>
                        ) : (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500">
                                <Lock className="w-3.5 h-3.5" />
                                <span className="text-xs font-bold">Bloqueado</span>
                            </div>
                        )}
                    </div>
                 ) : (
                     <div className="p-5 rounded-[24px] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.02] text-center">
                         <p className="text-sm font-medium text-slate-500">Este es el nivel inicial. ¡Gana XP para desbloquear beneficios reales!</p>
                     </div>
                 )}

                 {/* Mostrar beneficios de OTROS roles en este nivel (collapsed) */}
                 {getUnlockForRole(viewedLevel, rol) !== "Acceso básico a la plataforma" && (
                    <div className="p-4 rounded-[20px] bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5">
                       <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">Otros perfiles en Nv. {viewedLevel.level}</p>
                       <div className="space-y-2">
                          {(["cliente", "conductor", "emprendedor"] as UserRole[]).filter(r => r !== rol).map(r => (
                             <div key={r} className="flex items-center gap-2 text-[13px] text-slate-500">
                                <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200 dark:bg-white/10 px-1.5 py-0.5 rounded text-slate-500">{r === "cliente" ? "CLI" : r === "conductor" ? "CON" : "EMP"}</span>
                                <span className="font-medium">{getUnlockForRole(viewedLevel, r)}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}
                 
                 {viewedLevel.level === currentLevel.level && (
                    <div className="p-5 rounded-[24px] border border-dashed border-slate-300 dark:border-white/20 mt-2 bg-transparent">
                        <p className="text-[15px] font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-slate-400"/> ¿Cómo obtengo más XP?
                        </p>
                        <p className="text-[14px] text-slate-500 leading-relaxed">
                        Gana experiencia completando viajes a tiempo, acumulando referidos y manteniendo rachas semanales. Las compras en comercios afiliados también suman puntos directamente a tu nivel.
                        </p>
                    </div>
                 )}
              </div>

              {/* Carousel controls removed from here, moved to header area */}

              {/* Insignias Section */}
              <h3 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                    Insignias de Prestigio
              </h3>
              <p className="text-sm text-slate-500 mb-5">Toca una insignia para ver los detalles.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
                  {VELO_LEVELS.filter(l => l.hasBadge).map(l => {
                    const unlocked = l.level <= currentLevel.level;
                    return (
                        <button 
                            key={l.level} 
                            onClick={() => setSelectedBadge(l)}
                            className={`p-5 rounded-[24px] border flex flex-col items-center text-center transition-all focus:outline-none ${unlocked ? 'border-slate-200 dark:border-white/10 bg-white dark:bg-velocity-surface shadow-sm hover:-translate-y-1 hover:shadow-md cursor-pointer' : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] filter grayscale opacity-60 cursor-pointer hover:opacity-80'}`}
                        >
                            <div className="w-12 h-12 rounded-2xl mb-3 flex items-center justify-center text-2xl drop-shadow-sm transition-transform" style={{backgroundColor: `${l.color}15`, color: l.color}}>
                                {unlocked ? l.emoji : <Lock className="w-5 h-5 text-slate-400"/>}
                            </div>
                            <span className="text-[13px] font-bold text-slate-800 dark:text-white leading-tight mb-2">{l.badgeTitle}</span>
                            <span className={`text-[10px] uppercase tracking-widest font-black rounded px-2 py-0.5 mt-auto ${unlocked ? 'text-white shadow-sm' : 'text-slate-500 bg-slate-200 dark:bg-slate-700'}`} style={unlocked ? {backgroundColor: l.color} : {}}>Nv {l.level}</span>
                        </button>
                    )
                  })}
              </div>

              {/* Tus movimientos (Expansible) */}
              <div className="pb-8">
                  <h3 className="text-[22px] sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 flex items-center justify-between">
                        Tus Movimientos
                        <span className="text-sm font-semibold text-slate-400 border border-slate-200 dark:border-white/10 px-3 py-1 rounded-full">{totalXP.toLocaleString()} XP Total</span>
                  </h3>
                  <p className="text-[15px] text-slate-500 mb-6">
                     Historial reciente de cómo has ganado experiencia en VeloZeety.
                  </p>
                  
                  <div className="space-y-3 relative">
                     {displayedMovements.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-white dark:bg-velocity-surface border border-slate-100 dark:border-white/5 rounded-[20px] transition-colors hover:border-slate-300 dark:hover:border-white/10 group">
                           <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-[14px] bg-slate-50 dark:bg-[#1E2329] shadow-inner flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-lg group-hover:scale-110 transition-transform">
                                 +
                              </div>
                              <div>
                                 <p className="font-extrabold text-[15px] text-slate-800 dark:text-white leading-tight mb-0.5">{item.action}</p>
                                 <p className="text-[13px] font-medium text-slate-500 flex items-center gap-1.5 text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px] sm:max-w-none">
                                    {item.detail} <span className="font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-1.5 rounded">{item.xp}</span>
                                 </p>
                              </div>
                           </div>
                           <span className="text-[13px] font-bold text-slate-400 bg-slate-50 dark:bg-[#1E2329] px-3 py-1.5 rounded-full whitespace-nowrap">{item.date}</span>
                        </div>
                     ))}
                     
                     {allMovements.length > 4 && (
                        <div className="pt-2 text-center">
                            <button 
                                onClick={() => setShowAllHistory(!showAllHistory)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 font-bold text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors active:scale-95"
                            >
                                {showAllHistory ? (
                                    <>Ver menos <ChevronUp className="w-4 h-4" /></>
                                ) : (
                                    <>Ver historial completo ({allMovements.length}) <ChevronDown className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                     )}
                  </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Badge Info Popup (Estilo Discord) ─── */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedBadge(null)}>
            <div 
               className="bg-white dark:bg-[#1E2329] w-full max-w-xs rounded-2xl overflow-hidden shadow-2xl relative border border-slate-200 dark:border-white/10"
               onClick={e => e.stopPropagation()}
            >
                {/* Banner de color del badge */}
                <div className="h-16 w-full relative" style={{background: `linear-gradient(135deg, ${selectedBadge.color}, ${selectedBadge.color}CC)`}}>
                   <button 
                      onClick={() => setSelectedBadge(null)}
                      className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm transition-colors"
                   >
                      <ChevronDown className="w-4 h-4"/>
                   </button>
                </div>
                
                {/* Ícono sobresaliendo */}
                <div className="px-6 pb-6 relative -mt-8 text-center">
                    <div 
                        className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-[32px] shadow-lg border-[3px] border-white dark:border-[#1E2329] relative z-10 mb-3"
                        style={{backgroundColor: totalXP >= selectedBadge.xpAccumulated ? `${selectedBadge.color}20` : '#f1f5f9'}}
                    >
                        {totalXP >= selectedBadge.xpAccumulated ? selectedBadge.emoji : <Lock className="w-6 h-6 text-slate-400"/>}
                    </div>

                    <h4 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 leading-tight">
                        {selectedBadge.badgeTitle}
                    </h4>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-white/5 rounded-full mb-3">
                        <Shield className="w-3 h-3 text-slate-400"/>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Insignia · Nivel {selectedBadge.level}</span>
                    </div>

                    <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed mb-1">
                        {totalXP >= selectedBadge.xpAccumulated 
                            ? `Obtenida al alcanzar el Nivel ${selectedBadge.level} (${selectedBadge.name}). Se muestra de forma permanente en tu perfil.`
                            : `Se desbloquea al alcanzar ${selectedBadge.xpAccumulated.toLocaleString()} XP total.`}
                    </p>

                    {!(totalXP >= selectedBadge.xpAccumulated) && (
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/10">
                            <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mb-1.5">
                                <div className="h-full rounded-full transition-all" style={{width: `${Math.min(100, (totalXP / selectedBadge.xpAccumulated)*100)}%`, backgroundColor: selectedBadge.color}}></div>
                            </div>
                            <p className="text-[11px] font-bold text-slate-400">{totalXP.toLocaleString()} / {selectedBadge.xpAccumulated.toLocaleString()} XP · {Math.round((totalXP / selectedBadge.xpAccumulated)*100)}%</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
      )}
    </>
  );
}
