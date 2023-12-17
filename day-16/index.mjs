const directions = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };

export default function* ({ input1, input2 }) {
  const grid = input1.split("\n").map((line) => line.split(""));
  let energized = {};
  const walk = (x, y, direction) => {
    if (
      (energized[`${x},${y}`] && energized[`${x},${y}`].includes(direction)) ||
      x < 0 ||
      y < 0 ||
      y >= grid.length ||
      x >= grid[y].length
    ) {
      return;
    }

    energized[`${x},${y}`] = energized[`${x},${y}`]
      ? [...energized[`${x},${y}`], direction]
      : [direction];

    if (grid[y][x] === "-") {
      if (direction === "left" || direction === "right") {
        walk(x + directions[direction][0], y, direction);
      } else {
        walk(x + directions["left"][0], y, "left");
        walk(x + directions["right"][0], y, "right");
      }
    } else if (grid[y][x] === "|") {
      if (direction === "up" || direction === "down") {
        walk(x, y + directions[direction][1], direction);
      } else {
        walk(x, y + directions["up"][1], "up");
        walk(x, y + directions["down"][1], "down");
      }
    } else if (grid[y][x] === "/") {
      if (direction === "left") {
        walk(x, y + directions["down"][1], "down");
      } else if (direction === "right") {
        walk(x, y + directions["up"][1], "up");
      } else if (direction === "up") {
        walk(x + directions["right"][0], y, "right");
      } else if (direction === "down") {
        walk(x + directions["left"][0], y, "left");
      }
    } else if (grid[y][x] === "\\") {
      if (direction === "left") {
        walk(x, y + directions["up"][1], "up");
      } else if (direction === "right") {
        walk(x, y + directions["down"][1], "down");
      } else if (direction === "up") {
        walk(x + directions["left"][0], y, "left");
      } else if (direction === "down") {
        walk(x + directions["right"][0], y, "right");
      }
    } else {
      walk(
        x + directions[direction][0],
        y + directions[direction][1],
        direction
      );
    }
  };
  walk(0, 0, "right");
  const result1 = Object.keys(energized).length;
  yield result1;

  const result2 = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (x === 0) {
        energized = [];
        walk(x, y, "right");
        result2.push(Object.keys(energized).length);
      }
      if (y === 0) {
        energized = [];
        walk(x, y, "down");
        result2.push(Object.keys(energized).length);
      }
      if (x === grid[y].length - 1) {
        energized = [];
        walk(x, y, "left");
        result2.push(Object.keys(energized).length);
      }
      if (y === grid.length - 1) {
        energized = [];
        walk(x, y, "up");
        result2.push(Object.keys(energized).length);
      }
    }
  }

  yield Math.max(...result2);
}
