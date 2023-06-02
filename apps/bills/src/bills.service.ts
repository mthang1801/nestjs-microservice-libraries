import { Injectable, Logger } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';

@Injectable()
export class BillsService {
	private readonly logger = new Logger(BillsService.name);
	handleOrderCreated(payload: any, ctx: RmqContext) {
		this.logger.log(JSON.stringify(payload, null, 4), 'Payload');
		this.logger.log(ctx.getMessage()?.properties, 'Context');
	}
}
