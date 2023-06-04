import { ExchangeType, RabbitMQServer } from '@app/shared/microservices/custom-transporter';
import { EXCHANGES } from '@app/shared/microservices/custom-transporter/constants';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { CustomStrategy } from '@nestjs/microservices';
import { RmqTransporterModule } from './rmq-transporter.module';

async function bootstrap() {
	const app = await NestFactory.create(RmqTransporterModule);
	const configService = app.get<ConfigService>(ConfigService);
	app.connectMicroservice<CustomStrategy>({
		strategy: new RabbitMQServer({
			// queue: 'queue_name',
			exchange: EXCHANGES.TEST,
			exchangeType: ExchangeType.TOPIC,
			urls: [configService.get<string>('RMQ_URI')],
			noAck: true
		})
	});
	await app.startAllMicroservices();
}
bootstrap();
