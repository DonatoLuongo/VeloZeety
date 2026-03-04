# Cómo ver la app móvil sin usar la cámara del iPhone

Si la cámara del iPhone no funciona o Expo Go no te permite escribir la URL a mano, puedes ver la app así:

---

## Opción 1: Abrir la app en el navegador (recomendado)

La app está hecha con **Expo**, que puede ejecutarse en la **web**. Así ves el mismo proyecto en el PC y puedes probar diseño y flujos.

1. En **Ubuntu**, en la terminal:
   ```bash
   cd /home/donato/Documentos/VeloCity/apps/mobile
   npx expo start
   ```
2. Cuando arranque Metro, pulsa la tecla **`w`** (web).
3. Se abrirá una pestaña en el navegador con la app (por ejemplo `http://localhost:8081`).
4. En el navegador puedes:
   - Redimensionar la ventana para simular un móvil.
   - Usar las herramientas de desarrollo (F12) y activar el “modo dispositivo” para verla como en un iPhone.

**Ventaja:** No necesitas cámara ni escribir URL en el iPhone; ves la app en el PC y puedes hacer cambios y recargar.

---

## Opción 2: Escribir la URL en Safari (iPhone)

Aunque Expo Go no tenga “Escribir URL” visible:

1. En Ubuntu ejecuta:
   ```bash
   cd /home/donato/Documentos/VeloCity/apps/mobile
   npx expo start
   ```
2. En la terminal verás algo como: `exp://192.168.1.xxx:8081`.
3. En el **iPhone**, abre **Safari** (no Expo Go) y escribe en la barra de direcciones esa URL exacta, por ejemplo:
   ```text
   exp://192.168.1.158:8081
   ```
4. Pulsa “Ir”. Safari puede preguntar si quieres abrir en Expo Go; acepta y se abrirá la app en Expo Go.

**Requisito:** iPhone y PC en la **misma red WiFi**.

---

## Opción 3: Modo túnel y pegar URL en Safari

Si no estás en la misma WiFi:

1. En Ubuntu:
   ```bash
   cd /home/donato/Documentos/VeloCity/apps/mobile
   npx expo start --tunnel
   ```
2. Espera a que aparezca una URL pública (tipo `exp://xxx.ngrok.io`).
3. En el **iPhone**, en **Safari**, escribe o pega esa URL y ábrela. Cuando pida abrir en Expo Go, acepta.

Así puedes ver la app en el iPhone sin usar la cámara.

---

## Resumen

| Método              | Dónde ves la app | ¿Necesitas cámara? |
|---------------------|-------------------|---------------------|
| **Expo en el navegador (`w`)** | PC / laptop       | No                  |
| **Safari + URL exp://**        | iPhone (Expo Go)  | No                  |
| **Túnel + Safari**             | iPhone (Expo Go)  | No                  |

Para ir haciendo mejoras y viendo cómo queda, la opción más práctica suele ser **Expo en el navegador** (opción 1).
