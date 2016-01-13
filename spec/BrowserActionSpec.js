global.chrome = {
  browserAction: {
    getTitle() {}
  }
};
var BrowserAction = require('../browser-action');

describe('BrowserAction', () => {

  it('calls through correctly', () => {
    spyOn(chrome.browserAction, 'getTitle');
    BrowserAction.getTitle('foo');
    expect(chrome.browserAction.getTitle).toHaveBeenCalledWith('foo', jasmine.any(Function));
  });

});