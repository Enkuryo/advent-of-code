import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day12';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const SMALL_EXAMPLE_INPUT = `AAAA
BBCD
BBCC
EEEC`.split('\n');

const SECOND_SMALL_EXAMPLE_INPUT = `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`.split('\n');

const E_SHAPED_INPUT = `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`.split('\n');

describe('Year 2024 - Day 12', () => {
  /*test('Part 1 - Small Example Input returns 140', () => {
    expect(partOne(SMALL_EXAMPLE_INPUT)).toBe(140);
  });

  test('Part 1 - Second Small Example Input returns 772', () => {
    expect(partOne(SECOND_SMALL_EXAMPLE_INPUT)).toBe(772);
  });

  test('Part 1 - Example Input returns 1930', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(1930);
  });*/

  test('Part 2 - Example Input returns 80', () => {
    expect(partTwo(SMALL_EXAMPLE_INPUT)).toBe(80);
  });

  test('Part 2 - Example Input returns 436', () => {
    expect(partTwo(SECOND_SMALL_EXAMPLE_INPUT)).toBe(436);
  });

  test('Part 2 - Example Input returns 236', () => {
    expect(partTwo(E_SHAPED_INPUT)).toBe(236);
  });

  test('Part 2 - Example Input returns 1206', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1206);
  });
});
