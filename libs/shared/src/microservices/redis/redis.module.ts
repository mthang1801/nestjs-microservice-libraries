import { Global, Logger, Module } from '@nestjs/common';
import 'dotenv/config';
import { RedisModule as NestRedisModule } from 'nestjs-redis';
import { RedisService } from './redis.service';

@Global()
@Module({
	imports: [
		NestRedisModule.register({
			host: process.env.REDIS_HOST,
			port: Number(process.env.REDIS_PORT),
			retryStrategy: (times: number) => times,
			maxRetriesPerRequest: 100,
			onClientReady: (client) => {
				client.on('error', (err) => {
					Logger.error('Connect redis error', err);
				});

				client.once('ready', () => {
					Logger.log('Redis is ready');
				});
			}
		})
	],
	providers: [RedisService],
	exports: [NestRedisModule, RedisService]
})
export class RedisModule {}
