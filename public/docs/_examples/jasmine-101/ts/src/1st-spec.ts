// #docregion
describe('1st tests', () => {

  // #docregion 1st-test
  it('true is true', () => expect(true).toEqual(true));
  // #enddocregion

  it('null is not the same thing as undefined',
    () => expect(null).not.toEqual(undefined));

});
