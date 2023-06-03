export const typeOf = (value: any): 'string' | 'number' | 'array' | 'object' | 'symbol' | 'bigint' | 'undefined' | 'null' | 'boolean' => {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

export const isJSON = (data: any): boolean => {
	try {
		JSON.parse(data);
	} catch (error) {
		return false;
	}
	return true;
};
