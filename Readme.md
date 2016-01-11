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
