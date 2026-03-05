import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { PrismaModule } from '../prisma.module';

@Module({
    imports: [HttpModule, PrismaModule],
    providers: [ExchangeRateService],
    controllers: [ExchangeRateController],
    exports: [ExchangeRateService]
})
export class ExchangeRateModule { }
