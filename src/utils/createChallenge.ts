import fs from 'fs';

const args = Bun.argv;

if (args.length !== 4) {
  console.error('Missing <year> or <day> arguments');
  console.info('Run it as: bun start <year> <day>');
  process.exit();
} else {
  const year = args[2];
  const day = args[3].padStart(2, '0');

  const challengeContent = `import { readFile, type InputType } from '../../utils/readFile';

export const PUZZLE_INPUT = readFile(__dirname + '/input.txt');
 
export const partOne = (input: InputType): number => {
  return -1;
};
  
export const partTwo = (input: InputType): number => {
  return -1;
};`;

  const testContent = `import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day${day}';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day ${day}', () => {
  test('Part 1 - Example Input returns 1', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(1);
  });
  test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });
});`;

  const path = __dirname + `/../${year}/Day ${day}/`;

  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
    fs.writeFileSync(path + `day${day}.ts`, challengeContent);
    fs.writeFileSync(path + `day${day}.test.ts`, testContent);
    fs.writeFileSync(path + 'example.txt', '');
    fs.writeFileSync(path + 'input.txt', '');
  } else {
    console.log('Folder for that challenge exists!');
  }
}
