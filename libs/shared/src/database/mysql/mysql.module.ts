import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MYSQL_CONNECTION, MYSQL_CONNECT_OPTIONS } from './constants';
import { MySQLModuleAsyncOptions, MySQLOptionsFactory } from './interfaces';
import { MySQLService } from './mysql.service';

@Module({})
export class MySQLModule {
	static registerAsync(connectOptions: MySQLModuleAsyncOptions): DynamicModule {
		return {
			module: MySQLModule,
			imports: connectOptions.imports || [],
			providers: [
				MySQLService,
				connectOptions.useClass || null,
				connectOptions.useExisting || null,
				this.createConnectProvider(connectOptions),
				this.connectionFactory()
			].filter(Boolean),
			exports: [MySQLService]
		};
	}

	private static createConnectProvider(connectOptions: MySQLModuleAsyncOptions): Provider {
		if (connectOptions.useFactory) {
			return {
				provide: MYSQL_CONNECT_OPTIONS,
				useFactory: connectOptions.useFactory,
				inject: connectOptions.inject || []
			};
		}

		return {
			provide: MYSQL_CONNECT_OPTIONS,
			useFactory: async (optionsFactory: MySQLOptionsFactory) => optionsFactory.createMySQLConnectionOptions(),
			inject: [connectOptions.useClass || connectOptions.useExisting]
		};
	}

	private static connectionFactory(): Provider {
		return {
			provide: MYSQL_CONNECTION,
			useFactory: async (mysqlService: MySQLService) => mysqlService.connect(),
			inject: [MySQLService]
		};
	}
}
