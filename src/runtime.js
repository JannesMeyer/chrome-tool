import './object-assign';
import dechromeify from './dechromeify';

var messageHandlers = new Map();

var _sendMessage = dechromeify(chrome.runtime, 'sendMessage', { responseErrors: true });
export var getExtensionInfo = dechromeify(chrome.management, 'getSelf');
export var getURL = chrome.runtime.getURL.bind(chrome.runtime);

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