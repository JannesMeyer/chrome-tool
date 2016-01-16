// https://developer.chrome.com/extensions/runtime#toc

import { dechromeifyAll } from './dechromeify';
export default dechromeifyAll(chrome.runtime, [
  'getManifest',
  'getURL',
  'reload',
  'restart',
  'connect',
  'connectNative'
]);