// https://developer.chrome.com/extensions/browserAction#toc

import { dechromeifyAll } from './dechromeify';
export default dechromeifyAll(chrome.browserAction, [
  'setTitle',
  'setPopup',
  'setBadgeText',
  'setBadgeBackgroundColor',
  'enable',
  'disable'
]);