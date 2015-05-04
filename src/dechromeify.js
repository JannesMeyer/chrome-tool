/**
 * Convert an async Chrome function into one that returns a Promise
 */
export default function dechromeify(obj, key, opts = {}) {
	return function dechromeified() {
		var deferred = Promise.defer();

		// Add callback as last argument
		Array.prototype.push.call(arguments, function callback() {
			var firstArg = arguments[0];
			if (chrome.runtime.lastError) {
				deferred.reject(chrome.runtime.lastError);
			} else if (opts.responseErrors && firstArg !== undefined && firstArg.error !== undefined) {
				deferred.reject(firstArg.error);
			} else {
				deferred.resolve(firstArg);
			}
		});

		// Execute function
		obj[key].apply(obj, arguments);

		return deferred.promise;
	};
}

/**
 * Dechromeify whole objects
 */
export function dechromeifyAll(obj, keys) {
	keys = keys || Object.keys(obj);
	var target = Object.create(null);
	for (var key of keys) {
		if (typeof obj[key] === 'function') {
			target[key] = dechromeify(obj, key);
		}
		// else if (obj[key] instanceof chrome.Event) {
		// 	target[key] = dechromeifyAll(...);
		// }
	}
	return target;
}