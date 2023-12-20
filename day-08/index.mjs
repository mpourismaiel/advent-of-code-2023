import { reduceMax } from "../utils/array.mjs";
import { lcm } from "../utils/math.mjs";

export default function* ({ input1, input2 }) {
  const data1 = input1.split("\n").filter(Boolean);
  const instructions1 = data1[0].split("");
  const locations1 = data1.slice(1).reduce((acc, directions) => {
    const [_, current, L, R] = directions.match(
      /(\w+)\s*=\s*\((\w+),\s(\w+)\)/
    );
    acc[current] = { L, R };
    return acc;
  }, {});

  const getSteps = (map, instructions, location, cb) => {
    let steps = 0;
    while (true) {
      location = map[location][instructions[steps % instructions.length]];
      steps++;
      if (cb(location)) {
        return steps;
      }
    }
  };

  const result1 = getSteps(
    locations1,
    instructions1,
    "AAA",
    (l) => l === "ZZZ"
  );
  yield result1;

  const data2 = input2.split("\n").filter(Boolean);
  const instructions2 = data2[0].split("");
  const locations2 = data2.slice(1).reduce(
    (acc, directions) => {
      const [_, current, L, R] = directions.match(
        /(\w+)\s*=\s*\((\w+),\s(\w+)\)/
      );
      if (current.endsWith("A")) {
        acc.starting.push(current);
      }
      acc.map[current] = { L, R };
      return acc;
    },
    { starting: [], map: {} }
  );

  let steps = locations2.starting.map((starting) =>
    getSteps(locations2.map, instructions2, starting, (l) => l.endsWith("Z"))
  );

  yield lcm(...steps);
}
