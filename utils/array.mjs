export const getNeighbors = (grid, x, y) => {
  const north = [x, y - 1];
  const south = [x, y + 1];
  const east = [x + 1, y];
  const west = [x - 1, y];

  const directions = [north, south, east, west];

  return directions.filter((direction) => {
    const [x, y] = direction;
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
      return false;
    }
    return true;
  });
};

export const get2DArrayCorner = (grid, corner = "topLeft") => {
  const x =
    corner === "topLeft" || corner === "bottomLeft" ? 0 : grid[0].length - 1;
  const y = corner === "topLeft" || corner === "topRight" ? 0 : grid.length - 1;
  return [x, y];
};

export const similarItems = (arr1, arr2) => {
  return arr1.filter((item) => arr2.includes(item));
};

export const slice2DArray = (arr, x1, y1, x2, y2) =>
  arr.slice(y1, y2 + 1).map((line) => line.slice(x1, x2 + 1));

export const rotate2DArrayClockwise = (arr) => {
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

export const reduceSum = (acc, curr) => acc + curr;

export const reduceMax = (acc, curr) => Math.max(acc, curr);

export const splitByDelimiter = (str, delimiter = " ", slice = 0) =>
  str
    .split(delimiter)
    .slice(slice)
    .map((n) => n.trim())
    .filter(Boolean);

export const newArrayOfLength = (length, value) =>
  new Array(length).fill(value);

export const loopBy = (length, callback) => {
  for (let i = 0; i < length; i++) {
    callback(i, length);
  }
};

export const findIn2DArray = (arr, item) => {
  const flat = arr.flat();
  const index = flat.indexOf(item);
  const y = Math.floor(index / arr[0].length);
  const x = index % arr[0].length;
  return [x, y];
};

export const findConnecting = (arr, current, cb) => {
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

export const isSame = (arr1, arr2, guaranteedSameLength = true) => {
  if (!guaranteedSameLength && arr1.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
};

export const isIn2DArrayRange = (arr, x, y) => {
  if (x < 0 || x >= arr[0].length || y < 0 || y >= arr.length) {
    return false;
  }
  return true;
};
