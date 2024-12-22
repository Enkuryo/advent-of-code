import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const evole = (secret: number) => {
  let currentSecret: number = secret;

  // First calulate the result of multiplying the secret number by 64
  let rMul: number = currentSecret * 64;
  // Mix this result into the secret number
  currentSecret = mix(rMul, currentSecret);
  // Prune the secret number
  currentSecret = prune(currentSecret);

  // Calculate the result of dividing the secret number by 32
  let rDiv: number = currentSecret / 32;
  // Round to to nearest int
  rDiv = Math.floor(rDiv);
  currentSecret = mix(rDiv, currentSecret);
  currentSecret = prune(currentSecret);

  let rMul2: number = currentSecret * 2048;
  currentSecret = mix(rMul2, currentSecret);
  currentSecret = prune(currentSecret);

  return currentSecret;
};

const mix = (n: number, secret: number): number => {
  return (n ^ secret) >>> 0;
};

const prune = (secret: number): number => {
  return secret % 16777216;
};

export const partOne = (input: InputType): number => {
  let sum = 0;

  for (let i of input) {
    let sSum = 0;
    let s = +i;
    for (let j = 0; j < 2000; j++) {
      s = evole(s);
    }
    sum += s;
  }
  return sum;
};

export const partTwo = (input: InputType): number => {
  return -1;
};
