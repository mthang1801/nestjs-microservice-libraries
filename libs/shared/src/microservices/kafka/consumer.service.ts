import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { Consumer, ConsumerRunConfig, ConsumerSubscribeTopics, Kafka } from '@nestjs/microservices/external/kafka.interface';

@Injectable()
export class consumerService implements OnApplicationShutdown {
	onApplicationShutdown(signal?: string) {
		throw new Error('Method not implemented.');
	}
	private readonly kafka = new Kafka({
		brokers: ['localhost:9092']
	});

	private readonly consumers: Consumer[] = [];

	async consume(topic: ConsumerSubscribeTopics, config: ConsumerRunConfig) {
		const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
		await consumer.connect();
		await consumer.subscribe(topic);
		await consumer.run(config);
		this.consumers.push(consumer);
	}

	async nApplicationShutdown() {
		await Promise.all(this.consumers.map(async (consumer: Consumer) => consumer.disconnect()));
	}
}
