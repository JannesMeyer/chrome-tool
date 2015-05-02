var defaults = null;

var get   = dechromeify(chrome.storage.sync, chrome.storage.sync.get);
var set   = dechromeify(chrome.storage.sync, chrome.storage.sync.set);
var clear = dechromeify(chrome.storage.sync, chrome.storage.sync.clear);
export { get, set, clear };

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
export function getOne(key) {
	return getPreferences(objectWithDefaults([ key ])).then(items => items[key]);
}

/**
 * Request several preference values
 *
 * @param keys: Array of String
 * @returns a promise that resolves to an object with the items
 */
export function getMany(keys) {
	if (keys === undefined) {
		return get(defaults);
	}
	return get(objectWithDefaults(keys));
}