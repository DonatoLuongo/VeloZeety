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

    @Cron('*/5 * * * * *') // Cada 5 segundos
    async handleBCVScrape() {
        this.logger.debug('Starting frequent BCV Scrape process (5s)...');
        await this.fetchAndStoreBCV();
    }

    async fetchAndStoreBCV() {
        try {
            // Usamos DolarApi como fuente confiable
            const response = await firstValueFrom(
                this.httpService.get('https://ve.dolarapi.com/v1/dolares/oficial')
            );

            let rateValue = response.data?.promedio;

            if (rateValue) {
                // Actualizar en base de datos de forma asíncrona
                this.prisma.exchangeRate.upsert({
                    where: { currency: 'VES' },
                    create: { currency: 'VES', rate: rateValue, source: 'BCV' },
                    update: { rate: rateValue, lastUpdated: new Date() }
                }).catch(err => this.logger.error('DB Update failed', err));

                // Configuración de caché (TTL corto de 10 segundos ya que actualizamos cada 5s)
                await this.cacheManager.set('bcv_rate', {
                    currency: 'VES',
                    rate: rateValue,
                    lastUpdated: new Date()
                }, 10000);

                this.logger.debug(`BCV Rate updated: ${rateValue} VES/USD`);
                return { currency: 'VES', rate: rateValue };
            }
        } catch (error) {
            this.logger.error('Failed to update BCV rate', error.message);
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
