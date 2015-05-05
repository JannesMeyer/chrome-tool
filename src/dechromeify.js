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
 */
export function dechromeifyAll(obj, sync) {
  var target = {};

  for (var key of Object.keys(obj)) {
    var prop = obj[key];
    if (typeof prop === 'function') {
      if (sync && sync.indexOf(key) !== -1) {
        target[key] = prop.bind(obj);
      } else {
        target[key] = dechromeify(obj, key);
      }
    } else if (prop instanceof chrome.Event) {
      target[key] = prop.addListener.bind(prop);
    }
  }

  return target;
}