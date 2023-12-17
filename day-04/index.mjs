import {
  similarItems,
  reduceSum,
  splitByDelimiter,
  loopBy,
} from "../utils/array.mjs";

export default function* ({ input1, input2 }) {
  const result1 = input1
    .split("\n")
    .map((line) => {
      const [winningNumbers, cardNumbers] = line.split("|");
      const winningNumbersArr = splitByDelimiter(winningNumbers, " ", 2);
      const cardNumbersArr = splitByDelimiter(cardNumbers);
      const winningCardNumbersArr = similarItems(
        winningNumbersArr,
        cardNumbersArr
      );

      if (!winningCardNumbersArr.length) return 0;

      return Math.pow(2, winningCardNumbersArr.length - 1);
    })
    .reduce(reduceSum, 0);

  yield result1;

  const result2 = [];
  input1.split("\n").forEach((line) => {
    const match = line.match(/Card\s+(\d+):([\d\s]+)\|([\d\s]+)/) || [];
    const [cardNumberStr, winningNumbers, cardNumbers] = [
      match[1],
      match[2],
      match[3],
    ];
    const cardNumber = parseInt(cardNumberStr) - 1;
    const winningNumbersArr = splitByDelimiter(winningNumbers, " ");
    const cardNumbersArr = splitByDelimiter(cardNumbers, " ");

    result2[cardNumber] = result2[cardNumber] ? result2[cardNumber] + 1 : 1;
    let wonCards = similarItems(winningNumbersArr, cardNumbersArr).length;
    loopBy(result2[cardNumber], () => {
      let j = wonCards;
      while (j > 0) {
        result2[cardNumber + j] = result2[cardNumber + j]
          ? result2[cardNumber + j] + 1
          : 1;
        j--;
      }
    });
  });
  yield result2.reduce(reduceSum);
}
