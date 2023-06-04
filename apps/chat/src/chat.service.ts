import { RABBITMQ_CLIENT } from '@app/shared/microservices/custom-transporter/constants';
import { RMQMessage } from '@app/shared/microservices/custom-transporter/interfaces/rmq-options.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class ChatService {
	constructor(@Inject(RABBITMQ_CLIENT) private readonly clientProxy: ClientProxy) {}
	getHello(): string {
		return 'Hello World!';
	}

	@Timeout(Date.now().toString(), 500)
	async ___() {
		const msg: RMQMessage = {
			content: 'hey there',
			options: {
				persistent: true
			}
		};
		this.clientProxy.send('hello', msg).subscribe((data) => {
			console.log('response: ', data);
		});
		return 'message sent';
	}
}
