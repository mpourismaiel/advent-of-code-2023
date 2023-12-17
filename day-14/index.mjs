import { rotate2DArrayClockwise } from "../utils/array.mjs";

export default function* ({ input1, input2 }) {
  const data = input1.split("\n").map((line) => line.split(""));

  const rollNorth = (data) => {
    let total = 0;
    for (let y = 0; y < data.length; y++) {
      for (let x = 0; x < data[y].length; x++) {
        const char = data[y][x];
        if (char !== "O") {
          continue;
        } else if (y - 1 < 0 || data[y - 1][x] !== ".") {
          total += data.length - y;
          continue;
        }

        let up = y - 1;
        while (up >= 0 && data[up][x] === ".") {
          up--;
        }

        data[up + 1][x] = "O";
        total += data.length - (up + 1);
        data[y][x] = ".";
      }
    }

    return total;
  };

  const result1 = rollNorth(data);
  yield result1;

  let grid = input2.split("\n").map((line) => line.split(""));
  const rotate = () => {
    grid = rotate2DArrayClockwise(grid);
    return grid;
  };

  const totalCycles = 1000000000;
  const memory = {};
  const revMemory = {};
  let i = 0;
  let key;
  while (i < totalCycles) {
    rollNorth(grid);
    rollNorth(rotate());
    rollNorth(rotate());
    rollNorth(rotate());
    rotate();

    key = JSON.stringify(grid);
    if (memory[key]) {
      break;
    }

    memory[key] = i;
    revMemory[i] = key;
    i++;
  }

  grid = JSON.parse(
    revMemory[
      memory[key] + ((totalCycles - memory[key] - 1) % (i - memory[key]))
    ]
  );

  let result2 = 0;
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "O") {
        result2 += grid.length - y;
      }
    }
  }

  yield result2;
}
