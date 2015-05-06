/*
 * Documentation:
 * https://developer.chrome.com/extensions/windows#toc
 */

import { dechromeifyAll } from './dechromeify';
import * as Tabs from './tabs';

var Windows = dechromeifyAll(chrome.windows, [], exports);

/**
 * Opens all windows/tabs that are passed into this function.
 * Re-uses the current window for the first window and just opens
 * new tabs in it if it only has one tab.
 *
 * @param windows: 2-dimensional array of windows and URLs
 */
export function open(windows, reuseThreshold = 1) {
  getLastFocused({ populate: true }).then(wnd => {
    // New tabs to create in the CURRENT window
    var newTabs = (wnd.tabs.length <= reuseThreshold) ? windows.shift() : [];

    // Open new windows
    windows.forEach(urls => {
      Windows.create({ url: urls, focused: false });
    });

    // Restore focus and open new tabs
    if (newTabs.length > 0) {
      Windows.update(wnd.id, { focused: true });
    }
    newTabs.forEach(url => {
      Tabs.create({ windowId: wnd.id, url, active: false });
    });
  });
}