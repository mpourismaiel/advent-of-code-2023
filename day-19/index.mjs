export default function* ({ input1, input2 }) {
  const [workflows, items] = [
    input1
      .split("\n\n")[0]
      .split("\n")
      .reduce((acc, workflow) => {
        const [name, rules] = workflow.slice(0, -1).split("{");
        acc[name] = rules
          .split(",")
          .map((rule, i, arr) =>
            i === arr.length - 1
              ? [null, rule]
              : ["item." + rule.split(":")[0], rule.split(":")[1]]
          );
        return acc;
      }, {}),
    input1
      .split("\n\n")[1]
      .split("\n")
      .map((item) =>
        item
          .slice(1, -1)
          .split(",")
          .reduce((acc, cur) => {
            acc[cur.split("=")[0]] = parseInt(cur.split("=")[1]);
            return acc;
          }, {})
      ),
  ];
  const processItem = (item, workflowName = "in") => {
    const workflow = workflows[workflowName];
    for (const [rule, destination] of workflow) {
      if (!rule) {
        if (destination === "A" || destination === "R") {
          return destination;
        }

        return processItem(item, destination);
      }

      if (eval(rule)) {
        if (destination === "A" || destination === "R") {
          return destination;
        }

        return processItem(item, destination);
      }
    }

    throw new Error("No valid destination found");
  };

  const result1 = items
    .filter((item) => processItem(item) === "A")
    .reduce((acc, { x, m, a, s }) => acc + x + m + a + s, 0);

  yield result1;

  const workflowList = input1
    .split("\n\n")[0]
    .split("\n")
    .reduce((acc, workflow) => {
      const [name, rules] = workflow.slice(0, -1).split("{");
      acc[name] = rules
        .split(",")
        .map((rule, i, arr) =>
          i === arr.length - 1 ? [null, rule] : rule.split(":")
        );
      return acc;
    }, {});

  const handleDestination = (range, destination) => {
    if (destination === "A") {
      return Object.values(range).reduce(
        (acc, range) => acc * (range[1] - range[0] + 1),
        1
      );
    } else if (destination !== "R") {
      return run(range, destination);
    }
    return 0;
  };

  const run = (ranges, workflowName = "in") =>
    workflowList[workflowName].reduce((acc, [rule, destination]) => {
      if (!rule) {
        acc += handleDestination(ranges, destination);
      } else {
        const [, key, op, limitStr] = rule.match(/(\w)([<>])(\d+)/);
        const l = parseInt(limitStr);
        const attr = ranges[key];

        if (op === "<" && attr[0] < l) {
          const newRanges = Object.keys(ranges).reduce((acc, k) => {
            acc[k] =
              k === key
                ? [ranges[k][0], Math.min(attr[1], l - 1)]
                : [...ranges[k]];
            return acc;
          }, {});
          attr[0] = Math.max(attr[0], l);

          acc += handleDestination(newRanges, destination);
        } else if (op === ">" && l < attr[1]) {
          const newRanges = Object.keys(ranges).reduce((acc, k) => {
            acc[k] =
              k === key
                ? [Math.max(attr[0], l + 1), ranges[k][1]]
                : [...ranges[k]];
            return acc;
          }, {});
          attr[1] = Math.min(attr[1], l);

          acc += handleDestination(newRanges, destination);
        }
      }

      return acc;
    }, 0);

  const result2 = run({
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000],
  });
  yield result2;
}
