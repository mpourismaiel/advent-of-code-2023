const {
  isSame,
  isIn2DArrayRange,
  get2DArrayCorner,
} = require("../utils/array");
const { PriorityQueue } = require("../utils/queue");

const neighbors = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

module.exports = function* ({ input1, input2 }) {
  const grid = input1.split("\n").map((row) => row.split("").map(Number));
  let result1 = 0;

  const visited = new Set();
  const queue = new PriorityQueue((a, b) => a[0] - b[0]);
  queue.push([0, ...get2DArrayCorner(grid, "topLeft"), 0, 0, 0]);
  while (queue.length) {
    const [heatLoss, x, y, dx, dy, steps] = queue.pop();

    if (x === grid[0].length - 1 && y === grid.length - 1) {
      result1 = heatLoss;
      break;
    }

    const key = [x, y, dx, dy, steps].join(",");
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    if (steps < 3 && !isSame([dx, dy], [0, 0])) {
      const x1 = x + dx;
      const y1 = y + dy;
      if (isIn2DArrayRange(grid, x1, y1)) {
        queue.push([heatLoss + grid[y1][x1], x1, y1, dx, dy, steps + 1]);
      }
    }

    for (const [dx1, dy1] of neighbors) {
      if (isSame([dx, dy], [dx1, dy1]) || isSame([-dx, -dy], [dx1, dy1])) {
        continue;
      }

      const x1 = x + dx1;
      const y1 = y + dy1;
      if (isIn2DArrayRange(grid, x1, y1)) {
        queue.push([heatLoss + grid[y1][x1], x1, y1, dx1, dy1, 1]);
      }
    }
  }
  yield result1;

  let result2 = 0;

  const visited2 = new Set();
  const queue2 = new PriorityQueue((a, b) => a[0] - b[0]);
  queue2.push([0, ...get2DArrayCorner(grid, "topLeft"), 0, 0, 0]);
  while (queue2.length) {
    const [heatLoss, x, y, dx, dy, steps] = queue2.pop();

    if (x === grid[0].length - 1 && y === grid.length - 1 && steps >= 4) {
      result2 = heatLoss;
      break;
    }

    const key = [x, y, dx, dy, steps].join(",");
    if (visited2.has(key)) {
      continue;
    }
    visited2.add(key);

    if (steps < 10 && !isSame([dx, dy], [0, 0])) {
      const x1 = x + dx;
      const y1 = y + dy;
      if (isIn2DArrayRange(grid, x1, y1)) {
        queue2.push([heatLoss + grid[y1][x1], x1, y1, dx, dy, steps + 1]);
      }
    }

    if (steps >= 4 || isSame([dx, dy], [0, 0])) {
      for (const [dx1, dy1] of neighbors) {
        if (isSame([dx, dy], [dx1, dy1]) || isSame([-dx, -dy], [dx1, dy1])) {
          continue;
        }

        const x1 = x + dx1;
        const y1 = y + dy1;
        if (isIn2DArrayRange(grid, x1, y1)) {
          queue2.push([heatLoss + grid[y1][x1], x1, y1, dx1, dy1, 1]);
        }
      }
    }
  }
  yield result2;
};
