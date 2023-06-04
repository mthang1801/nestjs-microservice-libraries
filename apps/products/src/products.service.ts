import { MySQLService } from '@app/shared/database/mysql/mysql.service';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class ProductsService {
	constructor(private readonly mysqlService: MySQLService) {}

	getHello(): string {
		return 'Hello World! From Products';
	}

	@Timeout(Date.now().toString(), 500)
	async __() {
		const result = await this.mysqlService.query('SELECT * FROM tests');
		console.log(result);
	}
}
