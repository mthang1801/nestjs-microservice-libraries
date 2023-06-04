import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';
@Injectable()
export class RMQService {
	constructor(private readonly configService: ConfigService) {}

	getRmqOptions(queue: string, noAck = true): RmqOptions {
		return {
			transport: Transport.RMQ,
			options: {
				urls: [this.configService.get<string>('RMQ_URI')],
				queue,
				persistent: true
			}
		};
	}

	ack(context: RmqContext) {
		const channel = context.getChannelRef();
		const message = context.getMessage();
		channel.ack(message);
	}
}
