import { slice2DArray, reduceSum } from "../utils/array.mjs";

export default function* ({ input1, input2 }) {
  const solve = (universe, ageDifference) => {
    const galaxies = [];
    const emptyRows = [];
    const emptyCols = [];

    for (let y = 0; y < universe.length; y++) {
      if (!universe[y].includes("#")) {
        emptyRows.push(y);
      }
      for (let x = 0; x < universe[y].length; x++) {
        if (y === 0) {
          if (
            !slice2DArray(universe, x, y, x, universe.length - 1)
              .flat()
              .includes("#")
          ) {
            emptyCols.push(x);
          }
        }

        if (universe[y][x] === "#") {
          galaxies.push([x, y]);
        }
      }
    }

    const adjustedDifference = ageDifference - 1;
    let manhattan = [];
    for (let i = 0; i < galaxies.length; i++) {
      let [x, y] = galaxies[i];
      const emptyRowsBeforeY = emptyRows.filter((row) => row < y);
      const emptyColsBeforeX = emptyCols.filter((col) => col < x);
      x = x + emptyColsBeforeX.length * adjustedDifference;
      y = y + emptyRowsBeforeY.length * adjustedDifference;

      for (let j = i + 1; j < galaxies.length; j++) {
        let [x2, y2] = galaxies[j];
        const emptyRowsBeforeY2 = emptyRows.filter((row) => row < y2);
        const emptyColsBeforeX2 = emptyCols.filter((col) => col < x2);
        x2 = x2 + emptyColsBeforeX2.length * adjustedDifference;
        y2 = y2 + emptyRowsBeforeY2.length * adjustedDifference;

        manhattan.push(Math.abs(x - x2) + Math.abs(y - y2));
      }
    }

    return manhattan.reduce(reduceSum);
  };

  const result1 = solve(
    input1.split("\n").map((line) => line.split("")),
    2
  );

  yield result1;
  const result2 = solve(
    input2.split("\n").map((line) => line.split("")),
    1000000
  );
  yield result2;
}
