// MEMOIZATION
// - What: technique giúp tăng performance bằng cách tái sử dụng KQ trước đó.
// - When: tính toán, xử lý phức tạp, tốn thời gian, sử dụng nhiều.
// - Why: optimize performance
// - How:
// Cache

const memoizedSum = () => {
  const cache = {};

  return (n) => {
    if (n <= 0) return -1;

    // return results from cache first
    const key = `${n}_sum`;
    if (cache[key]) {
      console.log('Use result from cache', cache[key]);
      return cache[key];
    }

    // calculate and save to cache
    const result = (n * (n + 1)) / 2;
    cache[key] = result;
    console.log('Calculating result: ', result);
    return result;
  };
};

const magicSum = memoizedSum();
magicSum(100);
magicSum(105);
magicSum(100);
magicSum(105);
magicSum(105);

console.log('\n\nMAGIC SUM 2');
const magicSum2 = memoizedSum();
magicSum2(100);
magicSum2(105);
