import dechromeify from './dechromeify';

var defaults = null;

var get   = dechromeify(chrome.storage.sync, chrome.storage.sync.get);
var set   = dechromeify(chrome.storage.sync, chrome.storage.sync.set);
var clear = dechromeify(chrome.storage.sync, chrome.storage.sync.clear);
export { set, clear };

/**
 * Create request object with default values for the keys
 *
 * @param keys: Array of String
 */
function objectWithDefaults(keys) {
	if (!Array.isArray(keys)) {
		throw new TypeError('First argument is not an array');
	}

	var request = {};
	for (var key of keys) {
		if (!defaults.hasOwnProperty(key)) {
			throw new Error(`No default value for '${key}' found`);
		}
		request[key] = defaults[key];
	}
	return request;
}

/**
 * Inject default values
 */
export function setDefaults(newDefaults) {
	if (defaults) {
		console.warn('Setting the defaults more than once');
	}
	defaults = newDefaults;
}

/**
 * Request one preference value
 *
 * @param key: String
 * @returns a promise that resolves to the vale
 */
export function get(key) {
	return get(objectWithDefaults([ key ])).then(items => items[key]);
}

/**
 * Request several preference values
 *
 * @param keys: Array of String
 * @returns a promise that resolves to an object with the items
 */
export function getMany(keys) {
	return get((keys) ? objectWithDefaults(keys) : defaults);
}