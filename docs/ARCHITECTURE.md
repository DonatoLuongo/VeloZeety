# Arquitectura VeloCity

## Visión general

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                     CLIENTES                             │
                    │  (Web Next.js · Android · iOS React Native)              │
                    └─────────────────────────┬───────────────────────────────┘
                                              │ HTTPS / WSS
                    ┌─────────────────────────▼───────────────────────────────┐
                    │                    API Gateway / Load Balancer           │
                    └─────────────────────────┬───────────────────────────────┘
                                              │
        ┌─────────────────────────────────────┼─────────────────────────────────────┐
        │                                     │                                      │
        ▼                                     ▼                                      ▼
┌───────────────┐                   ┌─────────────────┐                   ┌─────────────────┐
│   REST API    │                   │  WebSockets     │                   │  Map / Tiles    │
│   (NestJS)    │                   │  (tiempo real)  │                   │  (Mapbox)       │
└───────┬───────┘                   └────────┬────────┘                   └─────────────────┘
        │                                    │
        └────────────────┬───────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  PostgreSQL  │  │    Redis     │  │   Storage    │
│  (datos)     │  │ (cache/jobs) │  │ (S3/archivos)│
└──────────────┘  └──────────────┘  └──────────────┘
```

## Módulos del backend (NestJS)

| Módulo | Responsabilidad |
|--------|------------------|
| **Auth** | Login, JWT, refresh, 2FA, roles (cliente, conductor, admin). |
| **Users** | Perfil cliente y conductor (documentos, vehículo, preferencias). |
| **Rides** | Solicitud de viaje, asignación, estados (buscando, en camino, en curso, finalizado). |
| **Stops** | Paradas oficiales (5–10), ubicación y disponibilidad en tiempo real. |
| **Map** | Integración Mapbox/Google: geocoding, rutas, ETA. |
| **Wallet** | Balance en-app (cripto), recargas (móvil, transferencia, PayPal, Binance), transacciones. |
| **Referrals** | Códigos de referido, recompensas, 2 viajes gratis por acumulación. |
| **Store** | Catálogo accesorios moto/carro, carrito, descuentos conductores. |
| **ACEO** | Urbanizaciones, contenedores, suscripción mensual, rutas de recolección. |
| **Gardening** | Servicio de jardinería, agendamiento, zonas. |
| **CarWash** | Lavado de vehículos propios, precios, turnos. |
| **Notifications** | Push, in-app, email (opcional). |

## Flujo de un viaje (tiempo real)

1. Cliente elige parada o “desde mi ubicación”, tipo (moto/carro), destino.
2. Backend crea solicitud y emite evento por WebSocket a conductores cercanos/parada.
3. Conductor acepta → se asigna viaje; cliente y conductor reciben actualización en vivo.
4. Mapa muestra posición del conductor en tiempo real hasta llegada y durante el viaje.
5. Al finalizar: se calcula tarifa, se descuenta de la wallet (o pago alternativo) y se registra para referidos/recompensas.

## Integraciones externas

- **Mapas**: Mapbox GL / Google Maps (rutas, marcadores, geocoding).
- **Pagos**: Pasarela local (pago móvil, transferencia), PayPal SDK, Binance API (recargas y conversión).
- **Push**: Firebase Cloud Messaging (Android/iOS) y/o OneSignal.

## Disponibilidad 24/7

- Backend en contenedores con réplicas y health checks.
- Base de datos con backups automáticos y réplica de lectura si crece el tráfico.
- Redis para sesiones y colas; reintentos y dead-letter en jobs críticos.
- Monitoreo (logs, métricas, alertas) para detectar caídas y latencia.
