/**
 * Zonas donde VeloCity opera inicialmente (Venezuela).
 * El mapa y la app trabajan en estas ubicaciones; el resto de estados puede aparecer en el mapa.
 */
export const ZONAS_VELOCITY = [
  { id: "caracas", nombre: "Distrito Capital - Caracas", center: [10.4806, -66.9036] as [number, number] },
  { id: "charallave", nombre: "Charallave - Los Valles del Tuy", center: [10.2481, -66.8572] as [number, number] },
  { id: "santa-teresa", nombre: "Santa Teresa del Tuy", center: [10.2333, -66.6667] as [number, number] },
  { id: "ocumare", nombre: "Ocumare del Tuy", center: [10.1167, -66.7833] as [number, number] },
  { id: "cua", nombre: "Cúa", center: [10.1622, -66.8825] as [number, number] },
  { id: "yare", nombre: "Yare", center: [10.1167, -66.7333] as [number, number] },
  { id: "barquisimeto", nombre: "Barquisimeto", center: [10.0731, -69.3222] as [number, number] },
  { id: "portuguesa", nombre: "Estado Portuguesa", center: [9.0942, -69.2167] as [number, number] },
  { id: "la-guaira", nombre: "La Guaira", center: [10.5991, -66.9346] as [number, number] },
  { id: "guarenas", nombre: "Guarenas", center: [10.4674, -66.6065] as [number, number] },
  { id: "guatire", nombre: "Guatire", center: [10.4762, -66.5427] as [number, number] },
  { id: "los-teques", nombre: "Los Teques", center: [10.3411, -67.0406] as [number, number] },
  { id: "maracaibo", nombre: "Maracaibo", center: [10.6666, -71.6125] as [number, number] },
] as const;

export const DEFAULT_MAP_CENTER: [number, number] = [10.4806, -66.9036]; // Caracas
export const DEFAULT_MAP_ZOOM = 11;
