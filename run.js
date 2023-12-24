import fs from "fs";

const openFile = (day) => (test) => (isInput, n) => {
  try {
    return fs
      .readFileSync(
        `./day-${day}/${test ? "test" : "prod"}-${n}-${
          isInput ? "input" : "expect"
        }.txt`,
        "utf8"
      )
      .trim();
  } catch (e) {
    return "";
  }
};

const time = (label) => {
  let start, end;
  return {
    start: () => (start = performance.now()),
    cancel: () => (end = 0),
    end: () => {
      if (!end && end !== 0) {
        end = performance.now();
        console.log(
          `==> ${label}: Execution time: ${(end - start).toFixed(4)} ms`
        );
      }

      return (end - start).toFixed(4);
    },
  };
};

const formatValue = (value) => `\x1b[1m${value}\x1b[0m`;

const runPart = async (fn, pre, timer, condition, assert) => {
  pre = `Part ${pre}`;
  if (!condition) {
    console.log(`${pre} not implemented.\n`);
    timer.cancel();
    return;
  }

  timer.start();
  const result = fn.next();
  timer.end();

  if (assert) {
    if (result.value + "" !== assert.trim()) {
      console.error(
        `${pre} failed. Expected:\n${assert.trim()}\nGot:\n${formatValue(
          result.value
        )}\n\n`
      );
      return;
    }
    console.log(`${pre} passed! Got: ${formatValue(result.value)}\n`);
    return;
  }

  console.log(`${pre}: ${formatValue(result.value)}\n`);
};

const run = async (day) => {
  const days = fs
    .readdirSync(".")
    .filter(
      (file) => fs.lstatSync(file).isDirectory() && file.startsWith("day-")
    )
    .sort((a, b) => {
      const aNum = parseInt(a.split("-")[1]);
      const bNum = parseInt(b.split("-")[1]);
      return aNum - bNum;
    });

  if (!day) {
    day = days[days.length - 1].split("-")[1];
  }

  console.log(`Running day ${day}...`);
  const dayPath = `./day-${day}/index.mjs`;
  if (!fs.existsSync(dayPath)) {
    console.log(`Day ${day} not found.`);
    return;
  }

  const openFileInDay = openFile(day);
  const openTestFile = openFileInDay(true);
  const openProdFile = openFileInDay(false);
  const module = await import(dayPath);
  const script = module.default;
  const p = Object.assign(
    {
      hasTest1: true,
      hasTest2: true,
      hasProd1: true,
      hasProd2: true,
    },
    module.properties || {}
  );

  const timerT1 = time("Test 1");
  const timerP1 = time("Prod 1");
  const timerT2 = time("Test 2");
  const timerP2 = time("Prod 2");

  const inputTest1 = openTestFile(true, 1);
  const assertTest1 = openTestFile(false, 1);
  const inputTest2 = openTestFile(true, 2) || inputTest1;
  const assertTest2 = openTestFile(false, 2);

  const test = script({
    input1: inputTest1,
    input2: inputTest2,
  });

  const inputProd1 = openProdFile(true, 1);
  const inputProd2 = openProdFile(true, 2) || inputProd1;
  const prod = script({
    input1: inputProd1,
    input2: inputProd2,
  });

  let l = "1 TEST";
  runPart(
    test,
    l,
    timerT1,
    p.hasTest1 && (inputTest1 || assertTest1),
    assertTest1
  );
  l = "1 PROD";
  runPart(prod, l, timerP1, p.hasProd1 && inputProd1, null);
  l = "2 TEST";
  runPart(
    test,
    l,
    timerT2,
    p.hasTest2 && (inputTest2 || assertTest2),
    assertTest2
  );
  l = "2 PROD";
  runPart(prod, l, timerP2, p.hasProd2 && inputProd2, null);

  return {
    test1: timerT1.end(),
    prod1: timerP1.end(),
    test2: timerT2.end(),
    prod2: timerP2.end(),
  };
};

if (process.argv[2] === "all") {
  const days = fs
    .readdirSync(".")
    .filter(
      (file) => fs.lstatSync(file).isDirectory() && file.startsWith("day-")
    )
    .sort((a, b) => {
      const aNum = parseInt(a.split("-")[1]);
      const bNum = parseInt(b.split("-")[1]);
      return aNum - bNum;
    });

  const allTimer = time("Advent of code!");
  allTimer.start();
  const results = {};
  for (const day of days) {
    results[day.split("-")[1]] = await run(day.split("-")[1]);
  }
  allTimer.end();

  if (process.argv[3] === "benchmark") {
    let table = `| Day | Part 1 Test | Part 2 Test | Part 1 | Part2 |
| --- | ----------- | ----------- | ------ | ----- |
`;

    Object.keys(results)
      .sort((a, b) => {
        const aNum = parseInt(a);
        const bNum = parseInt(b);
        return aNum - bNum;
      })
      .forEach((day) => {
        const { test1, prod1, test2, prod2 } = results[day];
        table += `| **${day}**| ${test1.toFixed(4)}ms | ${test2.toFixed(
          4
        )}ms | ${prod1.toFixed(4)}ms | ${prod2.toFixed(4)}ms |\n`;
      });

    const readme = fs.readFileSync("./README.md", "utf8");
    const readmeMain = readme.split("<!-- benchmark -->")[0];
    fs.writeFileSync(
      "./README.md",
      readmeMain + "<!-- benchmark -->\n" + table
    );
  }
} else {
  run(process.argv[2]);
}
