import fs from "fs";

const openFile = (day, dev, isInput, n) => {
  try {
    return fs
      .readFileSync(
        `./day-${day}/${dev ? "test" : "prod"}-${n}-${
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
    end: () => {
      if (!end) {
        end = performance.now();
        console.log(`==> ${label}: Execution time: ${end - start} ms`);
      }

      return end - start;
    },
  };
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

  const script = (await import(dayPath)).default;

  const test1Timer = time("Test 1");
  const prod1Timer = time("Prod 1");
  const test2Timer = time("Test 2");
  const prod2Timer = time("Prod 2");
  const dataTest1Input = openFile(day, true, true, 1);
  const dataTest1Expect = openFile(day, true, false, 1);
  const dataTest2Input = openFile(day, true, true, 2) || dataTest1Input;
  const dataTest2Expect = openFile(day, true, false, 2);
  const test = script({
    input1: dataTest1Input,
    input2: dataTest2Input,
  });

  const dataProd1Input = openFile(day, false, true, 1);
  const dataProd2Input = openFile(day, false, true, 2) || dataProd1Input;
  const prod = script({
    input1: dataProd1Input,
    input2: dataProd2Input,
  });

  if (!dataTest1Input || !dataTest1Expect) {
    console.log(`Part 1 TEST data not found.`);
  } else {
    test1Timer.start();
    const result1 = test.next();
    test1Timer.end();
    if (result1.value + "" !== dataTest1Expect.trim()) {
      console.log(
        `Part 1 TEST failed. Expected:\n${dataTest1Expect.trim()}\nGot:\n${
          result1.value
        }\n`
      );
    } else {
      console.log(`Part 1 TEST passed!`);
    }
  }

  if (!dataProd1Input) {
    console.log(`Part 1 PROD data not found.`);
  } else {
    prod1Timer.start();
    const result1 = prod.next();
    prod1Timer.end();
    console.log(`Part 1 PROD:\n${result1.value}\n`);
  }

  if (!dataTest2Input || !dataTest2Expect) {
    console.log(`Part 2 TEST data not found.`);
  } else {
    test2Timer.start();
    const result2 = test.next();
    test2Timer.end();
    if (result2.value + "" !== dataTest2Expect.trim()) {
      console.log(
        `Part 2 TEST failed. Expected:\n${dataTest2Expect.trim()}\nGot:\n${
          result2.value
        }\n`
      );
    } else {
      console.log(`Part 2 TEST passed!`);
    }
  }

  if (!dataProd2Input) {
    console.log(`Part 2 PROD data not found.`);
  } else {
    prod2Timer.start();
    const result2 = prod.next();
    prod2Timer.end();
    console.log(`Part 2 PROD:\n${result2.value}\n`);
  }

  return {
    test1: test1Timer.end(), // test1Timer ? test1Timer() : () => "-",
    prod1: prod1Timer.end(), // prod1Timer ? prod1Timer() : () => "-",
    test2: test2Timer.end(), // test2Timer ? test2Timer() : () => "-",
    prod2: prod2Timer.end(), // prod2Timer ? prod2Timer() : () => "-",
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
