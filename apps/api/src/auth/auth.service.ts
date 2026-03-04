import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async register(data: { email: string; password: string; fullName: string; role: string }) {
    // TODO: hash password with bcrypt
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        role: data.role,
      },
    });
    return { id: user.id, email: user.email, role: user.role };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (!user) return null;
    // TODO: verify password
    return { id: user.id, email: user.email, role: user.role };
  }
}
