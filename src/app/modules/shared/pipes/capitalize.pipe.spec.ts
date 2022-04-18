import { Capitalize } from './capitalize.pipe';

describe('Capitalize Pipe', () => {
	it('should transform each word of text to uppercase', () => {
		const pipe = new Capitalize();
		expect(pipe.transform('this IS soME teXT')).toEqual(
			'This Is Some Text'
		);
	});
});
