import { redisConfig } from '@app/common/config';
import { RedisClientModule } from '@app/shared/redis-client/redis-client.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { RedisServiceController } from './redis-service.controller';
import { RedisServiceService } from './redis-service.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [redisConfig] }),
		ScheduleModule.forRoot(),
		RedisClientModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				console.log(configService.get('redis'));
				return configService.get('redis');
			},
			inject: [ConfigService]
		})
	],
	controllers: [RedisServiceController],
	providers: [RedisServiceService]
})
export class RedisServiceModule {}
