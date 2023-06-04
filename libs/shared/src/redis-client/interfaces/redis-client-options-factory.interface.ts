import { RedisClientConnectionOptions } from './redis-client-connection-options.interface';

export interface RedisClientOptionsFactory {
	createRedisConnectionOptions(): Promise<RedisClientConnectionOptions> | RedisClientConnectionOptions;
}
