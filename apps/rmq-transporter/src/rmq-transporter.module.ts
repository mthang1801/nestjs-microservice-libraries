import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RmqTransporterController } from './rmq-transporter.controller';
import { RmqTransporterService } from './rmq-transporter.service';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true })],
	controllers: [RmqTransporterController],
	providers: [RmqTransporterService]
})
export class RmqTransporterModule {}
