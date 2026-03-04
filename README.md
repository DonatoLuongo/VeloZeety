# VeloCity

**Tu ciudad en movimiento.**

Aplicación de movilidad tipo ride-sharing (inspirada en Uber) para una ciudad con **moto-taxi** y **taxi**. Conecta terminal, paradas fijas y urbanizaciones con conductores en tiempo real. Incluye billetera con criptomoneda, tienda, servicios ACEO (recolección de basura), jardinería y autolavado.

---

## Marca e identidad

| Elemento | Descripción |
|---------|-------------|
| **Nombre** | **VeloCity** — Velocidad + Ciudad. Profesional, memorable, motivador. |
| **Eslogan** | *Tu ciudad en movimiento* |
| **Colores** | **Primario:** `#0EA5E9` (azul eléctrico, confianza y tecnología). **Secundario:** `#F59E0B` (ámbar, energía y acción). **Fondo oscuro:** `#0F172A` (slate). |
| **Logo** | Símbolo de velocidad/rayo integrado con una silueta de ciudad o rueda. Minimalista, reconocible en app y favicon. |
| **Personalidad** | Rápido, confiable, urbano, 24/7, seguro. |

---

## Funcionalidades principales

### Para clientes
- Solicitar **moto** o **carro** desde casa o paradas hasta destino.
- **5–10 paradas oficiales** donde esperan motos y taxis (tiempo real).
- **Mapa en vivo** con ubicación de conductores y paradas.
- **Billetera (cripto)** con valor en app: pagar viajes, recargar con pago móvil, transferencia, PayPal y Binance.
- **Referidos**: invitar amigos y ganar beneficios.
- **Viajes acumulados**: programa de recompensas con **2 viajes gratis** al alcanzar metas.
- **Perfil de cliente** completo (datos, historial, preferencias).
- **Tienda virtual**: accesorios para motos y carros; personalización; descuentos para trabajadores.
- **Servicios extra**: ACEO (basura), jardinería, autolavado para vehículos propios.

### Para conductores (trabajadores)
- **Perfil de conductor** con toda la información necesaria (documentos, vehículo, calificaciones).
- Ver solicitudes en tiempo real y aceptar/cancelar.
- Beneficios en la **tienda** (descuento o porcentaje por compras).
- Ingresos y billetera en la misma app.

### Servicios adicionales (ingresos 24/7)
- **ACEO**: recolección de basura en urbanizaciones seleccionadas por el admin (ej. 10). La app entrega contenedores con publicidad; pago mensual.
- **Jardinería**: servicio a domicilio para zonas/urbanizaciones.
- **Autolavado**: lavado de carros y motos (vehículos propios de clientes), operado por la empresa.

---

## Stack tecnológico

| Área | Tecnología | Motivo |
|------|------------|--------|
| **Web** | Next.js 14 (App Router), TypeScript, Tailwind CSS | SEO, rendimiento, adaptable |
| **Mobile** | React Native (Expo) | Una base de código para Android e iOS |
| **Backend** | Node.js + NestJS, TypeScript | Escalable, tipado, módulos claros |
| **Base de datos** | PostgreSQL + Prisma | Relaciones, migraciones, tipo seguro |
| **Cache / colas** | Redis | Sesiones, real-time, jobs |
| **Tiempo real** | WebSockets (Socket.io) o Ably | Ubicación y solicitudes al instante |
| **Mapas** | Mapbox o Google Maps API | Rutas, paradas, ETA |
| **Auth** | JWT + refresh tokens, 2FA opcional | Seguridad y sesión |
| **Crypto / pagos** | API Binance, pasarelas (PayPal, pago móvil, transferencia) | Recargas y billetera |
| **Seguridad** | HTTPS, rate limiting, cifrado, OWASP, auditoría de logs | Ciberseguridad |
| **Infra** | Docker, CI/CD (GitHub Actions) | Despliegue y 24/7 |

---

## Estructura del proyecto (monorepo)

```
VeloCity/
├── apps/
│   ├── web/          # Next.js (cliente web)
│   ├── mobile/       # React Native Expo (Android + iOS)
│   └── api/          # NestJS (backend único)
├── packages/
│   ├── shared/       # Tipos, constantes, utilidades compartidas
│   └── ui/           # Componentes reutilizables (opcional)
├── docs/             # Arquitectura, API, seguridad
├── docker/           # Dockerfile y docker-compose
└── README.md
```

---

## Requisitos previos

- Node.js 20+
- npm (o pnpm; si usas pnpm, ejecuta `pnpm install` y en los scripts usa `pnpm --filter <app>` donde corresponda)
- Docker y Docker Compose (para desarrollo local)
- Cuentas: Mapbox/Google Maps, Binance (API), PayPal (sandbox/producción)

---

## Inicio rápido

```bash
# Instalar dependencias (desde la raíz del repo)
npm install

# Variables de entorno (copiar .env.example y completar)
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# Levantar base de datos y Redis
docker compose up -d

# Generar cliente Prisma y migraciones
cd apps/api && npx prisma generate && npx prisma migrate dev
cd ../..

# Desarrollo
npm run dev:web    # http://localhost:3000
npm run dev:api    # http://localhost:4000
npm run dev:mobile # Expo (Android/iOS)
```

- **Web (landing + app):** http://localhost:3000 — Página pública, login/registro y app (Inicio, Billetera, Servicios, Perfil).  
- **API:** http://localhost:4000  
- **Mobile (Expo):** `npm run dev:mobile`; en navegador **http://localhost:8081** (pulsar `w`); en teléfono usar Expo Go.  

Para entender la diferencia entre la **app web** (3000) y la **app móvil** (8081/Expo Go), ver [Dónde ver cada app](docs/DONDE-VER-CADA-APP.md). Para ver en **iPhone** ver [Ver app en iPhone](docs/VER-APP-EN-IPHONE.md). Si **Expo Go dice SDK incompatible** o faltan assets: [Solución errores Expo SDK y web](docs/EXPO-ERRORES-SDK-Y-WEB.md).

---

## Seguridad (ciberseguridad)

- Cifrado en tránsito (TLS) y sensibilidad de datos en reposo.
- Autenticación robusta (JWT, refresh, 2FA).
- Rate limiting y protección contra abuso.
- Validación y sanitización de entradas (evitar inyección).
- Headers de seguridad (CSP, HSTS, etc.).
- Auditoría y logs de acciones críticas.
- Cumplimiento de buenas prácticas OWASP.

Detalle en `docs/SECURITY.md`.

---

## Roadmap

- [ ] Fase 1: Auth, perfiles (cliente/conductor), viajes (moto/taxi), mapa y paradas.
- [ ] Fase 2: Billetera cripto, recargas (móvil, transferencia, PayPal, Binance), 2 viajes gratis y referidos.
- [ ] Fase 3: Tienda virtual y beneficios para conductores.
- [ ] Fase 4: ACEO, jardinería, autolavado y panel admin.
- [ ] Fase 5: App móvil publicable, optimización 24/7 y monitoreo.

---

## Licencia

Proyecto privado. Todos los derechos reservados.
