const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
const cardsJokerMode = [
  "J",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "Q",
  "K",
  "A",
];

module.exports = function* ({ input1, input2 }) {
  const calculateResult = (input, jokerMode) => {
    const cardOrder = (jokerMode ? cardsJokerMode : cards).reduce(
      (acc, card, i) => {
        acc[card] = i;
        return acc;
      },
      {}
    );

    const hands = input.split("\n").map((line) => {
      const [handStr, bid] = line.split(" ");
      const hand = handStr.split("");

      const cardCount = {};
      hand.forEach((card) => {
        cardCount[card] = cardCount[card] ? cardCount[card] + 1 : 1;
      });

      let jokerCardCount = 0;
      if (jokerMode) {
        jokerCardCount = cardCount["J"] || 0;
        if (jokerCardCount === 5) return [hand, 9, parseInt(bid)];
        delete cardCount["J"];
      }

      const type =
        5 -
        Object.keys(cardCount).length +
        +Object.values(cardCount).sort().pop() +
        jokerCardCount;

      return [hand, type, parseInt(bid)];
    });

    return hands
      .sort(([handA, rankA], [handB, rankB]) => {
        if (rankA > rankB) return 1;
        if (rankA < rankB) return -1;
        for (let i = 0; i < 5; i++) {
          if (cardOrder[handA[i]] > cardOrder[handB[i]]) return 1;
          if (cardOrder[handA[i]] < cardOrder[handB[i]]) return -1;
        }

        return 0;
      })
      .reduce((acc, [hand, type, bid], i) => acc + (i + 1) * bid, 0);
  };

  const result1 = calculateResult(input1);
  yield result1;

  const result2 = calculateResult(input2, true);
  yield result2;
};
