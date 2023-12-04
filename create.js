const fs = require("fs");
// get list of all directories in the current directory and sort them
const dirs = fs
  .readdirSync(".")
  .filter(
    (file) => fs.statSync(`./${file}`).isDirectory() && file.startsWith("day-")
  )
  .map((dir) => parseInt(dir.split("-")[1]))
  .sort();

const lastDay = dirs[dirs.length - 1] || 0;
if (!lastDay) {
  console.log("Welcome to advent of code 2023!");
} else {
  console.log(`You have solved ${dirs.length} puzzles!`);
}

const day = lastDay + 1;
const dir = `./day-${day < 10 ? "0" + day : day}`;
fs.mkdirSync(dir);
fs.writeFileSync(
  `${dir}/index.js`,
  `module.exports = function* ({ input1, input2 }) {
    // TODO: Implement
    const result1 = input1.split("\\n");
    yield result1;\n};\n`
);
fs.writeFileSync(`${dir}/prod-1-input.txt`, "");
fs.writeFileSync(`${dir}/test-1-input.txt`, "");
fs.writeFileSync(`${dir}/test-1-expect.txt`, "");
fs.writeFileSync(`${dir}/test-2-input.txt`, "");
fs.writeFileSync(`${dir}/test-2-expect.txt`, "");
