import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day24';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');
const EXAMPLE_2_INPUT = readFile(__dirname + '/example_2.txt');

console.clear();

describe('Year 2024 - Day 24', () => {
  test('Part 1 - Example Input returns 4', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(4);
  });
  test('Part 1 - Example 2 Input returns 2024', () => {
    expect(partOne(EXAMPLE_2_INPUT)).toBe(2024);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});