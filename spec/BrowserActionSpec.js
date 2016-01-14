global.chrome = {
  browserAction: {
    getTitle() {}
  }
};

var BrowserAction = require('../browser-action');

describe('BrowserAction', () => {

  beforeEach(() => {
    spyOn(chrome.browserAction, 'getTitle');
  });

  it('calls through correctly', () => {
    BrowserAction.getTitle('foo');
    expect(chrome.browserAction.getTitle).toHaveBeenCalledWith('foo', jasmine.any(Function));
  });

});