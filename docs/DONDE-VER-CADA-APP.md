# Dónde ver cada aplicación (web vs móvil)

En el proyecto hay **dos aplicaciones distintas**. Cada una tiene su propia URL y forma de abrirla.

---

## 1. Aplicación **web** (Next.js) — como Uber.com / Binance web

**Qué es:** La página de la empresa y la **app que usas desde el navegador** (laptop o móvil). Landing, login, registro, mapa, pedir viaje, billetera, servicios, perfil. Todo en una interfaz web profesional.

**Cómo abrirla:**

```bash
cd /home/donato/Documentos/VeloCity
npm run dev:web
```

O:

```bash
cd /home/donato/Documentos/VeloCity/apps/web
npm run dev
```

**URL:** **http://localhost:3000**

- En la **laptop:** abres el navegador y vas a `http://localhost:3000`.
- En el **móvil (misma WiFi):** en el navegador del celular pones `http://IP_DE_TU_LAPTOP:3000` (ej. `http://192.168.1.158:3000`).

**Resumen:**  
`localhost:3000` = **app web** (Next.js). Es la que ves en el navegador del PC y la que puede verse igual o adaptada en el móvil.

---

## 2. Aplicación **móvil** (Expo / React Native)

**Qué es:** La app nativa para **Android e iOS**. La misma se puede:

- Abrir en el **navegador** (versión web de la app móvil).
- Abrir en **Expo Go** en el teléfono (app instalada).

**Cómo abrirla:**

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
npm install --legacy-peer-deps   # solo si hace falta
npx expo start
```

**URL en el navegador (laptop):** **http://localhost:8081**  
- En la terminal de Expo aparece un mensaje tipo “Metro waiting on…” y opciones.  
- Pulsas la tecla **`w`** y se abre una pestaña en **http://localhost:8081** con la **misma app móvil** renderizada en el navegador (react-native-web). No es la web de Next.js.

**En el móvil (Expo Go):**  
- Escaneas el **QR** que sale en la terminal con la app **Expo Go**, o escribes en Safari la URL que indica Expo (ej. `exp://192.168.x.x:8081`).  
- Ahí ves la **app móvil** en el teléfono, no la web de Next.js.

**Resumen:**  
`localhost:8081` = **app móvil** (Expo) vista en el navegador.  
**Expo Go** = misma app móvil en el teléfono.

---

## Tabla rápida

| Quiero ver…                    | Dónde                          | URL / Cómo                |
|--------------------------------|--------------------------------|----------------------------|
| Web (landing, app en navegador)| Navegador en laptop o móvil    | **http://localhost:3000**  |
| App móvil en el navegador      | Navegador en laptop            | **http://localhost:8081** (tras `npx expo start` y pulsar `w`) |
| App móvil en el teléfono       | Expo Go en el iPhone/Android   | QR o URL `exp://…` que muestra Expo |

---

## Qué es “multifuncional” en cada una

- **Web (localhost:3000):** Una sola aplicación web: landing pública, login/registro, y dentro de la app: inicio (mapa + viaje), billetera, servicios, perfil. Se usa desde **cualquier navegador** (PC o móvil). Más adelante se conecta a base de datos y API.
- **Móvil (8081 / Expo Go):** La **misma lógica** pero con interfaz pensada para pantalla táctil y app nativa. Puede compartir backend con la web más adelante.

Ambas pueden ofrecer las mismas funciones (viajes, wallet, servicios, perfil); la diferencia es la **interfaz** (web vs nativa) y **dónde las abres** (navegador vs app instalada).
