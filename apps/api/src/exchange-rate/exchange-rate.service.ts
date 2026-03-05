import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../prisma.service';
import { firstValueFrom } from 'rxjs';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ExchangeRateService {
    private readonly logger = new Logger(ExchangeRateService.name);

    constructor(
        private prisma: PrismaService,
        private httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    @Cron('0 8,14 * * 1-5') // De Lunes a Viernes a las 8:00 AM y 2:00 PM
    async handleBCVScrape() {
        this.logger.log('Starting scheduled BCV Scrape process...');
        await this.fetchAndStoreBCV();
    }

    async fetchAndStoreBCV() {
        try {
            // Usamos DolarApi como fuente confiable y rápida del BCV actual
            const response = await firstValueFrom(
                this.httpService.get('https://ve.dolarapi.com/v1/dolares/oficial')
            );

            const rateValue = response.data.promedio;

            if (rateValue) {
                const result = await this.prisma.exchangeRate.upsert({
                    where: { currency: 'VES' },
                    create: { currency: 'VES', rate: rateValue, source: 'BCV' },
                    update: { rate: rateValue, lastUpdated: new Date() }
                });

                // Configuración de caché
                // 1000 * 60 * 60 = 1 hora
                await this.cacheManager.set('bcv_rate', result, 3600000);

                this.logger.log(`BCV Rate updated successfully: ${rateValue} VES/USD`);
                return result;
            }
        } catch (error) {
            this.logger.error('Failed to update BCV rate', error.message);
            throw new Error('No se pudo actualizar la tasa BCV');
        }
    }

    async getCurrentRate() {
        // 1. Intentar desde Caché (Redis/Memory)
        const cachedRate = await this.cacheManager.get('bcv_rate');
        if (cachedRate) {
            return cachedRate;
        }

        // 2. Intentar desde Base de datos
        const dbRate = await this.prisma.exchangeRate.findUnique({
            where: { currency: 'VES' }
        });

        if (dbRate) {
            await this.cacheManager.set('bcv_rate', dbRate, 3600000);
            return dbRate;
        }

        // 3. Fallback: Ejecutar proceso si la DB está vacía
        const fetched = await this.fetchAndStoreBCV();
        return fetched;
    }
}
