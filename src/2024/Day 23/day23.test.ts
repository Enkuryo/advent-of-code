import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day23';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

console.clear();

describe('Year 2024 - Day 23', () => {
  test('Part 1 - Example Input returns 7', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(7);
  });
  test("Part 2 - Example Input returns 'co-de-ka-ta'", () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe('co,de,ka,ta');
  });
});
