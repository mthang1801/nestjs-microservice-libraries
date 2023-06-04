import { Inject, Injectable, Logger } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';
import { REDIS_CONNECTION_OPTIONS } from './constants';
import { RedisClientConnectionOptions } from './interfaces/redis-client-connection-options.interface';
import { ExpiryMode } from './types/redis.type';
@Injectable()
export class RedisClientService {
	private readonly logger = new Logger(RedisClientService.name);
	private redisClient: RedisClientType | null = null;
	constructor(@Inject(REDIS_CONNECTION_OPTIONS) private readonly connectionOptions: RedisClientConnectionOptions) {}

	async connect() {
		this.redisClient ?? (this.redisClient = await createClient({ url: this.getRedisUrl() }));
		return this.redisClient.connect();
	}

	private getRedisUrl() {
		return this.connectionOptions.username && this.connectionOptions.password
			? `redis://${this.connectionOptions.username}:${this.connectionOptions.password}@${this.connectionOptions.host}:${this.connectionOptions.port}`
			: `redis://${this.connectionOptions.host}:${this.connectionOptions.port}`;
	}

	public async ping(): Promise<string> {
		return this.redisClient.ping();
	}

	public async information(section?: string): Promise<any> {
		return this.redisClient.info(section);
	}

	/**
	 * Set expire to key
	 * @param {string} key
	 * @param {number} expiryTime
	 * @param {number} expiryMode
	 * @return {Promise<boolean>}
	 */
	async setExpire(key: string, expiryTime: number, expiryMode: ExpiryMode = 'EX'): Promise<boolean> {
		try {
			expiryMode === 'EX' ? await this.redisClient.expire(key, Math.floor(expiryTime)) : await this.redisClient.pExpire(key, Math.floor(expiryTime));
			return true;
		} catch (error) {
			this.logger.error(error.stack);
			return false;
		}
	}

	/**
	 * Set A key expired At
	 * @param {string} key
	 * @param {Date | number} expiredAt Date or second
	 * @return {Promise<boolean>}
	 */
	async setExpireAt(key: string, expiredAt: Date | number): Promise<boolean> {
		try {
			await this.redisClient.expireAt(key, typeof expiredAt === 'number' ? Math.floor(expiredAt / 1000) : Math.floor(expiredAt.getTime() / 1000));
			return true;
		} catch (error) {
			this.logger.error(error.stack);
			return false;
		}
	}

	/*************************************************************
	 **************************** STRING *************************
	 *************************************************************/

	/**
	 * Find all keys by pattern
	 * @param {string} pattern
	 * @return {Promise<string[]>}
	 */
	async getAllKeys(pattern = '*'): Promise<string[]> {
		return this.redisClient.keys(pattern);
	}

	/**
	 * Select an index to redis work
	 * @param {number} id
	 * @return {Promise<void>}
	 */
	async selectIndex(id: number): Promise<void> {
		return this.redisClient.SELECT(id);
	}
}
