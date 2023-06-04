import { CommonModule } from '@app/common';
import { RMQClientModule } from '@app/shared';
import { Module, forwardRef } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

@Module({
	imports: [forwardRef(() => CommonModule), RMQClientModule],
	controllers: [PaymentsController],
	providers: [PaymentsService]
})
export class PaymentsModule {}
