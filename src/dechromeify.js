/**
 * Convert an async callback-style function into one that returns a Promise
 */
export function dechromeify(source, name) {
  return function promisified() {
    let args = Array.prototype.slice.call(arguments);
    return new Promise((resolve, reject) => {
      // Add callback as last argument
      args.push(response => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(response);
        }
      });
      source[name].apply(source, args);
    });
  };
}

/**
 * Dechromeify whole objects
 */
export function dechromeifyAll(source, sync = []) {
  let result = Object.create(null);

  Object.keys(source).forEach(name => {
    // Function
    if (typeof source[name] === 'function') {
      let convertFunction = (sync.indexOf(name) > -1 ? alias : dechromeify);
      result[name] = convertFunction(source, name);
      return;
    }

    // Event
    if (source[name] instanceof chrome.Event) {
      result[name] = alias(source[name], 'addListener');
      return;
    }

    // Anything else
    result[name] = source[name];
  });

  return result;
}

/**
 * Rename a sync function (closures are faster than .bind)
 */
export function alias(source, name) {
  return function aliased() {
    return source[name].apply(source, arguments);
  };
}