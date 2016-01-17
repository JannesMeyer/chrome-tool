import BrowserAction from './BrowserAction';
import Management from './Management';
import Runtime from './Runtime';
import SyncStorage from './SyncStorage';
import Tabs from './Tabs';
import Windows from './Windows';

export {
  BrowserAction,
  Management,
  Runtime,
  SyncStorage,
  Tabs,
  Windows
};

/**
 * Returns a translated string
 * https://developer.chrome.com/extensions/i18n#toc
 */
export function getString(name: string, substitution?: string | number): string {
  if (typeof substitution === 'number') {
    name += (substitution === 1 ? '_one' : '_many');
  }
  return chrome.i18n.getMessage(name, [ substitution ]);
}