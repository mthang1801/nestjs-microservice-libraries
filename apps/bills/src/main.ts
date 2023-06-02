import { QUEUES, RMQService } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { BillsModule } from './bills.module';

async function bootstrap() {
	const app = await NestFactory.create(BillsModule);
	const rmqService = app.get<RMQService>(RMQService);
	app.connectMicroservice(rmqService.getRmqOptions(QUEUES.BILLS));
	await app.startAllMicroservices();
}
bootstrap();
