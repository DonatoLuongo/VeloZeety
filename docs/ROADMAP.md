# Roadmap VeloCity

## Fase 1 — Núcleo (viajes y mapa)
- [ ] Auth completo: registro, login, JWT, refresh, roles (cliente/conductor/admin).
- [ ] Perfil cliente y conductor (datos, documentos, vehículo).
- [ ] CRUD paradas (5–10) y listado en tiempo real.
- [ ] Solicitud de viaje (moto/carro), flujo buscar → asignar → en curso → completado.
- [ ] WebSockets: ubicación en vivo de conductores y estado del viaje.
- [ ] Integración mapa (Mapbox o Google Maps): rutas, paradas, ETA.
- [ ] Cálculo de tarifa por distancia/tiempo.

## Fase 2 — Wallet y referidos
- [ ] Wallet: balance VELO, historial de transacciones.
- [ ] Recargas: pago móvil, transferencia bancaria, PayPal, Binance (APIs/sandbox).
- [ ] Pago del viaje con wallet (y fallback a efectivo si se desea).
- [ ] Referidos: código único, bonificación por referido registrado/completado.
- [ ] Programa “2 viajes gratis”: acumulación por número de viajes, canje.

## Fase 3 — Tienda y beneficios
- [ ] Tienda: catálogo accesorios moto/carro, carrito, checkout.
- [ ] Descuento o porcentaje para conductores en compras.
- [ ] Historial de compras y envíos (o retiro en punto).

## Fase 4 — Servicios ACEO, jardinería, autolavado
- [ ] ACEO: admin asigna urbanizaciones, contenedores con publicidad, suscripción mensual.
- [ ] Servicio de jardinería: agendamiento y zonas.
- [ ] Autolavado: reserva para lavar vehículo propio (carro/moto).
- [ ] Panel admin: usuarios, paradas, urbanizaciones, reportes.

## Fase 5 — Producción y 24/7
- [ ] App móvil (Expo) publicable: flujos completos, notificaciones push.
- [ ] Monitoreo, logs, alertas, backups automáticos.
- [ ] CI/CD y despliegue en servidor/cloud.
- [ ] Documentación API y runbooks de operación.
