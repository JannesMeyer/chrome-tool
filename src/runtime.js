/*
 * Documentation:
 * https://developer.chrome.com/extensions/runtime#toc
 */

import assign from 'object.assign';
import { dechromeifyAll } from './dechromeify';

// Dynamic exports are not really allowed in ES6, but let's do it anyway
var Runtime = dechromeifyAll(chrome.runtime, [
  'getManifest',
  'getURL',
  'setUninstallURL',
  'reload',
  'restart',
  'connect',
  'connectNative'
], exports);

var listeners = new Map();

/**
 * Send a message to another part of the extension
 */
export function sendMessage(operation, message = {}) {
  message = assign(message, { _chrome_operation: operation });

  var deferred = Promise.defer();
  function callback() {
    var response = arguments[0]
    if (chrome.runtime.lastError) {
      deferred.reject(chrome.runtime.lastError);
    } else if (response && response.error) {
      deferred.reject(response);
    } else {
      deferred.resolve(response);
    }
  }

  // Send message and return...
  chrome.runtime.sendMessage(message, callback);
  return deferred.promise;
}

/**
 * Collective listener
 */
function globalHandler(message, sender, sendResponse) {
  var listener = listeners.get(message._chrome_operation);
  if (listener) {
    listener(message, sender, sendResponse);
  }
}

/**
 * Add a message listener. Only accepts one listener for each operation value.
 * To un-listen, just do this:
 *   onMessage('operation name', null)
 */
export function onMessage(operation, handler) {
  if (listeners.size === 0) {
    chrome.runtime.onMessage.addListener(globalHandler);
  }
  listeners.set(operation, handler);
}