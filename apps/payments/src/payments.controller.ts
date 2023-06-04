import { PATTERNS } from '@app/shared';
import { Controller, Get } from '@nestjs/common';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
	constructor(private readonly paymentsService: PaymentsService) {}

	@Get()
	getHello(): string {
		return this.paymentsService.getHello();
	}

	@EventPattern(PATTERNS.ORDER_CREATED)
	handleOrderCreated(@Payload() payload, @Ctx() context: RmqContext) {
		console.log('handleOrderCreated::', payload, context);
	}

	@MessagePattern(PATTERNS.BILL_CREATED)
	async handleBillCreated(@Payload() payload) {
		console.log('handleBillCreated::', payload);
	}
}
