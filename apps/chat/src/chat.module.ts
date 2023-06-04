import { CommonModule } from '@app/common';
import { ExchangeType, RabbitMQClient } from '@app/shared/microservices/custom-transporter';
import { EXCHANGES } from '@app/shared/microservices/custom-transporter/constants';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
	imports: [CommonModule],
	controllers: [ChatController],
	providers: [
		ChatService,
		ChatGateway,
		{
			provide: 'RABBITMQ_CLIENT',
			useFactory: () => {
				return new RabbitMQClient({
					urls: ['amqp://root:admin123@localhost:5672'],
					exchange: EXCHANGES.TEST,
					exchangeType: ExchangeType.TOPIC,
					// queue: 'server_queue_name',
					// replyQueue: 'client_queue_name',
					replyQueueOptions: {
						exclusive: true
					},
					noAck: true
				});
			}
		}
	]
})
export class ChatModule {}
