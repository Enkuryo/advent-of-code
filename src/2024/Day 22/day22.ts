import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type BuyerType = { secret: number; price: number; diff: number }[];

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

const iterate = (secret: number, steps: number): number => {
  return Array.from({ length: steps }).reduce((s: number) => evole(s), secret);
};

const sequence = (secret: number, steps: number): number[][] => {
  const results: number[][] = [];
  let s = secret;
  let prev = secret % 10;

  for (let i = 0; i < steps; i++) {
    s = evole(s);
    results.push([s % 10, (s % 10) - prev]);
    prev = s % 10;
  }

  return results;
};

const seqToString = (sequence: number[]): string => {
  return sequence.join(',');
};

export const partOne = (input: InputType): number => {
  return input.map((i) => iterate(+i, 2000)).reduce((a, b) => a + b, 0);
};

export const partTwo = (input: InputType, steps: number = 2000): number => {
  let totalBananas: { [key: string]: number } = {};

  input.forEach((secret) => {
    const changes = sequence(+secret, 2000);
    const currentBananasForSequence: { [key: string]: number } = {};

    let currentSequence = changes.slice(0, 4).map((d) => d[1]);
    currentBananasForSequence[seqToString(currentSequence)] = changes[3][0];

    for (let i = 4; i < changes.length; i++) {
      currentSequence.push(changes[i][1]);
      currentSequence.shift();

      const seqKey = seqToString(currentSequence);
      if (currentBananasForSequence[seqKey] === undefined) {
        currentBananasForSequence[seqKey] = changes[i][0];
      }
    }

    // Merge
    for (let seq in currentBananasForSequence) {
      if (totalBananas[seq] === undefined) {
        totalBananas[seq] = 0;
      }
      totalBananas[seq] += currentBananasForSequence[seq];
    }
  });

  return Math.max(...Object.values(totalBananas));
};
