import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsServiceController } from './nats-service.controller';
import { NatsServiceService } from './nats-service.service';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true })],
	controllers: [NatsServiceController],
	providers: [NatsServiceService]
})
export class NatsServiceModule {}
