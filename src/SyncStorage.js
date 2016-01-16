// https://developer.chrome.com/extensions/storage#toc

import { dechromeifyAll } from './dechromeify';
export default dechromeifyAll(chrome.storage.sync);