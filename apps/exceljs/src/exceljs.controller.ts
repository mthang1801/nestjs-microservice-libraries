import { Controller, Post } from '@nestjs/common';
import { ExceljsService } from './exceljs.service';

@Controller()
export class ExceljsController {
	constructor(private readonly exceljsService: ExceljsService) {}

	@Post()
	async test() {
		return this.exceljsService.test();
	}
}
