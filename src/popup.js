import { getURL, onMessage } from './runtime';
import { create as createWindow } from './windows';

var popupResponse;

/**
 * Open a popup. There should only be one at a time.
 */
export function create({ url, params, width, height, parent }) {
	if (popupResponse) {
		console.warn("create: The previous popup wasn't closed properly");
	}
	popupResponse = Promise.defer();
	var left = Math.round(parent.left + (parent.width - width) / 2);
	var top = Math.round(parent.top + (parent.height - height) / 3);
	url = getURL(url);
	if (params) {
		url += params;
	}
	createWindow({ type: 'popup', url, width, height, left, top });
	return popupResponse.promise;
}

onMessage('popup_close', message => {
	if (!popupResponse) {
		console.warn("Popup returned twice");
		return;
	}
	popupResponse.resolve(message);
	popupResponse = null;
});