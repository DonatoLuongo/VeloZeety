import { z } from 'zod';

export const envValidationSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().default(3001),
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),
    JWT_SECRET: z.string().min(10),
    CORS_ORIGIN: z.string().optional(),
});

export function validate(config: Record<string, unknown>) {
    const parsed = envValidationSchema.safeParse(config);

    if (!parsed.success) {
        console.error('❌ Config validation error', parsed.error.format());
        throw new Error('Variables de entorno inválidas. Revisa tu archivo .env');
    }

    return parsed.data;
}
