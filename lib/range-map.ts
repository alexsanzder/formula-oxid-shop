// eslint-disable-next-line no-unused-vars
const rangeMap = (n: number, fn: (i: number) => any) => {
  const arr = [];
  while (n > arr.length) {
    arr.push(fn(arr.length));
  }
  return arr;
};
export default rangeMap;
