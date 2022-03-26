import { Capitalize } from './capitalize.pipe';
describe('Capitalize pipe', () => {
  it('Should transform the each word of text to uppercase', () => {
    let pipe = new Capitalize();
    expect(pipe.transform('this IS soME teXT')).toEqual('This Is Some Text');
  });
});
