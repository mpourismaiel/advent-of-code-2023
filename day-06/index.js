module.exports = function* ({ input1, input2 }) {
  const processRace = (time, distance) => {
    let result = 0;

    for (let holdTime = 0; holdTime <= time; holdTime++) {
      const hold = holdTime * (time - holdTime);
      if (hold > distance) {
        result++;
      }
    }

    return result;
  };

  const times = input1.split("\n")[0].trim().match(/\d+/g);
  const distances = input1.split("\n")[1].trim().match(/\d+/g);
  const result1 = times.reduce(
    (acc, t, i) => acc * processRace(parseInt(t), parseInt(distances[i])),
    1
  );

  yield result1;

  const time = input2.split("\n")[0].split(":")[1].replace(/\s/g, "");
  const distance = input2.split("\n")[1].split(":")[1].replace(/\s/g, "");
  const result2 = processRace(parseInt(time), parseInt(distance));

  yield result2;
};
