import { readFile, type InputType } from '../../utils/readFile';
import useMemo from '../../hooks/useMemo';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type ParsedInput = {
  maxTowelSize: number;
  availableTowels: Set<string>;
  desiredDesigns: string[];
};

const parseInput = (input: InputType): ParsedInput => {
  const result: ParsedInput = { availableTowels: new Set(), desiredDesigns: [], maxTowelSize: 0 };
  result.availableTowels = new Set(input[0].split(', '));
  result.desiredDesigns = input.slice(2);
  result.maxTowelSize = Math.max(...[...result.availableTowels].map((t) => t.length));
  return result;
};

const isValid = useMemo<boolean>((towels: Set<string>, design: string, maxLength: number) => {
  if (design.length === 0) return true;
  for (let i = 1; i <= Math.min(design.length, maxLength); i++) {
    if (towels.has(design.slice(0, i)) && cachedIsValid(towels, design.slice(i), maxLength)) {
      return true;
    }
  }
  return false;
});

const cachedIsValid = useMemo<boolean>(isValid);

const getArragements = (towels: Set<string>, design: string, maxLength: number) => {
  const counts = Array.from({ length: design.length + 1 }, (_) => 0);
  counts[0] = 1; // Valid designs always have at least one arrangement

  // Check groups of n letters, 0..n, 0..n-1, 0..n-2 until no letter left
  // For each subgroup, matching a towel, we increment the corresponding counter

  for (let j = 1; j <= design.length; j++) {
    for (let i = Math.max(0, j - maxLength); i < j; i++) {
      if (towels.has(design.slice(i, j))) {
        counts[j] += counts[i];
      }
    }
  }

  return counts[counts.length - 1];
};

export const partOne = (input: InputType): number => {
  const { availableTowels, desiredDesigns, maxTowelSize } = parseInput(input);

  let possibleDesigns: number = 0;

  for (let i = 0; i < desiredDesigns.length; i++) {
    possibleDesigns += cachedIsValid(availableTowels, desiredDesigns[i], maxTowelSize) ? 1 : 0;
  }
  return possibleDesigns;
};

export const partTwo = (input: InputType): number => {
  const { availableTowels, desiredDesigns, maxTowelSize } = parseInput(input);

  const validDesigns = desiredDesigns.filter((design) => cachedIsValid(availableTowels, design, maxTowelSize));
  const arragements = validDesigns.map((design, i) => getArragements(availableTowels, design, maxTowelSize));

  return arragements.reduce((a: number, b: number) => a + b, 0);
};
