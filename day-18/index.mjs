const directionTranslate = {
  R: [0, 1],
  L: [0, -1],
  U: [-1, 0],
  D: [1, 0],
};
const intToDirection = {
  0: "R",
  1: "D",
  2: "L",
  3: "U",
};

export default function* ({ input1, input2 }) {
  const [, , perimeter, area] = input1
    .trim()
    .split("\n")
    .reduce(
      ([x, y, perimeter, area], line) => {
        let [, direction, distance] = line.match(/(L|R|U|D)\s*(\d+)/);
        distance = parseInt(distance);

        y += directionTranslate[direction][0] * distance;
        x += directionTranslate[direction][1] * distance;

        perimeter += distance;
        area += x * directionTranslate[direction][0] * distance;

        return [x, y, perimeter, area];
      },
      [0, 0, 0, 0]
    );

  const result1 = area + Math.floor(perimeter / 2) + 1;
  yield result1;

  const [, , perimeter2, area2] = input1
    .trim()
    .split("\n")
    .reduce(
      ([x, y, perimeter, area], line) => {
        let [, , , distance, directionInt] = line.match(
          /(L|R|U|D)\s*(\d+)\s*\(#(.{5})(\d)\)/
        );
        const direction = intToDirection[directionInt];
        distance = parseInt(distance, 16);

        y += directionTranslate[direction][0] * distance;
        x += directionTranslate[direction][1] * distance;

        perimeter += distance;
        area += x * directionTranslate[direction][0] * distance;

        return [x, y, perimeter, area];
      },
      [0, 0, 0, 0]
    );

  const result2 = area2 + Math.floor(perimeter2 / 2) + 1;
  yield result2;
}
