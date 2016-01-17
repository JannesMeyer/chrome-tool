var listeners = new Map();

/**
 * Add a command listener.
 * To unlisten: `onCommand('name', null)`
 *
 * Note: Currently this only accepts one listener per name. A subsequent
 * call just overrides the previous listener.
 */
export function onCommand(name, listener) {
  if (listeners.size === 0) {
    chrome.commands.onCommand.addListener(globalListener);
  }
  listeners.set(name, listener);
}

function globalListener(name) {
  let listener = listeners.get(name);
  if (listener != null) {
    listener();
  }
}