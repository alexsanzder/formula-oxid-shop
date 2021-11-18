import rangeMap from '@lib/range-map';

describe('rangeMap', () => {
  it('should return array of 5 elements', () => {
    expect(rangeMap(5, (i) => i)).toHaveLength(5);
  });
});
