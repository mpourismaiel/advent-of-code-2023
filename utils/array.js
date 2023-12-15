const similarItems = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item));
};

const slice2DArray = (arr, x1, y1, x2, y2) =>
  arr.slice(y1, y2 + 1).map((line) => line.slice(x1, x2 + 1));

const rotate2DArrayClockwise = (arr) => {
  const result = [];
  for (let x = 0; x < arr[0].length; x++) {
    const line = [];
    for (let y = arr.length - 1; y >= 0; y--) {
      line.push(arr[y][x]);
    }
    result.push(line);
  }
  return result;
};

const reduceSum = (acc, curr) => acc + curr;

const reduceMax = (acc, curr) => Math.max(acc, curr);

const splitByDelimiter = (str, delimiter = " ", slice = 0) =>
  str
    .split(delimiter)
    .slice(slice)
    .map((n) => n.trim())
    .filter(Boolean);

const newArrayOfLength = (length, value) => new Array(length).fill(value);

const loopBy = (length, callback) => {
  for (let i = 0; i < length; i++) {
    callback(i, length);
  }
};

const findIn2DArray = (arr, item) => {
  const flat = arr.flat();
  const index = flat.indexOf(item);
  const y = Math.floor(index / arr[0].length);
  const x = index % arr[0].length;
  return [x, y];
};

const findConnecting = (arr, current, cb) => {
  const north = [current[0], current[1] - 1];
  const south = [current[0], current[1] + 1];
  const east = [current[0] + 1, current[1]];
  const west = [current[0] - 1, current[1]];

  const directions = [north, south, east, west];

  return directions.filter((direction) => {
    const [x, y] = direction;
    if (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length) {
      return false;
    }
    return cb(x, y);
  });
};

module.exports = {
  similarItems,
  slice2DArray,
  rotate2DArrayClockwise,
  reduceSum,
  reduceMax,
  splitByDelimiter,
  newArrayOfLength,
  loopBy,
  findIn2DArray,
  findConnecting,
};
