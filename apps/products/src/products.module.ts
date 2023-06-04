import { MySQLConnection, mysqlConfig } from '@app/common/config';
import { MySQLModule } from '@app/shared/database/mysql/mysql.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [mysqlConfig]
		}),
		ScheduleModule.forRoot(),
		// MySQLModule.registerAsync({ useFactory: (configService: ConfigService) => configService.get('mysql'), inject: [ConfigService] })
		MySQLModule.registerAsync({ useExisting: MySQLConnection })
	],
	controllers: [ProductsController],
	providers: [ProductsService]
})
export class ProductsModule {}
