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
export function getString(name, substitution) {
  if (substitution == null) {
    return chrome.i18n.getMessage(name);
  }

  if (typeof substitution === 'number' && substitution > 1) {
    return chrome.i18n.getMessage(name + 's', [ substitution ]);
  } else {
    return chrome.i18n.getMessage(name, [ substitution ]);
  }
}