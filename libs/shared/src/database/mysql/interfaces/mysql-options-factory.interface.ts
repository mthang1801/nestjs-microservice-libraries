import { MySQLConnectionOption } from './mysql-connection-option.interface';

export interface MySQLOptionsFactory {
	createMySQLConnectionOptions(): Promise<MySQLConnectionOption> | MySQLConnectionOption;
}
