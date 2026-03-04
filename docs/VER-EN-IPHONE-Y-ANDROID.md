# Cómo ver VeloCity en tu iPhone y en Android

Hay **dos interfaces**:

- **App web** (puerto 3000): la que tienes en PC/laptop (Servicios, Perfil, dashboard, tienda). Se abre en el **navegador** (Chrome, Safari), en PC o en el teléfono.
- **App móvil** (Expo Go): la app nativa en el teléfono. Al abrirla verás una pantalla de inicio con **"Abrir en navegador"** para abrir la aplicación web en Safari/Chrome y ver cómo se ve en el móvil.

El **puerto 8081** que muestra la terminal al hacer `npx expo start` es el servidor de Expo (Metro); es normal. La app que se abre en Expo Go es la app nativa; para ver la interfaz web en el teléfono, usa "Abrir en navegador" o abre en el navegador `http://TU_IP:3000`.

---

## Opción 1: Abrir la app en el teléfono con Expo Go

En Expo Go se abre la **app nativa** (pantalla de inicio de VeloCity). Desde ahí puedes tocar **"Abrir en navegador"** para abrir la aplicación web en el navegador del teléfono y ver la interfaz adaptada al móvil (mapa, Servicios, Perfil, etc.). También puedes elegir **"Ver web dentro de la app"** para cargar la web dentro de la misma app.

### 1. En la computadora: arrancar la web (puerto 3000)

Desde la **raíz** del proyecto:

```bash
npm run dev:web
```

O desde la carpeta web:

```bash
cd apps/web
npm run dev
```

Deja esta terminal abierta; la app web debe estar en **http://localhost:3000**.

### 2. Poner la IP de tu PC en la app móvil

En el teléfono no existe "localhost": debe usar la **IP de tu computadora** en la red (ej. 192.168.1.158).

- **Opción A**: Edita `apps/mobile/webapp.config.ts` y cambia la IP en `DEFAULT_WEB_APP_URL`:

  ```ts
  const DEFAULT_WEB_APP_URL = "http://192.168.1.158:3000";  // Pon aquí tu IP
  ```

- **Opción B**: Crea `apps/mobile/.env` con:

  ```
  EXPO_PUBLIC_WEB_APP_URL=http://192.168.1.158:3000
  ```

Para saber tu IP en Linux: `hostname -I` (usa la primera, ej. 192.168.1.158).

### 3. En la computadora: arrancar Expo

En **otra terminal**:

```bash
cd apps/mobile
npm install --legacy-peer-deps
npx expo start
```

### 4. En el teléfono

- **iPhone**: Instala **Expo Go** desde la [App Store](https://apps.apple.com/app/expo-go/id982107779). Abre la **cámara**, escanea el **QR** de la terminal y toca para abrir en Expo Go.
- **Android**: Instala **Expo Go** desde [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent). Abre Expo Go, "Scan QR code" y escanea el QR.

El teléfono y la PC deben estar en la **misma Wi‑Fi**. En Expo Go verás la pantalla nativa; al tocar **"Abrir en navegador"** se abrirá Safari o Chrome con la app web (si la web está corriendo en la PC y la IP está bien en `webapp.config.ts`).

Si al usar "Ver web dentro de la app" no carga (error o pantalla en blanco), revisa que la web esté corriendo en la PC en el puerto 3000 y que la IP en `webapp.config.ts` o `.env` sea la correcta.

### Túnel (si no estás en la misma Wi‑Fi)

Si la PC y el teléfono no comparten red, en la PC puedes usar túnel para Expo: `npx expo start --tunnel`. Para que el WebView cargue la web por túnel necesitarías exponer el puerto 3000 con **ngrok** (`ngrok http 3000`) y poner esa URL en `EXPO_PUBLIC_WEB_APP_URL`. Para uso normal, misma Wi‑Fi es suficiente.

---

## Opción 2: Ver la app web en el navegador del teléfono

Si quieres ver la **misma interfaz** que en el escritorio (Servicios, Perfil, dashboard, tienda) pero en el iPhone o Android, ábrela en el **navegador** del celular.

### Misma Wi‑Fi

1. En la computadora, arranca la web:

   ```bash
   npm run dev:web
   ```

   O desde la raíz: `npm run dev` (si está configurado para la web).

2. Anota la **IP local** de tu PC (en Linux/Mac: `ip addr` o `ifconfig`; en Windows: `ipconfig`). Ejemplo: `192.168.1.100`.

3. En el teléfono (Safari en iPhone, Chrome en Android), abre:

   ```
   http://192.168.1.100:3000
   ```

   (Sustituye por tu IP y el puerto que use Next.js, normalmente `3000`.)

Así ves la app web en el móvil con la misma interfaz que en el navegador del PC.

---

## Resumen rápido

| Qué quieres ver           | Dónde              | Cómo |
|---------------------------|--------------------|-----|
| App nativa en el teléfono | **Expo Go**        | `cd apps/mobile && npx expo start` → escanear QR. Verás la pantalla de inicio; "Abrir en navegador" abre la web en Safari/Chrome. |
| Interfaz web en el móvil  | **Navegador**     | `npm run dev:web` en la PC → en el celular abrir `http://TU_IP:3000` o usar "Abrir en navegador" desde Expo Go. |

La app Expo ya está configurada para **iOS** (`com.velocity.app`) y **Android** (`package: com.velocity.app`), así que funciona en ambos con Expo Go. Para publicar en App Store o Play Store más adelante se usa EAS Build (Expo Application Services); esto sería otro paso cuando quieras generar los instalables.
