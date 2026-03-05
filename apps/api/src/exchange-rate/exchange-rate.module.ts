import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRateController } from './exchange-rate.controller';
import { PrismaModule } from '../prisma.module';

@Module({
    imports: [HttpModule, PrismaModule, CacheModule.register()],
    providers: [ExchangeRateService],
    controllers: [ExchangeRateController],
    exports: [ExchangeRateService]
})
export class ExchangeRateModule { }
