export default function* ({ input1, input2 }) {
  const almanac = {};
  const seeds = [];

  let activeMap = null;
  input1
    .trim()
    .split("\n")
    .map((line) => {
      if (!line) return;

      if (line.startsWith("seeds: ")) {
        seeds.push(...line.slice(7).split(" ").map(Number));
        return;
      }

      if (line.endsWith("map:")) {
        const [from, _, to] = line.slice(0, -5).trim().split("-");
        activeMap = [from, to].join("-");
        almanac[activeMap] = { from, to, map: [] };
        return;
      }

      const [destination, source, range] = line.split(" ").map(Number);
      almanac[activeMap].map.push({ source, destination, range });
    });

  const result1 = seeds
    .map((seed) => {
      let from = "seed";
      let value = seed;
      const destination = "location";
      while (from !== destination) {
        const key = Object.keys(almanac).find(
          (key) => almanac[key].from === from
        );
        from = almanac[key].to;

        const map = almanac[key].map.find(
          (map) => map.source <= value && map.source + map.range > value
        );

        if (!map) {
          continue;
        }

        value = value - map.source + map.destination;
      }

      return value;
    })
    .reduce((acc, curr) => Math.min(acc, curr), Infinity);
  yield result1;

  // previous stuff doesn't work here because of the vast amount of data, and I'm not gonna rethink it
  // for the second part I'm gonna use the ranges array, and go through maps and check if a range is covered by a map, if so, limit the range to the map's range
  const processConditions = (data, conditions) => {
    const createdRanges = [];
    let toProcess = [...data];

    while (toProcess.length > 0) {
      const newRangesToProcess = [];

      for (const range of toProcess) {
        const overlappingCondition = findOverlappingCondition(
          range,
          conditions
        );

        if (overlappingCondition) {
          const { overlap, before, after, map } = overlappingCondition;

          createdRanges.push([overlap[0] + map.delta, overlap[1] + map.delta]);

          if (before) newRangesToProcess.push(before);
          if (after) newRangesToProcess.push(after);
        } else {
          createdRanges.push(range);
        }
      }

      toProcess = newRangesToProcess;
    }

    return createdRanges;
  };

  const findOverlappingCondition = (range, conditions) => {
    for (const map of conditions) {
      const { before, overlap, after } = calculateOverlap(range, map);

      if (overlap) {
        return { overlap, before, after, map };
      }
    }

    return null;
  };

  const calculateOverlap = (range, map) => {
    const isOverlap = range[1] >= map.sourceStart && range[0] <= map.sourceEnd;

    if (isOverlap) {
      const overlapStart = Math.max(map.sourceStart, range[0]);
      const overlapEnd = Math.min(map.sourceEnd, range[1]);
      const overlap = [overlapStart, overlapEnd];

      const before =
        overlapStart > range[0] ? [range[0], overlapStart - 1] : null;
      const after = overlapEnd < range[1] ? [overlapEnd + 1, range[1]] : null;

      return { before, overlap, after };
    } else {
      const before = range[1] <= map.sourceStart ? [range[0], range[1]] : null;
      const after = range[0] >= map.sourceEnd ? [range[0], range[1]] : null;

      return { before, overlap: null, after };
    }
  };

  let ranges = input2
    .split("\n")[0]
    .split(":")[1]
    .trim()
    .split(" ")
    .reduce((acc, curr, i, arr) => {
      if (i % 2 === 1) {
        acc.push([
          parseInt(arr[i - 1]),
          parseInt(arr[i - 1]) + parseInt(curr) - 1,
        ]);
      }

      return acc;
    }, []);

  input2
    .split("\n\n")
    .slice(1)
    .map((lines) =>
      lines
        .split("\n")
        .slice(1)
        .map((line) => {
          const numbers = line.split(" ");
          return {
            sourceStart: parseInt(numbers[1]),
            sourceEnd: parseInt(numbers[1]) + parseInt(numbers[2]),
            delta: parseInt(numbers[0]) - parseInt(numbers[1]),
          };
        })
    )
    .forEach((map) => {
      ranges = processConditions(ranges, map);
    });

  ranges.sort((a, b) => a[0] - b[0]);

  yield ranges[0][0];
}
