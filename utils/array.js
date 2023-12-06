const similarItems = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item));
};

const slice2DArray = (arr, x1, y1, x2, y2) =>
  arr.slice(y1, y2 + 1).map((line) => line.slice(x1, x2 + 1));

const reduceSum = (acc, curr) => acc + curr;

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

module.exports = {
  similarItems,
  slice2DArray,
  reduceSum,
  splitByDelimiter,
  newArrayOfLength,
  loopBy,
};
