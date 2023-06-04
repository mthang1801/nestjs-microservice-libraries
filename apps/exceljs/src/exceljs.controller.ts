import { Controller } from '@nestjs/common';
import { ExceljsService } from './exceljs.service';

@Controller()
export class ExceljsController {
	constructor(private readonly exceljsService: ExceljsService) {}
}
