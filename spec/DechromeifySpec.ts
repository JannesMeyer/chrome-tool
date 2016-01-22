describe('Dechromeify', () => {

  var BrowserAction;

  beforeAll(() => {
    // Spy on the API before promisifying it
    spyOn(chrome.browserAction, 'getTitle').and.callThrough();
    spyOn(chrome.browserAction, 'setBadgeText');
    BrowserAction = require('..').BrowserAction;
  });

  it('does not touch types', () => {
    expect(BrowserAction.ColorArray).toBe(chrome.browserAction.ColorArray);
  });

  it('calls through to sync functions', () => {
    BrowserAction.setBadgeText({ text: 'foo' });
    expect(chrome.browserAction.setBadgeText).toHaveBeenCalledWith({ text: 'foo' });
  });

  it('calls through to async functions', (done) => {
    BrowserAction.getTitle('foo').then(detail => {
      expect(detail).toBe('foo');
      expect(chrome.browserAction.getTitle).toHaveBeenCalledWith('foo', jasmine.any(Function));
      done();
    });
  });

});