import { ExceptionFilter } from '@app/common/filter/all-exception.filter';
import { PATTERNS } from '@app/shared';
import { Controller, UseFilters } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext, RpcException } from '@nestjs/microservices';
import { BillsService } from './bills.service';
@Controller()
export class BillsController {
	constructor(private readonly billsService: BillsService) {}

	@EventPattern(PATTERNS.ORDER_CREATED)
	@UseFilters(new ExceptionFilter())
	handleOrderCreated(@Payload() payload, @Ctx() context: RmqContext) {
		this.billsService.handleOrderCreated(payload, context);
		throw new RpcException('Something went wrong');
	}

	@MessagePattern(PATTERNS.BILL_CREATED)
	@UseFilters(new ExceptionFilter())
	async handleBillCreated(@Payload() payload) {
		console.log(payload);
		throw new RpcException('Something went wrong');
	}
}
