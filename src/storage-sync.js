/*
 * Documentation:
 * https://developer.chrome.com/extensions/storage#toc
 */

import { dechromeifyAll } from './dechromeify';

export var {
	// async
	get,
	getBytesInUse,
	set,
	remove,
	clear
} = dechromeifyAll(chrome.storage.sync);