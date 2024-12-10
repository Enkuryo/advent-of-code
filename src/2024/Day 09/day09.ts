import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');

type DiskType = Array<string | string[]>;

const convertToBlocks = (disk: string, keepFilesSeparate: boolean = true): DiskType => {
  let converted: DiskType = [];
  let fileID = 0;

  for (let i = 0; i < disk.length; i++) {
    const l = +disk[i];
    if (l === 0) continue;
    if (i % 2 === 0) {
      if (keepFilesSeparate) converted.push(...Array.from({ length: l }, (x) => '' + fileID));
      else converted.push(Array.from({ length: l }, (x) => '' + fileID));
      fileID++;
    } else {
      if (keepFilesSeparate) converted.push(...Array.from({ length: l }, (x) => '.'));
      else converted.push('.'.repeat(l));
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
    if (b !== '.') {
      return a + i * +b;
    }
    return a;
  }, 0);
};

const flattenArray = (blocks: DiskType): string[] => {
  return blocks.reduce<string[]>((flat, block) => {
    if (Array.isArray(block)) {
      flat = [...flat, ...block];
    } else {
      const b = block.startsWith('.') ? block.split('') : block;
      flat = [...flat, ...b];
    }
    return flat;
  }, []);
};

export const partOne = (input: InputType): number => {
  const convertedDisk = convertToBlocks(input[0]);
  const compressedDisk = compressDisk(convertedDisk);
  return getChecksum(compressedDisk);
};

export const partTwo = (input: InputType): number => {
  let blocks = convertToBlocks(input[0], false);
  let i = blocks.length - 1;
  while (i >= 0) {
    const block = blocks[i];

    if (Array.isArray(block)) {
      // Search for empty space that fits
      const emptySpace = blocks.find((x) => typeof x === 'string' && x.length >= block.length);
      if (emptySpace) {
        const blockIndex = blocks.indexOf(block);
        const emptySpaceIndex = blocks.indexOf(emptySpace);

        if (emptySpaceIndex < blockIndex) {
          blocks[emptySpaceIndex] = block;
          blocks[blockIndex] = '.'.repeat(block.length);

          if (emptySpace.length - block.length > 0)
            blocks.splice(emptySpaceIndex + 1, 0, '.'.repeat(emptySpace.length - block.length));
        } else {
          i--;
        }
      } else {
        i--;
      }
    } else {
      i--;
    }
  }

  return getChecksum(flattenArray(blocks));
};
