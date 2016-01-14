global.chrome = {
  browserAction: {
    getTitle() {},
    setBadgeText() {},
  }
};

var BrowserAction = require('../browser-action');

describe('BrowserAction', () => {

  beforeEach(() => {
    spyOn(chrome.browserAction, 'getTitle');
    spyOn(chrome.browserAction, 'setBadgeText');
  });

  it('calls through correctly', () => {
    BrowserAction.getTitle('foo');
    expect(chrome.browserAction.getTitle).toHaveBeenCalledWith('foo', jasmine.any(Function));
  });

  it('returns a promise', () => {
    let result = BrowserAction.setBadgeText('test');

    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith('test', jasmine.any(Function));
  });

});