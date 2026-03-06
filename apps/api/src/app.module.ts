import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PrismaModule } from "./prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { WalletModule } from './wallet/wallet.module';
import { ExchangeRateModule } from "./exchange-rate/exchange-rate.module";
import { ScheduleModule } from "@nestjs/schedule";
import { CacheModule } from "@nestjs/cache-manager";
import { redisStore } from "cache-manager-redis-yet";
import { TrackingModule } from "./tracking/tracking.module";
import { RequestsModule } from "./requests/requests.module";
import { LoggerModule } from "nestjs-pino";
import { ThrottlerModule } from "@nestjs/throttler";
import { validate } from "./env.validation";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
      },
    }),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),
    ConfigModule.forRoot({ isGlobal: true, validate }),
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: await redisStore({
            url: configService.get<string>("REDIS_URL") || "redis://localhost:6379",
            socket: {
              reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
            },
            ttl: 3600000
          }),
        };
      },
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    WalletModule,
    ExchangeRateModule,
    TrackingModule,
    RequestsModule,
  ],
})
export class AppModule { }
