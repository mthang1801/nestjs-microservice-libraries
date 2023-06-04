import { RedisModule } from '@app/shared';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
		MongooseModule.forRootAsync({
			connectionName: 'primary',
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URI')
			}),
			inject: [ConfigService]
		}),
		ScheduleModule.forRoot(),
		forwardRef(() => RedisModule)
	],
	providers: [],
	exports: []
})
export class CommonModule {}
