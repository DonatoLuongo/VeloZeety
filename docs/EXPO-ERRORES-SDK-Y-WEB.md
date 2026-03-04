# Solución a errores de Expo (SDK 54 y web)

## 0. Conflicto de dependencias (ERESOLVE / @types/react)

Si al hacer `npm install` o `npx expo install --fix` ves un error de **ERESOLVE** o **Conflicting peer dependency: @types/react**, haz lo siguiente:

En el proyecto se añadió **`apps/mobile/.npmrc`** con `legacy-peer-deps=true`. Aun así, si instalas desde la **raíz** del monorepo, puede fallar. En ese caso:

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
npm install --legacy-peer-deps
```

Luego arranca Expo desde esa misma carpeta:

```bash
npx expo start
```

Si quieres instalar todo el monorepo desde la raíz y que mobile use dependencias permisivas, en la raíz puedes crear `.npmrc` con `legacy-peer-deps=true` (afecta a todos los workspaces).

---

## 1. "Project is incompatible with this version of Expo Go"

Tu iPhone tiene **Expo Go para SDK 54** y el proyecto estaba en **SDK 50**.

**Qué se hizo en el código:** El proyecto se actualizó a **Expo SDK 54** (`expo": "~54.0.0"`, `react-native": "0.76.0"`) en `apps/mobile/package.json`, y el `app.json` usa `./assets/velocity-logo.png` para icon, splash y adaptive icon (ya no pide `icon.png` ni `splash.png` que faltaban).

**Qué hacer tú en la terminal:**

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
rm -rf node_modules
npm install
npx expo install --fix
```

Luego vuelve a arrancar:

```bash
npx expo start
```

Y en el iPhone (misma WiFi) escanea el QR o abre la URL en Safari. Debería ser compatible con Expo Go SDK 54.

---

## 2. "Unable to resolve asset ./assets/icon.png"

Ese error salía porque `app.json` apuntaba a `icon.png` y `splash.png`, que no existían.

**Qué se hizo:** En `app.json` se cambió a `./assets/velocity-logo.png` para `icon`, `splash.image` y `adaptiveIcon.foregroundImage`. Asegúrate de tener el archivo `apps/mobile/assets/velocity-logo.png`.

---

## 3. "Web support - react-native-web, react-dom, @expo/metro-runtime"

Si al pulsar **`w`** (web) en la terminal de Expo te pide instalar dependencias para web:

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
npx expo install react-native-web react-dom @expo/metro-runtime
```

Luego reinicia Expo (`npx expo start`) y vuelve a pulsar **`w`** para abrir la app en el navegador.

---

## Resumen de comandos (en orden)

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
rm -rf node_modules
npm install
npx expo install --fix
npx expo install react-native-web react-dom @expo/metro-runtime
npx expo start
```

Después: escanear QR con el iPhone o pulsar **`w`** para ver la app en el navegador.
