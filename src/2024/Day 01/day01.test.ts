import { describe, test, expect } from 'bun:test';
import { partOne, partTwo } from './day01';
import { readFile } from '../../utils/readFile';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 1', () => {
  test('Part 1 - Returns 11', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(11);
  });
  test('Part 2 - Returns 31', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(31);
  });
});
