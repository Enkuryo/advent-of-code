import useMemo from '../../hooks/useMemo';
import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const blink = (stones: string[]): string[] => {
  return stones.reduce<string[]>((a, b) => {
    if (b === '0') return [...a, '1'];
    if (b.length % 2 === 0) {
      let midPoint = b.length / 2;
      return [...a, `${+b.slice(0, midPoint)}`, `${+b.slice(midPoint)}`];
    }
    return [...a, `${+b * 2024}`];
  }, []);
};

export const partOne = (input: InputType): number => {
  let stones = input[0].split(' ');

  for (let i = 0; i < 25; i++) {
    stones = blink(stones);
  }

  return stones.length;
};

const blinkButBetter = (stone: number, steps: number): number => {
  if (steps === 0) return 1;

  if (stone === 0) return cachedBlink(1, steps - 1);

  const length = stone.toString().length;
  if (length % 2 === 0) {
    const left = +`${stone}`.slice(0, length / 2);
    const right = +`${stone}`.slice(length / 2);
    return cachedBlink(left, steps - 1) + cachedBlink(right, steps - 1);
  }

  return cachedBlink(stone * 2024, steps - 1);
};

const cachedBlink = useMemo<number>(blinkButBetter);

export const partTwo = (input: InputType): number => {
  let stones = input[0].split(' ');
  let result = 0;

  for (let stone of stones) {
    result += cachedBlink(+stone, 75);
  }

  return result;
};
