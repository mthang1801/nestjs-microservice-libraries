import { PATTERNS, QUEUES, RedisService } from '@app/shared';
import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { Timeout } from '@nestjs/schedule';
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

	@Timeout(Date.now().toString(), 500)
	async createOrder() {
		const order = {
			customerName: 'JOhn Doe',
			customerPhone: '0123456789',
			quantity: 3,
			totalAmount: 1200,
			discount: 1020,
			orderDate: new Date()
		};

		const record = new RmqRecordBuilder({ order }).setOptions({ headers: { ['x-version']: '1.0.0' }, priority: 3, persistent: true }).build();

		this.billClient.emit(PATTERNS.BILL_CREATED, { order });
		// this.billClient.send(PATTERNS.ORDER_CREATED, { order }).subscribe(console.log);
		// const result = await lastValueFrom(this.billClient.send(PATTERNS.BILL_CREATED, record)).catch((err) => {
		// 	throw new InternalServerErrorException(err.message);
		// });
		// console.log(result);
		// this.billClient.send(PATTERNS.BILL_CREATED, record).subscribe(console.log);
	}

	// @Timeout(Date.now().toString(), 500)
	// async ___test() {
	// 	try {
	// 		const k1 = 'order';
	// 		for (let i = 1; i < 50; i++) {
	// 			await this.redisService.hashSet(`order:${i}`, {
	// 				customerName: `User ${String(i)}`,
	// 				customerPhone: `01234567${String(i)}`,
	// 				quantity: 3,
	// 				totalAmount: 1200,
	// 				isActive: true,
	// 				receiverAddress: {
	// 					city: 'ho Chi Minh',
	// 					district: 'Go Vap',
	// 					name: 'Mai Thang',
	// 					phone: '0123456789',
	// 					attemp: {
	// 						no: 3,
	// 						ac: 1
	// 					}
	// 				},
	// 				discount: 100,
	// 				orderDate: new Date()
	// 			});
	// 		}

	// 		await this.redisService.hashIncrBy(k1, 'quantity', 2);
	// 		await this.redisService.hashIncrBy(k1, 'totalAmount', 300);

	// 		const result = await this.redisService.hashGetAll(k1);
	// 		console.log(result);
	// 	} catch (error) {
	// 		this.logger.error(error.stack);
	// 	}
	// }
}
