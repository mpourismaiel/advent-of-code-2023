const fs = require("fs");

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
  const start = performance.now();
  return () => {
    const end = performance.now();
    console.log(`==> ${label}: Execution time: ${end - start} ms`);
  };
};

const run = (day) => {
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
  const dayPath = `./day-${day}/index.js`;
  if (!fs.existsSync(dayPath)) {
    console.log(`Day ${day} not found.`);
    return;
  }

  const dataTest1Input = openFile(day, true, true, 1);
  const dataTest1Expect = openFile(day, true, false, 1);
  const dataTest2Input = openFile(day, true, true, 2) || dataTest1Input;
  const dataTest2Expect = openFile(day, true, false, 2);
  const test = require(dayPath)({
    input1: dataTest1Input,
    input2: dataTest2Input,
  });

  const dataProd1Input = openFile(day, false, true, 1);
  const dataProd2Input = openFile(day, false, true, 2) || dataProd1Input;
  const prod = require(dayPath)({
    input1: dataProd1Input,
    input2: dataProd2Input,
  });

  if (!dataTest1Input || !dataTest1Expect) {
    console.log(`Part 1 TEST data not found.`);
  } else {
    const test1Timer = time("Test 1");
    const result1 = test.next();
    test1Timer();
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
    const prod1Timer = time("Prod 1");
    const result1 = prod.next();
    prod1Timer();
    console.log(`Part 1 PROD:\n${result1.value}\n`);
  }

  if (!dataTest2Input || !dataTest2Expect) {
    console.log(`Part 2 TEST data not found.`);
  } else {
    const test2Timer = time("Test 2");
    const result2 = test.next();
    test2Timer();
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
    const prod2Timer = time("Prod 2");
    const result2 = prod.next();
    prod2Timer();
    console.log(`Part 2 PROD:\n${result2.value}\n`);
  }
};

run(process.argv[2]);
