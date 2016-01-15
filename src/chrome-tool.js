import * as BrowserAction from './browser-action';
import * as Commands from './commands';
import * as Runtime from './runtime';
import * as Tabs from './tabs';
import * as Windows from './windows';

import ContextMenuItem from './ContextMenuItem';
import Popup from './Popup';
import Preferences from './Preferences';

export {
  BrowserAction,
  Commands,
  Runtime,
  Tabs,
  Windows,

  ContextMenuItem,
  Popup,
  Preferences
};

export { getString } from './i18n';
export { onCommand } from './commands';
export { getURL, sendMessage, onMessage } from './runtime';