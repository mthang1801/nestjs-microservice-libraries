import { Controller, Get, Ip } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller()
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	getHello(@Ip() ip): string {
		console.log(ip);
		return this.productsService.getHello();
	}
}
