import { z } from "zod";

export const LoginSchema = z.object({
    email: z.string().email("Debe ser un correo electrónico válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const LocationSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    address: z.string().optional(),
});

export const RequestTripSchema = z.object({
    pickup: LocationSchema,
    dropoff: LocationSchema,
    vehicleType: z.enum(["moto", "carro", "4x4", "flete"]),
    priceVES: z.number().optional(),
    priceUSD: z.number().optional(),
});
