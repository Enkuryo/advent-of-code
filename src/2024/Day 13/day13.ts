import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const BUTTON_A_COST = 3;
const BUTTON_B_COST = 1;

export const partOne = (input: InputType): number => {
  let totalCost = 0;

  for (let i = 0; i < input.length; i += 4) {
    const buttonA = input[i]
      .match(/X\+(\d+), Y\+(\d+)/)
      ?.slice(1, 3)
      .map((n) => +n);
    const buttonB = input[i + 1]
      .match(/X\+(\d+), Y\+(\d+)/)
      ?.slice(1, 3)
      .map((n) => +n);
    const prize = input[i + 2]
      .match(/X\=(\d+), Y\=(\d+)/)
      ?.slice(1, 3)
      .map((n) => +n);

    if (!buttonA || !buttonB || !prize) {
      continue;
    }

    let cheapestPrize = Number.MAX_SAFE_INTEGER;

    for (
      let buttonATimes = 1;
      buttonA[0] * buttonATimes <= prize[0];
      buttonATimes++
    ) {
      const X = buttonA[0] * buttonATimes;
      const Y = buttonA[1] * buttonATimes;

      const buttonBTimes = (prize[0] - X) / buttonB[0];

      const endX = X + buttonBTimes * buttonB[0];
      const endY = Y + buttonBTimes * buttonB[1];

      if (endX === prize[0] && endY === prize[1]) {
        const cost =
          BUTTON_A_COST * buttonATimes + BUTTON_B_COST * buttonBTimes;

        cheapestPrize = Math.min(cheapestPrize, cost);
      }
    }

    totalCost += cheapestPrize === Number.MAX_SAFE_INTEGER ? 0 : cheapestPrize;
  }

  return totalCost;
};

export const partTwo = (input: InputType): number => {
  return -1;
};
