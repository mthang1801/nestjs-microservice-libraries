import { Controller, Get } from '@nestjs/common';
import { NatsServiceService } from './nats-service.service';

@Controller()
export class NatsServiceController {
	constructor(private readonly natsServiceService: NatsServiceService) {}

	@Get()
	getHello(): string {
		return this.natsServiceService.getHello();
	}
}
