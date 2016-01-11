# chrome-tool

[![Build Status](https://travis-ci.org/JannesMeyer/chrome-tool.svg?branch=master)](https://travis-ci.org/JannesMeyer/chrome-tool)
[![Dependencies](https://david-dm.org/JannesMeyer/chrome-tool.svg)](https://david-dm.org/JannesMeyer/chrome-tool)
[![Development Dependencies](https://david-dm.org/JannesMeyer/chrome-tool/dev-status.svg)](https://david-dm.org/JannesMeyer/chrome-tool#info=devDependencies)

## Windows

```js
import * as Windows from 'chrome-tool/windows';
```

The API is like chrome.windows.\* except that it returns promises.

[Documentation](https://developer.chrome.com/extensions/windows#toc)

- Windows.get(windowId, getInfo): Promise
- Windows.getCurrent(getInfo): Promise
- Windows.getLastFocused(getInfo): Promise
- Windows.getAll(getInfo): Promise
- Windows.create(createData): Promise
- Windows.update(windowId, updateInfo): Promise
- Windows.remove(windowId): Promise

Events:

- Windows.onCreated(callback): void
- Windows.onRemoved(callback): void
- Windows.onFocusChanged(callback): void

Custom functions:

- Windows.open(windows: string[][], reuseThreshold = 1): void
	- `windows`: 2-dimensional array of URLs to open as windows
	- `reuseThreshold`: Re-uses the current window if its number of tabs is less than or equal

## Tabs

```js
import * as Tabs from 'chrome-tool/tabs';
```

The API is like chrome.tabs.\* except that it returns promises.

[Documentation](https://developer.chrome.com/extensions/tabs#toc)

## Runtime

```js
import * as Runtime from 'chrome-tool/runtime';
```

The API is like chrome.tabs.\* except that it returns promises.

[Documentation](https://developer.chrome.com/extensions/tabs#toc)

## Contributing

Download source and compile:

	git clone git@github.com:JannesMeyer/chrome-tool.git
	make

Watch for changes and recompile:

	make watch

Run tests:

	npm test
