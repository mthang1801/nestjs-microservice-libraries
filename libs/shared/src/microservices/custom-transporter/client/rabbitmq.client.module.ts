import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RABBITMQ_CLIENT } from '../constants';
import { ExchangeType, RMQModuleOptions } from '../interfaces/rmq-options.interface';
import { RabbitMQClient } from './rabbitmq.client';

const RQMClientFactory = ({ queue, replyQueue, exchange, type = ExchangeType.FANOUT }: RMQModuleOptions): Provider => ({
	provide: RABBITMQ_CLIENT,
	useFactory: (configService: ConfigService) => {
		return new RabbitMQClient({
			urls: [configService.get<string>('RMQ_URI')],
			exchange,
			exchangeType: type,
			queue,
			replyQueue,
			replyQueueOptions: {
				exclusive: true
			},
			noAck: true
		});
	},
	inject: [ConfigService]
});

@Module({})
export class RabbitMQClientModule {
	static register(rmqModuleOptions: RMQModuleOptions): DynamicModule {
		return {
			module: RabbitMQClientModule,
			providers: [RQMClientFactory(rmqModuleOptions)],
			exports: [RQMClientFactory(rmqModuleOptions)]
		};
	}
}
