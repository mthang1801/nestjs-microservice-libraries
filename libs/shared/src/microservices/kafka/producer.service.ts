import { Injectable, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import { Producer, ProducerRecord } from '@nestjs/microservices/external/kafka.interface';
import { Kafka } from 'kafkajs';

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown {
	private readonly kafka = new Kafka({
		brokers: ['localhost:9092']
	});

	private readonly producer: Producer = this.kafka.producer();

	async onModuleInit() {
		await this.producer.connect();
	}

	async produce(record: ProducerRecord) {
		await this.producer.send(record);
	}

	async onApplicationShutdown() {
		await this.producer.disconnect();
	}
}
