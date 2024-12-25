import { FileSystemRouter } from 'bun';
import { readFile, type InputType } from '../../utils/readFile';
import { COLOR, colored } from '../../utils/color';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type Schematic = {
  schematic: string;
  heights: number[];
  type: 'key' | 'lock';
};

const parseSchematic = (schematic: string): Schematic => {
  const heights: number[] = [0, 0, 0, 0, 0];
  const lines = schematic.split('\n');
  const type = schematic.startsWith('#####') ? 'lock' : 'key';

  for (let y = type === 'key' ? 0 : 1; y < (type === 'key' ? lines.length - 1 : lines.length); y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '#') heights[x]++;
    }
  }

  return {
    schematic,
    heights,
    type,
  };
};

export const partOne = (input: InputType): number => {
  const keys: Schematic[] = [];
  const locks: Schematic[] = [];

  for (let schematic of input.join('\n').split('\n\n')) {
    const s = parseSchematic(schematic);
    if (s.type === 'key') {
      keys.push(s);
    } else {
      locks.push(s);
    }
  }

  let fittingPairs: number = 0;

  for (let lock of locks) {
    for (let key of keys) {
      let result = key.heights.map((h, i) => h + lock.heights[i]);
      console.log(
        result,
        result.every((c) => c <= 5)
      );
      if (result.every((c) => c <= 5)) fittingPairs++;
    }
  }

  return fittingPairs;
};

export const partTwo = (input: InputType): number => {
  return -1;
};
