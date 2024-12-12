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

describe('Year 2024 - Day 12', () => {
  test('Part 1 - Small Example Input returns 140', () => {
    expect(partOne(SMALL_EXAMPLE_INPUT)).toBe(140);
  });

  test('Part 1 - Second Small Example Input returns 772', () => {
    expect(partOne(SECOND_SMALL_EXAMPLE_INPUT)).toBe(772);
  });

  test('Part 1 - Example Input returns 1930', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(1930);
  });

  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});
