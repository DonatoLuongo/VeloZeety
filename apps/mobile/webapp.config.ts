/**
 * URL de la aplicación web (localhost:3000) para mostrarla dentro de Expo Go.
 *
 * En el teléfono debes usar la IP de tu computadora en la red local, no "localhost".
 *
 * Pasos:
 * 1. En la computadora: ejecuta la web con `npm run dev:web` (desde la raíz) o en apps/web: npm run dev.
 * 2. Anota la IP de tu PC en la red (ej. 192.168.1.158). En Linux: hostname -I
 * 3. Cambia abajo WEB_APP_URL con tu IP y puerto 3000, o crea .env con EXPO_PUBLIC_WEB_APP_URL=http://TU_IP:3000
 * 4. En apps/mobile: npx expo start. Abre Expo Go en el teléfono y escanea el QR.
 *
 * PC y teléfono en la misma Wi‑Fi.
 */
/** Cambia esta IP por la de tu PC en la red (donde corre la web en puerto 3000). */
const DEFAULT_WEB_APP_URL = "http://192.168.1.158:3000";

const base =
  (typeof process !== "undefined" &&
    process.env?.EXPO_PUBLIC_WEB_APP_URL) ||
  DEFAULT_WEB_APP_URL;

/** URL base del sitio (p. ej. http://192.168.1.158:3000). */
export const WEB_APP_URL = base;

/** URL de la app (mapa, Servicios, Perfil), no la página de inicio del sitio. */
export const WEB_APP_APP_URL = `${base.replace(/\/$/, "")}/app`;
