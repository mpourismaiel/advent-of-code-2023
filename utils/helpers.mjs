export const assert = (a, b, message) => {
  if (a !== b) {
    throw new Error(`Assumption ${message ? `"${message}" ` : ""}was wrong!
Expected: ${b}
Actual: ${a}`);
  }
};
