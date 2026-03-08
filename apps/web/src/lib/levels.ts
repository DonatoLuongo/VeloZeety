// ============================================================
// VeloZeety — Sistema de Niveles (Gamificación Empresarial)
// 8 niveles basados en velocidad animal (lento → rápido)
// Beneficios diferenciados por ROL: Cliente, Conductor, Emprendedor
// ============================================================

export type UserRole = "cliente" | "conductor" | "emprendedor";

export interface VeloLevel {
  level: number;
  name: string;
  animal: string;
  emoji: string;
  color: string;
  speedKmh: number;
  xpRequired: number;     // XP necesario para ESTE nivel (desde el anterior)
  xpAccumulated: number;  // XP total acumulado necesario
  unlocksByRole: Record<UserRole, string>;  // Beneficio principal por rol
  hasBadge: boolean;       // Si este nivel desbloquea insignia
  badgeTitle?: string;     // Título de la insignia desbloqueada
  // Retrocompat: unlocks se genera dinámicamente
}

export const VELO_LEVELS: VeloLevel[] = [
  {
    level: 1,
    name: "Caracol",
    animal: "Caracol de jardín",
    emoji: "🐌",
    color: "#8B7355",
    speedKmh: 0.05,
    xpRequired: 0,
    xpAccumulated: 0,
    unlocksByRole: {
      cliente: "Acceso básico a la plataforma",
      conductor: "Acceso básico a la plataforma",
      emprendedor: "Acceso básico a la plataforma",
    },
    hasBadge: false,
  },
  {
    level: 2,
    name: "Perezoso",
    animal: "Perezoso de tres dedos",
    emoji: "🦥",
    color: "#7C9A6E",
    speedKmh: 0.25,
    xpRequired: 800,
    xpAccumulated: 800,
    unlocksByRole: {
      cliente: "Cupón de bienvenida 10% en primer viaje",
      conductor: "Activar modo conductor disponible",
      emprendedor: "Solicitar registro de empresa",
    },
    hasBadge: false,
  },
  {
    level: 3,
    name: "Tortuga",
    animal: "Tortuga de Galápagos",
    emoji: "🐢",
    color: "#2D8B55",
    speedKmh: 0.3,
    xpRequired: 2200,
    xpAccumulated: 3000,
    unlocksByRole: {
      cliente: "Descuento 5% en viajes frecuentes",
      conductor: "Descuento 5% en comisiones por viaje",
      emprendedor: "Panel básico de analíticas de negocio",
    },
    hasBadge: true,
    badgeTitle: "Viajero Constante",
  },
  {
    level: 4,
    name: "Gila",
    animal: "Monstruo de Gila",
    emoji: "🦎",
    color: "#E07C3E",
    speedKmh: 2.4,
    xpRequired: 5000,
    xpAccumulated: 8000,
    unlocksByRole: {
      cliente: "Soporte prioritario por WhatsApp",
      conductor: "Prioridad en asignación de viajes",
      emprendedor: "Soporte empresarial dedicado",
    },
    hasBadge: false,
  },
  {
    level: 5,
    name: "Elefante",
    animal: "Elefante africano",
    emoji: "🐘",
    color: "#6B7B8D",
    speedKmh: 40,
    xpRequired: 12000,
    xpAccumulated: 20000,
    unlocksByRole: {
      cliente: "Membresía VeloPass mensual gratis",
      conductor: "Bonificación semanal por rendimiento",
      emprendedor: "Publicidad destacada en marketplace",
    },
    hasBadge: true,
    badgeTitle: "Veterano VeloZeety",
  },
  {
    level: 6,
    name: "Caballo",
    animal: "Caballo de carreras",
    emoji: "🐴",
    color: "#B8860B",
    speedKmh: 48,
    xpRequired: 25000,
    xpAccumulated: 45000,
    unlocksByRole: {
      cliente: "Badge premium visible en perfil público",
      conductor: "Badge premium · Zona exclusiva de ofertas",
      emprendedor: "Acceso a API de integración empresarial",
    },
    hasBadge: true,
    badgeTitle: "Élite Dorada",
  },
  {
    level: 7,
    name: "Guepardo",
    animal: "Guepardo",
    emoji: "🐆",
    color: "#E8A317",
    speedKmh: 120,
    xpRequired: 45000,
    xpAccumulated: 90000,
    unlocksByRole: {
      cliente: "Tarifas preferenciales en todas las rutas",
      conductor: "2do vehículo habilitado (Flete)",
      emprendedor: "Múltiples sucursales en plataforma",
    },
    hasBadge: true,
    badgeTitle: "Depredador Veloz",
  },
  {
    level: 8,
    name: "Halcón",
    animal: "Halcón Peregrino",
    emoji: "🦅",
    color: "#C41E3A",
    speedKmh: 389,
    xpRequired: 60000,
    xpAccumulated: 150000,
    unlocksByRole: {
      cliente: "0% comisión · Acceso beta exclusivo",
      conductor: "0% comisión · Acceso beta exclusivo",
      emprendedor: "0% comisión · Partner oficial VeloZeety",
    },
    hasBadge: true,
    badgeTitle: "Leyenda VeloZeety",
  },
];

