'use strict';

// Note: This has to be the first spec file being executed
describe('chrome-tool', () => {

  var chrometool;
  var loadTime;

  beforeAll(() => {
    let startTime = new Date().getTime();
    chrometool = require('..');
    loadTime = new Date().getTime() - startTime;
  });

  it('loads in less than 20ms', () => {
    expect(loadTime).not.toBe(0);
    expect(loadTime).toBeLessThan(20);
  });

});