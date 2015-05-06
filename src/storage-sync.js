/*
 * Documentation:
 * https://developer.chrome.com/extensions/storage#toc
 */

import { dechromeifyAll } from './dechromeify';

var StorageSync = dechromeifyAll(chrome.storage.sync, [], exports);