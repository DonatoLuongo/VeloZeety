import { Controller, Get, Post } from '@nestjs/common';
import { ExchangeRateService } from './exchange-rate.service';

@Controller('exchange-rate')
export class ExchangeRateController {
    constructor(private readonly exchangeRateService: ExchangeRateService) { }

    @Get()
    async getRate() {
        return this.exchangeRateService.getCurrentRate();
    }

    @Post('force-update')
    async forceUpdate() {
        return this.exchangeRateService.fetchAndStoreBCV();
    }
}
