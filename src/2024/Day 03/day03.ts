import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

export const partOne = (input: InputType): number => {
  let result = 0;

  for (const line of input) {
    const matches = line.match(/mul\(\d+,\d+\)/g);

    let lineResult = 0;

    if (matches) {
      for (let match of matches) {
        const numbers = match
          .replace('mul(', '')
          .replace(')', '')
          .split(',')
          .map((n) => +n);
        if (numbers) {
          const [a, b] = numbers;
          lineResult += a * b;
        }
      }
    }

    result += lineResult;
  }

  return result;
};

export const partTwo = (input: InputType): number => {
  let result = 0;

  let allowMul = true;

  for (const line of input) {
    const matches = line.match(/don't|do|mul\(\d+,\d+\)/g);

    let lineResult = 0;

    if (matches) {
      for (let match of matches) {
        if (match === 'do') {
          allowMul = true;
        } else if (match === "don't") {
          allowMul = false;
        } else {
          if (!allowMul) continue;
          const numbers = match
            .replace('mul(', '')
            .replace(')', '')
            .split(',')
            .map((n) => +n);
          if (numbers) {
            const [a, b] = numbers;
            lineResult += a * b;
          }
        }
      }
    }

    result += lineResult;
  }

  return result;
};
