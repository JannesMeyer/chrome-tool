# chrome-tool

[![Build Status](https://travis-ci.org/JannesMeyer/chrome-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/chrome-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/chrome-tool.svg)](https://david-dm.org/JannesMeyer/chrome-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/chrome-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/chrome-tool#info=devDependencies)

Compatible with Chrome 45 and higher. For older versions you might need to polyfill these:

- Object.assign
- Promise
- Map

## Tabs

```js
import { Tabs } from 'chrome-tool';
```

The API works like [chrome.tabs.\*](https://developer.chrome.com/extensions/tabs#toc) except that it returns promises.

Functions:

- `Tabs.get(tabId: number): Promise`
- `Tabs.getCurrent(): Promise`
- `Tabs.create(createProperties): Promise`
- `Tabs.duplicate(tabId: number): Promise`
- `Tabs.query(queryInfo): Promise`
- `Tabs.highlight(highlightInfo): Promise`
- `Tabs.update(tabId?: number, updateProperties): Promise`
- `Tabs.move(tabIds: number | number[], moveProperties): Promise`
- `Tabs.reload(tabId?: number, reloadProperties?): Promise`
- `Tabs.remove(tabIds: number | number[]): Promise`
- `Tabs.detectLanguage(tabId?: number): Promise`
- `Tabs.captureVisibleTab(windowId?: number, options?): Promise`
- `Tabs.executeScript(tabId?: number, details): Promise`
- `Tabs.insertCSS(tabId?: number, object details): Promise`
- `Tabs.setZoom(tabId?: number, zoomFactor: number): Promise`
- `Tabs.getZoom(tabId?: number): Promise`
- `Tabs.setZoomSettings(tabId?: number, zoomSettings): Promise`
- `Tabs.getZoomSettings(tabId?: number): Promise`

Events:

- `Tabs.onCreated(callback): void`
- `Tabs.onUpdated(callback): void`
- `Tabs.onMoved(callback): void`
- `Tabs.onSelectionChanged(callback): void`
- `Tabs.onActiveChanged(callback): void`
- `Tabs.onActivated(callback): void`
- `Tabs.onHighlightChanged(callback): void`
- `Tabs.onHighlighted(callback): void`
- `Tabs.onDetached(callback): void`
- `Tabs.onAttached(callback): void`
- `Tabs.onRemoved(callback): void`
- `Tabs.onReplaced(callback): void`
- `Tabs.onZoomChange(callback): void`

Custom functions:

- `Tabs.getHighlighted(): Promise`
- `Tabs.getActive(): Promise`
- `Tabs.open(openerTab: { id: number }, url: string): Promise`
- `Tabs.count(): Promise`
- `Tabs.moveHighlighted(direction: number): Promise`
- `Tabs.moveToNewWindow(tabs: Tab[], incognito: boolean): Promise`
- `Tabs.moveToWindow(tabs: Tab[], targetWindowId: number): Promise`
- `Tabs.closeOthers(): Promise`

## Windows

```js
import { Windows } from 'chrome-tool';
```

The API works like [chrome.windows.\*](https://developer.chrome.com/extensions/windows#toc) except that it returns promises.

Functions:

- `Windows.get(windowId, getInfo?): Promise`
- `Windows.getCurrent(getInfo?): Promise`
- `Windows.getLastFocused(getInfo?): Promise`
- `Windows.getAll(getInfo?): Promise`
- `Windows.create(createData?): Promise`
- `Windows.update(windowId, updateInfo): Promise`
- `Windows.remove(windowId): Promise`

Events:

- `Windows.onCreated(callback): void`
- `Windows.onRemoved(callback): void`
- `Windows.onFocusChanged(callback): void`

Custom functions:

- `Windows.open(windows: string[][], reuseThreshold = 1): void`
	- `windows`: 2-dimensional array of URLs to open as windows
	- `reuseThreshold`: Re-uses the current window if its number of tabs is less than or equal

## Runtime

```js
import { Runtime } from 'chrome-tool';
```

The API works like [chrome.runtime.\*](https://developer.chrome.com/extensions/runtime#toc) except that it returns promises.

Functions:

- `Runtime.getBackgroundPage(): Promise`
- `Runtime.openOptionsPage(): Promise`
- `Runtime.getManifest(): any`
- `Runtime.getURL(string path): string`
- `Runtime.setUninstallURL(url: string): Promise`
- `Runtime.reload(): void`
- `Runtime.requestUpdateCheck(): Promise`
- `Runtime.restart(): void`
- `Runtime.connect(extensionId?: string, connectInfo?): Port`
- `Runtime.connectNative(application: string): Port`
- `Runtime.sendNativeMessage(application: string, message): Promise`
- `Runtime.getPlatformInfo(): Promise`
- `Runtime.getPackageDirectoryEntry(): Promise`

Modified functions (these work differently than described in Chrome's docs):

- `sendMessage(operation: string, message): Promise`
- `onMessage(operation: string, callback): void`

Events:

- `Runtime.onStartup(callback): void`
- `Runtime.onInstalled(callback): void`
- `Runtime.onSuspend(callback): void`
- `Runtime.onSuspendCanceled(callback): void`
- `Runtime.onUpdateAvailable(callback): void`
- `Runtime.onConnect(callback): void`
- `Runtime.onConnectExternal(callback): void`
- `Runtime.onMessageExternal(callback): void`
- `Runtime.onRestartRequired(callback): void`

## StorageSync

```js
import { StorageSync } from 'chrome-tool';
```

The API works like [chrome.storage.sync.\*](https://developer.chrome.com/extensions/storage#toc) except that it returns promises.

Functions:

- `StorageSync.get(keys?: string | string[] | object): Promise`
- `StorageSync.getBytesInUse(keys?: string | string[]): Promise`
- `StorageSync.set(items): Promise`
- `StorageSync.remove(keys: string | string[]): Promise`
- `StorageSync.clear(): Promise`

Events:

- `StorageSync.onChanged(callback): void`

## BrowserAction

```js
import { BrowserAction } from 'chrome-tool';
```

The API works like [chrome.browserAction.\*](https://developer.chrome.com/extensions/browserAction#toc) except that it returns promises.

Functions:

- `BrowserAction.getTitle(details: object): Promise`
- `BrowserAction.getPopup(details: object): Promise`
- `BrowserAction.getBadgeText(details: object): Promise`
- `BrowserAction.getBadgeBackgroundColor(details: object): Promise`
- `BrowserAction.setTitle(details: object): void`
- `BrowserAction.setPopup(details: object): void`
- `BrowserAction.setBadgeText(details: object): void`
- `BrowserAction.setBadgeBackgroundColor(details: object): void`
- `BrowserAction.setIcon(details: object): Promise`
- `BrowserAction.enable(tabId?: number): void`
- `BrowserAction.disable(tabId?: number): void`

Events:

- `BrowserAction.onClicked(callback): void`

## Management

```js
import { getExtensionInfo } from 'chrome-tool/management';
```

Functions:

- `getExtensionInfo(): Promise`
	- [chrome.managment.getSelf()](https://developer.chrome.com/extensions/management#method-getSelf)

## Internationalization

```js
import { getString } from 'chrome-tool/i18n';
```

- `getString(name: string, substitution?: number | string): string`
	- Slight improvement over the builtin [chrome.i18n.getMessage](https://developer.chrome.com/extensions/i18n#toc)
	- [Read the implementation](https://github.com/JannesMeyer/chrome-tool/blob/fcd8ff6f8eb1a6745dc3f4464cdd5ddd42a263e7/src/i18n.js)

## ContextMenuItem

```js
import { ContextMenuItem } from 'chrome-tool/i18n';
```

[chrome.contextMenus.\*](https://developer.chrome.com/extensions/contextMenus#toc)

```js
let item = new ContextMenuItem(id?: string, contexts?: string[], onclick?: function);
item.show();
item.hide();
item.setVisible(visibility: boolean);
```

## Contributing

Download source and compile:

	git clone git@github.com:[USERNAME]/chrome-tool.git
	make

Watch for changes and recompile:

	make watch

Run tests:

	npm test
