export class RedisHelper {
	static typeOf(value: any): 'string' | 'number' | 'array' | 'object' | 'symbol' | 'bigint' | 'undefined' | 'null' | 'boolean' {
		return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
	}

	static serializeJSONValue(value: string | number | object): string {
		return this.typeOf(value) === 'object' ? JSON.stringify(value) : String(value);
	}

	static flatArray<T>(arr: T[], depth = 1) {
		return arr.flat(depth);
	}

	static serializeArrayObjectValue(args: any[] | object): Array<string> {
		switch (this.typeOf(args)) {
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
}
