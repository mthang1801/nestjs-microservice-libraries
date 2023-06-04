import { Inject, Injectable } from '@nestjs/common';
import { Pool, createPool } from 'mysql2';
import { MYSQL_CONNECT_OPTIONS } from './constants';
import { MySQLConnectionOption } from './interfaces/mysql-connection-option.interface';

@Injectable()
export class MySQLService {
	private mysqlClient: Pool | null = null;

	constructor(@Inject(MYSQL_CONNECT_OPTIONS) private readonly mysqlConnectOptiosn: MySQLConnectionOption) {}

	async connect() {
		return this.mysqlClient ?? (this.mysqlClient = await createPool(this.mysqlConnectOptiosn));
	}

	async query(sql: string) {
		return new Promise((resolve, reject) => {
			this.mysqlClient.query(sql, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		});
	}
}
