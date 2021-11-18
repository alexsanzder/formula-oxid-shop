import toPixels from '@lib/to-pixels';

describe('toPixels', () => {
  it('should return a string whit px value', () => {
    expect(toPixels(5)).toBe('5px');
    expect(toPixels('5px')).toBe('5px');
  });
});
