import { dechromeifyAll } from './dechromeify';
import * as Windows from './windows';

var Tabs = dechromeifyAll(chrome.tabs, [ 'connect' ], exports);

var isOpera = (navigator.vendor.indexOf('Opera') !== -1);

/**
 * Gets all highlighted tabs in the last focused window.
 * This function is guaranteed to at least return the active
 * tab of that window.
 */
export function getHighlighted() {
  // Opera doesn't have highlighted tabs, so we have to customize the query
  if (isOpera) {
    return Tabs.query({ lastFocusedWindow: true, active: true });
  } else {
    return Tabs.query({ lastFocusedWindow: true, highlighted: true });
  }
}

/**
 * Gets active tab in the last focused window.
 */
export function getActive() {
  return Tabs.query({ lastFocusedWindow: true, active: true }).then(results => results[0]);
}

/**
 * Show a URL by either opening it in a new tab or by
 * navigating to it in another tab if it contains the NTP.
 */
export function open(openerTab, url) {
  // if (openerTab.url === 'chrome://newtab/' && !openerTab.incognito) {
  //  return Promise.all([ create({ url }), remove(openerTab.id) ]);
  // }
  return Tabs.create({ url, openerTabId: openerTab.id });
}

/**
 * Return the number of tabs that are open
 */
export function count() {
  return Tabs.query({ windowType: 'normal' }).then(tabs => tabs.length);
}

/**
 * Move all highlighted tabs in a window to the left or to the right
 */
export function moveHighlighted(direction) {
  if (direction === 0) {
    throw new TypeError("The direction parameter can't be zero");
  }
  Windows.getLastFocused({ populate: true }).then(wnd => {
    // Opera reports all tabs as not highlighted, even the active one
    var highlighted = wnd.tabs.filter(t => t.highlighted || t.active);
    var tabs = wnd.tabs;

    // Change the iteration behaviour to backwards
    if (direction > 0) {
      highlighted[Symbol.iterator] = backwardsIterator;
    }

    // Iterate through all highlighted tabs
    for (var tab of highlighted) {
      var index = tab.index;
      do {
        index = (tabs.length + index + direction) % tabs.length;
      } while (tab.pinned !== tabs[index].pinned);
      Tabs.move(tab.id, { index });
    }
  });
}

/**
 * Iterates backwards over an array.
 * Does not handle sparse arrays in a special way, just like
 * the original iterator.
 */
function backwardsIterator() {
  var array = this;
  var i = array.length;
  return {
    next() {
      var value = array[--i];
      return i < 0 ? { done: true } : { value };
    }
  };
}

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
        Tabs.move(tabIds, { windowId: wnd.id, index: -1 }).then(() => {
          Tabs.update(activeTab.id, { active: true });
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
  Tabs.move(tabIds, { windowId: targetWindowId, index: -1 }).then(() => {
    Tabs.update(activeTab.id, { active: true });
  });
}

/**
 * Close all tabs except the current tab
 */
export function closeOthers() {
  Promise.all([
    Tabs.getCurrent(),
    Windows.getAll({ populate: true })
  ]).then(([sourceTab, windows]) => {
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
    Tabs.remove(tabIds);
  });
}