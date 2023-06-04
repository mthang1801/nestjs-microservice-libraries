import { RMQMessage } from '@app/shared/microservices/custom-transporter/interfaces/rmq-options.interface';
import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RmqTransporterService } from './rmq-transporter.service';

@Controller()
export class RmqTransporterController {
	constructor(private readonly rmqTransporterService: RmqTransporterService) {}

	@Get()
	getHello(): string {
		return this.rmqTransporterService.getHello();
	}

	@MessagePattern('hello')
	async handleMessagePattern(@Payload() payload) {
		console.log('received from client: ', payload);
		const response: RMQMessage = {
			content: payload,
			options: {
				persistent: true
			}
		};
		return response;
	}
}
