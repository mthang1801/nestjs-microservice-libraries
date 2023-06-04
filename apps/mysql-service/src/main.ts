import { NestFactory } from '@nestjs/core';
import { MysqlServiceModule } from './mysql-service.module';

async function bootstrap() {
  const app = await NestFactory.create(MysqlServiceModule);
  await app.listen(3000);
}
bootstrap();
