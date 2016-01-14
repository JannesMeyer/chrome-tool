/**
 * Convert an async Chrome function into one that returns a Promise
 */
export default function dechromeify(obj, key) {
  return function dechromeified() {
    var deferred = Promise.defer();

    // Add callback as last argument
    Array.prototype.push.call(arguments, function callback() {
      if (chrome.runtime.lastError) {
        deferred.reject(chrome.runtime.lastError);
      } else {
        deferred.resolve(arguments[0]);
      }
    });

    // Execute function
    obj[key].apply(obj, arguments);

    return deferred.promise;
  };
}

/**
 * Dechromeify whole objects
 * Doesn't overwrite properties in the target object
 */
export function dechromeifyAll(obj, sync = [], target = {}) {
  Object.keys(obj).forEach(key => {
    // Don't overwrite
    if (target.hasOwnProperty(key)) {
      return;
    }
    // Convert functions/events
    let prop = obj[key];
    if (typeof prop === 'function') {
      // Check for excluded from chromeification
      if (sync.indexOf(key) !== -1) {
        target[key] = function() {
          return obj[key].apply(obj, arguments);
        }
      } else {
        target[key] = dechromeify(obj, key);
      }
    } else if (prop instanceof chrome.Event) {
      target[key] = obj[key].addListener.bind(obj[key]);
    }
  });
  return target;
}