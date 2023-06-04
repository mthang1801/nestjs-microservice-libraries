import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NatsServiceModule } from './nats-service.module';

async function bootstrap() {
	const app = await NestFactory.create(NatsServiceModule);
	const configService = app.get<ConfigService>(ConfigService);
	app.connectMicroservice({
		transport: Transport.NATS,
		options: {
			url: configService.get<string>('NATS_URI'),
			queue: 'customers'
		}
	});
	await app.startAllMicroservices();
}
bootstrap();
