# Plan de Mejoras Técnicas - VeloZeety

Este documento detalla las áreas de mejora identificadas en la arquitectura del monorepositorio VeloZeety (NestJS + Next.js + Shared).

## 1. Backend (API - NestJS)

### Prioridad Alta
- [ ] **Implementar Swagger (OpenAPI):**
  - **Objetivo:** Generar documentación automática e interactiva de los endpoints.
  - **Acción:** Instalar `@nestjs/swagger` y configurarlo en `main.ts`.
  - **Beneficio:** Facilita la integración con el frontend y la prueba de endpoints.

- [ ] **Validación de Variables de Entorno:**
  - **Objetivo:** Evitar que la API arranque si faltan configuraciones críticas (DB, JWT secrets).
  - **Acción:** Usar `Joi` o `Zod` dentro del `ConfigModule` para validar `process.env`.

### Prioridad Media
- [ ] **Logging Estructurado:**
  - **Objetivo:** Mejorar la observabilidad en producción.
  - **Acción:** Reemplazar `console.log` con `nestjs-pino` o el `Logger` nativo configurado para JSON.
  
- [ ] **Seguridad HTTP & Rate Limiting:**
  - **Objetivo:** Proteger contra ataques comunes y fuerza bruta.
  - **Acción:** Implementar `helmet` (cabeceras seguras) y `@nestjs/throttler`.

- [ ] **Prefijo Global de API:**
  - **Objetivo:** Versionado y organización.
  - **Acción:** Añadir `app.setGlobalPrefix('api/v1')` en `main.ts`.

---

## 2. Frontend (Web - Next.js)

### Prioridad Alta
- [ ] **Optimización de Mapas:**
  - **Objetivo:** Reducir el tamaño del bundle y mejorar el rendimiento.
  - **Acción:** Decidir entre `@react-google-maps/api` O `react-leaflet`. Eliminar la dependencia no utilizada.

### Prioridad Media
- [ ] **Gestión de Estado del Servidor:**
  - **Objetivo:** Manejar caché, reintentos y estados de carga eficientemente.
  - **Acción:** Integrar **TanStack Query (React Query)** o **SWR** para peticiones de datos.

- [ ] **Validación de Entorno (Type-safe):**
  - **Objetivo:** Autocompletado y validación de variables de entorno en el cliente/servidor.
  - **Acción:** Utilizar `@t3-oss/env-nextjs` o similar.

---

## 3. Arquitectura Monorepo & Shared

### Prioridad Alta
- [ ] **Lógica de Validación Compartida:**
  - **Objetivo:** DRY (Don't Repeat Yourself) entre Backend y Frontend.
  - **Acción:** Mover esquemas de validación (Zod o DTOs con class-validator) al paquete `@velocity/shared`.
  - **Beneficio:** Si cambia una regla de negocio, se actualiza en ambos lados automáticamente.

---

## 4. DevOps, Calidad y CI/CD

### Prioridad Alta
- [ ] **Pipeline de CI/CD (GitHub Actions):**
  - **Objetivo:** Automatizar la calidad del código.
  - **Acción:** Crear `.github/workflows/ci.yml` que ejecute `lint`, `build` y `test` en cada Pull Request.

- [ ] **Dockerización para Producción:**
  - **Objetivo:** Despliegues inmutables y escalables.
  - **Acción:** Crear `Dockerfile` optimizados (multi-stage builds) para `apps/api` y `apps/web`.

### Prioridad Baja
- [ ] **Hooks de Git (Husky):**
  - **Objetivo:** Prevenir commits con código roto o mal formateado.
  - **Acción:** Configurar Husky y lint-staged para ejecutar linter antes del commit.
