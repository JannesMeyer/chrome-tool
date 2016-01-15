'use strict';

describe('BrowserAction', () => {

  var BrowserAction;

  beforeAll(() => {
    // Mock chrome API
    global.chrome = {
      runtime: {},
      browserAction: {
        getTitle(detail, callback) {
          callback(detail);
        },
        setBadgeText() {},
      }
    };
    spyOn(chrome.browserAction, 'getTitle').and.callThrough();
    spyOn(chrome.browserAction, 'setBadgeText');

    // Init chrome-tool on top
    BrowserAction = require('../browser-action').default;
  });

  it('calls through to sync functions', () => {
    BrowserAction.setBadgeText({ text: 'test' });
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'test' });
  });

  it('calls through to async functions', (done) => {
    BrowserAction.getTitle('foo').then(detail => {
      expect(detail).toBe('foo');
      done();
    });
  });

});