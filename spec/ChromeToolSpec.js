'use strict';

describe('chrome-tool', () => {

  var chrometool;
  var loadTime;

  beforeAll(() => {
    let startTime = new Date().getTime();
    chrometool = require('..');
    loadTime = new Date().getTime() - startTime;
  });

  it('loads in less than 20ms', () => {
    expect(loadTime).toBeLessThan(20);
  });

});