import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), ScheduleModule.forRoot()],
	controllers: [EventsController],
	providers: [EventsService]
})
export class EventsModule {}
