import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day10';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

const TESTS_PART_ONE: Array<{ expected: number; input: string[] }> = [
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

const TESTS_PART_TWO: Array<{ expected: number; input: string[] }> = [
  {
    expected: 3,
    input: `.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`.split('\n'),
  },
  {
    expected: 13,
    input: `..90..9
...1.98
...2..7
6543456
765.987
876....
987....`.split('\n'),
  },
  {
    expected: 227,
    input: `012345
123456
234567
345678
4.6789
56789.`.split('\n'),
  },
  {
    expected: 81,
    input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`.split('\n'),
  },
];

describe('Year 2024 - Day 10', () => {
  for (const testCase of TESTS_PART_ONE) {
    test('Part 1 - Expect test to return ' + testCase.expected, () => {
      expect(partOne(testCase.input)).toBe(testCase.expected);
    });
  }
  test('Part 1 - Example Input returns 36', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(36);
  });

  for (const testCase of TESTS_PART_TWO) {
    test('Part 2 - Expect test to return ' + testCase.expected, () => {
      expect(partTwo(testCase.input)).toBe(testCase.expected);
    });
  }

  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});
