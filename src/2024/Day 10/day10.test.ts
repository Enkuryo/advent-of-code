import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day10';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const TESTS: Array<{ expected: number; input: string[] }> = [
  {
    expected: 2,
    input: `...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`.split('\n'),
  },
  {
    expected: 4,
    input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`.split('\n'),
  },
  {
    expected: 3,
    input: `10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`.split('\n'),
  },
];

describe('Year 2024 - Day 10', () => {
  for (const testCase of TESTS) {
    test('Part 1 - Expect test to return ' + testCase.expected, () => {
      expect(partOne(testCase.input)).toBe(testCase.expected);
    });
  }

  test('Part 1 - Example Input returns 36', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(36);
  });

  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});
