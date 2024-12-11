import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day03';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

describe('Year 2024 - Day 03', () => {
  test('Part 1 - Example Input returns 161', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(161);
  });
  test('Part 2 - Example Input returns 48', () => {
    expect(
      partTwo([
        "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
      ])
    ).toBe(48);
  });
});
