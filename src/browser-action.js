import { dechromeifyAll } from './dechromeify';

var BrowserAction = dechromeifyAll(chrome.browserAction, [
  'setTitle',
  'setPopup',
  'setBadgeText',
  'setBadgeBackgroundColor',
  'enable',
  'disable'
]);

export default BrowserAction;