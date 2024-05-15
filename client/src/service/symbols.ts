export const convertString = (array: Record<string, string>) => {
	const arr = Object.entries(array);
	const newObj: Record<string, Array<string>> = {};

	for (const [key, value] of arr) {
		// newObj[key] = [
		// 	...new Set(value.split(/\s*,\s*/).map((item) => parseEntity(key, item))),
		// ];
		newObj[key] = value.split(/\s*,\s*/).map((item) => parseEntity(key, item));
	}
	return newObj;
};

const parseEntity = (key: string, item: string) => {
	item = item.replace(' ', '');
	const fn = (symbol: string) => {
		if (item.startsWith(symbol)) {
			return item;
		} else {
			return symbol + item;
		}
	};
	if (key === 'hashtags') {
		return fn('#');
	} else if (key === 'cashtags') {
		return fn('$');
	} else if (key === 'mentions') {
		return fn('@');
	} else {
		return item;
	}
};
