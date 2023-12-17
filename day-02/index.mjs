export default function* ({ input1, input2 }) {
  const sets = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const result1 = input1
    .split("\n")
    .filter(Boolean)
    .reduce(
      (acc, line, i) =>
        line
          .split(": ")[1]
          .split(";")
          .some((set) =>
            set.split(",").some((cubes) => {
              const count = cubes.match(/\d+/)[0];
              const color = cubes.match(/(red|green|blue)/)[0];
              return sets[color] < parseInt(count);
            })
          )
          ? acc
          : acc + i + 1,
      0
    );

  yield result1;

  const result2 = input1
    .split("\n")
    .filter(Boolean)
    .reduce((acc, line, i) => {
      const gameMinColors = line
        .split(": ")[1]
        .split(";")
        .reduce(
          (acc, set) => {
            set.split(",").forEach((cubes) => {
              const count = cubes.match(/\d+/)[0];
              const color = cubes.match(/(red|green|blue)/)[0];
              acc[color] =
                parseInt(count) > acc[color] ? parseInt(count) : acc[color];
            });
            return acc;
          },
          { red: 0, green: 0, blue: 0 }
        );

      return (
        acc +
        Object.keys(gameMinColors).reduce(
          (acc, color) => acc * gameMinColors[color],
          1
        )
      );
    }, 0);

  yield result2;
}
