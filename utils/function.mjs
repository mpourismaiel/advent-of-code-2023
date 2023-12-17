export const memoize = (fn) => {
  const stored = new Map();

  return (...args) => {
    const key = JSON.stringify(args);
    if (stored.has(key)) {
      const memoized = stored.get(key);
      return memoized || null;
    }

    const result = fn(...args);
    stored.set(key, result);
    return result;
  };
};
