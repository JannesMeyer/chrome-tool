/**
 * Convert an async Chrome function into one that returns a Promise
 */
export function dechromeify(source, name) {
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
    source[name].apply(source, arguments);

    return deferred.promise;
  };
}

export function alias(source, name) {
  return function aliased() {
    return source[name].apply(source, arguments);
  };
}

/**
 * Dechromeify whole objects
 */
export function dechromeifyAll(source, sync = []) {
  let result = Object.create(null);
  Object.keys(source).forEach(name => {
    if (typeof source[name] === 'function') {
      let convertFunction = (sync.indexOf(name) > -1 ? alias : dechromeify);
      result[name] = convertFunction(source, name);
    } else if (source[name] instanceof chrome.Event) {
      result[name] = alias(source[name], 'addListener');
    } else {
      result[name] = source[name];
    }
  });
  return result;
}