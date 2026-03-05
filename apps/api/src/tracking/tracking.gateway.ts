import {
    WebSocketGateway,
    SubscribeMessage,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    ConnectedSocket,
    MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface LocationUpdate {
    userId: string;
    lat: number;
    lng: number;
    role: 'client' | 'driver';
    vehicleType?: string;
    fullName?: string;
    requestId?: string; // ID de la solicitud activa (para vincular cliente ↔ conductor)
}

@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/tracking',
})
export class TrackingGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private readonly logger = new Logger(TrackingGateway.name);

    // Conductores activos (visibles en pool)
    private activeDrivers = new Map<string, LocationUpdate>();
    // Clientes con viaje activo (solo visible para SU conductor asignado)
    private activeClients = new Map<string, LocationUpdate>();
    // Mapeo socketId → userId
    private socketToUser = new Map<string, string>();

    handleConnection(client: Socket) {
        this.logger.log(`Connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Disconnected: ${client.id}`);
        const userId = this.socketToUser.get(client.id);
        if (userId) {
            this.activeDrivers.delete(userId);
            this.activeClients.delete(userId);
            this.socketToUser.delete(client.id);
        }
        this.broadcastDriverLocations();
    }

    // ─── Conductor envía su ubicación ───
    @SubscribeMessage('driver:update_location')
    handleDriverLocation(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: LocationUpdate,
    ) {
        this.socketToUser.set(client.id, data.userId);
        this.activeDrivers.set(data.userId, { ...data, role: 'driver' });
        this.broadcastDriverLocations();
    }

    // ─── Cliente envía su ubicación (durante viaje activo) ───
    @SubscribeMessage('client:update_location')
    handleClientLocation(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: LocationUpdate,
    ) {
        this.socketToUser.set(client.id, data.userId);
        this.activeClients.set(data.userId, { ...data, role: 'client' });

        // Emitir SOLO al conductor asignado a esta solicitud
        if (data.requestId) {
            this.server.emit(`client_location:${data.requestId}`, {
                type: 'client_location',
                lat: data.lat,
                lng: data.lng,
                userId: data.userId,
            });
        }
    }

    // ─── Cliente pide ver conductores cercanos ───
    @SubscribeMessage('client:request_drivers')
    handleRequestDrivers(@ConnectedSocket() client: Socket) {
        client.emit('driver_locations', {
            type: 'driver_locations',
            drivers: Array.from(this.activeDrivers.values()),
        });
    }

    // ─── Conductor pide ver ubicación de SU cliente ───
    @SubscribeMessage('driver:request_client_location')
    handleRequestClientLocation(
        @ConnectedSocket() client: Socket,
        @MessageBody() data: { requestId: string },
    ) {
        // Buscar el cliente vinculado a esta solicitud
        const clientLocation = Array.from(this.activeClients.values())
            .find(c => c.requestId === data.requestId);

        if (clientLocation) {
            client.emit(`client_location:${data.requestId}`, {
                type: 'client_location',
                lat: clientLocation.lat,
                lng: clientLocation.lng,
                userId: clientLocation.userId,
            });
        }
    }

    private broadcastDriverLocations() {
        this.server.emit('driver_locations', {
            type: 'driver_locations',
            drivers: Array.from(this.activeDrivers.values()),
        });
    }
}
