/*
 * Documentation:
 * https://developer.chrome.com/extensions/browserAction#toc
 */

import { dechromeifyAll } from './dechromeify';

export var {
  // async
  getTitle,
  setIcon,
  getPopup,
  getBadgeText,
  getBadgeBackgroundColor,

  // sync
  setTitle,
  setPopup,
  setBadgeText,
  setBadgeBackgroundColor,
  enable,
  disable
} = dechromeifyAll(chrome.browserAction, [
  'setTitle',
  'setPopup',
  'setBadgeText',
  'setBadgeBackgroundColor',
  'enable',
  'disable'
]);

// Events
export var onClicked = chrome.browserAction.onClicked.addListener.bind(chrome.browserAction.onClicked);