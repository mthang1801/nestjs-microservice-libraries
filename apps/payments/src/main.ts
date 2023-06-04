import { QUEUES, RMQService } from '@app/shared';
import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';

async function bootstrap() {
	const app = await NestFactory.create(PaymentsModule);
	const RmqService = app.get<RMQService>(RMQService);
	app.connectMicroservice(RmqService.getRmqOptions(QUEUES.BILLS));
	app.connectMicroservice(RmqService.getRmqOptions(QUEUES.PAYMENTS));
	await app.startAllMicroservices();
}
bootstrap();
