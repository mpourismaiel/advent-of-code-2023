module.exports = function* ({ input1, input2 }) {
  const result1 = input1
    .split("\n")
    .map((line) =>
      parseInt(
        line
          .split("")
          .filter((c) => /\d/.test(c))
          .map(Number)
          .reduce((acc, cur, i, arr) => {
            if (i === 0) {
              acc += cur;
            }
            if (i == arr.length - 1) {
              acc += cur;
            }

            return acc;
          }, "") || 0
      )
    )
    .reduce((acc, cur) => acc + cur, 0);
  yield result1;

  const result2 = input2.split("\n").map((line) => {
    const numbers = [];
    for (let i = 0; i < line.length; i++) {
      if (/\d/.test(line[i])) {
        numbers.push(line[i]);
        continue;
      }

      const match = line
        .slice(i)
        .match(/(one|two|three|four|five|six|seven|eight|nine)/gi);
      if (!match || !match[0]) {
        continue;
      }

      if (match[0] === line.slice(i, i + match[0].length)) {
        numbers.push(match[0]);
      }
    }

    const res =
      numbers
        .map((match) =>
          match
            .replace(/one/gi, 1)
            .replace(/two/gi, 2)
            .replace(/three/gi, 3)
            .replace(/four/gi, 4)
            .replace(/five/gi, 5)
            .replace(/six/gi, 6)
            .replace(/seven/gi, 7)
            .replace(/eight/gi, 8)
            .replace(/nine/gi, 9)
        )
        .reduce((acc, cur, i, arr) => {
          if (i === 0) {
            acc += cur;
          }
          if (i == arr.length - 1) {
            acc += cur;
          }

          return acc;
        }, "") || 0;

    return parseInt(res);
  });

  yield result2.reduce((acc, cur) => acc + cur, 0);
};
