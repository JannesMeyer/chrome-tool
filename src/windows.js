import dechromeify from './dechromeify';

// TODO: automatically convert the module
var create         = dechromeify(chrome.windows, chrome.windows.create);
var get            = dechromeify(chrome.windows, chrome.windows.get);
var getAll         = dechromeify(chrome.windows, chrome.windows.getAll);
var getLastFocused = dechromeify(chrome.windows, chrome.windows.getLastFocused);
var update         = dechromeify(chrome.windows, chrome.windows.update);
var remove         = dechromeify(chrome.windows, chrome.windows.remove);

export { create, get, getAll, getLastFocused, update, remove };