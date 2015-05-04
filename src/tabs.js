import { dechromeifyAll } from './dechromeify';
import * as Windows from './windows';

export var {
	captureVisibleTab,
	connect,
	create,
	detectLanguage,
	duplicate,
	executeScript,
	get,
	getAllInWindow,
	getCurrent,
	getSelected,
	getZoom,
	getZoomSettings,
	highlight,
	insertCSS,
	move,
	query,
	reload,
	remove,
	sendMessage,
	sendRequest,
	setZoom,
	setZoomSettings,
	update
} = dechromeifyAll(chrome.tabs);

var isOpera = (navigator.vendor.indexOf('Opera') !== -1);

/**
 * Gets all highlighted tabs in the last focused window.
 * This function is guaranteed to at least return the active
 * tab of that window.
 */
export function getHighlighted() {
	// TODO: file a bug report about this
	// Opera doesn't have highlighted tabs, so we have to customize the query
	if (isOpera) {
		return query({ lastFocusedWindow: true, active: true });
	} else {
		return query({ lastFocusedWindow: true, highlighted: true });
	}
}

/**
 * Gets active tab in the last focused window.
 */
export function getActive() {
	return query({ lastFocusedWindow: true, active: true }).then(results => results[0]);
}

/**
 * Show a URL by either opening it in a new tab or by
 * navigating to it in another tab if it contains the NTP.
 */
export function open(openerTab, url) {
	// if (openerTab.url === 'chrome://newtab/' && !openerTab.incognito) {
	//  return Promise.all([ create({ url }), remove(openerTab.id) ]);
	// }
	return create({ url, openerTabId: openerTab.id });
}

/**
 * Return the number of tabs that are open
 */
export function count() {
	return query({ windowType: 'normal' }).then(tabs => tabs.length);
}

/**
 * Move all highlighted tabs in a window to the left or to the right
 */
export function moveHighlighted(direction) {
	Windows.getLastFocused({ populate: true }).then(wnd => {
		var numTabs = wnd.tabs.length;

		for (var tab of (direction > 0) ? backwards(wnd.tabs) : wnd.tabs) {
			// Opera doesn't have highlighted tabs, so we also check for .active
			if (!tab.highlighted && !tab.active) {
				continue;
			}

			// TODO: make this more efficient with many tabs
			var newIndex = tab.index;
			do {
				// Moving pinned tabs into non-pinned tabs (and vice-versa) is impossible,
				// so we have to skip those indexes
				newIndex = (newIndex + direction + numTabs) % numTabs;
			} while (tab.pinned !== wnd.tabs[newIndex].pinned);

			move(tab.id, { index: newIndex });
		}
	});
}

/**
 * Generator: Iterate backwards over an array
 */
// function* backwards(arr) {
// 	for (var i = arr.length - 1; i >= 0; --i) {
// 		yield arr[i];
// 	}
// }

/**
 * Create new window
 */
export function moveToNewWindow(tabs, incognito) {
	var tabIds = tabs.map(tab => tab.id);
	var activeTab = tabs.find(tab => tab.active);

	setTimeout(function() {
		// Use the first tab, so that we don't get a NTP
		Windows.create({ tabId: tabIds.shift(), focused: true, incognito }).then(wnd => {
			if (tabIds.length > 0) {
				move(tabIds, { windowId: wnd.id, index: -1 }).then(() => {
					update(activeTab.id, { active: true });
				});
			}
		});
	}, 0);
}

/**
 * Move tabs to a target window
 */
export function moveToWindow(tabs, targetWindowId) {
	var tabIds = tabs.map(tab => tab.id);
	var activeTab = tabs.find(tab => tab.active);

	Windows.update(targetWindowId, { focused: true });
	move(tabIds, { windowId: targetWindowId, index: -1 }).then(() => {
		update(activeTab.id, { active: true });
	});
}

/**
 * Close all tabs except the current tab
 */
export function closeOthers() {
	Promise.all([
		getCurrent(),
		Windows.getAll({ populate: true })
	]).then((sourceTab, windows) => {
		// Identify the window that hosts the sourceTab
		var sourceWindow;
		for (var wnd of windows) {
			if (wnd.id === sourceTab.windowId) {
				sourceWindow = wnd;
			} else {
				// Close other windows
				Windows.remove(wnd.id);
			}
		}
		// Close other tabs
		var tabIds = sourceWindow.tabs.map(t => t.id).filter(id => id !== sourceTab.id);
		remove(tabIds);
	});
}