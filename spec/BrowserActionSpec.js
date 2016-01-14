'use strict';

global.chrome = {
  browserAction: {
    getTitle() {},
    setBadgeText() {},
  }
};

var BrowserAction = require('../browser-action').default;

describe('BrowserAction', () => {

  beforeEach(() => {
    spyOn(chrome.browserAction, 'getTitle');
    spyOn(chrome.browserAction, 'setBadgeText');
  });

  it('calls through to async functions', () => {
    BrowserAction.getTitle('foo').then(() => {
      expect(chrome.browserAction.getTitle).toHaveBeenCalledWith('foo', jasmine.any(Function));
    });
  });

  it('calls through to sync functions', () => {
    BrowserAction.setBadgeText({ text: 'test' });
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'test' });
  });

  it('returns promises that resolve', () => {
    BrowserAction.setBadgeText({ text: 'test' });
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'test' });
  });

});