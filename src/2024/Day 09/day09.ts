import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

const convertToBlocks = (disk: string): string[] => {
  let converted: string[] = [];
  let fileID = 0;

  for (let i = 0; i < disk.length; i++) {
    const l = +disk[i];
    if (i % 2 === 0) {
      converted.push(...Array.from({ length: l }, (x) => '' + fileID));
      fileID++;
    } else {
      converted.push(...Array.from({ length: l }, (x) => '.'));
    }
  }

  return converted;
};

const compressDisk = (disk: string[]): string[] => {
  let compressedDisk = [...disk];

  while (compressedDisk.indexOf('.') > -1) {
    compressedDisk[compressedDisk.indexOf('.')] = compressedDisk[compressedDisk.length - 1];
    compressedDisk = compressedDisk.slice(0, compressedDisk.length - 1);
  }

  return compressedDisk;
};

const getChecksum = (disk: string[]): number => {
  return disk.reduce((a, b, i) => {
    return a + i * +b;
  }, 0);
};

export const partOne = (input: InputType): number => {
  const convertedDisk = convertToBlocks(input[0]);
  const compressedDisk = compressDisk(convertedDisk);
  return getChecksum(compressedDisk);
};

export const partTwo = (input: InputType): number => {
  return -1;
};
