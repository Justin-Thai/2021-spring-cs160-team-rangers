import { sum } from '../utils';

describe('Test sum function', () => {
	it('should test that 1 + 2 = 3', () => {
		expect(sum(1, 2)).toBe(3);
	});
});
