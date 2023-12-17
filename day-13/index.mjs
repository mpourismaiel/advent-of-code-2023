import { reduceSum, rotate2DArrayClockwise } from "../utils/array.mjs";

const JSONStripped = (str) => JSON.stringify(str).replace(/[\[\]"]/g, "");

const findSymmetry = (layout) => {
  for (let y = 1; y < layout.length; y++) {
    const image = JSONStripped(layout.slice(0, y).reverse());
    const actual = JSONStripped(layout.slice(y));

    if (actual.slice(0, image.length) === image.slice(0, actual.length)) {
      return y;
    }
  }

  return 0;
};

const findSmugdgedSymmetry = (layout) => {
  for (let y = 1; y < layout.length; y++) {
    let image = JSONStripped(layout.slice(0, y).reverse());
    let actual = JSONStripped(layout.slice(y));
    image = image.slice(0, actual.length);
    actual = actual.slice(0, image.length);

    let smudges = 0;
    for (let i = 0; i < image.length; i++) {
      if (image[i] !== actual[i]) {
        smudges++;
        if (smudges > 1) {
          break;
        }
      }
    }

    if (smudges === 1) {
      return y;
    }
  }

  return 0;
};

export default function* ({ input1, input2 }) {
  const layouts = input1.split("\n\n").map((str) => str.split("\n"));
  const clockwiseLayouts = layouts.map((layout) =>
    rotate2DArrayClockwise(layout.map((line) => line.split(""))).map((arr) =>
      arr.join("")
    )
  );

  const result1 = layouts.map((layout, i) => {
    const y = findSymmetry(layout);
    if (y) {
      return y * 100;
    }

    const x = findSymmetry(clockwiseLayouts[i]);
    return x;
  });

  yield result1.reduce(reduceSum);

  const result2 = layouts.map((layout, i) => {
    let total = 0;
    const y = findSmugdgedSymmetry(layout);
    total += y * 100;

    const x = findSmugdgedSymmetry(clockwiseLayouts[i]);
    return total + x;
  });

  yield result2.reduce(reduceSum);
}
