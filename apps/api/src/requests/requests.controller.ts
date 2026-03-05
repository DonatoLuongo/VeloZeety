import { Controller, Post, Body, Param, UseGuards, Req, Get } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('requests')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RequestsController {
    constructor(private readonly requestsService: RequestsService) { }

    @Roles('client')
    @Post()
    async create(@Req() req: any, @Body() body: any) {
        return this.requestsService.createRequest(req.user.sub, body.serviceId, body);
    }

    @Roles('driver')
    @Post(':id/accept')
    async accept(@Param('id') id: string, @Req() req: any) {
        return this.requestsService.acceptRequest(id, req.user.sub);
    }

    @Roles('business')
    @Post(':id/assign')
    async assign(@Param('id') id: string, @Body() body: { driverId: string }) {
        return this.requestsService.assignDriver(id, body.driverId);
    }

    @Roles('driver')
    @Post(':id/confirm')
    async confirm(@Param('id') id: string, @Req() req: any) {
        return this.requestsService.confirmAssignment(id, req.user.sub);
    }

    @Roles('driver')
    @Post(':id/reject')
    async reject(@Param('id') id: string, @Req() req: any) {
        return this.requestsService.rejectAssignment(id, req.user.sub);
    }

    @Roles('driver')
    @Post(':id/status')
    async updateStatus(@Param('id') id: string, @Req() req: any, @Body() body: { status: 'en_route' | 'in_progress' }) {
        return this.requestsService.updateStatus(id, req.user.sub, body.status);
    }

    @Roles('driver')
    @Post(':id/complete')
    async complete(@Param('id') id: string, @Req() req: any) {
        return this.requestsService.completeRequest(id, req.user.sub);
    }

    @Roles('client')
    @Post(':id/cancel')
    async cancel(@Param('id') id: string, @Req() req: any) {
        return this.requestsService.cancelRequest(id, req.user.sub);
    }
}
