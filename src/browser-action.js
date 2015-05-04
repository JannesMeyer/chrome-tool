export var addListener = chrome.browserAction.onClicked.addListener.bind(chrome.browserAction.onClicked);

// TODO: is this sync or async?
export var setIcon = chrome.browserAction.setIcon.bind(chrome.browserAction);