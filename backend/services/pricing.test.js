const pricing = require('./pricing');

test('check if readCsv() returns an array', () => {
  expect(typeof(pricing.readCsv())).toBe([]);
});