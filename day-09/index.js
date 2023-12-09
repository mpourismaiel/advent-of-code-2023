module.exports = function* ({ input1, input2 }) {
  const getHistory = (report) => {
    const numbers = report.split(/\s+/).map((n) => parseInt(n));
    const history = [numbers];
    let started = false;
    let cache = [];
    while (!started || !cache.every((n) => n === 0)) {
      started = true;
      cache = history[history.length - 1].reduce((acc, n, i, arr) => {
        if (i === 0) return acc;

        acc.push(n - arr[i - 1]);
        return acc;
      }, []);
      history.push(cache);
    }
    return history;
  };

  const predict = (history) => {
    for (let i = history.length - 1; i >= 0; i--) {
      const current = history[i];
      if (i === history.length - 1) {
        current.push(0);
        continue;
      }

      const next = history[i + 1];
      current.push(current[current.length - 1] + next[next.length - 1]);
    }

    return history[0][history[0].length - 1];
  };

  const remember = (history) => {
    for (let i = history.length - 1; i >= 0; i--) {
      const current = history[i];
      if (i === history.length - 1) {
        current.unshift(0);
        continue;
      }

      const next = history[i + 1];
      current.unshift(current[0] - next[0]);
    }

    return history[0][0];
  };

  const reports = input1.split("\n");
  const result1 = reports
    .map((report) => getHistory(report))
    .reduce((acc, history) => acc + predict(history), 0);

  yield result1;

  const result2 = reports
    .map((report) => getHistory(report))
    .reduce((acc, history) => acc + remember(history), 0);
  yield result2;
};
