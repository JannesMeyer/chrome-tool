/**
 * Select keys from an object
 *
 * @param keys Array
 */
export function cloneKeys(keys, obj) {
	if (!Array.isArray(keys)) {
		throw new TypeError("First argument is not an array");
	}
	if (obj === undefined || obj === null) {
		throw new TypeError("Second argument is not defined");
	}
	var result = {};
	for (var k of keys) {
		if (!obj.hasOwnProperty(k)) {
			throw new Error("Second argument does not have the property " + k);
		}
		result[k] = obj[k];
	}
	return result;
}

export function prop(key) {
	return function(obj) {
		return obj[key];
	};
}