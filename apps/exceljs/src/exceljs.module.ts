import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExceljsController } from './exceljs.controller';
import { ExceljsService } from './exceljs.service';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', '..', 'public')
		}),
		ScheduleModule.forRoot()
	],
	controllers: [ExceljsController],
	providers: [ExceljsService]
})
export class ExceljsModule {}
