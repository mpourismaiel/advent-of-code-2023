const { memoize } = require("../utils/function");
const { reduceSum } = require("../utils/array");

const isDamaged = memoize((springs, sizes, groupLength = 0) => {
  if (springs.length === 0) {
    return sizes.length === 0 && groupLength === 0;
  }

  let count = 0;
  const [currentSpring, restSprings] = [springs[0], springs.slice(1)];
  const [currentSize, restSizes] = [sizes[0], sizes.slice(1)];
  const branches = currentSpring === "?" ? [".", "#"] : [currentSpring];
  for (const char of branches) {
    if (char === "#") {
      count += isDamaged(restSprings, sizes, groupLength + 1);
    } else {
      if (groupLength > 0 && sizes.length && currentSize === groupLength) {
        count += isDamaged(restSprings, restSizes);
      } else if (groupLength === 0) {
        count += isDamaged(restSprings, sizes);
      }
    }
  }

  return count;
});

module.exports = function* ({ input1, input2 }) {
  const result1 = input1
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .map(([springs, sizes]) =>
      isDamaged(springs + ".", sizes.split(",").map(Number))
    );

  yield result1.reduce(reduceSum);

  const result2 = input2
    .trim()
    .split("\n")
    .map((line) => line.split(" "))
    .map(([springs, sizes]) => {
      const unfoldedSprings = Array(5).fill(springs).join("?") + ".";
      const unfoldedSizes = Array(5)
        .fill(sizes)
        .join(",")
        .split(",")
        .map(Number);
      return isDamaged(unfoldedSprings, unfoldedSizes);
    });

  yield result2.reduce(reduceSum);
};
