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

export const partTwo = (input: InputType): number => {
  return -1;
};
