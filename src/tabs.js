import dechromeify from './dechromeify';

// TODO: automatically do the whole chrome.tabs
var create     = dechromeify(chrome.tabs, chrome.tabs.create);
var get        = dechromeify(chrome.tabs, chrome.tabs.get);
var getCurrent = dechromeify(chrome.tabs, chrome.tabs.getCurrent);
var move       = dechromeify(chrome.tabs, chrome.tabs.move);
var query      = dechromeify(chrome.tabs, chrome.tabs.query);
var remove     = dechromeify(chrome.tabs, chrome.tabs.remove);
var update     = dechromeify(chrome.tabs, chrome.tabs.update);
var duplicate  = dechromeify(chrome.tabs, chrome.tabs.duplicate);
export { create, get, getCurrent, move, query, remove, update, duplicate };

/**
 * Generator: Iterate backwards over an array
 */
function* backwards(arr) {
  for (var i = arr.length - 1; i >= 0; --i) {
    yield arr[i];
  }
}

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
export function show(openerTab, url) {
	// if (openerTab.url === 'chrome://newtab/' && !openerTab.incognito) {
	// 	return Promise.all([ Chrome.createTab({ url }), Chrome.removeTabs(openerTab.id) ]);
	// }
	return Chrome.createTab({ url, openerTabId: openerTab.id });
}

/**
 * Return the number of tabs that are open
 */
export function count() {
	return Chrome.queryTabs({ windowType: 'normal' }).then(tabs => tabs.length);
}










/**
 * Move all highlighted tabs in a window to the left or to the right
 */
export function moveHighlighted(direction) {
	Chrome.getLastFocusedWindow({ populate: true }).then(wnd => {
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

			Chrome.moveTabs(tab.id, { index: newIndex });
		}
	});
}

/**
 * Move tabs from a source to a target window.
 * If targetWindowId is undefined, create new window.
 */
export function moveToWindow(tabs, targetWindowId, incognito) {
	var tabIds = tabs.map(tab => tab.id);
	var activeTab = tabs.find(tab => tab.active);

	if (targetWindowId === undefined) {
		// Create a new window
		setTimeout(function() {
			// Use the first tab, so that we don't get a NTP
			Chrome.createWindow({ tabId: tabIds.shift(), focused: true, incognito }).then(wnd => {
				if (tabIds.length > 0) {
					Chrome.moveTabs(tabIds, { windowId: wnd.id, index: -1 }).then(() => {
						Chrome.updateTab(activeTab.id, { active: true });
					});
				}
			});
		}, 0);
	} else {
		// Use existing window
		Chrome.updateWindow(targetWindowId, { focused: true });
		Chrome.moveTabs(tabIds, { windowId: targetWindowId, index: -1 }).then(() => {
			Chrome.updateTab(activeTab.id, { active: true });
		});
	}
}