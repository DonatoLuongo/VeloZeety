import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        clientProfile: true,
        driverProfile: true,
        businessProfile: true,
        wallet: { include: { balances: true } }
      },
    });
    if (!user) return null;
    const { password: _, ...rest } = user;
    return rest;
  }

  async createUser(data: Prisma.UserCreateInput & {
    role: 'client' | 'driver' | 'business';
    clientData?: any;
    driverData?: any;
    businessData?: any;
  }) {
    const { role, clientData, driverData, businessData, ...userData } = data;

    // El password debería venir ya hasheado desde Auth, pero por si acaso.

    return await this.prisma.$transaction(async (tx) => {
      // 1. Crear Usuario
      const user = await tx.user.create({
        data: {
          ...userData,
          role,
        },
      });

      // 2. Crear Billetera automáticamente 
      const newWallet = await tx.wallet.create({
        data: { userId: user.id }
      });

      // 2.1 Crear balances por defecto
      await tx.walletBalance.createMany({
        data: [
          { walletId: newWallet.id, currency: 'VES', balance: 0 },
          { walletId: newWallet.id, currency: 'USD', balance: 0 },
          { walletId: newWallet.id, currency: 'USDT', balance: 0 },
          { walletId: newWallet.id, currency: 'USDC', balance: 0 },
        ]
      });

      // 3. Crear Perfil según el Rol
      switch (role) {
        case 'client':
          await tx.clientProfile.create({ data: { userId: user.id, ...clientData } });
          break;
        case 'driver':
          if (!driverData?.vehicleType) throw new BadRequestException('Driver needs vehicleType');
          await tx.driverProfile.create({ data: { userId: user.id, vehicleType: driverData.vehicleType, ...driverData } });
          break;
        case 'business':
          if (!businessData?.rif || !businessData?.companyName || !businessData?.category) {
            throw new BadRequestException('Business needs rif, companyName and category');
          }
          await tx.businessProfile.create({ data: { userId: user.id, ...businessData } });
          break;
      }

      return user;
    });
  }
}
