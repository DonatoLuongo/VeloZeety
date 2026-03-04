# Seguridad y ciberseguridad – VeloCity

## Principios

- **Defensa en profundidad**: múltiples capas (red, API, auth, datos).
- **Mínimo privilegio**: cada servicio y usuario con solo los permisos necesarios.
- **Cifrado**: en tránsito (TLS 1.3) y datos sensibles en reposo.
- **Auditoría**: logs de acciones críticas (auth, pagos, cambios de perfil).

## Autenticación y sesión

- **JWT** de corta vida (ej. 15 min) + **refresh token** en HttpOnly cookie o almacenamiento seguro.
- **2FA** opcional (TOTP) para conductores y para recargas grandes.
- Contraseñas con **bcrypt** (cost factor ≥ 12).
- Bloqueo tras N intentos fallidos; notificación al usuario.

## API

- **HTTPS** obligatorio; HSTS y redirección HTTP → HTTPS.
- **Rate limiting** por IP y por usuario (ej. 100 req/min por endpoint).
- **Validación** de entrada (DTOs con class-validator) y sanitización para evitar inyección (SQL, NoSQL, XSS).
- **CORS** restringido a orígenes permitidos (web y apps).
- **Headers** de seguridad: CSP, X-Frame-Options, X-Content-Type-Options.

## Datos personales y pagos

- Datos de pago **no almacenados** en bruto; usar tokens de pasarelas (PayPal, etc.).
- Información personal y documentos cifrados en reposo (AES-256) donde aplique.
- Acceso a datos sensibles solo para roles autorizados y con registro en logs.

## Wallet y cripto

- Claves y secretos de API (Binance, etc.) en **variables de entorno** o gestor de secretos (Vault, AWS Secrets Manager).
- Transacciones de wallet firmadas y registradas; sin doble gasto (validación en backend).
- Límites de retiro y recarga según verificación de identidad (KYC ligero si se escala).

## Infraestructura

- Red aislada para BD; sin exposición directa a internet.
- Imágenes Docker desde fuentes confiables; escaneo de vulnerabilidades en CI.
- Actualización periódica de dependencias (`pnpm audit`, Dependabot).

## Respuesta a incidentes

- Logs centralizados y retención definida.
- Plan de respuesta: identificación, contención, erradicación, recuperación.
- Notificación a usuarios si hay compromiso de datos personales (según normativa local).

## Cumplimiento

- Seguir guías **OWASP** (Top 10) en desarrollo y en revisión de código.
- Revisión de permisos y exposición de datos antes de cada release.
