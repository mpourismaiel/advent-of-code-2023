import { reduceSum } from "../utils/array.mjs";

export default function* ({ input1, input2 }) {
  const result1 = input1
    .replace(/\n/g, "")
    .split(",")
    .map((str) =>
      str
        .split("")
        .map((char) => char.charCodeAt(0))
        .reduce((acc, ascii) => ((acc + ascii) * 17) % 256, 0)
    )
    .reduce(reduceSum);
  yield result1;

  const boxes = {};
  for (let i = 0; i < 256; i++) {
    boxes[i] = {};
  }

  input2
    .replace(/\n/g, "")
    .split(",")
    .forEach((str) => {
      let [_, label, operation, focus] = str.match(/(.*)([-=])(\d*)?/);
      const box = label
        .split("")
        .map((char) => char.charCodeAt(0))
        .reduce((acc, ascii) => ((acc + ascii) * 17) % 256, 0);

      if (operation === "-") {
        if (!boxes[box][label]) {
          return;
        }

        Object.values(boxes[box])
          .sort((a, b) => a.position - b.position)
          .forEach((b) => {
            if (b.position > boxes[box][label].position) {
              b.position--;
            }
          });

        delete boxes[box][label];
      } else {
        boxes[box][label] = {
          focus: parseInt(focus),
          position:
            boxes[box][label]?.position || Object.keys(boxes[box]).length + 1,
        };
      }
    });

  const result2 = Object.keys(boxes).reduce(
    (acc, box) =>
      acc +
      Object.keys(boxes[box]).reduce(
        (acc, lens) =>
          acc +
          (parseInt(box) + 1) *
            boxes[box][lens].position *
            boxes[box][lens].focus,
        0
      ),
    0
  );

  yield result2;
}
