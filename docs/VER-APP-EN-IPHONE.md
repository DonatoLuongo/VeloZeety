# Cómo ver la app VeloCity en tu iPhone con Expo Go

## 1. Arrancar el servidor de desarrollo

En tu **Ubuntu**, desde la raíz del proyecto:

```bash
cd /home/donato/Documentos/VeloCity
npm run dev:mobile
```

O entrando en la app móvil:

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
npx expo start
```

---

## 2. Ver el QR y la URL en la terminal

Cuando Expo arranca, en la **misma terminal** deberías ver:

- Un **código QR** (dibujo en ASCII).
- Una línea como: `› Metro waiting on exp://192.168.x.x:8081`
- Opciones: `Press w │ open web`, `Press a │ open Android`, etc.

**Si no ves el QR** (pantalla pequeña o terminal sin soporte):

- Mira la línea **Metro waiting on** y copia la URL: `exp://192.168.1.xxx:8081` (tu IP puede ser distinta).

---

## 3. Conectar tu iPhone

### Opción A: Escanear el QR (misma red WiFi)

1. **iPhone y Ubuntu en la misma WiFi** (misma red).
2. En el **iPhone** abre la app **Cámara** (no Expo Go).
3. Enfoca el **código QR** que sale en la terminal de Ubuntu.
4. Te aparecerá una notificación tipo “Abrir en Expo Go”. Tócala.
5. Se abrirá Expo Go y cargará tu proyecto.

### Opción B: Poner la URL a mano en Expo Go

1. Abre **Expo Go** en el iPhone.
2. En la pantalla principal suele haber **“Enter URL manually”** / **“Escribir URL manualmente”** (o similar en la parte inferior).
3. Escribe la URL que ves en la terminal, por ejemplo:
   ```text
   exp://192.168.1.158:8081
   ```
   (sustituye por la IP que te muestre tu terminal).
4. Confirma. La app debería cargar.

### Opción C: Modo túnel (si no estás en la misma WiFi)

Si el iPhone está en otra red (por ejemplo datos móviles u otra WiFi):

```bash
cd /home/donato/Documentos/VeloCity/apps/mobile
npx expo start --tunnel
```

La primera vez puede pedir instalar `@expo/ngrok`. Acepta.

Expo generará una URL pública (tipo `exp://xxx.ngrok.io:80`). Esa URL puedes:

- Escanearla con la cámara del iPhone si Expo muestra un QR de túnel, o
- Escribirla manualmente en Expo Go en “Enter URL manually”.

Así el iPhone puede conectarse aunque no esté en la misma red que tu Ubuntu.

---

## 4. Resumen rápido

| Paso | Qué hacer |
|------|-----------|
| 1 | En Ubuntu: `cd .../VeloCity && npm run dev:mobile` |
| 2 | En la terminal: anotar la URL `exp://192.168.x.x:8081` (o la que salga) |
| 3 | iPhone en la **misma WiFi** que Ubuntu |
| 4 | **Cámara** → escanear QR **o** **Expo Go** → “Escribir URL” → pegar `exp://...` |
| Si no misma WiFi | En Ubuntu: `npx expo start --tunnel` y usar la URL/QR de túnel en el iPhone |

---

## 5. Si sigue sin aparecer nada para escanear o poner URL

- Asegúrate de que el comando que ejecutaste es **desde** `VeloCity` o `VeloCity/apps/mobile` y que no haya errores en rojo.
- Prueba a ejecutar **directamente** en la carpeta de la app:
  ```bash
  cd /home/donato/Documentos/VeloCity/apps/mobile
  npx expo start
  ```
- En **Expo Go** (iPhone), en la pestaña o menú principal, busca algo como:
  - **“Scan QR code”** / **“Escanear código QR”**
  - **“Enter URL manually”** / **“Introducir URL manualmente”**
  Suele estar en la parte inferior de la pantalla de inicio.
- Si tu terminal no dibuja el QR, ignora el QR y usa solo la **URL manual** en Expo Go con la dirección `exp://...` que ves en la terminal.

Cuando tengas la URL en Expo Go (por QR o manual), la app VeloCity debería cargar en tu iPhone.
