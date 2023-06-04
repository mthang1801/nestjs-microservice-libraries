import { ModuleMetadata, Type } from '@nestjs/common';
import { RedisClientConnectionOptions } from './redis-client-connection-options.interface';

export interface RedisClientModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useClass?: Type<RedisClientConnectionOptions>;
	useExisting?: Type<RedisClientConnectionOptions>;
	inject?: any[];
	imports?: any[];
	useFactory?: (...args: any) => Type<RedisClientConnectionOptions>;
}
