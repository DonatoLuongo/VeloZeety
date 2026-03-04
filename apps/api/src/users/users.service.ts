import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async getProfile(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { clientProfile: true, driverProfile: true, wallet: true },
    });
    if (!user) return null;
    const { password: _, ...rest } = user;
    return rest;
  }
}
