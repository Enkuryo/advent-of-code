import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day08';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const SMALL_EXAMPLE = `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`.split('\n');

describe('Year 2024 - Day 8', () => {
  test('Part 1 - Returns 14', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(14);
  });
  test('Part 2 - Small Example returns 9', () => {
    expect(partTwo(SMALL_EXAMPLE)).toBe(9);
  });
  test('Part 2 - Example Input returns 34', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(34);
  });
});
