import { CommonModule } from '@app/common';
import { QUEUES, RMQClientModule, RedisModule } from '@app/shared';
import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
@Module({
	imports: [CommonModule, RMQClientModule.register({ name: QUEUES.BILLS })],
	controllers: [OrdersController],
	providers: [OrdersService]
})
export class OrdersModule {}
