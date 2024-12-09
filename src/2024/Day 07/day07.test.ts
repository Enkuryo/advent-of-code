import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day07';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 7', () => {
  test('Part 1 - Returns 3749', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(3749);
  });
  test('Part 2 - Returns 11387', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(11387);
  });
});
