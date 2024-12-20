import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day20';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const testCases = [
  [2, 14 + 14 + 2 + 4 + 2 + 3 + 1 + 1 + 1 + 1 + 1],
  [4, 14 + 2 + 4 + 2 + 3 + 1 + 1 + 1 + 1 + 1],
  [6, 2 + 4 + 2 + 3 + 1 + 1 + 1 + 1 + 1],
  [8, 4 + 2 + 3 + 1 + 1 + 1 + 1 + 1],
  [10, 2 + 3 + 1 + 1 + 1 + 1 + 1],
  [12, 3 + 1 + 1 + 1 + 1 + 1],
  [20, 1 + 1 + 1 + 1 + 1],
  [36, 1 + 1 + 1 + 1],
  [38, 1 + 1 + 1],
  [40, 1 + 1],
  [64, 1],
  [100, 0],
];

describe('Year 2024 - Day 20', () => {
  for (const testCase of testCases) {
    test('Part 1 - Example Input returns 0', () => {
      expect(partOne(EXAMPLE_INPUT, 2, testCase[0])).toBe(testCase[1]);
    });
  }

  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});
