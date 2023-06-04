import { isJSON, typeOf } from '@app/common';

export class RedisClientHelper {
	static serializeJSONValue(value: string | number | object): string {
		return typeOf(value) === 'object' ? JSON.stringify(value) : String(value);
	}

	static flatArray<T extends any>(arr: T[], depth = 1) {
		return arr.flat(depth);
	}

	static serializeArrayObjectValue(args: any[] | object): Array<string> {
		switch (typeOf(args)) {
			case 'array':
				return this.mapArrayIntoSequenceArray(args);
			case 'object':
				return this.mapObjectIntoSequenceArray(args);
		}
	}

	static mapArrayIntoSequenceArray(arg): Array<string> {
		return this.flatArray(arg).reduce((result: string[], ele: any) => {
			result.push(this.serializeJSONValue(ele));
			return result;
		}, []) as string[];
	}

	static mapObjectIntoSequenceArray(args) {
		return Object.entries(args).reduce((result: any[], [key, val]: [key: string, val: any]) => {
			result.push(String(key));
			result.push(this.serializeJSONValue(val));
			return result;
		}, []);
	}

	static convertPayloadToMap(payload: object): Map<string, any> {
		return new Map(Object.entries(payload).map(([key, value]) => [key, JSON.stringify(value)]));
	}

	static formatValue(val: string) {
		return isJSON(val) ? JSON.parse(val) : val;
	}
}
