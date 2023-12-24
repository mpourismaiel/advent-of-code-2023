export const lcm = (...arr) => {
  const gcd = (x, y) => (!y ? x : gcd(y, x % y));
  const _lcm = (x, y) => (x * y) / gcd(x, y);
  return [...arr].reduce((a, b) => _lcm(a, b));
};

export const nthValueQuadratic = (u1, u2, u3, n) => {
  let d1 = u2 - u1;
  let d2 = u3 - u2;
  let secondDifference = d2 - d1;
  return u1 + (n - 1) * d1 + ((n - 1) * (n - 2) * secondDifference) / 2;
};
