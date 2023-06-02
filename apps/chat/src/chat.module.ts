import { CommonModule } from '@app/common';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
	imports: [CommonModule],
	controllers: [ChatController],
	providers: [ChatService, ChatGateway]
})
export class ChatModule {}
