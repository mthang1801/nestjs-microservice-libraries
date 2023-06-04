import { DynamicModule, Module, Provider } from '@nestjs/common';
import { REDIS_CONNECTION, REDIS_CONNECTION_OPTIONS } from './constants';
import { RedisClientModuleAsyncOptions } from './interfaces/redis-client-module-async-options.interface';
import { RedisClientOptionsFactory } from './interfaces/redis-client-options-factory.interface';
import { RedisClientService } from './redis-client.service';

@Module({})
export class RedisClientModule {
	static registerAsync(connectionOptions: RedisClientModuleAsyncOptions): DynamicModule {
		return {
			module: RedisClientModule,
			imports: connectionOptions.imports || [],
			providers: [
				RedisClientService,
				connectionOptions.useClass || undefined,
				connectionOptions.useExisting || undefined,
				this.createConnectionProvider(connectionOptions),
				this.connectionFactory()
			].filter(Boolean),
			exports: [RedisClientService]
		};
	}

	private static createConnectionProvider(connectionOptions: RedisClientModuleAsyncOptions): Provider {
		if (connectionOptions.useFactory) {
			return {
				provide: REDIS_CONNECTION_OPTIONS,
				useFactory: connectionOptions.useFactory,
				inject: connectionOptions.inject || []
			};
		}

		return {
			provide: REDIS_CONNECTION_OPTIONS,
			useFactory: async (optionFactory: RedisClientOptionsFactory) => await optionFactory.createRedisConnectionOptions(),
			inject: [connectionOptions.useExisting || connectionOptions.useClass]
		};
	}

	private static connectionFactory(): Provider {
		return {
			provide: REDIS_CONNECTION,
			useFactory: async (redisClientService: RedisClientService) => await redisClientService.connect(),
			inject: [RedisClientService]
		};
	}
}
