import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { MySQLConnectionOption } from './mysql-connection-option.interface';
import { MySQLOptionsFactory } from './mysql-options-factory.interface';

export interface MySQLModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
	useClass?: Type<MySQLOptionsFactory>;
	useExisting?: Type<MySQLOptionsFactory>;
	useFactory?: (...args: any[]) => Promise<MySQLConnectionOption> | MySQLConnectionOption;
	inject?: any[];
}
