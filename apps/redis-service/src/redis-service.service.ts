import { RedisClientService } from '@app/shared/redis-client/redis-client.service';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';

@Injectable()
export class RedisServiceService {
	constructor(private readonly redisService: RedisClientService) {}
	getHello(): string {
		return 'Hello World!';
	}

	@Timeout(Date.now().toString(), 500)
	async ___() {
		console.log(await this.redisService.information());
	}
}
