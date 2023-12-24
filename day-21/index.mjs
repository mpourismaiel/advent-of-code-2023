import { nthValueQuadratic } from "../utils/math.mjs";
import { assert } from "../utils/helpers.mjs";

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const generateMap = (input) => {
  const [steps, grid] = input.trim().split("\n\n");
  const lines = grid.split("\n");
  const sY = lines.findIndex((line) => line.includes("S"));
  const sX = lines[sY].indexOf("S");
  return [[sY, sX], parseInt(steps), lines.map((line) => line.split(""))];
};

const bfs = (start, maxSteps, map, getNeighbors) => {
  const queue = [];
  queue.push([0, start]);

  const visited = new Set();
  const parity = maxSteps % 2;
  let total = 0;
  while (queue.length) {
    const [steps, position] = queue.shift();
    if (steps > maxSteps) {
      break;
    }

    const key = position.join(",");
    if (visited.has(key)) {
      continue;
    }
    visited.add(key);

    if (steps % 2 === parity) {
      total += 1;
    }

    getNeighbors(map, position)
      .filter((position) => !visited.has(position.join(",")))
      .forEach((position) => {
        queue.push([steps + 1, position]);
      });
  }

  return total;
};

export default function* ({ input1, input2 }) {
  const result1 = bfs(...generateMap(input1), (map, [x, y]) =>
    directions
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([x, y]) => map[y]?.[x] !== "#")
  );

  yield result1;

  const [[sy, sx], steps, map] = generateMap(input2);
  const isStartRowEmpty = map[sy].every((v) => v !== "#");
  const isStartColEmpty = map.every((row) => row[sx] !== "#");
  assert(
    isStartRowEmpty && isStartColEmpty,
    true,
    "row and column containing start position should be empty"
  );

  const gridWidth = map[0].length;
  const gridHeight = map.length;
  assert(gridWidth, gridHeight, "grid is a square");

  const getNeighbors = (map, [x, y]) =>
    directions
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([x, y]) => {
        const ny = y % gridHeight;
        const nx = x % gridWidth;
        return (
          map[ny >= 0 ? ny : ny + gridHeight][nx >= 0 ? nx : nx + gridWidth] !==
          "#"
        );
      });

  const start = [sy, sx];
  const gridMod = steps % gridWidth;
  const u1 = bfs(start, gridMod, map, getNeighbors);
  const u2 = bfs(start, gridMod + gridWidth, map, getNeighbors);
  const u3 = bfs(start, gridMod + gridWidth * 2, map, getNeighbors);

  const result2 = nthValueQuadratic(u1, u2, u3, Math.ceil(steps / gridWidth));
  yield result2;
}

export const properties = { hasTest2: false };
