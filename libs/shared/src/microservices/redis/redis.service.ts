import { Utils } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Redis } from 'ioredis';
import { RedisService as RedisClientService } from 'nestjs-redis';
import type { ExpiryMode } from './types/redis.type';

@Injectable()
export class RedisService {
	private readonly logger = new Logger(RedisService.name);
	protected readonly getClients: Redis = null;
	constructor(private readonly redisClient: RedisClientService) {
		this.getClients = this.redisClient.getClient();
	}

	/**
	 * Find all keys by pattern
	 * @param {string} pattern
	 * @return {Promise<string[]>}
	 */
	async getAllKeys(pattern = '*'): Promise<string[]> {
		this.logger.log(`******************* REDIS GET ALL KEYS [${pattern}] *******************`);
		return this.getClients.keys(pattern);
	}

	/**
	 * Select an index to redis work
	 * @param {number} id
	 * @return {Promise<"OK">}
	 */
	async selectIndex(id: number): Promise<'OK'> {
		this.logger.log(`******************* REDIS GET ALL KEYS [${id}] *******************`);
		return this.getClients.select(id);
	}

	/**
	 *
	 * @param {string} key
	 * @returns {Promise<string>} return json string value
	 */
	async get(key: string): Promise<string> {
		return await this.getClients.get(key);
	}

	/**
	 *
	 * @param {string} key
	 * @param {string} value
	 * @param {number} ttl
	 * @return {Promise<"OK">}
	 */
	async set(key: string, value: string | object, expiryMode: ExpiryMode = 'EX', ttl = null): Promise<'OK'> {
		if (ttl) return this.getClients.set(key, Utils.serializeJSONValue(value), expiryMode, ttl);
		return this.getClients.set(key, Utils.serializeJSONValue(value));
	}

	/**
	 * Delete many keys
	 * @param {string[]} keys
	 * @return {Promise<number>}
	 */
	async del(...keys): Promise<number> {
		return this.getClients.del(Utils.flatArray<string>(keys));
	}

	/**
	 * Get time to live of key
	 * @param key
	 * @param ttl
	 * @param expiryMode
	 * @returns
	 */
	async ttl(key: string): Promise<number> {
		return this.getClients.ttl(key);
	}

	async mset(args) {
		return this.getClients.mset(Utils.serializeArrayObjectValue(args));
	}
}
