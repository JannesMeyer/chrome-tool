/*
 * Documentation:
 * https://developer.chrome.com/extensions/storage#toc
 */

import { dechromeifyAll } from './dechromeify';

var defaults;

var SyncStorage = dechromeifyAll(chrome.storage.sync);
export var { set, clear } = SyncStorage;

// TODO: make Preferences a class

/**
 * Create request object with default values for the keys
 *
 * @param keys: Array of String
 */
function objectWithDefaults(keys) {
	if (!Array.isArray(keys)) {
		throw new TypeError("First argument is not an array");
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
	return SyncStorage.get(objectWithDefaults([ key ])).then(items => items[key]);
}

/**
 * Request several preference values
 *
 * @param keys: Array of String
 * @returns a promise that resolves to an object with the items
 */
export function getMany(keys) {
	return SyncStorage.get((keys) ? objectWithDefaults(keys) : defaults);
}