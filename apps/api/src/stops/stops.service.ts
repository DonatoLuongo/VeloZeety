import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class StopsService {
  constructor(private prisma: PrismaService) {}
  async list() {
    return this.prisma.stop.findMany({ where: { isActive: true } });
  }
}
