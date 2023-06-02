import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RMQService } from './rmq,service';
import { DynamicModuleOptions } from './types/dynamic-module-options.type';

@Module({
	providers: [RMQService],
	exports: [RMQService]
})
export class RMQClientModule {
	static register({ name }: DynamicModuleOptions): DynamicModule {
		return {
			module: RMQClientModule,
			imports: [
				ClientsModule.registerAsync([
					{
						name,
						useFactory: (configService: ConfigService) => ({
							transport: Transport.RMQ,
							options: {
								urls: [configService.get<string>('RMQ_URI')],
								queue: name
							}
						}),
						inject: [ConfigService]
					}
				])
			],
			exports: [ClientsModule]
		};
	}
}
