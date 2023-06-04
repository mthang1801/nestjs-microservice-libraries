import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { interval, map, take } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway(Number(process.env.CHAT_GATEWAYS_PORT), { cors: '*', transports: ['websocket'] })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private users = [
		{ id: 1, name: 'John Doe', messages: [], socketIds: [] },
		{ id: 2, name: 'Alissan', messages: [], socketIds: [] }
	];

	async handleConnection(client: Socket) {
		await this.saveClientIntoUser(client);
	}

	async handleDisconnect(client: Socket) {
		await this.pullClientFromUser(client);
	}

	async saveClientIntoUser(client: Socket) {
		const clientId = client.handshake.headers['x-client-id'];
		this.users = this.users.map((user) => {
			if (String(user.id) === String(clientId)) {
				user.socketIds.push(client.id);
			}
			return user;
		});
	}

	async pullClientFromUser(client: Socket) {
		const clientId = client.handshake.headers['x-client-id'];
		this.users = this.users.map((user) => {
			if (String(user.id) === String(clientId)) {
				user.socketIds = user.socketIds.filter((socketId) => socketId !== client.id);
			}
			return user;
		});
	}

	@SubscribeMessage('server-listen-private-chat')
	async handleServerListenPrivateChat(@MessageBody() body, @ConnectedSocket() client: Socket) {
		const senderId = client.handshake.headers['x-client-id'];
		const data = {
			senderId,
			receiverId: body.receiver,
			message: body.message,
			timestamp: new Date()
		};
		this.getSocketIdsByUser(body.receiver).forEach((socketId) => {
			client.to(socketId).emit('server-send-private-chat', data);
		});
	}

	private getSocketIdsByUser(userId) {
		return this.users.find((user) => String(user.id) === String(userId))?.socketIds || [];
	}

	@SubscribeMessage('server-listen-processing-request')
	async handleProcessingRequest(@ConnectedSocket() client: Socket) {
		return interval(1000).pipe(
			map((data) => {
				console.log(data);
				client.emit('server-send-processing', { response: data });
			}, take(10))
		);
	}
}
