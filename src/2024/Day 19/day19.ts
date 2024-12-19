import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type ParsedInput = {
  maxTowelSize: number;
  availableTowels: string[];
  desiredDesigns: string[];
};

const parseInput = (input: InputType): ParsedInput => {
  const result: ParsedInput = { availableTowels: [], desiredDesigns: [], maxTowelSize: 0 };
  result.availableTowels = input[0].split(', ').sort((a, b) => b.length - a.length);
  result.desiredDesigns = input.slice(2);
  result.maxTowelSize = Math.max(...result.availableTowels.map((t) => t.length));
  return result;
};

export const partOne = (input: InputType): number => {
  const { availableTowels, desiredDesigns, maxTowelSize } = parseInput(input);

  let possibleDesigns: number = desiredDesigns.length;
  const regExp = new RegExp(`^(${availableTowels.join('|')})+$`);

  for (let i = 0; i < desiredDesigns.length; i++) {
    if (!regExp.test(desiredDesigns[i])) {
      possibleDesigns--;
    }
  }
  return possibleDesigns;
};

export const partTwo = (input: InputType): number => {
  return -1;
};
