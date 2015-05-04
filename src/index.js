import './object-assign';
import dechromeify from './dechromeify';

var messageHandlers = new Map();
var commandHandlers = new Map();

var _sendMessage     = dechromeify(chrome.runtime, chrome.runtime.sendMessage, { responseErrors: true });
var getExtensionInfo = dechromeify(chrome.management, chrome.management.getSelf);
var getURL           = chrome.runtime.getURL.bind(chrome.runtime);
var onBrowserAction  = chrome.browserAction.onClicked.addListener.bind(chrome.browserAction.onClicked);

export { getExtensionInfo, getURL, onBrowserAction };

/**
 * Send a message to another part of the extension
 */
export function sendMessage(operation, message) {
	return _sendMessage(Object.assign({ _chrome_operation: operation }, message));
}

/**
 * Add a message handler
 */
export function onMessage(operation, handler) {
	if (messageHandlers.size === 0) {
		chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
			var operation = message._chrome_operation;
			if (messageHandlers.has(operation)) {
				delete message._chrome_operation;
				messageHandlers.get(operation)(message, sender, sendResponse);
			}
		});
	}
	messageHandlers.set(operation, handler);
}

/**
 * Add a command handler
 */
export function onCommand(command, handler) {
	if (commandHandlers.size === 0) {
		chrome.commands.onCommand.addListener(command => {
			if (commandHandlers.has(command)) {
				commandHandlers.get(command)();
			}
		});
	}
	commandHandlers.set(command, handler);
}

/**
 * Returns a translated string
 */
export function getString(name, substitution) {
	if (substitution !== undefined) {
		if (typeof substitution === 'number' && substitution > 1) {
			return chrome.i18n.getMessage(name + 's', [ substitution ]);
		}
		return chrome.i18n.getMessage(name, [ substitution ]);
	}
	return chrome.i18n.getMessage(name);
}