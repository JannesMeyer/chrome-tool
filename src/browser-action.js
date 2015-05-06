/*
 * Documentation:
 * https://developer.chrome.com/extensions/browserAction#toc
 */

import { dechromeifyAll } from './dechromeify';

var BrowserAction = dechromeifyAll(chrome.browserAction, [
  'setTitle',
  'setPopup',
  'setBadgeText',
  'setBadgeBackgroundColor',
  'enable',
  'disable'
], exports);