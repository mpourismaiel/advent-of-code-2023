import { findIn2DArray, findConnecting } from "../utils/array.mjs";

const startingPoint = "S";

const pipeDirection = {
  "|": [0, 0, -1, 1], // north and south.
  "-": [-1, 1, 0, 0], // east and west.
  L: [-1, 0, -1, 0], // north and east.
  J: [0, 1, -1, 0], // north and west.
  7: [0, 1, 0, 1], // south and west.
  F: [-1, 0, 0, 1], // south and east.
};
export default function* ({ input1, input2 }) {
  const solvePart1 = () => {
    const pipeMap = input1
      .trim()
      .split("\n")
      .map((line) => line.split(""));
    const start = findIn2DArray(pipeMap, startingPoint);
    let [x, y] = findConnecting(pipeMap, start, (x, y) =>
      Object.keys(pipeDirection).includes(pipeMap[y][x])
    )[0];
    const path = [start, [x, y]];
    let steps = 1;

    const dx = x - start[0];
    const dy = y - start[1];
    let relativeToPrev =
      dx === 0 ? (dy === 1 ? "S" : "N") : dx === 1 ? "E" : "W";

    while (pipeMap[y][x] !== startingPoint) {
      let deltaX = 0,
        deltaY = 0;
      const nav = relativeToPrev + pipeMap[y][x];
      switch (nav) {
        case "S|":
          deltaY = 1;
          break;
        case "N|":
          deltaY = -1;
          break;
        case "E-":
          deltaX = 1;
          break;
        case "W-":
          deltaX = -1;
          break;
        case "SL":
          deltaX = 1;
          break;
        case "WL":
          deltaY = -1;
          break;
        case "SJ":
          deltaX = -1;
          break;
        case "EJ":
          deltaY = -1;
          break;
        case "N7":
          deltaX = -1;
          break;
        case "E7":
          deltaY = 1;
          break;
        case "NF":
          deltaX = 1;
          break;
        case "WF":
          deltaY = 1;
          break;
      }

      if (deltaY === 1) {
        relativeToPrev = "S";
      } else if (deltaY === -1) {
        relativeToPrev = "N";
      } else if (deltaX === -1) {
        relativeToPrev = "W";
      } else {
        relativeToPrev = "E";
      }

      x += deltaX;
      y += deltaY;
      steps++;
      path.push([x, y]);
    }

    return steps / 2;
  };

  yield solvePart1();

  const solvePart2 = () => {
    const pipeMap = input2
      .trim()
      .split("\n")
      .map((line) => line.split(""));

    const start = findIn2DArray(pipeMap, startingPoint);
    let [x, y] = findConnecting(pipeMap, start, (x, y) =>
      Object.keys(pipeDirection).includes(pipeMap[y][x])
    )[0];
    const pathMap = { [`${start[0]},${start[1]}`]: 1, [`${x},${y}`]: 1 };
    const path = [start, [x, y]];
    let steps = 1;

    const dx = x - start[0];
    const dy = y - start[1];
    let relativeToPrev =
      dx === 0 ? (dy === 1 ? "S" : "N") : dx === 1 ? "E" : "W";

    while (pipeMap[y][x] !== startingPoint) {
      let deltaX = 0,
        deltaY = 0;
      const nav = relativeToPrev + pipeMap[y][x];
      switch (nav) {
        case "S|":
          deltaY = 1;
          break;
        case "N|":
          deltaY = -1;
          break;
        case "E-":
          deltaX = 1;
          break;
        case "W-":
          deltaX = -1;
          break;
        case "SL":
          deltaX = 1;
          break;
        case "WL":
          deltaY = -1;
          break;
        case "SJ":
          deltaX = -1;
          break;
        case "EJ":
          deltaY = -1;
          break;
        case "N7":
          deltaX = -1;
          break;
        case "E7":
          deltaY = 1;
          break;
        case "NF":
          deltaX = 1;
          break;
        case "WF":
          deltaY = 1;
          break;
      }

      if (deltaY === 1) {
        relativeToPrev = "S";
      } else if (deltaY === -1) {
        relativeToPrev = "N";
      } else if (deltaX === -1) {
        relativeToPrev = "W";
      } else {
        relativeToPrev = "E";
      }

      x += deltaX;
      y += deltaY;
      steps++;
      pathMap[`${x},${y}`] = 1;
      path.push([x, y]);
    }

    let inside = 0;
    for (let y = 0; y < pipeMap.length; y++) {
      let verticalPathCrossTimes = 0;
      let corner = false;
      for (let x = 0; x < pipeMap[y].length; x++) {
        if (pathMap[`${x},${y}`]) {
          let current = pipeMap[y][x];
          if (current === "|") {
            verticalPathCrossTimes++;
          } else if (current !== "-") {
            if (corner) {
              if (
                (corner === "L" && current === "7") ||
                (corner === "F" && current === "J")
              ) {
                verticalPathCrossTimes++;
              }
              corner = false;
            } else {
              corner = current;
            }
          }
        } else if (verticalPathCrossTimes % 2 === 1) {
          inside++;
        }
      }
    }

    return inside;
  };

  yield solvePart2();
}
