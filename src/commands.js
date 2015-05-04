var commandHandlers = new Map();

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