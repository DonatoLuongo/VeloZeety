import { Controller, Get } from "@nestjs/common";
import { StopsService } from "./stops.service";

@Controller("stops")
export class StopsController {
  constructor(private readonly stops: StopsService) {}

  @Get()
  list() {
    return this.stops.list();
  }
}
