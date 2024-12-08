import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

export const partOne = (input: InputType): number => {
  const leftSide: number[] = [];
  const rightSide: number[] = [];

  for (let line of input) {
    const [l, r] = line.split('   ');
    leftSide.push(+l);
    rightSide.push(+r);
  }

  leftSide.sort();
  rightSide.sort();

  let result = 0;

  for (let i = 0; i < input.length; i++) {
    result += Math.abs(leftSide[i] - rightSide[i]);
  }

  return result;
};

export const partTwo = (input: InputType): number => {
  const leftSide: number[] = [];
  const rightSide: number[] = [];

  for (let line of input) {
    const [l, r] = line.split('   ');
    leftSide.push(+l);
    rightSide.push(+r);
  }

  let result = 0;

  for (let i = 0; i < leftSide.length; i++) {
    let counter = 0;
    for (let j = 0; j < rightSide.length; j++) {
      if (leftSide[i] === rightSide[j]) counter++;
    }
    result += leftSide[i] * counter;
  }

  return result;
};
