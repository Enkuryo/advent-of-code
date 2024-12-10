import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day09';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 9', () => {
  test('Part 1 - Returns 1928', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(1928);
  });
  test('Part 2 - Example Input returns 34', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(2858);
  });
});
