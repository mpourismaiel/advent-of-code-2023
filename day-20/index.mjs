import { lcm } from "../utils/math.mjs";

const createMods = (input) => {
  const mods = input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [, type, id, dests] = line.match(/([%&])?(.*)\s+->\s+(.*)/);
      const destinations = dests.split(",").map((d) => d.trim());
      acc[id] = {
        type,
        destinations,
        inputs: [],
        state: type === "%" ? false : undefined,
      };
      return acc;
    }, {});

  Object.keys(mods).forEach((id) => {
    mods[id].destinations.forEach((dest) => {
      if (!mods[dest]) {
        mods[dest] = { type: null, destinations: [], inputs: [] };
      }

      mods[dest].inputs.push([id, mods[dest].type === "&" ? false : undefined]);
    });
  });

  return mods;
};

const pressButton = (mods, cb) => {
  let highPulses = 0,
    lowPulses = 0;

  const pulses = [["button", "broadcaster", false]];
  while (pulses.length) {
    const [from, to, pulse] = pulses.shift();
    highPulses += pulse ? 1 : 0;
    lowPulses += pulse ? 0 : 1;

    const mod = mods[to];
    let newPulse = pulse;
    if (mod.type === "&") {
      mod.inputs.find(([id]) => id === from)[1] = pulse;
      newPulse = !mod.inputs.every(([, pulse]) => pulse);
    } else if (mod.type === "%") {
      if (pulse) {
        continue;
      }

      mod.state = !mod.state;
      newPulse = mod.state;
    }

    const newPulses = mod.destinations.map((destId) => [to, destId, newPulse]);
    if (newPulses.length) {
      pulses.push(...newPulses);
    }

    if (cb) cb(to, newPulse);
  }

  return [highPulses, lowPulses];
};

export default function* ({ input1, input2 }) {
  const mods1 = createMods(input1);

  let highPulses = 0,
    lowPulses = 0;

  for (let i = 0; i < 1000; i++) {
    const result = pressButton(mods1);
    highPulses += result[0];
    lowPulses += result[1];
  }

  yield highPulses * lowPulses;

  const mods2 = createMods(input2);
  const finalDestination = "rx";
  const modsConnectedToFinalDestination = mods2[finalDestination].inputs
    .map(([id]) => mods2[id].inputs.map(([id]) => id))
    .flat();
  const connectionsReachedAt = {};

  for (
    let j = 0;
    Object.keys(connectionsReachedAt).length <
    modsConnectedToFinalDestination.length;
    j++
  ) {
    pressButton(mods2, (to, newPulse) => {
      if (modsConnectedToFinalDestination.includes(to) && newPulse) {
        connectionsReachedAt[to] = j + 1;
      }
    });
  }

  yield lcm(...Object.values(connectionsReachedAt));
}

export const properties = { hasTest2: false };
