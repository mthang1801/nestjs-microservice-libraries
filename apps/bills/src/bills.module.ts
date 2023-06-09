import { CommonModule } from '@app/common';
import { RMQClientModule } from '@app/shared';
import { Module, forwardRef } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';

@Module({
	imports: [forwardRef(() => CommonModule), RMQClientModule],
	controllers: [BillsController],
	providers: [BillsService]
})
export class BillsModule {}
