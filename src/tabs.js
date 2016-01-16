// https://developer.chrome.com/extensions/tabs#toc

import { dechromeifyAll } from './dechromeify';
export default dechromeifyAll(chrome.tabs, [ 'connect' ]);