# Cursor más rápido en este proyecto

Este monorepo (React, Next.js, Expo) tiene **miles de archivos** en `node_modules` y en carpetas de build. Si Cursor va lento al escribir prompts, subir imágenes o al abrir el proyecto, es porque la IA intenta indexar demasiados archivos.

## Qué está hecho en el proyecto

Se creó **`.cursorignore`** en la raíz. Cursor usa este archivo (como un `.gitignore`) para **no indexar** esas rutas. Así la IA solo “ve” tu código (apps, packages) y no las dependencias ni builds.

En `.cursorignore` están ignorados, entre otros:

- `node_modules/` (y en todas las apps)
- `.next/`, `.expo/`, `dist/`, `out/`
- `.git/`
- logs, cache, coverage, archivos `.lock`

## Si sigue yendo lento: configuración en Cursor

Puedes reforzar lo anterior desde la configuración de Cursor:

1. Abre **Configuración**: `Ctrl + ,` (o Cmd + , en Mac).
2. En el buscador escribe **Indexer**.
3. En **“Files to Ignore”** (o “Archivos a ignorar”) asegúrate de que estén las carpetas pesadas. Puedes añadir, por ejemplo:
   - `**/node_modules`
   - `**/.next`
   - `**/.expo`
   - `**/dist`
   - `.git`

Así Cursor deja de indexar esas carpetas y suele ir más fluido al escribir, subir imágenes y usar la IA en este proyecto.

## Resumen

- **Proyecto**: ya tiene `.cursorignore` para no indexar `node_modules` y carpetas pesadas.
- **Cursor**: en Ajustes → Indexer → “Files to Ignore” puedes añadir las mismas rutas si quieres doble garantía.

Tu amigo tenía razón: ignorar `node_modules` (y similares) mejora mucho la velocidad de Cursor en proyectos como este.
