import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { PrismaModule } from '../prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    providers: [RequestsService],
    controllers: [RequestsController],
    exports: [RequestsService],
})
export class RequestsModule { }
