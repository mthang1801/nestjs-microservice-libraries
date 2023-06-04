import { Injectable } from '@nestjs/common';

@Injectable()
export class RmqTransporterService {
	getHello(): string {
		return 'Hello World!';
	}
}
