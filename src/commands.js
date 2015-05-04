/*
 * Documentation:
 * https://developer.chrome.com/extensions/commands#toc
 */

var listeners = new Map();

/**
 * Collective listener
 */
function listener(cmd) {
	var listener = listeners.get(command);
	if (listener) {
		listener();
	}
}

/**
 * Add a command listener. Only accepts one listener for each command value.
 * To un-listen, just do this:
 *   onCommand('command name', null)
 */
export function onCommand(command, listener) {
	if (listeners.size === 0) {
		chrome.commands.onCommand.addListener(listener);
	}
	listeners.set(command, listener);
}