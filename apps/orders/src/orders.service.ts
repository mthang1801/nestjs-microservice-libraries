import { PATTERNS, QUEUES, RedisService } from '@app/shared';
import { Inject, Injectable, InternalServerErrorException, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class OrdersService implements OnApplicationBootstrap {
	private readonly logger = new Logger(OrdersService.name);
	constructor(@Inject(QUEUES.BILLS) private readonly billClient: ClientProxy, private readonly redisService: RedisService) {}

	async onApplicationBootstrap() {
		try {
			await this.billClient.connect();
			this.logger.log('BillClient has connected');
		} catch (error) {
			this.logger.error(error, '', 'onApplicationBootstrap');
		}
	}
	async createOrder() {
		const order = {
			customerName: 'JOhn Doe',
			customerPhone: '0123456789',
			quantity: 3,
			totalAmount: 1200,
			discount: 100,
			orderDate: new Date()
		};

		const record = new RmqRecordBuilder({ order }).setOptions({ headers: { ['x-version']: '1.0.0' }, priority: 3, persistent: true }).build();

		this.billClient.emit(PATTERNS.ORDER_CREATED, record);
		const result = await lastValueFrom(this.billClient.send(PATTERNS.BILL_CREATED, record)).catch((err) => {
			throw new InternalServerErrorException(err.message);
		});
		console.log(result);
	}

	async ___test() {
		try {
			const k = 'myList';
			// const value = Array.from({ length: 12 }).map((_, i) => i + 1);
			// await this.redisService.lpush(k, value);
			// await this.redisService.rpush(k, -1);
			console.log(await this.redisService.linsert(k, 'AFTER', '7', '6.7'));
		} catch (error) {
			this.logger.error(error.stack);
		}
	}
}
