import './object-assign';
import dechromeify from './dechromeify';
import alias from './alias';

var messageHandlers = new Map();
var commandHandlers = new Map();

var sendMessage = dechromeify(chrome.runtime, chrome.runtime.sendMessage, { responseErrors: true });

// Runtime
exports.getURL = alias(chrome.runtime, chrome.runtime.getURL);

// Management
exports.getExtensionInfo = dechromeify(chrome.management, chrome.management.getSelf);

// i18n
exports.getString = function(name, substitution) {
	if (substitution !== undefined) {
		if (typeof substitution === 'number' && substitution > 1) {
			return chrome.i18n.getMessage(name + 's', [ substitution ]);
		}
		return chrome.i18n.getMessage(name, [ substitution ]);
	}
	return chrome.i18n.getMessage(name);
};

// Message passing
exports.sendMessage = function(operation, message) {
	return sendMessage(Object.assign({ _chrome_operation: operation }, message));
}
exports.onMessage = function(operation, handler) {
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
};

// User interface
exports.onBrowserAction = function(handler) {
	chrome.browserAction.onClicked.addListener(handler);
};
exports.onCommand = function(command, handler) {
	if (commandHandlers.size === 0) {
		chrome.commands.onCommand.addListener(command => {
			if (commandHandlers.has(command)) {
				commandHandlers.get(command)();
			}
		});
	}
	commandHandlers.set(command, handler);
};