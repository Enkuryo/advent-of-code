import Point from '../../lib/Point';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const getCheapestCost = (
  [ax, ay]: number[], // Amount of X/Y button A moves the machine
  [bx, by]: number[], // Amount of X/Y button B moves the machine
  [px, py]: number[], // Location X/Y of the prize
  [ca, cb]: number[] = [3, 1] // Cost of the buttons
): number => {
  /**
   * Well, looks like bruteforcing our way through part 2 won't work.
   *
   * Let's try to be smart for once and do some math. 🙃
   * We have:
   * - ax -> The button A x value
   * - ay -> The button A y value
   * - bx -> The button B x value
   * - by -> The button B y value
   *
   * - px -> The prize x value
   * - py -> The prize y value
   *
   * And we want to know
   * - ta -> Number of times button A was pressed
   * - tb -> Number of times button B was pressed
   *
   * That wasn't to hard. Now we can say
   *
   * px = ax * ta + bx * tb and
   * py = ay * ta + by * tb
   *
   * We can determine the amount button A has to be pressed by
   *
   *  px = ax * ta + bx * tb -> px - bx * tb = ax * ta -> (px - bx * tb) / ax = ta
   *  -> ta = (px - bx * tb) / ax for px
   *
   *  py = ay * ta + by * tb -> py - by * tb = ay * ta -> (py - by * tb) / ay = ta
   *  -> ta = (py - by * tb) / ay for py
   * We see that both sides equal ta so we can do
   *
   *  (px - bx * tb) / ax = (py - by * tb) / ay
   *
   * And if we want do get rid of the divisions
   *
   *  ay * (px - bx * tb) = ax * (py - by * tb)
   *
   * And to get rid of the parenthesis
   *
   *  ay * px - ay * bx * tb = ax * py - ax * by * tb;
   *
   * We want to move tb to one side so we can later solve for tb
   *
   *  ay * px = ax * py - ax * by * tb + ay * bx * tb
   *
   * Now move the px and py to the other side (and switch the right side around)
   *
   *  ay * px - ax * py = ay * bx * tb - ax * by * tb
   *  ay * px - ax * py = tb * (ay * bx - ax * by)
   *
   * Oh boy, we're close! Let's isolate tb
   *
   *  tb = (ay * px - ax * py) / (ay * bx - ax * by)
   *
   * Math is scary. But that should be it.
   *
   * We now have two formulas:
   *
   *  1: tb = (ay * px - ax * py) / (ay * bx - ax * by)
   *  2: ta = (px - bx * tb) / ax = (py - by * tb) / ay
   *
   * We can use the first to calculate tb and then use the either of the second to get ta.
   *
   * So off we go!
   *
   * Oh, one thing! We need to make sure that ax != 0, ay != 0, bx != 0 and by != 0
   * */

  if (ax === 0 || ay === 0 || bx === 0 || by === 0) return 0;

  const tb = (ay * px - ax * py) / (ay * bx - ax * by);
  const ta = (px - bx * tb) / ax;
  return tb % 1 === 0 && ta % 1 === 0 ? ta * ca + tb * cb : 0;
};

const getValues = (input: string, offset: number = 0): number[] => {
  const values = input.match(/X[\+\=](\d+), Y[\+\=](\d+)/);
  if (!values) return [0, 0];
  return values.slice(1, 3).map((n) => +n + offset);
};

export const partOne = (input: InputType): number => {
  let totalCost = 0;

  for (let i = 0; i < input.length; i += 4) {
    const buttonA = getValues(input[i]);
    const buttonB = getValues(input[i + 1]);
    const prize = getValues(input[i + 2]);

    totalCost += getCheapestCost(buttonA, buttonB, prize);
  }

  return totalCost;
};

export const partTwo = (input: InputType): number => {
  let totalCost = 0;

  for (let i = 0; i < input.length; i += 4) {
    const buttonA = getValues(input[i]);
    const buttonB = getValues(input[i + 1]);
    // Add some really big number to annoy anyone who wants to bruteforce this solution
    const prize = getValues(input[i + 2], 10000000000000);

    if (!buttonA || !buttonB || !prize) {
      // Do null check to satisfy typescript
      continue;
    }

    totalCost += getCheapestCost(buttonA, buttonB, prize);
  }

  return totalCost;
};
