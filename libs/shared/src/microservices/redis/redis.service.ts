import { Injectable, Logger } from '@nestjs/common';
import { Redis, ValueType } from 'ioredis';
import { RedisService as RedisClientService } from 'nestjs-redis';
import { RedisHelper } from './redis.helper';
import type { ExpiryMode } from './types/redis.type';

@Injectable()
export class RedisService {
	private readonly logger = new Logger(RedisService.name);
	protected readonly getClients: Redis = null;
	constructor(private readonly redisClient: RedisClientService) {
		this.getClients = this.redisClient.getClient();
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
		return this.getClients.keys(pattern);
	}

	/**
	 * Select an index to redis work
	 * @param {number} id
	 * @return {Promise<"OK">}
	 */
	async selectIndex(id: number): Promise<'OK'> {
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
		if (ttl) return this.getClients.set(key, RedisHelper.serializeJSONValue(value), expiryMode, ttl);
		return this.getClients.set(key, RedisHelper.serializeJSONValue(value));
	}

	/**
	 * Delete many keys
	 * @param {string[]} keys
	 * @return {Promise<number>}
	 */
	async del(...keys): Promise<number> {
		return this.getClients.del(RedisHelper.flatArray<string>(keys));
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

	/**
	 * set multiple  key valu
	 * @param {string} args
	 * @return {Promise<"OK">}
	 */
	async mset(args) {
		return this.getClients.mset(RedisHelper.serializeArrayObjectValue(args));
	}

	/**
	 * get multiple values by keys
	 * @param {string[]} keys
	 * @return {Promise<string[]>}
	 */
	async mget(...keys: KeyType[]): Promise<string[]> {
		return this.getClients.mget(RedisHelper.flatArray<KeyType>(keys));
	}

	/**
	 * Increment one value by key
	 * @param {string} key
	 * @return {Promise<number>}
	 */
	async incr(key: string): Promise<number> {
		return this.getClients.incr(key);
	}

	/**
	 * Increment value number by key
	 * @param {string} key
	 * @return {Promise<number>}
	 */
	async incrby(key: string, increment: number): Promise<number> {
		return this.getClients.incrby(key, increment);
	}

	/************************************************************
	 **************************** LIST ***************************
	 *************************************************************/

	/**
	 * Push elements into the left of list by key
	 * @param {string} key
	 * @param {string[]} values
	 * @return {Promise<number>}
	 */
	async unshift(key: string, ...values: ValueType[]): Promise<number> {
		return await this.getClients.lpush(key, RedisHelper.flatArray(values));
	}
	/**
	 *  Push elements into the right of list by key
	 * @param {string} key
	 * @param {string[]} values
	 * @return {Promise<number>}
	 */
	async push(key: string, ...values: ValueType[]): Promise<number> {
		return await this.getClients.rpush(key, RedisHelper.flatArray(values));
	}

	/**
	 * Get sub list from list
	 * @param key
	 * @param startIdx
	 * @param endIdx
	 * @returns
	 */
	async slice(key: string, startIdx: number, endIdx: number): Promise<string[]> {
		return this.getClients.lrange(key, startIdx, endIdx);
	}

	/**
	 * Remove first element out of list
	 * @param key
	 * @returns
	 */
	async shift(key: string): Promise<string> {
		return this.getClients.lpop(key);
	}

	/**
	 * Remove the last element out of list
	 * @param key
	 * @returns
	 */
	async pop(key: string): Promise<string> {
		return this.getClients.rpop(key);
	}

	/**
	 * Replace value to element in list by index
	 * @param key
	 * @param index
	 * @param value
	 * @returns
	 */
	async lset(key: string, index: number, value: string) {
		return this.getClients.lset(key, index, value);
	}

	async linsert(key: string, direction: 'BEFORE' | 'AFTER', pivot: string, value: string): Promise<number> {
		return this.getClients.linsert(key, direction, pivot, value);
	}

	/**
	 * Return size of list by key
	 * @param {string} key
	 * @return {Promise<number>}
	 */
	async llen(key: string): Promise<number> {
		return this.getClients.llen(key);
	}
}
