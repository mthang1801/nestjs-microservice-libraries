import { Injectable, Logger } from '@nestjs/common';
import { BooleanResponse, Redis, ValueType } from 'ioredis';
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

	/**
	 * Set expire to key
	 * @param {string} key
	 * @param {number} expiryTime
	 * @param {number} expiryMode
	 * @returns
	 */
	async setExpire(key: string, expiryTime: number, expiryMode: ExpiryMode = 'EX'): Promise<BooleanResponse> {
		return expiryMode === 'EX' ? this.getClients.expire(key, Math.floor(expiryTime)) : this.getClients.pexpire(key, Math.floor(expiryTime));
	}

	/**
	 * Set A key expired At
	 * @param {string} key
	 * @param {Date | number} expiredAt Date or second
	 * @return {Promise<BooleanResponse>}
	 */
	async setExpireAt(key: string, expiredAt: Date | number): Promise<BooleanResponse> {
		return this.getClients.expireat(key, typeof expiredAt === 'number' ? Math.floor(expiredAt / 1000) : Math.floor(expiredAt.getTime() / 1000));
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
	async set(key: string, value: string | object, ttl = null, expiryMode: ExpiryMode = 'EX'): Promise<'OK'> {
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
	async listUnshift(key: string, ...values: ValueType[]): Promise<number> {
		return await this.getClients.lpush(key, RedisHelper.flatArray(values));
	}
	/**
	 *  Push elements into the right of list by key
	 * @param {string} key
	 * @param {string[]} values
	 * @return {Promise<number>}
	 */
	async listPush(key: string, ...values: ValueType[]): Promise<number> {
		return await this.getClients.rpush(key, RedisHelper.flatArray(values));
	}

	/**
	 * Get sub list from list
	 * @param key
	 * @param startIdx
	 * @param endIdx
	 * @returns
	 */
	async listSlice(key: string, startIdx: number, endIdx: number): Promise<string[]> {
		return this.getClients.lrange(key, startIdx, endIdx);
	}

	/**
	 * Remove first element out of list
	 * @param key
	 * @returns
	 */
	async listShift(key: string): Promise<string> {
		return this.getClients.lpop(key);
	}

	/**
	 * Remove the last element out of list
	 * @param key
	 * @returns
	 */
	async listPop(key: string): Promise<string> {
		return this.getClients.rpop(key);
	}

	/**
	 * Replace value to element in list by index
	 * @param key
	 * @param index
	 * @param value
	 * @returns
	 */
	async listSet(key: string, index: number, value: string) {
		return this.getClients.lset(key, index, value);
	}

	async listInsert(key: string, direction: 'BEFORE' | 'AFTER', pivot: string, value: string): Promise<number> {
		return this.getClients.linsert(key, direction, pivot, value);
	}

	/**
	 * Return size of list by key
	 * @param {string} key
	 * @return {Promise<number>}
	 */
	async listLength(key: string): Promise<number> {
		return this.getClients.llen(key);
	}

	/************************************************************
	 **************************** HASH ***************************
	 *************************************************************/

	/**
	 * Set hash value by key
	 * @param key
	 * @param payload
	 * @returns
	 */
	async hashSet(key: string, payload: object): Promise<number> {
		return this.getClients.hset(key, RedisHelper.convertPayloadToMap(payload));
	}

	/**
	 * Get hash values by key
	 * @param key
	 * @returns
	 */
	async hashGetAll(key: string): Promise<any> {
		const responseData = await this.getClients.hgetall(key);
		return Object.entries(responseData).reduce((result: object, [key, val]: [string, any]) => {
			result[key] = RedisHelper.formatValue(val);
			return result;
		}, {});
	}

	/**
	 * Get multiple values by key and args in hash
	 * @param {string} key
	 * @param {string[]} fields
	 * @return {Promise<Record<string, string>>}
	 */
	async hashGetValuesByKeys(key: string, ...fields: ValueType[]) {
		const listArgs = RedisHelper.flatArray<ValueType>(fields);
		const responseData = await this.getClients.hmget(key, listArgs);
		return listArgs.reduce((result, key, i) => {
			result[key] = RedisHelper.formatValue(responseData[i]);
			return result;
		}, {});
	}

	/**
	 * Get hash keys
	 * @param {string} key
	 * @return {Promise<string[]>}
	 */
	async hashGetKeys(key: string): Promise<string[]> {
		return this.getClients.hkeys(key);
	}

	/**
	 * Incremnent a number of field in hash key
	 * @param {string} key
	 * @param {string} field
	 * @param {number} increment
	 * @param {INT | FLOAT} type
	 * @return {Promise<number>}
	 */
	async hashIncrBy(key: string, field: string, increment: number, type: 'INTEGER' | 'FLOAT' = 'INTEGER'): Promise<number> {
		return type === 'INTEGER' ? this.getClients.hincrby(key, field, increment) : this.getClients.hincrbyfloat(key, field, increment);
	}

	/**
	 * Get the field size in hash key
	 * @param key
	 * @returns
	 */
	async hashFieldLength(key: string): Promise<number> {
		return this.getClients.hlen(key);
	}
}
