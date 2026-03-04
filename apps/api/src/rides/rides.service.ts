import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class RidesService {
  constructor(private prisma: PrismaService) {}
  async create(data: {
    clientId: string;
    vehicleType: string;
    pickupLat: number;
    pickupLng: number;
    dropoffLat: number;
    dropoffLng: number;
  }) {
    return this.prisma.ride.create({
      data: {
        clientId: data.clientId,
        vehicleType: data.vehicleType,
        status: "searching",
        pickupLat: data.pickupLat,
        pickupLng: data.pickupLng,
        dropoffLat: data.dropoffLat,
        dropoffLng: data.dropoffLng,
      },
    });
  }

  async get(id: string) {
    return this.prisma.ride.findUnique({
      where: { id },
      include: { client: true, driver: true },
    });
  }
}
