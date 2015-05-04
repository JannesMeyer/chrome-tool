import * as Storage from './storage-sync';

export default class Preferences {

	constructor(defaults) {
		this.defaults = defaults;
	}

	/**
	 * Requests one ore more preference values and
	 * returns the value itself or an object containing
	 * all keys and values
	 */
	get() {
		var results = Storage.get(filterObject(this.defaults, arguments))

		// Return a single value or an array
		if (arguments.length === 1) {
			return results.then(obj => obj[arguments[0]]);
		} else {
			return results;
		}
	}

	/**
	 * Requests all preferences values
	 */
	getAll() {
		return Storage.get(null);
	}

}








/**
 * Create request object with default values for the keys
 *
 * @param keys: Array of String
 */
function filterObject(obj, keys) {
	var request = {};
	for (var key of keys) {
		if (!obj.hasOwnProperty(key)) {
			throw new Error(`No default value for '${key}' found`);
		}
		request[key] = obj[key];
	}
	return request;
}