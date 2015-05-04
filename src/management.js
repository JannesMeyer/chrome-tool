/*
 * Documentation:
 * https://developer.chrome.com/extensions/management#toc
 */

import dechromeify from './dechromeify';

export var getExtensionInfo = dechromeify(chrome.management, 'getSelf');