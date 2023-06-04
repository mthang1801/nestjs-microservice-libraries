import { mysqlConfig } from '@app/common/config';
import { MySQLModule } from '@app/shared/database/mysql/mysql.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MysqlServiceController } from './mysql-service.controller';
import { MysqlServiceService } from './mysql-service.service';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [mysqlConfig] }),
		MySQLModule.registerAsync({ useFactory: (configService: ConfigService) => configService.get('mysql'), inject: [ConfigService] })
	],
	controllers: [MysqlServiceController],
	providers: [MysqlServiceService]
})
export class MysqlServiceModule {}
