import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ExceljsModule } from './exceljs.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(ExceljsModule);
	app.useStaticAssets(join(__dirname, '..', '..', 'public'));
	await app.listen(3005);
}
bootstrap();
