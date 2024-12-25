import { describe, test, expect } from 'bun:test';
import { readFile } from '../../utils/readFile';
import { partOne, partTwo } from './day25';

const EXAMPLE_INPUT = readFile(__dirname + '/example.txt');

console.clear();

describe('Year 2024 - Day 25', () => {
  test('Part 1 - Example Input returns 3', () => {
    expect(partOne(EXAMPLE_INPUT)).toBe(3);
  });
  /*test('Part 2 - Example Input returns 1', () => {
    expect(partTwo(EXAMPLE_INPUT)).toBe(1);
  });*/
});
