/**
 * Convert an async Chrome function into one that returns a Promise
 */
export default function dechromeify(myThis, fn, opts = {}) {
	return (...myArgs) => {
		return new Promise(function(resolve, reject) {
			// Callback for Chrome
			myArgs.push(function(one) {
				if (chrome.runtime.lastError) {
					// Chrome API error
					reject.call(this, chrome.runtime.lastError);
				} else if (opts.responseErrors && one !== undefined && one.error !== undefined) {
					// Call value error
					reject.call(this, one.error);
				} else {
					resolve.apply(this, arguments);
				}
			});

			// Execute Chrome function
			fn.apply(myThis, myArgs);
		});
	};
}