import { RedisClientConnectionOptions } from '@app/shared/redis-client/interfaces/redis-client-connection-options.interface';
import { registerAs } from '@nestjs/config';

export const redisConfig = registerAs(
	'redis',
	(): RedisClientConnectionOptions => ({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		username: process.env.REDIS_USERNAME,
		password: process.env.REDIS_PASSWORD
	})
);
