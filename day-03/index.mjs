import { slice2DArray } from "../utils/array.mjs";

export default function* ({ input1, input2 }) {
  const data = input1
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const sliceHasSymbol = (y, x1, x2) => {
    const y1 = y - 1 < 0 ? 0 : y - 1;
    const y2 = y + 1 > data.length - 1 ? data.length - 1 : y + 1;
    const x1_ = x1 - 1 < 0 ? 0 : x1 - 1;
    const x2_ = x2 + 1 > data[y].length - 1 ? data[y].length - 1 : x2 + 1;
    const slice = slice2DArray(data, x1_, y1, x2_, y2).flat().join("");
    return /[^0-9.]/.test(slice);
  };

  const result1 = data.reduce((acc, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (!line[x].match(/\d/)) {
        continue;
      }

      let number = line[x];
      let x2 = x;
      while (line[x2 + 1] && line[x2 + 1].match(/\d/)) {
        x2++;
        number += line[x2];
      }

      if (sliceHasSymbol(y, x, x2)) {
        acc += +number;
      }

      x = x2;
    }

    return acc;
  }, 0);

  yield result1;

  const numbersInSlice = (y, x1, x2) => {
    const y1 = y - 1 < 0 ? 0 : y - 1;
    const y2 = y + 1 > data.length - 1 ? data.length - 1 : y + 1;
    const x1_ = x1 - 1 < 0 ? 0 : x1 - 1;
    const x2_ = x2 + 1 > data[y].length - 1 ? data[y].length - 1 : x2 + 1;
    const slice = slice2DArray(data, x1_, y1, x2_, y2);
    if (!/\d/.test(slice.flat().join(""))) {
      return [];
    }

    const numbers = [];
    for (let y = 0; y < slice.length; y++) {
      for (let x = 0; x < slice[y].length; x++) {
        if (slice[y][x].match(/\d/)) {
          let originalX = x + x1_;
          const originalY = y + y1;
          while (
            data[originalY][originalX - 1] !== undefined &&
            data[originalY][originalX - 1].match(/\d/)
          ) {
            originalX--;
          }
          let number = "";
          while (
            data[originalY][originalX] !== undefined &&
            data[originalY][originalX].match(/\d/)
          ) {
            number += data[originalY][originalX];
            originalX++;
            if (originalX - x1_ > 0) {
              slice[y][originalX - x1_ - 1] = ".";
            }
          }
          x = originalX - x1_;
          numbers.push(+number);
        }
      }
    }

    return numbers;
  };

  const result2 = data.reduce((acc, line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] !== "*") {
        continue;
      }

      const numbers = numbersInSlice(y, x, x);
      if (numbers.length !== 2) continue;
      acc += numbers.reduce((a, b) => a * b, 1);
    }

    return acc;
  }, 0);

  yield result2;
}
