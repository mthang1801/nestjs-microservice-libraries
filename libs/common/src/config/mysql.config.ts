import { MySQLOptionsFactory } from '@app/shared/database/mysql/interfaces';
import { MySQLConnectionOption } from '@app/shared/database/mysql/interfaces/mysql-connection-option.interface';
import { registerAs } from '@nestjs/config';

export const mysqlConfig = registerAs(
	'mysql',
	(): MySQLConnectionOption => ({
		host: process.env.MYSQL_HOST,
		port: Number(process.env.MYSQL_PORT),
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE
	})
);

export class MySQLConnection implements MySQLOptionsFactory {
	createMySQLConnectionOptions(): MySQLConnectionOption {
		return {
			host: process.env.MYSQL_HOST,
			port: Number(process.env.MYSQL_PORT),
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASSWORD,
			database: process.env.MYSQL_DATABASE
		};
	}
}
