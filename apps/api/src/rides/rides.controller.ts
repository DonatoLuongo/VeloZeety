import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { RidesService } from "./rides.service";

@Controller("rides")
export class RidesController {
  constructor(private readonly rides: RidesService) {}

  @Post()
  create(@Body() body: { clientId: string; vehicleType: string; pickupLat: number; pickupLng: number; dropoffLat: number; dropoffLng: number }) {
    return this.rides.create(body);
  }

  @Get(":id")
  get(@Param("id") id: string) {
    return this.rides.get(id);
  }
}
