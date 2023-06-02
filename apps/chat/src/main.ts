import { RedisIoAdapter } from '@app/shared/microservices/redis/redis-io.adapter';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ChatModule } from './chat.module';

async function bootstrap() {
	const app = await NestFactory.create(ChatModule);
	const configService = app.get<ConfigService>(ConfigService);
	const redisIoAdapter = new RedisIoAdapter(app);
	await redisIoAdapter.connectToRedis();
	app.useWebSocketAdapter(redisIoAdapter);
	await app.listen(configService.get<string>('CHAT_PORT'));
}
bootstrap();
