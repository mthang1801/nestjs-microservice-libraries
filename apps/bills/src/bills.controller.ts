import { PATTERNS } from '@app/shared';
import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { BillsService } from './bills.service';
@Controller()
export class BillsController {
	constructor(private readonly billsService: BillsService) {}

	@EventPattern(PATTERNS.ORDER_CREATED)
	handleOrderCreated(@Payload() payload, @Ctx() context: RmqContext) {
		console.log('handleOrderCreated::', payload);
		this.billsService.handleOrderCreated(payload, context);
	}

	@MessagePattern(PATTERNS.BILL_CREATED)
	async handleBillCreated(@Payload() payload) {
		console.log(payload);
	}
}
