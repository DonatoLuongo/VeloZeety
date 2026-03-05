import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RequestsService {
    constructor(private prisma: PrismaService) { }

    // ─── Crear solicitud (Cliente) ───
    async createRequest(
        clientId: string,
        serviceId: string,
        data: {
            originLat: number;
            originLng: number;
            originAddress?: string;
            destLat: number;
            destLng: number;
            destAddress?: string;
            freightDetails?: any;
            medicalDetails?: any;
        }
    ) {
        return this.prisma.request.create({
            data: {
                clientId,
                serviceId,
                status: 'searching',
                ...data,
            },
        });
    }

    // ─── Aceptar solicitud (Conductor) — Bloqueo optimista ───
    async acceptRequest(requestId: string, driverId: string) {
        const result = await this.prisma.request.updateMany({
            where: { id: requestId, status: 'searching' },
            data: { status: 'accepted', driverId, updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException('Esta solicitud ya no está disponible');
        }

        return this.prisma.request.findUnique({ where: { id: requestId } });
    }

    // ─── Asignar conductor (Emprendedor) ───
    async assignDriver(requestId: string, driverId: string) {
        const result = await this.prisma.request.updateMany({
            where: { id: requestId, status: 'searching' },
            data: { status: 'assigned', driverId, updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException('Esta solicitud ya no está disponible para asignar');
        }

        return this.prisma.request.findUnique({ where: { id: requestId } });
    }

    // ─── Conductor confirma asignación del emprendedor ───
    async confirmAssignment(requestId: string, driverId: string) {
        const result = await this.prisma.request.updateMany({
            where: { id: requestId, status: 'assigned', driverId },
            data: { status: 'accepted', updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException('No puedes confirmar esta asignación');
        }

        return this.prisma.request.findUnique({ where: { id: requestId } });
    }

    // ─── Conductor rechaza asignación → vuelve a searching ───
    async rejectAssignment(requestId: string, driverId: string) {
        const result = await this.prisma.request.updateMany({
            where: { id: requestId, status: 'assigned', driverId },
            data: { status: 'searching', driverId: null, updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException('No puedes rechazar esta asignación');
        }

        return { message: 'Asignación rechazada. La solicitud volvió al pool.' };
    }

    // ─── Transiciones de viaje ───
    async updateStatus(requestId: string, driverId: string, newStatus: 'en_route' | 'in_progress') {
        const validTransitions: Record<string, string> = {
            'en_route': 'accepted',
            'in_progress': 'en_route',
        };

        const requiredPrevious = validTransitions[newStatus];

        const result = await this.prisma.request.updateMany({
            where: { id: requestId, driverId, status: requiredPrevious },
            data: { status: newStatus, updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException(`No se puede cambiar a ${newStatus}`);
        }

        return this.prisma.request.findUnique({ where: { id: requestId } });
    }

    // ─── Completar servicio + AUTO-COBRO atómico ───
    async completeRequest(requestId: string, driverId: string) {
        return await this.prisma.$transaction(async (tx) => {
            // 1. Verificar que la solicitud esté in_progress
            const request = await tx.request.findFirst({
                where: { id: requestId, driverId, status: 'in_progress' },
                include: { service: true },
            });

            if (!request) {
                throw new ConflictException('No se puede completar esta solicitud');
            }

            if (!request.price || Number(request.price) <= 0) {
                throw new BadRequestException('La solicitud no tiene un precio definido');
            }

            const price = Number(request.price);
            const currency = 'VES'; // Moneda base de cobro

            // 2. Buscar billetera del CLIENTE
            const clientWallet = await tx.wallet.findUnique({ where: { userId: request.clientId } });
            if (!clientWallet) throw new NotFoundException('Billetera del cliente no encontrada');

            const clientBalance = await tx.walletBalance.findUnique({
                where: { walletId_currency: { walletId: clientWallet.id, currency } }
            });

            if (!clientBalance || Number(clientBalance.balance) < price) {
                throw new BadRequestException(`Saldo insuficiente en ${currency}. Se requiere ${price}`);
            }

            // 3. Buscar billetera del CONDUCTOR
            const driverWallet = await tx.wallet.findUnique({ where: { userId: driverId } });
            if (!driverWallet) throw new NotFoundException('Billetera del conductor no encontrada');

            const driverBalance = await tx.walletBalance.findUnique({
                where: { walletId_currency: { walletId: driverWallet.id, currency } }
            });

            // 4. DEBITAR al cliente
            await tx.walletBalance.update({
                where: { id: clientBalance.id },
                data: { balance: new Prisma.Decimal(Number(clientBalance.balance) - price) },
            });

            await tx.transaction.create({
                data: {
                    walletId: clientWallet.id,
                    type: 'payment',
                    amount: new Prisma.Decimal(price),
                    currency,
                    status: 'completed',
                    metadata: { requestId, description: `Pago servicio #${requestId.slice(0, 8)}` },
                },
            });

            // 5. ACREDITAR al conductor
            const currentDriverBalance = driverBalance ? Number(driverBalance.balance) : 0;
            if (driverBalance) {
                await tx.walletBalance.update({
                    where: { id: driverBalance.id },
                    data: { balance: new Prisma.Decimal(currentDriverBalance + price) },
                });
            } else {
                await tx.walletBalance.create({
                    data: { walletId: driverWallet.id, currency, balance: new Prisma.Decimal(price) },
                });
            }

            await tx.transaction.create({
                data: {
                    walletId: driverWallet.id,
                    type: 'payment',
                    amount: new Prisma.Decimal(price),
                    currency,
                    status: 'completed',
                    metadata: { requestId, description: `Cobro servicio #${requestId.slice(0, 8)}` },
                },
            });

            // 6. Marcar solicitud como completada
            const completed = await tx.request.update({
                where: { id: requestId },
                data: { status: 'completed', updatedAt: new Date() },
            });

            return {
                request: completed,
                payment: { debited: price, currency, from: request.clientId, to: driverId },
            };
        });
    }

    // ─── Cancelar solicitud (Cliente, solo si searching) ───
    async cancelRequest(requestId: string, clientId: string) {
        const result = await this.prisma.request.updateMany({
            where: { id: requestId, clientId, status: 'searching' },
            data: { status: 'cancelled', updatedAt: new Date() },
        });

        if (result.count === 0) {
            throw new ConflictException('Solo puedes cancelar solicitudes en búsqueda');
        }

        return { message: 'Solicitud cancelada exitosamente' };
    }
}
