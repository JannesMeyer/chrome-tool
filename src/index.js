import * as Tabs from './tabs';
import * as Popup from './popup';
import * as Windows from './windows';
import * as Preferences from './preferences';
import ContextMenuItem from './ContextMenuItem';
import * as BrowserAction from './browser-action';
import * as Runtime from './runtime';

export { getString } from './i18n';
export { onCommand } from './commands';
export { getURL, getExtensionInfo, sendMessage, onMessage } from './runtime';

export {
	Tabs,
	Popup,
	Windows,
	Preferences,
	ContextMenuItem,
	BrowserAction,
	Runtime,
	Commands
};