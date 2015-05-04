import * as Runtime from './runtime';
import * as Windows from './windows';

/**
 * Opens a popup. At the moment only one at a time is supported.
 */
export default class Popup {

	constructor({ url, params, width, height, parent }) {
		this.deferred = Promise.defer();
		this.options = {
			type: 'popup',
			url: Runtime.getURL(url),
			left: Math.round(parent.left + (parent.width - width) / 2),
			top: Math.round(parent.top + (parent.height - height) / 3),
			width,
			height
		}
		if (params) {
			this.options.url += params;
		}

		// Register/overwrite return handler
		Runtime.onMessage('popup_close', msg => {
			console.log('Popup return value:', msg);
			this.deferred.resolve(msg);
		});
	}

	show() {
		Windows.create(this.options);
		return this.deferred.promise;
	}

}