// Helper: obtener el unlock string según el rol (retrocompatible)
export function getUnlockForRole(level: VeloLevel, role: UserRole): string {
  return level.unlocksByRole[role];
}

// ----- Funciones Helper -----

export interface UserLevelInfo {
  currentLevel: VeloLevel;
  nextLevel: VeloLevel | null;
  xpInCurrentLevel: number;
  xpNeededForNext: number;
  progressPercent: number;
  isMaxLevel: boolean;
  unlockedBadges: { level: number; title: string; emoji: string; color: string }[];
}

export function getLevelForXP(totalXP: number): UserLevelInfo {
  let currentLevel = VELO_LEVELS[0];

  for (let i = VELO_LEVELS.length - 1; i >= 0; i--) {
    if (totalXP >= VELO_LEVELS[i].xpAccumulated) {
      currentLevel = VELO_LEVELS[i];
      break;
    }
  }

  const isMaxLevel = currentLevel.level === 8;
  const nextLevel = isMaxLevel ? null : VELO_LEVELS[currentLevel.level];

  const xpInCurrentLevel = totalXP - currentLevel.xpAccumulated;
  const xpNeededForNext = nextLevel ? nextLevel.xpRequired : 0;
  const progressPercent = isMaxLevel
    ? 100
    : Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100));

  // Collect all unlocked badges
  const unlockedBadges = VELO_LEVELS
    .filter((l) => l.hasBadge && l.level <= currentLevel.level)
    .map((l) => ({ level: l.level, title: l.badgeTitle!, emoji: l.emoji, color: l.color }));

  return {
    currentLevel,
    nextLevel,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
    isMaxLevel,
    unlockedBadges,
  };
}

// ----- XP por Acción -----
export type XPAction =
  | "trip_completed_client"
  | "trip_completed_driver"
  | "rating_5_star"
  | "referral"
  | "store_purchase_per_usd"
  | "first_trip_month"
  | "streak_7_days"
  | "streak_30_days"
  | "vehicle_approved"
  | "business_approved"
  | "profile_100_percent"
  | "document_verified";

const XP_TABLE: Record<XPAction, number> = {
  trip_completed_client: 20,
  trip_completed_driver: 35,
  rating_5_star: 10,
  referral: 25,
  store_purchase_per_usd: 8,
  first_trip_month: 40,
  streak_7_days: 80,
  streak_30_days: 400,
  vehicle_approved: 150,
  business_approved: 250,
  profile_100_percent: 120,
  document_verified: 60,
};

export function getXPForAction(action: XPAction): number {
  return XP_TABLE[action] || 0;
}

export function getXPForReferral(totalReferrals: number): number {
  return 25 + Math.floor(totalReferrals / 10) * 3;
}

export const REFERRAL_MILESTONES: { count: number; bonusXP: number }[] = [
  { count: 10, bonusXP: 150 },
  { count: 25, bonusXP: 400 },
  { count: 50, bonusXP: 1200 },
  { count: 100, bonusXP: 3500 },
  { count: 200, bonusXP: 8000 },
];

export function checkReferralMilestone(totalReferrals: number): number {
  let bonus = 0;
  for (const milestone of REFERRAL_MILESTONES) {
    if (totalReferrals >= milestone.count) bonus = milestone.bonusXP;
  }
  return bonus;
}

export const LEVEL_REQUIREMENTS = {
  registerBusiness: 2,
  discountCommission: 3,
  prioritySupport: 4,
  veloPass: 5,
  premiumBadge: 6,
  secondVehicle: 7,
  zeroCommission: 8,
} as const;

export function canUnlock(
  userLevel: number,
  requirement: keyof typeof LEVEL_REQUIREMENTS,
): boolean {
  return userLevel >= LEVEL_REQUIREMENTS[requirement];
}
